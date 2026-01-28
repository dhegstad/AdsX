import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Visibility for E-commerce Brands",
  description: "Get your products recommended by ChatGPT, Claude, and Perplexity. We help e-commerce and DTC brands capture AI-driven product discovery and drive revenue.",
  alternates: {
    canonical: "https://adsx.com/industries/ecommerce",
  },
  openGraph: {
    title: "AI Visibility for E-commerce | AdsX",
    description: "Get your products recommended by AI shopping assistants. $2.1M+ revenue driven from AI referrals for e-commerce brands.",
    url: "https://adsx.com/industries/ecommerce",
  },
};

export default function EcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
