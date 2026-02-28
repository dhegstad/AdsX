import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { getAllIndustries } from "@/lib/industries";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

export const metadata: Metadata = createPageMetadata({
  title: "AI Search Visibility by Industry | AdsX",
  description:
    "Get your business recommended by ChatGPT, Claude, and Perplexity in your industry. We help SaaS, e-commerce, fintech, and other businesses dominate AI search results.",
  path: "/industries",
  keywords: [
    "AI visibility by industry",
    "AI search optimization by industry",
    "ChatGPT marketing by industry",
    "AI visibility services",
  ],
});

export default function IndustriesPage() {
  const industries = getAllIndustries();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
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
            <span className="text-[#10b981]">INDUSTRIES</span>
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
            AI Search Visibility<br />by Industry
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            Every industry faces unique challenges in AI search. We help businesses across
            sectors get recommended by ChatGPT, Claude, and Perplexity for their specific
            products and services.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/tools/free-audit" className="cta-btn cta-btn-primary">
              Get Your Free Audit
            </Link>
            <Link href="/contact" className="cta-btn">
              Talk to Sales
            </Link>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 border-b border-[#333]">
          {[
            { label: "INDUSTRIES", value: industries.length.toString() },
            { label: "AVG. ROI", value: "340%" },
            { label: "AI PLATFORMS", value: "6+" },
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

        {/* Industries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, idx) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className={`group p-6 ${idx % 3 !== 2 ? "lg:border-r" : ""} ${idx % 2 !== 1 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b hover:bg-[#111] transition-colors`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#10b981]">◉</span>
                    <h3 className="text-xl font-semibold group-hover:text-[#10b981] transition-colors">
                      {industry.name}
                    </h3>
                  </div>
                  <p className="text-[#ccc] text-sm line-clamp-2">
                    {industry.description}
                  </p>
                  {industry.stats.slice(0, 1).map((stat) => (
                    <div
                      key={stat.label}
                      className="mt-4 inline-flex items-center gap-1 text-xs text-[#10b981] px-2 py-1 border border-[#10b981]/30 bg-[#10b981]/5"
                    >
                      <span className="font-semibold">{stat.value}</span>
                    </div>
                  ))}
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
            Don&apos;t see your industry?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            We work with businesses across all industries. Get in touch to discuss AI visibility for your sector.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="cta-btn cta-btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
