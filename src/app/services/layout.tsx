import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "AI Search Advertising Services | AdsX",
  description:
    "Full-stack AI search advertising services including ChatGPT ads, AI visibility optimization, content strategy for LLMs, and multi-platform monitoring.",
  path: "/services",
});

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
