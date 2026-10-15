# Framework and authentication maintenance — October 15

Updates Next.js from 16.1.5 to 16.3.8 and Better Auth from 1.4.17 to 1.6.22, pinned to the reviewed releases. No authentication configuration, permissions, credentials, database data, or schema changes.

Primary review: [Next.js 16.3.8](https://github.com/vercel/next.js/releases/tag/v16.3.8), [Better Auth 1.6.22](https://github.com/better-auth/better-auth/releases/tag/v1.6.22), [1.5 changes](https://better-auth.com/blog/1-5), and [1.6 changes](https://better-auth.com/blog/1-6). The app uses email/password and Google sign-in without authentication plugins. Session freshness now follows creation time; sensitive actions may require fresh sign-in.

## Verification before release

- Production build and TypeScript completed with 571 routes.
- Three isolated authentication regression tests cover signup/sign-in, session retrieval and invalidation, incorrect passwords, Google authorization URL/scopes/PKCE, and untrusted-origin rejection. Memory storage and inert credentials prevent production writes or emails.
- Compared core schema declarations from the installed old and new packages: field types, required flags, uniqueness, and references are unchanged. No migration is proposed.
- Local login/signup routes, auth health, and anonymous session responses passed. Real authenticated Google callback and production database writes were not exercised.
- Referral tests and startup calculator tests passed; 39 publication routes, media, sitemap and canonical checks passed on the updated framework.
- Production dependency audit fell from 18 affected packages (including two critical) to 11 (six high and five moderate); no critical findings remain in this audit. This is dependency inventory evidence, not a claim that every finding was exploitable or that the application has no vulnerabilities.

## Remaining work

Review the remaining mail/serialization/transitive packages separately, with compatible updates and focused tests. Preserve the cost controls and static publication rendering. Release status and live verification belong in the maintenance log after deployment.
