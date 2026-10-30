# Daily publishing and growth

Updated October 4, 2026 following Dennis's explicit request. The existing `adsx-daily-blog-maintenance` heartbeat is now named **AdsX daily publishing and growth** and runs every day at 09:00 America/Chicago in the same task. Its live prompt was updated through the Codex automation tool. This policy supersedes the earlier low-volume maintenance guidance, including historical statements against an article quota.

## Reporting storage — October 7 correction

Reuse fresh ignored local reports. The public GitHub nightly workflow is disabled because it wrote analytics to public branches; a private-repository guard and paid-review removal are now in place. Local `npm run gsc:nightly` writes to `.local-audits/reporting/gsc-data/` and runs only free API retrieval and deterministic analysis. Read [the current reporting guide](../../GSC-SETUP.md) before the next pull. Existing public history was not erased.

## Required daily output

Publish at least **three genuinely new blog articles per run**. Refreshes, repaired links, title changes, and updated dates do not count. Add useful tools, checklists, comparison resources, or curated hubs when they answer another reader need. Three new posts is the minimum, not a ceiling. Maintain a research backlog so source access or a duplicate topic does not automatically shrink the day's output. Report a precise shortfall if a real blocker prevents publication; do not claim a draft is live or pad the count with duplicate search intents.

Balance prospective merchants (platform selection, pricing, launch decisions) with current merchants (apps, operations, AI workflows, advertising, profitability). The three affiliate revenue sources are Shopify, relevant Shopify apps covered in the publication, and Whop. Choose useful topics that lead naturally to an appropriate recommendation; measure qualified referrals and earned/paid commissions separately from traffic and clicks. Keep recommendations useful even when no affiliate program is available.

Dennis is employed at Whop and also wants the publication to improve merchant understanding, adoption, and the product experience. Disclose that employment and AdsX’s referral relationship in Whop coverage. Use public or explicitly approved evidence; capture concrete merchant questions and documentation/onboarding friction for Dennis as a separate feedback list. Do not publish private employer information or send messages to coworkers without authorization.

## Article standard

- Answer one distinct question. Check existing titles, full text, roadmap entries, release manifests, and available search queries before drafting.
- Lead with a useful answer, then explain the decision or workflow in natural prose. Add an original worked example, acceptance criteria, decision matrix, or reusable artifact. Label assumptions and documentation-based research. No invented testing, customer outcomes, human bylines, launch dates, or guaranteed rankings.
- Verify changeable facts against current primary sources. Cite the relevant evidence beside the claim. Account-specific, regional, integration, pricing, and eligibility differences must remain clear.
- Include at least one useful image with descriptive alt text. Prefer original explanatory visuals or appropriately sourced media. Use verified official video embeds when they materially explain the task, with a fallback link. Review desktop and mobile media rendering.
- Connect the article to an appropriate topic, existing articles, and a sensible next action. Avoid forcing Shopify CTAs onto a Whop operational tutorial. Use the existing explicit `intent` field.
- Keep editorial source links direct. Shopify commercial signup links use the established Impact publisher and page/placement tags. Whop signup links use the exact dashboard-issued AdsX referral route documented in the product context; no invented tracking parameters. App recommendations may use a verified AdsX-owned link only after program approval and terms are established. Never route app referrals through Shopify's merchant signup link. Mark affiliate links sponsored and disclose relevant affiliate and employment relationships.
- Preserve the site's honest AI-assistance and team-authorship policy. Natural writing does not mean claiming an individual wrote or tested something they did not.

## Sustainable release sequence

