import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Console | AdsX Dashboard",
  description: "Google Search Console index coverage and URL inspection.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SearchConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
