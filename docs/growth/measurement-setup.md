# Measurement and audience readiness — September 9, 2026

## Verified in the source

- GA4 is enabled through `src/components/analytics/index.tsx` using measurement ID G-LEYJH1XDJJ.
- Shopify affiliate links include article and placement sub-IDs. `affiliate_click` is implemented.
- Meta code is a commented template, not an active pixel. X is also only a commented configuration placeholder. No Google Ads destination ID is configured in this component.
- GA4 alone does not establish that Google Ads remarketing, account linking, consent signals, or audience exports are working.
- The blog's newsletter field had no submission handler. It has been replaced by a working RSS link until an actual email subscription flow is connected. Contact-form submissions are not newsletter signups.
- This is a source audit. Live event receipt, account linking, consent behavior, and audience population have not been verified.

## Next implementation requirements

1. Identify existing Meta pixel/dataset ID, Google Ads destination/account linkage, X pixel ID, and ownership. Reuse existing assets; avoid duplicate pixels.
2. Review the site's consent behavior and desired markets, then configure the relevant consent controls before adding advertising tags. Verify both consented and declined paths using current platform documentation.
3. Confirm the existing email service and list, free-tier limits, sender/domain setup, and subscriber consent language. Build a reusable app-cost worksheet or launch checklist as the first optional subscription benefit.
4. Implement and verify subscription confirmation, resource delivery, unsubscribe, and analytics completion events. Keep email addresses out of analytics event parameters.
5. Validate event receipt in the relevant platforms. Record each platform's actual status instead of labeling all traffic as a remarketing audience.

## Reporting

Track Google Search clicks, analytics users, sessions, repeat visits, affiliate clicks, qualifying referrals, locked commissions, email subscribers, and usable advertising audiences separately. Report landing URL, content topic, and new-store versus existing-merchant intent. Paid remarketing campaigns and ad spend are outside this $0 distribution cycle.
