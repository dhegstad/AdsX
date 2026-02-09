import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Star, Award } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import { getAllLists, getListCategories, getListsByCategory, type CuratedList } from "@/lib/curated-lists";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

export const metadata: Metadata = createPageMetadata({
  title: "Best AI Visibility Resources: Curated Guides | AdsX",
  description:
    "Curated guides to the best AI visibility tools, strategies, and resources. Expert recommendations for improving your brand's presence across AI assistants.",
  path: "/best",
  keywords: [
    "best AI visibility tools",
    "AI marketing guides",
    "AI optimization resources",
    "ChatGPT marketing resources",
  ],
});

const categoryLabels: Record<string, string> = {
  tools: "Tools & Software",
  strategies: "Strategies",
  resources: "Resources",
  guides: "Guides",
};

const categoryDescriptions: Record<string, string> = {
  tools: "The best tools and software for AI visibility monitoring and optimization",
  strategies: "Proven strategies for improving AI visibility across industries",
  resources: "Essential resources for learning and implementing AI visibility",
  guides: "Step-by-step guides for AI visibility success",
};

const categoryIcons: Record<string, string> = {
  tools: "wrench",
  strategies: "target",
  resources: "book",
  guides: "map",
};

export default function BestIndexPage() {
  const allLists = getAllLists();
  const categories = getListCategories().filter((c) => c.count > 0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Best Of", path: "/best" },
  ];

  // Featured lists (first 4)
  const featuredLists = allLists.slice(0, 4);

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
                Best Of
              </span>
            </nav>

            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm mb-6">
                <Award className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {allLists.length} Curated Guides
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Best AI Visibility{" "}
                <span className="gradient-text">Resources</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-white/60">
                Curated guides to the best tools, strategies, and resources for improving
                your brand&apos;s visibility across AI assistants.
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

        {/* Featured Lists */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Featured Guides</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredLists.map((list) => (
                <Link
                  key={list.slug}
                  href={`/best/${list.slug}`}
                  className="group p-6 rounded-xl border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-white dark:hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                        {categoryLabels[list.category]}
                      </span>
                      <h3 className="text-xl font-semibold mt-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {list.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-white/60 mt-2 line-clamp-2">
                        {list.description}
                      </p>
                      <div className="flex items-center gap-4 mt-4 text-sm text-neutral-500 dark:text-white/50">
                        <span>{list.items.length} items</span>
                        <span>Updated {list.lastUpdated}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0 mt-8" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        {categories.map((cat) => {
          const lists = getListsByCategory(cat.slug as CuratedList["category"]);
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
                    {cat.count} guides
                  </span>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {lists.map((list) => (
                    <Link
                      key={list.slug}
                      href={`/best/${list.slug}`}
                      className="group p-5 rounded-xl border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-white dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="h-4 w-4 text-emerald-500" />
                            <span className="text-xs text-neutral-500 dark:text-white/50">
                              {list.items.length} items
                            </span>
                          </div>
                          <h3 className="font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {list.title}
                          </h3>
                          <p className="text-sm text-neutral-600 dark:text-white/60 mt-2 line-clamp-2">
                            {list.description}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* All Lists */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">All Curated Guides</h2>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {allLists.map((list) => (
                <Link
                  key={list.slug}
                  href={`/best/${list.slug}`}
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-white dark:hover:bg-white/[0.02] transition-colors group"
                >
                  <Star className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {list.title}
                  </span>
                  <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-emerald-500 transition-colors ml-auto" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Apply What You&apos;ve Learned?
            </h2>
            <p className="mt-6 text-lg text-neutral-600 dark:text-white/60">
              Get a free audit to see how your brand appears across AI platforms and identify optimization opportunities.
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
