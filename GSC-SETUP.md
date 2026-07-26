# GSC Pipeline — Setup (one-time, ~5 min)

Connects Search Console to the repo over the API so you never hand-export CSVs again,
and runs a nightly **audit → review → plan** in GitHub Actions.

```
scripts/gsc-auth.mjs    →  one-time OAuth consent (mints a refresh token)
scripts/gsc-pull.mjs    →  pulls GSC data to gsc-data/ (replaces the manual export)
scripts/gsc-audit.mjs   →  deterministic signals → gsc-worklist.json + dated report
scripts/gsc-review.mjs  →  Claude turns the audit into a fix/kill/write-next plan
.github/workflows/gsc-nightly.yml  →  runs all three nightly, opens/updates one PR
```

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
npm run gsc:pull      # auto-detects your property, writes gsc-data/<date>/
npm run gsc:audit     # writes gsc-worklist.json + gsc-data/reports/<date>-audit.md
```

The pull prints which property it picked. If it picks the wrong one, set
`GSC_SITE_URL=sc-domain:adsx.com` in `.env` (the pull output lists the exact strings) and re-run.

To also generate the Claude plan locally: `export ANTHROPIC_API_KEY=sk-ant-...` then `npm run gsc:review`.

### 5. Wire up GitHub Actions (the nightly run)

In the repo on GitHub → **Settings → Secrets and variables → Actions → New repository secret**,
add the three values `npm run gsc:auth` printed:

- `GSC_OAUTH_CLIENT_ID`
- `GSC_OAUTH_CLIENT_SECRET`
- `GSC_OAUTH_REFRESH_TOKEN`

Optional: add `ANTHROPIC_API_KEY` (enables the nightly Claude plan; without it you still get the
deterministic audit) and, only if auto-detect picked the wrong property, a repo **variable**
`GSC_SITE_URL`.

Then: **Settings → Actions → General → Workflow permissions** → enable
**"Allow GitHub Actions to create and approve pull requests"** → **Save**.

Test it: **Actions → GSC nightly audit → Run workflow**. It should open a **GSC nightly audit**
PR. After that it runs every night at 09:00 UTC on its own.

---

## How it works day-to-day

- Every night the workflow commits a fresh `gsc-data/` snapshot to the evergreen
  `gsc-nightly` branch and opens/updates **one** PR whose body is that night's plan.
- **Merging the PR** lands the snapshot on `main` and grows `gsc-data/history.jsonl` — which
  powers week-over-week trends. Review cadence = merge cadence.
- The audit is weighted to how AdsX operates: **clicks + indexation** are the headline
  (impressions are mostly AI fan-out), and it automates the indexation-loop **BLOCKER** by
  flagging any kill-listed page that's still earning traffic.

## Tips

- **Activate the ★ CTR cross-reference:** run `node scripts/ctr-audit.mjs` to regenerate
  `ctr-worklist.json` against the current 335-post corpus (the committed one predates the
  prune). Then the audit marks CTR bleeders that already have a queued title/meta fix.
- **Deeper history:** `npm run gsc:pull -- --full` pulls the full ~16 months (GSC max) instead
  of the default trailing 90 days.
- **Token stopped working?** If a nightly run fails with `invalid_grant`, the refresh token was
  revoked/expired — re-run `npm run gsc:auth` and update the `GSC_OAUTH_REFRESH_TOKEN` secret.
  (Only happens on External/Testing apps left unpublished — see step 2.)

## Alternative: service account (only if your org doesn't block keys)

If you're not under a restrictive org: create a service account, download a JSON key, add its
email as a user in Search Console (Settings → Users and permissions), then drop the key at
`./gsc-sa-key.json` locally / set the `GSC_SA_KEY` secret in CI. The pipeline uses it
automatically when no OAuth credentials are present. `scripts/gsc-lib.mjs` supports both.

## Security

- Read-only GSC access only (scope `webmasters.readonly`).
- `gsc-oauth.json`, `gsc-sa-key.json`, and `client_secret*.json` are git-ignored — credentials
  never enter the repo. In CI they live only in GitHub secrets.
- `gsc-data/` snapshots **are** committed (data, not secrets).
