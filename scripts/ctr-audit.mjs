#!/usr/bin/env node
/**
 * CTR AUDIT — the "find" half of the CTR fix loop.
 *
 * Scans every blog post's title + excerpt (the only two fields Google shows in
 * the SERP) and scores them against mechanical CTR best practices. Emits a
 * prioritized worklist (worst offenders first) to ctr-worklist.json + a human
 * summary to stdout.
 *
 * Repo-only: prioritization is by severity of SERP-display problems. When GSC
 * data is available, sort the worklist by (impressions * (benchmarkCTR - actualCTR))
 * to target the biggest real-traffic wins first — the per-post `score` here is
 * the tiebreaker / fallback.
 *
 * Usage: node scripts/ctr-audit.mjs
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "src/content/blog";
const TITLE_MAX = 60;   // SERP pixel-truncation proxy
const TITLE_MIN = 40;   // wasting headline real estate below this
const DESC_MAX = 155;   // safe meta-description length
const DESC_MIN = 120;   // under-using the snippet below this
const YEAR = new Date().getFullYear();

const grab = (s, k) => {
  const m = s.match(new RegExp(`^${k}:\\s*"([^"]*)"`, "m"));
  return m ? m[1] : null;
};

// Weak/filler title openers that bury the keyword and read generic.
const WEAK_OPENERS = /^(the|a|an|how to|understanding|everything|guide to|introduction|tips for|ways to)\b/i;
const POWER = /\b(\d+|best|fast|free|proven|easy|stop|avoid|fix|boost|double|cut|save|ultimate|complete|now|today|why|how)\b/i;

const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx"));
const rows = [];

for (const f of files) {
  const raw = fs.readFileSync(path.join(DIR, f), "utf8").slice(0, 3000);
  const title = grab(raw, "title");
  const excerpt = grab(raw, "excerpt");
  if (!title || !excerpt) {
    rows.push({ slug: f.replace(/\.mdx$/, ""), score: 99, issues: ["MISSING title or excerpt"], title, excerpt });
    continue;
  }

  // critical = SERP display is actually broken (drives CTR loss directly).
  // advisory = headline could be punchier (real, but secondary — don't force it).
  const critical = [];
  const advisory = [];

  // --- Title checks ---
  if (title.length > TITLE_MAX) critical.push(`title ${title.length} chars (SERP-truncated, trim to <=${TITLE_MAX})`);
  if (title.length < TITLE_MIN) advisory.push(`title only ${title.length} chars (wasting headline space)`);
  if (!/\d/.test(title)) advisory.push("no number in title (numbers lift CTR)");
  if (WEAK_OPENERS.test(title)) advisory.push("weak/generic opener (front-load the keyword)");
  if (!POWER.test(title)) advisory.push("no power word / specificity hook");

  // --- Meta description (excerpt) checks ---
  if (excerpt.length > DESC_MAX) critical.push(`excerpt ${excerpt.length} chars (truncated, trim to <=${DESC_MAX})`);
  if (excerpt.length < DESC_MIN) advisory.push(`excerpt only ${excerpt.length} chars (under-using snippet)`);
  if (!/[.!?]$/.test(excerpt.trim())) critical.push("excerpt doesn't end on a complete sentence");
  if (!new RegExp(`${YEAR}`).test(title) && /\b(update|trend|guide|best|latest|new)\b/i.test(title))
    advisory.push(`consider adding ${YEAR} (freshness signal for time-sensitive topic)`);

  // Priority = critical issues dominate; advisory only breaks ties.
  const score = critical.length * 10 + advisory.length;
  const issues = [...critical, ...advisory];
  if (issues.length) rows.push({ slug: f.replace(/\.mdx$/, ""), score, critical: critical.length, advisory: advisory.length, issues, title, excerpt });
}

rows.sort((a, b) => b.score - a.score);

fs.writeFileSync("ctr-worklist.json", JSON.stringify(rows, null, 2));

const total = files.length;
const flagged = rows.length;
const withCritical = rows.filter((r) => r.critical > 0).length;
const advisoryOnly = flagged - withCritical;
console.log(`\n  CTR AUDIT — ${total} posts scanned`);
console.log(`  ${flagged} posts flagged (${((flagged / total) * 100).toFixed(0)}%)`);
console.log(`  CRITICAL (SERP actually broken — fix these): ${withCritical}`);
console.log(`  advisory only (punch-up, optional): ${advisoryOnly}`);
console.log(`  Worklist written to ctr-worklist.json (sorted worst-first)\n`);
console.log("  Top 10 priorities:");
for (const r of rows.slice(0, 10)) {
  console.log(`  [${r.score}] ${r.slug}`);
  console.log(`       ${r.issues.join("; ")}`);
}
