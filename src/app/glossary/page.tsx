import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Search } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import { getAllTerms, getGlossaryCategories, getTermsByCategory, type GlossaryTerm } from "@/lib/glossary";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

export const metadata: Metadata = createPageMetadata({
  title: "AI Visibility Glossary: Terms & Definitions | AdsX",
  description:
    "Complete glossary of AI visibility terms. Learn about LLMs, AI assistants, optimization techniques, and key concepts for getting your brand recommended by AI.",
  path: "/glossary",
  keywords: [
    "AI visibility glossary",
    "AI marketing terms",
    "LLM terminology",
    "AI optimization glossary",
    "ChatGPT terms",
  ],
});

const categoryLabels: Record<string, string> = {
  "ai-fundamentals": "AI Fundamentals",
  "visibility": "Visibility Concepts",
  "optimization": "Optimization Techniques",
  "measurement": "Measurement & Analytics",
  "strategy": "Strategy & Planning",
  "platforms": "AI Platforms",
};

const categoryDescriptions: Record<string, string> = {
  "ai-fundamentals": "Core concepts about AI, large language models, and how AI systems work.",
  "visibility": "Key concepts related to brand presence and discoverability in AI systems.",
  "optimization": "Techniques and strategies for improving AI visibility.",
  "measurement": "How to track and measure AI visibility performance.",
  "strategy": "Strategic planning concepts for AI visibility initiatives.",
  "platforms": "Specific AI platforms and their unique characteristics.",
};

export default function GlossaryIndexPage() {
  const categories = getGlossaryCategories();
  const allTerms = getAllTerms();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Glossary", path: "/glossary" },
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
                Glossary
              </span>
            </nav>

            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm mb-6">
                <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {allTerms.length} Terms
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                AI Visibility{" "}
                <span className="gradient-text">Glossary</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-white/60">
                Your comprehensive guide to AI visibility terminology. Understand the concepts,
                techniques, and platforms that matter for getting your brand recommended by AI.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                  {allTerms.length}
                </div>
                <div className="mt-2 text-sm text-neutral-600 dark:text-white/60">
                  Terms Defined
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                  {categories.length}
                </div>
                <div className="mt-2 text-sm text-neutral-600 dark:text-white/60">
                  Categories
                </div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                  {allTerms.reduce((acc, t) => acc + t.faqs.length, 0)}
                </div>
                <div className="mt-2 text-sm text-neutral-600 dark:text-white/60">
                  FAQs Answered
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        {categories.map((cat) => {
          const terms = getTermsByCategory(cat.slug as GlossaryTerm["category"]);
          return (
            <section
              key={cat.slug}
              className="border-t border-neutral-200 dark:border-white/10 py-16"
            >
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">
                    {categoryLabels[cat.slug]}
                  </h2>
                  <p className="text-neutral-600 dark:text-white/60">
                    {categoryDescriptions[cat.slug]}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {terms.map((term) => (
                    <Link
                      key={term.slug}
                      href={`/glossary/${term.slug}`}
                      className="group p-5 rounded-xl border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-white dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {term.term}
                          </h3>
                          <p className="mt-2 text-sm text-neutral-600 dark:text-white/60 line-clamp-2">
                            {term.shortDefinition}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0 mt-0.5" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* All Terms A-Z */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">All Terms A-Z</h2>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {allTerms
                .sort((a, b) => a.term.localeCompare(b.term))
                .map((term) => (
                  <Link
                    key={term.slug}
                    href={`/glossary/${term.slug}`}
                    className="flex items-center gap-2 p-3 rounded-lg hover:bg-white dark:hover:bg-white/[0.02] transition-colors group"
                  >
                    <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-emerald-500 transition-colors" />
                    <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {term.term}
                    </span>
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
