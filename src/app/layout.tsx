import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider, ThemeScript } from "@/context/theme-context";
import { Analytics } from "@/components/analytics";
import { brutalFontVariables } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "AdsX - AI Search Advertising Agency | ChatGPT, Gemini, Claude, Perplexity Ads",
    template: "%s | AdsX - AI Search Advertising",
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
  description: "The first advertising agency built for AI search. Get your brand recommended by ChatGPT, Claude, Perplexity, Gemini & Grok. 340% avg increase in AI mentions. Book your free visibility audit.",
  keywords: [
    "AI advertising",
    "AI search advertising",
    "ChatGPT ads",
    "ChatGPT advertising",
    "ChatGPT sponsored placements",
    "AI search optimization",
    "Google Gemini ads",
    "Google Gemini advertising",
    "Gemini AI marketing",
    "Perplexity ads",
    "Perplexity advertising",
    "Claude AI advertising",
    "Grok advertising",
    "LLM advertising",
    "LLM marketing",
    "AI visibility",
    "AI brand mentions",
    "AI SEO",
    "generative AI advertising",
    "conversational AI ads",
    "AI search agency",
    "AI marketing agency",
  ],
  authors: [{ name: "AdsX" }],
  creator: "AdsX",
  publisher: "AdsX",
  metadataBase: new URL("https://www.adsx.com"),
  alternates: {
    canonical: "https://www.adsx.com",
    types: {
      "application/rss+xml": "https://www.adsx.com/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.adsx.com",
    siteName: "AdsX",
    title: "AdsX - AI Search Advertising Agency | ChatGPT, Gemini, Claude Ads",
    description: "The first advertising agency built for AI search. 340% avg increase in AI mentions. Get your brand recommended by ChatGPT, Gemini, Claude, Perplexity & more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdsX - AI Search Advertising | ChatGPT, Gemini, Claude Ads",
    description: "Get your brand recommended by ChatGPT, Gemini, Claude, Perplexity & more. 340% avg increase in AI mentions.",
    creator: "@adsx",
    site: "@adsx",
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
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${brutalFontVariables} font-sans antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
