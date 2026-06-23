#!/usr/bin/env node
/**
 * CTR APPLY — the "fix" half of the CTR fix loop.
 *
 * Takes a rewrites file (JSON array of {slug, title, excerpt}) and rewrites the
 * `title:` and `excerpt:` frontmatter of each post in place. Acts as a quality
 * GATE: it refuses any rewrite that violates the SERP limits, so a bad batch
 * from the writing step can never ship. Refused items are reported, not applied.
 *
 * Rewrites come from the writing step (an LLM batch over ctr-worklist.json).
 * Keep the writing and applying steps separate so the apply step stays a
 * deterministic, reviewable gate.
 *
 * Usage:
 *   node scripts/ctr-apply.mjs rewrites.json            # apply
 *   node scripts/ctr-apply.mjs rewrites.json --dry-run  # report only
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "src/content/blog";
const TITLE_MAX = 60;
const DESC_MIN = 110;
const DESC_MAX = 155;

const file = process.argv[2];
const dry = process.argv.includes("--dry-run");
if (!file) { console.error("usage: node scripts/ctr-apply.mjs <rewrites.json> [--dry-run]"); process.exit(1); }

const rewrites = JSON.parse(fs.readFileSync(file, "utf8"));
const esc = (s) => s.replace(/"/g, '\\"');
let applied = 0;
const refused = [];

for (const r of rewrites) {
  const p = path.join(DIR, `${r.slug}.mdx`);
  if (!fs.existsSync(p)) { refused.push(`${r.slug}: file not found`); continue; }

  // Gate: enforce SERP limits before touching the file.
  const errs = [];
  if (!r.title || r.title.length > TITLE_MAX) errs.push(`title ${r.title?.length ?? 0} > ${TITLE_MAX}`);
  if (!r.excerpt || r.excerpt.length > DESC_MAX || r.excerpt.length < DESC_MIN)
    errs.push(`excerpt ${r.excerpt?.length ?? 0} outside ${DESC_MIN}-${DESC_MAX}`);
  if (r.title?.includes('"') || r.excerpt?.includes('"')) errs.push("contains unescaped quote");
  if (errs.length) { refused.push(`${r.slug}: ${errs.join(", ")}`); continue; }

  let src = fs.readFileSync(p, "utf8");
  const before = src;
  src = src.replace(/^title:\s*"[^"]*"/m, `title: "${esc(r.title)}"`);
  src = src.replace(/^excerpt:\s*"[^"]*"/m, `excerpt: "${esc(r.excerpt)}"`);
  if (src === before) { refused.push(`${r.slug}: title/excerpt fields not found to replace`); continue; }

  if (!dry) fs.writeFileSync(p, src);
  applied++;
}

console.log(`${dry ? "[DRY RUN] " : ""}applied ${applied}/${rewrites.length} rewrites`);
if (refused.length) {
  console.log(`\nrefused ${refused.length} (gate blocked — fix in the writing step):`);
  for (const r of refused) console.log("  - " + r);
}
