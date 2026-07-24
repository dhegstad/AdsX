// Impact (Impact Radius) tracked link for the Shopify affiliate program.
// Landing page defaults to the Shopify signup surface; append ?u=<encoded URL>
// to deep-link anywhere on shopify.com while still setting the 30-day cookie.
export const SHOPIFY_AFFILIATE_LINK =
  "https://shopify.pxf.io/c/6318547/3797171/13624";

const SHOPIFY_MARKETING_HOST = /^(www\.)?shopify\.com$/;

export function isAffiliateUrl(href: string): boolean {
  try {
    return new URL(href).hostname.endsWith("pxf.io");
  } catch {
    return false;
  }
}

// Every outbound link to the Shopify marketing site must carry affiliate
// tracking — bare shopify.com hrefs are rewritten to the Impact tracked link,
// deep-linking (?u=) to the original destination so the reader still lands on
// the intended page. Subdomains (apps., help., shopify.dev, cdn., …) are left
// untouched: they aren't signup surfaces and Impact deep links only cover the
// marketing site.
export function withShopifyAffiliate(href: string): string {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return href;
  }
  if (!SHOPIFY_MARKETING_HOST.test(url.hostname)) return href;
  if (url.pathname === "" || url.pathname === "/") return SHOPIFY_AFFILIATE_LINK;
  return `${SHOPIFY_AFFILIATE_LINK}?u=${encodeURIComponent(href)}`;
}
