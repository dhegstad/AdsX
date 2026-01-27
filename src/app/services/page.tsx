import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search, BarChart3, MessageSquare, FileText, Users, Shield, Zap, TrendingUp } from "lucide-react";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Services",
  description: "Full-service AI search advertising. Strategy, execution, and analytics for ChatGPT, Perplexity, Claude, and emerging AI platforms.",
};

const services = [
  {
    icon: Search,
    title: "AI Search Audit",
    description: "Comprehensive analysis of your brand's current visibility across AI search platforms. We map how you appear (or don't) in ChatGPT, Perplexity, Claude, and other AI assistants.",
    features: ["Brand mention analysis", "Competitor benchmarking", "Query gap identification", "Priority recommendations"],
  },
  {
    icon: MessageSquare,
    title: "ChatGPT Ads",
    description: "Early access to ChatGPT's new advertising platform. We manage sponsored placements, conversational ads, and brand chat integrations.",
    features: ["Sponsored placements", "Conversational ads", "Brand chat setup", "Performance optimization"],
  },
  {
    icon: FileText,
    title: "Content Optimization",
    description: "Structure your content to be surfaced by large language models. We optimize for AI retrieval without sacrificing your existing SEO.",
    features: ["LLM-optimized content", "Fact integration", "Citation building", "Authority signals"],
  },
  {
    icon: BarChart3,
    title: "Visibility Tracking",
    description: "Monitor your brand mentions across AI platforms in real-time. Track share of voice, sentiment, and competitive positioning.",
    features: ["Real-time monitoring", "Share of voice tracking", "Sentiment analysis", "Competitive intelligence"],
  },
  {
    icon: Shield,
    title: "Brand Protection",
    description: "Ensure accurate representation in AI responses. We identify and correct misinformation, and protect your brand narrative.",
    features: ["Misinformation detection", "Correction workflows", "Narrative protection", "Crisis monitoring"],
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description: "Measure ROI from AI search channels with custom dashboards. Track traffic, leads, and revenue attribution.",
    features: ["Custom dashboards", "Attribution modeling", "ROI tracking", "Monthly reporting"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Full-stack AI search
              <br />
              <span className="gradient-text">advertising</span>
            </h1>
            <p className="mt-6 text-lg text-white/60 sm:text-xl">
              From strategy to execution, we handle everything you need to capture visibility in the AI search era.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-emerald-500/30 hover:bg-white/[0.04]"
              >
                <service.icon className="h-10 w-10 text-emerald-500/70" />
                <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-white/60">{service.description}</p>
                <ul className="mt-6 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-white/50">
                      <span className="h-1 w-1 rounded-full bg-emerald-500/50" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Not sure where to start?
          </h2>
          <p className="mt-6 text-lg text-white/60">
            Book a free strategy call and we&apos;ll help you understand your options.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 text-base font-medium text-black transition-all hover:bg-emerald-400"
            >
              Book a Strategy Call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
