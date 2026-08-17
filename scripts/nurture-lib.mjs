/**
 * NURTURE-LIB — shared library for the email nurture drip.
 *
 * WHAT: every subscriber captured by /api/subscribe gets a short, dated series
 * on launching an online store. Each email is genuinely useful AND carries the
 * tracked Shopify affiliate CTA — email is the "second bite" at the up-to-400-day
 * trial-to-paid window, so a reader who researched today but opens a store in
 * October still converts through us.
 *
 * WHY a cron (not an ESP): state already lives in Neon (email_subscribers, the
 * same table /api/subscribe writes) and sends go through Resend (already wired).
 * No new SaaS, no per-contact fee. Mirrors the X auto-poster: kill switch,
 * DB-atomic claim so a step is never sent twice, and --dry-run for zero-risk
 * previews.
 *
 * SAFETY:
 *   - NURTURE_ENABLED must be exactly "true" or nothing sends (ships OFF).
 *   - Atomic per-step claim (UPDATE ... WHERE nurture_step = <current>) means two
 *     overlapping runs can't double-send; a send failure rolls the step back to
 *     retry next run.
 *   - A 20h "already emailed today" guard means a subscriber gets at most one
 *     email per day even if the workflow is re-run manually.
 *   - One-click unsubscribe + postal address in every email (CAN-SPAM).
 */
import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";

// --------------------------------------------------------------------- config
function intEnv(name, def) {
  const v = parseInt(process.env[name] || "", 10);
  return Number.isFinite(v) ? v : def;
}

export const cfg = {
  // Master kill switch. Nothing sends unless this is exactly "true" (a repo
  // Variable in CI so it flips in the GitHub UI). Ships OFF.
  enabled: (process.env.NURTURE_ENABLED || "false").toLowerCase() === "true",
  // Strip any whitespace a pasted/line-wrapped secret introduced — a Postgres
  // URL has none, and neon() rejects a stray newline as an invalid HTTP header.
  databaseUrl: (process.env.DATABASE_URL || "").replace(/\s+/g, ""),
  resendKey: (process.env.RESEND_API_KEY || "").trim(),
  fromEmail: process.env.FROM_EMAIL || "hello@adsx.com",
  siteUrl: (process.env.SITE_URL || process.env.NEXT_PUBLIC_APP_URL || "https://www.adsx.com").replace(/\/+$/, ""),
  // CAN-SPAM: a real postal address is required in every commercial email.
  postalAddress: process.env.BUSINESS_POSTAL_ADDRESS || "AdsX — set BUSINESS_POSTAL_ADDRESS",
  // Optional 2nd affiliate offer (see SECOND-AFFILIATE-OFFER-BRIEF.md). When set,
  // the final email recommends it; when unset, that email links internally
  // instead of ever inventing an affiliate URL.
  secondOfferHref: process.env.SECOND_AFFILIATE_LINK || "",
  secondOfferName: process.env.SECOND_AFFILIATE_NAME || "",
  maxPerRun: intEnv("NURTURE_MAX_PER_RUN", 200),
  // Gentle pacing between Resend calls (ms) to stay under rate limits.
  sendDelayMs: intEnv("NURTURE_SEND_DELAY_MS", 600),
};

// The Impact link for the Shopify affiliate program — must match src/lib/affiliate.ts.
const SHOPIFY_AFFILIATE_LINK = "https://shopify.pxf.io/c/6318547/3797171/13624";
const FREE_TRIAL_DEEP_LINK = "https://www.shopify.com/free-trial";

// Build a tracked Shopify CTA link, attributed to the email + step (subId1),
// email-sourced (subId2), mirroring shopifyAffiliateHref() in the TS lib.
export function shopifyHref(step) {
  const url = new URL(SHOPIFY_AFFILIATE_LINK);
  url.searchParams.set("u", FREE_TRIAL_DEEP_LINK);
  url.searchParams.set("subId1", `email-${step}`);
  url.searchParams.set("subId2", "email");
  return url.toString();
}

// ------------------------------------------------------------------------- DB
let _sql;
export function db() {
  if (!_sql) {
    if (!cfg.databaseUrl) throw new Error("DATABASE_URL is not set.");
    _sql = neon(cfg.databaseUrl);
  }
  return _sql;
}