1. Read marketing context, applicable instructions, previous results, roadmap, directory ledger, and active releases. Preserve unrelated work. Reuse fresh nightly analytics; distinguish delayed search reporting, clicks, qualifying referrals, and commissions.
2. Select at least three new intents from the backlog and research them together. A missing analytics credential does not block independent editorial work. Confirm Whop launch news against a public announcement or approved evidence before publishing.
3. Draft, edit, create media, and link the batch. Track it in `publication-YYYY-MM-DD-name.json`, which the editorial check discovers automatically. Record new articles separately from updates and resources.
4. Run `npm run content:check`, the relevant affiliate tests (`test:affiliate`, `test:whop-referral` when applicable), and the production build. Check live/rendered source links, canonical and sitemap entries, dates, internal links, images, video, and the relevant interactive behavior. Use `DEVELOPER_DIR=/Library/Developer/CommandLineTools` for Git/gh on this host.
5. Carry the reviewed batch through a focused GitHub PR and the existing Vercel release process. Attach every created PR to the task. Verify production before recording publication. Do not merge paused email or unrelated reporting work.
6. Send free IndexNow notifications once for genuinely new/substantially changed live URLs. Selective Google requests are optional; receipts are not indexing or ranking proof. Update manifests, roadmap, and the durable log with evidence and the next action.

## Research queue after the expanded Whop library

The later October 4 [Whop Ads release](publication-2026-10-04-whop-ads.json) adds eight published intents and brings the Whop library to 38 articles. Reuse those guides. Further channel-specific tutorials require verified campaign access: merchant docs still list TikTok/Google as coming soon while the API names them; Snapchat remains coming soon and YouTube placements are unconfirmed. The pixel guide and campaign schema also describe purchase/ROAS scope differently. These are public documentation gaps to resolve before making stronger claims, not reasons to duplicate the current articles.


The October 4 expansion covers 25 additional intents across ecommerce/AI, services, coaching/courses, paid communities, and payments/platforms. Read [the expansion manifest](publication-2026-10-04-whop-expansion.json) and [source research](whop-research-2026-10-04.md) before drafting. Earlier candidates for digital delivery, refunds, tracking, installments, and launch analysis are now covered; do not recreate them under another title. The official October 1 launch source is verified, so the prior evidence blocker is resolved.

| Candidate | Distinct reader task | Original contribution to develop |
| --- | --- | --- |
| Physical merchandise plus community access | Coordinate two kinds of delivery in one offer | Item/access exception map; verify actual mixed-cart support before claiming it |
| Published October 7: [AI service packages](/blog/whop-ai-automation-service-packages) | Scope a maintained service with customer data boundaries | Example acceptance brief, maintenance cost, and permission model |
| Whop website SEO migration | Preserve discovery when changing hosts | Verified canonical, redirect, sitemap, and domain control capabilities; avoid duplicating the general migration checklist |
| Published October 7: [Whop vs Thinkific](/blog/whop-vs-thinkific) | Choose around delivery and total cost | Current primary-source comparison and a distinct learner workflow |
| Published October 7: [first assortment](/blog/shopify-first-store-product-assortment) | Build a usable initial assortment | Sample catalog with explicit operational tradeoffs |
| Published October 7: [payment-method selection](/blog/shopify-payment-methods-customer-markets) | Choose methods for an identified customer mix | Cost and eligibility comparison using current sources |
| Published October 7: [comparison review](/blog/ai-product-comparison-table-checklist) | Produce accurate merchant-facing comparisons | A sourced brief, faulty draft, and verified revision |

These are research candidates, not verified claims or guaranteed search demand. Keep the Shopify and app-affiliate work active alongside Whop coverage.

Review cohorts at sensible intervals rather than rewriting yesterday's work daily. Measure 7/28-day discovery and traffic, referral clicks, and available attributed outcomes separately. The daily output commitment does not guarantee a date for traffic leadership or revenue targets.

## Shopify app partnership work

Alongside publishing, research free official affiliate programs for apps already covered in commercially useful articles. Prioritize reader fit and existing relevant traffic, then verify program eligibility and economics. Record provider, official program page, account/approval status, qualifying action, current commission terms, verified owned link, supported attribution fields, covered pages, and next action. An application is not approval, and a working link is not a commission. Do not fabricate enrollment or activate a guessed referral URL. Surface account or enrollment steps Dennis must complete; email outreach and purchases remain paused. Add provider-specific reporting before claiming app revenue is measured.

## Boundaries that still apply

Dennis explicitly excludes printing from this project. Do not build or promote print/PDF resources, add print controls, or open print dialogs during QA. Keep resources useful directly on the website; focus on articles, organic visibility, and referral conversions.

