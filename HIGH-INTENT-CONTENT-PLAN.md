# High-Intent Shopify Content Plan — Merchant Acquisition

Generated 2026-07-24 from the fresh GSC export (`adsx.com-Performance-on-Search-2026-07-24`,
last 3 months), the live 321-post inventory, and the 875-slug prune kill list.
Goal: grow Shopify affiliate signups ($150/bounty) toward $3K/mo (~20 signups/mo).

## The hard lesson this plan is built on

Almost every "obvious" high-intent topic was already written once and earned zero
clicks in 6 months — that's why 875 posts died on Jul 6. The graveyard includes
`shopify-pricing-plans-guide-2026`, `shopify-customer-service-guide`, the entire
migration library (wix/woo/bigcommerce/magento/square/godaddy/amazon/ebay), 43+
"best X apps" posts, the email-marketing cluster (18 posts), POS guides, and
`shopify-plus-features-guide`. Most died as demotion-era casualties, but the
takeaway stands: **me-too generic content from this domain has already failed once.**

### Rules for every new post
1. **Demand evidence required** — the topic must show impressions in the CURRENT
   GSC export (or a proven ranking gap). No speculative volume.
2. **Differentiated or dead** — hands-on testing, real data tables, the AI/agent
   angle (our strongest cluster), or a perspective Shopify's own docs can't take.
3. **Fresh slug, always** — never reuse a killed slug (308 redirects live on them;
   Google remembers zero-value URLs).
4. **Check this file + `prune-list.json` + live posts before writing anything.**
5. Affiliate links are auto-tracked (`src/lib/affiliate.ts`), but author with the
   Impact link directly. Interlink every post into the Launch Stack money hub.
6. **Cadence: 3–5 posts/week max.** The site is 2.5 weeks into demotion recovery;
   a 50-post dump is how we got hurt.

### Where NOT to write new posts (title-round candidates instead)
These queries already rank ~pos 9 on live posts but earn 0 clicks — that's a
title/CTR problem for the August round, not a content gap:
- "shopify free trial length/duration 2026" (~330 imps) → `shopify-free-trial-2026-complete-guide`
- "shopify starter plan pricing official 2026" (~800 imps) → `shopify-starter-plan-five-dollars-review`
- Theme queries (~400 imps) → the two live themes posts

---

## Wave 1 — 15 items — ✅ SHIPPED 2026-07-24 (commit 330da1c)

All 14 new posts + the payments refresh went live 2026-07-24 and were submitted
to IndexNow. Card rates verified against 2026 sources (2.9/2.7/2.5 + 30¢ online;
2/1/0.6 gateway surcharge) and normalized site-wide, including the older
payments post. Measure ~Aug 20 (GSC filtered Jul 6+) before starting Wave 2.

### Pillar A: Pricing & Plans (biggest pool: 12.3K impressions/3mo)
| # | Slug | Working title | Evidence | Differentiation |
|---|------|--------------|----------|-----------------|
| 1 | `shopify-pricing-2026-every-plan-real-cost` | Shopify Pricing 2026: What Every Plan Actually Costs Per Month | Head terms + 800 starter-plan imps; prior generic guide died | Real-cost math: plan fee + card rates + typical app stack; updated monthly |
| 2 | `shopify-basic-vs-shopify-vs-advanced-analytics` | Shopify Basic vs Shopify vs Advanced: Analytics, Reports & Attribution Compared | 8.5K imps of AI fan-out on exactly this (pos 6–9) | The per-plan analytics/attribution table nobody has; AEO citation play |
| 3 | `shopify-plus-vs-advanced-when-to-upgrade` | Shopify Plus vs Advanced: The Real Upgrade Math | 128 imps, pos 45–68, zero coverage | Break-even calculator (fees + features); enterprise signups |
| 4 | `shopify-transaction-credit-card-fees-explained` | Shopify's Credit Card & Transaction Fees, Explained With Math | Fees queries in zone; complements true-cost post | Worked examples per plan/volume; interlink pricing hub |

### Pillar B: Switching to Shopify (redo only where impressions prove demand)
| # | Slug | Working title | Evidence | Differentiation |
|---|------|--------------|----------|-----------------|
| 5 | `kartra-vs-shopify-2026` | Kartra vs Shopify (2026): Funnels vs a Real Store | 270 imps at pos 5–6 with NO page — fastest win | Creator-platform cluster interlinks (teachable/stan-store/patreon live) |
| 6 | `magento-to-shopify-plus-migration-2026` | Magento to Shopify Plus: 2026 Migration Playbook | 133 imps pos 39–63, zero coverage | Enterprise angle: real cost/timeline, Plus-specific; EOL urgency |
| 7 | `stripe-checkout-vs-shopify-store` | Selling With Stripe Payment Links vs Opening a Shopify Store | 114 imps "stripe vs shopify" | Indie-hacker angle nobody covers; feeds signup funnel |

