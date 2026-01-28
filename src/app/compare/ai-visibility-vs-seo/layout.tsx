import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Visibility vs SEO: What's the Difference?",
  description: "Compare AI visibility optimization to traditional SEO. Learn why you need both strategies and how they work together to capture modern search traffic.",
  alternates: {
    canonical: "https://adsx.com/compare/ai-visibility-vs-seo",
  },
  openGraph: {
    title: "AI Visibility vs SEO | AdsX",
    description: "SEO gets you ranked on Google. AI visibility gets you recommended by ChatGPT. Here's why you need both.",
    url: "https://adsx.com/compare/ai-visibility-vs-seo",
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
