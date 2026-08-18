import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  async redirects() {
    // Redirect policy (re-triaged 2026-08-18 against the 2026-08-15 GSC pull).
    //
    // Rule: a 301/308 is only correct when the destination genuinely answers the
    // same intent as the source. Redirecting a removed page to the homepage or a
    // generic listing is scored by Google as a SOFT 404 — it neither passes
    // signal nor cleanly removes the URL. The July prune did exactly that for
    // ~1,350 URLs (13 whole programmatic sections -> "/" or "/blog"), and 812 of
    // them were still being crawled six weeks later for 32% of the site's total
    // impressions and ~0 clicks.
    //
    // So: the killed sections below are NOT redirected any more. They have no
    // route, so they 404 — the unambiguous removal signal. The only survivors
    // are URLs that still earn human clicks, each pointed at a live post on the
    // same intent (see KILLED SECTION SURVIVORS).
    return [
      // Slug change (2026-08-01): the 1MBB post was retitled/reslugged for
      // plain-language CTR. 308-redirect the old URL so ranking equity carries over.
      {
        source: "/blog/shopify-1mbb-120-day-free-trial-guide",
        destination: "/blog/shopify-120-day-free-trial-black-owned-businesses",
        permanent: true,
      },
      {
        source: "/tools/shopify-:niche-profit-calculator",
        destination: "/tools/roas-calculator",
        permanent: true,
      },

      // ── KILLED SECTION SURVIVORS ──────────────────────────────────────────
      // The 18 URLs from pruned programmatic sections that still earned human
      // clicks in the 90 days to 2026-08-15. Each goes to the live post that
      // answers the same question. Everything else in /glossary, /examples,
      // /sell, /start, /apps, /compare, /industries, /locations, /platforms,
      // /for, /migrate, /research and /ai-ads-for now 404 by design.
      { source: "/best/dtc-brand-growth-playbooks", destination: "/blog/dtc-brand-ai-visibility-playbook", permanent: true },
      { source: "/best/ai-visibility-tools", destination: "/blog/ai-tools-shopify-store-optimization", permanent: true },
      { source: "/best/shopify-ad-platforms", destination: "/blog/reallocating-budget-between-meta-and-google", permanent: true },
      { source: "/glossary/ai-attribution", destination: "/blog/first-vs-last-click-attribution-budget-impact", permanent: true },
      { source: "/glossary/ai-price-comparison", destination: "/blog/ai-shopping-assistants-comparison-ecommerce", permanent: true },
      { source: "/glossary/prompt-optimization", destination: "/blog/shopify-ai-visibility-complete-guide", permanent: true },
      { source: "/glossary/sponsored-ai-results", destination: "/blog/chatgpt-product-feed-shopping-ads-setup-guide", permanent: true },
      { source: "/glossary/ai-first-marketing", destination: "/blog/shopify-ai-visibility-complete-guide", permanent: true },
      { source: "/glossary/ai-commerce-protocol", destination: "/blog/agentic-checkout-optimization-shopify", permanent: true },
      { source: "/sell/3d-printed-items", destination: "/blog/shopify-for-handmade-crafts", permanent: true },
      { source: "/sell/miniature-paintings", destination: "/blog/shopify-for-posters-art-prints", permanent: true },
      { source: "/sell/custom-tumblers", destination: "/blog/shopify-for-custom-personalized-products", permanent: true },
      { source: "/start/niche-vinyl-records", destination: "/blog/shopify-for-music-merchandise", permanent: true },
      { source: "/start/luxury-chocolate-brand", destination: "/blog/shopify-for-specialty-foods", permanent: true },
      { source: "/start/vintage-reseller", destination: "/blog/start-vintage-thrift-store-shopify", permanent: true },
      { source: "/examples/casper", destination: "/blog/dtc-brand-ai-visibility-playbook", permanent: true },
      { source: "/examples/peloton", destination: "/blog/dtc-brand-ai-visibility-playbook", permanent: true },
      { source: "/ai-ads-for/womens-shoes", destination: "/blog/product-catalog-ad-performance-lever", permanent: true },
    ];
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@anthropic-ai/sdk", "openai"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache images for 1 year (static assets)
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "api.star-history.com",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default withBundleAnalyzer(nextConfig);
