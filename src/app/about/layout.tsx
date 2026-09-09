import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "About AdsX — Shopify & Ecommerce Publication",
  description: "Learn about AdsX, our Shopify and ecommerce publication, editorial approach, and app in development.",
  path: "/about",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
