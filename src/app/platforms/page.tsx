import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cpu, TrendingUp, Users } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import { getAllPlatforms, getPlatformsByImportance } from "@/lib/platforms";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

export const metadata: Metadata = createPageMetadata({
  title: "AI Platforms: Visibility Optimization Guide | AdsX",
  description:
    "Complete guide to AI platform visibility. Learn how to get your brand recommended by ChatGPT, Claude, Perplexity, Gemini, and other leading AI assistants.",
  path: "/platforms",
  keywords: [
    "AI platforms",
    "ChatGPT visibility",
    "Claude visibility",
    "AI assistant optimization",
    "AI search platforms",
  ],
});

const importanceBadges: Record<string, { label: string; className: string }> = {
  critical: {
    label: "Critical",
    className: "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400",
  },
  high: {
    label: "High",
    className: "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400",
  },
  medium: {
    label: "Medium",
    className: "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400",
  },
};

export default function PlatformsIndexPage() {
  const allPlatforms = getAllPlatforms();
  const criticalPlatforms = getPlatformsByImportance("critical");
  const highPlatforms = getPlatformsByImportance("high");
  const mediumPlatforms = getPlatformsByImportance("medium");

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "AI Platforms", path: "/platforms" },
  ];

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
      <ThemedLayout>
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-40" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <nav className="mb-8 text-sm">
              <Link
                href="/"
                className="text-neutral-500 hover:text-emerald-600 dark:text-white/50 dark:hover:text-emerald-400"
              >
                Home
              </Link>
              <span className="mx-2 text-neutral-300 dark:text-white/30">/</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                AI Platforms
              </span>
            </nav>

            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm mb-6">
                <Cpu className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {allPlatforms.length} AI Platforms
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                AI Platform{" "}
                <span className="gradient-text">Visibility Guide</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-white/60">
                Your complete guide to getting your brand recommended by the world&apos;s leading
                AI assistants. Learn platform-specific strategies for ChatGPT, Claude, Perplexity, and more.
              </p>

              <div className="mt-10">
                <Link
                  href="/tools/free-audit"
                  className="group inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 text-base font-medium text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/25"
                >
                  Check Your AI Visibility
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                  {allPlatforms.length}
                </div>
                <div className="mt-2 text-sm text-neutral-600 dark:text-white/60">
                  Platforms Covered
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                  500M+
                </div>
                <div className="mt-2 text-sm text-neutral-600 dark:text-white/60">
                  Combined Users
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                  {criticalPlatforms.length}
                </div>
                <div className="mt-2 text-sm text-neutral-600 dark:text-white/60">
                  Critical Priority
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                  4.2x
                </div>
                <div className="mt-2 text-sm text-neutral-600 dark:text-white/60">
                  Higher Conversion
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Critical Priority */}
        {criticalPlatforms.length > 0 && (
          <section className="border-t border-neutral-200 dark:border-white/10 py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20">
                  <TrendingUp className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Critical Priority Platforms</h2>
                  <p className="text-neutral-600 dark:text-white/60">
                    Essential platforms for AI visibility with highest user reach
                  </p>
                </div>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                {criticalPlatforms.map((platform) => {
                  const badge = importanceBadges[platform.visibilityImportance];
                  return (
                    <Link
                      key={platform.slug}
                      href={`/platforms/${platform.slug}`}
                      className="group p-6 rounded-xl border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-white dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                              {platform.name}
                            </h3>
                            <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${badge.className}`}>
                              {badge.label}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-500 dark:text-white/50 mb-3">
                            {platform.company}
                          </p>
                          <p className="text-neutral-600 dark:text-white/60 line-clamp-2">
                            {platform.description}
                          </p>
                          <div className="mt-4 flex items-center gap-4 text-sm text-neutral-500 dark:text-white/50">
                            {platform.stats.slice(0, 2).map((stat, idx) => (
                              <span key={idx} className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {stat.value} {stat.label}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* High Priority */}
        {highPlatforms.length > 0 && (
          <section className="border-t border-neutral-200 dark:border-white/10 py-16 bg-neutral-50 dark:bg-transparent">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">High Priority Platforms</h2>
                  <p className="text-neutral-600 dark:text-white/60">
                    Important platforms with significant visibility impact
                  </p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {highPlatforms.map((platform) => {
                  const badge = importanceBadges[platform.visibilityImportance];
                  return (
                    <Link
                      key={platform.slug}
                      href={`/platforms/${platform.slug}`}
                      className="group p-5 rounded-xl border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-white dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                              {platform.name}
                            </h3>
                            <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${badge.className}`}>
                              {badge.label}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-500 dark:text-white/50 mb-2">
                            {platform.company}
                          </p>
                          <p className="text-sm text-neutral-600 dark:text-white/60 line-clamp-2">
                            {platform.description}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Medium Priority */}
        {mediumPlatforms.length > 0 && (
          <section className="border-t border-neutral-200 dark:border-white/10 py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Medium Priority Platforms</h2>
                  <p className="text-neutral-600 dark:text-white/60">
                    Emerging platforms and specialized AI assistants
                  </p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mediumPlatforms.map((platform) => {
                  const badge = importanceBadges[platform.visibilityImportance];
                  return (
                    <Link
                      key={platform.slug}
                      href={`/platforms/${platform.slug}`}
                      className="group p-5 rounded-xl border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-white dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                              {platform.name}
                            </h3>
                            <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${badge.className}`}>
                              {badge.label}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-500 dark:text-white/50 mb-2">
                            {platform.company}
                          </p>
                          <p className="text-sm text-neutral-600 dark:text-white/60 line-clamp-2">
                            {platform.description}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Why Platform-Specific */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-6">
              Why Platform-Specific Optimization Matters
            </h2>
            <p className="text-lg text-neutral-600 dark:text-white/60 mb-8">
              Each AI platform has unique characteristics, user bases, and recommendation patterns.
              While core optimization principles apply across platforms, understanding platform-specific
              nuances can significantly improve your visibility where it matters most.
            </p>
            <div className="grid gap-4 md:grid-cols-3 text-left">
              <div className="p-4 rounded-lg border border-neutral-200 dark:border-white/10">
                <h3 className="font-semibold mb-2">Different User Bases</h3>
                <p className="text-sm text-neutral-600 dark:text-white/60">
                  Each platform attracts different demographics with different needs and intent signals.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-neutral-200 dark:border-white/10">
                <h3 className="font-semibold mb-2">Unique Features</h3>
                <p className="text-sm text-neutral-600 dark:text-white/60">
                  Web browsing, memory, custom GPTs, and other features create different visibility opportunities.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-neutral-200 dark:border-white/10">
                <h3 className="font-semibold mb-2">Training Differences</h3>
                <p className="text-sm text-neutral-600 dark:text-white/60">
                  Different training data and methodologies mean each platform has different knowledge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Check Your Multi-Platform AI Visibility
            </h2>
            <p className="mt-6 text-lg text-neutral-600 dark:text-white/60">
              Get a free audit showing how your brand appears across all major AI platforms.
            </p>
            <div className="mt-10">
              <Link
                href="/tools/free-audit"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 text-base font-medium text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/25"
              >
                Get Your Free Audit
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </ThemedLayout>
    </>
  );
}
