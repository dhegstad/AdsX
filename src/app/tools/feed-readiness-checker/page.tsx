import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { FeedReadinessChecker } from "@/components/feed-readiness-checker";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  SchemaScript,
} from "@/lib/seo/schemas";
import { getRelatedArticlesForPage } from "@/lib/seo/internal-linking";
import { RelatedArticles } from "@/components/related-articles";

export const revalidate = 86400;

const KEYWORDS = [
  "shopify feed readiness checker",
  "product feed quality score",
  "shopify product feed optimization",
  "google shopping feed checker",
  "ai shopping visibility",
  "product catalog feed score",
  "gtin barcode feed requirements",
];

const FAQS = [
  {
    question: "What does feed-readiness mean?",
    answer:
      "Feed-readiness is how complete and structured your product data is for the systems that consume it: Google Shopping and Performance Max, Meta Advantage+ catalogs, and AI shopping engines like ChatGPT and Perplexity. A feed-ready product has a descriptive title, a long unique description, multiple images, a GTIN/barcode, a brand, a product category, and structured attributes (color, size, material). Missing fields don't just look incomplete — they cap how often the product can be shown and how confidently an AI can recommend it.",
  },
  {
    question: "Why does incomplete product data cap ad performance?",
    answer:
      "Ad platforms match, rank, and approve products using the attributes in your feed. A missing GTIN can suppress impressions or trigger disapprovals; a thin title loses relevance in the auction; no product category means the item lands in the wrong comparison set. You can't bid your way out of a poor feed — the data quality sets the ceiling on reach before spend even enters the equation.",
  },
  {
    question: "How does feed data affect AI shopping visibility?",
    answer:
      "LLM-based shopping assistants read the same structured attributes and long-form descriptions to decide what to cite. Products with detailed descriptions, clear brand and category, and explicit color/size/material attributes are far easier for a model to match to a query and recommend with confidence. Sparse listings are effectively invisible to attribute-based AI queries like \"navy merino sweater under $100.\"",
  },
  {
    question: "What's the most important field to fix first?",
    answer:
      "Start with the fields that gate eligibility: GTIN/barcode, brand/vendor, and product category. Those unblock Shopping and PMax approval. Then invest in title structure and a 500+ character description, which drive both auction relevance and AI citation quality. Images and structured attributes round out the score.",
  },
  {
    question: "Is this checker accurate for my exact platform?",
    answer:
      "The score models the attributes Google Merchant Center, Meta catalogs, and AI shopping engines weight most heavily, so it's a reliable directional read on feed health. Exact requirements vary by category and destination — treat a high score as necessary, not sufficient, and always validate against your Merchant Center diagnostics.",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "Shopify Catalog Feed-Readiness Checker | AdsX",
  description:
    "Free tool: paste your Shopify product details to score ad & AI feed-readiness 0–100, with a per-factor breakdown and specific fixes to lift performance.",
  path: "/tools/feed-readiness-checker",
  keywords: KEYWORDS,
});

