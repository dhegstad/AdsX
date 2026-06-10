import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { RoasCalculator } from "@/components/roas-calculator";
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
  "roas calculator",
  "break-even roas calculator",
  "facebook ads roas calculator",
  "target roas",
  "return on ad spend calculator",
  "ecommerce roas calculator",
  "break even roas formula",
];

const FAQS = [
  {
    question: "How do you calculate ROAS?",
    answer:
      "ROAS (return on ad spend) equals revenue generated from ads divided by the amount spent on those ads. If you spend $5,000 and generate $15,000 in attributed sales, your ROAS is 3.0x. ROAS is a revenue ratio, not a profit ratio — it does not account for your product margin, so a 'good' ROAS on paper can still lose money.",
  },
  {
    question: "What is break-even ROAS?",
    answer:
      "Break-even ROAS is the ROAS at which ad-driven revenue exactly covers your cost of goods plus the ad spend — zero profit, zero loss. The formula is 1 divided by your gross profit margin (as a decimal). At a 40% margin, break-even ROAS is 1 / 0.40 = 2.5x. Any ROAS above that is profitable; anything below loses money on every order.",
  },
  {
    question: "What is a good ROAS for ecommerce?",
    answer:
      "There is no universal 'good' ROAS — it depends entirely on your margin. A store with 70% margins is profitable at 1.5x ROAS, while a store with 25% margins needs 4x or more just to break even. Calculate your break-even ROAS first, then target a ROAS comfortably above it (most healthy DTC brands aim for 1.5x to 2x their break-even point) to fund overhead and growth.",
  },
  {
    question: "What is the difference between ROAS and MER?",
    answer:
      "ROAS is platform-reported revenue divided by spend on a single channel, and it overstates results because platforms claim credit for sales they only assisted. MER (marketing efficiency ratio) is total store revenue divided by total ad spend across all channels — a blended, deduplicated view that can't double-count. Scale decisions are safer when made on MER; ROAS is best for relative comparisons within one platform.",
  },
  {
    question: "Why is my ROAS high but my profit low?",
    answer:
      "Three common reasons: thin margins (a 3x ROAS at a 30% margin barely breaks even), platform over-attribution (Meta and Google both claim the same conversion, inflating reported ROAS), and retargeting that harvests sales you'd have gotten organically. Always validate platform ROAS against blended MER and your actual contribution margin before trusting it.",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "ROAS Calculator: Break-Even & Profit From Ad Spend | AdsX",
  description:
    "Free ROAS calculator. Enter ad spend, revenue, and margin to instantly see your ROAS, break-even ROAS, net profit, ROI, and blended MER — and whether your ads actually make money.",
  path: "/tools/roas-calculator",
  keywords: KEYWORDS,
});

export default function RoasCalculatorPage() {
  const relatedArticles = getRelatedArticlesForPage(KEYWORDS, "ROAS calculator", 3);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools/free-audit" },
    { name: "ROAS Calculator", path: "/tools/roas-calculator" },
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ROAS Calculator",
    description:
      "Calculate ROAS, break-even ROAS, net profit, ROI, and blended MER from your ad spend, revenue, and margin.",
    url: "https://www.adsx.com/tools/roas-calculator",
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
            <span className="text-[#10b981]">ROAS CALCULATOR</span>
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
            ROAS Calculator
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            ROAS alone doesn&apos;t tell you if your ads make money — your margin does. Enter your
            numbers below to see your ROAS, your break-even ROAS, and the actual profit your ad
            spend produces.
          </p>
        </div>

        {/* Calculator */}
        <div className="p-6 md:p-12 border-b border-[#333]">
          <RoasCalculator />
          <p className="text-xs text-[#666] mt-4 max-w-2xl">
            Estimates only. Platform-reported revenue overstates true incremental sales — validate
            against blended MER and your real contribution margin before making scaling decisions.
          </p>
        </div>

        {/* The formulas */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              THE FORMULAS
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            <div className="p-8 border-b md:border-b-0 md:border-r border-[#333]">
              <div className="text-[#10b981] text-sm mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                ROAS
              </div>
              <div className="text-xl text-[#EAEAEA] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                Revenue from ads ÷ Ad spend
              </div>
              <p className="text-sm text-[#888] leading-relaxed">
                A pure revenue ratio. $15,000 in sales on $5,000 of spend is a 3.0x ROAS. It says
                nothing about profit on its own.
              </p>
            </div>
            <div className="p-8">
              <div className="text-[#10b981] text-sm mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                BREAK-EVEN ROAS
              </div>
              <div className="text-xl text-[#EAEAEA] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                1 ÷ Gross profit margin
              </div>
              <p className="text-sm text-[#888] leading-relaxed">
                At a 40% margin you break even at 2.5x. This is the single most important number
                for setting a target ROAS — beat it and you profit, miss it and you lose money.
              </p>
            </div>
          </div>
        </div>

        {/* Go deeper — internal links to the new cluster */}
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
              { href: "/blog/facebook-ads-break-even-roas-calculator", label: "Facebook Ads Break-Even ROAS, Explained" },
              { href: "/blog/target-roas-from-profit-margin-formula", label: "Set Target ROAS From Your Profit Margin" },
              { href: "/blog/blended-roas-vs-platform-roas-reconciliation", label: "Blended ROAS vs Platform ROAS" },
              { href: "/blog/mer-vs-roas-which-metric-to-scale-on", label: "MER vs ROAS: Which to Scale On" },
              { href: "/blog/cpa-to-roas-conversion-cheat-sheet", label: "CPA to ROAS Conversion Cheat Sheet" },
              { href: "/blog/roas-calculator-with-shipping-discounts-returns", label: "True ROAS After Shipping, Discounts & Returns" },
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
            Ads below break-even?
          </h2>
          <p className="text-[#888] max-w-xl mx-auto mb-6">
            Get a free audit of your paid media and AI search visibility — we&apos;ll show you where
            the margin is leaking.
          </p>
          <Link
            href="/tools/free-audit"
            className="inline-block bg-[#10b981] text-black font-bold px-8 py-4 hover:bg-[#0ea371] transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            GET A FREE AUDIT →
          </Link>
        </div>
      </BrutalistLayout>
    </>
  );
}
