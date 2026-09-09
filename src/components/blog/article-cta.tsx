"use client";

import Link from "next/link";
import { AffiliateCTA } from "./affiliate-cta";
import type { ContentIntent } from "@/lib/publication";

export function ArticleCTA({ slug, intent, placement }: { slug: string; intent: ContentIntent; placement: "cta-top" | "cta-mid" | "cta-footer" }) {
  if (intent === "affiliate") return <AffiliateCTA slug={slug} placement={placement} variant={placement === "cta-top" ? "compact" : "full"} />;
  if (placement !== "cta-footer") return null;
  return (
    <aside className="border border-[#333] p-6 md:p-8">
      <h2 className="text-2xl mb-3">Keep building your store</h2>
      <p className="text-[#aaa] mb-5">Explore practical guides by topic, or check your advertising economics with a free calculator.</p>
      <div className="flex flex-wrap gap-4"><Link href="/topics" className="cta-btn">Browse topics →</Link><Link href="/tools/roas-calculator" className="cta-btn">Calculate ROAS →</Link></div>
      <p className="text-sm text-[#aaa] mt-5">Starting a new store? <Link href="/start-a-shopify-store" className="text-[#10b981] underline">Read the Shopify setup guide.</Link></p>
    </aside>
  );
}
