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
- `google-universal-cart-shopify-merchants-2026` (NEW, 2026-07-31) — timely bet on the strongest (AI/agentic) cluster. Google Universal Cart launched at I/O May 2026, rolling out over summer across Search/Gemini/YouTube/Gmail; merchant-actionable (Merchant Center + Shopify Catalog on-ramp, UCP/AP2). Fresh slug — the prior speculative `google-universal-cart-marketing-live-2026-shopify` was pruned. Honest risk: no GSC demand yet + cluster has kill history, so judge by clicks at Aug 20, not impressions.
- REFRESH `chatgpt-instant-checkout-merchant-readiness` (live page corrected, 2026-07-31) — the June-7 post told merchants to integrate ChatGPT Instant Checkout, but OpenAI **scrapped it ~Mar 2026** (only ~12 Shopify merchants ever live; The Information 3/6, CNBC 3/24) and pivoted to discovery-first. Rewrote body/title/faqs to reflect reality (discovery-first; what to do now; Copilot/Perplexity/Universal Cart landscape). Kept slug for URL equity; title changed as a **freeze exception for a factually-wrong page**. Cross-linked to the Universal Cart post.
- DROPPED as killed traps (NOT recreated): AI product recommendations / personalization — `shopify-ai-product-recommendation-apps`, `shopify-product-recommendation-strategies`, `shopify-ai-personalization-guide` are all in the prune graveyard. Recreating would repeat the mistake.
- Measure all at the ~Aug 20 checkpoint alongside Wave 1.

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

---

## 2026-08-11 — Automated title/CTR round + recovery-read attempt

**Data used:** `npm run gsc:pull` failed (no OAuth creds in this cloud sandbox — expected,
see GSC-SETUP.md). Fell back to the newest committed snapshot, `gsc-data/2026-07-26`
(final data through **2026-07-24**). That snapshot is **17 days stale as of today** and,
critically, **predates every Jul 31–Aug 1 change** (the harvest, Kajabi, Universal Cart,
the 1MBB retitle, the ChatGPT-checkout refresh) — none of those show up in it at all.

**Recovery read: not measurable this round.** The 3 harvested pages
(`shopify-payments-vs-stripe-vs-paypal`, `shopify-editions-2026-new-features`,
`shopify-claude-ai-integration-automation`) and all 5 Jul 31–Aug 1 posts/refreshes need a
GSC pull dated **after Jul 31** to show any effect. Re-run once real OAuth-backed data is
available (locally, or wire creds into this environment) — this run cannot tell you if the
harvest worked.

**Title/CTR round shipped** (7 posts, all CTR bleeders at pos ~7–10 with thousands of
impressions and <0.15% CTR per the Jul 24 data; titles front-loaded to the actual ranking
query per `queries.json`, kept accurate, no clickbait):

| Slug | Before | After |
|---|---|---|
| `shopify-editions-2026-new-features` | Shopify Editions 2026: 150+ New Features, Ranked | Shopify Editions Summer 2026: All 150+ Features |
| `shopify-payments-vs-stripe-vs-paypal` | Shopify Payments vs Stripe vs PayPal: Cheapest 2026 | Shopify Payments vs Stripe vs PayPal: 2026 Fees |
| `trending-products-sell-shopify-2026` | 20 Trending Products to Sell on Shopify in 2026 | Shopify Trending Products 2026: 20 Picks + Margins |
| `best-free-shopify-themes-2026` | Best Free Shopify Themes 2026: 15 Tested and Ranked | Best Free Shopify Themes 2026: Top 3 by Conversion |
| `shopify-starter-plan-five-dollars-review` | Shopify Starter Plan $5/Month: 2026 Review & Limits | Shopify Starter Plan Pricing 2026: $5/Mo Reviewed |
| `shopify-store-ideas-profitable-niches-2026` | 99 Profitable Shopify Store Ideas for 2026, Ranked | 99 Shopify Store Ideas 2026: Ranked by Profit Margin |
| `shopify-free-trial-2026-complete-guide` | Shopify Free Trial 2026: 3 Days Free + $1/Month for 3 Months | Shopify Free Trial 2026: Length, Cost & How to Claim |

Excerpts (meta descriptions) rewritten to match — see individual `.mdx` frontmatter for
exact text. No slugs changed, no pruned slugs touched, no new posts created.

