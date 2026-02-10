import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrutalistLayout } from "@/components/brutalist-layout";
import {
  getAllLists,
  getListBySlug,
  getListsByCategory,
  type CuratedList,
} from "@/lib/curated-lists";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  SchemaScript,
} from "@/lib/seo/schemas";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const lists = getAllLists();
  return lists.map((list) => ({
    category: list.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const list = getListBySlug(slug);

  if (!list) {
    return { title: "List Not Found" };
  }

  return createPageMetadata({
    title: `${list.title} | AdsX`,
    description: list.description,
    path: `/best/${slug}`,
    keywords: list.keywords,
  });
}

const categoryLabels: Record<string, string> = {
  tools: "TOOLS & SOFTWARE",
  strategies: "STRATEGIES",
  resources: "RESOURCES",
  guides: "GUIDES",
};

export default async function CuratedListPage({ params }: PageProps) {
  const { category: slug } = await params;
  const list = getListBySlug(slug);

  if (!list) {
    notFound();
  }

  const relatedLists = getListsByCategory(list.category)
    .filter((l) => l.slug !== slug)
    .slice(0, 3);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Best Of", path: "/best" },
    { name: list.title, path: `/best/${slug}` },
  ];

  const faqItems = list.faqs.map((faq) => ({
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
            <Link href="/best" className="hover:text-[#EAEAEA]">BEST OF</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">{list.title.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span
              className="text-xs tracking-widest px-3 py-1 border border-[#10b981] text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {categoryLabels[list.category]}
            </span>
            <span className="text-xs tracking-widest text-[#888]" style={{ fontFamily: "var(--font-mono)" }}>
              UPDATED {list.lastUpdated.toUpperCase()}
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
            {list.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            {list.description}
          </p>
        </div>

        {/* Intro */}
        <div className="border-b border-[#333] p-8">
          <div className="max-w-3xl">
            <p className="text-[#ccc] leading-relaxed">
              {list.intro}
            </p>
          </div>
        </div>

        {/* Methodology */}
        <div className="border-b border-[#333] p-8 bg-[#0c0c0c]">
          <div className="max-w-3xl">
            <div
              className="text-xs tracking-widest text-[#3b82f6] mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              OUR METHODOLOGY
            </div>
            <p className="text-[#ccc]">
              {list.methodology}
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {list.title.toUpperCase()}
            </div>
          </div>
          <div>
            {list.items.map((item, idx) => (
              <div
                key={idx}
                className={`p-6 ${idx < list.items.length - 1 ? "border-b border-[#333]" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="flex h-8 w-8 items-center justify-center bg-[#10b981]/10 text-sm font-bold text-[#10b981] shrink-0"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      {item.link && (
                        <Link
                          href={item.link}
                          className="text-[#10b981] hover:text-[#EAEAEA] transition-colors"
                        >
                          ↗
                        </Link>
                      )}
                    </div>
                    <p className="text-[#888] mb-3">
                      {item.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-[#10b981] px-3 py-1 border border-[#10b981]/30 bg-[#10b981]/5">
                      <span>✓</span>
                      <span>{item.highlight}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Considerations */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              KEY CONSIDERATIONS
            </div>
          </div>
          <div>
            {list.considerations.map((consideration, idx) => (
              <div
                key={idx}
                className={`p-6 flex items-start gap-4 ${idx < list.considerations.length - 1 ? "border-b border-[#333]" : ""}`}
              >
                <span className="text-[#10b981]">✓</span>
                <span className="text-[#ccc]">{consideration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        {list.faqs.length > 0 && (
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
              {list.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`p-6 ${idx < list.faqs.length - 1 ? "border-b border-[#333]" : ""}`}
                >
                  <h3 className="font-semibold mb-3">{faq.question}</h3>
                  <p className="text-[#888]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Lists */}
        {relatedLists.length > 0 && (
          <div className="border-b border-[#333]">
            <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
              <div
                className="text-xs tracking-widest text-[#888]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                RELATED GUIDES
              </div>
            </div>
            <div className="grid md:grid-cols-3">
              {relatedLists.map((l, idx) => (
                <Link
                  key={l.slug}
                  href={`/best/${l.slug}`}
                  className={`group p-6 ${idx < 2 ? "md:border-r" : ""} border-[#333] hover:bg-[#111] transition-colors`}
                >
                  <span
                    className="text-xs tracking-widest text-[#10b981] px-2 py-1 border border-[#10b981]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {categoryLabels[l.category]}
                  </span>
                  <h3 className="font-semibold mt-3 group-hover:text-[#10b981] transition-colors">
                    {l.title}
                  </h3>
                  <p className="text-sm text-[#888] mt-2 line-clamp-2">
                    {l.description}
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
            Ready to improve your AI visibility?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Get a free audit to see where you stand and identify your biggest opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/free-audit" className="cta-btn cta-btn-primary">
              Get Your Free Audit
            </Link>
            <Link href="/best" className="cta-btn">
              Browse All Guides
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
