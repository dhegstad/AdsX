import { randomUUID } from "node:crypto";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

// =============================================================================
// EMAIL SUBSCRIBERS — the real capture that replaces the decorative /blog box.
//
// Why this exists: the Shopify affiliate trial-to-paid window is up to 400 days,
// so email is the "second bite" at every visitor who researches today but opens
// a store months later. State lives in Neon (DATABASE_URL, already used by
// better-auth + the X poster); the nightly nurture drip (scripts/nurture-*.mjs)
// reads the same table. Single opt-in with a clear welcome email + one-click
// unsubscribe (CAN-SPAM). No new infra — reuses Neon + Resend.
// =============================================================================

export interface Subscriber {
  id: number;
  email: string;
  status: "active" | "unsubscribed" | "bounced";
  source: string | null;
  nurture_step: number;
  unsub_token: string;
}

export type SubscribeResult =
  | { ok: true; outcome: "created" | "reactivated"; token: string }
  | { ok: true; outcome: "exists"; token: string }
  | { ok: false; error: "invalid_email" | "not_configured" | "db_error" };

// Neon's HTTP driver — one-shot queries, works in serverless functions. Lazy so
// importing this module never throws when DATABASE_URL is absent (e.g. a preview
// build); callers get a clean not_configured result instead.
let _sql: NeonQueryFunction<false, false> | null = null;
function getSql(): NeonQueryFunction<false, false> | null {
  if (_sql) return _sql;
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  // A Postgres URL never contains literal whitespace; strip any that crept in
  // from a pasted/line-wrapped secret (neon() puts the string in an HTTP header,
  // where a stray newline throws "invalid header value").
  _sql = neon(url.replace(/\s+/g, ""));
  return _sql;
}

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(raw: string): string | null {
  const email = raw.trim().toLowerCase();
  if (email.length > 254 || !EMAIL_RE.test(email)) return null;
  return email;
}

// Create the table on first use. IF NOT EXISTS makes this safe to call on every
// request; the partial index keeps the nightly "who's due" scan cheap.
let _ensured = false;
async function ensureTable(sql: NeonQueryFunction<false, false>): Promise<void> {
  if (_ensured) return;
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
  _ensured = true;
}

// Single opt-in upsert. A brand-new email or one that had unsubscribed and came
// back gets outcome !== "exists" so the caller knows to send the welcome email;
// an already-active email is a no-op (never re-welcome / re-drip a live sub).
export async function subscribe(input: {
  email: string;
  source?: string | null;
}): Promise<SubscribeResult> {
  const email = normalizeEmail(input.email);
  if (!email) return { ok: false, error: "invalid_email" };

  const sql = getSql();
  if (!sql) return { ok: false, error: "not_configured" };

  const source = (input.source ?? "").toString().slice(0, 200) || null;

  try {
    await ensureTable(sql);
    const existing = (await sql`
      SELECT id, status, unsub_token FROM email_subscribers WHERE email = ${email}
    `) as { id: number; status: string; unsub_token: string }[];

    if (existing.length === 0) {
      const token = randomUUID();
      await sql`INSERT INTO email_subscribers (email, source, unsub_token)
        VALUES (${email}, ${source}, ${token})`;
      return { ok: true, outcome: "created", token };
    }

    const row = existing[0];
    if (row.status === "active") {
      // Already on the list — idempotent, don't resend anything.
      return { ok: true, outcome: "exists", token: row.unsub_token };
    }

    // Was unsubscribed/bounced and is opting back in. Reactivate and restart the
    // sequence so they get the welcome + full drip again.
    await sql`UPDATE email_subscribers
      SET status = 'active', nurture_step = 0, welcomed_at = NULL,
          source = COALESCE(${source}, source), updated_at = now()
      WHERE id = ${row.id}`;
    return { ok: true, outcome: "reactivated", token: row.unsub_token };
  } catch (err) {
    console.error("subscribe() db error:", err);
    return { ok: false, error: "db_error" };
  }
}

// Mark the welcome email as sent so the drip doesn't fire on top of it too soon.
export async function markWelcomed(email: string): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  try {
    await sql`UPDATE email_subscribers
      SET welcomed_at = now(), last_sent_at = now(), updated_at = now()
      WHERE email = ${email} AND welcomed_at IS NULL`;
  } catch (err) {
    console.error("markWelcomed() db error:", err);
  }
}

// One-click unsubscribe (CAN-SPAM). Idempotent: an unknown/already-off token
// still resolves cleanly so the confirmation page never leaks list membership.
export async function unsubscribeByToken(token: string): Promise<boolean> {
  const sql = getSql();
  if (!sql) return false;
  const clean = (token || "").trim();
  if (!clean) return false;
  try {
    await ensureTable(sql);
    const rows = (await sql`UPDATE email_subscribers
      SET status = 'unsubscribed', updated_at = now()
      WHERE unsub_token = ${clean} AND status <> 'unsubscribed'
      RETURNING id`) as { id: number }[];
    return rows.length > 0;
  } catch (err) {
    console.error("unsubscribeByToken() db error:", err);
    return false;
  }
}
