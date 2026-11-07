# Newsletter readiness — November 7, 2026

Newsletter acquisition is now authorized. The current production application has no subscription API or capture component. PR #45 is an old, unmerged implementation, not a live subscriber pipeline.

## Verified prerequisites

Production environment metadata has DATABASE_URL, but a read-only SELECT 1 connection attempt failed with authentication code 28000. RESEND_API_KEY and FROM_EMAIL are not configured in production. Private evidence is retained outside tracked files; no credentials are included here. No signup, confirmation message or campaign was sent.

Dennis needs to restore a working Neon connection string in the AdsX Vercel production environment and configure a Resend sending API key plus FROM_EMAIL on a verified sending domain. Supply secrets through provider settings, never public repository files or chat. Preview/test access should be configured separately for verification before releasing a live form. Domain verification status was not established from the absent credentials.

## Implementation to prepare after access is restored

Reuse only suitable pieces of PR #45 after review against current main. Its single-opt-in flow and nurture sequence do not satisfy the new confirmation-based acquisition plan unchanged. Keep nurture sending disabled; do not merge stale affiliate claims or campaign automation as part of signup work.

Implement an optional subscribe page plus contextual prompt-library/article placements. Capture source path and consent version; distinguish pending confirmation, active, unsubscribed and suppressed states. Use short-lived confirmation tokens stored as hashes, validated input, abuse protection and generic responses that do not expose subscriber existence. Confirmation and unsubscribe must be idempotent; scanner visits must not silently perform destructive state changes. Verify signed one-click unsubscribe behavior and visible preferences before launch.

Proposed promise: practical Shopify and AI prompts, app-cost decisions and useful merchant workflows. Keep the library ungated. Confirm the editorial sending cadence before launching campaigns. Validate a full opt-in, confirmation and unsubscribe journey in a controlled test environment before counting acquisition as active. Track confirmed subscriptions by source separately from affiliate clicks and commissions.

Next action: restore provider access, then implement and test the acquisition flow. Today's content release does not display a nonfunctional signup form.
