import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrutalistLayout } from "@/components/brutalist-layout";
import {
  getAllComparisons,
  getComparisonBySlug,
} from "@/lib/comparisons";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  SchemaScript,
} from "@/lib/seo/schemas";
import { getRelatedArticlesForPage } from "@/lib/seo/internal-linking";
import { RelatedArticles } from "@/components/related-articles";

interface PageProps {
  params: Promise<{ comparison: string }>;
}

export async function generateStaticParams() {
  const comparisons = getAllComparisons();
  return comparisons.map((comparison) => ({
    comparison: `ai-visibility-vs-${comparison.slug}`,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { comparison: slug } = await params;
  const comparisonSlug = slug.replace("ai-visibility-vs-", "");
  const comparison = getComparisonBySlug(comparisonSlug);

  if (!comparison) {
    return { title: "Comparison Not Found" };
  }

  return createPageMetadata({
    title: `${comparison.headline} | AdsX`,
    description: comparison.description,
    path: `/compare/${slug}`,
    keywords: comparison.keywords,
  });
}

export default async function ComparisonPage({ params }: PageProps) {
  const { comparison: slug } = await params;
  const comparisonSlug = slug.replace("ai-visibility-vs-", "");
  const comparison = getComparisonBySlug(comparisonSlug);

  if (!comparison) {
    notFound();
  }

  const otherComparisons = getAllComparisons().filter(
    (c) => c.slug !== comparisonSlug
  );
  const relatedArticles = getRelatedArticlesForPage(comparison.keywords, comparison.alternativeName);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
    { name: comparison.headline, path: `/compare/${slug}` },
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
            <Link href="/compare" className="hover:text-[#EAEAEA]">COMPARE</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">VS {comparison.alternativeShortName.toUpperCase()}</span>
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
            {comparison.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            {comparison.subheadline}
          </p>
        </div>

        {/* Intro */}
        <div className="border-b border-[#333] p-8">
          <div className="max-w-3xl">
            <p className="text-[#ccc] leading-relaxed">
              {comparison.description}
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              HEAD-TO-HEAD COMPARISON
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#333]">
                  <th
                    className="text-left py-4 px-6 text-xs tracking-widest text-[#888]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    FEATURE
                  </th>
                  <th
                    className="text-left py-4 px-6 text-xs tracking-widest text-[#10b981]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    ADSX (AI VISIBILITY)
                  </th>
                  <th
                    className="text-left py-4 px-6 text-xs tracking-widest text-[#888]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {comparison.alternativeName.toUpperCase()}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.comparisonPoints.map((point, idx) => (
                  <tr
                    key={point.feature}
                    className={`${idx % 2 === 0 ? "bg-[#0a0a0a]" : ""} border-b border-[#333] last:border-b-0`}
                  >
                    <td className="py-4 px-6 font-medium">{point.feature}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-start gap-2">
                        {point.winner === "adsx" && (
                          <span className="text-[#10b981]">✓</span>
                        )}
                        {point.winner === "tie" && (
                          <span className="text-[#888]">—</span>
                        )}
                        {point.winner === "alternative" && (
                          <span className="text-[#555]">✗</span>
                        )}
                        <span className={point.winner === "adsx" ? "text-[#10b981]" : "text-[#ccc]"}>
                          {point.adsX}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-start gap-2">
                        {point.winner === "alternative" && (
                          <span className="text-[#10b981]">✓</span>
                        )}
                        {point.winner === "tie" && (
                          <span className="text-[#888]">—</span>
                        )}
                        {point.winner === "adsx" && (
                          <span className="text-[#555]">✗</span>
                        )}
                        <span className={point.winner === "alternative" ? "text-[#10b981]" : "text-[#888]"}>
                          {point.alternative}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Benefits Side by Side */}
        <div className="border-b border-[#333]">
          <div className="grid lg:grid-cols-2">
            {/* AdsX Benefits */}
            <div className="p-8 lg:border-r border-[#333] border-b lg:border-b-0 bg-[#10b981]/5">
              <div
                className="text-xs tracking-widest text-[#10b981] mb-6"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                WHY CHOOSE AI VISIBILITY
              </div>
              <div className="space-y-4">
                {comparison.adsXBenefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-3">
                    <span className="text-[#10b981] shrink-0">✓</span>
                    <div>
                      <div className="font-semibold">{benefit.title}</div>
                      <div className="text-sm text-[#888]">
                        {benefit.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternative Benefits */}
            <div className="p-8">
              <div
                className="text-xs tracking-widest text-[#888] mb-6"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {comparison.alternativeName.toUpperCase()} STRENGTHS
              </div>
              <div className="space-y-4">
                {comparison.alternativeBenefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-3">
                    <span className="text-[#888] shrink-0">✓</span>
                    <div>
                      <div className="font-semibold">{benefit.title}</div>
                      <div className="text-sm text-[#888]">
                        {benefit.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Verdict */}
        <div className="border-b border-[#333] p-8 bg-[#0c0c0c]">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="text-xs tracking-widest text-[#10b981] mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              THE BOTTOM LINE
            </div>
            <p className="text-lg text-[#ccc] leading-relaxed">
              {comparison.verdict}
            </p>
          </div>
        </div>

        {/* Other Comparisons */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              OTHER COMPARISONS
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            {otherComparisons.map((comp, idx) => (
              <Link
                key={comp.slug}
                href={`/compare/ai-visibility-vs-${comp.slug}`}
                className={`group flex items-center justify-between p-6 ${idx % 2 === 0 ? "md:border-r" : ""} border-[#333] border-b last:border-b-0 hover:bg-[#111] transition-colors`}
              >
                <div>
                  <div className="font-semibold group-hover:text-[#10b981] transition-colors">
                    {comp.headline}
                  </div>
                  <div className="text-sm text-[#888]">
                    {comp.subheadline}
                  </div>
                </div>
                <span className="text-[#888] group-hover:text-[#10b981] group-hover:translate-x-1 transition-all">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>

        <RelatedArticles articles={relatedArticles} />

        {/* CTA */}
        <div className="p-8 md:p-16 text-center bg-[#0c0c0c]">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            See your current AI visibility
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Get a free audit to see how your brand appears across ChatGPT, Claude, Perplexity, and more.
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
