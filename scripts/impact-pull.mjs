#!/usr/bin/env node
/**
 * IMPACT PULL — the affiliate half of the nightly pipeline.
 *
 * Pulls outbound-affiliate performance from impact.com and writes dated JSON
 * snapshots to impact-data/, mirroring gsc-pull's layout so the search-traffic
 * (inbound) and affiliate (outbound) data sit side by side.
 *
 *   Actions  →  conversions + bounty $ (CONFIRMED API contract). Aggregated by
 *               SubId1 (post slug) and SubId2 (CTA placement / "inline").
 *   Clicks   →  total outbound clicks via a partner performance Report. Report
 *               IDs are account-specific, so this DISCOVERS an ApiAccessible
 *               performance report (or honours IMPACT_REPORT_ID) and is
 *               best-effort: if it can't resolve, the pull still emits the
 *               conversion/earnings data and logs what it saw.
 *
 * Output (mirrors gsc-data/):
 *   impact-data/<endDate>/{actions,summary}.json      (snapshot)
 *   impact-data/<endDate>/clicks.json                 (if the report resolved)
 *   impact-data/latest.json                           (pointer + summary)
 *   impact-data/history.jsonl                         (one row/day, kept forever)
 *   impact-data/reports/<endDate>-impact.md           (PR-body summary)
 *
 * Usage:
 *   node scripts/impact-pull.mjs            # trailing 90 days
 *   node scripts/impact-pull.mjs --days 28
 *   node scripts/impact-pull.mjs --probe    # validate creds, list reports, exit
 *
 * Env: IMPACT_ACCOUNT_SID, IMPACT_AUTH_TOKEN (or impact-auth.json),
 *      IMPACT_REPORT_ID (optional — pin the clicks report),
 *      IMPACT_LOOKBACK_DAYS (optional — default 90).
 */
import fs from "node:fs";
import path from "node:path";
import {
  loadCredentials,
  maskSid,
  apiGet,
  apiGetAll,
  isoDate,
  today,
  daysAgo,
  dateWindows,
} from "./impact-lib.mjs";

const DATA_DIR = "impact-data";

function arg(flag, fallback) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const hasFlag = (flag) => process.argv.includes(flag);

const DAYS = Number(arg("--days", process.env.IMPACT_LOOKBACK_DAYS || 90));
const KEEP_DAYS = Number(arg("--keep-days", process.env.IMPACT_KEEP_DAYS || 45));

const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

// ------------------------------------------------------------------- actions
async function pullActions(creds, startDate, endDate) {
  // Chunk into ≤30-day windows (Impact caps some date filters at 45d) and
  // dedupe by action Id in case windows touch at the seams.
  const byId = new Map();
  for (const w of dateWindows(startDate, endDate, 30)) {
    const rows = await apiGetAll(
      creds,
      "/Actions",
      { ActionDateStart: `${w.start}T00:00:00Z`, ActionDateEnd: `${w.end}T23:59:59Z` },
      "Actions",
    );
    for (const a of rows) byId.set(a.Id || a.ActionId || JSON.stringify(a), a);
  }
  return [...byId.values()];
}

function aggregateActions(actions) {
  const state = { PENDING: { count: 0, payout: 0 }, APPROVED: { count: 0, payout: 0 }, REVERSED: { count: 0, payout: 0 } };
  const byPost = new Map();
  const byPlacement = new Map();
  let currency = "USD";
  for (const a of actions) {
    const payout = num(a.Payout);
    const st = (a.State || "PENDING").toUpperCase();
    if (!state[st]) state[st] = { count: 0, payout: 0 };
    state[st].count += 1;
    state[st].payout += payout;
    if (a.Currency) currency = a.Currency;
    const post = a.SubId1 || "(none)";
    const place = a.SubId2 || "(none)";
    const bp = byPost.get(post) || { subId1: post, actions: 0, payout: 0 };
    bp.actions += 1;
    bp.payout += payout;
    byPost.set(post, bp);
    const bl = byPlacement.get(place) || { subId2: place, actions: 0, payout: 0 };
    bl.actions += 1;
    bl.payout += payout;
    byPlacement.set(place, bl);
  }
  const round = (o) => ({ ...o, payout: Number(o.payout.toFixed(2)) });
  return {
    total: actions.length,
    currency,
    byState: Object.fromEntries(Object.entries(state).map(([k, v]) => [k, round(v)])),
    payoutNet: Number(((state.APPROVED?.payout || 0) + (state.PENDING?.payout || 0)).toFixed(2)),
    byPost: [...byPost.values()].map(round).sort((a, b) => b.payout - a.payout || b.actions - a.actions),
    byPlacement: [...byPlacement.values()].map(round).sort((a, b) => b.actions - a.actions),
  };
}