### Pillar C: Apps for merchants (only categories with live impressions)
| # | Slug | Working title | Evidence | Differentiation |
|---|------|--------------|----------|-----------------|
| 8 | `shopify-social-proof-apps-tested` | We Installed 7 Shopify Social Proof Apps — Here's What's Worth It | 760 imps pos 20–24 (prior generic version killed) | Install-and-test format, screenshots, real pricing |
| 9 | `shopify-seo-apps-tested` | Shopify SEO Apps Tested: Which Ones Move Rankings | 519 imps pos 20–50 (prior version killed) | Same tested format; ties to our AI-SEO expertise |

### Pillar D: Trust, Support & Benefits (zero live coverage)
| # | Slug | Working title | Evidence | Differentiation |
|---|------|--------------|----------|-----------------|
| 10 | `shopify-customer-support-tested-2026` | Does Shopify Have Good Customer Support? We Tested Every Channel | Pre-sale objection; zone empty; buyer-facing (killed post was merchant how-to) | Actual response-time tests: chat, email, community, Sidekick |
| 11 | `shopify-pros-cons-2026` | Shopify Pros and Cons in 2026: The Honest List | Benefits zone empty; pairs with pricing hub | Includes when NOT to choose Shopify (credibility = conversions) |

### Pillar E: Money & Banking on Shopify
| # | Slug | Working title | Evidence | Differentiation |
|---|------|--------------|----------|-----------------|
| 12 | `what-is-shop-pay-merchants-buyers` | What Is Shop Pay? What Merchants and Buyers Actually Get | 71+ imps "shop pay vs paypal"; Shop-app post covers the app, not Shop Pay | Conversion-rate data angle |
| 13 | `shopify-balance-review-2026` | Shopify Balance Review: Banking Built Into Your Store | "is shopify balance worth it" pos 6 already earning clicks on tiny imps | Real usage walkthrough; new-seller banking angle |
| 14 | REFRESH `shopify-payments-vs-stripe-vs-paypal` | (no new post) | "shopify payments vs paypal" 452 imps at pos 14.4 | Add dedicated PayPal-vs section + FAQ schema to the live post — avoids cannibalization |

### Pillar F: Signup (pure bottom-funnel)
| # | Slug | Working title | Evidence | Differentiation |
|---|------|--------------|----------|-----------------|
| 15 | `how-to-sign-up-shopify-step-by-step` | How to Sign Up for Shopify: Every Step, Every Decision (2026) | Never existed; internal CTA target for all funnels | Screenshot walkthrough; links 1MBB + $1 deal + trial guides into a signup hub |

---

## Wave 2 — gated on the ~Aug 20 measurement (GSC filtered to Jul 6+)

**Shipped ahead of the gate (2026-07-31, at direction):**
- `kajabi-vs-shopify-2026` — fresh-slug revival of the pruned `shopify-vs-kajabi-comparison`, built to mirror the proven Wave 1 winner `kartra-vs-shopify-2026`. Demand: "kajabi shopify" 202 impr @ pos 14.7 with no live page (the old killed URL still ranks and 308-redirects, so we were leaking the demand). Creator-platform cluster; inbound links added from kartra / teachable / selling-digital-products. Pricing verified against 2026 sources (Basic $179/$143 annual, Pro $499/$399; $89 Kickstarter pulled Jan 2026).
- Harvest (PR #35): contextual internal links boosting the 3 striking-distance pages (`shopify-payments-vs-stripe-vs-paypal`, `shopify-editions-2026-new-features`, `shopify-claude-ai-integration-automation`) to 10 inbound each.
- Measure both at the ~Aug 20 checkpoint alongside Wave 1.

Ship only what Wave 1's data supports:
- **Migration redos**: wix-to-shopify, woocommerce-to-shopify (keep-your-SEO angle) — only if Wave 1 migration posts get impressions
- **Dropshipping zone** (zero live coverage): "Is Shopify good for dropshipping in 2026?" (~110 imps across queries), niches post
- **App categories**: email marketing apps, review apps, upsell, subscriptions — one at a time, tested format, only with impressions
- **Free vs paid themes decision post** (~48 imps on exactly this, pos 11)
- **POS/retail starter** — no current impression evidence; killed twice; lowest priority
- **"Is Shopify worth it 2026"** — killed once; redo only with original data (e.g., real store P&L)
- **Shopify Markets / selling internationally** — no current evidence; check Aug export

## Measurement
- ~Aug 5–10: pull GSC export date-filtered to Jul 6+ → judges prune recovery + current titles (title freeze holds until then)
- ~Aug 20: same filter → judges Wave 1 posts → greenlights Wave 2
- KPI: clicks (not impressions — ~82% of impressions are AI fan-out) and Impact signups
