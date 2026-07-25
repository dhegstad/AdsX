#!/usr/bin/env node
/**
 * GSC AUDIT — the deterministic nightly signal layer.
 *
 * Reads the latest snapshot written by gsc-pull.mjs and turns it into decisions,
 * weighted to how AdsX actually operates (see memory + the two playbooks):
 *   - Headline is CLICKS + INDEXATION, not impressions (~82% of impressions are
 *     AI fan-out that can't be clicked). Judge by clicks.
 *   - Automates the indexation-loop BLOCKER: which kill-list slugs are still live
 *     AND now earn real traffic → PROTECT (removing them throws away clicks).
 *   - CTR bleeders are secondary and position-aware (not a naive 2% target), and
 *     cross-referenced with ctr-worklist.json so pages with a queued mechanical
 *     title/meta fix float to the top.
 *
 * Output:
 *   gsc-worklist.json                       (structured, for downstream steps)
 *   gsc-data/reports/<endDate>-audit.md     (human/Claude-readable narrative)
 *
 * Usage: node scripts/gsc-audit.mjs
 */
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = "gsc-data";
const BLOG_DIR = "src/content/blog";
const MIN_IMPR_BLEEDER = 50; // ignore noise below this
const MIN_IMPR_PAGE2 = 30;
const TOP_N = 25;

const readJSON = (p, fallback = null) =>
  fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : fallback;

// --- organic CTR-by-position curve (aggregate ballpark; tune from your own data) ---
function expectedCtr(pos) {
  const p = Math.round(pos);
  const table = { 1: 0.28, 2: 0.15, 3: 0.11, 4: 0.08, 5: 0.06, 6: 0.045, 7: 0.035, 8: 0.028, 9: 0.023, 10: 0.02 };
  if (p <= 0) return 0;
  if (table[p]) return table[p];
  if (p <= 15) return 0.013;
  if (p <= 20) return 0.009;
  return 0.005;
}

const slugOf = (url) => {
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] || "(root)";
  } catch {
    return url.split("/").filter(Boolean).pop() || url;
  }
};
const isBrand = (q) => /adsx/i.test(q);
const pct = (n) => `${(n * 100).toFixed(2)}%`;
const signed = (n, digits = 0) => `${n >= 0 ? "+" : ""}${n.toFixed(digits)}`;

function pickPriorSnapshot(endDate, targetDaysBack = 7) {
  const dirs = fs
    .readdirSync(DATA_DIR)
    .filter((e) => /^\d{4}-\d{2}-\d{2}$/.test(e) && e < endDate)
    .sort();
  if (!dirs.length) return null;
  const target = new Date(endDate);
  target.setUTCDate(target.getUTCDate() - targetDaysBack);
  const targetISO = target.toISOString().slice(0, 10);
  // newest snapshot on/before the target date, else the oldest we have.
  const onOrBefore = dirs.filter((d) => d <= targetISO);
  return onOrBefore.length ? onOrBefore[onOrBefore.length - 1] : dirs[0];
}

