# First execution batch — September 9, 2026

## Status

Prepared and pushed branch `codex/publication-growth`. Open review: https://github.com/dhegstad/AdsX/pull/49

Vercel preview: https://adsx-git-codex-publication-growth-dennishegstad-4354s-projects.vercel.app

Vercel reports the preview deployment Ready. The preview is protected by Vercel login; the browser reached that login page. Desktop and mobile visual/interaction checks were performed against the local production build. The PR has not been merged, and this batch has not been deployed to production.

## Completed

- Eight new, sourced publication articles for prospective and current Shopify merchants.
- Two substantive corrections: Gumroad comparison and legacy Starter-plan guide, preserving existing URLs and original dates.
- Six topic hubs, publication homepage, editorial policy, updated About/Contact/shared navigation and descriptions.
- Reader-intent-based Shopify affiliate CTAs and relevant next reads/tools. Prominent AdsX app promotion deferred per Dennis’s clarification.
- 96 proposed new article slots and 24 refreshes; the original 12-week proposal has been compressed to a September 9–22 sprint; the remaining entries require research and overlap checks.
- Free distribution log and submission copy. Feedspot acknowledged the blog URL submission and then offered paid placement; no upgrade purchased, no backlink verified.
- Measurement source audit: GA4 configured, Meta/X placeholders, no Google Ads destination in the analytics component, and no working newsletter signup in the blog.

## Validation

- `npm run content:check`: passed for all ten new/refreshed articles and the six curated hub selections.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed; existing workspace-root/lockfile warning remains.
- Sitemap contains new articles and hubs, and the corrected article last-modified date.
- RSS parses successfully and includes 348 items.
- Desktop homepage and topic-hub visual review passed.
- Mobile homepage and article checks passed at 390 × 844; menu expands and no page overflow was observed on the tested articles.
- Existing-merchant example has no signup CTA boxes or AdsX app links. New-store example has tracked Shopify CTAs, article/placement sub-IDs, and sponsored link attributes.
- No form submissions or affiliate signups were generated during site testing. Analytics event receipt has not been verified in external dashboards.

## Next work

Publish the reviewed first batch, then produce the next researched content cohort. Connect email subscriptions and the existing advertising accounts using verified account IDs and the appropriate consent behavior. Complete relevant directory flows that meet the $0 constraint, with any required account/terms steps handled explicitly. The accelerated 14-day cadence is a roadmap, not a scheduled automation. All future directory correspondence uses dennis@adsx.com; the original Feedspot receipt retains its actual submitted email.
