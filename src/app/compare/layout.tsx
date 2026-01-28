import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | AdsX Comparisons",
    default: "Compare AI Visibility to Other Marketing Approaches",
  },
  description: "Compare AI visibility optimization to SEO, PR, and DIY approaches. Make informed decisions about where to invest your marketing resources.",
  alternates: {
    canonical: "https://adsx.com/compare",
  },
  openGraph: {
    title: "Compare AI Visibility | AdsX",
    description: "How does AI visibility compare to SEO, PR, and doing it yourself? Find out.",
    url: "https://adsx.com/compare",
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