function main() {
  const latest = readJSON(path.join(DATA_DIR, "latest.json"));
  if (!latest) {
    console.error(`\n  ✗ No snapshot found. Run: node scripts/gsc-pull.mjs\n`);
    process.exit(1);
  }
  const snapDir = latest.dir;
  const endDate = latest.snapshot;
  const pages = readJSON(path.join(snapDir, "pages.json"), []);
  const queries = readJSON(path.join(snapDir, "queries.json"), []);

  // --- live posts + kill lists ---
  const livePosts = new Set(
    fs.existsSync(BLOG_DIR)
      ? fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""))
      : []
  );
  const ctrKill = (readJSON("ctr-killlist.json", []) || []).map((r) => r.slug);
  const pruneList = readJSON("prune-list.json", { kill: [], keep: [] }) || { kill: [] };
  const killSlugs = new Set([...(ctrKill || []), ...(pruneList.kill || [])]);
  const ctrWorklist = readJSON("ctr-worklist.json", []) || [];
  const ctrFixQueued = new Set(ctrWorklist.filter((r) => (r.critical || 0) > 0).map((r) => r.slug));

  // metrics by slug (last path segment of each ranking URL)
  const bySlug = new Map();
  for (const p of pages) {
    const s = slugOf(p.page);
    const prev = bySlug.get(s);
    // if two URLs map to one slug (www/apex), keep the higher-traffic one
    if (!prev || p.clicks > prev.clicks) bySlug.set(s, { ...p, slug: s });
  }

  // ============================ 1. HEADLINE TREND ============================
  const history = fs.existsSync(path.join(DATA_DIR, "history.jsonl"))
    ? fs.readFileSync(path.join(DATA_DIR, "history.jsonl"), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l))
    : [];
  const cur = history[history.length - 1] || null;
  const findBack = (days) => {
    if (!cur) return null;
    const target = new Date(cur.date);
    target.setUTCDate(target.getUTCDate() - days);
    const iso = target.toISOString().slice(0, 10);
    const candidates = history.filter((r) => r.date <= iso);
    return candidates.length ? candidates[candidates.length - 1] : null;
  };
  const wow = findBack(7);
  const mom = findBack(28);
  const deltaPct = (now, then) => (then ? ((now - then) / then) * 100 : null);

  const trend = {
    lastFinalDay: cur?.date || endDate,
    clicks7: cur?.window7?.clicks ?? latest.totals.clicks,
    clicks7_wowPct: cur && wow ? deltaPct(cur.window7.clicks, wow.window7.clicks) : null,
    clicks28: cur?.window28?.clicks ?? null,
    clicks28_momPct: cur && mom ? deltaPct(cur.window28.clicks, mom.window28.clicks) : null,
    sitemapIndexed: cur?.sitemapIndexed ?? latest.sitemaps?.indexed ?? null,
    sitemapIndexed_wow: cur && wow ? cur.sitemapIndexed - wow.sitemapIndexed : null,
    distinctPages: cur?.distinctPages ?? pages.length,
    distinctPages_wow: cur && wow ? cur.distinctPages - wow.distinctPages : null,
    avgPosition: latest.totals.position,
    baseline: history.length < 2,
  };

  // ==================== 2. KILL-LIST RECONCILIATION (BLOCKER) ================
  const protect = [];
  const safeToKill = [];
  for (const slug of killSlugs) {
    if (!livePosts.has(slug)) continue; // already removed — not our problem
    const m = bySlug.get(slug);
    const clicks = m?.clicks || 0;
    const impressions = m?.impressions || 0;
    if (clicks > 0 || impressions >= 20) {
      protect.push({ slug, clicks, impressions, position: m ? Number(m.position.toFixed(1)) : null });
    } else {
      safeToKill.push({ slug, clicks, impressions });
    }
  }
  protect.sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions);
  safeToKill.sort((a, b) => a.slug.localeCompare(b.slug));

  // ==================== 3. QUERY MOVEMENT (vs ~7d snapshot) ==================
  const priorDate = pickPriorSnapshot(endDate, 7);
  const priorQueries = priorDate ? readJSON(path.join(DATA_DIR, priorDate, "queries.json"), []) : null;
  let queryMovement = { comparedTo: priorDate, new: [], lost: [], rising: [], falling: [] };
  if (priorQueries) {
    const prevMap = new Map(priorQueries.map((r) => [r.query, r]));
    const curMap = new Map(queries.map((r) => [r.query, r]));
    const newQ = [];
    const rising = [];
    for (const r of queries) {
      const prev = prevMap.get(r.query);
      if (!prev) {
        if (r.clicks > 0 || r.impressions >= 30) newQ.push(r);
      } else {
        const dClicks = r.clicks - prev.clicks;
        if (dClicks !== 0) rising.push({ query: r.query, clicks: r.clicks, delta: dClicks, position: Number(r.position.toFixed(1)) });
      }
    }
    const lost = [];
    for (const r of priorQueries) {
      if (!curMap.has(r.query) && r.clicks > 0) lost.push(r);
    }
    newQ.sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions);
    lost.sort((a, b) => b.clicks - a.clicks);
    rising.sort((a, b) => b.delta - a.delta);
    queryMovement = {
      comparedTo: priorDate,
      new: newQ.slice(0, TOP_N),
      lost: lost.slice(0, TOP_N),
      rising: rising.filter((r) => r.delta > 0).slice(0, 12),
      falling: rising.filter((r) => r.delta < 0).reverse().slice(0, 12),
    };
  }

  // "almost there" — non-brand queries stuck on page 2 with real demand
  const page2 = queries
    .filter((r) => !isBrand(r.query) && r.impressions >= MIN_IMPR_PAGE2 && r.position >= 8 && r.position <= 20)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, TOP_N)
    .map((r) => ({ query: r.query, impressions: r.impressions, clicks: r.clicks, position: Number(r.position.toFixed(1)) }));

  // ==================== 4. CTR BLEEDERS (secondary, position-aware) ==========
  const bleeders = pages
    .filter((p) => p.impressions >= MIN_IMPR_BLEEDER)
    .map((p) => {
      const exp = expectedCtr(p.position);
      const recoverable = Math.max(0, exp - p.ctr) * p.impressions;
      const slug = slugOf(p.page);
      return {
        slug,
        url: p.page,
        impressions: p.impressions,
        clicks: p.clicks,
        ctr: p.ctr,
        expectedCtr: exp,
        position: Number(p.position.toFixed(1)),
        recoverableClicks: Number(recoverable.toFixed(1)),
        fixQueued: ctrFixQueued.has(slug), // mechanical title/meta fix already in ctr-worklist
        onAudience: livePosts.has(slug) && !killSlugs.has(slug),
      };
    })
    .filter((p) => p.recoverableClicks >= 1)
    .sort((a, b) => {
      // prioritize pages that both bleed AND have a queued mechanical fix
      if (a.fixQueued !== b.fixQueued) return a.fixQueued ? -1 : 1;
      return b.recoverableClicks - a.recoverableClicks;
    })
    .slice(0, TOP_N);

  // ================================ WRITE ====================================
  const worklist = {
    generated: new Date().toISOString(),
    siteUrl: latest.siteUrl,
    window: { startDate: latest.startDate, endDate, days: latest.days, dataState: latest.dataState },
    trend,
    indexation: {
      sitemapSubmitted: latest.sitemaps?.submitted ?? null,
      sitemapIndexed: latest.sitemaps?.indexed ?? null,
      pagesEarningImpressions: pages.length,
    },
    killReconciliation: { protectCount: protect.length, safeToKillCount: safeToKill.length, protect, safeToKill },
    queryMovement,
    page2Opportunities: page2,
    ctrBleeders: bleeders,
  };
  fs.writeFileSync("gsc-worklist.json", JSON.stringify(worklist, null, 2));

  const report = renderReport(worklist);
  const reportsDir = path.join(DATA_DIR, "reports");
  fs.mkdirSync(reportsDir, { recursive: true });
  fs.writeFileSync(path.join(reportsDir, `${endDate}-audit.md`), report);
  fs.writeFileSync(path.join(reportsDir, "latest-audit.md"), report);

  // stdout summary
  console.log(`\n  GSC AUDIT — ${endDate} (${latest.siteUrl})`);
  const w = trend.clicks7_wowPct;
  console.log(`  clicks 7d       : ${trend.clicks7?.toLocaleString()}${w != null ? `  (WoW ${signed(w, 0)}%)` : "  (baseline)"}`);
  console.log(`  indexed         : ${trend.sitemapIndexed?.toLocaleString() ?? "n/a"}${trend.sitemapIndexed_wow != null ? `  (${signed(trend.sitemapIndexed_wow)})` : ""}`);
  console.log(`  PROTECT (kill-list slugs now earning traffic): ${protect.length}`);
  console.log(`  page-2 opportunities: ${page2.length}   CTR bleeders: ${bleeders.length}   new queries: ${queryMovement.new.length}`);
  console.log(`  → gsc-worklist.json + ${path.join(reportsDir, `${endDate}-audit.md`)}\n`);
}

