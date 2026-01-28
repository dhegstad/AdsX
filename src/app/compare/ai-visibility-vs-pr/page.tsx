"use client";

import Link from "next/link";
import { ArrowRight, Check, X, AlertCircle, DollarSign, Clock, Target, BarChart3 } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";

const comparisonData = [
  {
    feature: "Gets you mentioned in AI responses",
    aiVisibility: true,
    pr: false,
  },
  {
    feature: "Builds media coverage",
    aiVisibility: "partial",
    pr: true,
  },
  {
    feature: "Direct ROI tracking",
    aiVisibility: true,
    pr: false,
  },
  {
    feature: "Scales without more headcount",
    aiVisibility: true,
    pr: false,
  },
  {
    feature: "Creates lasting content assets",
    aiVisibility: true,
    pr: "partial",
  },
  {
    feature: "Targets specific buyer queries",
    aiVisibility: true,
    pr: false,
  },
  {
    feature: "Results within 30 days",
    aiVisibility: true,
    pr: false,
  },
  {
    feature: "Builds general brand awareness",
    aiVisibility: "partial",
    pr: true,
  },
];

const costComparison = [
  {
    label: "Typical monthly cost",
    aiVisibility: "$4,500",
    pr: "$10,000 - $25,000",
  },
  {
    label: "Time to measurable results",
    aiVisibility: "2-4 weeks",
    pr: "3-6 months",
  },
  {
    label: "ROI tracking",
    aiVisibility: "Direct attribution",
    pr: "Brand lift studies",
  },
  {
    label: "Effort to maintain",
    aiVisibility: "Low (automated monitoring)",
    pr: "High (ongoing pitching)",
  },
];

const keyDifferences = [
  {
    icon: Target,
    title: "Precision vs. Broadcast",
    description: "PR broadcasts your message hoping the right people see it. AI visibility puts you in front of users at the exact moment they're researching solutions.",
  },
  {
    icon: BarChart3,
    title: "Measurable vs. Estimated",
    description: "PR success is measured in impressions and sentiment. AI visibility is measured in actual recommendations, mentions, and resulting traffic.",
  },
  {
    icon: Clock,
    title: "Compounding vs. Fleeting",
    description: "PR coverage has a short shelf life. AI visibility compounds—once AI learns to recommend you, it continues doing so.",
  },
  {
    icon: DollarSign,
    title: "Predictable vs. Variable",
    description: "AI visibility delivers consistent, predictable results. PR outcomes vary wildly based on news cycles and journalist relationships.",
  },
];

export default function AIVisibilityVsPRPage() {
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
              <span className="gradient-text">PR Agencies</span>
            </h1>
            <p className={cn("mt-6 text-lg sm:text-xl", isDark ? "text-white/60" : "text-neutral-600")}>
              PR builds awareness through media. AI visibility builds recommendations where buyers actually research.
              Here&apos;s how they compare for driving real business results.
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
              <strong>PR builds brand awareness. AI visibility drives purchase consideration.</strong> PR is valuable for major announcements and
              brand building, but it doesn&apos;t directly influence the AI assistants your prospects use daily. For capturing demand at the
              research stage, AI visibility delivers faster, more measurable results at a lower cost.
            </p>
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className={cn("border-t py-24", isDark ? "border-white/10" : "border-neutral-200")}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Investment Comparison
            </h2>
            <p className={cn("mt-4 text-lg", isDark ? "text-white/60" : "text-neutral-600")}>
              How the costs and returns compare between AI visibility and PR.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {costComparison.map((item) => (
              <div
                key={item.label}
                className={cn(
                  "rounded-2xl border p-6",
                  isDark ? "border-white/10 bg-white/[0.02]" : "border-neutral-200 bg-white"
                )}
              >
                <div className={cn("text-sm font-medium", isDark ? "text-white/50" : "text-neutral-500")}>
                  {item.label}
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs", isDark ? "text-white/40" : "text-neutral-400")}>AI Visibility</span>
                    <span className={cn("font-semibold", isDark ? "text-emerald-400" : "text-emerald-600")}>{item.aiVisibility}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs", isDark ? "text-white/40" : "text-neutral-400")}>PR Agency</span>
                    <span className={cn("font-medium", isDark ? "text-white/70" : "text-neutral-700")}>{item.pr}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className={cn("border-t py-24", isDark ? "border-white/10 bg-white/[0.01]" : "border-neutral-200 bg-neutral-50")}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Capability Comparison
            </h2>
            <p className={cn("mt-4 text-lg", isDark ? "text-white/60" : "text-neutral-600")}>
              What each approach can and can&apos;t do for your brand.
            </p>
          </div>
          <div className="mt-12 overflow-hidden">
            <div className={cn(
              "rounded-2xl border overflow-hidden",
              isDark ? "border-white/10 bg-black" : "border-neutral-200 bg-white"
            )}>
              {/* Table Header */}
              <div className={cn(
                "grid grid-cols-3 gap-4 px-6 py-4 font-semibold",
                isDark ? "bg-white/5" : "bg-neutral-100"
              )}>
                <div>Capability</div>
                <div className="text-center">AI Visibility</div>
                <div className="text-center">PR Agency</div>
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
                  <div className="flex justify-center">{renderCheckmark(row.pr)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Differences */}
      <section className={cn("border-t py-24", isDark ? "border-white/10" : "border-neutral-200")}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Key Differences
            </h2>
            <p className={cn("mt-4 text-lg", isDark ? "text-white/60" : "text-neutral-600")}>
              Fundamental differences in how these approaches drive results.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {keyDifferences.map((diff) => (
              <div key={diff.title} className="flex gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
                    isDark ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-emerald-100"
                  )}
                >
                  <diff.icon className={cn("h-6 w-6", isDark ? "text-emerald-400" : "text-emerald-600")} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{diff.title}</h3>
                  <p className={cn("mt-2", isDark ? "text-white/60" : "text-neutral-600")}>
                    {diff.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={cn("border-t py-24", isDark ? "border-white/10 bg-white/[0.02]" : "border-neutral-200 bg-neutral-50")}>
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            See if AI is recommending your competitors
          </h2>
          <p className={cn("mt-6 text-lg", isDark ? "text-white/60" : "text-neutral-600")}>
            Get a free visibility audit to see how your brand appears when prospects ask AI for recommendations—and
            what you can do about it.
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
