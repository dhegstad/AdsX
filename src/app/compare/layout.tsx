import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Compare AI Visibility to SEO, PR & DIY | AdsX",
  description:
    "Compare AI visibility optimization to SEO, PR, and DIY approaches. Make informed decisions about where to invest your marketing resources.",
  path: "/compare",
});

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