// -------------------------------------------------------------------- rendering
function renderReport(w) {
  const t = w.trend;
  const L = [];
  const wowStr = t.clicks7_wowPct != null ? ` (WoW ${signed(t.clicks7_wowPct, 0)}%)` : t.baseline ? " (baseline — first run)" : "";
  const momStr = t.clicks28_momPct != null ? ` (28d MoM ${signed(t.clicks28_momPct, 0)}%)` : "";

  L.push(`# GSC Nightly Audit — ${w.window.endDate}`);
  L.push(`_Property ${w.siteUrl} · window ${w.window.startDate}→${w.window.endDate} (${w.window.days}d, ${w.window.dataState}) · through ${t.lastFinalDay}_`);
  L.push("");
  L.push(`## 1. Headline — clicks & indexation`);
  L.push(`> Judge by clicks, not impressions: ~82% of impressions are AI fan-out that can't be clicked.`);
  L.push("");
  L.push(`- **Clicks (7d):** ${fmt(t.clicks7)}${wowStr}`);
  if (t.clicks28 != null) L.push(`- **Clicks (28d):** ${fmt(t.clicks28)}${momStr}`);
  L.push(`- **Indexed (sitemaps):** ${fmt(t.sitemapIndexed)}${t.sitemapIndexed_wow != null ? ` (${signed(t.sitemapIndexed_wow)} WoW)` : ""} of ${fmt(w.indexation.sitemapSubmitted)} submitted`);
  L.push(`- **Pages earning impressions:** ${fmt(t.distinctPages)}${t.distinctPages_wow != null ? ` (${signed(t.distinctPages_wow)} WoW)` : ""}`);
  L.push(`- **Avg position:** ${t.avgPosition ?? "n/a"}`);
  L.push("");

  L.push(`## 2. Kill-list reconciliation — indexation-loop BLOCKER`);
  L.push(`_Live posts on a kill list (\`ctr-killlist.json\` + \`prune-list.json\`) that now earn traffic. Per the playbook, drop these from any removal batch — removing a ranking page throws away clicks._`);
  L.push("");
  if (w.killReconciliation.protect.length) {
    L.push(`### 🛑 PROTECT — ${w.killReconciliation.protect.length} kill-listed pages are earning traffic`);
    L.push("");
    L.push(`| slug | clicks | impressions | pos |`);
    L.push(`|---|--:|--:|--:|`);
    for (const p of w.killReconciliation.protect.slice(0, 30))
      L.push(`| ${p.slug} | ${p.clicks} | ${p.impressions} | ${p.position ?? "—"} |`);
    L.push("");
  } else {
    L.push(`✓ No live kill-listed page is currently earning traffic — the removal batch is clean to proceed.`);
    L.push("");
  }
  L.push(`Safe to remove (live, ~0 traffic): **${w.killReconciliation.safeToKillCount}** slugs (see \`gsc-worklist.json\`).`);
  L.push("");

  L.push(`## 3. Query movement${w.queryMovement.comparedTo ? ` (vs ${w.queryMovement.comparedTo})` : ""}`);
  if (!w.queryMovement.comparedTo) {
    L.push(`_No prior snapshot yet — deltas begin once a second night runs._`);
  } else {
    if (w.queryMovement.new.length) {
      L.push(`**🆕 New queries** (content is starting to rank — watch/expand):`);
      for (const r of w.queryMovement.new.slice(0, 12)) L.push(`- \`${r.query}\` — ${r.clicks} clicks, ${r.impressions} impr, pos ${r.position.toFixed(1)}`);
      L.push("");
    }
    if (w.queryMovement.lost.length) {
      L.push(`**📉 Lost queries** (had clicks, now gone — possible deindex/regression):`);
      for (const r of w.queryMovement.lost.slice(0, 12)) L.push(`- \`${r.query}\` — was ${r.clicks} clicks`);
      L.push("");
    }
    if (w.queryMovement.rising.length) {
      L.push(`**⬆ Rising:** ` + w.queryMovement.rising.map((r) => `\`${r.query}\` (${signed(r.delta)})`).join(", "));
      L.push("");
    }
    if (w.queryMovement.falling.length) {
      L.push(`**⬇ Falling:** ` + w.queryMovement.falling.map((r) => `\`${r.query}\` (${signed(r.delta)})`).join(", "));
      L.push("");
    }
  }
  L.push("");
  if (w.page2Opportunities.length) {
    L.push(`### "Almost there" — non-brand queries stuck on page 2 (real demand, one nudge from clicks)`);
    L.push(`| query | impressions | pos | clicks |`);
    L.push(`|---|--:|--:|--:|`);
    for (const r of w.page2Opportunities.slice(0, 15)) L.push(`| ${r.query} | ${r.impressions} | ${r.position} | ${r.clicks} |`);
    L.push("");
  }

  L.push(`## 4. CTR bleeders — secondary, position-aware`);
  L.push(`_Estimated recoverable clicks = impressions × (expected CTR for that position − actual CTR). ★ = a mechanical title/meta fix is already queued in \`ctr-worklist.json\`._`);
  L.push("");
  if (w.ctrBleeders.length) {
    L.push(`| page | impr | pos | CTR | recoverable | fix queued | on-audience |`);
    L.push(`|---|--:|--:|--:|--:|:-:|:-:|`);
    for (const p of w.ctrBleeders.slice(0, 15))
      L.push(`| ${p.slug} | ${p.impressions} | ${p.position} | ${pct(p.ctr)} | ${p.recoverableClicks} | ${p.fixQueued ? "★" : ""} | ${p.onAudience ? "✓" : "—"} |`);
    L.push("");
  } else {
    L.push(`No pages above the ${MIN_IMPR_BLEEDER}-impression floor are meaningfully under expected CTR.`);
    L.push("");
  }

  L.push(`---`);
  L.push(`_Deterministic audit. The prioritized plan (fix / kill / write-next) is produced by the Claude review layer when \`ANTHROPIC_API_KEY\` is set; otherwise act on the signals above per CTR-LOOP-PLAYBOOK.md and INDEXATION-KILL-LOOP-PLAYBOOK.md._`);
  return L.join("\n") + "\n";
}

const fmt = (n) => (n == null ? "n/a" : Number(n).toLocaleString());

main();
