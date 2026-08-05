/**
 * X-LIB — shared library for the X (Twitter) blog auto-poster.
 *
 * WHAT: drips each blog post to @adsxcom for search + GEO visibility, one post
 * per run, oldest-fresh-first then top GSC performers. Built to respect X's
 * 2026 rules so the account stays healthy:
 *   - Official X API v2 only (POST /2/tweets) — no scraping, ToS-compliant.
 *   - UNIQUE copy per post (Claude) — X suspends duplicate/near-identical spam.
 *   - Slow drip (1/run) + DB-atomic idempotency — a post can never go twice,
 *     and a 30-post PR releases ~1/day instead of a spammy burst.
 *   - OAuth 2.0 user context with a ROTATING refresh token persisted in Neon.
 *   - 429-aware: reads x-rate-limit-reset and backs off instead of hammering.
 *
 * COST (X pay-per-use, 2026): a plain post is $0.015; a post containing a link
 * is $0.200 (X prices link posts higher). We post the URL so the blog's
 * summary_large_image card renders — ~$0.20/post, trivial at this cadence.
 *
 * State lives in Postgres (Neon, DATABASE_URL) — no git commits, no deploys.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Anthropic from "@anthropic-ai/sdk";
import { neon } from "@neondatabase/serverless";

// --------------------------------------------------------------------- config
function intEnv(name, def) {
  const v = parseInt(process.env[name] || "", 10);
  return Number.isFinite(v) ? v : def;
}

export const cfg = {
  // Kill switch. Nothing posts unless this is exactly "true" (a repo variable in
  // CI). Ships OFF; use --dry-run to preview with zero cost/risk.
  enabled: (process.env.X_AUTOPOST_ENABLED || "false").toLowerCase() === "true",
  // OAuth 2.0 app credentials (confidential client → clientSecret set).
  clientId: process.env.X_CLIENT_ID || "",
  clientSecret: process.env.X_CLIENT_SECRET || "",
  // Seed refresh token from `npm run x:auth`; after first use the rotating token
  // lives in the DB and this is ignored.
  seedRefreshToken: process.env.X_OAUTH_REFRESH_TOKEN || "",
  // Health/throttle knobs.
  maxPerRun: intEnv("X_MAX_PER_RUN", 1),
  maxAttempts: intEnv("X_MAX_ATTEMPTS", 3),
  backfillMinClicks: intEnv("X_BACKFILL_MIN_CLICKS", 3), // "top performers" gate
  freshDays: intEnv("X_FRESH_DAYS", 14), // new posts jump the queue
  copyModel: process.env.X_COPY_MODEL || "claude-sonnet-5",
  siteUrl: (process.env.SITE_URL || process.env.NEXT_PUBLIC_APP_URL || "https://www.adsx.com").replace(/\/+$/, ""),
  handle: process.env.X_HANDLE || "adsxcom",
  // Infra (reused from the rest of the app).
  databaseUrl: process.env.DATABASE_URL || "",
  anthropicKey: process.env.ANTHROPIC_API_KEY || "",
  resendKey: process.env.RESEND_API_KEY || "",
  summaryEmail: process.env.X_SUMMARY_EMAIL || process.env.CONTACT_EMAIL || "",
  fromEmail: process.env.FROM_EMAIL || "hello@adsx.com",
};

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const GSC_DIR = path.join(process.cwd(), "gsc-data");

// ------------------------------------------------------------------------- DB
let _sql;
export function db() {
  if (!_sql) {
    if (!cfg.databaseUrl) throw new Error("DATABASE_URL is not set.");
    _sql = neon(cfg.databaseUrl);
  }
  return _sql;
}

export async function initDb() {
  const sql = db();
  // Idempotency ledger: one row per slug; 'posting' and 'posted' are terminal
  // for a run so a slug is never tweeted twice.
  await sql`CREATE TABLE IF NOT EXISTS x_autopost (
    slug        text PRIMARY KEY,
    status      text NOT NULL DEFAULT 'pending',
    tweet_id    text,
    text        text,
    url         text,
    error       text,
    attempts    int  NOT NULL DEFAULT 0,
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now(),
    posted_at   timestamptz
  )`;
  // Single-row store for the rotating OAuth2 refresh token.
  await sql`CREATE TABLE IF NOT EXISTS x_oauth_state (
    id            int PRIMARY KEY DEFAULT 1,
    refresh_token text NOT NULL,
    updated_at    timestamptz NOT NULL DEFAULT now()
  )`;
}

// ------------------------------------------------------- OAuth 2.0 (rotating)
export async function getRefreshToken() {
  const sql = db();
  const rows = await sql`SELECT refresh_token FROM x_oauth_state WHERE id = 1`;
  if (rows.length) return rows[0].refresh_token;
  if (cfg.seedRefreshToken) {
    await saveRefreshToken(cfg.seedRefreshToken);
    return cfg.seedRefreshToken;
  }
  throw new Error("No refresh token found. Run `npm run x:auth` (or set X_OAUTH_REFRESH_TOKEN).");
}

export async function saveRefreshToken(tok) {
  const sql = db();
  await sql`INSERT INTO x_oauth_state (id, refresh_token, updated_at)
            VALUES (1, ${tok}, now())
            ON CONFLICT (id) DO UPDATE SET refresh_token = ${tok}, updated_at = now()`;
}

// Exchange the (rotating) refresh token for a short-lived access token. X rotates
// the refresh token on every use — we persist the new one immediately or the next
// run gets 401s.
export async function getAccessToken() {
  const refresh = await getRefreshToken();
  const body = new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh });
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };
  if (cfg.clientSecret) {
    headers.Authorization = "Basic " + Buffer.from(`${cfg.clientId}:${cfg.clientSecret}`).toString("base64");
  } else {
    body.set("client_id", cfg.clientId); // public client
  }
  const res = await fetch("https://api.x.com/2/oauth2/token", { method: "POST", headers, body });
  const txt = await res.text();
  if (!res.ok) throw new Error(`OAuth token refresh failed (${res.status}): ${txt}`);
  const tok = JSON.parse(txt);
  if (tok.refresh_token && tok.refresh_token !== refresh) await saveRefreshToken(tok.refresh_token);
  if (!tok.access_token) throw new Error("OAuth token refresh returned no access_token.");
  return tok.access_token;
}

// --------------------------------------------------------------- X API calls
export async function postTweet(accessToken, text, { replyTo } = {}) {
  const payload = { text };
  if (replyTo) payload.reply = { in_reply_to_tweet_id: replyTo };
  const res = await fetch("https://api.x.com/2/tweets", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const reset = res.headers.get("x-rate-limit-reset");
  const remaining = res.headers.get("x-rate-limit-remaining");
  const txt = await res.text();
  if (res.status === 429) {
    const e = new Error("Rate limited by X (429).");
    e.code = 429;
    e.reset = reset;
    throw e;
  }
  if (!res.ok) throw new Error(`POST /2/tweets failed (${res.status}): ${txt}`);
  const j = JSON.parse(txt);
  return { id: j.data?.id, text: j.data?.text, remaining, reset };
}

// Cheap owned-read used by preflight to prove the token works and show which
// account we're authenticated as.
export async function whoAmI(accessToken) {
  const res = await fetch("https://api.x.com/2/users/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const txt = await res.text();
  if (!res.ok) throw new Error(`GET /2/users/me failed (${res.status}): ${txt}`);
  return JSON.parse(txt).data; // { id, name, username }
}

// ----------------------------------------------------------- content + GSC
export function loadPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, f), "utf8"));
      return {
        slug,
        title: data.title || slug,
        excerpt: data.excerpt || "",
        tldr: data.tldr || "",
        category: data.category || "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        date: data.date || null,
      };
    });
}

// slug -> { clicks, impressions } from the newest GSC snapshot on disk.
// GSC lists the canonical post URL AND a #anchor row per heading (each ~0 clicks),
// which all reduce to the same slug — so we keep the MAX per slug, not last-wins.
export function loadGscClicks() {
  const map = new Map();
  try {
    const dirs = fs
      .readdirSync(GSC_DIR)
      .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
      .sort()
      .reverse(); // newest first
    const newest = dirs.find((d) => fs.existsSync(path.join(GSC_DIR, d, "pages.json")));
    if (!newest) return map;
    const rows = JSON.parse(fs.readFileSync(path.join(GSC_DIR, newest, "pages.json"), "utf8"));
    for (const r of rows) {
      const m = (r.page || "").match(/\/blog\/([^/?#]+)/);
      if (!m) continue;
      const prev = map.get(m[1]) || { clicks: 0, impressions: 0 };
      map.set(m[1], {
        clicks: Math.max(prev.clicks, r.clicks || 0),
        impressions: Math.max(prev.impressions, r.impressions || 0),
      });
    }
  } catch {
    /* no GSC data yet — fresh posts still get tweeted */
  }
  return map;
}

