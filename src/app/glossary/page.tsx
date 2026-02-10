import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { getAllTerms, getGlossaryCategories, getTermsByCategory, type GlossaryTerm } from "@/lib/glossary";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

export const metadata: Metadata = createPageMetadata({
  title: "AI Visibility Glossary: Terms & Definitions | AdsX",
  description:
    "Complete glossary of AI visibility terms. Learn about LLMs, AI assistants, optimization techniques, and key concepts for getting your brand recommended by AI.",
  path: "/glossary",
  keywords: [
    "AI visibility glossary",
    "AI marketing terms",
    "LLM terminology",
    "AI optimization glossary",
    "ChatGPT terms",
  ],
});

const categoryLabels: Record<string, string> = {
  "ai-fundamentals": "AI FUNDAMENTALS",
  "visibility": "VISIBILITY CONCEPTS",
  "optimization": "OPTIMIZATION TECHNIQUES",
  "measurement": "MEASUREMENT & ANALYTICS",
  "strategy": "STRATEGY & PLANNING",
  "platforms": "AI PLATFORMS",
};

const categoryDescriptions: Record<string, string> = {
  "ai-fundamentals": "Core concepts about AI, large language models, and how AI systems work.",
  "visibility": "Key concepts related to brand presence and discoverability in AI systems.",
  "optimization": "Techniques and strategies for improving AI visibility.",
  "measurement": "How to track and measure AI visibility performance.",
  "strategy": "Strategic planning concepts for AI visibility initiatives.",
  "platforms": "Specific AI platforms and their unique characteristics.",
};

export default function GlossaryIndexPage() {
  const categories = getGlossaryCategories();
  const allTerms = getAllTerms();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Glossary", path: "/glossary" },
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
            <span className="text-[#10b981]">GLOSSARY</span>
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
            AI Visibility<br />Glossary
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            Your comprehensive guide to AI visibility terminology. Understand the concepts,
            techniques, and platforms that matter for getting your brand recommended by AI.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 border-b border-[#333]">
          {[
            { label: "TERMS DEFINED", value: allTerms.length.toString() },
            { label: "CATEGORIES", value: categories.length.toString() },
            { label: "FAQS ANSWERED", value: allTerms.reduce((acc, t) => acc + t.faqs.length, 0).toString() },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 border-r last:border-r-0 border-[#333] text-center"
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

        {/* Categories */}
        {categories.map((cat, catIdx) => {
          const terms = getTermsByCategory(cat.slug as GlossaryTerm["category"]);
          return (
            <div key={cat.slug} className={catIdx < categories.length - 1 ? "border-b border-[#333]" : ""}>
              <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3">
                {terms.map((term, idx) => (
                  <Link
                    key={term.slug}
                    href={`/glossary/${term.slug}`}
                    className={`group p-6 border-b md:border-b-0 ${idx % 3 !== 2 ? "lg:border-r" : ""} ${idx % 2 !== 1 ? "md:border-r lg:border-r-0" : ""} ${idx < terms.length - 3 ? "lg:border-b" : ""} ${idx < terms.length - 2 ? "md:border-b lg:border-b-0" : ""} border-[#333] hover:bg-[#111] transition-colors`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3
                          className="font-semibold group-hover:text-[#10b981] transition-colors"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {term.term}
                        </h3>
                        <p className="mt-2 text-sm text-[#888] line-clamp-2">
                          {term.shortDefinition}
                        </p>
                      </div>
                      <span className="text-[#888] group-hover:text-[#10b981] group-hover:translate-x-1 transition-all shrink-0">
                        &rarr;
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* All Terms A-Z */}
        <div className="border-t border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ALL TERMS A-Z
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 p-6 gap-2">
            {allTerms
              .sort((a, b) => a.term.localeCompare(b.term))
              .map((term) => (
                <Link
                  key={term.slug}
                  href={`/glossary/${term.slug}`}
                  className="flex items-center gap-2 p-3 hover:bg-[#111] transition-colors group"
                >
                  <span className="text-[#888] group-hover:text-[#10b981] transition-colors">&rarr;</span>
                  <span className="group-hover:text-[#10b981] transition-colors">
                    {term.term}
                  </span>
                </Link>
              ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 md:p-16 text-center bg-[#0c0c0c] border-t border-[#333]">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to apply what you&apos;ve learned?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Get a free audit to see how your brand appears across AI platforms and identify optimization opportunities.
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
