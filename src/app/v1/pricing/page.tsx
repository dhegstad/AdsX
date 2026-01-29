"use client";

import Link from "next/link";
import { V1Layout } from "@/components/v1/v1-layout";

const features = [
  {
    category: "STRATEGY & AUDIT",
    items: [
      "Comprehensive AI visibility audit",
      "Competitive analysis and benchmarking",
      "Custom AI search strategy",
      "Monthly strategy reviews",
    ],
  },
  {
    category: "PLATFORM COVERAGE",
    items: [
      "ChatGPT optimization",
      "Google Gemini visibility",
      "Claude brand positioning",
      "Perplexity optimization",
    ],
  },
  {
    category: "EXECUTION",
    items: [
      "Content optimization for LLMs",
      "Sponsored placement management",
      "Dedicated account strategist",
      "Slack or email support",
    ],
  },
  {
    category: "ANALYTICS",
    items: [
      "Real-time tracking dashboard",
      "Share of voice monitoring",
      "Monthly performance reports",
      "Competitor tracking",
    ],
  },
];

const comparison = [
  { item: "Multi-platform AI tracking", adsx: true, diy: false },
  { item: "ChatGPT Ads early access", adsx: true, diy: false },
  { item: "LLM-optimized content", adsx: true, diy: "PARTIAL" },
  { item: "Competitive share of voice", adsx: true, diy: false },
  { item: "Dedicated strategist", adsx: true, diy: false },
  { item: "Brand mention monitoring", adsx: true, diy: "MANUAL" },
];

const faqs = [
  {
    q: "What's included in the monthly fee?",
    a: "Everything: strategy, execution, content optimization, campaign management, visibility tracking, and reporting.",
  },
  {
    q: "How long until we see results?",
    a: "Most clients see initial improvements within 4-6 weeks. Significant results typically emerge within 3 months.",
  },
  {
    q: "What's the minimum commitment?",
    a: "We require a 3-month minimum. After that, continue month-to-month with 30 days notice to cancel.",
  },
  {
    q: "Do you work with competitors?",
    a: "We limit engagements to one client per direct competitive category to avoid conflicts.",
  },
];

export default function V1PricingPage() {
  return (
    <V1Layout>
      {/* Hero */}
      <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
        <div
          className="text-[10px] tracking-widest text-[#888] mb-4"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          SECTION: PRICING
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
          Simple,<br />transparent
        </h1>
        <p className="mt-6 max-w-2xl text-[#888] text-lg">
          One plan. Everything included. No hidden fees or surprise charges.
        </p>
      </div>

      {/* Price Card */}
      <div className="border-b border-[#333] p-8 md:p-16">
        <div className="max-w-3xl mx-auto">
          <div className="border border-[#10b981] bg-[#10b981]/5 p-8 md:p-12">
            <div
              className="text-[10px] tracking-widest text-[#10b981] mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              FULL SERVICE PLAN
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span
                className="text-5xl md:text-7xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                $4,500
              </span>
              <span className="text-[#888]" style={{ fontFamily: "var(--font-mono)" }}>
                /MONTH
              </span>
            </div>
            <p className="text-[#888] mb-8">
              Full-service AI search advertising for growth-focused brands.
            </p>
            <Link href="/v1/contact" className="cta-btn cta-btn-primary">
              Get Started
            </Link>
            <p
              className="mt-6 text-[10px] text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              3-MONTH MINIMUM, THEN MONTH-TO-MONTH
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="border-b border-[#333]">
        <div className="p-8 border-b border-[#333]">
          <h2
            className="text-2xl uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What&apos;s Included
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          {features.map((section) => (
            <div key={section.category} className="border-r border-b border-[#333] p-6">
              <div
                className="text-[10px] tracking-widest text-[#10b981] mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {section.category}
              </div>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#888]">
                    <span className="text-[#10b981]">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="border-b border-[#333]">
        <div className="p-8 border-b border-[#333]">
          <h2
            className="text-2xl uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            AdsX vs DIY
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#333]">
                <th
                  className="text-left p-4 text-[10px] tracking-widest text-[#888]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  CAPABILITY
                </th>
                <th
                  className="text-center p-4 text-[10px] tracking-widest text-[#10b981]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  WITH ADSX
                </th>
                <th
                  className="text-center p-4 text-[10px] tracking-widest text-[#888]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  DIY
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.item} className="border-b border-[#333]">
                  <td className="p-4 text-sm text-[#888]">{row.item}</td>
                  <td className="p-4 text-center">
                    {row.adsx === true ? (
                      <span className="text-[#10b981]">&#10003;</span>
                    ) : (
                      <span className="text-[#888]">{row.adsx}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {row.diy === true ? (
                      <span className="text-[#10b981]">&#10003;</span>
                    ) : row.diy === false ? (
                      <span className="text-[#333]">—</span>
                    ) : (
                      <span className="text-[#888] text-[10px]" style={{ fontFamily: "var(--font-mono)" }}>
                        {row.diy}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="border-b border-[#333]">
        <div className="p-8 border-b border-[#333]">
          <h2
            className="text-2xl uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            FAQ
          </h2>
        </div>
        <div className="grid md:grid-cols-2">
          {faqs.map((faq, i) => (
            <div key={faq.q} className="p-6 border-r border-b border-[#333]">
              <div
                className="text-[10px] tracking-widest text-[#888] mb-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Q{String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-sm text-[#888]">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="p-8 md:p-16 text-center">
        <h2
          className="text-2xl md:text-3xl uppercase mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Ready to Start?
        </h2>
        <p className="text-[#888] mb-8 max-w-lg mx-auto">
          Book a call to get your free AI visibility audit.
        </p>
        <Link href="/v1/contact" className="cta-btn cta-btn-primary">
          Get Your Free Audit
        </Link>
      </div>
    </V1Layout>
  );
}
