# Notify participating search engines after publishing

AdsX uses the free [IndexNow protocol](https://www.indexnow.org/documentation) to notify participating engines, including Bing, of newly published or substantively changed pages. Google indexing remains a separate Search Console workflow. This does not guarantee crawling, indexing, ranking, or AI citations.

The configured text file under `public/` is a public domain-verification file, not an account credential. Publish it on the canonical host before the first submission. Its filename is configured in `config/indexnow.json`.

After a content release is verified in production:

1. Include the changed articles and genuinely updated public pages in the release manifest.
2. Preview with `npm run indexnow -- docs/growth/sprint-2026-09-17.json`.
3. Submit once with the same command plus `--submit`. The script checks the live key, page status, canonical, and indexing directives first.
4. Record the receipt outside private analytics exports. HTTP 200 means received; HTTP 202 means key validation is pending. Neither means indexed.

Follow the [current FAQ](https://www.indexnow.org/faq): notify one endpoint, submit recent meaningful changes, avoid repeated submissions without changes, and retain accurate XML sitemaps for older content. Do not resubmit yesterday's unchanged articles merely to increase submission counts. No scheduled task is introduced by this command.
