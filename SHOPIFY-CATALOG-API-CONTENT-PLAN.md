# AI-SEO Audit + Shopify Product Catalog API Content Plan

_Prepared 2026-06-20. Audit covers all ~1,592 URLs (1,146 blog posts + ~446 programmatic pages + core/schema infra). Goal: grow organic + AI-citation traffic._

---

## Part 1 — AI-SEO Audit (what the data says)

### Headline: the problem is NOT volume. It's duplication, truncation, fake freshness, and missing author authority.

The corpus is substantively strong — median **2,555 words/post**, **100% FAQ coverage**, **61% have comparison tables**, **87% contain a statistic**, robots.txt correctly allows all AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended), `llms.txt` exists, and the schema factory is broad (Article, FAQPage, Breadcrumb, Organization, ItemList, SoftwareApplication). Only **1% of posts are <500 words**. So mass-producing more thin posts is the wrong move — and would deepen the indexation gap. The damage is concentrated:

| # | Issue | Evidence | Fix |
|---|-------|----------|-----|
| 1 | **True-duplicate post pairs** competing for the same query | 5 confirmed pairs (e.g. `shopify-vs-bigcommerce-2026-comparison` vs `shopify-vs-bigcommerce-comparison` — which give **conflicting prices**, $39 vs $29) | Merge → 301 the weaker URL. Conflicting facts actively poison LLM citations. |
| 2 | **Meta descriptions truncate** | 646 excerpts (56%) >160 chars (max 335) | Trim all to 120–160 chars. |
| 3 | **Titles truncate** | 539 titles (47%) >60 chars; 170 over 70 | Tighten, prioritize the 170 worst. |
| 4 | **Fake freshness** | `updated == date` on **1,097 posts (95.7%)** — the field is cosmetic | Wire `dateModified` to real edits (git mtime/frontmatter); start a genuine refresh cadence on the Feb-2026 spike (533 posts). |
| 5 | **175 programmatic pages orphaned from sitemap** | `start/[niche]` (50), `ai-ads-for/[niche]` (30), `tools/...calculator` (30), `apps/[category]` (25), `compare/shopify-vs-[platform]` (15), `compare/ai-ads-vs-[channel]` (15), `migrate/[platform]` (10) — built, crawlable, but zero sitemap signal | **Cheapest win available.** Add the on-topic arrays to `app/sitemap.ts` (~130 quality pages). |
| 6 | **No per-article author entity (E-E-A-T)** | Every post = generic "AdsX Team"; the rich Person schema (Dennis Hegstad, with `sameAs`/`knowsAbout`) exists but is used **only on author pages**, never wired into Article schema | Resolve `post.author` → full Person in `createArticleSchema`; render a visible author bio on posts. |
| 7 | **Thin/templated clusters** at risk of de-indexation | `ai-visibility-for-*-brands` (15 posts, 333–602 words, no stats/tables/sources); `shopify-for-*` (165) & `"AI Visibility for…"` (114) recycle skeletons + FAQ answers | Differentiate with unique data/sources or consolidate. |
| 8 | **Unsourced statistics everywhere** | "340%", "2.4x", "78% more citations" stated with no linked source; only 64% of posts cite any external source | Link claims to primary sources (this is the single biggest citation driver: +40%). |
| 9 | **Schema gaps** | No `Review`/`AggregateRating`, no `HowTo`, no `TechArticle`, two divergent Organization schemas, homepage emits `FAQPage` with no visible FAQ (invalid) | Consolidate Org schema; add Review/HowTo/TechArticle; enrich Org `sameAs` (Crunchbase/Wikidata/G2). |
| 10 | **Topical mismatch drag** | `locations/[city]`, generic `glossary`, `compare/ai-visibility-vs-*` are off the stated focus (paid ads for Shopify) | Prune/consolidate; don't feed off-topic thin pages to Google. |

**These 10 fixes are higher-ROI than any new content.** The content plan below is the _growth_ layer that sits on top of a cleaned-up base — and it is deliberately a **focused, high-quality cluster**, not a volume play.

---

## Part 2 — Why "Shopify Product Catalog API" is the right next cluster

Three reasons this topic specifically moves the traffic needle:

1. **Developer queries are disproportionately answered by LLMs.** Engineers live in ChatGPT/Claude/Perplexity for code. Technical guides with working code + reference tables are among the most-cited content formats. Comparison + how-to + reference = the top three AI-citation formats (~56% combined share).
2. **It's a natural bridge to AdsX's actual business.** A Shopify store's **product catalog is the raw material of every ad** — Google Shopping, Meta Advantage+ catalogs, and the new AI shopping agents (ChatGPT Shopping, Perplexity, Google AI Overviews) all consume catalog/feed data. Catalog data quality → feed quality → ROAS and AI shopping visibility. This is a differentiated angle almost no agency owns, and it links straight to AdsX's existing `preparing-your-product-feed-for-ai-agents` and `chatgpt-product-feed-shopping-ads-setup-guide` posts.
3. **You already have a nascent dev cluster to anchor it** — `shopify-admin-api-guide` (2,757w), `shopify-storefront-api-guide` (2,618w), `shopify-api-app-development-guide` (2,349w), `shopify-custom-metafields-guide` (1,374w), `preparing-your-product-feed-for-ai-agents` (3,534w). The new cluster **deepens and interlinks** these into a topical authority hub — it does not duplicate them (see overlap map in §2.5).

