import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | AdsX",
  description: "Sign in to your AdsX visibility dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
