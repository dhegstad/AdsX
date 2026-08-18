#!/usr/bin/env node
/**
 * GSC SITEMAPS — audit and repair the sitemaps registered on the property.
 *
 * Registered sitemaps rot silently: a path gets renamed, the old one keeps
 * 404ing, and GSC goes on reporting errors against a file that no longer
 * exists. Worse, a sitemap registered on the *non-canonical* host feeds Google
 * a URL set that disagrees with your canonical tags.
 *
 * Both were true on adsx.com as of 2026-08-18:
 *   /sitemap/0.xml, /sitemap/1.xml, /sitemap/2.xml  → 404, erroring since Jun 16
 *   https://adsx.com/sitemap.xml                    → apex, but the site
 *                                                     canonicalises to www
 *   https://www.adsx.com/sitemap.xml                → the live one, unregistered
 *
 *   npm run gsc:sitemaps          # audit only (safe, read-only)
 *   npm run gsc:sitemaps -- --fix # un-register dead paths, submit the canonical
 *
 * --fix needs the read-WRITE scope. The pipeline's default credential is
 * readonly, so re-consent once with `npm run gsc:auth` (it now requests the
 * writable scope) before running --fix.
 */
import { connect, listSitemaps, submitSitemap, deleteSitemap } from "./gsc-lib.mjs";

const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.adsx.com").replace(/\/$/, "");
const CANONICAL_SITEMAP = `${SITE_ORIGIN}/sitemap.xml`;
const FIX = process.argv.includes("--fix");

async function probe(url) {
  try {
    const res = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(15000) });
    return { status: res.status, location: res.headers.get("location") || null };
  } catch (err) {
    return { status: 0, error: err.message };
  }
}

function classify(path, probeResult) {
  if (probeResult.status === 0) return { verdict: "unreachable", drop: false };
  if (probeResult.status >= 400) return { verdict: `dead (${probeResult.status})`, drop: true };
  if (probeResult.status >= 300) return { verdict: `redirects (${probeResult.status})`, drop: true };
  // 200, but is it on the canonical host?
  if (!path.startsWith(SITE_ORIGIN)) return { verdict: "wrong host", drop: true };
  return { verdict: "ok", drop: false };
}

async function main() {
  const { token, siteUrl, principal } = await connect();
  console.log(`\n  Property : ${siteUrl}`);
  console.log(`  As       : ${principal}`);
  console.log(`  Canonical: ${CANONICAL_SITEMAP}\n`);

  const registered = await listSitemaps(token, siteUrl);
  if (!registered.length) console.log("  No sitemaps registered.\n");

  const rows = [];
  for (const s of registered) {
    const p = await probe(s.path);
    const { verdict, drop } = classify(s.path, p);
    rows.push({ ...s, probe: p, verdict, drop });
  }

  const pad = Math.max(20, ...rows.map((r) => r.path.length));
  for (const r of rows) {
    const submitted = r.contents.reduce((n, c) => n + c.submitted, 0);
    const flag = r.drop ? "✗" : "✓";
    console.log(
      `  ${flag} ${r.path.padEnd(pad)}  ${r.verdict.padEnd(16)} ` +
        `${String(submitted).padStart(5)} urls  ${r.errors} err  ${r.warnings} warn`
    );
  }

  const toDrop = rows.filter((r) => r.drop);
  const canonicalRegistered = rows.some((r) => r.path === CANONICAL_SITEMAP && !r.drop);

  console.log("");
  if (!toDrop.length && canonicalRegistered) {
    console.log("  Nothing to fix — the canonical sitemap is registered and every entry resolves.\n");
    return;
  }

  const plan = [
    ...toDrop.map((r) => `un-register  ${r.path}   (${r.verdict})`),
    ...(canonicalRegistered ? [] : [`submit       ${CANONICAL_SITEMAP}`]),
  ];
  console.log(FIX ? "  Applying:" : "  Would apply (re-run with --fix):");
  for (const line of plan) console.log(`    ${line}`);
  console.log("");

  if (!FIX) return;

  // Verify the canonical sitemap is actually serving before we register it —
  // submitting a 404 would just recreate the problem we're fixing.
  if (!canonicalRegistered) {
    const check = await probe(CANONICAL_SITEMAP);
    if (check.status !== 200) {
      console.error(`  ABORT: ${CANONICAL_SITEMAP} returned ${check.status}. Not submitting a broken sitemap.\n`);
      process.exitCode = 1;
      return;
    }
  }

  try {
    for (const r of toDrop) {
      await deleteSitemap(token, siteUrl, r.path);
      console.log(`    ✓ un-registered ${r.path}`);
    }
    if (!canonicalRegistered) {
      await submitSitemap(token, siteUrl, CANONICAL_SITEMAP);
      console.log(`    ✓ submitted     ${CANONICAL_SITEMAP}`);
    }
    console.log("\n  Done. Re-run without --fix in a few minutes to confirm.\n");
  } catch (err) {
    if (err.insufficientScope) {
      console.error(
        "\n  This credential is read-only.\n" +
          "  Re-consent once with the writable scope, then retry:\n\n" +
          "    npm run gsc:auth\n" +
          "    npm run gsc:sitemaps -- --fix\n"
      );
      process.exitCode = 1;
      return;
    }
    throw err;
  }
}

main().catch((err) => {
  console.error(`\n  ${err.message}\n`);
  process.exitCode = 1;
});
