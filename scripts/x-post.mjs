#!/usr/bin/env node
/**
 * X-POST — the drip runner (one scheduled run = up to X_MAX_PER_RUN posts).
 *
 *   node scripts/x-post.mjs --preflight   # verify creds only, posts nothing
 *   node scripts/x-post.mjs --dry-run     # generate + print copy, posts nothing
 *   node scripts/x-post.mjs               # live (requires X_AUTOPOST_ENABLED=true)
 *
 * Safe by construction: honors the kill switch, claims each slug in the DB
 * before posting (never double-posts), and stops the run on a 429.
 */
import {
  cfg,
  initDb,
  selectCandidates,
  claim,
  markPosted,
  markError,
  getAccessToken,
  postTweet,
  whoAmI,
  generateCopy,
  sendSummary,
} from "./x-lib.mjs";

const DRY = process.argv.includes("--dry-run") || process.env.X_DRY_RUN === "1";
const PREFLIGHT = process.argv.includes("--preflight");

async function main() {
  // Preflight: prove the OAuth token works and show the account. No copy, no post.
  if (PREFLIGHT) {
    await initDb();
    const at = await getAccessToken();
    const me = await whoAmI(at);
    console.log(`✓ Auth OK — posting as @${me.username} (${me.name}, id ${me.id})`);
    return;
  }

  // --dry-run is a pure preview: no DB, no X calls — just ranking + copy.
  if (!DRY) {
    if (!cfg.enabled) {
      console.log("X_AUTOPOST_ENABLED is not 'true' — skipping. (Use --dry-run to preview copy.)");
      return;
    }
    await initDb();
  }

  const candidates = await selectCandidates({ ledger: !DRY });
  if (!candidates.length) {
    console.log("No candidates to post (nothing fresh and no un-posted performers).");
    return;
  }
  console.log(`${candidates.length} candidate(s) in queue. Posting up to ${cfg.maxPerRun} this run.`);

  const batch = candidates.slice(0, cfg.maxPerRun);
  const results = [];
  let accessToken = null;

  for (const post of batch) {
    const ageDays = Number.isFinite(post.ageMs) ? Math.round(post.ageMs / 86400000) : "?";
    let copy;
    try {
      copy = await generateCopy(post);
    } catch (e) {
      console.error(`✗ copy failed for ${post.slug}: ${e.message}`);
      results.push({ slug: post.slug, error: `copy: ${e.message}` });
      continue;
    }

    if (DRY) {
      console.log(
        `\n[DRY] ${post.slug}  (clicks=${post.g.clicks}, impr=${post.g.impressions}, age=${ageDays}d)\n` +
          `${copy.text}\n— ${copy.length}/280 weighted —`
      );
      results.push({ slug: post.slug, dry: true, text: copy.text });
      continue;
    }

    // Atomic claim → only the winner posts; a re-run can never repeat it.
    const claimed = await claim(post.slug, copy.url);
    if (!claimed) {
      console.log(`· skip ${post.slug} (already posted/claimed)`);
      continue;
    }

    try {
      if (!accessToken) accessToken = await getAccessToken();
      const r = await postTweet(accessToken, copy.text);
      await markPosted(post.slug, r.id, copy.text);
      console.log(`✓ posted ${post.slug} → https://x.com/${cfg.handle}/status/${r.id} (rate-limit remaining: ${r.remaining})`);
      results.push({ slug: post.slug, id: r.id, text: copy.text });
    } catch (e) {
      await markError(post.slug, e.message);
      results.push({ slug: post.slug, error: e.message });
      console.error(`✗ ${post.slug}: ${e.message}`);
      if (e.code === 429) {
        const when = e.reset ? new Date(Number(e.reset) * 1000).toISOString() : "unknown";
        console.error(`  Rate limited — window resets at ${when}. Stopping this run (no backoff-hammering).`);
        break;
      }
    }
  }

  await sendSummary(results);
}

main().catch((e) => {
  console.error(`\nx:post failed: ${e.message}\n`);
  process.exitCode = 1;
});
