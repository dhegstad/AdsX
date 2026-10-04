// Copied from Dennis's enrolled Whop Partners dashboard on October 4, 2026.
// Keep documentation and other editorial source URLs direct. Only this owned
// signup URL is a Whop referral; do not guess referral parameters for other URLs.
export const WHOP_REFERRAL_URL = "https://whop.com/start/?code=YDMPYR";

export function isWhopReferralUrl(href: string): boolean {
  try {
    const url = new URL(href);
    return url.protocol === "https:" && url.hostname === "whop.com" &&
      !url.username && !url.password && /^\/start\/?$/.test(url.pathname) &&
      url.searchParams.getAll("code").length === 1 &&
      url.searchParams.get("code") === "YDMPYR";
  } catch {
    return false;
  }
}

export function trackWhopReferralClick(slug: string): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  // A click event is not proof of an attributed business or earned commission.
  // A separate event keeps existing Shopify-only affiliate reports comparable.
  gtag?.("event", "whop_referral_click", {
    provider: "whop",
    post_slug: slug,
    placement: "inline",
  });
}