**Noted but not touched:** `chatgpt-updates-february-2026` (20.4K impressions, 0.005% CTR,
pos 10.2) — this looks like content staleness (queries are for "june/july 2026 chatgpt
updates"), not a title problem; a title tweak alone won't fix a page whose news has aged
out. Flagging for a content-refresh pass, not this round. `shopify-admin-api-guide` (4.8K
impressions, ~0% CTR) shows heavy "official documentation" query intent that a third-party
guide title may not be able to win regardless of wording — lower priority than the 7 above.

**Next run:** get a live GSC pull (Aug 5+ data) before attempting the recovery read again.

---

## 2026-08-20 — Wave 2 greenlight measurement + INDEXATION BLOCKER found

**Data:** `npm run gsc:pull` failed (no OAuth creds in this cloud sandbox — expected). Fell
back to the newest committed snapshot `gsc-data/2026-08-15` (90d window, final data through
**2026-08-12**) — 8 days stale, but the first snapshot that post-dates every Jul 24 → Aug 1
change. Site totals: 806 clicks / 305,860 impr / pos 12.72 over 90d; 28d clicks trend
310→305→311→**268** (−14%), flat-to-down. Judged by clicks (~82% impressions are AI fan-out).

### 🚨 Root-cause finding: nothing published since ~mid-June is indexed
**All 17 net-new posts from Wave 1 (Jul 24) + the late-July batch have ZERO impressions** in
the Aug 15 snapshot — not low, *zero*, i.e. not in `pages.json` at all, ~3 weeks after
shipping. Meanwhile every *older* post shows data, and the **old killed slugs still pull
impressions** (`shopify-vs-kartra-comparison` 367 impr at pos 10.9 while its fresh replacement
`kartra-vs-shopify-2026` gets 0).

The cause is the sitemap, already diagnosed in `scripts/gsc-sitemaps.mjs` (committed Aug 18,
PR #46) but **not yet fixed on the live property** as of the Aug 15 snapshot:
- Registered sitemaps Google sees: three dead `/sitemap/{0,1,2}.xml` chunks (404 / erroring
  since **Jun 16**, i.e. pre-Wave-1) + a **non-www** `adsx.com/sitemap.xml` (non-canonical).
- The real, current single-file **`www.adsx.com/sitemap.xml` is UNREGISTERED** — the one file
  that actually lists every Wave 1+ URL is not submitted, so Google's URL set predates all new
  content.

**Fix (needs a human — cannot run here):** `npm run gsc:auth` (re-consent for the write scope),
then `npm run gsc:sitemaps -- --fix` to un-register the dead paths and submit the canonical
sitemap. This sandbox has no GSC credentials at all, so it cannot run either. **Until this
ships, no new or refreshed content will be discovered via sitemap and the Wave 2 measurement
stays invalid.**

### Measurement of the interventions
- **Wave 1 + late-July net-new (17 posts):** unmeasurable — never indexed (see above). Their
  0-click result is a *false negative from the indexation bug*, NOT proof the content failed.
- **Aug 11 title/CTR round (7 posts):** no clear lift. Click deltas (e.g. editions 23→20,
  payments 14→12, starter 3→6, trending 7→10) track position drift (~0.5–1 spot slips), not CTR
  gains. Site clicks flat-to-down over the same window. Do **not** re-churn these titles —
  title-thrash on already-worked pages risks Google distrusting the signal.
- **Harvest (3 striking-distance pages):** no lift; `shopify-claude-ai-integration-automation`
  fell 42→28 clicks (pos 9.1→9.8). Internal-link harvest did not move these pages.

### Wave 2 gate DECISION: NO net-new posts greenlit
Applying the saturation rule strictly: there is **no proven live-winner analog** (we have zero
valid click data on any post-Jul-24 net-new post), and pushing more URLs into a sitemap Google
isn't reading is wasteful and risks the demotion signal. Greenlighting new content now would
repeat the Wave 1 mistake at larger scale. **Blocked pending the sitemap fix + a clean post-fix
GSC pull to re-measure Wave 1 honestly.**

### Shipped this run (indexation-independent refresh)
- **REFRESH `chatgpt-updates-february-2026`** — the site's single biggest impression page
  (**23,174 impr / pos 10.1 / 2 clicks**, 0.009% CTR) and factually **wrong** on its two
  headline claims: it told merchants Instant Checkout was arriving with 1M+ Shopify merchants
  (OpenAI **retired Instant Checkout ~Mar 2026**, pivoted to discovery-first) and named GPT-5.2
  as flagship (now **GPT-5.6 "Sol"**, Aug 2026). It was also **orphaned** (zero internal links).
  Chose this because it's already indexed (recrawls independent of the broken sitemap), sits in
  the preferred "refresh stale/wrong live posts" lane, and is on our strongest (AI/agentic)
  cluster. Corrected all false claims, reframed to current Aug-2026 state (agent mode, ChatGPT
  for Teens, Atlas/DALL·E retirements), retitled to match the live-winner queries ("ChatGPT New
  Features 2026: The Latest Updates" — the 1,552-impr "chatgpt latest features 2026" query et
  al.), bumped date for a fresh signal, updated FAQs, and interlinked into the AI-commerce
  cluster (instant-checkout-readiness, universal-cart, claude-ai-integration, ai-shopping-
  assistants) + the Shopify money hub + tracked affiliate link. Facts web-verified. Slug kept
  (URL equity; a new slug wouldn't index given the sitemap bug). Build passed.

**Next run:** cannot re-measure Wave 1 honestly until the sitemap fix lands and Google re-crawls.
Priority order for a human: (1) run the `gsc:sitemaps --fix`, (2) re-pull GSC ~1–2 weeks later,
(3) only then judge Wave 1 net-new on clicks and revisit the Wave 2 gate.
