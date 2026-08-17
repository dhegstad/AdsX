# Email capture + nurture drip — setup

Real email capture (replacing the old decorative `/blog` box) plus a dated,
DB-backed nurture series. Email is the **second bite** at Shopify's up-to-400-day
trial-to-paid window: a reader who researches today but opens a store in three
months still converts through us. No new SaaS — it reuses **Neon** (subscriber
state) and **Resend** (sending), and follows the same kill-switch + nightly-cron
pattern as the X auto-poster.

## What's built

| Piece | File |
|---|---|
| Capture component (real form, honeypot, GA4 `email_subscribe`) | `src/components/email-capture.tsx` |
| Subscribe API (upsert + welcome email + one-click headers) | `src/app/api/subscribe/route.ts` |
| Unsubscribe API (GET page + RFC 8058 POST) | `src/app/api/unsubscribe/route.ts` |
| Subscriber DB helpers (`email_subscribers` on Neon) | `src/lib/subscribers.ts` |
| Welcome email + shared shell | `src/lib/email.ts` |
| Nurture sequence + DB claim + sending | `scripts/nurture-lib.mjs` |
| Nightly driver | `scripts/nurture-send.mjs` |
| Nightly workflow (ships OFF) | `.github/workflows/nurture-nightly.yml` |

Capture is placed on: the `/blog` listing, **every blog post** (after the
Shopify CTA), and the three conversion hubs (`/start-a-shopify-store`,
`/is-shopify-right-for-you`, `/shopify-free-trial-deal`).

## The sequence

Single opt-in. Welcome fires immediately from `/api/subscribe`; the drip then
sends one email per day-offset:

| Email | Day | Angle |
|---|---|---|
| Welcome | 0 | What the series is + soft Shopify CTA |
| 1 | 2 | "Can you actually sell *your* thing online?" (3 gut-checks) |
| 2 | 5 | "What it actually costs to start" (real fee math) |
| 3 | 9 | "5 mistakes that sink most first stores" |
| 4 | 14 | "Your one-week launch plan" |
| 5 | 21 | "The tools worth adding once you're live" (← 2nd affiliate offer slot) |

Every email carries the tracked Shopify CTA (`subId1=email-nurture-N`,
`subId2=email`) and a one-click unsubscribe. Copy is static (consistent, tested,
compliant) — edit it in `scripts/nurture-lib.mjs`.

## Going live (checklist)

The capture form already works in production the moment `DATABASE_URL` +
`RESEND_API_KEY` are set (they are). Subscribers are stored and welcomed
immediately. The **nightly drip is OFF** until you opt in:

1. **Verify the sending domain in Resend** and confirm `FROM_EMAIL` (e.g.
   `hello@adsx.com`) is on that domain. Without this, Resend won't deliver.
2. **Set a real postal address** — repo Variable `BUSINESS_POSTAL_ADDRESS`
   (CAN-SPAM requires it in every email; the default is a visible placeholder).
3. Add repo **Secrets**: `DATABASE_URL`, `RESEND_API_KEY` (same values the app
   uses). Add repo **Variables**: `FROM_EMAIL`, `SITE_URL`,
   `BUSINESS_POSTAL_ADDRESS`.
4. **Dry-run it**: Actions → "Email nurture drip" → Run workflow (dry_run
   checked). It prints who *would* get what, sends nothing.
5. **Flip it on**: set repo Variable `NURTURE_ENABLED=true`. The 16:00 UTC cron
   takes over. Turn off any time by setting it back to `false`.

Optional: once you join a second affiliate program
(see `SECOND-AFFILIATE-OFFER-BRIEF.md`), set Variables `SECOND_AFFILIATE_LINK`
and `SECOND_AFFILIATE_NAME` — email 5 will recommend it automatically.

## Local testing

```bash
# Preview against the live Neon table — sends nothing, writes nothing:
npm run nurture:dry

# Actually send (needs NURTURE_ENABLED=true in .env.local):
npm run nurture:send
```

Both load `.env.local` via `--env-file`.

## Safety / compliance notes

- **Never double-sends**: each step is claimed with an atomic
  `UPDATE … WHERE nurture_step = <current>`; the workflow's `concurrency` group
  also prevents overlap. A send failure rolls the step back to retry next night.
- **One email/subscriber/day** max, enforced by a 20h `last_sent_at` guard.
- **Self-healing welcome**: if Resend is briefly down at signup, the cron sends
  the welcome a day later (it never fires for normally-welcomed signups).
- **CAN-SPAM**: postal address + one-click unsubscribe in every email;
  unsubscribes are honored immediately and idempotently.
- **FTC**: affiliate disclosure in every email that carries the Shopify CTA.
