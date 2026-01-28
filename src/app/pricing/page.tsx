"use client";

import Link from "next/link";
import { Check, ArrowRight, Zap, Users, BarChart3, Shield, MessageSquare, Clock } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import { cn } from "@/lib/utils";

const features = [
  {
    category: "Strategy & Audit",
    items: [
      "Comprehensive AI visibility audit across all platforms",
      "Competitive analysis and benchmarking",
      "Custom AI search strategy development",
      "Monthly strategy reviews and optimization",
    ],
  },
  {
    category: "Platform Coverage",
    items: [
      "ChatGPT optimization and monitoring",
      "Google Gemini / AI Mode visibility",
      "Claude (Anthropic) brand positioning",
      "Perplexity answer optimization",
    ],
  },
  {
    category: "Execution & Support",
    items: [
      "Content optimization for LLM retrieval",
      "Sponsored placement management",
      "Dedicated account strategist",
      "Slack or email support",
    ],
  },
  {
    category: "Analytics & Reporting",
    items: [
      "Real-time visibility tracking dashboard",
      "Share of voice monitoring",
      "Monthly performance reports",
      "Competitor tracking",
    ],
  },
];

const highlights = [
  { icon: Zap, text: "Full platform coverage" },
  { icon: Users, text: "Dedicated strategist" },
  { icon: BarChart3, text: "Real-time analytics" },
  { icon: Shield, text: "Brand protection" },
  { icon: MessageSquare, text: "Slack support" },
  { icon: Clock, text: "24hr response time" },
];

export default function PricingPage() {
  return (
    <ThemedLayout>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Simple, transparent <span className="gradient-text">pricing</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-white/60">
              One plan. Everything included. No hidden fees or surprise charges.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="border-t py-24 border-neutral-200 dark:border-white/10">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-b from-emerald-500/5 to-transparent p-8 md:p-12">
            {/* Price Header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-6">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Everything you need
              </div>

              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl md:text-7xl font-bold">$4,500</span>
                <span className="text-xl text-neutral-500 dark:text-white/50">/month</span>
              </div>

              <p className="mt-4 text-lg text-neutral-600 dark:text-white/60">
                Full-service AI search advertising for growth-focused brands
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 text-lg font-medium text-white hover:bg-emerald-600 dark:text-black dark:hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>

              <p className="mt-4 text-sm text-neutral-500 dark:text-white/40">
                3-month minimum commitment, then month-to-month
              </p>
            </div>

            {/* Highlights */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
              {highlights.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] px-4 py-3"
                >
                  <item.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              {features.map((section) => (
                <div key={section.category}>
                  <h3 className="font-semibold text-lg mb-4">{section.category}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-500 mt-0.5" />
                        <span className="text-neutral-700 dark:text-white/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Note */}
          <div className="mt-8 text-center">
            <p className="text-neutral-600 dark:text-white/60">
              Need custom solutions for enterprise?{" "}
              <Link href="/contact" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
                Let&apos;s talk
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* What's Included Comparison */}
      <section className="border-t py-24 border-neutral-200 dark:border-white/10">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
            What&apos;s included vs. doing it yourself
          </h2>

          <div className="rounded-2xl border border-neutral-200 dark:border-white/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-white/10">
                  <th className="text-left p-4 font-medium">Capability</th>
                  <th className="text-center p-4 font-medium text-emerald-600 dark:text-emerald-400">With AdsX</th>
                  <th className="text-center p-4 font-medium text-neutral-500 dark:text-white/50">DIY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-white/10">
                {[
                  { item: "Multi-platform AI visibility tracking", adsx: true, diy: false },
                  { item: "ChatGPT Ads early access", adsx: true, diy: false },
                  { item: "LLM-optimized content strategy", adsx: true, diy: "Partial" },
                  { item: "Competitive share of voice data", adsx: true, diy: false },
                  { item: "Dedicated strategist", adsx: true, diy: false },
                  { item: "Brand mention monitoring", adsx: true, diy: "Manual" },
                  { item: "Monthly strategy reviews", adsx: true, diy: false },
                ].map((row) => (
                  <tr key={row.item} className="bg-white dark:bg-transparent">
                    <td className="p-4 text-neutral-700 dark:text-white/70">{row.item}</td>
                    <td className="p-4 text-center">
                      {row.adsx === true ? (
                        <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mx-auto" />
                      ) : (
                        <span className="text-neutral-500">{row.adsx}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {row.diy === true ? (
                        <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mx-auto" />
                      ) : row.diy === false ? (
                        <span className="text-neutral-400 dark:text-white/30">—</span>
                      ) : (
                        <span className="text-neutral-500 dark:text-white/50 text-sm">{row.diy}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t py-24 border-neutral-200 bg-neutral-50 dark:border-white/10 dark:bg-transparent">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight">Common questions</h2>
          <div className="mt-12 space-y-8">
            {[
              {
                q: "What's included in the monthly fee?",
                a: "Everything: strategy, execution, content optimization, campaign management, visibility tracking, and reporting. No hidden fees or surprise charges.",
              },
              {
                q: "How long until we see results?",
                a: "Most clients see initial improvements within 4-6 weeks. Significant results typically emerge within 3 months as our optimizations compound.",
              },
              {
                q: "What's the minimum commitment?",
                a: "We require a 3-month minimum to give our strategies time to take effect. After that, you can continue month-to-month with 30 days notice to cancel.",
              },
              {
                q: "Do you work with competitors in the same space?",
                a: "We limit engagements to one client per direct competitive category to avoid conflicts of interest.",
              },
              {
                q: "What if I need more than what's included?",
                a: "For enterprise needs like custom integrations, dedicated teams, or 24/7 support, contact us to discuss a custom engagement.",
              },
            ].map((faq) => (
              <div key={faq.q}>
                <h3 className="text-lg font-semibold">{faq.q}</h3>
                <p className="mt-2 text-neutral-600 dark:text-white/60">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t py-24 border-neutral-200 dark:border-white/10">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to capture the AI search channel?
          </h2>
          <p className="mt-6 text-lg text-neutral-600 dark:text-white/60">
            Book a call to get your free AI visibility audit and see how your brand appears across AI platforms.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-medium transition-all bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25 dark:text-black dark:hover:bg-emerald-400 dark:shadow-none"
            >
              Get Your Free Audit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </ThemedLayout>
  );
}
