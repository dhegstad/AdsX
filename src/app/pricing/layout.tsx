import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Pricing - AI Search Advertising Services | AdsX",
  description:
    "Transparent pricing for AI search advertising services. Starting at $4,250/month with a 3-month minimum. Get your brand recommended by ChatGPT, Claude, and more.",
  path: "/pricing",
});

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
