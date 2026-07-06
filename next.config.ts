import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // NOTE: No apex (adsx.com) -> www redirect. Google AdSense only accepts
      // the bare top-level domain (adsx.com) and its verification crawler does
      // NOT follow redirects, so the apex must serve content directly (HTTP 200).
      // www remains canonical via the canonical/og tags + metadataBase, so SEO
      // consolidation is preserved without a redirect. (The matching Vercel
      // domain-level redirect on adsx.com was also removed.)

      // Legacy site redirects — old HTML/PDF/HTM pages from previous adsx.com site
      // Exact matches for known legacy paths
      {
        source: "/content",
        destination: "/",
        permanent: true,
      },
      {
        source: "/content/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/prodservpart",
        destination: "/",
        permanent: true,
      },
      {
        source: "/prodservpart/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pressreleasses",
        destination: "/",
        permanent: true,
      },
      // Catch-all for legacy file extensions at any path depth
      {
        source: "/:path*.htm",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:path*.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:path*.thm",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:path*.pdf",
        destination: "/",
        permanent: true,
      },
      // 2026-07 indexation-recovery prune: entire programmatic sections removed
      // (~490 URLs with ~10 total human clicks in 6 months, per the Jul 5 GSC
      // export). :path* also matches the bare section index. Pruned blog posts
      // (867) redirect via src/lib/seo/pruned-slugs.ts in the [slug] route.
      { source: "/compare/:path*", destination: "/", permanent: true },
      { source: "/industries/:path*", destination: "/", permanent: true },
      { source: "/locations/:path*", destination: "/", permanent: true },
      { source: "/for/:path*", destination: "/", permanent: true },
      { source: "/platforms/:path*", destination: "/", permanent: true },
      { source: "/glossary/:path*", destination: "/blog", permanent: true },
      { source: "/examples/:path*", destination: "/blog", permanent: true },
      { source: "/sell/:path*", destination: "/blog", permanent: true },
      { source: "/research/:path*", destination: "/blog", permanent: true },
      { source: "/start/:path*", destination: "/blog", permanent: true },
      { source: "/apps/:path*", destination: "/blog", permanent: true },
      { source: "/migrate/:path*", destination: "/blog", permanent: true },
      { source: "/ai-ads-for/:path*", destination: "/shopify-ai-ads-agency", permanent: true },
      { source: "/tools/shopify-:niche-profit-calculator", destination: "/tools/roas-calculator", permanent: true },
      // /best curated lists: all killed except ai-visibility-courses (7 clicks),
      // so each dead slug is listed explicitly (a :slug pattern would also
      // capture the kept page).
      {
        source: "/best/ai-visibility-tools",
        destination: "/best/ai-visibility-courses",
        permanent: true,
      },
      {
        source: "/best/ai-optimization-agencies",
        destination: "/best/ai-visibility-courses",
        permanent: true,
      },
      {
        source: "/best/ai-content-optimization-practices",
        destination: "/best/ai-visibility-courses",
        permanent: true,
      },
      {
        source: "/best/brand-monitoring-for-ai",
        destination: "/best/ai-visibility-courses",
        permanent: true,
      },
      {
        source: "/best/ecommerce-ai-visibility",
        destination: "/best/ai-visibility-courses",
        permanent: true,
      },
      {
        source: "/best/saas-ai-visibility",
        destination: "/best/ai-visibility-courses",
        permanent: true,
      },
      {
        source: "/best/local-business-ai-visibility",
        destination: "/best/ai-visibility-courses",
        permanent: true,
      },
      {
        source: "/best/ai-visibility-books",
        destination: "/best/ai-visibility-courses",
        permanent: true,
      },
      {
        source: "/best/ai-visibility-metrics",
        destination: "/best/ai-visibility-courses",
        permanent: true,
      },
      {
        source: "/best/ai-visibility-mistakes",
        destination: "/best/ai-visibility-courses",
        permanent: true,
      },
      {
        source: "/best/ai-visibility-roadmap",
        destination: "/best/ai-visibility-courses",
        permanent: true,
      },
      {
        source: "/best/ai-visibility-case-studies",
        destination: "/best/ai-visibility-courses",
        permanent: true,
      },
      {
        source: "/best/ai-visibility-checklist",
        destination: "/best/ai-visibility-courses",
        permanent: true,
      },
      {
        source: "/best/shopify-ai-visibility-apps",
        destination: "/best/ai-visibility-courses",
        permanent: true,
      },
      {
        source: "/best/shopify-ad-platforms",
        destination: "/best/ai-visibility-courses",
        permanent: true,
      },
      {
        source: "/best/ecommerce-ai-marketing-strategies",
        destination: "/best/ai-visibility-courses",
        permanent: true,
      },
      {
        source: "/best/shopify-conversion-tools",
        destination: "/best/ai-visibility-courses",
        permanent: true,
      },
      {
        source: "/best/dtc-brand-growth-playbooks",
        destination: "/best/ai-visibility-courses",
        permanent: true,
      },
      // Blog consolidation: unpublished a duplicate agentic-commerce thesis post
      // that overlapped the existing complete guide. 301 so any crawled/shared
      // URL lands on the canonical post instead of 404ing.
      {
        source: "/blog/ai-unbundling-shopify-storefront-builders-buyers",
        destination: "/blog",
        permanent: true,
      },
      // Duplicate-post consolidation (2026-06): each pair below competed for the
      // same query and split authority. We kept the more comprehensive URL and
      // 301 the thinner near-duplicate into it.
      {
        source: "/blog/shopify-free-trial-guide",
        destination: "/blog/shopify-free-trial-2026-complete-guide",
        permanent: true,
      },
      {
        source: "/blog/shopify-sms-marketing-complete-guide",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/shopify-vs-bigcommerce-2026-comparison",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/shopify-vs-ecwid-2026",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/shopify-vs-woocommerce-2026-comparison",
        destination: "/blog",
        permanent: true,
      },
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