export default function FeedReadinessCheckerPage() {
  const relatedArticles = getRelatedArticlesForPage(
    KEYWORDS,
    "Shopify feed readiness checker",
    3,
  );

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools/free-audit" },
    { name: "Feed-Readiness Checker", path: "/tools/feed-readiness-checker" },
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Shopify Catalog Feed-Readiness Checker",
    description:
      "Score a Shopify product's ad and AI feed-readiness from 0–100 with a per-factor breakdown and specific fix recommendations.",
    url: "https://www.adsx.com/tools/feed-readiness-checker",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    creator: { "@type": "Organization", name: "AdsX" },
  };

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
      <SchemaScript schema={createFAQSchema(FAQS)} />
      <SchemaScript schema={webAppSchema} />
      <BrutalistLayout>
        {/* Hero */}
        <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
          <div
            className="text-xs tracking-widest text-[#888] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Link href="/" className="hover:text-[#EAEAEA]">HOME</Link>
            <span className="mx-2">/</span>
            <Link href="/tools/free-audit" className="hover:text-[#EAEAEA]">TOOLS</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">FEED-READINESS CHECKER</span>
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
            Feed-Readiness Checker
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            Your product feed is the ceiling on paid performance and AI shopping visibility. Enter a
            product&apos;s details below to score its ad and AI feed-readiness 0–100, see exactly
            which attributes pass or fail, and get specific fixes for each gap.
          </p>
        </div>

        {/* Intro: what feed-readiness is */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              WHY THIS CAPS PERFORMANCE
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            <div className="p-8 border-b md:border-b-0 md:border-r border-[#333]">
              <div className="text-[#10b981] text-sm mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                PAID ADS
              </div>
              <p className="text-sm text-[#888] leading-relaxed">
                Google Shopping, Performance Max, and Meta Advantage+ catalogs match, rank, and
                approve products from feed attributes. A missing GTIN, thin title, or absent
                category suppresses impressions and triggers disapprovals — you can&apos;t bid past
                a poor feed. Data quality sets the reach ceiling before spend enters the auction.
              </p>
            </div>
            <div className="p-8">
              <div className="text-[#10b981] text-sm mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                AI SHOPPING VISIBILITY
              </div>
              <p className="text-sm text-[#888] leading-relaxed">
                ChatGPT, Perplexity, and Gemini shopping answers read the same structured attributes
                and long descriptions to decide what to cite. Products with detailed copy, clear
                brand and category, and explicit color/size/material are easy to recommend. Sparse
                listings are invisible to queries like &quot;navy merino sweater under $100.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Checker */}
        <div className="p-6 md:p-12 border-b border-[#333]">
          <FeedReadinessChecker />
          <p className="text-xs text-[#666] mt-4 max-w-2xl">
            Directional estimate. The score models the attributes Google Merchant Center, Meta
            catalogs, and AI shopping engines weight most — always validate against your Merchant
            Center diagnostics before launching.
          </p>
        </div>

        {/* Go deeper — internal links */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              GO DEEPER
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            {[
              {
                href: "/blog/build-shopify-feed-readiness-checker",
                label: "How to Build a Shopify Feed-Readiness Checker",
              },
              {
                href: "/blog/product-catalog-ad-performance-lever",
                label: "Your Product Catalog Is the Real Ad-Performance Lever",
              },
            ].map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={`group p-6 border-b border-[#333] ${i % 2 === 0 ? "md:border-r" : ""} hover:bg-[#111] transition-colors flex items-center justify-between`}
              >
                <span className="text-[#EAEAEA] group-hover:text-[#10b981] transition-colors">
                  {l.label}
                </span>
                <span className="text-[#10b981]">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              FREQUENTLY ASKED
            </div>
          </div>
          {FAQS.map((faq) => (
            <div key={faq.question} className="p-6 md:p-8 border-b border-[#333] last:border-b-0">
              <h2 className="text-lg font-bold text-[#EAEAEA] mb-2">{faq.question}</h2>
              <p className="text-sm text-[#888] leading-relaxed max-w-3xl">{faq.answer}</p>
            </div>
          ))}
        </div>

        {relatedArticles.length > 0 && <RelatedArticles articles={relatedArticles} />}

        {/* CTA */}
        <div className="p-8 md:p-16 text-center">
          <h2
            className="uppercase mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 4vw, 40px)", lineHeight: 1 }}
          >
            Feed holding your ads back?
          </h2>
          <p className="text-[#888] max-w-xl mx-auto mb-6">
            We fix product catalogs so paid campaigns and AI shopping engines can actually surface
            your products. See how we can lift your feed and your spend efficiency.
          </p>
          <Link
            href="/services"
            className="inline-block bg-[#10b981] text-black font-bold px-8 py-4 hover:bg-[#0ea371] transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            SEE OUR SERVICES →
          </Link>
        </div>
      </BrutalistLayout>
    </>
  );
}
