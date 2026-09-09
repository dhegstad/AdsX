# Platform content batch — September 9, 2026

Status: validated locally; awaiting the GitHub/Vercel production release. This is the additional batch Dennis authorized after the initial eight new articles and two refreshes.

## Scope

30 articles: **10 brand-new URLs, 10 previously removed URLs rebuilt with new content, and 10 existing articles substantially updated**. The active library increases from 348 to 368 articles. Original publication dates are retained on rebuilt and refreshed URLs; September 9 is the substantive update date.

The 20 new/rebuilt articles comprise six migrations, six platform comparisons, four setup tutorials, and four product-selection guides. The ten refreshes cover trials/offers, products/niches, pricing/costs, Etsy/Squarespace migrations, and the first month of store operations. Every article has a distinct checklist, comparison, decision method, or worked example recorded in the [manifest](platform-batch-2026-09-09.json).

## Editorial corrections

- Replace unsupported trial, niche profitability, migration timelines, and invented success claims with current primary sources and clearly labeled illustrative calculations.
- Correct the former 120-day 1MBB article: the current official page describes a six-month discounted Basic offer. Keep its URL for readers following older references, link to the official program enrollment, and bypass ordinary affiliate rewriting for 1MBB program URLs.
- Use current BigCommerce plan names, sales bases, and payment-provider fees; current US Square plan prices; current Big Cartel features; and the distinction between Magento Open Source and Adobe Commerce offerings.
- Shopify pricing varies by market. The pricing guide uses a dated, verified Norway example rather than labeling a localized response as US pricing. Standard offer pages distinguish free time, discounted billing, and normal renewal.
- Keep tutorial and enterprise/program reading paths useful without signup CTA boxes. Eligible new-store decision articles retain sponsored Shopify links with article and placement attribution. App-acquisition promotion remains deferred.

Primary sources were read on September 9 through web tools; localized pricing was additionally checked in a browser. This is desk research and authored analysis, not hands-on platform benchmarking. The manifest records 48 distinct external source URLs.

## Discovery and verification

- Start-a-store and running-a-store hubs surface the new guides; all assigned articles are linked from their hubs.
- Remove the ten restored URLs from the prune set, remove two obsolete redirects, and map three close legacy aliases to their relevant guides.
- `npm run content:check`: passed across both September 9 batches (40 articles), including internal links, metadata, source presence, reader intent, and special-program affiliate routing.
- `npm run build` and `npx tsc --noEmit`: passed. Existing workspace-root and Browserslist age warnings remain.
- Local HTTP checks: all 30 return 200, with correct canonical, H1, Article schema, original date and September 9 modified date; expected affiliate CTA count and sponsored attribution verified.
- Sitemap contains all 30 with current lastmod. RSS contains all 30 within 368 items. Three legacy aliases return the intended 308 redirects.
- Browser checks: desktop comparison/table and homepage, mobile comparison/table and topic hub. No page overflow on the inspected views; wide tables scroll inside their container. No browser errors on reviewed pages.
- No signup, order, or external analytics conversion was generated during testing. Search indexing, rankings, and affiliate earnings are measured after release, not inferred from publishing.

## Article inventory

