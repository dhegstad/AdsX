import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Visibility for Fintech Companies",
  description: "Get your fintech recommended by ChatGPT, Claude, and Perplexity. We help financial technology companies build trust and capture enterprise leads through AI recommendations.",
  alternates: {
    canonical: "https://adsx.com/industries/fintech",
  },
  openGraph: {
    title: "AI Visibility for Fintech | AdsX",
    description: "Get your fintech recommended by AI advisors. 156% more enterprise leads for fintech companies through AI visibility.",
    url: "https://adsx.com/industries/fintech",
  },
};

export default function FintechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
