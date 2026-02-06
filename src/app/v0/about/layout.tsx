import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.adsx.com/about",
  },
};

export default function V0AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
