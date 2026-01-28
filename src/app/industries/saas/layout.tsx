import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Visibility for SaaS Companies",
  description: "Get your SaaS recommended by ChatGPT, Claude, and Perplexity. We help B2B software companies dominate AI search recommendations and capture high-intent buyers.",
  alternates: {
    canonical: "https://adsx.com/industries/saas",
  },
  openGraph: {
    title: "AI Visibility for SaaS | AdsX",
    description: "Get your SaaS recommended by AI assistants. 340% avg increase in AI mentions for B2B software companies.",
    url: "https://adsx.com/industries/saas",
  },
};

export default function SaaSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
