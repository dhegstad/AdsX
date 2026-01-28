import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Visibility vs PR Agencies: Which Drives Results?",
  description: "Compare AI visibility optimization to PR agencies. See how costs, ROI, and results compare for driving business growth and brand awareness.",
  alternates: {
    canonical: "https://adsx.com/compare/ai-visibility-vs-pr",
  },
  openGraph: {
    title: "AI Visibility vs PR | AdsX",
    description: "PR builds awareness. AI visibility drives purchase consideration. See how they compare for real business results.",
    url: "https://adsx.com/compare/ai-visibility-vs-pr",
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
