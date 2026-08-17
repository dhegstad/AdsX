import { shopifyAffiliateHref } from "@/lib/affiliate";

// =============================================================================
// EMAIL CHROME — shared branded shell for outgoing lifecycle email.
//
// The welcome email lives here (sent synchronously by /api/subscribe). The
// multi-day nurture sequence lives in scripts/nurture-lib.mjs because it runs in
// a plain Node cron, not the Next server — the two intentionally share the same
// look (this shell) and the same compliant footer so the list reads as one voice.
// =============================================================================

// Land email CTAs on Shopify's guided free-trial flow while still setting the
// affiliate cookie; subId1 marks the click as email-sourced for attribution.
const FREE_TRIAL_DEEP_LINK = "https://www.shopify.com/free-trial";

// CAN-SPAM requires a real physical postal address in every commercial email.
// Set BUSINESS_POSTAL_ADDRESS before enabling the nurture drip (see setup doc).
export const BUSINESS_POSTAL_ADDRESS =
  process.env.BUSINESS_POSTAL_ADDRESS || "AdsX — update BUSINESS_POSTAL_ADDRESS";

const BRAND_GREEN = "#10b981";

export function siteUrl(): string {
  return (
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://www.adsx.com"
  ).replace(/\/+$/, "");
}

export function ctaButton(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:${BRAND_GREEN};color:#ffffff;font-weight:700;font-size:16px;text-decoration:none;padding:14px 28px;border-radius:8px;">${label} &rarr;</a>`;
}

export function shopifyEmailCTA(step: string): string {
  return shopifyAffiliateHref({
    slug: `email-${step}`,
    placement: "email",
    deepLink: FREE_TRIAL_DEEP_LINK,
  });
}

// Wrap body HTML in the branded shell: green header, white content card, and the
// compliant footer (postal address + one-click unsubscribe). `unsubUrl` is the
// per-subscriber tokenized link.
export function emailShell(opts: {
  heading: string;
  bodyHtml: string;
  unsubUrl: string;
  preheader?: string;
}): string {
  const { heading, bodyHtml, unsubUrl, preheader } = opts;
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
      <p style="margin:0 0 6px;">${BUSINESS_POSTAL_ADDRESS}</p>
      <p style="margin:0;"><a href="${unsubUrl}" style="color:#9ca3af;text-decoration:underline;">Unsubscribe</a> &middot; one click, no questions.</p>
    </div>
  </div>`;
}

export const AFFILIATE_DISCLOSURE_HTML = `<p style="font-size:12px;color:#9ca3af;margin:20px 0 0;">Some links are affiliate links — if you start a store through them we may earn a commission, at no extra cost to you.</p>`;

export interface BuiltEmail {
  subject: string;
  html: string;
  text: string;
}

export function buildWelcomeEmail(unsubUrl: string): BuiltEmail {
  const cta = shopifyEmailCTA("welcome");
  const subject = "Welcome — let's figure out if you should sell online";
  const bodyHtml = `
    <p style="margin:0 0 16px;">Thanks for signing up. Over the next couple of weeks I'll send you a short, no-fluff series on launching an online store — what to sell, what it actually costs, and the mistakes that sink most first stores.</p>
    <p style="margin:0 0 16px;">The single biggest decision is <strong>where</strong> you build. If you already know you want your own store (not a marketplace stall), the cleanest place to start is a free Shopify trial — no card required, then $1/month for your first 3 months.</p>
    <p style="margin:0 0 24px;">${ctaButton(cta, "Start a free store trial")}</p>
    <p style="margin:0;">Nothing to do today, though — the next email digs into whether your specific product is a good fit to sell online at all.</p>
    ${AFFILIATE_DISCLOSURE_HTML}
  `;
  const text = `Thanks for signing up.

Over the next couple of weeks I'll send you a short, no-fluff series on launching an online store — what to sell, what it actually costs, and the mistakes that sink most first stores.

The biggest decision is WHERE you build. If you want your own store, the cleanest start is a free Shopify trial — no card required, then $1/month for your first 3 months:
${cta}

The next email digs into whether your specific product is a good fit to sell online at all.

Some links are affiliate links — if you start a store through them we may earn a commission, at no extra cost to you.

Unsubscribe (one click): ${unsubUrl}
${BUSINESS_POSTAL_ADDRESS}`;

  return { subject, html: emailShell({ heading: "Welcome to AdsX", bodyHtml, unsubUrl, preheader: "Your no-fluff online-store starter series starts now." }), text };
}
