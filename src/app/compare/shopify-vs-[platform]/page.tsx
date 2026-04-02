import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrutalistLayout } from "@/components/brutalist-layout";
import {
  getAllShopifyComparisons,
  getShopifyComparisonBySlug,
} from "@/lib/shopify-comparisons";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  SchemaScript,
} from "@/lib/seo/schemas";
import { getRelatedArticlesForPage } from "@/lib/seo/internal-linking";
import { RelatedArticles } from "@/components/related-articles";

// ISR: generate on first request, cache for 24 hours
export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllShopifyComparisons().map((c) => ({ platform: c.slug }));
}

interface PageProps {
  params: Promise<{ platform: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { platform: slug } = await params;
  const comparison = getShopifyComparisonBySlug(slug);

  if (!comparison) {
    return { title: "Comparison Not Found" };
  }

  return createPageMetadata({
    title: `${comparison.headline} | AdsX`,
    description: comparison.description,
    path: `/compare/shopify-vs-${slug}`,
    keywords: comparison.keywords,
  });
}

export default async function ShopifyComparisonPage({ params }: PageProps) {
  const { platform: slug } = await params;
  const comparison = getShopifyComparisonBySlug(slug);

  if (!comparison) {
    notFound();
  }

  const otherComparisons = getAllShopifyComparisons().filter(
    (c) => c.slug !== slug
  );
  const relatedArticles = getRelatedArticlesForPage(comparison.keywords, comparison.platformName);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
    { name: `Shopify vs ${comparison.platformName}`, path: `/compare/shopify-vs-${slug}` },
  ];

  const shopifyWins = comparison.features.filter((f) => f.winner === "shopify").length;
  const altWins = comparison.features.filter((f) => f.winner === "alternative").length;
  const ties = comparison.features.filter((f) => f.winner === "tie").length;

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
      <SchemaScript schema={createFAQSchema(comparison.faqs)} />
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
            <span className="text-[#10b981]">SHOPIFY VS {comparison.platformName.toUpperCase()}</span>
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
            {comparison.description}
          </p>
        </div>