// ------------------------------------------------------------ queue selection
// "Top performers + new": fresh posts (< freshDays) go first, newest-first;
// then backfill only posts with real search traction (>= backfillMinClicks),
// best-first. Posts that are neither fresh nor performers are simply not tweeted.
export async function selectCandidates({ ledger = true } = {}) {
  const posts = loadPosts();
  const gsc = loadGscClicks();
  // ledger:false → DB-free preview (used by --dry-run): treat nothing as posted.
  const blocked = new Set();
  if (ledger) {
    const sql = db();
    const rows = await sql`SELECT slug, status, attempts FROM x_autopost`;
    for (const r of rows) {
      if (r.status === "posted" || r.status === "posting") blocked.add(r.slug);
      else if (r.status === "error" && r.attempts >= cfg.maxAttempts) blocked.add(r.slug);
    }
  }
  const now = Date.now();
  const freshMs = cfg.freshDays * 86400000;
  const withMeta = posts
    .filter((p) => !blocked.has(p.slug))
    .map((p) => ({
      ...p,
      g: gsc.get(p.slug) || { clicks: 0, impressions: 0 },
      ageMs: p.date ? now - new Date(p.date).getTime() : Infinity,
    }));

  const fresh = withMeta.filter((p) => p.ageMs <= freshMs).sort((a, b) => a.ageMs - b.ageMs);
  const performers = withMeta
    .filter((p) => p.ageMs > freshMs && p.g.clicks >= cfg.backfillMinClicks)
    .sort((a, b) => b.g.clicks - a.g.clicks || b.g.impressions - a.g.impressions);

  return [...fresh, ...performers];
}

