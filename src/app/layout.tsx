import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@/styles/globals.css";
import { AnalyticsProvider } from "@/lib/analytics/posthog";

export const metadata: Metadata = {
  title: {
    default: "AdsX - Monitor ad account changes",
    template: "%s | AdsX",
  },
  description: "Monitor Meta & Google ad account changes and get Slack alerts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </body>
    </html>
  );
}
