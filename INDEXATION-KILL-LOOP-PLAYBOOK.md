# Indexation Kill/Consolidate Loop — Playbook

Companion to `CTR-LOOP-PLAYBOOK.md`. Where the CTR loop fixes pages that rank,
this loop removes pages that *shouldn't exist* — the thin, off-audience
programmatic content dragging down sitewide quality and (per the indexation
decline) keeping ~half the library out of Google's index.

## The loop

```
inventory → categorize → verify-traffic (GSC) → repoint links → remove + redirect → measure index
```

## The target cluster (identified 2026-06-23)

`ai-visibility-*` is a **120-post programmatic cluster**. Split:
- **~63 OFF-AUDIENCE** — local services (plumbers, dentists, law firms, HVAC,
  roofing, salons, veterinarians, restaurants, real estate…) and B2B SaaS
  (martech, analytics tools, devtools, fintech, HR tech…). AdsX serves
  Shopify/e-commerce sellers; a plumber will never read these. Classic doorway
  pages. → `ctr-killlist.json`
- **~57 KEEP** — genuine e-commerce/DTC product niches (jewelry, eyewear,
  mattresses, hot sauce, pet products, subscription boxes…) and framework hubs
  (optimization-complete-guide, roi-calculator, pyramid-framework, benchmarks).

### Borderline — review before acting
`architects`, `insurance-companies`, `bakeries`, `florists-flower-shops`,
`breweries-craft-beer` — service/hybrid businesses that *can* sell online via
Shopify. Decide case-by-case; don't auto-kill.

## Link topology (measured)
- Inbound links to the 63: **152 from other dying posts** (vanish automatically)
  + **41 from 25 KEEPER posts** (must be repointed before removal).
- All 63 are interlinked (3–4 inbound each); zero orphans.

## Execution sequence (one PR, when approved)
1. **Verify traffic first (BLOCKER):** pull a fresh GSC export and drop any of
   the 63 that earn real clicks/impressions — removing a ranking page throws
   away traffic. Do NOT skip this (see the CTR round-3 lesson in memory).
2. **Repoint** the 41 keeper→off-audience links to the nearest on-audience
   equivalent or the `ai-visibility-optimization-complete-guide` hub.
3. **Remove** the confirmed-dead `.mdx` files.
4. **Retire** each removed URL. The rule is per-URL, never in bulk:
   - **Still earns human clicks?** 308 to the *one live page that answers the
     same question*. A relevant destination is the only thing that makes a
     redirect legitimate.
   - **Earns nothing?** Let it **404** (or 410). A plain 404 is a clean removal
     signal Google acts on quickly.
   - **Never** point a batch of removed URLs at `/blog`, `/`, or any other
     generic hub. See the postmortem below — this is the mistake that cost four
     months.
5. **Measure** indexed-page count in GSC over the following weeks.

## Postmortem — the July 2026 prune (why step 4 is now this strict)

The July 6 prune removed 867 blog posts and ~490 programmatic URLs, then
308-redirected **all of them** to `/blog` or `/` — a single blanket rule instead
of the per-URL triage above.

Google treats a redirect to an irrelevant page (a generic listing or the
homepage) as a **soft 404**: the URL is neither cleanly removed nor credited.
The result, measured in the 2026-08-15 GSC pull:

| | |
|---|---|
| Dead URLs still indexed six weeks later | **812** |
| Impressions they drew | **101,960 — 32% of the entire site** |
| Clicks they returned | ~107 |
| Pruned URLs still earning clicks, dumped on `/blog` | **71** (≈90 clicks/quarter thrown away) |
| Brand-new conversion hubs indexed in the same period | ~0 (10 impressions across all three) |

The prune was the right call; the retirement mechanism was not. Fixed
2026-08-18 by the triage in `src/lib/seo/pruned-slugs.ts` (71 relevant
redirects, everything else 404) and the rewritten `redirects()` block in
`next.config.ts`.

**The one-line rule:** a redirect is a promise that the destination answers the
same question. If you can't name that page, it's a 404.

## Why this matters
Indexed pages have been declining toward ~543 of 1,151. Removing ~63 thin
off-audience pages (and tightening crawl budget onto the on-brand library) is the
structural fix the CTR loop can't provide.

## Status
Inventory + categorization + link topology DONE (read-only). Execution BLOCKED
pending a fresh GSC traffic check + user go-ahead. Nothing removed yet.