### 2.1 The Shopify catalog API surface we'll cover (technically accurate)

| API / concept | What it does | Maps to AdsX angle |
|---|---|---|
| **Admin GraphQL `Product`/`ProductVariant`/`Media`** | Read/write the canonical catalog | Source of truth for every feed |
| **`productSet` mutation** | Declarative bulk upsert of products + variants + options in one call | Bulk catalog sync at scale |
| **Bulk Operations API** | Async export of the full catalog past rate limits | Pulling large catalogs for feed generation |
| **ProductFeed API** (`productFeedCreate`, `productFullSync`) | Generate channel-specific product feeds | **Direct ads bridge** — feeds to sales/marketing channels |
| **Catalog API** (`Catalog`, `PriceList`, `Publication`) | Control _which_ products + _what_ prices publish to _which_ context (B2B company, Market) | Market-/audience-specific catalogs |
| **`publishablePublish`** | Manage product availability per sales channel | Channel publication control |
| **Storefront API (read)** | Browse catalog for headless/custom front ends | Headless + custom storefronts |
| **Metafields / Metaobjects API** | Extend catalog with custom + structured data | Richer feeds, AI-readable attributes |
| **Webhooks** (`products/update`, `inventory_levels/update`) | React to catalog changes in real time | Keep feeds always in sync |

### 2.2 Cluster architecture — 1 pillar, 4 sub-hubs, ~22 pieces + 1 tool

```
PILLAR: Shopify Product Catalog API — The Complete Developer Guide (2026)   [hub, ~3,500w]
│
├── HOW-TO / TECHNICAL  (developer intent — highest AI-citation value)
│    1. Fetch your entire product catalog with the Admin GraphQL API (pagination + Bulk Operations)
│    2. productSet: declaratively sync products & variants at scale
│    3. ProductFeed API: generate product feeds for sales & marketing channels   ← ads bridge
│    4. Shopify Catalog API for B2B & Markets: catalogs, price lists, publications
│    5. Manage product publications across sales channels (publishablePublish)
│    6. Read the catalog with the Storefront API for headless front ends
│    7. Extend the catalog: metafields & metaobjects via API  (links existing metafields guide)
│    8. Bulk operations & rate limits when syncing large catalogs  (links existing admin-api guide)
│    9. Webhooks for catalog changes: keep your feed in sync in real time
│
├── REFERENCE / TECHNICAL DOCS  (high-dwell, copy-paste, very citable)
│   10. Shopify Catalog GraphQL query cookbook (50+ copy-paste snippets)   ← evergreen citation magnet
│   11. Product data model reference: Product → Variant → Option → Media → InventoryItem (+ diagram)
│   12. Catalog API rate limits & error reference (cost-based throttling, retries)
│
├── IDEAS TO BUILD / PRODUCT IDEAS  (entity-rich listicles + tutorials)
│   13. 15 things to build with the Shopify Product Catalog API (app/tool ideas)
│   14. Tutorial: build a real-time catalog → Google Merchant Center sync   ← ads bridge
│   15. Tutorial: build a catalog → Meta product catalog sync               ← ads bridge
│   16. Tutorial: build an AI-ready product feed for ChatGPT/Perplexity shopping agents  ← AI-commerce bridge
│   17. Tutorial: build a headless catalog browser with the Storefront API
│   18. Tutorial: build a catalog audit / feed-readiness checker
│
├── COMPARISONS  (~33% of all AI citations come from this format)
│   19. Admin API vs Storefront API for catalog data: which to use when
│   20. GraphQL vs REST for the Shopify catalog (REST is legacy — migrate)
│   21. productSet vs productCreate/productUpdate
│   22. ProductFeed API vs manual XML/CSV product feeds
│
└── INTERACTIVE TOOL  (engineering-as-marketing — link magnet, fits existing /tools pattern)
    T1. Shopify Catalog Feed-Readiness Checker — paste a product, get an
        ad/AI-readiness score (titles, GTIN/MPN, images, descriptions, attributes)
    + COMMERCIAL BRIDGE post: "Your product catalog is the #1 lever for ad
      performance and AI shopping visibility"  → CTA to AdsX
```

### 2.3 Per-piece spec — AI-SEO requirements baked in

