import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://adsx.com/contact",
  },
};

export default function V0ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
