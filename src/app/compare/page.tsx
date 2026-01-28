"use client";

import Link from "next/link";
import { ArrowRight, Search, Megaphone, Wrench } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";

const comparisons = [
  {
    icon: Search,
    title: "AI Visibility vs SEO",
    description: "SEO gets you ranked on Google. AI visibility gets you recommended by ChatGPT. Learn why you need both and how they differ.",
    href: "/compare/ai-visibility-vs-seo",
    highlight: "Most popular",
  },
  {
    icon: Megaphone,
    title: "AI Visibility vs PR",
    description: "PR builds general awareness. AI visibility drives purchase consideration. Compare costs, ROI, and time to results.",
    href: "/compare/ai-visibility-vs-pr",
    highlight: null,
  },
  {
    icon: Wrench,
    title: "AdsX vs DIY",
    description: "You can build AI visibility in-house. But should you? Honest comparison of professional help vs doing it yourself.",
    href: "/compare/ai-visibility-vs-diy",
    highlight: null,
  },
];

export default function ComparePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ThemedLayout>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Compare <span className="gradient-text">AI Visibility</span>
            </h1>
            <p className={cn("mt-6 text-lg sm:text-xl", isDark ? "text-white/60" : "text-neutral-600")}>
              Understand how AI visibility optimization compares to other marketing approaches.
              Make informed decisions about where to invest your resources.
            </p>
          </div>
        </div>
      </section>

      {/* Comparisons */}
      <section className={cn("border-t py-24", isDark ? "border-white/10" : "border-neutral-200")}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {comparisons.map((comparison) => (
              <Link
                key={comparison.title}
                href={comparison.href}
                className={cn(
                  "group relative rounded-2xl border p-8 transition-all hover:shadow-lg",
                  isDark
                    ? "border-white/10 bg-white/[0.02] hover:border-emerald-500/30 hover:bg-emerald-500/5"
                    : "border-neutral-200 bg-white hover:border-emerald-300 hover:shadow-emerald-500/10"
                )}
              >
                {comparison.highlight && (
                  <div className={cn(
                    "absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-medium",
                    isDark ? "bg-emerald-500 text-black" : "bg-emerald-500 text-white"
                  )}>
                    {comparison.highlight}
                  </div>
                )}
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-lg transition-colors",
                    isDark
                      ? "bg-white/5 group-hover:bg-emerald-500/10"
                      : "bg-neutral-100 group-hover:bg-emerald-100"
                  )}
                >
                  <comparison.icon className={cn(
                    "h-6 w-6 transition-colors",
                    isDark
                      ? "text-white/60 group-hover:text-emerald-400"
                      : "text-neutral-600 group-hover:text-emerald-600"
                  )} />
                </div>
                <h2 className="mt-6 text-xl font-bold">{comparison.title}</h2>
                <p className={cn("mt-3", isDark ? "text-white/60" : "text-neutral-600")}>
                  {comparison.description}
                </p>
                <div className={cn(
                  "mt-6 inline-flex items-center gap-2 font-medium transition-colors",
                  isDark
                    ? "text-emerald-400 group-hover:text-emerald-300"
                    : "text-emerald-600 group-hover:text-emerald-700"
                )}>
                  Read comparison
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={cn("border-t py-24", isDark ? "border-white/10 bg-white/[0.02]" : "border-neutral-200 bg-neutral-50")}>
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Not sure which approach is right for you?
          </h2>
          <p className={cn("mt-6 text-lg", isDark ? "text-white/60" : "text-neutral-600")}>
            Start with a free visibility audit. We&apos;ll show you where you stand and recommend the best path forward.
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