// Create the table if the cron happens to run before the first signup. Kept in
// exact sync with src/lib/subscribers.ts.
export async function ensureTable() {
  const sql = db();
  await sql`CREATE TABLE IF NOT EXISTS email_subscribers (
    id            bigserial PRIMARY KEY,
    email         text NOT NULL UNIQUE,
    status        text NOT NULL DEFAULT 'active',
    source        text,
    nurture_step  int  NOT NULL DEFAULT 0,
    unsub_token   text NOT NULL,
    created_at    timestamptz NOT NULL DEFAULT now(),
    updated_at    timestamptz NOT NULL DEFAULT now(),
    welcomed_at   timestamptz,
    last_sent_at  timestamptz
  )`;
  await sql`CREATE INDEX IF NOT EXISTS email_subscribers_drip_idx
    ON email_subscribers (status, nurture_step)`;
}

// Active subscribers who might be due for their next email, with server-computed
// ages so we never fight timezone parsing in JS.
export async function fetchCandidates() {
  const sql = db();
  return sql`
    SELECT id, email, nurture_step, unsub_token, welcomed_at,
      EXTRACT(EPOCH FROM (now() - created_at)) / 86400.0            AS age_days,
      EXTRACT(EPOCH FROM (now() - COALESCE(last_sent_at, created_at))) / 3600.0 AS hours_since_last
    FROM email_subscribers
    WHERE status = 'active' AND nurture_step < ${SEQUENCE.length}
    ORDER BY created_at ASC`;
}

// Atomically claim a step. Returns true iff this runner won the row (no other
// run/manual re-run can also send it).
export async function claimStep(id, fromStep, toStep) {
  const sql = db();
  const rows = await sql`
    UPDATE email_subscribers
    SET nurture_step = ${toStep}, last_sent_at = now(), updated_at = now()
    WHERE id = ${id} AND nurture_step = ${fromStep}
    RETURNING id`;
  return rows.length > 0;
}

export async function rollbackStep(id, toStep) {
  const sql = db();
  await sql`UPDATE email_subscribers SET nurture_step = ${toStep}
    WHERE id = ${id} AND nurture_step = ${toStep + 1}`;
}

export async function markWelcomed(id) {
  const sql = db();
  await sql`UPDATE email_subscribers
    SET welcomed_at = now(), last_sent_at = now(), updated_at = now()
    WHERE id = ${id} AND welcomed_at IS NULL`;
}

// ---------------------------------------------------------------- email chrome
const BRAND_GREEN = "#10b981";

function ctaButton(href, label) {
  return `<a href="${href}" style="display:inline-block;background:${BRAND_GREEN};color:#ffffff;font-weight:700;font-size:16px;text-decoration:none;padding:14px 28px;border-radius:8px;">${label} &rarr;</a>`;
}

const DISCLOSURE = `<p style="font-size:12px;color:#9ca3af;margin:20px 0 0;">Some links are affiliate links — if you start a store through them we may earn a commission, at no extra cost to you.</p>`;

// Branded shell, identical in spirit to src/lib/email.ts:emailShell.
function shell({ heading, bodyHtml, unsubUrl, preheader }) {
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;">
    ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>` : ""}
    <div style="background:linear-gradient(135deg,${BRAND_GREEN},#059669);padding:32px;border-radius:12px 12px 0 0;">
      <h1 style="color:#fff;margin:0;font-size:22px;line-height:1.25;">${heading}</h1>
    </div>
    <div style="background:#ffffff;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;color:#374151;font-size:16px;line-height:1.6;">
      ${bodyHtml}
    </div>
    <div style="padding:20px 8px;text-align:center;color:#9ca3af;font-size:12px;line-height:1.6;">
      <p style="margin:0 0 6px;">You're getting this because you signed up for the AdsX online-store starter series.</p>
      <p style="margin:0 0 6px;">${cfg.postalAddress}</p>
      <p style="margin:0;"><a href="${unsubUrl}" style="color:#9ca3af;text-decoration:underline;">Unsubscribe</a> &middot; one click, no questions.</p>
    </div>
  </div>`;
}

function unsubUrlFor(token) {
  return `${cfg.siteUrl}/api/unsubscribe?token=${token}`;
}

