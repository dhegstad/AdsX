import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { getAllAiAdsNiches } from "@/lib/ai-ads-niches";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

export const metadata: Metadata = createPageMetadata({
  title: "AI Advertising by Industry | ChatGPT, Perplexity & Gemini Ads for E-Commerce",
  description:
    "Explore AI advertising strategies for 30 e-commerce niches. Learn how to get your brand recommended in ChatGPT, Perplexity, and Gemini for your specific industry with estimated budgets and platform breakdowns.",
  path: "/ai-ads-for",
  keywords: [
    "AI ads by industry",
    "AI advertising e-commerce",
    "ChatGPT ads for brands",
    "Perplexity advertising",
    "Gemini ads e-commerce",
    "AI search advertising",
  ],
});

export default function AiAdsForIndexPage() {
  const niches = getAllAiAdsNiches();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "AI Ads by Industry", path: "/ai-ads-for" },
  ];

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
      <BrutalistLayout>
        {/* Hero */}
        <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
          <div
            className="text-xs tracking-widest text-[#888] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Link href="/" className="hover:text-[#EAEAEA]">HOME</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">AI ADS BY INDUSTRY</span>
          </div>
          <h1
            className="uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 6vw, 72px)",
              lineHeight: 0.9,
              letterSpacing: "-2px",
            }}
          >
            AI Advertising<br />by Industry
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            Get your e-commerce brand recommended in ChatGPT, Perplexity, and Gemini.
            Explore AI advertising strategies tailored to your specific niche with estimated
            budgets, platform breakdowns, and proven ad formats.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="cta-btn cta-btn-primary">
              Get Your AI Ads Strategy
            </Link>
            <Link href="/tools/free-audit" className="cta-btn">
              Free AI Visibility Audit
            </Link>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 border-b border-[#333]">
          {[
            { label: "NICHES COVERED", value: niches.length.toString() },
            { label: "AI PLATFORMS", value: "4+" },
            { label: "AVG. AI AD SPEND", value: "$5K-$50K/mo" },
          ].map((stat, idx) => (
            <div
              key={stat.label}
              className={`p-6 ${idx < 2 ? "border-r" : ""} border-[#333] text-center`}
            >
              <div
                className="text-2xl md:text-4xl text-[#10b981]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </div>
              <div
                className="text-[10px] md:text-xs tracking-widest text-[#888] mt-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Niche Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {niches.map((niche, idx) => (
            <Link
              key={niche.slug}
              href={`/ai-ads-for/${niche.slug}`}
              className={`group p-6 ${idx % 3 !== 2 ? "lg:border-r" : ""} ${idx % 2 !== 1 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b hover:bg-[#111] transition-colors`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#10b981]">&#9670;</span>
                    <h3 className="text-xl font-semibold group-hover:text-[#10b981] transition-colors">
                      {niche.nicheName}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3">
                    <div>
                      <div
                        className="text-[10px] tracking-widest text-[#666]"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        MARKET SIZE
                      </div>
                      <div className="text-sm text-[#ccc]">{niche.marketSize}</div>
                    </div>
                    <div>
                      <div
                        className="text-[10px] tracking-widest text-[#666]"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        AI AD SPEND
                      </div>
                      <div className="text-sm text-[#10b981]">{niche.aiAdSpendEstimate}</div>
                    </div>
                    <div className="col-span-2 mt-1">
                      <div
                        className="text-[10px] tracking-widest text-[#666]"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        TOP PLATFORM
                      </div>
                      <div className="text-sm text-[#ccc]">{niche.platforms[0].name}</div>
                    </div>
                  </div>
                </div>
                <span className="text-[#888] group-hover:text-[#10b981] group-hover:translate-x-1 transition-all shrink-0">
                  &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="p-8 md:p-16 text-center bg-[#0c0c0c] border-t border-[#333]">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to advertise on AI?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Get your e-commerce brand recommended in ChatGPT, Perplexity, and Gemini.
            AdsX builds your AI advertising strategy from the ground up.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="cta-btn cta-btn-primary">
              Get Your AI Ads Strategy
            </Link>
            <Link href="/tools/free-audit" className="cta-btn">
              Free AI Visibility Audit
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
