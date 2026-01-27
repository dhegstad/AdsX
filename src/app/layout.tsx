import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "AdsX - Advertising for the AI Search Era",
    template: "%s | AdsX",
  },
  description: "Get your brand recommended by ChatGPT, Claude, Perplexity & more. The first agency built for AI search advertising.",
  keywords: ["AI advertising", "ChatGPT ads", "AI search", "Perplexity ads", "Claude", "Gemini", "AI marketing", "LLM advertising"],
  authors: [{ name: "AdsX" }],
  creator: "AdsX",
  metadataBase: new URL("https://adsx.agency"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adsx.agency",
    siteName: "AdsX",
    title: "AdsX - Advertising for the AI Search Era",
    description: "Get your brand recommended by ChatGPT, Claude, Perplexity & more. The first agency built for AI search advertising.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdsX - Advertising for the AI Search Era",
    description: "Get your brand recommended by ChatGPT, Claude, Perplexity & more.",
    creator: "@adsx",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
