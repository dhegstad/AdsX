import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent pricing for AI search advertising. Choose the plan that fits your growth stage.",
};

const plans = [
  {
    name: "Starter",
    price: "$5,000",
    period: "/month",
    description: "For brands ready to establish AI search presence",
    features: [
      "AI search audit",
      "1 platform focus",
      "Monthly optimization",
      "Basic visibility tracking",
      "Email support",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Growth",
    price: "$12,000",
    period: "/month",
    description: "For brands scaling their AI search strategy",
    features: [
      "Everything in Starter",
      "3 platform coverage",
      "ChatGPT Ads management",
      "Weekly optimization",
      "Advanced analytics",
      "Dedicated strategist",
      "Slack support",
    ],
    cta: "Get Started",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large brands with complex needs",
    features: [
      "Everything in Growth",
      "All platform coverage",
      "Custom integrations",
      "Dedicated team",
      "24/7 support",
      "Quarterly strategy reviews",
      "Brand protection suite",
    ],
    cta: "Contact Sales",
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Transparent <span className="gradient-text">pricing</span>
            </h1>
            <p className="mt-6 text-lg text-white/60 sm:text-xl">
              Choose the plan that matches your growth stage. All plans include strategy, execution, and reporting.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-8 ${
                  plan.featured
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                {plan.featured && (
                  <div className="mb-4 inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-400">
                    Most popular
                  </div>
                )}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="ml-1 text-white/50">{plan.period}</span>
                </div>
                <p className="mt-4 text-white/60">{plan.description}</p>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-emerald-500/70" />
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-8 block rounded-lg py-3 text-center font-medium transition-all ${
                    plan.featured
                      ? "bg-emerald-500 text-black hover:bg-emerald-400"
                      : "border border-white/20 hover:bg-white/5 hover:border-white/30"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight">Common questions</h2>
          <div className="mt-12 space-y-8">
            {[
              {
                q: "What's included in the monthly fee?",
                a: "Everything: strategy, execution, content optimization, campaign management, and reporting. No hidden fees or surprise charges.",
              },
              {
                q: "How long until we see results?",
                a: "Most clients see initial improvements within 4-6 weeks. Significant results typically emerge within 3 months as our optimizations compound.",
              },
              {
                q: "What's the minimum commitment?",
                a: "We require a 3-month minimum to give our strategies time to take effect. After that, you can cancel anytime with 30 days notice.",
              },
              {
                q: "Do you work with competitors in the same space?",
                a: "We limit engagements to one client per direct competitive category to avoid conflicts of interest.",
              },
            ].map((faq) => (
              <div key={faq.q}>
                <h3 className="text-lg font-semibold">{faq.q}</h3>
                <p className="mt-2 text-white/60">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
