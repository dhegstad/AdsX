import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Real results from AI search advertising campaigns. See how we've helped SaaS, e-commerce, and fintech brands increase AI visibility by 340%+.",
  alternates: {
    canonical: "https://adsx.com/case-studies",
  },
  openGraph: {
    title: "Case Studies | AdsX - AI Search Advertising Results",
    description: "Real results from AI search advertising. 340% avg increase in AI mentions.",
    url: "https://adsx.com/case-studies",
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
