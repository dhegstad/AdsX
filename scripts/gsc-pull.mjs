#!/usr/bin/env node
/**
 * GSC PULL — the export replacement.
 *
 * Replaces hand-downloading Queries.csv / Pages.csv from Search Console. Pulls
 * the same data over the API and writes dated JSON snapshots to gsc-data/, plus
 * an append-only totals history that powers trend detection in the audit.
 *
 * Output:
 *   gsc-data/<endDate>/{dates,queries,pages,countries,devices}.json  (snapshot)
 *   gsc-data/<endDate>/meta.json                                     (totals + sitemaps)
 *   gsc-data/latest.json                                             (pointer + summary)
 *   gsc-data/history.jsonl                                           (one row/day, kept forever)
 *   Full snapshots older than --keep-days are pruned; history is never pruned.
 *
 * Usage:
 *   node scripts/gsc-pull.mjs                 # trailing 90 days, final data
 *   node scripts/gsc-pull.mjs --days 28
 *   node scripts/gsc-pull.mjs --full          # trailing 480 days (~16 months, GSC max)
 *   node scripts/gsc-pull.mjs --data-state all  # include the freshest ~3 unsettled days
 */
import fs from "node:fs";
import path from "node:path";
import {
  connect,
  querySearchAnalytics,
  listSitemaps,
  isoDate,
  today,
} from "./gsc-lib.mjs";

const DATA_DIR = "gsc-data";

function arg(flag, fallback) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const hasFlag = (flag) => process.argv.includes(flag);

const DAYS = hasFlag("--full")
  ? 480
  : Number(arg("--days", process.env.GSC_LOOKBACK_DAYS || 90));
const KEEP_DAYS = Number(arg("--keep-days", process.env.GSC_KEEP_DAYS || 45));
const DATA_STATE = arg("--data-state", "final"); // "final" = stable, "all" = include fresh

function startDateFor(days) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return isoDate(d);
}

function sum(rows, k) {
  return rows.reduce((a, r) => a + (r[k] || 0), 0);
}

/** Sum daily rows over the last n entries into { clicks, impressions, ctr, position }. */
function windowTotals(dailyAsc, n) {
  const slice = dailyAsc.slice(-n);
  const clicks = sum(slice, "clicks");
  const impressions = sum(slice, "impressions");
  // Impression-weighted average position; ctr recomputed from the sums.
  const position = impressions
    ? slice.reduce((a, r) => a + r.position * r.impressions, 0) / impressions
    : 0;
  return {
    days: slice.length,
    clicks,
    impressions,
    ctr: impressions ? clicks / impressions : 0,
    position: Number(position.toFixed(2)),
  };
}

