import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Contact AdsX - Get Your Free AI Visibility Audit",
  description:
    "Get in touch with AdsX for a free AI search visibility audit. Book a strategy call or send us a message about your AI advertising needs.",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
