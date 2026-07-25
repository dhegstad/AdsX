# GSC Pipeline — Setup (one-time, ~5 min)

Connects Search Console to the repo over the API so you never hand-export CSVs again,
and runs a nightly **audit → review → plan** in GitHub Actions.

```
scripts/gsc-pull.mjs    →  pulls GSC data to gsc-data/ (replaces the manual export)
scripts/gsc-audit.mjs   →  deterministic signals → gsc-worklist.json + dated report
scripts/gsc-review.mjs  →  Claude turns the audit into a fix/kill/write-next plan
.github/workflows/gsc-nightly.yml  →  runs all three nightly, opens/updates one PR
```

Auth is a **service account** (no token expiry, ideal for unattended cron). The only
steps a human must do are creating the Google credential and pasting it into a GitHub
secret — everything else is built. **No `gcloud` needed** — all in the web console.

---

## 1. Create a Google Cloud project + service account

1. Go to <https://console.cloud.google.com/> → project picker (top bar) → **New Project**.
   Name it e.g. `adsx-gsc`, create, and make sure it's the selected project.
2. Enable the API: <https://console.cloud.google.com/apis/library/searchconsole.googleapis.com>
   → **Enable** (confirm the `adsx-gsc` project is selected).
3. Create the service account:
   <https://console.cloud.google.com/iam-admin/serviceaccounts> → **Create service account**.
   - Name: `gsc-reader` → **Create and continue** → skip roles (Search Console access is
     granted in step 2, not via IAM roles) → **Done**.
4. Create a key:
   - Click the `gsc-reader@…` service account → **Keys** tab → **Add key** → **Create new key**
     → **JSON** → **Create**. A `*.json` file downloads. **Keep it safe — it's a credential.**
5. Copy the service-account **email** (looks like `gsc-reader@adsx-gsc.iam.gserviceaccount.com`).
   You'll need it in the next step.

## 2. Give the service account read access to your GSC property

1. Open <https://search.google.com/search-console> and select the AdsX property.
2. **Settings** (left sidebar) → **Users and permissions** → **Add user**.
3. Paste the service-account email from step 1.5. Permission: **Full** (or **Restricted** —
   read access is all the pipeline uses). **Add**.

> This is the one step with no API — GSC user management is web-UI only. Takes 30 seconds.

## 3. Test it locally (optional but recommended)

```bash
# from the repo root — put the downloaded key here (git-ignored, never committed):
mv ~/Downloads/adsx-gsc-*.json ./gsc-sa-key.json

npm run gsc:pull      # auto-detects your property, writes gsc-data/<date>/
npm run gsc:audit     # writes gsc-worklist.json + gsc-data/reports/<date>-audit.md
```

The pull prints which property it picked. If it lists several and picks the wrong one,
set the right one in `.env` (`GSC_SITE_URL=sc-domain:adsx.com` — the pull output shows the
exact strings available) and re-run.

To also generate the Claude plan locally:

```bash
export ANTHROPIC_API_KEY=sk-ant-...   # or add it to .env
npm run gsc:review    # writes gsc-data/reports/<date>-plan.md
```

## 4. Wire up GitHub Actions (the nightly run)

In the repo on GitHub → **Settings**:

1. **Secrets and variables → Actions → New repository secret**
   - Name: `GSC_SA_KEY` — Value: **paste the entire contents of the JSON key file**.
2. *(Optional)* **New repository secret** `ANTHROPIC_API_KEY` — enables the nightly Claude plan.
   Without it, the nightly still ships the deterministic audit.
3. *(Optional)* **Variables** tab → **New repository variable** `GSC_SITE_URL` — only if
   auto-detect picked the wrong property in step 3 (e.g. `sc-domain:adsx.com`).
4. **Actions → General → Workflow permissions** → enable
   **"Allow GitHub Actions to create and approve pull requests"** → **Save**.
   (Without this the branch still gets pushed nightly, but the PR won't auto-open.)

Then test it: **Actions** tab → **GSC nightly audit** → **Run workflow**. It should pull,
audit, (optionally) plan, and open a **GSC nightly audit** PR. After that it runs every
night at 09:00 UTC on its own.

---

## How it works day-to-day

- Every night the workflow commits a fresh `gsc-data/` snapshot to the evergreen
  `gsc-nightly` branch and opens/updates **one** PR whose body is that night's plan.
- **Merging the PR** lands the snapshot on `main` and grows `gsc-data/history.jsonl` — which
  is what powers week-over-week trends. Review cadence = merge cadence.
- The audit is memory-weighted to how AdsX operates: **clicks + indexation** are the headline
  (impressions are mostly AI fan-out), and it automates the indexation-loop **BLOCKER** by
  flagging any kill-listed page that's still earning traffic.

## Tips

- **Activate the ★ CTR cross-reference:** run `node scripts/ctr-audit.mjs` to regenerate
  `ctr-worklist.json` against the current 335-post corpus (the committed one predates the
  prune). Then the audit marks CTR bleeders that already have a queued title/meta fix.
- **Prefer commit-to-main over PRs?** In `.github/workflows/gsc-nightly.yml`, replace the
  branch/PR step with a commit + `git push origin HEAD:main`. Trends then accumulate
  automatically without a merge step.
- **Deeper history:** `npm run gsc:pull -- --full` pulls the full ~16 months (GSC max) instead
  of the default trailing 90 days.
- **Indexation detail:** `scripts/gsc-lib.mjs` exposes `inspectUrl()` (URL Inspection API,
  rate-limited) if you later want per-URL index status sampling.

## Security

- The service-account key grants **read-only** GSC access (scope `webmasters.readonly`).
- `gsc-sa-key.json` and `*.sa-key.json` are git-ignored — the key never enters the repo.
  In CI it lives only in the `GSC_SA_KEY` secret.
- `gsc-data/` snapshots **are** committed (they're data, not secrets).
