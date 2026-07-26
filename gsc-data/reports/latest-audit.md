# GSC Nightly Audit — 2026-07-26
_Property sc-domain:adsx.com · window 2026-04-27→2026-07-26 (90d, final) · through 2026-07-24_

## 1. Headline — clicks & indexation
> Judge by clicks, not impressions: ~82% of impressions are AI fan-out that can't be clicked.

- **Clicks (7d):** 63 (baseline — first run)
- **Clicks (28d):** 310
- **Pages in search (indexation proxy):** 1,382 — distinct URLs that earned ≥1 impression
- **Sitemap:** 1,038 submitted _(Google's API no longer reports an indexed count — track "pages in search" above, or URL Inspection for exact status)_
- **Avg position:** 11.4

## 2. Kill-list reconciliation — indexation-loop BLOCKER
_Live posts on a kill list (`ctr-killlist.json` + `prune-list.json`) that now earn traffic. Per the playbook, drop these from any removal batch — removing a ranking page throws away clicks._

✓ No live kill-listed page is currently earning traffic — the removal batch is clean to proceed.

Safe to remove (live, ~0 traffic): **0** slugs (see `gsc-worklist.json`).

## 3. Query movement
_No prior snapshot yet — deltas begin once a second night runs._

### "Almost there" — non-brand queries stuck on page 2 (real demand, one nudge from clicks)
| query | impressions | pos | clicks |
|---|--:|--:|--:|
| shopify plan differences analytics reports basic vs shopify vs advanced vs plus attribution features | 3219 | 8.9 | 0 |
| openai new feature update february 26 2026 | 2811 | 8.3 | 0 |
| selling trading strategy pdfs on gumroad vs shopify vs own site | 2464 | 8.4 | 0 |
| chatgpt latest features 2026 agent capabilities | 1466 | 9.7 | 0 |
| countdown timer urgency engagement mobile app | 1106 | 11.2 | 0 |
| ai visibility training | 720 | 19.5 | 0 |
| "shopify" cost optimization | 714 | 10 | 0 |
| shopify analytics plan differences basic vs advanced vs plus attribution features | 624 | 8.6 | 0 |
| high performing ad hooks vintage thrift fashion resale 2025 | 604 | 10.9 | 0 |
| shopify payments vs paypal | 441 | 14.6 | 0 |
| shopify and vtex latest platform updates 2026 | 395 | 8.9 | 0 |
| evaluate the fintech company shopify on cash flow management | 368 | 9.1 | 0 |
| ads x | 339 | 10.3 | 3 |
| shopify starter plan pricing official 2026 | 337 | 8.7 | 0 |
| ai visibility tools for fintech companies | 330 | 10.3 | 0 |

## 4. CTR bleeders — secondary, position-aware
_Est. recoverable = impressions × (expected CTR for the position − actual CTR): an **upper bound**, ranked so editable clickable posts (the real CTR-fix candidates) lead. Pages at ~0% CTR despite heavy impressions are usually **AI-Overview / fan-out** impressions that can't be clicked — per strategy, judge by clicks, not impressions. Flags: `✓ fixable` · `kill-listed (pruned)` · `not a live post` · `⚠ ~0-click` · `★ queued`._

| page | impr | pos | CTR | est. recoverable | signal |
|---|--:|--:|--:|--:|:--|
| shopify-payments-vs-stripe-vs-paypal | 13590 | 8.2 | 0.10% | 366.5 | ✓ fixable |
| shopify-editions-2026-new-features | 16022 | 8.8 | 0.14% | 345.5 | ✓ fixable |
| best-free-shopify-themes-2026 | 7079 | 8.2 | 0.11% | 190.2 | ✓ fixable |
| shopify-claude-ai-integration-automation | 7975 | 9.1 | 0.53% | 141.4 | ✓ fixable |
| shopify-vs-patreon-comparison | 3727 | 7.2 | 0.72% | 103.4 | ✓ fixable |
| best-paid-shopify-themes-2026 | 4235 | 9.1 | 0.17% | 90.4 | ✓ fixable |
| shopify-shop-app-customer-discovery | 3307 | 8.1 | 0.27% | 83.6 | ✓ fixable |
| shopify-brazil-complete-guide | 3741 | 8.7 | 0.16% | 80 | ✓ fixable |
| summer-2026-ecommerce-trends-shopify | 1381 | 6.7 | 0.14% | 46.3 | ✓ fixable |
| brands-winning-ai-search | 1111 | 6.1 | 0.90% | 40 | ✓ fixable |
| shopify-productset-vs-productcreate | 1181 | 7.9 | 0.17% | 31.1 | ✓ fixable |
| meta-ads-cost-cap-vs-bid-cap-when-to-use | 1517 | 9 | 0.26% | 30.9 | ✓ fixable |
| shopify-returns-exchanges-apps | 2512 | 10.6 | 0.12% | 29.7 | ✓ fixable |
| shopify-vs-stan-store-comparison | 1453 | 10.2 | 0.14% | 27.1 | ✓ fixable |
| shopify-for-farms-produce | 1274 | 8.7 | 0.47% | 23.3 | ✓ fixable |

---
_Deterministic audit. The prioritized plan (fix / kill / write-next) is produced by the Claude review layer when `ANTHROPIC_API_KEY` is set; otherwise act on the signals above per CTR-LOOP-PLAYBOOK.md and INDEXATION-KILL-LOOP-PLAYBOOK.md._