// ------------------------------------------------------------ ledger (atomic)
// Claim a slug before posting. INSERT wins for a new slug; a prior 'error' row
// (under the attempt cap) is re-claimed; 'posted'/'posting' rows fail the WHERE
// and return nothing → we skip. This is what makes double-posting impossible.
export async function claim(slug, url) {
  const sql = db();
  const rows = await sql`
    INSERT INTO x_autopost (slug, status, attempts, url, created_at, updated_at)
    VALUES (${slug}, 'posting', 1, ${url}, now(), now())
    ON CONFLICT (slug) DO UPDATE
      SET status = 'posting', attempts = x_autopost.attempts + 1, updated_at = now()
      WHERE x_autopost.status = 'error' AND x_autopost.attempts < ${cfg.maxAttempts}
    RETURNING slug`;
  return rows.length > 0;
}

export async function markPosted(slug, tweetId, text) {
  const sql = db();
  await sql`UPDATE x_autopost
            SET status='posted', tweet_id=${tweetId}, text=${text}, error=NULL,
                posted_at=now(), updated_at=now()
            WHERE slug=${slug}`;
}

export async function markError(slug, err) {
  const sql = db();
  await sql`UPDATE x_autopost SET status='error', error=${String(err).slice(0, 500)}, updated_at=now() WHERE slug=${slug}`;
}

