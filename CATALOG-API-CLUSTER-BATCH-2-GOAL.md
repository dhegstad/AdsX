# Goal — Finish the Shopify Product Catalog API Cluster (Batch 2)

_Set 2026-07-01. Companion to `SHOPIFY-CATALOG-API-CONTENT-PLAN.md`._

## Why this is the right content goal (and not "more posts")

AdsX's bottleneck is **not volume** — it's CTR (~0.1% on ~526K impressions) and a
**declining indexation** (~543 of 1,151 indexed) driven by thin, off-audience
programmatic pages. Two loops already address those: the CTR fix loop and the
Indexation Kill loop. Generic net-new posts would work *against* both.

The **one** on-strategy content stream is the Catalog API developer cluster: net-new,
on-audience (Shopify/e-commerce sellers + the devs who build their feeds),
high AI-citation value, and a natural bridge to AdsX's ad-services offer
(catalog quality → feed quality → ROAS + AI-shopping visibility). This goal
**completes** that cluster rather than starting a new sprawl.

## Guardrail (non-negotiable)

Every piece ships ≥1,200 words, uniquely sourced (claims/limits link to primary
`shopify.dev` docs), schema-complete, with runnable code, a lead-answer block,
FAQ, comparison table where applicable, named developer author (not "AdsX Team"),
and `category: "Developers"`. **Indexed-page count must rise, not fall.** No thin
additions. No duplication of the 10 already-shipped pieces.

## Already shipped (10 — do NOT recreate)

Pillar guide · GraphQL query cookbook · "15 things to build" · Google Merchant
sync · Meta catalog sync · AI shopping feed · Admin-vs-Storefront · GraphQL-vs-REST
· productSet-vs-productCreate · ProductFeed-vs-CSV.

## Remaining work — Batch 2 (13 posts + 1 tool)

### Batch 2A — Citation core (ship first; highest evergreen citation value)
1. **How-to #1** — Fetch your entire catalog with Admin GraphQL (pagination + Bulk Operations)
2. **How-to #2** — `productSet`: declaratively sync products & variants at scale
3. **How-to #3** — ProductFeed API: generate feeds for sales & marketing channels _(ads bridge)_
4. **Reference #11** — Product data-model reference: Product → Variant → Option → Media → InventoryItem (+ diagram)

### Batch 2B — Depth (complete technical coverage)
5. **How-to #4** — Catalog API for B2B & Markets: catalogs, price lists, publications
6. **How-to #5** — Manage product publications across channels (`publishablePublish`)
7. **How-to #6** — Read the catalog with the Storefront API for headless front ends
8. **How-to #7** — Extend the catalog: metafields & metaobjects via API
9. **How-to #8** — Bulk operations & rate limits when syncing large catalogs
10. **How-to #9** — Webhooks for catalog changes: keep your feed in sync in real time
11. **Reference #12** — Catalog API rate-limit & error reference (cost-based throttling, retries)

### Batch 2C — Tutorials + commercial bridge
12. **Tutorial #17** — Build a headless catalog browser with the Storefront API
13. **Tutorial #18** — Build a catalog audit / feed-readiness checker
14. **Commercial bridge post** — "Your product catalog is the #1 lever for ad performance and AI shopping visibility" → CTA to AdsX

### Tool (engineering-as-marketing link magnet)
T1. **Shopify Catalog Feed-Readiness Checker** — `/tools/...`; paste a product,
get an ad/AI-readiness score (titles, GTIN/MPN, images, descriptions, attributes).
Pairs with tutorial #18 and the commercial-bridge post.

## Success metrics

- **Leading:** cluster pages cited in ChatGPT/Perplexity/AI Overviews for
  "shopify product catalog api", "shopify productSet", "shopify product feed api",
  "graphql vs rest shopify products" (monthly 20-query manual check).
- **Lagging:** organic sessions to the `/blog` dev cluster + `/tools` feed-checker;
  assisted conversions to `/services`; backlinks to the cookbook + tool.
- **Guardrail:** indexed-page count rises.

## Execution note

Ship in the 2A → 2B → 2C order. Produce **one full sample piece first** (2A #1),
confirm quality/schema/links, then batch the rest. After 2C, the cluster becomes a
**quarterly-refreshed asset** (honest `dateModified` on Shopify API version bumps).