| Type | Group | Article |
|---|---|---|
| rebuilt | migration | [WooCommerce to Shopify Migration: Products, Plugins and Launch Checks](https://www.adsx.com/blog/how-to-migrate-from-woocommerce-to-shopify) |
| rebuilt | migration | [BigCommerce to Shopify Migration: Catalog, Pricing Rules and Data](https://www.adsx.com/blog/migrate-bigcommerce-to-shopify-guide) |
| rebuilt | migration | [Big Cartel to Shopify: Move an Artist Shop Without Losing the Details](https://www.adsx.com/blog/big-cartel-to-shopify-migration) |
| rebuilt | migration | [Wix to Shopify Migration: Products, Bookings, Content and Domain](https://www.adsx.com/blog/migrate-wix-to-shopify-complete-guide) |
| rebuilt | migration | [Square Online to Shopify: A Retail Migration Checklist](https://www.adsx.com/blog/migrate-from-square-online-to-shopify) |
| rebuilt | migration | [GoDaddy to Shopify: Store Migration or Domain Connection?](https://www.adsx.com/blog/migrate-from-godaddy-to-shopify) |
| rebuilt | comparison | [Shopify vs WooCommerce: Cost, Control and Who Does the Work](https://www.adsx.com/blog/shopify-vs-woocommerce-comparison) |
| rebuilt | comparison | [Shopify vs BigCommerce in 2026: Plans, Payment Fees and Store Fit](https://www.adsx.com/blog/shopify-vs-bigcommerce-comparison) |
| new | comparison | [Shopify vs Big Cartel: Which Fits an Artist or Maker Shop?](https://www.adsx.com/blog/shopify-vs-big-cartel) |
| rebuilt | comparison | [Shopify vs Wix for Ecommerce: Products, Services and Total Cost](https://www.adsx.com/blog/shopify-vs-wix-ecommerce) |
| new | comparison | [Shopify vs Square Online: Which Fits Your Retail Business?](https://www.adsx.com/blog/shopify-vs-square-online) |
| rebuilt | comparison | [Shopify vs Magento Open Source and Adobe Commerce: A Buying Guide](https://www.adsx.com/blog/shopify-vs-magento-comparison) |
| new | tutorial | [How to Import Products into Shopify: A First-Catalog CSV Checklist](https://www.adsx.com/blog/shopify-product-csv-import-first-catalog) |
| new | tutorial | [How to Build a Shopify Redirect Map Before a Store Migration](https://www.adsx.com/blog/shopify-url-redirect-map-store-migration) |
| new | tutorial | [How to Connect an Existing Domain to Shopify and Keep Email Working](https://www.adsx.com/blog/connect-existing-domain-shopify-email-checklist) |
| new | tutorial | [How to Test a Shopify Store Before Launch: Order-to-Delivery Checklist](https://www.adsx.com/blog/shopify-test-order-before-launch-checklist) |
| new | product-ideas | [Products That Are Cheaper to Ship: 8 Shopify Store Ideas to Evaluate](https://www.adsx.com/blog/low-shipping-cost-products-shopify-store) |
| new | product-ideas | [How to Validate Product Demand Before Opening a Shopify Store](https://www.adsx.com/blog/how-to-validate-product-demand-before-shopify-store) |
| new | product-ideas | [Hobby Kits to Sell on Shopify: 6 Ideas and a Costing Worksheet](https://www.adsx.com/blog/shopify-hobby-kit-product-ideas) |
| new | product-ideas | [Digital vs Physical Products: Which Should Your First Shopify Store Sell?](https://www.adsx.com/blog/digital-vs-physical-products-first-shopify-store) |
| refresh | refresh | [Shopify Free Trial 2026: Current Offer, Billing and Setup](https://www.adsx.com/blog/shopify-free-trial-2026-complete-guide) |
| refresh | refresh | [Longest Shopify Free Trial: Standard Offers, 1MBB and Development Stores](https://www.adsx.com/blog/longest-shopify-free-trial-2026) |
| refresh | refresh | [Shopify 1MBB Offer Update: What Replaced the 120-Day Free Trial?](https://www.adsx.com/blog/shopify-120-day-free-trial-black-owned-businesses) |
| refresh | refresh | [Trending Products to Sell on Shopify in 2026: 12 Ideas to Validate](https://www.adsx.com/blog/trending-products-sell-shopify-2026) |
| refresh | refresh | [Shopify Store Ideas for 2026: 24 Niches and How to Choose](https://www.adsx.com/blog/shopify-store-ideas-profitable-niches-2026) |
| refresh | refresh | [Shopify Pricing in 2026: Plans, Billing and Your Real Store Cost](https://www.adsx.com/blog/shopify-pricing-2026-every-plan-real-cost) |
| refresh | refresh | [The Cost of Running a Shopify Store: A First-Year Budget Worksheet](https://www.adsx.com/blog/true-cost-running-shopify-store-first-year) |
| refresh | refresh | [Etsy to Shopify: Expand Your Shop with a Tested Migration Plan](https://www.adsx.com/blog/etsy-to-shopify-migration-guide) |
| refresh | refresh | [Squarespace to Shopify Migration: Store, Content and Domain Checklist](https://www.adsx.com/blog/migrate-squarespace-to-shopify-guide) |
| refresh | refresh | [Your First 30 Days on Shopify: Launch, Orders and Evidence](https://www.adsx.com/blog/first-30-days-shopify-store-checklist) |

## Planning record

The original research backlog is retained with this accelerated batch tracked separately. Four refreshed articles also complete R005, R008, R010, and R022; they are not counted twice. Remaining candidate topics must be checked against the expanded library before drafting. The delivery cadence is a planning baseline, not a daily ceiling or scheduled automation.
