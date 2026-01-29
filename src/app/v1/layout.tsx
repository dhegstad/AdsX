import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AdsX V1 - Design Preview",
  description: "Design preview for AdsX homepage redesign",
  robots: {
    index: false,
    follow: false,
  },
};

export default function V1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