// --------------------------------------------------------------- copy (Claude)
// X's weighted length: any URL counts as 23; CJK/emoji count as 2; else 1.
// We build to this, not raw .length, so we never trip the 280 limit.
export function tweetLength(text) {
  const t = text.replace(/https?:\/\/\S+/g, "u".repeat(23));
  let n = 0;
  for (const ch of t) {
    const cp = ch.codePointAt(0);
    const wide =
      cp > 0xffff || // emoji / astral
      (cp >= 0x1100 && cp <= 0x115f) || // Hangul Jamo
      (cp >= 0x2e80 && cp <= 0xa4cf) || // CJK, Kana, etc.
      (cp >= 0xac00 && cp <= 0xd7a3) || // Hangul syllables
      (cp >= 0xf900 && cp <= 0xfaff) ||
      (cp >= 0xfe30 && cp <= 0xfe4f) ||
      (cp >= 0xff00 && cp <= 0xff60) ||
      (cp >= 0xffe0 && cp <= 0xffe6);
    n += wide ? 2 : 1;
  }
  return n;
}

// One unique, on-brand tweet per post. The URL is appended here (not asked of
// the model) so it's always present and we own the length math.
export async function generateCopy(post) {
  const url = `${cfg.siteUrl}/blog/${post.slug}`;
  if (!cfg.anthropicKey) throw new Error("ANTHROPIC_API_KEY is not set (needed for copy generation).");
  const anthropic = new Anthropic({ apiKey: cfg.anthropicKey });

  const system = `You write posts on X for AdsX (@${cfg.handle}), which helps online sellers start and grow their Shopify store.
Write ONE post promoting the blog article below.
- ONE tight, specific hook that makes a Shopify seller want to read. Lead with the concrete takeaway, number, or surprising fact.
- Aim for ~150–200 characters. Shorter and punchier is better. Never exceed 220.
- Plain, confident, useful voice — like a smart peer, not a marketer.
- BANNED: "Here's", "Here's why/what/how", "link below", "link in bio", "thread", "breakdown", clickbait, engagement-bait questions, "🚀", and ending on a colon or dash.
- No hashtags — this account is already about Shopify, so "#Shopify" is noise. (A single niche hashtag is OK only if genuinely additive; default to none.)
- Do NOT include any URL, "link", or "below" — the link is appended on its own line.
- Use only facts from the article; never invent stats, prices, or claims.
Return ONLY the post text.`;

  const user = `Title: ${post.title}
Summary: ${post.tldr || post.excerpt || post.title}
Category: ${post.category || "Shopify"}
Tags: ${(post.tags || []).join(", ")}`;

  const resp = await anthropic.messages.create({
    model: cfg.copyModel,
    max_tokens: 300,
    system,
    messages: [{ role: "user", content: user }],
  });

  let hook = (resp.content?.[0]?.text || "").trim().replace(/^["']+|["']+$/g, "").trim();
  if (!hook) throw new Error("Copy generation returned empty text.");

  // Hard guard: trim the hook until the whole post fits X's weighted 280 with margin.
  let text = `${hook}\n\n${url}`;
  while (tweetLength(text) > 276 && hook.length > 20) {
    hook = hook.slice(0, -6).replace(/[…\s]+$/, "") + "…";
    text = `${hook}\n\n${url}`;
  }
  return { text, hook, url, length: tweetLength(text) };
}

// ------------------------------------------------------------------- email
// Daily summary / failure alert via Resend (best-effort; never throws).
export async function sendSummary(results) {
  const posted = results.filter((r) => r.id);
  const errored = results.filter((r) => r.error);
  if (!posted.length && !errored.length) return;
  if (!cfg.resendKey || !cfg.summaryEmail) {
    console.log("(summary email skipped — RESEND_API_KEY / X_SUMMARY_EMAIL not set)");
    return;
  }
  const lines = [];
  for (const r of posted) lines.push(`✅ ${r.slug} → https://x.com/${cfg.handle}/status/${r.id}`);
  for (const r of errored) lines.push(`❌ ${r.slug} — ${r.error}`);
  const subject = errored.length
    ? `X auto-post: ${posted.length} posted, ${errored.length} error(s)`
    : `X auto-post: ${posted.length} posted`;
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(cfg.resendKey);
    await resend.emails.send({
      from: cfg.fromEmail,
      to: cfg.summaryEmail,
      subject,
      text: lines.join("\n") + "\n",
    });
  } catch (e) {
    console.error("(summary email failed:", e.message + ")");
  }
}
