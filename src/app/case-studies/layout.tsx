import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Case Studies - AI Search Advertising Results | AdsX",
  description:
    "Real results from AI search advertising campaigns. See how we've helped SaaS, e-commerce, and fintech brands increase AI visibility by 340%+.",
  path: "/case-studies",
});

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
