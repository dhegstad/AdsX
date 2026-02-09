import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import { getAllExamples, getExampleCategories, getExamplesByCategory, type BrandExample } from "@/lib/examples";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

export const metadata: Metadata = createPageMetadata({
  title: "AI Visibility Success Stories: Brand Examples | AdsX",
  description:
    "See how leading brands achieved AI visibility success. Detailed case studies showing strategies, tactics, and results from e-commerce, SaaS, fintech, and more.",
  path: "/examples",
  keywords: [
    "AI visibility examples",
    "AI marketing case studies",
    "brand AI visibility",
    "ChatGPT optimization examples",
  ],
});

const categoryLabels: Record<string, string> = {
  ecommerce: "E-commerce",
  saas: "SaaS",
  fintech: "Fintech",
  healthcare: "Healthcare",
  consumer: "Consumer",
  b2b: "B2B",
  media: "Media",
  travel: "Travel",
};

const categoryDescriptions: Record<string, string> = {
  ecommerce: "How e-commerce brands win AI product recommendations",
  saas: "SaaS companies dominating AI software recommendations",
  fintech: "Fintech brands building trust in AI responses",
  healthcare: "Healthcare brands navigating AI visibility with trust",
  consumer: "Consumer brands capturing AI discovery",
  b2b: "B2B companies winning complex AI recommendations",
  media: "Media brands earning AI content recommendations",
  travel: "Travel brands owning AI trip planning",
};

export default function ExamplesIndexPage() {
  const allExamples = getAllExamples();
  const categories = getExampleCategories().filter((c) => c.count > 0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Examples", path: "/examples" },
  ];

  // Featured examples (first 3)
  const featuredExamples = allExamples.slice(0, 3);

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
                Examples
              </span>
            </nav>

            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm mb-6">
                <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {allExamples.length} Brand Examples
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                AI Visibility{" "}
                <span className="gradient-text">Success Stories</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-white/60">
                See how leading brands achieved AI visibility success. Learn from their
                strategies, tactics, and results to improve your own AI presence.
              </p>

              <div className="mt-10">
                <Link
                  href="/tools/free-audit"
                  className="group inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 text-base font-medium text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/25"
                >
                  Get Your Free Audit
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                  {allExamples.length}
                </div>
                <div className="mt-2 text-sm text-neutral-600 dark:text-white/60">
                  Brand Examples
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                  {categories.length}
                </div>
                <div className="mt-2 text-sm text-neutral-600 dark:text-white/60">
                  Industries
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                  67%
                </div>
                <div className="mt-2 text-sm text-neutral-600 dark:text-white/60">
                  Avg. AI Recommendation Rate
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                  4-6 mo
                </div>
                <div className="mt-2 text-sm text-neutral-600 dark:text-white/60">
                  Typical Timeline
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Examples */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Featured Examples</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {featuredExamples.map((example) => (
                <Link
                  key={example.slug}
                  href={`/examples/${example.slug}`}
                  className="group p-6 rounded-xl border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-white dark:hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                      {categoryLabels[example.category]}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                    {example.brand}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-white/50 mb-3">
                    {example.industry}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-white/60 mb-4 line-clamp-2">
                    {example.headline}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <TrendingUp className="h-4 w-4" />
                      <span>{example.metrics[0]?.value}</span>
                    </div>
                    <span className="text-neutral-400">|</span>
                    <span className="text-neutral-500 dark:text-white/50">
                      {example.timeline}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        {categories.map((cat) => {
          const examples = getExamplesByCategory(cat.slug as BrandExample["category"]);
          return (
            <section
              key={cat.slug}
              className="border-t border-neutral-200 dark:border-white/10 py-16"
            >
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold">{cat.name}</h2>
                    <p className="text-neutral-600 dark:text-white/60 mt-1">
                      {categoryDescriptions[cat.slug]}
                    </p>
                  </div>
                  <span className="text-sm text-neutral-500 dark:text-white/50">
                    {cat.count} examples
                  </span>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {examples.map((example) => (
                    <Link
                      key={example.slug}
                      href={`/examples/${example.slug}`}
                      className="group flex items-start justify-between p-4 rounded-lg border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-white dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <div>
                        <div className="font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {example.brand}
                        </div>
                        <div className="text-sm text-neutral-500 dark:text-white/50 mt-1">
                          {example.industry}
                        </div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">
                          {example.metrics[0]?.value} {example.metrics[0]?.context}
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Want to Be the Next Success Story?
            </h2>
            <p className="mt-6 text-lg text-neutral-600 dark:text-white/60">
              Get a free audit to see how your brand can achieve similar AI visibility results.
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