// -------------------------------------------------------------------- clicks
// Find the first array-of-objects in a report response (Impact usually calls it
// "Records", but stay tolerant to schema differences).
function findRecords(json) {
  if (Array.isArray(json?.Records)) return json.Records;
  for (const v of Object.values(json || {})) {
    if (Array.isArray(v) && v.length && typeof v[0] === "object") return v;
  }
  return [];
}

async function pickReportId(creds) {
  if (process.env.IMPACT_REPORT_ID) return { id: process.env.IMPACT_REPORT_ID, why: "IMPACT_REPORT_ID" };
  const j = await apiGet(creds, "/Reports");
  const reports = (j.Reports || []).filter((r) => {
    const a = r.ApiAccessible;
    return a === true || a === "true" || a === undefined;
  });
  const key = (r) => `${r.Name || ""} ${r.Id || ""}`.toLowerCase();
  // Prefer a day-grained partner performance report; fall back to any performance/action report.
  const pref = [
    (r) => /performance/.test(key(r)) && /day|date/.test(key(r)),
    (r) => /performance/.test(key(r)),
    (r) => /action.*(listing|report)/.test(key(r)),
    (r) => /click/.test(key(r)),
  ];
  for (const test of pref) {
    const hit = reports.find(test);
    if (hit) return { id: hit.Id, why: `auto: "${hit.Name || hit.Id}"`, candidates: reports.map((r) => r.Id) };
  }
  return { id: null, why: "no ApiAccessible performance report found", candidates: reports.map((r) => r.Id) };
}

async function pullClicks(creds, startDate, endDate) {
  const picked = await pickReportId(creds);
  if (!picked.id) {
    console.log(`  clicks          : unavailable (${picked.why}).`);
    if (picked.candidates?.length) console.log(`                    reports seen: ${picked.candidates.join(", ")}`);
    console.log(`                    → pin one with IMPACT_REPORT_ID, or use ClickExport (see IMPACT-SETUP.md).`);
    return null;
  }
  let json;
  try {
    json = await apiGet(creds, `/Reports/${picked.id}`, {
      START_DATE: startDate,
      END_DATE: endDate,
      ResultFormat: "JSON",
    });
  } catch (e) {
    console.log(`  clicks          : report ${picked.id} failed — ${e.message.split(":").slice(-1)[0].trim()}`);
    return null;
  }
  const records = findRecords(json);
  if (!records.length) {
    console.log(`  clicks          : report ${picked.id} (${picked.why}) returned no rows.`);
    return { reportId: picked.id, why: picked.why, total: 0, rows: 0, byPost: [], byPlacement: [] };
  }
  // Detect the clicks + subid columns from the first record's keys.
  const keys = Object.keys(records[0]);
  const clickKey = keys.find((k) => /click/i.test(k));
  const post1Key = keys.find((k) => /subid1/i.test(k)) || keys.find((k) => /sub_?id_?1/i.test(k));
  const post2Key = keys.find((k) => /subid2/i.test(k)) || keys.find((k) => /sub_?id_?2/i.test(k));
  if (!clickKey) {
    console.log(`  clicks          : report ${picked.id} has no clicks column. Columns: ${keys.join(", ")}`);
    console.log(`                    → set IMPACT_REPORT_ID to a report with a Clicks metric.`);
    return { reportId: picked.id, why: picked.why, total: 0, rows: records.length, columns: keys, byPost: [], byPlacement: [] };
  }
  let total = 0;
  const byPost = new Map();
  const byPlacement = new Map();
  for (const r of records) {
    const c = num(r[clickKey]);
    total += c;
    if (post1Key) {
      const p = r[post1Key] || "(none)";
      byPost.set(p, (byPost.get(p) || 0) + c);
    }
    if (post2Key) {
      const p = r[post2Key] || "(none)";
      byPlacement.set(p, (byPlacement.get(p) || 0) + c);
    }
  }
  console.log(`  clicks          : ${total.toLocaleString()} via report "${picked.id}" (${picked.why}, col "${clickKey}")`);
  return {
    reportId: picked.id,
    why: picked.why,
    clickColumn: clickKey,
    total,
    rows: records.length,
    byPost: [...byPost.entries()].map(([subId1, clicks]) => ({ subId1, clicks })).sort((a, b) => b.clicks - a.clicks),
    byPlacement: [...byPlacement.entries()].map(([subId2, clicks]) => ({ subId2, clicks })).sort((a, b) => b.clicks - a.clicks),
  };
}

