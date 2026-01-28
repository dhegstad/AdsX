import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "AdsX is the first advertising agency built for AI search. Learn about our mission to help brands capture visibility in ChatGPT, Claude, Perplexity, and other AI platforms.",
  alternates: {
    canonical: "https://adsx.com/about",
  },
  openGraph: {
    title: "About AdsX - AI Search Advertising Agency",
    description: "Learn about our mission to help brands capture visibility in the AI search era.",
    url: "https://adsx.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
