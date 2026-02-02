import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | AdsX",
  description: "Create your AdsX account to track AI visibility.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
