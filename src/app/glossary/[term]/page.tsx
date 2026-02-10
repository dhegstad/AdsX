import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrutalistLayout } from "@/components/brutalist-layout";
import {
  getAllTerms,
  getTermBySlug,
  getTermsByCategory,
  type GlossaryTerm,
} from "@/lib/glossary";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  SchemaScript,
} from "@/lib/seo/schemas";

interface PageProps {
  params: Promise<{ term: string }>;
}

export async function generateStaticParams() {
  const terms = getAllTerms();
  return terms.map((term) => ({
    term: term.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { term: slug } = await params;
  const term = getTermBySlug(slug);

  if (!term) {
    return { title: "Term Not Found" };
  }

  return createPageMetadata({
    title: `${term.term}: Definition & Why It Matters for AI Visibility | AdsX`,
    description: `${term.shortDefinition} Learn why ${term.term.toLowerCase()} matters for your brand's AI visibility strategy.`,
    path: `/glossary/${slug}`,
    keywords: term.keywords,
  });
}

const categoryLabels: Record<string, string> = {
  "ai-fundamentals": "AI FUNDAMENTALS",
  "visibility": "VISIBILITY CONCEPTS",
  "optimization": "OPTIMIZATION TECHNIQUES",
  "measurement": "MEASUREMENT & ANALYTICS",
  "strategy": "STRATEGY & PLANNING",
  "platforms": "AI PLATFORMS",
};

export default async function GlossaryTermPage({ params }: PageProps) {
  const { term: slug } = await params;
  const term = getTermBySlug(slug);

  if (!term) {
    notFound();
  }

  const categoryTerms = getTermsByCategory(term.category).filter((t) => t.slug !== slug);
  const relatedInCategory = categoryTerms.slice(0, 4);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Glossary", path: "/glossary" },
    { name: term.term, path: `/glossary/${slug}` },
  ];

  const faqItems = term.faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
      <SchemaScript schema={createFAQSchema(faqItems)} />
      <BrutalistLayout>
        {/* Hero */}
        <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
          <div
            className="text-xs tracking-widest text-[#888] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Link href="/" className="hover:text-[#EAEAEA]">HOME</Link>
            <span className="mx-2">/</span>
            <Link href="/glossary" className="hover:text-[#EAEAEA]">GLOSSARY</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">{term.term.toUpperCase()}</span>
          </div>
          <div
            className="text-xs tracking-widest text-[#10b981] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {categoryLabels[term.category]}
          </div>
          <h1
            className="uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 5vw, 60px)",
              lineHeight: 0.95,
              letterSpacing: "-1px",
            }}
          >
            {term.term}
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            {term.shortDefinition}
          </p>
        </div>

        {/* Full Definition */}
        <div className="grid lg:grid-cols-[2fr_1fr] border-b border-[#333]">
          <div className="p-8 lg:border-r border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888] mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              DEFINITION
            </div>
            <h2
              className="text-xl md:text-2xl uppercase mb-6"
              style={{ fontFamily: "var(--font-display)", lineHeight: 1.1 }}
            >
              What is {term.term}?
            </h2>
            <p className="text-[#ccc] leading-relaxed">
              {term.fullDefinition}
            </p>

            {term.usageInContext && (
              <div className="mt-8 p-6 border border-[#10b981]/30 bg-[#10b981]/5">
                <div
                  className="text-xs tracking-widest text-[#10b981] mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  IN PRACTICE
                </div>
                <p className="text-[#ccc]">
                  {term.usageInContext}
                </p>
              </div>
            )}
          </div>

          <div className="p-8 bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#888] mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              WHY IT MATTERS
            </div>
            <p className="text-[#ccc] leading-relaxed">
              {term.whyItMatters}
            </p>
          </div>
        </div>

        {/* Examples */}
        {term.examples.length > 0 && (
          <div className="border-b border-[#333]">
            <div className="p-6 border-b border-[#333]">
              <div
                className="text-xs tracking-widest text-[#888]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                EXAMPLES
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3">
              {term.examples.map((example, idx) => (
                <div
                  key={idx}
                  className={`p-6 ${idx < term.examples.length - 1 ? "border-b md:border-b-0" : ""} ${idx % 3 !== 2 ? "lg:border-r" : ""} ${idx % 2 !== 1 ? "md:border-r lg:border-r-0" : ""} border-[#333]`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="text-[#10b981] text-xs"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[#ccc] text-sm">{example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Common Misconceptions */}
        {term.commonMisconceptions && (
          <div className="border-b border-[#333] p-8 bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#888] mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              COMMON MISCONCEPTIONS
            </div>
            <div className="p-6 border border-amber-500/30 bg-amber-500/5">
              <p className="text-[#ccc]">
                {term.commonMisconceptions}
              </p>
            </div>
          </div>
        )}

        {/* FAQs */}
        {term.faqs.length > 0 && (
          <div className="border-b border-[#333]">
            <div className="p-6 border-b border-[#333]">
              <div
                className="text-xs tracking-widest text-[#888]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                FREQUENTLY ASKED QUESTIONS
              </div>
            </div>
            <div>
              {term.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`p-6 ${idx < term.faqs.length - 1 ? "border-b border-[#333]" : ""}`}
                >
                  <h3
                    className="text-lg mb-3"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {faq.question}
                  </h3>
                  <p className="text-[#888]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Terms */}
        {term.relatedTerms.length > 0 && (
          <div className="border-b border-[#333]">
            <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
              <div
                className="text-xs tracking-widest text-[#888]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                RELATED TERMS
              </div>
            </div>
            <div className="grid md:grid-cols-2">
              {term.relatedTerms.map((related, idx) => (
                <Link
                  key={related.slug}
                  href={`/glossary/${related.slug}`}
                  className={`group flex items-center justify-between p-6 ${idx % 2 === 0 ? "md:border-r" : ""} ${idx < term.relatedTerms.length - 2 ? "border-b" : idx === term.relatedTerms.length - 2 && term.relatedTerms.length % 2 === 0 ? "" : idx < term.relatedTerms.length - 1 ? "border-b" : ""} border-[#333] hover:bg-[#111] transition-colors`}
                >
                  <span className="font-medium group-hover:text-[#10b981] transition-colors">
                    {related.term}
                  </span>
                  <span className="text-[#888] group-hover:text-[#10b981] group-hover:translate-x-1 transition-all">
                    &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* More from Category */}
        {relatedInCategory.length > 0 && (
          <div className="border-b border-[#333]">
            <div className="p-6 border-b border-[#333]">
              <div
                className="text-xs tracking-widest text-[#888]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                MORE {categoryLabels[term.category]} TERMS
              </div>
            </div>
            <div>
              {relatedInCategory.map((t, idx) => (
                <Link
                  key={t.slug}
                  href={`/glossary/${t.slug}`}
                  className={`group flex items-center justify-between p-6 ${idx < relatedInCategory.length - 1 ? "border-b border-[#333]" : ""} hover:bg-[#111] transition-colors`}
                >
                  <div>
                    <div className="font-semibold group-hover:text-[#10b981] transition-colors">
                      {t.term}
                    </div>
                    <div className="text-sm text-[#888] mt-1">
                      {t.shortDefinition}
                    </div>
                  </div>
                  <span className="text-[#888] group-hover:text-[#10b981] group-hover:translate-x-1 transition-all shrink-0 ml-4">
                    &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="p-8 md:p-16 text-center bg-[#0c0c0c]">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to improve your AI visibility?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Get a free audit to see how your brand appears across ChatGPT, Claude, Perplexity, and other AI platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/free-audit" className="cta-btn cta-btn-primary">
              Get Your Free Audit
            </Link>
            <Link href="/glossary" className="cta-btn">
              Browse All Terms
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
