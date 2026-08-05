# X (Twitter) blog auto-poster — setup

Drips each blog post to **[@adsxcom](https://x.com/adsxcom)** for search + GEO
visibility: one post per day, newest posts first, then top GSC performers. Built
to keep the account healthy and stay inside X's 2026 rules.

- **Scheduler:** `.github/workflows/x-autopost.yml` (daily cron + manual button).
- **Runner:** `scripts/x-post.mjs` (drip) · `scripts/x-lib.mjs` (X API + copy + queue).
- **One-time auth:** `scripts/x-auth.mjs` (`npm run x:auth`).
- **State:** Neon Postgres (`DATABASE_URL`) — an idempotency ledger + the rotating
  OAuth refresh token. No git commits, no deploys, no double-posts.

---

## How it stays safe (account health)

| Risk | Mitigation |
|---|---|
| Duplicate/spammy content (top suspension cause) | **Unique copy per post**, written by Claude from the post's own title/summary. |
| Bursty posting looks like a bot | **1 post/run**, once a day. A 30-post PR releases ~1/day, not all at once. |
| Double-posting | Each slug is **claimed in the DB before posting** (`ON CONFLICT`), so a crash or re-run can never repeat one. |
| Rate limits | ~1/day sits ~100× under X's 100-posts/15-min cap; on a 429 the run reads `x-rate-limit-reset` and **stops** instead of hammering. |
| Accidental go-live | Ships **OFF**. Nothing posts until `X_AUTOPOST_ENABLED=true`. `npm run x:dry` previews with zero cost/risk. |
| ToS | Official X API v2 only; register your use case honestly as "posting our own blog announcements." |

**Cost (X pay-per-use, 2026):** a post containing a link is **$0.20**. At 1/day
that's ~$6/month; backfilling the ~40 qualifying performers is a one-time ~$8.

---

## Step 0 — Check your X API access (you weren't sure)

Log in at **[developer.x.com](https://developer.x.com)** → **Developer Portal** and check:

1. **Do you have a Project + App?** Dashboard → is there a Project with an App under it?
   - *No app* → create a Project, then an App inside it.
2. **What plan is the project on?** Look for a "Plan / Usage" or "Billing" panel.
   - *Grandfathered Free/Basic* (project made before ~Feb 2026): you can post today.
   - *Pay-per-usage* (new projects): add a payment method / credits. Posting a
     link is $0.20/call — a few dollars covers months.
3. **Is OAuth 2.0 user auth enabled?** App → **User authentication settings** → **Set up**:
   - **App permissions:** Read and write
   - **Type of App:** Web App / Confidential client (gives you a **Client Secret**)
   - **Callback URI:** `http://127.0.0.1:8477/callback`  ← paste exactly
   - **Website URL:** `https://www.adsx.com`
4. **Grab credentials:** from **Keys and tokens** copy the **OAuth 2.0 Client ID**
   and **Client Secret**.

If any of these are missing, do them now — the rest of setup needs the Client ID/Secret.

---

## Step 1 — Authorize once (mint the refresh token)

From your machine, logged into X as **@adsxcom**:

```bash
X_CLIENT_ID=xxxx X_CLIENT_SECRET=xxxx npm run x:auth
```

A browser opens; approve the app. This writes `x-oauth.json` (git-ignored), seeds
the refresh token into Neon, and prints the three secrets to add to CI. Then:

```bash
npm run x:preflight   # ✓ Auth OK — posting as @adsxcom
npm run x:dry         # preview the exact posts it would send (nothing is posted)
```

## Step 2 — Add CI secrets & variables (GitHub → Settings)

**Secrets** (Settings → Secrets and variables → Actions → *Secrets*):

| Secret | Value |
|---|---|
| `X_CLIENT_ID` | from your X app |
| `X_CLIENT_SECRET` | from your X app |
| `X_OAUTH_REFRESH_TOKEN` | from `x-oauth.json` (seeds the DB the first CI run) |
| `DATABASE_URL` | same Neon URL the app uses |
| `ANTHROPIC_API_KEY` | already set for the GSC workflow |
| `RESEND_API_KEY` | optional — enables the daily summary email |

**Variables** (same page → *Variables*):

| Variable | Value |
|---|---|
| `X_AUTOPOST_ENABLED` | `false` for now — flip to `true` to go live |
| `SITE_URL` | `https://www.adsx.com` |
| `CONTACT_EMAIL` / `FROM_EMAIL` | for the summary email (optional) |
| `X_SUMMARY_EMAIL` | where to send the daily summary (optional) |

## Step 3 — Test in CI, then go live

1. GitHub → **Actions** → **X auto-post** → **Run workflow** with **dry_run = true**.
   Confirm the logs show the copy it would post.
2. Run once with **preflight = true** to confirm CI auth works.
3. Set the `X_AUTOPOST_ENABLED` variable to **`true`**. Done — it posts one per day
   at 15:00 UTC. Flip it back to `false` anytime to pause instantly.

---

## Tuning (repo *Variables*, all optional)

| Variable | Default | Meaning |
|---|---|---|
| `X_MAX_PER_RUN` | `1` | posts per run — keep low for account health |
| `X_BACKFILL_MIN_CLICKS` | `3` | only backfill posts with ≥ this many GSC clicks ("top performers") |
| `X_FRESH_DAYS` | `14` | posts newer than this jump the queue |
| `X_COPY_MODEL` | `claude-sonnet-5` | model that writes the copy |

## Operations

- **Pause instantly:** set `X_AUTOPOST_ENABLED` → `false`.
- **What's been posted:** `select slug, status, tweet_id, posted_at from x_autopost order by posted_at desc;`
- **Retry a failure:** rows go `error` after a failed post and retry up to
  `X_MAX_ATTEMPTS` (3); to force a re-attempt, `delete from x_autopost where slug='…';`
- **Queue logic:** fresh posts (< `X_FRESH_DAYS`) first, newest-first; then
  performers (≥ `X_BACKFILL_MIN_CLICKS`), highest-clicks-first. Posts that are
  neither fresh nor performers are intentionally not tweeted.
