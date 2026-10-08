# AdsX deployment cost controls

Updated October 4, 2026. Dennis requested lower infrastructure cost while preserving performance. Account usage exports and precise billing data are kept outside this public repository in the ignored local audit directory.

## Current controls

- AdsX uses a fixed Basic Vercel build machine with on-demand build concurrency disabled. Fluid Compute and the existing function region remain unchanged. This affects build capacity, not the deployed site's rendering resources. Verify a successful build before retaining any smaller machine setting.
- `vercel.json` runs `scripts/vercel-ignore-build.mjs`. Documentation, internal agent guidance, analytics reports, and the pre-build decision hook itself can skip application builds. The hook runs from each new checkout before this decision, so changing it does not require deploying the application. The script compares against the previous successful deployment, or the public remote main revision for a new preview branch. It does not require Vercel to retain an origin remote; unavailable shallow baselines are fetched before comparison. Application, content, public assets, configuration, and unknown changes build normally. Missing or invalid comparison data also builds normally.
- Repository-backed blog pages and the sitemap have no timed revalidation. Publishing a deployment refreshes their content. Pagination is generated at build time. RSS and fixed icons/social artwork are static outputs as well.
- Whop article illustrations display their checked-in SVG originals, avoiding image transformations. PNG versions remain available for social metadata. The explicit image registry only maps known SVG/PNG pairs; add new pairs to `src/lib/whop-illustrations.json` or the general `src/lib/editorial-illustrations.json` registry as appropriate when publishing. Photographs retain responsive optimization and the existing long image cache lifetime.
- Keep preview validation for code/content releases. Batch related content into one reviewed release. Post-release records should not require an application rebuild.

## Verification and follow-up

Run `DEVELOPER_DIR=/Library/Developer/CommandLineTools node --test scripts/vercel-ignore-build.test.mjs` when changing build filtering. Verify both a real content deployment and a subsequent records-only skip. Inspect the build output's prerender manifest and live responses when changing caching; do not cache authenticated or customer-specific API responses as public content.

Use `vercel usage --group-by project --format json` and complete comparable reporting periods to assess actual savings. Distinguish effective cost before credits from billed cost, and isolate AdsX from team subscription charges and other projects. Never label credits consumed as an equivalent cash charge. The initial October sample is only a partial month and does not establish a forecast.

Route-level metrics requested during this audit required adding AdsX to paid Observability Plus. No paid feature was enabled. Existing usage exports and build/static-output evidence were sufficient for the changes above. Revisit dynamic blog social images or additional caching only if measured usage makes them material; do not remove useful performance monitoring blindly.

The optional paid model-review script remains excluded from the authorized maintenance workflow. Do not activate it, social posting, or paused email work as part of cost monitoring.
