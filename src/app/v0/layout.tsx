import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AdsX V0 - Original Design Backup",
  description: "Original design backup for AdsX website",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.adsx.com",
  },
};

export default function V0Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
