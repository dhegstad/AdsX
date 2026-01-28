import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Full-stack AI search advertising services including ChatGPT ads, AI visibility optimization, content strategy for LLMs, and performance analytics.",
  alternates: {
    canonical: "https://adsx.com/services",
  },
  openGraph: {
    title: "AI Search Advertising Services | AdsX",
    description: "ChatGPT ads, AI visibility optimization, content strategy, and performance analytics for the AI search era.",
    url: "https://adsx.com/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
