// Impact (impact.com / Impact Radius) tracked link for the Shopify affiliate
// program. The bare link drops the reader on Shopify's default signup surface;
// append ?u=<encoded URL> to deep-link anywhere on shopify.com while still
// setting the affiliate cookie.
export const SHOPIFY_AFFILIATE_LINK =
  "https://shopify.pxf.io/c/6318547/3797171/13624";

const SHOPIFY_MARKETING_HOST = /^(www\.)?shopify\.com$/;

// Where on the page an affiliate click originated. Reported to Impact as subId2
// and to GA4 as `placement`, so we can compare which CTA slots actually convert.
export type AffiliatePlacement =
  | "inline" // a link inside the article body
  | "cta-top" // the compact CTA above the fold
  | "cta-mid" // the decision-stage box mid-article
  | "cta-footer"; // the decision-stage box that closes every post

export function isAffiliateUrl(href: string): boolean {
  try {
    return new URL(href).hostname.endsWith("pxf.io");
  } catch {
    return false;
  }
}

interface AffiliateTagOptions {
  /** The post the click came from — reported to Impact as subId1. */
  slug?: string;
  /** Where on the page the click came from — reported to Impact as subId2. */
  placement?: AffiliatePlacement;
}

// Impact sub-IDs accept letters, digits, and . _ - and cap at 64 chars. Post
// slugs already fit; this just guards against odd frontmatter values.
function sanitizeSubId(value: string): string {
  return value
    .replace(/[^A-Za-z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

// Attach per-post (subId1) and per-placement (subId2) reporting to an Impact
// link, without overwriting a value an author already set by hand. Both surface
// in Impact's Sub ID report, turning one undifferentiated click stream into
// per-post, per-placement attribution.
function tagImpactLink(url: URL, opts?: AffiliateTagOptions): string {
  if (opts?.slug && !url.searchParams.has("subId1")) {
    url.searchParams.set("subId1", sanitizeSubId(opts.slug));
  }
  if (opts?.placement && !url.searchParams.has("subId2")) {
    url.searchParams.set("subId2", opts.placement);
  }
  return url.toString();
}

// Build a fresh tracked Shopify signup link for a CTA button. `deepLink` lands
// the reader on a specific shopify.com page (e.g. the free-trial flow) while
// still setting the affiliate cookie; omit it for Impact's default surface.
export function shopifyAffiliateHref(
  opts?: AffiliateTagOptions & { deepLink?: string },
): string {
  const url = new URL(SHOPIFY_AFFILIATE_LINK);
  if (opts?.deepLink) url.searchParams.set("u", opts.deepLink);
  return tagImpactLink(url, opts);
}

// Rewrite an outbound link found in post markdown so every Shopify link is
// tracked and attributed:
//   • bare shopify.com        → the Impact link, deep-linked back to the
//                               original destination
//   • an existing Impact link → the same link with subId reporting attached
//   • anything else           → returned untouched
// Most posts hard-code the Impact link directly, so the second case is what
// finally gives those previously-untagged links per-post attribution.
export function withShopifyAffiliate(
  href: string,
  opts?: AffiliateTagOptions,
): string {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return href;
  }
  if (SHOPIFY_MARKETING_HOST.test(url.hostname)) {
    const isRoot = url.pathname === "" || url.pathname === "/";
    return shopifyAffiliateHref({ ...opts, deepLink: isRoot ? undefined : href });
  }
  if (url.hostname.endsWith("pxf.io")) {
    return tagImpactLink(url, opts);
  }
  return href;
}

// Client-only: report an affiliate click to GA4 so click-through can be measured
// per post and per placement alongside Impact's bounty data. No-op on the server
// or before gtag has loaded.
export function trackAffiliateClick(opts?: AffiliateTagOptions): void {
  if (typeof window === "undefined") return;
  const gtag = (
    window as unknown as { gtag?: (...args: unknown[]) => void }
  ).gtag;
  gtag?.("event", "affiliate_click", {
    post_slug: opts?.slug ?? "(unknown)",
    placement: opts?.placement ?? "inline",
  });
}
