import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrutalistLayout } from "@/components/brutalist-layout";
import {
  getAllProfitCalculators,
  getProfitCalculatorBySlug,
} from "@/lib/profit-calculators";
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
  return getAllProfitCalculators().map((c) => ({ niche: c.slug }));
}

interface PageProps {
  params: Promise<{ niche: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { niche: slug } = await params;
  const calculator = getProfitCalculatorBySlug(slug);

  if (!calculator) {
    return { title: "Calculator Not Found" };
  }

  return createPageMetadata({
    title: `${calculator.headline} | AdsX`,
    description: calculator.description,
    path: `/tools/shopify-${slug}-profit-calculator`,
    keywords: calculator.keywords,
  });
}

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default async function ProfitCalculatorPage({ params }: PageProps) {
  const { niche: slug } = await params;
  const calculator = getProfitCalculatorBySlug(slug);

  if (!calculator) {
    notFound();
  }

  const otherCalculators = getAllProfitCalculators().filter(
    (c) => c.slug !== slug
  );
  const relatedArticles = getRelatedArticlesForPage(calculator.keywords, calculator.nicheName);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools/free-audit" },
    { name: calculator.headline, path: `/tools/shopify-${slug}-profit-calculator` },
  ];

  // Calculate projections
  const monthlyRevenue = calculator.avgProductPrice * calculator.avgOrdersPerMonth;
  const monthlyCOGS = calculator.avgCOGS * calculator.avgOrdersPerMonth;
  const monthlyShipping = calculator.avgShippingCost * calculator.avgOrdersPerMonth;
  const paymentProcessing = monthlyRevenue * 0.029 + calculator.avgOrdersPerMonth * 0.3;
  const totalMonthlyCosts = monthlyCOGS + monthlyShipping + paymentProcessing + calculator.shopifyMonthlyFee + calculator.estimatedAdSpend;
  const monthlyProfit = monthlyRevenue - totalMonthlyCosts;
  const profitMargin = (monthlyProfit / monthlyRevenue) * 100;

