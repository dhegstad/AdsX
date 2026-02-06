import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, X, Minus } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import {
  getAllComparisons,
  getComparisonBySlug,
} from "@/lib/comparisons";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  SchemaScript,
} from "@/lib/seo/schemas";

interface PageProps {
  params: Promise<{ comparison: string }>;
}

export async function generateStaticParams() {
  const comparisons = getAllComparisons();
  return comparisons.map((comparison) => ({
    comparison: `ai-visibility-vs-${comparison.slug}`,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { comparison: slug } = await params;
  const comparisonSlug = slug.replace("ai-visibility-vs-", "");
  const comparison = getComparisonBySlug(comparisonSlug);

  if (!comparison) {
    return { title: "Comparison Not Found" };
  }

  return createPageMetadata({
    title: `${comparison.headline} | AdsX`,
    description: comparison.description,
    path: `/compare/${slug}`,
    keywords: comparison.keywords,
  });
}

export default async function ComparisonPage({ params }: PageProps) {
  const { comparison: slug } = await params;
  const comparisonSlug = slug.replace("ai-visibility-vs-", "");
  const comparison = getComparisonBySlug(comparisonSlug);

  if (!comparison) {
    notFound();
  }

  const otherComparisons = getAllComparisons().filter(
    (c) => c.slug !== comparisonSlug
  );

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
    { name: comparison.headline, path: `/compare/${slug}` },
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
              <Link
                href="/compare"
                className="text-neutral-500 hover:text-emerald-600 dark:text-white/50 dark:hover:text-emerald-400"
              >
                Compare
              </Link>
              <span className="mx-2 text-neutral-300 dark:text-white/30">/</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                vs {comparison.alternativeShortName}
              </span>
            </nav>

            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {comparison.headline}
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-white/60">
                {comparison.subheadline}
              </p>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-12">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <p className="text-lg text-neutral-700 dark:text-white/80 leading-relaxed">
              {comparison.description}
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-12">
              Head-to-Head Comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-white/10">
                    <th className="text-left py-4 px-4 font-semibold">Feature</th>
                    <th className="text-left py-4 px-4 font-semibold text-emerald-600 dark:text-emerald-400">
                      AdsX (AI Visibility)
                    </th>
                    <th className="text-left py-4 px-4 font-semibold">
                      {comparison.alternativeName}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.comparisonPoints.map((point, idx) => (
                    <tr
                      key={point.feature}
                      className={
                        idx % 2 === 0
                          ? "bg-white dark:bg-white/[0.02]"
                          : "bg-neutral-50 dark:bg-transparent"
                      }
                    >
                      <td className="py-4 px-4 font-medium">{point.feature}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-start gap-2">
                          {point.winner === "adsx" && (
                            <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                          )}
                          {point.winner === "tie" && (
                            <Minus className="h-5 w-5 text-neutral-400 shrink-0 mt-0.5" />
                          )}
                          {point.winner === "alternative" && (
                            <X className="h-5 w-5 text-neutral-300 shrink-0 mt-0.5" />
                          )}
                          <span
                            className={
                              point.winner === "adsx"
                                ? "text-emerald-700 dark:text-emerald-400"
                                : ""
                            }
                          >
                            {point.adsX}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-start gap-2">
                          {point.winner === "alternative" && (
                            <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                          )}
                          {point.winner === "tie" && (
                            <Minus className="h-5 w-5 text-neutral-400 shrink-0 mt-0.5" />
                          )}
                          {point.winner === "adsx" && (
                            <X className="h-5 w-5 text-neutral-300 shrink-0 mt-0.5" />
                          )}
                          <span
                            className={
                              point.winner === "alternative"
                                ? "text-emerald-700 dark:text-emerald-400"
                                : "text-neutral-600 dark:text-white/60"
                            }
                          >
                            {point.alternative}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Benefits Side by Side */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* AdsX Benefits */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-8">
                <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-6">
                  Why Choose AI Visibility
                </h3>
                <div className="space-y-4">
                  {comparison.adsXBenefits.map((benefit) => (
                    <div key={benefit.title} className="flex gap-3">
                      <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold">{benefit.title}</div>
                        <div className="text-sm text-neutral-600 dark:text-white/60">
                          {benefit.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alternative Benefits */}
              <div className="rounded-xl border border-neutral-200 dark:border-white/10 p-8">
                <h3 className="text-xl font-bold mb-6">
                  {comparison.alternativeName} Strengths
                </h3>
                <div className="space-y-4">
                  {comparison.alternativeBenefits.map((benefit) => (
                    <div key={benefit.title} className="flex gap-3">
                      <Check className="h-5 w-5 text-neutral-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold">{benefit.title}</div>
                        <div className="text-sm text-neutral-600 dark:text-white/60">
                          {benefit.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Verdict */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-6">The Bottom Line</h2>
            <p className="text-lg text-neutral-700 dark:text-white/80 leading-relaxed">
              {comparison.verdict}
            </p>
          </div>
        </section>

        {/* Other Comparisons */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Other Comparisons</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {otherComparisons.map((comp) => (
                <Link
                  key={comp.slug}
                  href={`/compare/ai-visibility-vs-${comp.slug}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-white dark:hover:bg-white/[0.02] transition-colors group"
                >
                  <div>
                    <div className="font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {comp.headline}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-white/50">
                      {comp.subheadline}
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              See Your Current AI Visibility
            </h2>
            <p className="mt-6 text-lg text-neutral-600 dark:text-white/60">
              Get a free audit to see how your brand appears across ChatGPT, Claude, Perplexity, and more.
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
