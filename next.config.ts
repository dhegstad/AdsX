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
