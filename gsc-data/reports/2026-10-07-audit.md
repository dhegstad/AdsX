# GSC Nightly Audit — 2026-10-07
_Property sc-domain:adsx.com · window 2026-07-09→2026-10-07 (90d, final) · through 2026-10-04_

## 1. Headline — clicks & indexation
> Judge by clicks, not impressions: ~82% of impressions are AI fan-out that can't be clicked.

- **Clicks (7d):** 63 (WoW -2%)
- **Clicks (28d):** 235 (28d MoM -12%)
- **Pages in search (indexation proxy):** 964 (-323 WoW) — distinct URLs that earned ≥1 impression
- **Sitemap:** 430 submitted _(Google's API no longer reports an indexed count — track "pages in search" above, or URL Inspection for exact status)_
- **Avg position:** 12.41

## 2. Kill-list reconciliation — indexation-loop BLOCKER
_Live posts on a kill list (`ctr-killlist.json` + `prune-list.json`) that now earn traffic. Per the playbook, drop these from any removal batch — removing a ranking page throws away clicks._

### 🛑 PROTECT — 9 kill-listed pages are earning traffic

| slug | clicks | impressions | pos |
|---|--:|--:|--:|
| shopify-magic-sidekick-ai-features-2026 | 2 | 3875 | 8.3 |
| migrate-from-godaddy-to-shopify | 1 | 97 | 9.4 |
| big-cartel-to-shopify-migration | 1 | 54 | 13.9 |
| migrate-wix-to-shopify-complete-guide | 0 | 485 | 43.1 |
| shopify-vs-magento-comparison | 0 | 209 | 25.4 |
| shopify-vs-wix-ecommerce | 0 | 96 | 21.2 |
| shopify-vs-woocommerce-comparison | 0 | 38 | 43.6 |
| migrate-from-square-online-to-shopify | 0 | 34 | 27.4 |
| shopify-vs-bigcommerce-comparison | 0 | 24 | 25.6 |

Safe to remove (live, ~0 traffic): **2** slugs (see `gsc-worklist.json`).

## 2b. Zombie URLs — dead pages Google still crawls
_Retired URLs (pruned posts + killed programmatic sections) that still draw impressions. They should decay toward zero now that they 404. **If this share climbs, something is bulk-redirecting dead URLs to a generic page again** — that reads as a soft 404 and keeps them alive. See INDEXATION-KILL-LOOP-PLAYBOOK.md._

- **459 dead URLs still indexed** — 40,292 impressions (**17% of all site impressions**), 110 clicks
- 89 of them already 308 to a relevant live page (decaying correctly)
- **26 still earn human clicks with no redirect** — each needs a 308 to the live page answering the same question (never `/blog` or `/`), or the traffic is thrown away:

| dead url | clicks | impr | pos | kind |
|---|--:|--:|--:|:--|
| /blog/shopify-dropshipping-fulfillment-times | 2 | 101 | 10.4 | pruned-post |
| /apps/best-shopify-digital-download-apps | 1 | 369 | 26.4 | killed-section |
| /blog/shopify-pos-go-guide | 1 | 261 | 11.4 | pruned-post |
| /glossary/perplexity-merchant-program | 1 | 259 | 9.6 | killed-section |
| /blog/shopify-terms-of-service-template | 1 | 148 | 16.2 | pruned-post |
| /blog/shopify-browse-abandonment-email | 1 | 127 | 20.7 | pruned-post |
| /glossary/oai-searchbot | 1 | 109 | 8.1 | killed-section |
| /blog/college-students-10k-month-shopify | 1 | 94 | 9.6 | pruned-post |
| /blog/shopify-for-yarn-wool-stores | 1 | 82 | 12 | pruned-post |
| /blog/migrate-weebly-to-shopify-guide | 1 | 73 | 11 | pruned-post |
| /blog/shopify-customer-testimonial-strategy | 1 | 69 | 13.7 | pruned-post |
| /blog/shopify-uae-dubai-complete-guide | 1 | 65 | 19 | pruned-post |
| /blog/shopify-discount-code-strategy-without-eroding-brand | 1 | 57 | 9.4 | pruned-post |
| /sell/spice-blends | 1 | 51 | 6.7 | killed-section |
| /glossary/ai-powered-checkout | 1 | 49 | 8 | killed-section |
| /blog/shopify-for-chocolate-candy | 1 | 42 | 9.8 | pruned-post |
| /blog/google-universal-cart-marketing-live-2026-shopify | 1 | 32 | 24.3 | pruned-post |
| /sell/homemade-jam | 1 | 31 | 10.2 | killed-section |
| /blog/shopify-brand-building-ecommerce | 1 | 28 | 19.5 | pruned-post |
| /sell/natural-dye-textiles | 1 | 23 | 6.3 | killed-section |

## 3. Query movement
_No prior snapshot yet — deltas begin once a second night runs._

### "Almost there" — non-brand queries stuck on page 2 (real demand, one nudge from clicks)
| query | impressions | pos | clicks |
|---|--:|--:|--:|
| openai new feature update february 26 2026 | 3290 | 9 | 0 |
| shopify vs ecwid | 1876 | 9.9 | 0 |
| ai visibility training | 916 | 12.5 | 0 |
| chatgpt latest features 2026 agent capabilities | 771 | 10 | 0 |
| shopify plan differences analytics reports basic vs shopify vs advanced vs plus attribution features | 695 | 8.9 | 0 |
| shopify plans | 634 | 8.6 | 0 |
| ads x | 473 | 8.8 | 5 |
| pmax budget protection mechanisms negative keywords brand exclusions | 389 | 8 | 0 |
| openai latest announcement february 2026 | 343 | 9.2 | 0 |
| shopify payments vs paypal | 341 | 19.3 | 0 |
| social proof app | 321 | 19.4 | 0 |
| countdown timer urgency engagement mobile app | 242 | 8.7 | 0 |
| openai new release announcement february 2026 | 241 | 8.3 | 0 |
| ai visibility toolkit crash course | 218 | 17 | 0 |
| shopify attribution features by plan basic advanced plus differences | 213 | 9.8 | 0 |

## 4. CTR bleeders — secondary, position-aware
_Est. recoverable = impressions × (expected CTR for the position − actual CTR): an **upper bound**, ranked so editable clickable posts (the real CTR-fix candidates) lead. Pages at ~0% CTR despite heavy impressions are usually **AI-Overview / fan-out** impressions that can't be clicked — per strategy, judge by clicks, not impressions. Flags: `✓ fixable` · `kill-listed (pruned)` · `not a live post` · `⚠ ~0-click` · `★ queued`._

| page | impr | pos | CTR | est. recoverable | signal |
|---|--:|--:|--:|--:|:--|
| trending-products-sell-shopify-2026 | 10469 | 7.7 | 0.17% | 275.1 | ✓ fixable |
| shopify-shop-app-customer-discovery | 5371 | 9.5 | 0.43% | 100.5 | ✓ fixable |
| shopify-payments-vs-stripe-vs-paypal | 5773 | 13.5 | 0.12% | 68 | ✓ fixable |
| meta-ads-learning-phase-exit-tactics | 3040 | 8.6 | 0.20% | 63.9 | ✓ fixable |
| meta-ads-cost-cap-vs-bid-cap-when-to-use | 2710 | 9.1 | 0.30% | 54.3 | ✓ fixable |
| shopify-1-dollar-3-months-deal-2026 | 1519 | 7 | 0.20% | 50.2 | ✓ fixable |
| shopify-starter-plan-five-dollars-review | 2547 | 9.4 | 0.35% | 49.6 | ✓ fixable |
| shopify-brazil-complete-guide | 2106 | 8.8 | 0.14% | 45.4 | ✓ fixable |
| claude-code-shopify-theme-liquid-build-guide | 3166 | 8.7 | 0.88% | 44.8 | ✓ fixable |
| shopify-poland-complete-guide | 1452 | 9.5 | 0.34% | 28.4 | ✓ fixable |
| ai-visibility-ebay-sellers | 1368 | 9 | 0.29% | 27.5 | ✓ fixable |
| shopify-productset-vs-productcreate | 859 | 7.2 | 0.35% | 27.1 | ✓ fixable |
| shopify-vs-patreon-comparison | 1418 | 7.2 | 1.69% | 25.6 | ✓ fixable |
| shopify-for-knives-cutlery | 1207 | 9.2 | 0.50% | 21.8 | ✓ fixable |
| unique-product-ideas-shopify-store-2026 | 1278 | 10.4 | 0.47% | 19.6 | ✓ fixable |

---
_Deterministic audit. The prioritized plan (fix / kill / write-next) is produced by the Claude review layer when `ANTHROPIC_API_KEY` is set; otherwise act on the signals above per CTR-LOOP-PLAYBOOK.md and INDEXATION-KILL-LOOP-PLAYBOOK.md._
