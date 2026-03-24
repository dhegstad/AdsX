import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Redirect non-www to www for SEO consistency
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "adsx.com",
          },
        ],
        destination: "https://www.adsx.com/:path*",
        permanent: true,
      },
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
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default withBundleAnalyzer(nextConfig);