        {/* Score Summary */}
        <div className="border-b border-[#333] bg-[#0c0c0c]">
          <div className="grid grid-cols-3 text-center">
            <div className="p-6 border-r border-[#333]">
              <div
                className="text-3xl md:text-4xl font-bold text-[#10b981]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {shopifyWins}
              </div>
              <div
                className="text-xs tracking-widest text-[#888] mt-1"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                SHOPIFY WINS
              </div>
            </div>
            <div className="p-6 border-r border-[#333]">
              <div
                className="text-3xl md:text-4xl font-bold text-[#888]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {ties}
              </div>
              <div
                className="text-xs tracking-widest text-[#888] mt-1"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                TIED
              </div>
            </div>
            <div className="p-6">
              <div
                className="text-3xl md:text-4xl font-bold text-[#EAEAEA]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {altWins}
              </div>
              <div
                className="text-xs tracking-widest text-[#888] mt-1"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {comparison.platformName.toUpperCase()} WINS
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Comparison */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              PRICING COMPARISON
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            <div className="p-6 md:border-r border-[#333] border-b md:border-b-0 bg-[#10b981]/5">
              <div
                className="text-xs tracking-widest text-[#10b981] mb-3"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                SHOPIFY
              </div>
              <p className="text-[#ccc]">{comparison.pricing.shopify}</p>
            </div>
            <div className="p-6">
              <div
                className="text-xs tracking-widest text-[#888] mb-3"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {comparison.platformName.toUpperCase()}
              </div>
              <p className="text-[#888]">{comparison.pricing.alternative}</p>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              FEATURE-BY-FEATURE COMPARISON
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
                    SHOPIFY
                  </th>
                  <th
                    className="text-left py-4 px-6 text-xs tracking-widest text-[#888]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {comparison.platformName.toUpperCase()}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.features.map((feature, idx) => (
                  <tr
                    key={feature.feature}
                    className={`${idx % 2 === 0 ? "bg-[#0a0a0a]" : ""} border-b border-[#333] last:border-b-0`}
                  >
                    <td className="py-4 px-6 font-medium text-[#EAEAEA]">{feature.feature}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-start gap-2">
                        {feature.winner === "shopify" && (
                          <span className="text-[#10b981] shrink-0">&#10003;</span>
                        )}
                        {feature.winner === "tie" && (
                          <span className="text-[#888] shrink-0">&mdash;</span>
                        )}
                        {feature.winner === "alternative" && (
                          <span className="text-[#555] shrink-0">&#10007;</span>
                        )}
                        <span className={feature.winner === "shopify" ? "text-[#10b981]" : "text-[#ccc]"}>
                          {feature.shopify}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-start gap-2">
                        {feature.winner === "alternative" && (
                          <span className="text-[#10b981] shrink-0">&#10003;</span>
                        )}
                        {feature.winner === "tie" && (
                          <span className="text-[#888] shrink-0">&mdash;</span>
                        )}
                        {feature.winner === "shopify" && (
                          <span className="text-[#555] shrink-0">&#10007;</span>
                        )}
                        <span className={feature.winner === "alternative" ? "text-[#10b981]" : "text-[#888]"}>
                          {feature.alternative}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pros Side by Side */}
        <div className="border-b border-[#333]">
          <div className="grid lg:grid-cols-2">
            {/* Shopify Pros */}
            <div className="p-8 lg:border-r border-[#333] border-b lg:border-b-0 bg-[#10b981]/5">
              <div
                className="text-xs tracking-widest text-[#10b981] mb-6"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                SHOPIFY ADVANTAGES
              </div>
              <div className="space-y-4">
                {comparison.shopifyPros.map((pro) => (
                  <div key={pro} className="flex gap-3">
                    <span className="text-[#10b981] shrink-0">&#10003;</span>
                    <span className="text-[#ccc]">{pro}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternative Pros */}
            <div className="p-8">
              <div
                className="text-xs tracking-widest text-[#888] mb-6"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {comparison.platformName.toUpperCase()} ADVANTAGES
              </div>
              <div className="space-y-4">
                {comparison.alternativePros.map((pro) => (
                  <div key={pro} className="flex gap-3">
                    <span className="text-[#888] shrink-0">&#10003;</span>
                    <span className="text-[#888]">{pro}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Best For */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              WHO SHOULD USE WHAT
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            <div className="p-6 md:border-r border-[#333] border-b md:border-b-0 bg-[#10b981]/5">
              <div
                className="text-xs tracking-widest text-[#10b981] mb-3"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                CHOOSE SHOPIFY IF
              </div>
              <p className="text-[#ccc]">{comparison.bestFor.shopify}</p>
            </div>
            <div className="p-6">
              <div
                className="text-xs tracking-widest text-[#888] mb-3"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                CHOOSE {comparison.platformName.toUpperCase()} IF
              </div>
              <p className="text-[#888]">{comparison.bestFor.alternative}</p>
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
              THE VERDICT
            </div>
            <p className="text-lg text-[#ccc] leading-relaxed">
              {comparison.verdict}
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              FREQUENTLY ASKED QUESTIONS
            </div>
          </div>
          <div className="divide-y divide-[#333]">
            {comparison.faqs.map((faq) => (
              <div key={faq.question} className="p-6 md:p-8">
                <h3
                  className="text-lg uppercase mb-3"
                  style={{ fontFamily: "var(--font-display)", lineHeight: 1.2 }}
                >
                  {faq.question}
                </h3>
                <p className="text-[#888] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Comparisons */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              OTHER SHOPIFY COMPARISONS
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {otherComparisons.slice(0, 6).map((comp, idx) => (
              <Link
                key={comp.slug}
                href={`/compare/shopify-vs-${comp.slug}`}
                className={`group p-6 ${idx % 3 < 2 ? "lg:border-r" : ""} ${idx % 2 === 0 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b last:border-b-0 hover:bg-[#111] transition-colors`}
              >
                <h3 className="font-semibold group-hover:text-[#10b981] transition-colors mb-1">
                  Shopify vs {comp.platformName}
                </h3>
                <p className="text-sm text-[#888] line-clamp-2">{comp.description}</p>
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
            Ready to try Shopify?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Start your Shopify store today. Free trial available with no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.shopify.com/free-trial?ref=adsx"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn-primary"
            >
              Start Free Shopify Trial
            </a>
            <Link href="/tools/free-audit" className="cta-btn">
              Get Your Free Audit
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
