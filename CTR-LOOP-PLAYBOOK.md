# CTR Fix Loop — Playbook

The single highest-leverage growth loop for AdsX. We rank for ~526K impressions
but convert ~0.1% of them to clicks (industry avg 2–3%). That gap ≈ **~10,000
missed visits/month from traffic we already have** — bigger than any new post can
deliver. Root cause is mechanical: 47% of titles and 57% of meta descriptions are
truncated in Google's results. This loop fixes that, systematically.

## The loop

```
  scan  →  prioritize  →  write  →  gate  →  apply  →  deploy  →  measure  →  (repeat)
```

1. **Scan** — `node scripts/ctr-audit.mjs`
   Scores every post's `title` + `excerpt` (the only two fields Google shows).
   Splits CRITICAL (SERP truncated/broken — real CTR loss) from advisory
   (punch-ups). Writes `ctr-worklist.json`, sorted worst-first.

2. **Prioritize** — Repo-only: by critical-issue count (already sorted).
   With GSC: re-sort by `impressions × (2% − actualCTR)` so we fix the pages
   bleeding the most real clicks first. GSC export slots in here later.

3. **Write** (the judgment step) — for each post, rewrite:
   - **title** → ≤60 chars, keyword front-loaded, one specific hook (number /
     outcome / year if time-sensitive). No clickbait sameness.
   - **excerpt** → 110–155 chars, complete sentence, benefit + light CTA,
     keyword present.
   - **ON-TOPIC GATE**: AdsX = paid ads + AI visibility for Shopify/e-commerce
     sellers. If a post is off-audience (e.g. "AI visibility for accountants /
     cleaning services"), DO NOT rewrite — route it to the indexation/kill loop.
     The scanner can't see topicality; the writer must.

4. **Gate + Apply** — `node scripts/ctr-apply.mjs rewrites.json [--dry-run]`
   Refuses any rewrite over the SERP limits or with bad quoting. A bad batch
   cannot ship. Refused items go back to the write step.

5. **Deploy** — commit + push (apex adsx.com must stay 200, no www redirect).

6. **Measure** — 2 weeks later, compare CTR in GSC for changed URLs. Feed
   learnings (which hooks lifted CTR) back into the write step.

## Files
- `scripts/ctr-audit.mjs` — scanner/scorer (deterministic)
- `scripts/ctr-apply.mjs` — gated applier (deterministic)
- `ctr-worklist.json` — current worklist (generated; git-ignored candidate)
- rewrites are produced per-batch by the write step (LLM)

## Current state (2026-06)
- 1,116 posts; 899 with CRITICAL SERP issues; 116 advisory-only.
- The `ai-visibility-[niche]` programmatic cluster is both the worst CTR offender
  AND largely off-audience → most of it belongs in the kill/consolidate loop,
  not here.

## Scaling the write step
- Small batches: drive an agent over N worklist items → rewrites.json → gate-apply.
- Full corpus: a fan-out workflow (one agent per batch) — opt in explicitly.
- Never bypass the gate. Never mass-edit without a visible quality sample first.
