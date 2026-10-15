import { createPageMetadata } from "@/lib/seo/metadata";

// The interactive page is a client component, so route metadata belongs here.
// Without this override it inherits the homepage canonical from the root layout.
export const metadata = createPageMetadata({
  title: "Free AI Visibility Audit",
  description:
    "Check how your brand appears in AI search recommendations and compare its visibility with competitors.",
  path: "/tools/free-audit",
});

export default function FreeAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
