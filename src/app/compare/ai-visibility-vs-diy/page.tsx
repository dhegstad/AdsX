"use client";

import Link from "next/link";
import { ArrowRight, Check, X, AlertCircle, Clock, Wrench, TrendingUp, Users } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";

const comparisonData = [
  {
    feature: "Multi-platform visibility tracking",
    adsx: true,
    diy: "partial",
  },
  {
    feature: "Proven optimization playbooks",
    adsx: true,
    diy: false,
  },
  {
    feature: "Competitor monitoring",
    adsx: true,
    diy: "partial",
  },
  {
    feature: "Content strategy for AI",
    adsx: true,
    diy: "partial",
  },
  {
    feature: "No internal resource burden",
    adsx: true,
    diy: false,
  },
  {
    feature: "Platform relationship insights",
    adsx: true,
    diy: false,
  },
  {
    feature: "Faster time to results",
    adsx: true,
    diy: false,
  },
  {
    feature: "Lower total cost",
    adsx: "partial",
    diy: true,
  },
];

const timeComparison = [
  {
    task: "Initial visibility audit",
    adsx: "24 hours",
    diy: "1-2 weeks",
  },
  {
    task: "Strategy development",
    adsx: "1 week",
    diy: "2-4 weeks",
  },
  {
    task: "First visibility improvements",
    adsx: "2-4 weeks",
    diy: "2-3 months",
  },
  {
    task: "Ongoing monitoring",
    adsx: "Automated",
    diy: "4-8 hours/week",
  },
];

const diyRisks = [
  {
    icon: Clock,
    title: "Time Drain",
    description: "AI platforms change constantly. Keeping up with what works requires dedicated time your team probably doesn't have.",
  },
  {
    icon: Wrench,
    title: "Tool Building",
    description: "There's no off-the-shelf tool for AI visibility tracking. You'll need to build custom monitoring or check manually.",
  },
  {
    icon: TrendingUp,
    title: "Learning Curve",
    description: "AI optimization is fundamentally different from SEO. Expect trial and error while you figure out what actually works.",
  },
  {
    icon: Users,
    title: "Opportunity Cost",
    description: "Every hour spent on AI visibility is an hour not spent on your core product or service.",
  },
];

export default function AIVisibilityVsDIYPage() {
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
              AdsX vs{" "}
              <span className="gradient-text">Doing It Yourself</span>
            </h1>
            <p className={cn("mt-6 text-lg sm:text-xl", isDark ? "text-white/60" : "text-neutral-600")}>
              You can absolutely optimize for AI visibility yourself. The question is whether it&apos;s the best use of your time and resources.
              Here&apos;s an honest comparison.
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
            <h2 className="text-2xl font-bold">The Honest Truth</h2>
            <p className={cn("mt-4 text-lg", isDark ? "text-white/70" : "text-neutral-700")}>
              <strong>DIY can work, but it&apos;s slower and harder than it looks.</strong> AI visibility optimization is a new discipline without
              established best practices. We&apos;ve already made the mistakes and learned what works. You can either spend months figuring it
              out yourself, or leverage our playbooks to see results in weeks.
            </p>
          </div>
        </div>
      </section>

      {/* Time Comparison */}
      <section className={cn("border-t py-24", isDark ? "border-white/10" : "border-neutral-200")}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Time to Results
            </h2>
            <p className={cn("mt-4 text-lg", isDark ? "text-white/60" : "text-neutral-600")}>
              How long each milestone takes with professional help vs. going solo.
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
                <div>Milestone</div>
                <div className="text-center">With AdsX</div>
                <div className="text-center">DIY</div>
              </div>
              {/* Table Body */}
              {timeComparison.map((row, index) => (
                <div
                  key={row.task}
                  className={cn(
                    "grid grid-cols-3 gap-4 px-6 py-4 items-center",
                    index !== timeComparison.length - 1 && (isDark ? "border-b border-white/10" : "border-b border-neutral-200")
                  )}
                >
                  <div className={cn("text-sm", isDark ? "text-white/80" : "text-neutral-700")}>{row.task}</div>
                  <div className={cn("text-center text-sm font-medium", isDark ? "text-emerald-400" : "text-emerald-600")}>{row.adsx}</div>
                  <div className={cn("text-center text-sm", isDark ? "text-white/60" : "text-neutral-600")}>{row.diy}</div>
                </div>
              ))}
            </div>
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
              What you get with professional help vs. going it alone.
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
                <div className="text-center">With AdsX</div>
                <div className="text-center">DIY</div>
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
                  <div className="flex justify-center">{renderCheckmark(row.adsx)}</div>
                  <div className="flex justify-center">{renderCheckmark(row.diy)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DIY Risks */}
      <section className={cn("border-t py-24", isDark ? "border-white/10" : "border-neutral-200")}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The Hidden Costs of DIY
            </h2>
            <p className={cn("mt-4 text-lg", isDark ? "text-white/60" : "text-neutral-600")}>
              What you&apos;ll encounter if you decide to build this capability in-house.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {diyRisks.map((risk) => (
              <div key={risk.title} className="flex gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
                    isDark ? "bg-red-500/10 border border-red-500/20" : "bg-red-100"
                  )}
                >
                  <risk.icon className={cn("h-6 w-6", isDark ? "text-red-400" : "text-red-600")} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{risk.title}</h3>
                  <p className={cn("mt-2", isDark ? "text-white/60" : "text-neutral-600")}>
                    {risk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When DIY Makes Sense */}
      <section className={cn("border-t py-24", isDark ? "border-white/10 bg-white/[0.01]" : "border-neutral-200 bg-neutral-50")}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className={cn(
              "rounded-2xl border p-8",
              isDark ? "border-white/10 bg-black" : "border-neutral-200 bg-white"
            )}>
              <h3 className="text-xl font-bold">DIY might work if...</h3>
              <ul className={cn("mt-6 space-y-3", isDark ? "text-white/60" : "text-neutral-600")}>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" />
                  <span>You have dedicated marketing resources with bandwidth</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" />
                  <span>You&apos;re willing to experiment for 3-6 months</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" />
                  <span>Budget is your primary constraint</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" />
                  <span>Competitors aren&apos;t already dominating AI mentions</span>
                </li>
              </ul>
            </div>
            <div className={cn(
              "rounded-2xl border p-8",
              isDark ? "border-emerald-500/30 bg-emerald-500/5" : "border-emerald-200 bg-emerald-50"
            )}>
              <h3 className="text-xl font-bold">Work with AdsX if...</h3>
              <ul className={cn("mt-6 space-y-3", isDark ? "text-white/70" : "text-neutral-700")}>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" />
                  <span>You need results in weeks, not months</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" />
                  <span>Competitors are already being recommended by AI</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" />
                  <span>Your team should focus on core business activities</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" />
                  <span>You want proven playbooks, not trial and error</span>
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
            Start with a free audit
          </h2>
          <p className={cn("mt-6 text-lg", isDark ? "text-white/60" : "text-neutral-600")}>
            See exactly where your brand stands in AI search before deciding how to proceed.
            Our free audit shows your visibility, competitor positioning, and quick wins.
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
