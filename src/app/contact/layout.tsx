import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with AdsX for a free AI search visibility audit. Book a strategy call or send us a message about your AI advertising needs.",
  alternates: {
    canonical: "https://adsx.com/contact",
  },
  openGraph: {
    title: "Contact AdsX - Get Your Free AI Visibility Audit",
    description: "Book a strategy call or send us a message. We typically respond within 24 hours.",
    url: "https://adsx.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
