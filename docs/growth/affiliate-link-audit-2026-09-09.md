# Shopify affiliate link audit — September 9, 2026

## Scope and public-site findings

The production crawl started with all 408 sitemap URLs, expanded to built public routes, and followed internal anchors recursively. It inspected 1,054 URLs, including all 368 published blog posts, and inventoried 995 Impact anchors on 327 pages. Authenticated dashboards and API endpoints are excluded. Third-party links outside the Shopify ecosystem are inventoried but are not part of the affiliate destination check.

All 995 existing Impact links used the configured AdsX publisher, asset and campaign: `6318547 / 3797171 / 13624`. Their page IDs and placements were present and matched their host pages (topic pages use a `topic-` prefix). No publisher mismatch or source-ID collision was found.

The audit found and fixed:

| Finding | Change |
|---|---|
| Calculator pricing reference bypassed Impact | Use a shared inline affiliate component with the tool ID, `inline` placement, disclosure and sponsored link attributes |
| Netherlands guide linked to an HTTP Shopify blog URL | Use an explicit HTTPS source link; normalize Shopify deep links to HTTPS |
| Wall-art guide linked to missing `/guides` | Link to the live `/topics` guide index |
| Storefront API article cited a missing `inContext` documentation route | Link to Shopify's current contextual-query guide |
| Metaobjects article cited a missing metaobject documentation route | Link to Shopify's current data-modeling guide |

The link helper now explicitly selects `/free-trial` for signup links, including older bare Impact links. Pricing and source citations keep their intended Shopify destination through Impact. Page and placement are required at call sites; copied sub-IDs are replaced with the current page's tags while other link metadata is retained. The supported sub-ID length follows Impact's documented 255-character limit. The otherwise unused legacy markdown renderer also requires the host slug.

Help Center, developer documentation, app listings, account links and the specialized 1MBB enrollment references retain their actual destinations. These are not standard store-trial CTAs. An affiliate wrapper does not make a nonqualifying Shopify product or program commissionable.

## Redirect and browser evidence

One isolated request per distinct Impact destination was marked `impacttest=1`, as documented by [Impact](https://help.impact.com/partner/platform-features/tracking/tracking-links/create-and-manage-links/add-reporting-information-to-your-tracking-links). All 15 pre-fix destination variants returned Shopify pages with HTTP 200, an Impact click ID, and partner `6318547`. The default and explicit trial variants both reached `/free-trial`. The path included `shopify.pxf.io` → `www.ojrq.net` → `shopify.pxf.io` → Shopify. A browser check confirmed the trial page displayed the email field and signup button. No signup or purchase was submitted.

All 108 distinct directly linked Shopify reference URLs were also checked. Seventy-two returned HTTP 200; two developer documentation URLs returned 404 and were replaced with verified HTTP 200 destinations. Thirty-four Help Center URLs rejected the HTTP crawler with 403; all 34 were subsequently opened and verified in a normal browser. The HTTP block was not treated as proof of a broken user-facing page.

The post-fix local crawl inspected 1,053 URLs, including all 368 posts, and 996 Impact anchors on 327 pages, with zero link-audit findings. The URL count fell by one because the broken `/guides` link was removed. Signup URLs are present in rendered HTML and do not depend on GA4 or client JavaScript to navigate through Impact.

Eleven affiliate regression tests, the 40-article content check, the production build, and TypeScript passed. Tests cover publisher identity, explicit signup destinations, destination preservation, HTTPS normalization, copied/duplicate sub-IDs, long slugs, special-program references, unrelated hosts, unsafe destinations, and analytics being unavailable.

## Attribution boundary

This public report contains site/link evidence only. Account-side results are private and should not be committed to this public repository. A working redirect proves that Shopify receives the tracking information; it does not by itself prove commission eligibility, locking, payment, or the attribution of every future signup. Use Impact action records and the signed Shopify contract for those conclusions. Public earnings rules are described in [Shopify's affiliate earnings documentation](https://help.shopify.com/en/affiliates/earnings).

Sub-IDs support aggregate source reporting as described in [Impact's parameter documentation](https://help.impact.com/partner/platform-features/tracking/tracking-links/link-parameters/sub-id-and-shared-id-parameters-explained-for-partners). Older actions without source tags cannot be retroactively assigned to an article without separate evidence.

## Repeat the check

```sh
npm run test:affiliate
npm run build
python3 scripts/audit-affiliate-links.py --output /tmp/adsx-affiliate-links.json
```

The crawler checks public pages and inventories links without clicking affiliate URLs. It exits nonzero for HTTP failures, incorrect publisher IDs, missing/incorrect page tags, unknown placements, unsafe destinations, published test flags, untracked standard Shopify marketing links, missing sponsored attributes, or source collisions. For a local server, add `--base http://localhost:3012`.

When a destination or tracking asset changes, a deliberate redirect check can be run separately:

```sh
python3 scripts/check-affiliate-redirects.py --audit /tmp/adsx-affiliate-links.json --output /tmp/adsx-affiliate-redirects.json
```

This makes marked test requests; do not schedule it as a recurring click generator. No automated test signups or purchases are needed. Brand-generated tracking parameters must be preserved.
