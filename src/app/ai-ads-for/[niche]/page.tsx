import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrutalistLayout } from "@/components/brutalist-layout";
import {
  getAllAiAdsNiches,
  getAiAdsNicheBySlug,
} from "@/lib/ai-ads-niches";
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
  return getAllAiAdsNiches().map((n) => ({ niche: n.slug }));
}

interface PageProps {
  params: Promise<{ niche: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { niche: slug } = await params;
  const niche = getAiAdsNicheBySlug(slug);

  if (!niche) {
    return { title: "AI Ads Niche Not Found" };
  }

  return createPageMetadata({
    title: `AI Ads for ${niche.nicheName} Brands | ChatGPT, Perplexity & Gemini Advertising`,
    description: niche.description,
    path: `/ai-ads-for/${slug}`,
    keywords: niche.keywords,
  });
}

export default async function AiAdsNichePage({ params }: PageProps) {
  const { niche: slug } = await params;
  const niche = getAiAdsNicheBySlug(slug);

  if (!niche) {
    notFound();
  }

  const otherNiches = getAllAiAdsNiches()
    .filter((n) => n.slug !== slug)
    .slice(0, 8);

  const relatedArticles = getRelatedArticlesForPage(niche.keywords, niche.nicheName);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "AI Ads by Industry", path: "/ai-ads-for" },
    { name: niche.nicheName, path: `/ai-ads-for/${slug}` },
  ];

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
      <SchemaScript schema={createFAQSchema(niche.faqs)} />
      <BrutalistLayout>
        {/* Hero */}
        <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
          <div
            className="text-xs tracking-widest text-[#888] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Link href="/" className="hover:text-[#EAEAEA]">HOME</Link>
            <span className="mx-2">/</span>
            <Link href="/ai-ads-for" className="hover:text-[#EAEAEA]">AI ADS BY INDUSTRY</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">{niche.nicheName.toUpperCase()}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="text-xs tracking-widest px-3 py-1 border border-[#10b981] text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              AI ADVERTISING
            </span>
            <span
              className="text-xs tracking-widest px-3 py-1 border border-[#333] text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {niche.marketSize}
            </span>
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
            {niche.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            {niche.subheadline}
          </p>

          {/* Stat Badges */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="border border-[#333] px-4 py-3">
              <div
                className="text-[10px] tracking-widest text-[#888] mb-1"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                MARKET SIZE
              </div>
              <div
                className="text-lg text-[#10b981]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {niche.marketSize}
              </div>
            </div>
            <div className="border border-[#333] px-4 py-3">
              <div
                className="text-[10px] tracking-widest text-[#888] mb-1"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                EST. AI AD SPEND
              </div>
              <div
                className="text-lg text-[#10b981]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {niche.aiAdSpendEstimate}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="cta-btn cta-btn-primary">
              Get Your AI Ads Strategy
            </Link>
            <Link href="/ai-ads-for" className="cta-btn">
              Browse All Industries
            </Link>
          </div>
        </div>

        {/* Description */}
        <div className="border-b border-[#333] p-8 md:p-16">
          <p className="text-[#ccc] text-lg leading-relaxed max-w-3xl">
            {niche.description}
          </p>
        </div>

        {/* Platform Breakdown */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              AI PLATFORM BREAKDOWN
            </div>
          </div>
          {niche.platforms.map((platform, idx) => (
            <div
              key={platform.name}
              className={`p-6 ${idx < niche.platforms.length - 1 ? "border-b" : ""} border-[#333]`}
            >
              <div className="flex items-start gap-4">
                <span
                  className="text-[#10b981] text-xs shrink-0 mt-1"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{platform.name}</h3>
                    <span
                      className={`text-[10px] tracking-widest px-2 py-0.5 border ${
                        platform.relevance === "Very High"
                          ? "border-[#10b981] text-[#10b981]"
                          : platform.relevance === "High"
                          ? "border-[#3b82f6] text-[#3b82f6]"
                          : "border-[#888] text-[#888]"
                      }`}
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {platform.relevance.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-[#888]">{platform.strategy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Target Queries Consumers Ask */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              QUERIES CONSUMERS ASK AI ABOUT {niche.nicheName.toUpperCase()}
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="space-y-4">
              {niche.targetQueries.map((query, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <span
                    className="text-[#10b981] text-xs shrink-0 mt-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Q{idx + 1}
                  </span>
                  <p className="text-[#ccc] italic">&ldquo;{query}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ad Formats That Work */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              AD FORMATS THAT WORK FOR {niche.nicheName.toUpperCase()}
            </div>
          </div>
          <div className="grid md:grid-cols-3">
            {niche.adFormats.map((format, idx) => (
              <div
                key={format.format}
                className={`p-6 ${idx < niche.adFormats.length - 1 ? "md:border-r" : ""} border-b md:border-b-0 border-[#333]`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-[#10b981] shrink-0">&#9654;</span>
                  <div>
                    <h3 className="font-semibold mb-1">{format.format}</h3>
                    <p className="text-sm text-[#888] mb-2">{format.description}</p>
                    <span
                      className={`text-[10px] tracking-widest px-2 py-0.5 border ${
                        format.effectiveness === "Very High"
                          ? "border-[#10b981] text-[#10b981]"
                          : "border-[#3b82f6] text-[#3b82f6]"
                      }`}
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {format.effectiveness.toUpperCase()} EFFECTIVENESS
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mini Case Study */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              CASE STUDY
            </div>
          </div>
          <div className="p-8 md:p-12">
            <div className="max-w-3xl">
              <h3 className="font-semibold text-lg mb-4">{niche.caseStudy.brand}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div
                    className="text-[10px] tracking-widest text-[#f59e0b] mb-2"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    CHALLENGE
                  </div>
                  <p className="text-sm text-[#888] leading-relaxed">
                    {niche.caseStudy.challenge}
                  </p>
                </div>
                <div>
                  <div
                    className="text-[10px] tracking-widest text-[#10b981] mb-2"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    RESULT
                  </div>
                  <p className="text-sm text-[#10b981] leading-relaxed">
                    {niche.caseStudy.result}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {niche.tips.length} TIPS FOR AI ADVERTISING IN {niche.nicheName.toUpperCase()}
            </div>
          </div>
          <div className="p-6 md:p-8">
            <ol className="space-y-4">
              {niche.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span
                    className="text-[#10b981] text-xs shrink-0 mt-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[#ccc]">{tip}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* FAQs */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              FREQUENTLY ASKED QUESTIONS
            </div>
          </div>
          {niche.faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`p-6 ${idx < niche.faqs.length - 1 ? "border-b" : ""} border-[#333]`}
            >
              <h3 className="font-semibold mb-3">{faq.question}</h3>
              <p className="text-sm text-[#888] leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Related Niches */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              MORE AI ADS BY INDUSTRY
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            {otherNiches.map((n, idx) => (
              <Link
                key={n.slug}
                href={`/ai-ads-for/${n.slug}`}
                className={`group flex items-center justify-between p-6 ${idx % 2 === 0 ? "md:border-r" : ""} border-[#333] border-b last:border-b-0 hover:bg-[#111] transition-colors`}
              >
                <div>
                  <div className="font-semibold group-hover:text-[#10b981] transition-colors">
                    AI Ads for {n.nicheName}
                  </div>
                  <div className="text-sm text-[#888] flex gap-4 mt-1">
                    <span>{n.marketSize}</span>
                    <span className="text-[#10b981]">{n.aiAdSpendEstimate}</span>
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
            Ready to advertise your {niche.nicheName.toLowerCase()} brand on AI?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Get your {niche.nicheName.toLowerCase()} products recommended in ChatGPT, Perplexity, and Gemini.
            AdsX builds your AI advertising strategy from product feed optimization to sponsored placements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/free-audit" className="cta-btn cta-btn-primary">
              Get Your Free AI Audit
            </Link>
            <Link href="/contact" className="cta-btn">
              Talk to Sales
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
