# Daily publishing and growth

Updated October 4, 2026 following Dennis's explicit request. The existing `adsx-daily-blog-maintenance` heartbeat is now named **AdsX daily publishing and growth** and runs every day at 09:00 America/Chicago in the same task. Its live prompt was updated through the Codex automation tool. This policy supersedes the earlier low-volume maintenance guidance, including historical statements against an article quota.

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

## Research queue after the first Whop batch

These are candidates, not verified briefs or a license to publish overlapping pages. Compare with the expanded library before selecting them; replace a duplicate with another distinct intent.

| Candidate | Reader task | Original contribution to develop |
| --- | --- | --- |
| Whop digital-product access setup | Deliver the correct resource after payment | Access matrix for files, lessons, and community tiers |
| Whop refund and cancellation workflow | Handle the operational consequences of a refund | Payment/access/physical-delivery exception map |
| Whop tracking links and reporting | Compare campaigns without confusing clicks with revenue | Worked reporting reconciliation table |
| Physical product plus a paid community | Decide whether the combined offer is worth operating | Fulfillment and support capacity model |
| Whop recurring offer versus installments | Choose the right charge and delivery promise | Timeline showing cash receipts and service obligations |
| Whop ecommerce launch analysis | Understand a documented new release | Public availability, setup, and capability evidence matrix; awaiting a public launch source |
| Shopify first-store catalog planning | Build a usable initial assortment | Sample catalog with explicit operational tradeoffs |
| Shopify checkout payment-method selection | Choose methods for an identified customer mix | Cost and eligibility comparison using current sources |
| AI-assisted product comparison writing | Produce accurate merchant-facing comparisons | A sourced brief, faulty draft, and verified revision |

Review cohorts at sensible intervals rather than rewriting yesterday's work daily. Measure 7/28-day discovery and traffic, referral clicks, and available attributed outcomes separately. The daily output commitment does not guarantee a date for traffic leadership or revenue targets.

## Shopify app partnership work

Alongside publishing, research free official affiliate programs for apps already covered in commercially useful articles. Prioritize reader fit and existing relevant traffic, then verify program eligibility and economics. Record provider, official program page, account/approval status, qualifying action, current commission terms, verified owned link, supported attribution fields, covered pages, and next action. An application is not approval, and a working link is not a commission. Do not fabricate enrollment or activate a guessed referral URL. Surface account or enrollment steps Dennis must complete; email outreach and purchases remain paused. Add provider-specific reporting before claiming app revenue is measured.

## Boundaries that still apply

Dennis explicitly excludes printing from this project. Do not build or promote print/PDF resources, add print controls, or open print dialogs during QA. Keep resources useful directly on the website; focus on articles, organic visibility, and referral conversions.

No paid directories, subscriptions, ads, API calls, or optional paid model review. Email capture, newsletters, outreach, verification-email work, and social posts remain paused. No promotion of installation of the unapproved AdsX app. Free directory work can supplement publishing when relevant; use dennis@adsx.com if contact is required and distinguish a submission from a public backlink. User action is needed for identity or payout details when actually requested by the service; ordinary research and publishing should continue independently.
