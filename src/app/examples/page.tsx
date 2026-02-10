import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { getAllExamples, getExampleCategories, getExamplesByCategory, type BrandExample } from "@/lib/examples";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

export const metadata: Metadata = createPageMetadata({
  title: "AI Visibility Success Stories: Brand Examples | AdsX",
  description:
    "See how leading brands achieved AI visibility success. Detailed case studies showing strategies, tactics, and results from e-commerce, SaaS, fintech, and more.",
  path: "/examples",
  keywords: [
    "AI visibility examples",
    "AI marketing case studies",
    "brand AI visibility",
    "ChatGPT optimization examples",
  ],
});

const categoryLabels: Record<string, string> = {
  ecommerce: "E-COMMERCE",
  saas: "SAAS",
  fintech: "FINTECH",
  healthcare: "HEALTHCARE",
  consumer: "CONSUMER",
  b2b: "B2B",
  media: "MEDIA",
  travel: "TRAVEL",
};

const categoryDescriptions: Record<string, string> = {
  ecommerce: "How e-commerce brands win AI product recommendations",
  saas: "SaaS companies dominating AI software recommendations",
  fintech: "Fintech brands building trust in AI responses",
  healthcare: "Healthcare brands navigating AI visibility with trust",
  consumer: "Consumer brands capturing AI discovery",
  b2b: "B2B companies winning complex AI recommendations",
  media: "Media brands earning AI content recommendations",
  travel: "Travel brands owning AI trip planning",
};

export default function ExamplesIndexPage() {
  const allExamples = getAllExamples();
  const categories = getExampleCategories().filter((c) => c.count > 0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Examples", path: "/examples" },
  ];

  // Featured examples (first 3)
  const featuredExamples = allExamples.slice(0, 3);

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
            <span className="text-[#10b981]">EXAMPLES</span>
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
            AI Visibility<br />Success Stories
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            See how leading brands achieved AI visibility success. Learn from their
            strategies, tactics, and results to improve your own AI presence.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#333]">
          {[
            { label: "BRAND EXAMPLES", value: allExamples.length.toString() },
            { label: "INDUSTRIES", value: categories.length.toString() },
            { label: "AVG. AI REC RATE", value: "67%" },
            { label: "TYPICAL TIMELINE", value: "4-6 MO" },
          ].map((stat, idx) => (
            <div
              key={stat.label}
              className={`p-6 ${idx < 3 ? "border-r" : ""} border-[#333] text-center`}
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

        {/* Featured Examples */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              FEATURED EXAMPLES
            </div>
          </div>
          <div className="grid lg:grid-cols-3">
            {featuredExamples.map((example, idx) => (
              <Link
                key={example.slug}
                href={`/examples/${example.slug}`}
                className={`group p-6 ${idx < 2 ? "lg:border-r" : ""} border-[#333] hover:bg-[#111] transition-colors`}
              >
                <div
                  className="text-xs tracking-widest text-[#10b981] mb-3"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {categoryLabels[example.category]}
                </div>
                <h3
                  className="text-xl font-semibold group-hover:text-[#10b981] transition-colors mb-2"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {example.brand}
                </h3>
                <p className="text-sm text-[#888] mb-3">
                  {example.industry}
                </p>
                <p className="text-sm text-[#ccc] mb-4 line-clamp-2">
                  {example.headline}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-[#10b981]">{example.metrics[0]?.value}</span>
                  <span className="text-[#888]">{example.timeline}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Categories */}
        {categories.map((cat, catIdx) => {
          const examples = getExamplesByCategory(cat.slug as BrandExample["category"]);
          return (
            <div key={cat.slug} className={catIdx < categories.length - 1 ? "border-b border-[#333]" : ""}>
              <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className="text-xs tracking-widest text-[#10b981] mb-2"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {categoryLabels[cat.slug]}
                    </div>
                    <p className="text-[#888] text-sm">
                      {categoryDescriptions[cat.slug]}
                    </p>
                  </div>
                  <span
                    className="text-xs tracking-widest text-[#888]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {cat.count} EXAMPLES
                  </span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3">
                {examples.map((example, idx) => (
                  <Link
                    key={example.slug}
                    href={`/examples/${example.slug}`}
                    className={`group flex items-start justify-between p-6 ${idx % 3 !== 2 ? "lg:border-r" : ""} ${idx % 2 !== 1 ? "md:border-r lg:border-r-0" : ""} ${idx < examples.length - 3 ? "lg:border-b" : ""} ${idx < examples.length - 2 ? "md:border-b lg:border-b-0" : ""} border-[#333] hover:bg-[#111] transition-colors`}
                  >
                    <div>
                      <div className="font-semibold group-hover:text-[#10b981] transition-colors">
                        {example.brand}
                      </div>
                      <div className="text-sm text-[#888] mt-1">
                        {example.industry}
                      </div>
                      <div className="text-xs text-[#10b981] mt-2">
                        {example.metrics[0]?.value} {example.metrics[0]?.context}
                      </div>
                    </div>
                    <span className="text-[#888] group-hover:text-[#10b981] group-hover:translate-x-1 transition-all shrink-0">
                      &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* CTA */}
        <div className="p-8 md:p-16 text-center bg-[#0c0c0c] border-t border-[#333]">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Want to be the next success story?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Get a free audit to see how your brand can achieve similar AI visibility results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/free-audit" className="cta-btn cta-btn-primary">
              Get Your Free Audit
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
