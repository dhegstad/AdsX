import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider, ThemeScript } from "@/context/theme-context";
import { Analytics } from "@/components/analytics";
import { brutalFontVariables } from "@/lib/fonts";
import {
  createOrganizationSchema,
  createWebsiteSchema,
  SchemaScript,
} from "@/lib/seo/schemas";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "AdsX — Shopify Apps, Ecommerce & Advertising",
    template: "%s | AdsX",
  },
  icons: {
    icon: [
      { url: '/icon', type: 'image/png', sizes: '48x48' },
      { url: '/icon-48', type: 'image/png', sizes: '48x48' },
      { url: '/icon-96', type: 'image/png', sizes: '96x96' },
      { url: '/icon-144', type: 'image/png', sizes: '144x144' },
      { url: '/icon-192', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
  },
  description: "Guides to Shopify apps, starting a store, ecommerce, advertising, and AI. Compare tools and platforms and make informed decisions for your business.",
  keywords: [
    "start a shopify store",
    "how to start shopify",
    "shopify free trial",
    "shopify $1 a month",
    "shopify pricing",
    "is shopify right for me",
    "shopify plans",
    "sell on shopify",
    "shopify for beginners",
    "shopify product catalog api",
    "shopify store setup",
    "ecommerce",
  ],
  authors: [{ name: "AdsX" }],
  creator: "AdsX",
  publisher: "AdsX",
  metadataBase: new URL("https://www.adsx.com"),
  alternates: {
    canonical: "https://www.adsx.com",
    types: {
      "application/rss+xml": "https://www.adsx.com/feed.xml",
      "text/plain": "https://www.adsx.com/llms.txt",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.adsx.com",
    siteName: "AdsX",
    title: "AdsX — Shopify, Ecommerce & Advertising",
    description: "Guides to Shopify apps, starting a store, ecommerce, advertising, and AI. Compare tools and platforms and make informed decisions for your business.",
    images: [
      {
        url: "https://www.adsx.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AdsX — Start and grow your Shopify store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AdsX — Shopify, Ecommerce & Advertising",
    description: "Guides to Shopify apps, starting a store, ecommerce, advertising, and AI. Compare tools and platforms and make informed decisions for your business.",
    creator: "@adsx",
    site: "@adsx",
    images: ["https://www.adsx.com/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <Analytics />
        <ThemeScript />
        <SchemaScript schema={createOrganizationSchema()} />
        <SchemaScript schema={createWebsiteSchema()} />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${brutalFontVariables} font-sans antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
