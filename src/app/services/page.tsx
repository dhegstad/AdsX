import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { ServiceSchema } from "@/components/seo/structured-data";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "AI Search Advertising Services | AdsX",
  description:
    "Full-stack AI search advertising services. From strategy to execution, we handle everything you need to capture visibility in the AI search era.",
  path: "/services",
});

const services = [
  {
    title: "AI Search Audit",
    description: "Comprehensive analysis of your brand's current visibility across AI search platforms. We map how you appear (or don't) in ChatGPT, Perplexity, Claude, and other AI assistants.",
    features: ["Brand mention analysis", "Competitor benchmarking", "Query gap identification", "Priority recommendations"],
  },
  {
    title: "ChatGPT Ads",
    description: "Early access to ChatGPT's new advertising platform. We manage sponsored placements, conversational ads, and brand chat integrations.",
    features: ["Sponsored placements", "Conversational ads", "Brand chat setup", "Performance optimization"],
  },
  {
    title: "Content Optimization",
    description: "Structure your content to be surfaced by large language models. We optimize for AI retrieval without sacrificing your existing SEO.",
    features: ["LLM-optimized content", "Fact integration", "Citation building", "Authority signals"],
  },
  {
    title: "Visibility Tracking",
    description: "Monitor your brand mentions across AI platforms in real-time. Track share of voice, sentiment, and competitive positioning.",
    features: ["Real-time monitoring", "Share of voice tracking", "Sentiment analysis", "Competitive intelligence"],
  },
  {
    title: "Brand Protection",
    description: "Ensure accurate representation in AI responses. We identify and correct misinformation, and protect your brand narrative.",
    features: ["Misinformation detection", "Correction workflows", "Narrative protection", "Crisis monitoring"],
  },
  {
    title: "Performance Analytics",
    description: "Measure ROI from AI search channels with custom dashboards. Track traffic, leads, and revenue attribution.",
    features: ["Custom dashboards", "Attribution modeling", "ROI tracking", "Monthly reporting"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <ServiceSchema />
      <BrutalistLayout>
        {/* Hero */}
        <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
          <div
            className="text-xs tracking-widest text-[#888] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Link href="/" className="hover:text-[#EAEAEA]">HOME</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">SERVICES</span>
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
            Full-Stack AI Search<br />Advertising
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            From strategy to execution, we handle everything you need to capture visibility in the AI search era.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/tools/free-audit" className="cta-btn cta-btn-primary">
              Get Your Free Audit
            </Link>
            <Link href="/contact" className="cta-btn">
              Talk to Sales
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              OUR SERVICES
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <div
                key={service.title}
                className={`p-6 ${idx % 3 !== 2 ? "lg:border-r" : ""} ${idx % 2 !== 1 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b`}
              >
                <span
                  className="text-[#10b981] text-xs"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-[#888]">{service.description}</p>
                <ul className="mt-6 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-[#888]">
                      <span className="h-1 w-1 bg-[#10b981]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 md:p-16 text-center bg-[#0c0c0c]">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Not sure where to start?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Book a free strategy call and we&apos;ll help you understand your options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="cta-btn cta-btn-primary">
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
