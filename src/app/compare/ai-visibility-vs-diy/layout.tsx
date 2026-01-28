import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AdsX vs DIY: Should You Build AI Visibility In-House?",
  description: "Compare working with AdsX to building AI visibility capabilities in-house. Honest analysis of time, costs, and results for each approach.",
  alternates: {
    canonical: "https://adsx.com/compare/ai-visibility-vs-diy",
  },
  openGraph: {
    title: "AdsX vs DIY | AdsX",
    description: "DIY can work, but is it the best use of your time? Honest comparison of professional help vs going solo.",
    url: "https://adsx.com/compare/ai-visibility-vs-diy",
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