// --------------------------------------------------------------------- probe
async function probe(creds) {
  console.log(`\n  IMPACT PROBE — account ${maskSid(creds.account_sid)} (creds from ${creds.source})`);
  const j = await apiGet(creds, "/Reports");
  const reports = j.Reports || [];
  console.log(`  ✓ auth OK — ${reports.length} reports visible. ApiAccessible ones:`);
  for (const r of reports.filter((r) => r.ApiAccessible === true || r.ApiAccessible === "true").slice(0, 25)) {
    console.log(`      ${r.Id}  —  ${r.Name || ""}`);
  }
  const sample = await apiGet(creds, "/Actions", { PageSize: 1 }).catch((e) => ({ error: e.message }));
  console.log(
    sample.error
      ? `  Actions probe: ${sample.error}`
      : `  Actions probe: @total=${sample["@total"] ?? "?"} (conversions in the default 7-day window)`,
  );
  console.log("");
}

// ---------------------------------------------------------------------- main
function windowRow(days, actionAgg, clicks) {
  return {
    days,
    clicks: clicks?.total ?? null,
    actions: actionAgg.total,
    payoutNet: actionAgg.payoutNet,
    payoutApproved: actionAgg.byState.APPROVED?.payout ?? 0,
    payoutPending: actionAgg.byState.PENDING?.payout ?? 0,
  };
}