Every piece in this cluster **must** ship with (these are the audit's lessons applied from day one):

- **Lead answer block**: 40–60 word direct answer in the first paragraph (the renderer already supports a TL;DR/KEY TAKEAWAY block — use it).
- **Working, runnable code** in `graphql`/`js`/`bash` blocks (LLMs cite pages with real code).
- **Sourced facts**: every claim/limit links to the primary `shopify.dev` doc. These pages are inherently citable because the source is authoritative.
- **Comparison table** wherever an "X vs Y / which one" framing applies (only ~6 programmatic templates use tables today — under-used lever).
- **FAQ block** (already 100% standard) with natural-language dev questions ("How do I paginate products in GraphQL?").
- **New schema**: `TechArticle` + `HowTo` (currently ABSENT site-wide) for tutorials; `SoftwareSourceCode` for code-heavy refs; `ItemList` for the "15 things to build" piece. Plus the standard Article/Breadcrumb/FAQPage.
- **Named developer author** with credentials — _not_ "AdsX Team." Create one engineering byline (e.g. a "Staff Engineer / Shopify Partner" Person entity with `knowsAbout: [Shopify API, GraphQL, ecommerce feeds]`). This fixes audit issue #6 for the whole cluster and is a major E-E-A-T signal for technical content.
- **New `category: "Developers"`** (or "Engineering") instead of dumping into the 900-post "Guide" bucket — builds a clean topical cluster crawlers and AI can recognize.
- **Internal links**: each spoke links up to the pillar, sideways to 2–3 sibling spokes, and out to the relevant existing post (admin-api, storefront-api, metafields, product-feed-for-ai-agents) **and** to a money page (`/services`, `/guides/shopify-ai-advertising`, or a `/tools` calculator).

### 2.4 Build sequence (quality-first, ~5 weeks; adjust to capacity)

| Phase | Ship | Why first |
|---|---|---|
| **1 — Citation core** (wk 1–2) | Pillar (#0), Cookbook (#10), Data-model ref (#11), How-tos #1–#3, Tool T1 | The evergreen, highest-citation-value spine + the tool link-magnet. #3 (ProductFeed) opens the ads bridge immediately. |
| **2 — Bridge + comparisons** (wk 3–4) | Comparisons #19–#22, Build tutorials #14–#16, "15 things to build" #13 | Comparisons = top citation format; channel-sync tutorials convert dev intent → AdsX ad-services intent. |
| **3 — Depth + commercial** (wk 5+) | How-tos #4–#9, #12, tutorials #17–#18, commercial-bridge post | Completes topical coverage; then switch to **refresh cadence** (re-stamp `updated`, add new Shopify API-version notes quarterly). |

After Phase 3, the cluster becomes a **quarterly-refreshed asset**, not a one-shot — directly fixing the fake-freshness problem for this topic and keeping it current with Shopify API version bumps (a natural, honest reason to update).

### 2.5 No-duplication map (per the "never duplicate existing posts" rule)

| New piece | Closest existing post | How the new piece stays distinct |
|---|---|---|
| Pillar (#0) | `shopify-admin-api-guide` | Pillar is catalog-scoped & links to admin-api as the auth/rate-limit deep-dive; admin-api stays the general API guide. |
| #6 Storefront read | `shopify-storefront-api-guide` | New piece is _catalog-read-only_ recipes; existing stays the broad storefront guide. Cross-link, don't overlap. |
| #7 Metafields | `shopify-custom-metafields-guide` | New piece is _API-driven_ metafield writes for feeds; existing covers admin-UI + theme display. |
| #16 AI feed | `preparing-your-product-feed-for-ai-agents`, `chatgpt-product-feed-shopping-ads-setup-guide` | New piece is the _build tutorial_ (code) that those two strategy posts point to as the implementation. |
| #13 "15 things to build" | none | Net-new format. |

### 2.6 Success metrics

- **Leading**: # of cluster pages cited in ChatGPT/Perplexity/AI Overviews for "shopify product catalog api", "shopify productSet", "shopify product feed api", "graphql vs rest shopify products" (manual 20-query check, monthly).
- **Lagging**: organic sessions to `/blog/` dev cluster + `/tools/` feed-checker; assisted conversions to `/services` from cluster pages; backlinks earned by the cookbook + tool (engineering-as-marketing link magnets).
- **Guardrail**: indexed-page count must _rise_ — every new piece is ≥1,200 words, uniquely sourced, schema-complete (no thin additions).

---

## Recommended order of operations

1. **Week 0 (fixes, before publishing anything):** merge the 5 duplicate pairs; sitemap the ~130 on-topic orphans; wire the per-article author entity; add `TechArticle`/`HowTo` schema support. _These make every new cluster page perform better the day it ships._
2. **Weeks 1–5:** ship the catalog-API cluster per the phased sequence above.
3. **Ongoing:** quarterly refresh of the cluster on Shopify API version bumps; monthly 20-query AI-citation check.
