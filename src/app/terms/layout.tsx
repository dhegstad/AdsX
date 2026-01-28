import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "AdsX terms of service. Read our terms and conditions for using our AI search advertising services.",
  alternates: {
    canonical: "https://adsx.com/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
