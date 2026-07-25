# gsc-data/

Search Console snapshots written by `scripts/gsc-pull.mjs` — the API replacement for
hand-exported CSVs. Committed (data, not secrets). Setup: see `../GSC-SETUP.md`.

```
gsc-data/
  history.jsonl          append-only daily totals (7d/28d windows, indexed count) — kept forever
  latest.json            pointer + summary of the most recent snapshot
  <YYYY-MM-DD>/          one dated snapshot per pull (pruned after ~45 days)
    meta.json            window, totals, sitemap submitted/indexed counts
    dates.json           daily time series   (was Chart.csv)
    queries.json         per-query metrics    (was Queries.csv)
    pages.json           per-page metrics      (was Pages.csv)
    countries.json       per-country           (was Countries.csv)
    devices.json         per-device            (was Devices.csv)
  reports/
    <YYYY-MM-DD>-audit.md   deterministic audit narrative (gsc-audit.mjs)
    <YYYY-MM-DD>-plan.md    Claude fix/kill/write-next plan (gsc-review.mjs, if enabled)
    latest-audit.md / latest-plan.md
```

Full snapshots are pruned after ~45 days to bound repo size; `history.jsonl` is never pruned,
so week-over-week and month-over-month trends survive. The structured `gsc-worklist.json` (repo
root, next to `ctr-worklist.json`) holds the latest audit for downstream scripts.
