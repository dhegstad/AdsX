"use client";

import Link from "next/link";
import { ArrowRight, Check, X, AlertCircle } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";

const comparisonData = [
  {
    feature: "Optimizes for AI recommendations",
    aiVisibility: true,
    seo: false,
  },
  {
    feature: "Improves Google search rankings",
    aiVisibility: true,
    seo: true,
  },
  {
    feature: "Gets you mentioned by ChatGPT",
    aiVisibility: true,
    seo: false,
  },
  {
    feature: "Builds backlink authority",
    aiVisibility: true,
    seo: true,
  },
  {
    feature: "Optimizes for voice/conversational search",
    aiVisibility: true,
    seo: "partial",
  },
  {
    feature: "Tracks AI platform mentions",
    aiVisibility: true,
    seo: false,
  },
  {
    feature: "Creates AI-readable content structure",
    aiVisibility: true,
    seo: "partial",
  },
  {
    feature: "Monitors competitor AI visibility",
    aiVisibility: true,
    seo: false,
  },
];

const keyDifferences = [
  {
    title: "Different Search Behavior",
    description: "Users ask Google short keywords. They ask AI complete questions. The optimization strategy must be fundamentally different.",
  },
  {
    title: "No Click-Through Required",
    description: "SEO drives clicks to your site. AI gives answers directly. You need to be the answer, not just rank for the question.",
  },
  {
    title: "Citation vs Ranking",
    description: "Google ranks pages. AI cites sources and recommends brands. Being a trusted, citable source matters more than keyword density.",
  },
  {
    title: "Evolving Algorithms",
    description: "SEO algorithms update quarterly. AI models learn continuously. Staying visible requires different monitoring and adaptation.",
  },
];

export default function AIVisibilityVsSEOPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const renderCheckmark = (value: boolean | string) => {
    if (value === true) {
      return <Check className="h-5 w-5 text-emerald-500" />;
    } else if (value === false) {
      return <X className="h-5 w-5 text-red-500" />;
    } else {
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

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
                  ? "border-white/20 bg-white/5"
                  : "border-neutral-200 bg-neutral-100"
              )}
            >
              <span className={cn("font-medium", isDark ? "text-white/60" : "text-neutral-600")}>
                Comparison Guide
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              AI Visibility vs{" "}
              <span className="gradient-text">Traditional SEO</span>
            </h1>
            <p className={cn("mt-6 text-lg sm:text-xl", isDark ? "text-white/60" : "text-neutral-600")}>
              SEO gets you ranked on Google. AI visibility gets you recommended by ChatGPT, Claude, and Perplexity.
              Here&apos;s why you need both—and why they&apos;re not the same.
            </p>
          </div>
        </div>
      </section>

      {/* The Bottom Line */}
      <section className={cn("border-t py-16", isDark ? "border-white/10" : "border-neutral-200")}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className={cn(
            "rounded-2xl border p-8 lg:p-12",
            isDark ? "border-emerald-500/30 bg-emerald-500/5" : "border-emerald-200 bg-emerald-50"
          )}>
            <h2 className="text-2xl font-bold">The Bottom Line</h2>
            <p className={cn("mt-4 text-lg", isDark ? "text-white/70" : "text-neutral-700")}>
              <strong>SEO and AI visibility are complementary, not competing strategies.</strong> SEO helps people find you through Google.
              AI visibility helps people discover you through conversational AI. As more users shift to AI-first search,
              brands that only invest in SEO will become invisible to a growing segment of their market.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className={cn("border-t py-24", isDark ? "border-white/10" : "border-neutral-200")}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Feature Comparison
            </h2>
            <p className={cn("mt-4 text-lg", isDark ? "text-white/60" : "text-neutral-600")}>
              See how AI visibility optimization differs from traditional SEO.
            </p>
          </div>
          <div className="mt-12 overflow-hidden">
            <div className={cn(
              "rounded-2xl border overflow-hidden",
              isDark ? "border-white/10" : "border-neutral-200"
            )}>
              {/* Table Header */}
              <div className={cn(
                "grid grid-cols-3 gap-4 px-6 py-4 font-semibold",
                isDark ? "bg-white/5" : "bg-neutral-100"
              )}>
                <div>Feature</div>
                <div className="text-center">AI Visibility</div>
                <div className="text-center">Traditional SEO</div>
              </div>
              {/* Table Body */}
              {comparisonData.map((row, index) => (
                <div
                  key={row.feature}
                  className={cn(
                    "grid grid-cols-3 gap-4 px-6 py-4 items-center",
                    index !== comparisonData.length - 1 && (isDark ? "border-b border-white/10" : "border-b border-neutral-200")
                  )}
                >
                  <div className={cn("text-sm", isDark ? "text-white/80" : "text-neutral-700")}>{row.feature}</div>
                  <div className="flex justify-center">{renderCheckmark(row.aiVisibility)}</div>
                  <div className="flex justify-center">{renderCheckmark(row.seo)}</div>
                </div>
              ))}
            </div>
            <p className={cn("mt-4 text-sm text-center", isDark ? "text-white/40" : "text-neutral-500")}>
              <AlertCircle className="inline h-4 w-4 text-yellow-500 mr-1" /> = Partial or limited support
            </p>
          </div>
        </div>
      </section>

      {/* Key Differences */}
      <section className={cn("border-t py-24", isDark ? "border-white/10 bg-white/[0.01]" : "border-neutral-200 bg-neutral-50")}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Key Differences
            </h2>
            <p className={cn("mt-4 text-lg", isDark ? "text-white/60" : "text-neutral-600")}>
              Why optimizing for AI requires a different approach than traditional SEO.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {keyDifferences.map((diff) => (
              <div
                key={diff.title}
                className={cn(
                  "rounded-2xl border p-8",
                  isDark ? "border-white/10 bg-black" : "border-neutral-200 bg-white"
                )}
              >
                <h3 className="text-xl font-semibold">{diff.title}</h3>
                <p className={cn("mt-3", isDark ? "text-white/60" : "text-neutral-600")}>
                  {diff.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to Choose */}
      <section className={cn("border-t py-24", isDark ? "border-white/10" : "border-neutral-200")}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className={cn(
              "rounded-2xl border p-8",
              isDark ? "border-white/10 bg-white/[0.02]" : "border-neutral-200 bg-white"
            )}>
              <h3 className="text-xl font-bold">Keep investing in SEO if...</h3>
              <ul className={cn("mt-6 space-y-3", isDark ? "text-white/60" : "text-neutral-600")}>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" />
                  <span>Your audience primarily uses Google for research</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" />
                  <span>You have strong existing search rankings to maintain</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" />
                  <span>Your conversion funnel depends on website visits</span>
                </li>
              </ul>
            </div>
            <div className={cn(
              "rounded-2xl border p-8",
              isDark ? "border-emerald-500/30 bg-emerald-500/5" : "border-emerald-200 bg-emerald-50"
            )}>
              <h3 className="text-xl font-bold">Add AI visibility if...</h3>
              <ul className={cn("mt-6 space-y-3", isDark ? "text-white/70" : "text-neutral-700")}>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" />
                  <span>Your competitors are being recommended by AI and you&apos;re not</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" />
                  <span>Your target audience uses ChatGPT or Claude for research</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" />
                  <span>You want to capture the growing AI-first search market</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={cn("border-t py-24", isDark ? "border-white/10 bg-white/[0.02]" : "border-neutral-200 bg-neutral-50")}>
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            See where you stand in AI search
          </h2>
          <p className={cn("mt-6 text-lg", isDark ? "text-white/60" : "text-neutral-600")}>
            Get a free visibility audit to see how your brand appears across ChatGPT, Claude, and Perplexity—and
            how you compare to competitors.
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
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </ThemedLayout>
  );
}
