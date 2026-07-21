# SEO Audit → Shopify App Ecosystem Cluster (30 posts)

_Prepared 2026-07-21. Follow-up to the 2026-06-20 AI-SEO audit, the 2026-07-06 prune
(PR #20, 867 zero-click posts removed), and the indexation kill-loop playbook._

## Part 1 — Audit summary (what constrained this plan)

1. **Indexation is still the binding constraint.** Indexed pages collapsed to ~406
   (~25% of the pre-prune site); the June 12 mass-deindexation was a quality
   demotion. Volume is not the lever; differentiated quality in protected
   clusters is.
2. **The prune data is a map of what Google rejected.** 33 `best-shopify-*-apps`
   listicles (loyalty, reviews, SEO, wishlist, quiz, live chat, subscriptions,
   print-on-demand, popups…) earned **zero clicks in 6 months** and were removed
   on 2026-07-06. Recreating those topics would undo the recovery. This plan
   deliberately avoids every killed slug and topic-shape.
3. **What survived the prune tells us where to build:**
   - `category: Developers` was a blanket **keep rule** (100% retained) and the
     Catalog API cluster is the site's healthiest recent bet.
   - Claude/Anthropic-slugged posts were a keep rule.
   - The only app listicles that earned clicks: bundle, preorder, back-in-stock,
     membership, countdown, donation, returns (kept — we interlink, not duplicate).
4. **Per-piece quality spec** (from the June audit) applied to all 30 posts:
   40–60-word lead answer, comparison/reference tables, sourced or hedged
   numbers, runnable code on dev posts, 5–6 substantive FAQs, titles ≤60 chars,
   excerpts 120–160 chars, minimal em dashes / no AI-tell vocabulary, 3–6
   internal links into kept clusters, one Shopify affiliate link per post.

## Part 2 — The cluster (user brief: Shopify, ecommerce, App Store, app categories, building apps with AI)

### A. Building Shopify apps with AI — Developers/TechArticle (12)
| Slug | Angle |
|---|---|
| build-shopify-app-with-claude-code | End-to-end app build with Claude Code + CLI + Remix template |
| shopify-remix-app-template-guide | Anatomy of the official app template |
| shopify-dev-mcp-server-guide | Shopify Dev MCP with Claude Code/Cursor |
| shopify-app-tech-stack-2026 | Framework/hosting/DB comparison |
| shopify-app-testing-guide | Dev stores, test charges, webhook CLI trigger, CI |
| shopify-checkout-ui-extensions-tutorial | Build a checkout extension (howto schema) |
| shopify-discount-function-tutorial | Shopify Functions discount build (howto schema) |
| shopify-theme-app-extensions-guide | App embeds/blocks vs legacy asset injection |
| shopify-polaris-app-bridge-guide | Embedded admin UI stack |
| shopify-app-security-checklist | HMAC, session tokens, GDPR webhooks, protected data |
| shopify-app-billing-api-guide | Billing API: subscriptions, usage, trials |
| shopify-webhooks-reliability-guide | Delivery guarantees, dedupe, reconciliation |
| build-custom-shopify-app-own-store | Single-store custom apps + AI scripting |

### B. App Store founder GTM/economics — Guide/Research (8)
| Slug | Angle |
|---|---|
| shopify-app-store-seo-guide | App Store ASO |
| shopify-app-store-ads-guide | App Store search ads (AdsX home turf) |
| shopify-app-marketing-first-100-installs | Launch playbook |
| shopify-app-pricing-strategy-guide | Freemium/trials/tiers |
| how-much-shopify-app-developers-make | Economics, 0%/15% rev share |
| shopify-partner-program-guide | Partner program mechanics |
| shopify-app-store-statistics-2026 | Research/stat piece (citation magnet) |
| shopify-app-store-review-process-guide | Approval + common rejections |

### C. App product strategy (4)
validate-shopify-app-ideas · shopify-app-ideas-2026 ·
built-for-shopify-badge-requirements · shopify-app-store-categories-guide

### D. Merchant app-stack management (5)
best-shopify-post-purchase-survey-apps (OrderSurvey featured) ·
how-many-shopify-apps-too-many · uninstall-shopify-apps-cleanup-guide ·
shopify-app-costs-audit-guide · shopify-apps-that-improve-roas (Paid Ads bridge)

## Part 3 — Guardrails applied
- All 30 slugs verified clean against: existing 299 posts, the 867-slug kill
  list, `next.config.ts` redirect sources.
- No recreation of pruned zero-click topics; the only listicle (post-purchase
  survey apps) is a never-attempted, business-aligned exception (attribution +
  OrderSurvey backlink).
- Dated 2026-07-21, no cosmetic `updated` field (fake-freshness fix from June
  audit).
- OrderSurvey (apps.shopify.com/ordersurvey) linked factually in the survey
  listicle + as a worked example in validate-shopify-app-ideas.