// ------------------------------------------------------------------- sequence
// Each step: dayOffset from signup + a builder returning {subject, html, text}.
// Static copy (not LLM-generated): a nurture series must be consistent, tested,
// and compliant — the opposite of the X poster's per-post unique copy.
export const SEQUENCE = [
  {
    step: 1,
    dayOffset: 2,
    build(ctx) {
      const cta = shopifyHref("nurture-1");
      const subject = "Can you actually sell *your* thing online?";
      const bodyHtml = `
        <p style="margin:0 0 16px;">Before spending a dollar on a store, three quick gut-checks tell you whether your product belongs online at all:</p>
        <p style="margin:0 0 8px;"><strong>1. Can someone want it without touching it?</strong> Photos + words have to do the selling. Coffee, apparel, prints, supplements, digital files: yes. A custom-fit mattress: harder.</p>
        <p style="margin:0 0 8px;"><strong>2. Can you ship it (or deliver it) for a sane cost?</strong> Light, durable, not perishable = easy. Heavy or fragile isn't a no, it just changes your pricing.</p>
        <p style="margin:0 0 20px;"><strong>3. Is anyone already searching for it?</strong> If people google "buy [your thing] online," demand exists — you're competing on store, not on creating the category.</p>
        <p style="margin:0 0 24px;">Pass two of three and you're ready to stop researching and stand up a test store. You can do that free — no card — and pay $1/month for the first 3 months once you're selling:</p>
        <p style="margin:0 0 8px;">${ctaButton(cta, "Start a free store trial")}</p>
        ${DISCLOSURE}`;
      const text = `Three gut-checks before you build a store:

1. Can someone want it without touching it? Photos + words do the selling.
2. Can you ship/deliver it for a sane cost?
3. Is anyone already searching for it? ("buy [your thing] online")

Pass two of three and you're ready to stand up a test store — free, no card, then $1/month for 3 months once you're selling:
${cta}

Some links are affiliate links; we may earn a commission at no extra cost to you.
Unsubscribe: ${ctx.unsubUrl}
${cfg.postalAddress}`;
      return { subject, html: shell({ heading: "Does your product fit online selling?", bodyHtml, unsubUrl: ctx.unsubUrl, preheader: "Three gut-checks before you build anything." }), text };
    },
  },
  {
    step: 2,
    dayOffset: 5,
    build(ctx) {
      const cta = shopifyHref("nurture-2");
      const subject = "What it actually costs to start (real numbers)";
      const bodyHtml = `
        <p style="margin:0 0 16px;">"Isn't an online store expensive?" is the #1 thing that stalls people. Here are the honest numbers for a first store:</p>
        <ul style="margin:0 0 16px;padding-left:20px;">
          <li style="margin:0 0 6px;"><strong>Platform:</strong> a free trial to build, then $1/month for your first 3 months on a paid plan (normally ~$39/mo Basic after).</li>
          <li style="margin:0 0 6px;"><strong>Transaction fees:</strong> ~2.9% + 30¢ per card sale on the built-in payments. That's it — no per-listing fee.</li>
          <li style="margin:0 0 6px;"><strong>Domain:</strong> ~$10-15/year, optional at first.</li>
          <li style="margin:0 0 6px;"><strong>Apps/theme:</strong> $0 to start — the free theme + built-ins cover a real store.</li>
        </ul>
        <p style="margin:0 0 24px;">So a working store's first few months cost about the price of lunch — the real "cost" is your time on product photos and copy. There's no reason to keep it hypothetical:</p>
        <p style="margin:0 0 8px;">${ctaButton(cta, "Build your store for $1/month")}</p>
        ${DISCLOSURE}`;
      const text = `The honest cost of a first store:

- Platform: free to build, then $1/month for 3 months (normally ~$39/mo after).
- Transaction fees: ~2.9% + 30c per card sale. No per-listing fee.
- Domain: ~$10-15/yr, optional at first.
- Apps/theme: $0 to start.

The real cost is your time on photos + copy. Start here:
${cta}

Some links are affiliate links; we may earn a commission at no extra cost to you.
Unsubscribe: ${ctx.unsubUrl}
${cfg.postalAddress}`;
      return { subject, html: shell({ heading: "The real cost of starting a store", bodyHtml, unsubUrl: ctx.unsubUrl, preheader: "Spoiler: about the price of lunch to start." }), text };
    },
  },
  {
    step: 3,
    dayOffset: 9,
    build(ctx) {
      const cta = shopifyHref("nurture-3");
      const subject = "5 mistakes that sink most first stores";
      const bodyHtml = `
        <p style="margin:0 0 16px;">Most first stores don't fail from bad products — they fail from a handful of avoidable mistakes:</p>
        <ol style="margin:0 0 16px;padding-left:20px;">
          <li style="margin:0 0 6px;"><strong>Waiting for "perfect."</strong> A live store with 3 products beats a perfect one that never launches.</li>
          <li style="margin:0 0 6px;"><strong>Too many products, day one.</strong> Start with your best 1-5. Depth of story beats breadth of catalog.</li>
          <li style="margin:0 0 6px;"><strong>No niche.</strong> "Gifts" loses; "gifts for climbers" wins. Specific is findable.</li>
          <li style="margin:0 0 6px;"><strong>Ignoring the first 10 visitors.</strong> Talk to them. Their questions are your product page.</li>
          <li style="margin:0 0 6px;"><strong>Not starting.</strong> The only fatal one. Every store owner you admire launched an ugly v1.</li>
        </ol>
        <p style="margin:0 0 24px;">The fix for four of these is the same: put up a small, real store and learn from live traffic. Free trial, $1/month once you sell:</p>
        <p style="margin:0 0 8px;">${ctaButton(cta, "Put up your v1 store")}</p>
        ${DISCLOSURE}`;
      const text = `5 mistakes that sink most first stores:

1. Waiting for "perfect."
2. Too many products day one — start with your best 1-5.
3. No niche — "gifts for climbers" beats "gifts."
4. Ignoring your first 10 visitors — their questions are your product page.
5. Not starting — the only fatal one.

The fix for most of these: put up a small, real store and learn from live traffic.
${cta}

Some links are affiliate links; we may earn a commission at no extra cost to you.
Unsubscribe: ${ctx.unsubUrl}
${cfg.postalAddress}`;
      return { subject, html: shell({ heading: "5 first-store mistakes (and the fix)", bodyHtml, unsubUrl: ctx.unsubUrl, preheader: "Four of the five have the same fix." }), text };
    },
  },
  {
    step: 4,
    dayOffset: 14,
    build(ctx) {
      const cta = shopifyHref("nurture-4");
      const subject = "Your one-week store launch plan";
      const bodyHtml = `
        <p style="margin:0 0 16px;">If you gave this one focused week, here's the plan that gets you from zero to a live store:</p>
        <ul style="margin:0 0 16px;padding-left:20px;">
          <li style="margin:0 0 6px;"><strong>Day 1:</strong> Start the free trial, pick the free theme, set your store name.</li>
          <li style="margin:0 0 6px;"><strong>Day 2-3:</strong> Add your first 1-5 products — real photos, honest descriptions, clear prices.</li>
          <li style="margin:0 0 6px;"><strong>Day 4:</strong> Write your About + shipping/returns. People buy from stores that feel real.</li>
          <li style="margin:0 0 6px;"><strong>Day 5:</strong> Turn on payments, run one test order end to end.</li>
          <li style="margin:0 0 6px;"><strong>Day 6:</strong> Tell 20 people directly. First sales almost always come from your own network.</li>
          <li style="margin:0 0 6px;"><strong>Day 7:</strong> Ship the first order. You're officially a store owner.</li>
        </ul>
        <p style="margin:0 0 24px;">The whole plan hinges on Day 1. Do that part now while it's in front of you:</p>
        <p style="margin:0 0 8px;">${ctaButton(cta, "Do Day 1 now")}</p>
        ${DISCLOSURE}`;
      const text = `Your one-week launch plan:

Day 1: Start the free trial, pick the free theme, name the store.
Day 2-3: Add your first 1-5 products (real photos, honest copy).
Day 4: Write About + shipping/returns.
Day 5: Turn on payments, run a test order.
Day 6: Tell 20 people directly.
Day 7: Ship the first order.

It all hinges on Day 1 — do that now:
${cta}

Some links are affiliate links; we may earn a commission at no extra cost to you.
Unsubscribe: ${ctx.unsubUrl}
${cfg.postalAddress}`;
      return { subject, html: shell({ heading: "Zero to live in one week", bodyHtml, unsubUrl: ctx.unsubUrl, preheader: "The whole plan hinges on Day 1." }), text };
    },
  },
  {
    step: 5,
    dayOffset: 21,
    build(ctx) {
      const cta = shopifyHref("nurture-5");
      // Only recommend a real 2nd offer once SECOND_AFFILIATE_LINK is set —
      // never invent an affiliate URL. Until then, link to the blog.
      // Offer-agnostic 2nd-affiliate slot: reads naturally whether the chosen
      // program is a supplier tool (Spocket), an email tool (Omnisend), etc.
      // See SECOND-AFFILIATE-OFFER-BRIEF.md. Never invents a URL when unset.
      const hasSecond = Boolean(cfg.secondOfferHref);
      const secondName = cfg.secondOfferName || "the right tool";
      const secondBlock = hasSecond
        ? `<p style="margin:0 0 8px;"><strong>The next tool I'd set up.</strong> Once orders are coming in, ${secondName} is the addition I'd make next — it pays for itself as you grow. ${ctaButton(cfg.secondOfferHref, `Set up ${secondName}`)}</p>`
        : `<p style="margin:0 0 8px;"><strong>Email marketing.</strong> Your list is your most valuable asset — start collecting emails from day one so repeat sales don't depend on ads.</p>`;
      const subject = "Once you're live: the tools worth adding";
      const bodyHtml = `
        <p style="margin:0 0 16px;">Last one. Once your store is live and taking orders, these are the additions that actually move revenue — in priority order, so you don't drown in apps:</p>
        <p style="margin:0 0 12px;"><strong>1. Reviews.</strong> Social proof lifts conversion more than almost any design change. Turn on a reviews app before anything fancy.</p>
        <div style="margin:0 0 12px;">${secondBlock}</div>
        <p style="margin:0 0 12px;"><strong>3. One traffic channel, done well.</strong> Pick the one place your buyers already are (a subreddit, TikTok, Pinterest) and show up consistently. One channel beats five half-tried.</p>
        <p style="margin:0 0 24px;">And if you haven't stood up the store yet — that's still step zero. Everything above compounds on top of a live store:</p>
        <p style="margin:0 0 8px;">${ctaButton(cta, "Start your store")}</p>
        <p style="margin:16px 0 0;">Thanks for reading the whole series. Reply any time — I read every email.</p>
        ${DISCLOSURE}`;
      const text = `Once you're live, the tools worth adding (in priority order):

1. Reviews — social proof lifts conversion more than most design changes.
2. ${hasSecond ? `The next tool I'd set up: ${secondName} — ${cfg.secondOfferHref}` : "Email marketing — your list is your most valuable asset; collect from day one."}
3. One traffic channel done well — show up where your buyers already are.

Haven't started the store yet? That's still step zero:
${cta}

Thanks for reading the whole series. Reply any time.

Some links are affiliate links; we may earn a commission at no extra cost to you.
Unsubscribe: ${ctx.unsubUrl}
${cfg.postalAddress}`;
      return { subject, html: shell({ heading: "The tools worth adding once you're live", bodyHtml, unsubUrl: ctx.unsubUrl, preheader: "In priority order, so you don't drown in apps." }), text };
    },
  },
];

// Welcome email — mirrors src/lib/email.ts:buildWelcomeEmail so the cron can
// self-heal a signup where Resend was momentarily down at capture time.
export function buildWelcome(ctx) {
  const cta = shopifyHref("nurture-welcome");
  const subject = "Welcome — let's figure out if you should sell online";
  const bodyHtml = `
    <p style="margin:0 0 16px;">Thanks for signing up. Over the next couple of weeks I'll send you a short, no-fluff series on launching an online store — what to sell, what it actually costs, and the mistakes that sink most first stores.</p>
    <p style="margin:0 0 16px;">The single biggest decision is <strong>where</strong> you build. If you already know you want your own store, the cleanest place to start is a free Shopify trial — no card required, then $1/month for your first 3 months.</p>
    <p style="margin:0 0 24px;">${ctaButton(cta, "Start a free store trial")}</p>
    <p style="margin:0;">Nothing to do today, though — the next email digs into whether your specific product is a good fit to sell online at all.</p>
    ${DISCLOSURE}`;
  const text = `Thanks for signing up. Over the next couple of weeks I'll send a short, no-fluff series on launching an online store.

The biggest decision is WHERE you build. The cleanest start is a free Shopify trial — no card, then $1/month for 3 months:
${cta}

Some links are affiliate links; we may earn a commission at no extra cost to you.
Unsubscribe: ${ctx.unsubUrl}
${cfg.postalAddress}`;
  return { subject, html: shell({ heading: "Welcome to AdsX", bodyHtml, unsubUrl: ctx.unsubUrl, preheader: "Your no-fluff online-store starter series starts now." }), text };
}

// -------------------------------------------------------------------- sending
let _resend;
function resend() {
  if (!_resend) {
    if (!cfg.resendKey) throw new Error("RESEND_API_KEY is not set.");
    _resend = new Resend(cfg.resendKey);
  }
  return _resend;
}

export async function sendEmail(to, built, unsubUrl) {
  await resend().emails.send({
    from: `AdsX <${cfg.fromEmail}>`,
    to,
    subject: built.subject,
    html: built.html,
    text: built.text,
    headers: {
      "List-Unsubscribe": `<${unsubUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });
}

export { unsubUrlFor };
