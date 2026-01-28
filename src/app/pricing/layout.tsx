import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent pricing for AI search advertising services. Choose from Starter, Growth, or Enterprise plans to match your brand's growth stage.",
  alternates: {
    canonical: "https://adsx.com/pricing",
  },
  openGraph: {
    title: "Pricing | AdsX - AI Search Advertising",
    description: "Transparent pricing for AI search advertising. Plans starting at $5,000/month.",
    url: "https://adsx.com/pricing",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
