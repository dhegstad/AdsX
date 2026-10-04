# How AdsX affiliate reporting works

The report should connect the reader's starting page with the commercial outcome. Its purpose is to choose which topics and conversion paths deserve more work. As clarified October 4, AdsX targets affiliate revenue from Shopify, individual Shopify apps covered in the publication, and Whop. Track those sources separately before calculating an overall total; the Shopify reporting below is not a report of all three.

| Measure | Source | Decision it supports |
|---|---|---|
| Search impressions and clicks by page/query | Google Search Console | Which relevant searches already expose AdsX? |
| Landing sessions and affiliate-click events | GA4 | Do readers follow the Shopify recommendation? |
| Referral stages and attributed actions | Impact | Which tagged pages generate referrals? |
| Commission amount, status, and payment | Impact | Which referrals produce payable and paid revenue? |

AdsX's standard affiliate links already carry `subId1` for the article/tool slug and `subId2` for the placement (`inline`, `cta-top`, `cta-mid`, or `cta-footer`). The client also emits an `affiliate_click` event with that page and placement. A click from the startup calculator uses `shopify-startup-cost-calculator` as its source ID. These tags are the intended matching keys for aggregate reporting, not a verified person-level join between GA4 and Shopify.

Shopify's [affiliate earnings documentation](https://help.shopify.com/en/affiliates/earnings), reviewed September 9, 2026, distinguishes free trials, paid trials, full-price referrals, commission lock, and payment. Eligible Basic, Grow, and Advanced referrals require full-price payment. Public payouts vary by merchant geography ($150 or $25), and the Impact agreement controls the applicable terms. Track reversals and locked/paid status. A promotion can delay qualification, so a trial cohort and its eventual commissions can span different months.

## Recommended view

One row per page and referral cohort: relevant landing sessions, AdsX affiliate clicks, Impact-attributed clicks where available, trial actions, qualifying paid referrals, merchant market, earned/reversed/locked/paid commission, and revenue per 1,000 relevant sessions. Keep source definitions visible: GA4 events and Impact clicks can differ because of consent, blockers, attribution rules, or reporting windows. Do not silently combine them as if they are identical.

Compare mature cohorts. A hypothetical article with 1,000 relevant sessions and two payable $150 referrals earns $300, or $300 per 1,000 sessions. That is an illustration, not AdsX performance. Use actual commission values instead of multiplying every trial by $150.

The report guides actions: strong exposure with weak relevant clicks prompts a query/title review; readers without affiliate clicks prompt a page-fit/CTA review; trials without mature paid referrals prompt an audience, plan, geography, and qualification review. New cohorts need time to qualify before comparison with mature ones.

## September 16 verification

GA4 receipt is verified for affiliate_click, tool_used, and tool_download. Event-scoped custom dimensions are now registered: Content page maps to post_slug; Affiliate placement maps to placement; Tool maps to tool_id. These definitions support future report breakdowns and do not reconstruct historical custom-dimension data. Account totals and screenshots remain outside this public repository.

For a page report, filter to affiliate_click and break down event count and total users by Content page and Affiliate placement. Keep tool_used and tool_download in a separate tool report. A click is an outbound-interest event, not a Shopify registration, qualifying referral, or purchase. No monetary value is assigned to it.

Impact requires an authenticated session or authorized export before commission reconciliation can be completed. Match Impact subId1 and subId2 to the GA4 page and placement in aggregate; keep trial, full-price, locked, reversed, and paid amounts separate. Older untagged referrals cannot be retroactively assigned to articles without supporting evidence.

Meta, Google Ads, and X audience tags are not active: their account identifiers and consent configuration remain prerequisites. Email capture and email sequences are deferred at the owner's request.

## October 4 Whop referral expansion

The enrolled Whop Partners dashboard issued `https://whop.com/start/?code=YDMPYR`. Use that route only for commercial Whop signup recommendations. Documentation and pricing citations remain direct. Standard partner enrollment is complete; the optional Verified Partner application and payout configuration are separate, and neither is claimed complete.

Whop article links emit `whop_referral_click` with `post_slug`, `placement`, and `provider: whop` when gtag is available. This deliberately uses a separate event from Shopify's existing `affiliate_click`, so the Shopify reporting series is not silently mixed with another provider. Source code tests confirm the event payload and sponsored links; actual GA4 event receipt and attributed Whop commissions still require their own evidence. Do not label the click event as a paid conversion or assign it a monetary value.

The dashboard-issued Whop link does not include a verified per-article attribution parameter. Do not invent one. Page-level outbound interest can be measured by the click event; partner-level credited businesses and earnings must be read from Whop. Do not claim a person-level or article-level commission join without provider evidence. No referral email invitations or paid partner services were used.

## Shopify app referrals and combined reporting

App affiliate programs are separate from Shopify's merchant-referral program. An app install, trial, subscription, and qualifying commission can be different stages under the app vendor's contract. Before monetizing a recommendation, verify the official program, approval, AdsX-owned referral URL, qualifying action, commission terms, supported tracking parameters, and reporting access. No app-specific program activation or new commission is claimed by this strategy update.

Use a provider/program field in the reporting model. Preserve the established Shopify `affiliate_click` and Whop `whop_referral_click` definitions; add explicit provider identification for app events when their integrations are implemented. Do not send app referrals through Shopify's Impact signup link, pool app clicks into the existing Shopify series, or invent provider attribution parameters. Keep source citations direct.

For each provider, report relevant landing sessions, outbound clicks, provider-attributed actions, qualifying referrals, and pending/approved/reversed/paid commissions where the provider exposes them. Retain currency, reporting window, and status; do not add unlike currencies or count the same commission again when it is paid. Aggregate only compatible amounts. Mark unavailable attribution as unavailable, not zero or estimated revenue. The original $3,000/month goal applies to Shopify; Dennis has not set a combined three-source revenue target.

Dennis's Whop employment and AdsX's referral relationship belong in public disclosures. Product feedback for Whop is a separate output: observed friction or documentation gaps, supporting evidence, merchant impact, and a suggested improvement. It is not an affiliate conversion metric, and an inferred issue must not be reported as a tested failure.
