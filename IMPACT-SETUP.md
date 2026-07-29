# Impact (affiliate) Pipeline — Setup (one-time, ~3 min)

Adds the **outbound** half of the data pipeline. Where the GSC pipeline measures
Google → adsx.com (inbound search), this measures **adsx.com → Shopify**: the
outbound affiliate clicks on our Impact link and the bounties they earn — pulled
over the impact.com Partner API so it lands next to `gsc-data/` every night.

```
scripts/impact-lib.mjs   →  Partner API client (HTTP Basic, zero deps)
scripts/impact-pull.mjs  →  pulls conversions + earnings + clicks → impact-data/
```

It's already wired into the nightly workflow (`.github/workflows/gsc-nightly.yml`)
and **skips gracefully until the two secrets below exist**, so nothing breaks in
the meantime.

## What you get

`impact-data/<date>/summary.json` + `impact-data/history.jsonl`, and a summary
appended to the nightly PR body:

- **Conversions** and **net earnings** (approved + pending, minus reversed), broken
  down **per post** (`subId1`) and **per placement** (`subId2` = `inline` /
  `cta-top` / `cta-mid` / `cta-footer`) — so you can finally see which posts and
  which CTA slots actually convert.
- **Total outbound clicks** and **click→signup rate** (see the clicks note below).

## 1. Get your API credentials

On impact.com → **Settings → Technical Settings** (the *API* section). Copy:

- **Account SID** — a ~34-char id starting with `IR…`
- **Auth Token** — the secret password

These are the standard Partner-API credentials ([auth docs](https://integrations.impact.com/partner-api-reference/readme/authentication)); usage here is read-only.

## 2. Test locally

Either export env vars, or drop a git-ignored `impact-auth.json` in the repo root:

```json
{ "account_sid": "IRxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "auth_token": "your-auth-token" }
```

Then:

```bash
npm run impact:probe    # validates auth, lists your API-accessible report IDs
npm run impact:pull     # writes impact-data/<date>/ + history + PR summary
```

`impact:probe` confirms the credentials work and prints the reports your account
exposes — useful for the clicks step next.

## 3. Clicks: the report (auto-discovered, or pinned)

Conversions + earnings come from the **Actions** endpoint (a fixed, documented
contract — works out of the box). **Clicks** have no simple list endpoint on the
Partner API, so total outbound clicks come from a **performance Report**, and
report IDs are account-specific. The pull **auto-discovers** an API-accessible
performance report and sums its clicks column, logging exactly what it picked.

If auto-discovery can't find one (or picks wrong), pin it explicitly — grab the
id from `npm run impact:probe` and set:

```bash
export IMPACT_REPORT_ID=<the-report-id>   # e.g. a "Performance by Day" report
npm run impact:pull
```

Earnings/conversions always populate even if the clicks report isn't resolved yet;
`clicks` just shows as _not configured_ until then. (For per-click fidelity later,
Impact also offers an async `ClickExport` endpoint — not needed for the nightly
totals, but the path is there if we ever want raw per-click rows.)

## 4. Wire up GitHub Actions (nightly)

Repo → **Settings → Secrets and variables → Actions → New repository secret**:

- `IMPACT_ACCOUNT_SID`
- `IMPACT_AUTH_TOKEN`
- *(optional)* repo **variable** `IMPACT_REPORT_ID` if you pinned one in step 3.

That's it — the existing **GSC nightly audit** workflow now also pulls Impact,
commits the `impact-data/` snapshot, and appends the affiliate summary to the PR.

## Security

- Read-only Partner API usage.
- `impact-auth.json` is git-ignored — credentials never enter the repo; in CI they
  live only in GitHub secrets. `impact-data/` snapshots (data, not secrets) **are**
  committed, and the Account SID is masked in them.