  // Scenario projections
  const scenarios = [
    {
      label: "LOW",
      margin: calculator.margins.low,
      profit: monthlyRevenue * (calculator.margins.low / 100),
      annual: monthlyRevenue * (calculator.margins.low / 100) * 12,
    },
    {
      label: "MID",
      margin: calculator.margins.mid,
      profit: monthlyRevenue * (calculator.margins.mid / 100),
      annual: monthlyRevenue * (calculator.margins.mid / 100) * 12,
    },
    {
      label: "HIGH",
      margin: calculator.margins.high,
      profit: monthlyRevenue * (calculator.margins.high / 100),
      annual: monthlyRevenue * (calculator.margins.high / 100) * 12,
    },
  ];

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
      <SchemaScript schema={createFAQSchema(calculator.faqs)} />
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
            <span className="text-[#10b981]">{calculator.nicheName.toUpperCase()} PROFIT CALCULATOR</span>
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
            {calculator.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            {calculator.description}
          </p>
        </div>

        {/* Key Metrics Overview */}
        <div className="border-b border-[#333] bg-[#0c0c0c]">
          <div className="grid grid-cols-2 md:grid-cols-4 text-center">
            <div className="p-6 border-r border-[#333]">
              <div
                className="text-2xl md:text-3xl font-bold text-[#10b981]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {formatCurrency(calculator.avgProductPrice)}
              </div>
              <div
                className="text-xs tracking-widest text-[#888] mt-1"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                AVG PRODUCT PRICE
              </div>
            </div>
            <div className="p-6 border-r border-[#333]">
              <div
                className="text-2xl md:text-3xl font-bold text-[#EAEAEA]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {calculator.avgOrdersPerMonth}
              </div>
              <div
                className="text-xs tracking-widest text-[#888] mt-1"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                ORDERS/MONTH
              </div>
            </div>
            <div className="p-6 border-r border-[#333]">
              <div
                className="text-2xl md:text-3xl font-bold text-[#10b981]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {formatCurrency(monthlyRevenue)}
              </div>
              <div
                className="text-xs tracking-widest text-[#888] mt-1"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                MONTHLY REVENUE
              </div>
            </div>
            <div className="p-6">
              <div
                className="text-2xl md:text-3xl font-bold text-[#10b981]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {profitMargin.toFixed(1)}%
              </div>
              <div
                className="text-xs tracking-widest text-[#888] mt-1"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                EST. PROFIT MARGIN
              </div>
            </div>
          </div>
        </div>

        {/* Cost Breakdown Table */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              COST BREAKDOWN
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
                    EXPENSE ITEM
                  </th>
                  <th
                    className="text-right py-4 px-6 text-xs tracking-widest text-[#888]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    ESTIMATED COST
                  </th>
                </tr>
              </thead>
              <tbody>
                {calculator.breakdownItems.map((item, idx) => (
                  <tr
                    key={item.item}
                    className={`${idx % 2 === 0 ? "bg-[#0a0a0a]" : ""} border-b border-[#333] last:border-b-0`}
                  >
                    <td className="py-4 px-6 text-[#ccc]">{item.item}</td>
                    <td
                      className="py-4 px-6 text-right text-[#10b981]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {item.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Profit Projection */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              MONTHLY P&amp;L ESTIMATE ({calculator.avgOrdersPerMonth} ORDERS/MONTH)
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-[#333]">
                  <td className="py-3 px-6 text-[#ccc]">Monthly Revenue</td>
                  <td className="py-3 px-6 text-right text-[#10b981]" style={{ fontFamily: "var(--font-mono)" }}>
                    {formatCurrency(monthlyRevenue)}
                  </td>
                </tr>
                <tr className="border-b border-[#333] bg-[#0a0a0a]">
                  <td className="py-3 px-6 text-[#888]">Cost of Goods Sold</td>
                  <td className="py-3 px-6 text-right text-[#ef4444]" style={{ fontFamily: "var(--font-mono)" }}>
                    -{formatCurrency(monthlyCOGS)}
                  </td>
                </tr>
                <tr className="border-b border-[#333]">
                  <td className="py-3 px-6 text-[#888]">Shipping Costs</td>
                  <td className="py-3 px-6 text-right text-[#ef4444]" style={{ fontFamily: "var(--font-mono)" }}>
                    -{formatCurrency(monthlyShipping)}
                  </td>
                </tr>
                <tr className="border-b border-[#333] bg-[#0a0a0a]">
                  <td className="py-3 px-6 text-[#888]">Payment Processing (~2.9% + $0.30)</td>
                  <td className="py-3 px-6 text-right text-[#ef4444]" style={{ fontFamily: "var(--font-mono)" }}>
                    -{formatCurrency(paymentProcessing)}
                  </td>
                </tr>
                <tr className="border-b border-[#333]">
                  <td className="py-3 px-6 text-[#888]">Shopify Subscription</td>
                  <td className="py-3 px-6 text-right text-[#ef4444]" style={{ fontFamily: "var(--font-mono)" }}>
                    -{formatCurrency(calculator.shopifyMonthlyFee)}
                  </td>
                </tr>
                <tr className="border-b border-[#333] bg-[#0a0a0a]">
                  <td className="py-3 px-6 text-[#888]">Advertising & Marketing</td>
                  <td className="py-3 px-6 text-right text-[#ef4444]" style={{ fontFamily: "var(--font-mono)" }}>
                    -{formatCurrency(calculator.estimatedAdSpend)}
                  </td>
                </tr>
                <tr className="border-t-2 border-[#10b981]">
                  <td className="py-4 px-6 font-bold text-[#EAEAEA] uppercase text-lg">Estimated Monthly Profit</td>
                  <td className="py-4 px-6 text-right font-bold text-[#10b981] text-lg" style={{ fontFamily: "var(--font-mono)" }}>
                    {formatCurrency(monthlyProfit)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Scenario Projections */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              PROFIT SCENARIOS (LOW / MID / HIGH)
            </div>
          </div>
          <div className="grid grid-cols-3">
            {scenarios.map((scenario, idx) => (
              <div
                key={scenario.label}
                className={`p-6 text-center ${idx < 2 ? "border-r border-[#333]" : ""}`}
              >
                <div
                  className="text-xs tracking-widest text-[#888] mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {scenario.label} SCENARIO
                </div>
                <div
                  className="text-xs tracking-widest text-[#888] mb-3"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {scenario.margin}% NET MARGIN
                </div>
                <div
                  className="text-2xl md:text-3xl font-bold text-[#10b981] mb-1"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {formatCurrency(scenario.profit)}
                </div>
                <div
                  className="text-xs text-[#888]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  /MONTH
                </div>
                <div className="mt-3 pt-3 border-t border-[#333]">
                  <div
                    className="text-lg font-bold text-[#EAEAEA]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {formatCurrency(scenario.annual)}
                  </div>
                  <div
                    className="text-xs text-[#888]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    /YEAR
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Margin Visualization */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              MARGIN RANGE
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="relative h-8 bg-[#1a1a1a] border border-[#333]">
              <div
                className="absolute top-0 left-0 h-full bg-[#10b981]/20 border-r border-[#10b981]"
                style={{ width: `${calculator.margins.high}%` }}
              >
                <div
                  className="absolute top-0 left-0 h-full bg-[#10b981]/40 border-r border-[#10b981]"
                  style={{ width: `${(calculator.margins.mid / calculator.margins.high) * 100}%` }}
                >
                  <div
                    className="absolute top-0 left-0 h-full bg-[#10b981]/60"
                    style={{ width: `${(calculator.margins.low / calculator.margins.mid) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-[#888]" style={{ fontFamily: "var(--font-mono)" }}>
                LOW: {calculator.margins.low}%
              </span>
              <span className="text-xs text-[#10b981]" style={{ fontFamily: "var(--font-mono)" }}>
                MID: {calculator.margins.mid}%
              </span>
              <span className="text-xs text-[#EAEAEA]" style={{ fontFamily: "var(--font-mono)" }}>
                HIGH: {calculator.margins.high}%
              </span>
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
              TIPS TO MAXIMIZE {calculator.nicheName.toUpperCase()} PROFITS
            </div>
          </div>
          <div className="divide-y divide-[#333]">
            {calculator.tips.map((tip, idx) => (
              <div key={tip} className="p-6 flex items-start gap-4">
                <div
                  className="shrink-0 w-8 h-8 flex items-center justify-center border border-[#10b981] text-[#10b981] text-xs"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {idx + 1}
                </div>
                <p className="text-[#ccc] leading-relaxed">{tip}</p>
              </div>
            ))}
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
            {calculator.faqs.map((faq) => (
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

        {/* Other Calculators */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              OTHER PROFIT CALCULATORS
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {otherCalculators.slice(0, 6).map((calc, idx) => (
              <Link
                key={calc.slug}
                href={`/tools/shopify-${calc.slug}-profit-calculator`}
                className={`group p-6 ${idx % 3 < 2 ? "lg:border-r" : ""} ${idx % 2 === 0 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b last:border-b-0 hover:bg-[#111] transition-colors`}
              >
                <h3 className="font-semibold group-hover:text-[#10b981] transition-colors mb-1">
                  {calc.nicheName} Profit Calculator
                </h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-[#10b981]" style={{ fontFamily: "var(--font-mono)" }}>
                    AVG: {formatCurrency(calc.avgProductPrice)}
                  </span>
                  <span className="text-xs text-[#888]" style={{ fontFamily: "var(--font-mono)" }}>
                    MARGIN: {calc.margins.low}-{calc.margins.high}%
                  </span>
                </div>
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
            Start your {calculator.nicheName} Shopify store
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Turn these numbers into reality. Start your Shopify store today with a free trial.
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
