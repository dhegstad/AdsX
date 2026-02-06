import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "About AdsX - AI Search Advertising Agency",
  description:
    "AdsX is the first advertising agency built for AI search. Learn about our mission to help brands capture visibility in ChatGPT, Claude, Perplexity, and other AI platforms.",
  path: "/about",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
