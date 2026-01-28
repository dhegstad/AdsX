"use client";

import Link from "next/link";
import { ArrowRight, Search, BarChart3, MessageSquare, FileText, Shield, TrendingUp } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import { cn } from "@/lib/utils";

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
    <ThemedLayout>
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
            <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-white/60">
              From strategy to execution, we handle everything you need to capture visibility in the AI search era.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="border-t py-24 border-neutral-200 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-xl border p-8 transition-all border-neutral-200 bg-white hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.04]"
              >
                <service.icon className="h-10 w-10 text-emerald-600 dark:text-emerald-500/70" />
                <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-neutral-600 dark:text-white/60">{service.description}</p>
                <ul className="mt-6 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-neutral-500 dark:text-white/50">
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
      <section className="border-t py-24 border-neutral-200 bg-neutral-50 dark:border-white/10 dark:bg-transparent">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Not sure where to start?
          </h2>
          <p className="mt-6 text-lg text-neutral-600 dark:text-white/60">
            Book a free strategy call and we&apos;ll help you understand your options.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-medium transition-all bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25 dark:text-black dark:hover:bg-emerald-400 dark:shadow-none"
            >
              Book a Strategy Call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </ThemedLayout>
  );
}
