"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp, ShoppingBag, Zap, Star, DollarSign } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";

const challenges = [
  {
    title: "Missing from Product Recommendations",
    description: "When shoppers ask AI for product suggestions, your competitors show up. Your products don't.",
  },
  {
    title: "Paid Ads Costs Keep Rising",
    description: "Google and Meta ads are getting more expensive. AI search is a new, untapped channel with higher intent buyers.",
  },
  {
    title: "Reviews Aren't Enough Anymore",
    description: "Great reviews help, but AI recommendations carry unique authority that influences purchase decisions.",
  },
];

const benefits = [
  {
    icon: ShoppingBag,
    title: "Product Discovery",
    description: "Get your products recommended when shoppers ask AI for buying advice.",
  },
  {
    icon: Star,
    title: "Brand Authority",
    description: "Being recommended by AI signals trust and quality to potential customers.",
  },
  {
    icon: DollarSign,
    title: "Higher AOV",
    description: "AI-referred customers typically have higher average order values and lifetime value.",
  },
  {
    icon: TrendingUp,
    title: "New Revenue Channel",
    description: "Diversify beyond paid ads with a growing organic discovery channel.",
  },
];

const stats = [
  { value: "$2.1M", label: "Revenue from AI referrals" },
  { value: "47%", label: "Recommendation rate" },
  { value: "+12K", label: "New customers acquired" },
];

const useCases = [
  "Fashion & apparel",
  "Beauty & skincare",
  "Electronics",
  "Home & garden",
  "Health & wellness",
  "Food & beverage",
  "Sports & outdoors",
  "Pet supplies",
];

export default function EcommerceIndustryPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ThemedLayout>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div
              className={cn(
                "mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm",
                isDark
                  ? "border-emerald-500/30 bg-emerald-500/10"
                  : "border-emerald-500/30 bg-emerald-500/10"
              )}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className={cn("font-medium", isDark ? "text-emerald-400" : "text-emerald-600")}>
                AI Visibility for E-commerce
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Get your products recommended by{" "}
              <span className="gradient-text">AI shopping assistants</span>
            </h1>
            <p className={cn("mt-6 text-lg sm:text-xl", isDark ? "text-white/60" : "text-neutral-600")}>
              Consumers now ask ChatGPT, Claude, and Perplexity for product recommendations.
              Make sure your brand is the answer they receive.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/tools/free-audit"
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-medium transition-all",
                  isDark
                    ? "bg-emerald-500 text-black hover:bg-emerald-400"
                    : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25"
                )}
              >
                Check Your AI Visibility
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg border px-8 py-4 text-base font-medium transition-all",
                  isDark
                    ? "border-white/20 hover:bg-white/5"
                    : "border-neutral-300 hover:bg-neutral-50"
                )}
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={cn("border-t py-16", isDark ? "border-white/10" : "border-neutral-200")}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={cn("text-4xl font-bold lg:text-5xl", isDark ? "text-emerald-400" : "text-emerald-600")}>
                  {stat.value}
                </div>
                <div className={cn("mt-2 text-sm", isDark ? "text-white/50" : "text-neutral-600")}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className={cn("border-t py-24", isDark ? "border-white/10" : "border-neutral-200")}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The e-commerce visibility challenge
            </h2>
            <p className={cn("mt-4 text-lg", isDark ? "text-white/60" : "text-neutral-600")}>
              Shopping behavior is shifting. If AI isn&apos;t recommending your products, you&apos;re invisible to a growing segment of buyers.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {challenges.map((challenge) => (
              <div
                key={challenge.title}
                className={cn(
                  "rounded-2xl border p-8",
                  isDark ? "border-white/10 bg-white/[0.02]" : "border-neutral-200 bg-white"
                )}
              >
                <h3 className="text-xl font-semibold">{challenge.title}</h3>
                <p className={cn("mt-3", isDark ? "text-white/60" : "text-neutral-600")}>
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className={cn("border-t py-24", isDark ? "border-white/10 bg-white/[0.01]" : "border-neutral-200 bg-neutral-50")}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How we help e-commerce brands win
            </h2>
            <p className={cn("mt-4 text-lg", isDark ? "text-white/60" : "text-neutral-600")}>
              Our AI visibility strategies drive product discovery and revenue for DTC and retail brands.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
                    isDark ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-emerald-100"
                  )}
                >
                  <benefit.icon className={cn("h-6 w-6", isDark ? "text-emerald-400" : "text-emerald-600")} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{benefit.title}</h3>
                  <p className={cn("mt-2", isDark ? "text-white/60" : "text-neutral-600")}>
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className={cn("border-t py-24", isDark ? "border-white/10" : "border-neutral-200")}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Every product category covered
              </h2>
              <p className={cn("mt-4 text-lg", isDark ? "text-white/60" : "text-neutral-600")}>
                From DTC startups to established retail brands, we help you capture AI-driven product discovery.
              </p>
              <div className="mt-8">
                <Link
                  href="/case-studies"
                  className={cn(
                    "inline-flex items-center gap-2 font-medium transition-colors",
                    isDark ? "text-emerald-400 hover:text-emerald-300" : "text-emerald-600 hover:text-emerald-700"
                  )}
                >
                  See e-commerce case studies
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {useCases.map((useCase) => (
                <div
                  key={useCase}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-4 py-3",
                    isDark ? "border-white/10 bg-white/[0.02]" : "border-neutral-200 bg-white"
                  )}
                >
                  <CheckCircle2 className={cn("h-4 w-4 shrink-0", isDark ? "text-emerald-400" : "text-emerald-600")} />
                  <span className="text-sm">{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={cn("border-t py-24", isDark ? "border-white/10 bg-emerald-500/5" : "border-neutral-200 bg-emerald-50")}>
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <ShoppingBag className={cn("mx-auto h-12 w-12", isDark ? "text-emerald-400" : "text-emerald-600")} />
          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to get your products recommended?
          </h2>
          <p className={cn("mt-6 text-lg", isDark ? "text-white/60" : "text-neutral-600")}>
            Get a free visibility audit and see how your brand compares to competitors in AI product recommendations.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tools/free-audit"
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-medium transition-all",
                isDark
                  ? "bg-emerald-500 text-black hover:bg-emerald-400"
                  : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25"
              )}
            >
              Get Your Free Audit
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border px-8 py-4 text-base font-medium transition-all",
                isDark
                  ? "border-white/20 hover:bg-white/5"
                  : "border-neutral-300 bg-white hover:bg-neutral-50"
              )}
            >
              Schedule a Demo
            </Link>
          </div>
        </div>
      </section>
    </ThemedLayout>
  );
}
