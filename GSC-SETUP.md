# Search Console reporting

New reports stay in ignored local storage. The October 7 maintenance review disabled the public GitHub reporting workflow: it had been publishing snapshots into a public branch and attempting an optional paid model review. The workflow now also requires a private repository. This prevents new publication; it does not erase historical snapshots, logs, or PR bodies.

Reuse a fresh complete report before fetching again. The daily Codex publishing task can run `npm run gsc:nightly` locally when needed; no paid model is called. Its default output is `.local-audits/reporting/gsc-data/`, including `latest.json`, dated snapshots, reports, and `gsc-worklist.json`. `GSC_DATA_DIR` can select another private destination. Never point it at tracked files for this public project. Impact uses `.local-audits/reporting/impact-data/` by default and its own authorized credentials.

## Auth: OAuth (recommended for the `adsx.com` org)

The GCP project lives under the **`adsx.com` Google Workspace org**, which blocks
service-account **key** downloads by default. So we authenticate **as you** — you already
own the Search Console property, so there's no service account to create and no user to add.
You authorize once in a browser; the pipeline stores a refresh token and runs unattended
after that. (A service-account alternative is at the bottom for non-restricted setups.)

### 1. Enable the Search Console API

In your `AdsX AI Connect` project (top-bar project picker), enable it here:
<https://console.cloud.google.com/apis/library/searchconsole.googleapis.com> → **Enable**.

### 2. Configure the OAuth consent screen

**APIs & Services → OAuth consent screen** (<https://console.cloud.google.com/apis/credentials/consent>):

- **User type:**
  - Choose **Internal** *if the Google account that owns your GSC property is on the
    `adsx.com` Workspace* (e.g. `you@adsx.com`) → no verification, token never expires. Easiest.
  - Otherwise choose **External** (e.g. if the property is owned by a personal `@gmail.com`).
    Add that account under **Test users**, and after saving click **Publish app → Confirm**
    (to "In production") so the refresh token doesn't expire after 7 days. You'll see an
    "unverified app" warning when authorizing — that's expected for your own app; proceed via
    **Advanced → Go to AdsX (unsafe)**.
- App name: `AdsX GSC`, and set your email for the support + developer contact fields. Save.
  (You don't need to add scopes on this screen — the auth request asks for read-only GSC.)

### 3. Create an OAuth client (Desktop app)

**APIs & Services → Credentials** (<https://console.cloud.google.com/apis/credentials>) →
**Create credentials → OAuth client ID** → Application type: **Desktop app** → name it
`AdsX GSC CLI` → **Create** → **Download JSON**.
(This download is an OAuth client, **not** a service-account key, so the org policy doesn't
block it.)

### 4. Authorize once + test locally

From the repo root, point the helper at the file you just downloaded:

```bash
GSC_OAUTH_CLIENT_FILE=~/Downloads/client_secret_*.json npm run gsc:auth
```

Your browser opens → approve with the account that owns the GSC property. The helper saves
`gsc-oauth.json` (git-ignored) and prints three values for GitHub. Then confirm it works:

```bash
npm run gsc:pull      # auto-detects your property, writes .local-audits/reporting/gsc-data/<date>/
npm run gsc:audit     # writes worklist + reports inside the private data directory
```

The pull prints which property it picked. If it picks the wrong one, set
`GSC_SITE_URL=sc-domain:adsx.com` in `.env` (the pull output lists the exact strings) and re-run.

Paid model review is excluded from the daily commands and disabled by default. Do not enable it under the current no-paid-API instruction.

## Operating the report

Keep the daily task responsible for reading the latest complete date, separating delayed days from zero traffic, and using spaced URL Inspection checks. Impressions, organic clicks, outbound affiliate clicks, qualified referrals, and commissions are different measures. The Search Console export does not identify an AI fan-out share or establish affiliate revenue.

A page with no clicks is a review candidate, not an automatic deletion candidate. Inspect age, historical traffic, links, and distinct reader value before consolidation. Do not count a sitemap API `indexed: 0` as the site's indexed-page total.

## Private storage and access

- `.local-audits/` and OAuth/service-account credential files are ignored. Keep raw metrics out of public release records and PR descriptions.
- The local scripts use existing read-only Google access. `scripts/gsc-lib.mjs` supports OAuth or a service account already granted access to the property.
- Leave the public GitHub workflow disabled. Its private-repository guard is a second protection, not a reason to re-enable it here.
- Existing reports in repository history and PR #25 were not erased or rewritten in this maintenance release. Any historical cleanup needs a separately scoped repository operation.
- If moving reporting to a private service later, verify repository access, logs, artifacts, retention, and costs before enabling automatic uploads. No paid review is needed.
