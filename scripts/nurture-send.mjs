#!/usr/bin/env node
/**
 * NURTURE-SEND — nightly driver for the email nurture drip.
 *
 * Run:
 *   node scripts/nurture-send.mjs --dry-run   # preview, sends nothing, no DB writes
 *   node scripts/nurture-send.mjs             # live (requires NURTURE_ENABLED=true)
 *
 * For each active subscriber it sends at most ONE email per run: a welcome
 * catch-up if the signup-time send failed, otherwise the next sequence step once
 * its day-offset has elapsed. The step is claimed atomically before sending, so
 * overlapping runs can't double-send; a send failure rolls the step back to
 * retry next night. See nurture-lib.mjs for the sequence + safety notes.
 */
import {
  cfg,
  ensureTable,
  fetchCandidates,
  claimStep,
  rollbackStep,
  markWelcomed,
  buildWelcome,
  sendEmail,
  unsubUrlFor,
  SEQUENCE,
} from "./nurture-lib.mjs";

const dryRun = process.argv.includes("--dry-run");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  if (!cfg.databaseUrl) {
    console.error("DATABASE_URL is not set — cannot run the nurture drip.");
    process.exit(1);
  }
  if (!cfg.enabled && !dryRun) {
    console.log("NURTURE_ENABLED is not 'true' — nothing will be sent. Exiting.");
    return;
  }
  if (!dryRun && !cfg.resendKey) {
    console.error("RESEND_API_KEY is not set — cannot send. Exiting.");
    process.exit(1);
  }

  console.log(
    `nurture-send ${dryRun ? "[DRY RUN]" : "[LIVE]"} — sequence has ${SEQUENCE.length} steps, ` +
      `postal="${cfg.postalAddress}", 2nd-offer=${cfg.secondOfferHref ? "set" : "unset"}`,
  );

  await ensureTable();
  const candidates = await fetchCandidates();
  console.log(`${candidates.length} active subscriber(s) below the last step.`);

  const stats = { welcomed: 0, sent: 0, skipped: 0, failed: 0, waiting: 0 };
  let sentThisRun = 0;

  for (const c of candidates) {
    if (sentThisRun >= cfg.maxPerRun) {
      console.log(`Hit NURTURE_MAX_PER_RUN=${cfg.maxPerRun}; stopping this run.`);
      break;
    }
    const ageDays = parseFloat(c.age_days);
    const hoursSinceLast = parseFloat(c.hours_since_last);
    const unsubUrl = unsubUrlFor(c.unsub_token);

    // One email per subscriber per day, even across manual re-runs.
    if (hoursSinceLast < 20) {
      stats.skipped++;
      continue;
    }

    // Welcome catch-up: only if the signup-time send never landed (welcomed_at
    // still null a full day later). Normal signups are welcomed in seconds and
    // never reach this branch.
    if (!c.welcomed_at && ageDays >= 1) {
      if (dryRun) {
        console.log(`  would WELCOME (catch-up) ${c.email}`);
      } else {
        try {
          await sendEmail(c.email, buildWelcome({ unsubUrl }), unsubUrl);
          await markWelcomed(c.id);
          console.log(`  welcomed (catch-up) ${c.email}`);
          await sleep(cfg.sendDelayMs);
        } catch (err) {
          stats.failed++;
          console.error(`  FAILED welcome ${c.email}:`, err?.message || err);
          continue;
        }
      }
      stats.welcomed++;
      sentThisRun++;
      continue;
    }

    // Next sequence step, if its day-offset has elapsed.
    const nextStep = c.nurture_step + 1;
    const seq = SEQUENCE[nextStep - 1];
    if (!seq) continue;
    if (ageDays < seq.dayOffset) {
      stats.waiting++;
      continue;
    }

    if (dryRun) {
      console.log(`  would send step ${nextStep} ("${seq.build({ unsubUrl }).subject}") to ${c.email}`);
      stats.sent++;
      sentThisRun++;
      continue;
    }

    // Atomic claim — only the runner that advances the step from its current
    // value gets to send.
    const won = await claimStep(c.id, c.nurture_step, nextStep);
    if (!won) {
      stats.skipped++;
      continue;
    }
    try {
      await sendEmail(c.email, seq.build({ unsubUrl }), unsubUrl);
      stats.sent++;
      sentThisRun++;
      console.log(`  sent step ${nextStep} to ${c.email}`);
      await sleep(cfg.sendDelayMs);
    } catch (err) {
      await rollbackStep(c.id, c.nurture_step);
      stats.failed++;
      console.error(`  FAILED step ${nextStep} ${c.email} (rolled back):`, err?.message || err);
    }
  }

  console.log(
    `Done. welcomed=${stats.welcomed} sent=${stats.sent} waiting=${stats.waiting} ` +
      `skipped=${stats.skipped} failed=${stats.failed}`,
  );
  if (stats.failed > 0 && !dryRun) process.exitCode = 1;
}

main().catch((err) => {
  console.error("nurture-send crashed:", err);
  process.exit(1);
});