async function main() {
  const endDate = today();
  const startDate = startDateFor(DAYS);

  console.log(`\n  GSC PULL — connecting…`);
  const { token, siteUrl, autoPicked, available, clientEmail } = await connect();
  console.log(`  service account : ${clientEmail}`);
  console.log(`  property        : ${siteUrl}${autoPicked ? "  (auto-picked)" : ""}`);
  if (autoPicked && available.length > 1) {
    console.log(
      `  (other properties available — set GSC_SITE_URL to pin one:\n` +
        available.map((s) => `     ${s.siteUrl}`).join("\n") +
        `)`
    );
  }
  console.log(`  window          : ${startDate} → ${endDate}  (${DAYS}d, dataState=${DATA_STATE})\n`);

  const q = (dimensions) =>
    querySearchAnalytics(token, siteUrl, { startDate, endDate, dimensions, dataState: DATA_STATE });

  // Pull each dimension the manual export gave us, plus a no-dimension aggregate.
  const [aggregate, dates, queries, pages, countries, devices] = await Promise.all([
    q([]), // single aggregate row for exact window totals
    q(["date"]),
    q(["query"]),
    q(["page"]),
    q(["country"]),
    q(["device"]),
  ]);
  const sitemaps = await listSitemaps(token, siteUrl).catch((e) => {
    console.log(`  (sitemaps unavailable: ${e.message.split("\n")[0]})`);
    return [];
  });

  dates.sort((a, b) => a.date.localeCompare(b.date));

  const totals = aggregate[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  const lastFinalDay = dates.length ? dates[dates.length - 1].date : endDate;
  const sitemapSubmitted = sitemaps.reduce(
    (a, s) => a + s.contents.reduce((b, c) => b + c.submitted, 0),
    0
  );
  const sitemapIndexed = sitemaps.reduce(
    (a, s) => a + s.contents.reduce((b, c) => b + c.indexed, 0),
    0
  );

  const meta = {
    siteUrl,
    startDate,
    endDate,
    lastFinalDay,
    dataState: DATA_STATE,
    days: DAYS,
    pulledAt: new Date().toISOString(),
    totals: {
      clicks: totals.clicks,
      impressions: totals.impressions,
      ctr: totals.ctr,
      position: Number((totals.position || 0).toFixed(2)),
    },
    counts: {
      queries: queries.length,
      pages: pages.length,
      countries: countries.length,
      devices: devices.length,
    },
    sitemaps: { submitted: sitemapSubmitted, indexed: sitemapIndexed, files: sitemaps },
  };

  // ---- write snapshot ----
  const snapDir = path.join(DATA_DIR, endDate);
  fs.mkdirSync(snapDir, { recursive: true });
  const write = (name, data) =>
    fs.writeFileSync(path.join(snapDir, `${name}.json`), JSON.stringify(data, null, 2));
  write("dates", dates);
  write("queries", queries);
  write("pages", pages);
  write("countries", countries);
  write("devices", devices);
  write("meta", meta);

  // ---- latest manifest ----
  fs.writeFileSync(
    path.join(DATA_DIR, "latest.json"),
    JSON.stringify({ snapshot: endDate, dir: snapDir, ...meta }, null, 2)
  );

  // ---- append/replace history row (keyed by last final day) ----
  const historyPath = path.join(DATA_DIR, "history.jsonl");
  const historyRow = {
    date: lastFinalDay,
    pulledAt: meta.pulledAt,
    window7: windowTotals(dates, 7),
    window28: windowTotals(dates, 28),
    distinctPages: pages.length,
    sitemapSubmitted,
    sitemapIndexed,
  };
  let history = [];
  if (fs.existsSync(historyPath)) {
    history = fs
      .readFileSync(historyPath, "utf8")
      .split("\n")
      .filter(Boolean)
      .map((l) => JSON.parse(l))
      .filter((r) => r.date !== lastFinalDay); // replace same-day re-runs
  }
  history.push(historyRow);
  history.sort((a, b) => a.date.localeCompare(b.date));
  fs.writeFileSync(historyPath, history.map((r) => JSON.stringify(r)).join("\n") + "\n");

  // ---- prune old full snapshots (keep history forever) ----
  const cutoff = startDateFor(KEEP_DAYS);
  let pruned = 0;
  for (const entry of fs.readdirSync(DATA_DIR)) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(entry) && entry < cutoff) {
      fs.rmSync(path.join(DATA_DIR, entry), { recursive: true, force: true });
      pruned++;
    }
  }

  const w7 = historyRow.window7;
  console.log(`  ✓ snapshot → ${snapDir}/`);
  console.log(
    `  window totals   : ${totals.clicks.toLocaleString()} clicks, ` +
      `${totals.impressions.toLocaleString()} impressions, ` +
      `CTR ${(totals.ctr * 100).toFixed(2)}%, avg pos ${(totals.position || 0).toFixed(1)}`
  );
  console.log(
    `  last 7d         : ${w7.clicks.toLocaleString()} clicks, ` +
      `${w7.impressions.toLocaleString()} impressions (through ${lastFinalDay})`
  );
  console.log(
    `  indexation      : ${sitemapIndexed.toLocaleString()} indexed / ` +
      `${sitemapSubmitted.toLocaleString()} submitted (sitemaps); ` +
      `${pages.length.toLocaleString()} pages earned impressions`
  );
  if (pruned) console.log(`  pruned ${pruned} snapshot(s) older than ${KEEP_DAYS}d`);
  console.log(`  history         : ${DATA_DIR}/history.jsonl (${history.length} days)\n`);
}

main().catch((e) => {
  console.error(`\n  ✗ GSC pull failed:\n  ${e.message}\n`);
  process.exit(1);
});
