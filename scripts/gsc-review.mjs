#!/usr/bin/env node
/**
 * GSC REVIEW — the Claude judgment layer (audit → review → plan).
 *
 * Reads the deterministic audit (gsc-worklist.json + the dated report) plus the
 * two loop playbooks, and asks Claude for a prioritized action plan: what to fix,
 * what to kill, what to write next — grounded in how AdsX actually operates.
 *
 * Respects the gate discipline in the playbooks: it PROPOSES, it never edits
 * posts. Output is a plan for a human (or a later explicit run) to execute.
 *
 * Graceful: if ANTHROPIC_API_KEY is absent it prints a note and exits 0, so the
 * nightly pipeline still ships the deterministic audit. Any API error is caught
 * and never fails the pipeline.
 *
 * Model defaults to claude-opus-4-8 (override with GSC_REVIEW_MODEL).
 *
 * Usage: node scripts/gsc-review.mjs
 */
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = "gsc-data";
const MODEL = process.env.GSC_REVIEW_MODEL || "claude-opus-4-8";

const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "");

// Stable business grounding (from strategy memory) so the CI run doesn't depend
// on any local ~/.claude state.
const BUSINESS_CONTEXT = `
AdsX = paid ads + AI visibility consulting for Shopify / e-commerce sellers. The blog
drives Shopify signups (affiliate revenue via Impact) and consulting leads.

North-star metric: real human CLICKS, not impressions. ~82% of GSC impressions are
AI fan-out queries that can't be clicked — judge trends by clicks. The blog earns
~180 clicks/month; the structural constraint has been de-indexation, not CTR.

Two growth loops (see the playbooks below):
  1. CTR fix loop — rewrite truncated titles/excerpts on pages that already rank.
  2. Indexation kill/consolidate loop — remove thin, OFF-AUDIENCE programmatic pages
     (local services, B2B SaaS) that drag sitewide quality and crowd the index.
     BLOCKER before removing any page: verify it isn't earning real traffic.

Gate discipline (non-negotiable): never mass-edit without a visible quality sample;
verify traffic before killing; the ON-TOPIC gate is AdsX = Shopify/e-commerce sellers.
`.trim();

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log(
      `\n  GSC REVIEW — skipped (no ANTHROPIC_API_KEY).\n` +
        `  The deterministic audit is complete; set ANTHROPIC_API_KEY to add the ` +
        `Claude fix/kill/write-next plan.\n`
    );
    return;
  }

  const latest = fs.existsSync(path.join(DATA_DIR, "latest.json"))
    ? JSON.parse(read(path.join(DATA_DIR, "latest.json")))
    : null;
  const endDate = latest?.snapshot || "latest";
  const auditReport = read(path.join(DATA_DIR, "reports", `${endDate}-audit.md`)) || read(path.join(DATA_DIR, "reports", "latest-audit.md"));
  const worklist = read("gsc-worklist.json");
  if (!auditReport && !worklist) {
    console.log(`\n  GSC REVIEW — no audit found; run gsc-audit.mjs first. Skipping.\n`);
    return;
  }

  const playbooks =
    `--- CTR-LOOP-PLAYBOOK.md ---\n${read("CTR-LOOP-PLAYBOOK.md")}\n\n` +
    `--- INDEXATION-KILL-LOOP-PLAYBOOK.md ---\n${read("INDEXATION-KILL-LOOP-PLAYBOOK.md")}`;

  const system = [
    `You are the SEO/growth analyst for AdsX. Turn tonight's Search Console audit into a`,
    `short, prioritized action plan the operator can execute tomorrow.`,
    ``,
    BUSINESS_CONTEXT,
    ``,
    `The two loop playbooks that govern how work is done:`,
    ``,
    playbooks,
    ``,
    `Rules for your output:`,
    `- Lead with the single highest-leverage move, then a ranked list (5–8 items max).`,
    `- Every item: the action, the evidence from the audit, and which loop it belongs to.`,
    `- Weight CLICKS and INDEXATION over impressions. Protect kill-listed pages that now earn traffic.`,
    `- You PROPOSE. Never instruct a mass edit without a visible quality sample first.`,
    `- Be concrete and terse. Markdown. No preamble, no restating the data back.`,
  ].join("\n");

  const userContent =
    `Tonight's deterministic audit for ${endDate}:\n\n` +
    `=== AUDIT REPORT (markdown) ===\n${auditReport}\n\n` +
    `=== STRUCTURED WORKLIST (json, for exact numbers) ===\n${worklist}\n\n` +
    `Produce the prioritized fix / kill / write-next plan.`;

  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic(); // reads ANTHROPIC_API_KEY

  console.log(`\n  GSC REVIEW — asking ${MODEL} for the plan…`);
  // Stream to avoid CI HTTP timeouts on a long input; adaptive thinking for a judgment task.
  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: 12000,
    thinking: { type: "adaptive" },
    system,
    messages: [{ role: "user", content: userContent }],
  });
  const message = await stream.finalMessage();
  const plan = message.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();

  if (!plan) {
    console.log(`  (model returned no text — stop_reason: ${message.stop_reason}). Skipping write.`);
    return;
  }

  const header =
    `# GSC Plan — ${endDate}\n` +
    `_Generated by ${MODEL} from the nightly audit. Proposals only — apply through the ` +
    `gated loops in the playbooks, never mass-edit unreviewed._\n\n`;
  const out = header + plan + "\n";
  const reportsDir = path.join(DATA_DIR, "reports");
  fs.mkdirSync(reportsDir, { recursive: true });
  fs.writeFileSync(path.join(reportsDir, `${endDate}-plan.md`), out);
  fs.writeFileSync(path.join(reportsDir, "latest-plan.md"), out);

  const usage = message.usage || {};
  console.log(
    `  ✓ plan → ${path.join(reportsDir, `${endDate}-plan.md`)} ` +
      `(${usage.input_tokens || "?"} in / ${usage.output_tokens || "?"} out tokens)\n`
  );
}

main().catch((e) => {
  // Never fail the pipeline because the optional AI layer had a problem.
  console.warn(`\n  ⚠ GSC review skipped (non-fatal): ${e.message}\n`);
  process.exit(0);
});
