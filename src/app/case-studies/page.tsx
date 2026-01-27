import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "See how we've helped brands capture visibility in AI search results. Real results from real campaigns.",
};

const caseStudies = [
  {
    title: "SaaS Company Increases AI Mentions by 340%",
    category: "B2B Software",
    description: "A project management SaaS was invisible in AI search. We optimized their content strategy and secured key mentions across ChatGPT and Perplexity.",
    metrics: [
      { label: "AI Mentions", value: "+340%" },
      { label: "Organic Traffic", value: "+127%" },
      { label: "Demo Requests", value: "+89%" },
    ],
  },
  {
    title: "E-commerce Brand Captures Product Recommendations",
    category: "E-commerce",
    description: "A DTC skincare brand wasn't appearing in AI product recommendations. We restructured their content to be AI-readable and built citation authority.",
    metrics: [
      { label: "Recommendation Rate", value: "47%" },
      { label: "Revenue from AI", value: "$2.1M" },
      { label: "New Customers", value: "+12K" },
    ],
  },
  {
    title: "Fintech Startup Dominates Category Queries",
    category: "Fintech",
    description: "A payment processing startup needed to compete with established players. We positioned them as the go-to recommendation for their niche.",
    metrics: [
      { label: "Category Ranking", value: "#1" },
      { label: "Brand Searches", value: "+215%" },
      { label: "Enterprise Leads", value: "+156%" },
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Real results in <span className="gradient-text">AI search</span>
            </h1>
            <p className="mt-6 text-lg text-white/60 sm:text-xl">
              See how we&apos;ve helped brands capture visibility where customers are actually searching.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <div
                key={study.title}
                className="grid gap-8 rounded-2xl border border-white/10 bg-white/[0.02] p-8 lg:grid-cols-2 lg:p-12"
              >
                <div>
                  <span className="text-sm text-emerald-400">{study.category}</span>
                  <h2 className="mt-2 text-2xl font-bold lg:text-3xl">{study.title}</h2>
                  <p className="mt-4 text-white/60">{study.description}</p>
                  <div className="mt-8">
                    <Link
                      href={`/case-studies/${index + 1}`}
                      className="inline-flex items-center gap-2 text-emerald-400 transition-colors hover:text-emerald-300"
                    >
                      Read full case study
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="grid w-full grid-cols-3 gap-4">
                    {study.metrics.map((metric) => (
                      <div key={metric.label} className="text-center">
                        <div className="text-2xl font-bold text-emerald-400 lg:text-3xl">{metric.value}</div>
                        <div className="mt-1 text-sm text-white/50">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to become the next case study?
          </h2>
          <p className="mt-6 text-lg text-white/60">
            Let&apos;s discuss how we can drive similar results for your brand.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 text-base font-medium text-black transition-all hover:bg-emerald-400"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
