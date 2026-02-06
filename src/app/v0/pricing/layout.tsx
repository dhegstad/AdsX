import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://adsx.com/pricing",
  },
};

export default function V0PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
