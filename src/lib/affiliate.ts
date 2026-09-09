// AdsX's Impact link for the Shopify affiliate program. Keep the publisher,
// asset and campaign IDs together; changing these can change who gets credit.
export const SHOPIFY_AFFILIATE_LINK =
  "https://shopify.pxf.io/c/6318547/3797171/13624";
export const SHOPIFY_FREE_TRIAL_URL = "https://www.shopify.com/free-trial";

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
    const url = new URL(href);
    return /^https?:$/.test(url.protocol) && url.hostname === "shopify.pxf.io";
  } catch {
    return false;
  }
}

export interface AffiliateTagOptions {
  /** The post the click came from — reported to Impact as subId1. */
  slug: string;
  /** Where on the page the click came from — reported to Impact as subId2. */
  placement: AffiliatePlacement;
}

// Impact allows 255-character sub-IDs. Use URL-safe page slugs without cutting
// longer titles down to 64 characters and losing their reporting identity.
function sanitizeSubId(value: string): string {
  return value
    .replace(/[^A-Za-z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 255);
}

// The host page owns its source tags, even when an editor copies a previously
// tagged link. Preserve brand metadata and all other reporting parameters.
function tagImpactLink(url: URL, opts: AffiliateTagOptions): string {
  for (const key of [...url.searchParams.keys()]) {
    if (/^subid[12]$/i.test(key)) url.searchParams.delete(key);
  }
  url.searchParams.set("subId1", sanitizeSubId(opts.slug));
  url.searchParams.set("subId2", opts.placement);
  return url.toString();
}

function shopifyDestination(href: string): string {
  const url = new URL(href);
  if (!/^https?:$/.test(url.protocol) || !SHOPIFY_MARKETING_HOST.test(url.hostname) || url.username || url.password) {
    throw new TypeError("Affiliate destinations must be Shopify marketing pages.");
  }
  url.protocol = "https:";
  return url.toString();
}

// Signup links explicitly select the free-trial page, so an asset's future
// default landing-page change cannot silently change our signup CTAs.
export function shopifyAffiliateHref(
  opts: AffiliateTagOptions & { deepLink?: string },
): string {
  const url = new URL(SHOPIFY_AFFILIATE_LINK);
  url.searchParams.set("u", shopifyDestination(opts.deepLink || SHOPIFY_FREE_TRIAL_URL));
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
  opts: AffiliateTagOptions,
): string {
  let url: URL;
  try {
    url = new URL(href.startsWith("//") ? `https:${href}` : href);
  } catch {
    return href;
  }
  if (!/^https?:$/.test(url.protocol)) return href;
  if (SHOPIFY_MARKETING_HOST.test(url.hostname)) {
    // 1MBB has its own enrollment route and offer. A standard affiliate link
    // must not imply that it activates this restricted program.
    if (/^\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?1mbb(?:\/|$)/i.test(url.pathname)) {
      return href;
    }
    const isRoot = url.pathname === "/" && !url.search && !url.hash;
    return shopifyAffiliateHref({ ...opts, deepLink: isRoot ? undefined : url.toString() });
  }
  if (url.hostname === "shopify.pxf.io") {
    url.protocol = "https:";
    url.searchParams.set("u", shopifyDestination(url.searchParams.get("u") || SHOPIFY_FREE_TRIAL_URL));
    return tagImpactLink(url, opts);
  }
  return href;
}

// Client-only: report an affiliate click to GA4 so click-through can be measured
// per post and per placement alongside Impact's bounty data. No-op on the server
// or before gtag has loaded.
export function trackAffiliateClick(opts: AffiliateTagOptions): void {
  if (typeof window === "undefined") return;
  const gtag = (
    window as unknown as { gtag?: (...args: unknown[]) => void }
  ).gtag;
  gtag?.("event", "affiliate_click", {
    post_slug: opts.slug,
    placement: opts.placement,
  });
}
