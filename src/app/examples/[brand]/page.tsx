import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrutalistLayout } from "@/components/brutalist-layout";
import {
  getAllExamples,
  getExampleBySlug,
  getExamplesByCategory,
  type BrandExample,
} from "@/lib/examples";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  SchemaScript,
} from "@/lib/seo/schemas";

interface PageProps {
  params: Promise<{ brand: string }>;
}

export async function generateStaticParams() {
  const examples = getAllExamples();
  return examples.map((example) => ({
    brand: example.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand: slug } = await params;
  const example = getExampleBySlug(slug);

  if (!example) {
    return { title: "Example Not Found" };
  }

  return createPageMetadata({
    title: `${example.headline} | AdsX Case Study`,
    description: example.description,
    path: `/examples/${slug}`,
    keywords: example.keywords,
  });
}

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

export default async function ExamplePage({ params }: PageProps) {
  const { brand: slug } = await params;
  const example = getExampleBySlug(slug);

  if (!example) {
    notFound();
  }

  const relatedExamples = getExamplesByCategory(example.category)
    .filter((e) => e.slug !== slug)
    .slice(0, 3);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Examples", path: "/examples" },
    { name: example.brand, path: `/examples/${slug}` },
  ];

  const faqItems = example.faqs.map((faq) => ({
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
            <Link href="/examples" className="hover:text-[#EAEAEA]">EXAMPLES</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">{example.brand.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span
              className="text-xs tracking-widest px-3 py-1 border border-[#10b981] text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {categoryLabels[example.category]}
            </span>
            <span className="text-xs tracking-widest text-[#888]" style={{ fontFamily: "var(--font-mono)" }}>
              {example.timeline}
            </span>
          </div>
          <h1
            className="uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 4vw, 48px)",
              lineHeight: 1,
              letterSpacing: "-1px",
            }}
          >
            {example.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            {example.description}
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 border-b border-[#333]">
          {example.metrics.map((metric, idx) => (
            <div
              key={metric.metric}
              className={`p-6 ${idx < example.metrics.length - 1 ? "border-r" : ""} border-[#333] text-center`}
            >
              <div
                className="text-2xl md:text-4xl text-[#10b981]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {metric.value}
              </div>
              <div className="font-medium mt-1">{metric.metric}</div>
              <div className="text-sm text-[#888] mt-1">{metric.context}</div>
            </div>
          ))}
        </div>

        {/* Challenge + Approach */}
        <div className="grid lg:grid-cols-2 border-b border-[#333]">
          <div className="p-8 lg:border-r border-[#333]">
            <div
              className="text-xs tracking-widest mb-4"
              style={{ fontFamily: "var(--font-mono)", color: "#ef4444" }}
            >
              THE CHALLENGE
            </div>
            <p className="text-[#ccc] leading-relaxed">
              {example.challenge}
            </p>
          </div>
          <div className="p-8 bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest mb-4"
              style={{ fontFamily: "var(--font-mono)", color: "#3b82f6" }}
            >
              THE APPROACH
            </div>
            <p className="text-[#ccc] leading-relaxed">
              {example.approach}
            </p>
          </div>
        </div>

        {/* Strategies */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              KEY STRATEGIES
            </div>
          </div>
          <div className="grid lg:grid-cols-3">
            {example.strategies.map((strategy, idx) => (
              <div
                key={idx}
                className={`p-6 ${idx < 2 ? "lg:border-r" : ""} border-[#333] ${idx < example.strategies.length - 3 ? "border-b lg:border-b-0" : ""}`}
              >
                <h3 className="font-semibold text-lg mb-3">{strategy.strategy}</h3>
                <p className="text-sm text-[#888] mb-4">
                  {strategy.implementation}
                </p>
                <div className="p-3 border border-[#10b981]/30 bg-[#10b981]/5">
                  <span className="text-sm text-[#10b981]">
                    ✓ {strategy.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="border-b border-[#333] p-8 bg-[#0c0c0c]">
          <div
            className="text-xs tracking-widest text-[#10b981] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            THE RESULTS
          </div>
          <p className="text-[#ccc] leading-relaxed max-w-3xl">
            {example.results}
          </p>
        </div>

        {/* Quote */}
        {example.quote && (
          <div className="border-b border-[#333] p-8">
            <div className="max-w-3xl mx-auto">
              <div className="p-8 border border-[#10b981]/20 bg-[#10b981]/5">
                <p className="text-xl italic text-[#ccc] mb-4">
                  &ldquo;{example.quote.text}&rdquo;
                </p>
                <footer className="text-[#888]">
                  <span className="font-medium text-[#EAEAEA]">{example.quote.author}</span>
                  <span className="mx-2">—</span>
                  <span>{example.quote.role}</span>
                </footer>
              </div>
            </div>
          </div>
        )}

        {/* Key Takeaways */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              KEY TAKEAWAYS
            </div>
          </div>
          <div>
            {example.keyTakeaways.map((takeaway, idx) => (
              <div
                key={idx}
                className={`p-6 flex items-start gap-4 ${idx < example.keyTakeaways.length - 1 ? "border-b border-[#333]" : ""}`}
              >
                <span className="text-[#10b981]">✓</span>
                <span className="text-[#ccc]">{takeaway}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        {example.faqs.length > 0 && (
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
              {example.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`p-6 ${idx < example.faqs.length - 1 ? "border-b border-[#333]" : ""}`}
                >
                  <h3 className="font-semibold mb-3">{faq.question}</h3>
                  <p className="text-[#888]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Examples */}
        {relatedExamples.length > 0 && (
          <div className="border-b border-[#333]">
            <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
              <div
                className="text-xs tracking-widest text-[#888]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                MORE {categoryLabels[example.category]} EXAMPLES
              </div>
            </div>
            <div className="grid md:grid-cols-3">
              {relatedExamples.map((ex, idx) => (
                <Link
                  key={ex.slug}
                  href={`/examples/${ex.slug}`}
                  className={`group p-6 ${idx < 2 ? "md:border-r" : ""} border-[#333] hover:bg-[#111] transition-colors`}
                >
                  <div className="font-semibold text-lg group-hover:text-[#10b981] transition-colors mb-2">
                    {ex.brand}
                  </div>
                  <p className="text-sm text-[#888] mb-3">
                    {ex.industry}
                  </p>
                  <p className="text-sm text-[#ccc] line-clamp-2">
                    {ex.headline}
                  </p>
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
            Ready for similar results?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Get a free audit to see how your brand can improve AI visibility like {example.brand}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/free-audit" className="cta-btn cta-btn-primary">
              Get Your Free Audit
            </Link>
            <Link href="/examples" className="cta-btn">
              Browse All Examples
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