async function main() {
  const creds = loadCredentials();
  if (!creds) {
    console.log(
      `\n  IMPACT PULL — skipped: no credentials.\n` +
        `  Set IMPACT_ACCOUNT_SID + IMPACT_AUTH_TOKEN (or create impact-auth.json).\n` +
        `  This is expected until the affiliate half is wired up — see IMPACT-SETUP.md.\n`,
    );
    return; // exit 0 so the GSC-only nightly keeps working
  }

  if (hasFlag("--probe")) {
    await probe(creds);
    return;
  }

  const endDate = today();
  const startDate = daysAgo(DAYS);
  console.log(`\n  IMPACT PULL — account ${maskSid(creds.account_sid)} (creds from ${creds.source})`);
  console.log(`  window          : ${startDate} → ${endDate}  (${DAYS}d)\n`);

  const actions = await pullActions(creds, startDate, endDate);
  const actionAgg = aggregateActions(actions);
  const clicks = await pullClicks(creds, startDate, endDate).catch((e) => {
    console.log(`  clicks          : unavailable — ${e.message}`);
    return null;
  });

  const pulledAt = new Date().toISOString();
  const summary = {
    source: "impact.com",
    account: maskSid(creds.account_sid),
    startDate,
    endDate,
    days: DAYS,
    pulledAt,
    totals: {
      clicks: clicks?.total ?? null,
      actions: actionAgg.total,
      currency: actionAgg.currency,
      payoutNet: actionAgg.payoutNet,
      byState: actionAgg.byState,
      clickThroughToSignup:
        clicks?.total ? Number(((actionAgg.total / clicks.total) * 100).toFixed(2)) : null,
    },
    byPost: actionAgg.byPost,
    byPlacement: actionAgg.byPlacement,
    clicksByPost: clicks?.byPost ?? [],
    clicksByPlacement: clicks?.byPlacement ?? [],
    clicksSource: clicks ? { reportId: clicks.reportId, column: clicks.clickColumn, note: clicks.why } : null,
  };

  // ---- write snapshot ----
  const snapDir = path.join(DATA_DIR, endDate);
  fs.mkdirSync(snapDir, { recursive: true });
  const write = (name, data) =>
    fs.writeFileSync(path.join(snapDir, `${name}.json`), JSON.stringify(data, null, 2));
  write("actions", actions);
  write("summary", summary);
  if (clicks) write("clicks", clicks);

  // ---- latest manifest ----
  fs.writeFileSync(path.join(DATA_DIR, "latest.json"), JSON.stringify({ snapshot: endDate, dir: snapDir, ...summary }, null, 2));

  // ---- append/replace history row (keyed by pull date) ----
  const historyPath = path.join(DATA_DIR, "history.jsonl");
  const historyRow = { date: endDate, pulledAt, window: windowRow(DAYS, actionAgg, clicks) };
  let history = [];
  if (fs.existsSync(historyPath)) {
    history = fs
      .readFileSync(historyPath, "utf8")
      .split("\n")
      .filter(Boolean)
      .map((l) => JSON.parse(l))
      .filter((r) => r.date !== endDate);
  }
  history.push(historyRow);
  history.sort((a, b) => a.date.localeCompare(b.date));
  fs.writeFileSync(historyPath, history.map((r) => JSON.stringify(r)).join("\n") + "\n");

  // ---- markdown summary for the nightly PR body ----
  writeReport(summary);

  // ---- prune old snapshots (history is kept forever) ----
  const cutoff = daysAgo(KEEP_DAYS);
  let pruned = 0;
  for (const entry of fs.readdirSync(DATA_DIR)) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(entry) && entry < cutoff) {
      fs.rmSync(path.join(DATA_DIR, entry), { recursive: true, force: true });
      pruned += 1;
    }
  }

  const s = actionAgg.byState;
  console.log(`  ✓ snapshot → ${snapDir}/`);
  console.log(
    `  conversions     : ${actionAgg.total} action(s) — ` +
      `${s.APPROVED?.count || 0} approved, ${s.PENDING?.count || 0} pending, ${s.REVERSED?.count || 0} reversed`,
  );
  console.log(
    `  earnings        : ${actionAgg.currency} ${actionAgg.payoutNet.toFixed(2)} net ` +
      `(approved ${(s.APPROVED?.payout || 0).toFixed(2)} + pending ${(s.PENDING?.payout || 0).toFixed(2)})`,
  );
  if (clicks?.total != null && summary.totals.clickThroughToSignup != null) {
    console.log(`  click→signup    : ${summary.totals.clickThroughToSignup}% (${actionAgg.total}/${clicks.total})`);
  }
  if (pruned) console.log(`  pruned ${pruned} snapshot(s) older than ${KEEP_DAYS}d`);
  console.log(`  history         : ${DATA_DIR}/history.jsonl (${history.length} days)\n`);
}

function writeReport(summary) {
  const reportsDir = path.join(DATA_DIR, "reports");
  fs.mkdirSync(reportsDir, { recursive: true });
  const t = summary.totals;
  const money = (n) => `${t.currency} ${Number(n || 0).toFixed(2)}`;
  const lines = [
    `## Affiliate (impact.com) — ${summary.startDate} → ${summary.endDate}`,
    ``,
    `- **Outbound clicks:** ${t.clicks == null ? "_(report not configured — see IMPACT-SETUP.md)_" : t.clicks.toLocaleString()}`,
    `- **Conversions:** ${t.actions}  ·  **Net earnings:** ${money(t.payoutNet)}` +
      (t.clickThroughToSignup != null ? `  ·  **Click→signup:** ${t.clickThroughToSignup}%` : ``),
    `- **By state:** ${Object.entries(t.byState)
      .map(([k, v]) => `${k.toLowerCase()} ${v.count} (${money(v.payout)})`)
      .join(" · ")}`,
  ];
  if (summary.byPost.length) {
    lines.push(``, `**Top earning posts (subId1):**`);
    for (const p of summary.byPost.slice(0, 10)) {
      lines.push(`- \`${p.subId1}\` — ${p.actions} action(s), ${money(p.payout)}`);
    }
  }
  if (summary.byPlacement.length) {
    lines.push(``, `**By placement (subId2):** ` + summary.byPlacement.map((p) => `${p.subId2} ${p.actions}`).join(" · "));
  }
  fs.writeFileSync(path.join(reportsDir, `${summary.endDate}-impact.md`), lines.join("\n") + "\n");
  fs.writeFileSync(path.join(reportsDir, "latest-impact.md"), lines.join("\n") + "\n");
}

main().catch((e) => {
  console.error(`\n  ✗ Impact pull failed:\n  ${e.message}\n`);
  process.exit(1);
});
