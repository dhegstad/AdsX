import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  subscribe,
  markWelcomed,
  isDbConfigured,
} from "@/lib/subscribers";
import { buildWelcomeEmail, siteUrl } from "@/lib/email";

// Real email capture for the online-store starter series. Writes to Neon and
// fires a welcome email via Resend. Degrades cleanly: no DB → 503 the client can
// show; no Resend key → subscriber is still stored, welcome is logged not sent.

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface Body {
  email?: string;
  source?: string;
  company?: string; // honeypot — real users never see or fill this
}

// Best-effort per-IP throttle. This endpoint sends an email per new address, so
// it's an email-bombing vector; the honeypot stops dumb bots and this caps the
// blast radius of a determined one. In-memory only — under Fluid Compute
// instances are reused across requests, so it catches the common single-source
// flood without any new infra. Not a substitute for a real WAF rule at scale.
const RATE_LIMIT = 6; // requests
const RATE_WINDOW_MS = 10 * 60 * 1000; // per 10 min per IP
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    // Bound memory: drop the oldest-keyed entries occasionally.
    for (const k of hits.keys()) {
      hits.delete(k);
      if (hits.size <= 2500) break;
    }
  }
  return recent.length > RATE_LIMIT;
}

function clientIp(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0].trim() || "unknown").slice(0, 64);
}

export async function POST(request: NextRequest) {
  let data: Body;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success, do nothing.
  if (data.company && data.company.trim() !== "") {
    return NextResponse.json({ success: true, outcome: "exists" });
  }

  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { success: false, error: "rate_limited", message: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  if (!isDbConfigured()) {
    return NextResponse.json(
      { success: false, error: "not_configured", message: "Email list is not configured yet." },
      { status: 503 },
    );
  }

  const result = await subscribe({ email: data.email ?? "", source: data.source });

  if (!result.ok) {
    if (result.error === "invalid_email") {
      return NextResponse.json(
        { success: false, error: "invalid_email", message: "Please enter a valid email address." },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, error: result.error, message: "Something went wrong. Please try again." },
      { status: 503 },
    );
  }

  // Only welcome brand-new / reactivated subscribers — never re-welcome an
  // already-active email (idempotent double-submits, resubscribe clicks).
  if (result.outcome !== "exists") {
    const unsubUrl = `${siteUrl()}/api/unsubscribe?token=${result.token}`;
    const welcome = buildWelcomeEmail(unsubUrl);
    const fromEmail = process.env.FROM_EMAIL || "hello@adsx.com";
    const email = (data.email ?? "").trim().toLowerCase();

    if (resend) {
      try {
        await resend.emails.send({
          from: `AdsX <${fromEmail}>`,
          to: email,
          subject: welcome.subject,
          html: welcome.html,
          text: welcome.text,
          headers: {
            // RFC 8058 one-click unsubscribe — improves inbox placement.
            "List-Unsubscribe": `<${unsubUrl}>`,
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
          },
        });
        await markWelcomed(email);
      } catch (err) {
        // Subscriber is saved; the nightly drip will still reach them. Don't
        // fail the request over a transient send error.
        console.error("welcome email send failed:", err);
      }
    } else {
      console.log("Subscribe (Resend not configured), welcome not sent:", email);
    }
  }

  return NextResponse.json({ success: true, outcome: result.outcome });
}