No paid directories, subscriptions, ads, API calls, or optional paid model review. Email capture, newsletters, outreach, verification-email work, and social posts remain paused. No promotion of installation of the unapproved AdsX app. Free directory work can supplement publishing when relevant; use dennis@adsx.com if contact is required and distinguish a submission from a public backlink. User action is needed for identity or payout details when actually requested by the service; ordinary research and publishing should continue independently.

## Service-business expansion and deployment costs

The October 4 service-business batch adds 24 distinct guides; see `publication-2026-10-04-whop-services.json`. Reuse these intents rather than publishing another set of near-identical industry pages. The Whop hub groups the library into home services, beauty, teaching/fitness/pet care, freelance work, and the established ecommerce/advertising paths. Build future coverage around unanswered operational questions or evidence from search, not another occupation-name substitution.

Follow [deployment cost controls](deployment-cost-controls.md): batch releases, retain the smaller verified build machine, skip records-only deployments, and preserve static blog caching. Add a checked-in SVG/PNG pair to the illustration registry for new diagrams. Keep precise account usage in ignored local files and compare actual project spend after a complete observation period.


## Research-ready follow-ups after the October 7 second batch

- **Published October 8: [subscription inventory exceptions](/blog/shopify-subscriptions-out-of-stock-orders).** distinguish an uncreated order from a failed payment and a delayed shipment. The [Shopify contract guide](https://help.shopify.com/en/manual/products/purchase-options/subscriptions/shopify-subscriptions/manage-subscriptions/manage-contracts) and [subscription considerations](https://help.shopify.com/en/manual/products/purchase-options/subscriptions/considerations) provide primary-source starting points. Develop an original staff exception map; check existing operations coverage before drafting. This is separate from the published customer-portal selection checklist.
- **Course assessment design (October 8 overlap review: current candidate duplicates the curriculum guide; reshape before drafting):** turn a lesson into an observable learner task and a documented completion rule. The [Whop educational-program guide](https://docs.whop.com/supported-business-models/educational-programs) documents assessment and completion controls. Compare intent with the existing curriculum article, verify a second relevant primary source, and only proceed with a distinct assessment example. Do not claim accreditation.
- **Organizational course buying:** research who purchases, who learns, and who receives progress information. Current [Thinkific plan documentation](https://www.thinkific.com/pricing/) offers a starting point, while the reviewed Whop course documentation leaves workflow questions to resolve. Confirm exact support before recommending a Whop configuration; this candidate remains research-gated.

## Researched follow-ups after October 8

Primary sources reviewed October 8; these are candidates, not promised traffic or publication claims. Recheck the full library and add a second relevant source before drafting where needed.

- **Gift-card refund exceptions:** distinguish refunding a gift-card purchase from returning merchandise paid for with a gift card. The [gift-card management guide](https://help.shopify.com/en/manual/products/gift-card-products/manage-purchased-gift-cards) documents split-tender refunds, expired/deactivated cards, and the purchased-card case. Develop a three-case refund ledger; this differs from the October 8 setup guide. Confirm the exact channel and payment-provider conditions; do not turn it into legal advice.
- **Draft-order stock reservations:** build an original small-stock example separating an unreserved quote, a timed reservation, and a paid order. [Draft-order creation](https://help.shopify.com/en/manual/fulfillment/managing-orders/create-orders/create-draft) and [inventory states](https://help.shopify.com/en/manual/products/inventory/fundamentals/inventory-states) distinguish Available and Committed inventory. Review the manual-payment guide for overlap and keep the intent focused on reservation ownership and expiry.
- **Whop capacity-limited admissions:** the [waitlist documentation](https://docs.whop.com/manage-your-business/products/create-waitlist) covers checkout-link configuration, review, and admission. Develop an original capacity and acceptance checklist for a small service cohort. Existing checkout coverage only names the setting. Verify billing timing, capacity behavior, and a second source before stronger claims; approval is documented as granting access. This editorial candidate does not authorize AdsX email capture or outreach.

Today's three new articles are recorded in [the release manifest](publication-2026-10-08-merchant-controls.json). Observe their first seven complete days on or after October 15; avoid repeated submissions or cosmetic refreshes. Bold Subscriptions is a researched app-partner candidate in the ledger, without enrollment or an owned link.

## October 8 additional technical coverage

The requested [Whop API/CLI store guide](/blog/whop-api-cli-ecommerce-store-checkout) is published; do not count a second setup/checkout rewrite as a new intent. Its CLI 0.25.0 contract uses variants but retains plan_ IDs and checkout plan_id. Check version-specific help/schema for follow-ons. Public production/sandbox documentation differs by source; never claim a test environment or payment result without verifying the exact supported flow. The wide featured-thumbnail illustration crop noted earlier is resolved in this release.

## October 9 completed follow-ups and next research

The gift-card refund, draft-order reservation, and Whop capacity-admission candidates above are now published in [today's manifest](publication-2026-10-09-merchant-exceptions.json). These are three new articles, with original examples and diagrams. Do not repeat their intents.

Next useful editorial work:

- Audit the existing AI inventory-forecasting guide rather than publish another generic forecasting overview. Its accuracy/savings percentages and app recommendations need current primary support. Shopify's [Stocky transition guidance](https://help.shopify.com/en/manual/inventory-and-locations/transitioning-from-stocky) is a current source for checking retired workflows. Check traffic before any consolidation; no page removal is authorized by this finding.
- Research a distinct quote-price-change workflow: [draft-order documentation](https://help.shopify.com/en/manual/fulfillment/managing-orders/create-orders/create-draft) separates price locking from stock reservations. A useful follow-up must add a concrete price-change example and verify bundle limitations, rather than retell today's stock guide.
- Research Whop admission exceptions only after resolving failed-charge/access/capacity behavior through public primary evidence. Today's guide explicitly leaves those account-specific outcomes untested; a second article cannot invent the missing state transitions.

Recent commercial and release inspections from October 7 remain fresh. Next spaced review on or after October 12; preserve October 9 content for seven-day measurement on or after October 16. Infrastructure cost observation remains due after October 11.

## October 12 pending release

Three new guides and the inventory forecasting correction are validated but not live; GitHub rejected both pushes. Resume the existing branch before drafting duplicate intents. See [manifest](publication-2026-10-12-merchant-workflows.json). The quote-price workflow and forecasting audit are completed locally, pending deployment. Next research should return to a distinct first-store buyer decision; Whop access-clock and overlapping entitlement behavior remain unverified and must not be invented.

## October 13 release completed

The October 12 pending batch is now live: three new guides plus the inventory forecasting correction, [PR88](https://github.com/dhegstad/AdsX/pull/88). Quote-price research and the forecasting audit above are completed; do not repeat. First live date is October 13. Keep these intents stable through October 20. Next: distinct prospective-merchant content and a separate tested dependency security release. Whop access-clock/overlapping entitlement questions still require evidence.

## October 14 completed and next research

Three new guides and a substantial trial-setup correction are live in [the manifest](publication-2026-10-14-launch-controls.json). Do not duplicate private-mode access checks, package weight boundaries, or service-intake question design.

Research candidates, with primary starting points reviewed October 14:

- **Agentic plan to full store:** [Shopify access documentation](https://help.shopify.com/en/manual/online-store/setting-up/agentic-plan) distinguishes preparing a store from publishing it. Compare the existing agentic library first; add a second source on plan transition and a concrete merchant decision before drafting.
- **Whop organic-channel tracking links:** [tracking-link documentation](https://docs.whop.com/manage-your-business/growth-marketing/tracking-links) and [checkout-link documentation](https://docs.whop.com/manage-your-business/payment-processing/create-checkout-link) support a store-vs-checkout destination decision. Distinguish merchant sales reporting from AdsX partner commissions; avoid duplicating paid-ads ROAS coverage. Use an original naming and reconciliation example, not invented dashboard results.
- **Combined Shopify shipping profiles:** [combined-rate documentation](https://help.shopify.com/en/manual/fulfillment/setup/shipping-profiles/combined-shipping-rates) and [rate troubleshooting](https://help.shopify.com/en/manual/fulfillment/setup/shipping-rates/troubleshooting) support a multi-origin cart investigation. Check overlap with existing shipping setup articles before drafting a distinct exception workflow.

Security work remains a separate tested release: registry candidates Next.js 16.3.8 and better-auth 1.6.22 exist, but were not installed or certified compatible in this publication run. Recheck current advisories before choosing versions.

## October 15 completed and next research

Three new articles are live in [the manifest](publication-2026-10-15-store-decisions.json). Existing Whop tracking coverage already answers the proposed organic-link task; do not recreate it.

Researched next candidates, checked against titles and public sources October 15:

- **Whop payout status versus bank receipt:** [payout troubleshooting](https://docs.whop.com/manage-your-business/manage-payouts/troubleshoot-payouts) distinguishes Requested, Processing, Completed, and Canceled. Develop an original status/evidence worksheet; verify a second primary source on methods. Keep merchant payouts, product affiliates, and the AdsX partner program separate. Do not execute withdrawals.
- **Whop team roles for a first hire:** [role documentation](https://docs.whop.com/manage-your-business/team-management/manage-team-roles) supports a task-to-permission matrix. Verify a second primary source and review agency-portal overlap before drafting; include an access-removal checklist. No invitations or emails need to be sent to research or publish this guide.
- **Shopify shipping options by market after upgrade:** [upgrade documentation](https://help.shopify.com/en/manual/fulfillment/setup/shipping-options/whats-changing-with-shipping) is early access, not universal availability. A distinct article could investigate migrated product collections, Markets permissions, and post-upgrade acceptance checks. Today's profile guide covers combined-rate diagnosis; do not repeat it. Follow the linked rate-calculation documentation before using examples.

Next technical work: remaining mail, serialization, and transitive dependency advisories. Next.js and Better Auth patch validation is recorded in [the security note](security-maintenance-2026-10-15.md). Avoid broad force upgrades.

## October 16 completed and next research

Three new guides from the previous researched backlog are live in [the manifest](publication-2026-10-16-merchant-controls.json). New candidate research, reviewed October 16; complete body-level overlap checks before drafting:

- **Shopify store credit versus gift cards:** [store credit](https://help.shopify.com/en/manual/customers/store-credit) and [gift card overview](https://help.shopify.com/en/manual/products/gift-card-products/overview). Compare account-bound credit with gifting workflows using a fictional customer-service decision. Existing gift-card setup/refund articles cover adjacent tasks; avoid repeating them. Verify current transaction-fee treatment and eligibility before drafting.
- **Unlisted Shopify products for controlled launches:** [product status](https://help.shopify.com/en/manual/products/details/product-details-page/) and [search behavior](https://help.shopify.com/en/manual/online-store/storefront-search/search-behavior). Explain direct-URL availability versus privacy; include an original visibility checklist covering third-party apps. No dedicated title found; inspect agentic discovery coverage for overlap.
- **Whop custom affiliates for a first partner:** [custom affiliate setup](https://docs.whop.com/affiliates/setup-custom.md), discovered through the official documentation index, documents fixed/percentage and first/recurring payment choices and product scope. Build a hypothetical margin worksheet; verify global-program documentation and overlap with existing general affiliate articles. Distinguish merchant product-affiliate settings from AdsX's partner referral program. No invitations or outreach needed.

Technical follow-up: remaining nine production dependency findings (four high, five moderate). October 16 patched defu to 6.1.7 and source-map-js to 1.2.2; prioritize the remaining mail/serialization paths without force upgrades. Preserve Basic builds and avoid rebuilding records-only updates.

## October 17 completed and next research

Three new articles are live in [the manifest](publication-2026-10-17-merchant-choices.json). Research candidates checked October 17; complete body-level overlap checks and second-source verification before drafting:

- **Shopify order routing decisions:** [understanding routing](https://help.shopify.com/en/manual/fulfillment/setup/order-routing/understanding-order-routing) and [configuration/troubleshooting](https://help.shopify.com/en/manual/fulfillment/setup/order-routing/setting-up-order-routing). Develop a two-warehouse allocation example. Distinguish location assignment from existing shipping-charge diagnosis; do not imply routing prevents overselling. No dedicated title found.
- **Shopify fulfillment holds:** [manual/system holds](https://help.shopify.com/en/manual/fulfillment/fulfilling-orders/holding-fulfillments) and [Flow release action](https://help.shopify.com/en/manual/shopify-flow/reference/actions/release-fulfillment-hold). Plan a hold-owner and release-evidence checklist. The Flow action releases all holds; distinguish that from manual selective release. Do not override a service's restriction. No dedicated title found.
- **Whop payment-health reporting:** [public payment-health documentation](https://docs.whop.com/trust-and-safety/account-health/payment-health.md), found through the official index, distinguishes 30-day filing-window rates from purchase-date cohorts. Create an original example explaining mature comparison windows. Check overlap with existing refund/cancellation coverage. Verify network-specific thresholds from primary sources before using any broad threshold claim in the Whop page. No private account data or dashboard access needed for a sourced explainer.

Keep the remaining dependency backlog separate from editorial changes unless a targeted update is fully tested. Latest patch work is in the October 16 log.

## October 18 completed and next research

Three new articles are live in [the manifest](publication-2026-10-18-operations-review.json). The invoice candidate was rejected because whop-invoices-guide already covers it. Researched next candidates, October 18; complete body-level overlap review before drafting:

- **Shopify seasonal pause and reopening budget:** [pause guidance](https://help.shopify.com/en/manual/your-account/pause-store) and [vacation options](https://help.shopify.com/en/manual/online-store/shopify-vacation-setting). Distinguish billing effective date, checkout availability, continuing app charges, and reopening readiness. Check current regional pricing before quoting. Existing private-mode guide covers launch access, not this operating/billing decision.
- **Shopify ownership handoff:** [official transfer checklist](https://help.shopify.com/en/manual/your-account/manage-orgs-and-stores/change-transfer-ownership). Develop a responsibility inventory for domains, apps, payments, and account ownership. Verify a second primary source; explain the checklist without performing transfers or sharing credentials. No dedicated title found.
- **Shopify customer-account migration acceptance:** [upgrade guide](https://help.shopify.com/en/manual/customers/customer-accounts/upgrade) and [customization options](https://help.shopify.com/en/manual/customers/customer-accounts/upgrade/customization-options). Inventory custom sign-in, app features, and legacy automation dependencies. Current upgrade docs supersede older search snippets about rollback and Multipass; recheck exact claims. No dedicated title found. This is merchant education, not AdsX email work.

The remaining dependency backlog remains separate from publication work unless a targeted update has adequate regression validation.

## October 19 completed and next research

Three new store-transition guides shipped in [the manifest](publication-2026-10-19-store-transitions.json). Keep this cohort stable through October 26. Researched candidates below require full body-level overlap review and current source recheck before drafting:

- **Whop API migration acceptance checklist:** [migration mapping](https://docs.whop.com/developer/api/migrate-from-v2) and [API stability](https://docs.whop.com/api-reference/stability). Review existing CLI/checkout examples before introducing a new guide. Focus on inventorying calls, pinned versions, renamed resources, and a regression matrix. Current legacy plans deep links redirect to variants; distinguish document redirects from observed API failures. Do not infer SDK compatibility or claim authenticated testing.
- **Shopify backup versus restore coverage:** [backup and duplication](https://help.shopify.com/en/manual/shopify-admin/duplicate-store/). Develop an export/restore responsibility matrix; CSV exports are not evidence of a complete one-click restore. Separate orders, issued gift cards, theme licensing, apps, and manual settings. Distinguish from first-catalog CSV import intent; verify a second primary source.
- **Shopify discount combinations acceptance matrix:** [combination rules](https://help.shopify.com/en/manual/discounts/discount-combinations) and [discount FAQ](https://help.shopify.com/en/manual/discounts/discounts-faq). Build illustrative carts checking eligibility, both discount classes, and the resulting customer total. Differentiate from the existing developer Function tutorial; no invented demand or live testing.

## October 20 completed and next research

Three new guides are live in [the manifest](publication-2026-10-20-recovery-checks.json). Reviewed the existing pinned Whop CLI article; it already uses variants and checkout configurations. Added a migration reading path rather than speculative command changes. Keep the new cohort stable through October 27.

Source-backed candidates, reviewed October 20; complete body-level overlap and second-source checks before drafting:

- **Shopify bundle inventory diagnosis:** [eligibility and inventory](https://help.shopify.com/en/manual/products/bundles/eligibility-and-considerations) and [Bundles app](https://help.shopify.com/en/manual/products/bundles/shopify-bundles). Build a component-quantity example; check tracked versus continue-selling settings, overall stock versus location, and component shipping weight. Distinguish from the existing app-selection guide and general order routing.
- **Shopify digital asset access after purchase:** [Digital Products documentation](https://help.shopify.com/en/manual/products/digital-service-product/digital-downloads). Existing URL now titles the app Digital Products. Explain file versus external-link access, destination permissions, and what replacing an asset changes for previous buyers. Review the existing digital app-stack guide for naming/claim updates; preserve its date. This is merchant education, not authorization for AdsX email activity. Verify a second official source.
- **Whop retry recovery after an ambiguous request:** [idempotency](https://docs.whop.com/developer/api/idempotency) and the Current API reference for the selected resource. Explain a request ledger, exact retries, concurrent requests, and the 24-hour boundary using simulated examples. Distinguish from the short retry paragraph in the CLI guide and today's migration workflow; do not execute payments or claim live testing.

## October 21 completed and next research

Three new guides are in [the publication manifest](publication-2026-10-21-purchase-controls.json). Bundle inventory diagnosis was narrowed to price maintenance because the existing comparison already covers inventory math. Preserve the new cohort through October 28.

Source-backed candidates reviewed October 21; finish body-level overlap and current second-source checks before drafting:

- **Shopify for a first appointment-based service:** [service product setup](https://help.shopify.com/en/manual/products/digital-service-product/selling-services-or-digital-products) and [virtual shopping appointments](https://help.shopify.com/en/manual/promoting-marketing/sales/virtual-shopping). Explain when product checkout needs a booking app, availability/capacity configuration, and the difference between a paid appointment and a shopping consultation. Include an original capacity/cost example; check the Wix comparison and rental-business article for overlap. Do not imply Shopify alone reserves a time slot.
- **Whop adaptive pricing checkout review:** [official adaptive pricing](https://docs.whop.com/payments-and-billing/fees/adaptive-pricing.md) describes per-link opt-in, local currency, buyer switching, unsupported-region fallback, and a buyer conversion fee. Build a region/currency QA matrix. Verify fee and local-payment-method pages before quoting amounts or availability; present claimed acceptance benefits as provider claims, not measured results. No dedicated title found; review existing pricing/payment-method articles.
- **Whop iOS versus web purchase prices:** [official iOS purchase documentation](https://docs.whop.com/payments-and-billing/fees/in-app-ios-purchases.md) explains a one-time purchase threshold, markup arithmetic, and pending payout timing. Develop an original buyer-price and merchant-cash-timing example. Confirm current Whop terms and applicable Apple policy before publishing; avoid repeating the source's broad claim about all App Store purchases. No dedicated title found. Keep this separate from iOS advertising attribution.

## October 23 completed and next research

Three new guides are in [the manifest](publication-2026-10-23-checkout-choices.json). Keep this cohort stable through October 30. Source-backed candidates checked October 23; complete body-level overlap and second-source checks before drafting:

- **Shopify theme replacement handoff:** [adding and switching themes](https://help.shopify.com/en/manual/online-store/themes/adding-themes) and [publishing](https://help.shopify.com/en/manual/online-store/themes/managing-themes/publishing-themes). Build a checklist separating persistent catalog data from theme-specific settings, templates, and app customizations. Check current Canvas/rollout behavior before advising rollback; distinguish from theme selection and developer tutorials.
- **Shopify collaborator project access:** [role examples](https://help.shopify.com/en/manual/your-account/users/roles/role-examples) and the linked collaborator-account documentation. Build an original task-to-permission handoff with an end-of-project review. No dedicated title found; verify overlap with ownership transfers. This is editorial research, not authorization to grant account access.
- **Whop higher checkout-link approval:** [official higher-link guidance](https://docs.whop.com/manage-your-business/payment-processing/access-higher-checkout-links.md) describes the initial $2,500 cap, review of offer/history, and a reserve option for new businesses. Explain an evidence checklist and cash-availability tradeoff; do not guarantee approval or a precise review time. Verify current account-specific terms and a second official source before drafting. No dedicated title found; inspect coaching-package and invoice guides for overlap.

## October 24 publication and next research

Completed three new guides: theme replacement handoff, collaborator project access, and higher Whop checkout-link approval. Manifest: [October 24](publication-2026-10-24-merchant-handoffs.json). Observe this batch through October 31 before material rewrites.

Next candidates, sources reviewed October 24; recheck before drafting:
- Shopify collection source/exclusion troubleshooting. [Official new model](https://help.shopify.com/en/manual/products/collections/create-collection) distinguishes products, variants, collections, and app sources; availability varies by admin. Focus a worked inclusion/exclusion example, separate from the existing AI collection-sort article.
- Seasonal Shopify collection visibility and redirect restoration. [Official redirects guide](https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect) says a hidden collection can redirect and returning it to visible deletes the redirect. Separate from migration mapping; resolve contradictory market-subfolder wording before giving locale instructions.
- Whop campaign destination review: checkout versus store page. [Official tracking links](https://docs.whop.com/manage-your-business/growth-marketing/tracking-links) supports both destinations and plan selection. Evaluate whether a practical campaign matrix adds enough distinct value beyond the existing tracking overview; merge into that guide if not. No assumed attribution window or commission guarantee.

No relevant verified official video was identified for this batch; original explanatory images were used.

## October 24 — requested Whop expansion

Completed nine additional publications beyond the daily three. Funding coverage uses Whop’s October 21 primary announcement: $200M Series D, $5.1B valuation, led by Sequoia and Shopify Ventures. Migration coverage uses the October 12 website documentation and source-platform references; most-website-migrations-within-an-hour is attributed to Whop, not promised for full operational cutover. Owned referral CTA and employment disclosure in every article.

Observe the seven migration guides before creating adjacent pages. Next useful source research: importer data/support matrix, custom-domain/redirect handling, and confirmed migration case studies with disclosed scope and measured timing. Do not invent connector support or extrapolate URL scanning to private data transfer. Existing general migration checklist remains the cluster entry point.

## October 25 — daily batch complete

Three genuinely new Whop migration guides published, each with an original illustration, exact owned referral CTA, employment disclosure, primary sources, and a worked example. No duplicate funding article or generic platform-name substitution. Fresh existing private Search Console reporting reused; recent releases remain unchanged to allow measurement. No new affiliate commission result established.

Pending product documentation questions are recorded privately: embedded-catalog discovery, shared-stock synchronization, and reconciling limited stock with private open orders. They are research questions, not observed defects. No external outreach.

## October 26 — daily batch complete

Three genuinely new Whop articles published with original illustrations, exact owned referral links, sponsored treatment, employment disclosures, primary sources, and practical examples. No dedicated connector or automatic private-record migration claims. Documentation questions captured privately for localized buying paths, extension replacements, and channel-level scope. No external messages sent.

## October 27 — daily batch complete

Three genuinely new Whop guides published, each with primary sources, an original illustration, concrete example, exact owned sponsored referral CTA and employment disclosure. Marketplace exports are not described as automatic transfers of accounts, reviews, customers, or demand. Existing migration checklist now links this reading path.

## October 28 — daily batch complete

Three genuinely new Whop migration workflow guides published, each with original imagery, primary sources, a worked example, exact owned sponsored referral URL and employment disclosure. Added inbound paths from the migration checklist. No suitable official video added for these operational workflows.

## October 29 — daily batch complete

Three new articles, three original illustrations, and contextual inbound links. Two Whop articles have the exact owned sponsored referral route and employment disclosure; the Shopify troubleshooting article serves current merchants and links relevant operating guides. No suitable official video forced into these workflows.

## October 30 — daily batch complete

Three new articles with primary sources, original illustrations and contextual inbound links. Both Whop articles include owned sponsored referral URLs and employment disclosure. No suitable official video forced into the operational guides.
