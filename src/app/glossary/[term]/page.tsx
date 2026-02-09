import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Lightbulb, Info, HelpCircle } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import {
  getAllTerms,
  getTermBySlug,
  getTermsByCategory,
  type GlossaryTerm,
} from "@/lib/glossary";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  SchemaScript,
} from "@/lib/seo/schemas";

interface PageProps {
  params: Promise<{ term: string }>;
}

export async function generateStaticParams() {
  const terms = getAllTerms();
  return terms.map((term) => ({
    term: term.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { term: slug } = await params;
  const term = getTermBySlug(slug);

  if (!term) {
    return { title: "Term Not Found" };
  }

  return createPageMetadata({
    title: `${term.term}: Definition & Why It Matters for AI Visibility | AdsX`,
    description: `${term.shortDefinition} Learn why ${term.term.toLowerCase()} matters for your brand's AI visibility strategy.`,
    path: `/glossary/${slug}`,
    keywords: term.keywords,
  });
}

const categoryLabels: Record<string, string> = {
  "ai-fundamentals": "AI Fundamentals",
  "visibility": "Visibility Concepts",
  "optimization": "Optimization Techniques",
  "measurement": "Measurement & Analytics",
  "strategy": "Strategy & Planning",
  "platforms": "AI Platforms",
};

export default async function GlossaryTermPage({ params }: PageProps) {
  const { term: slug } = await params;
  const term = getTermBySlug(slug);

  if (!term) {
    notFound();
  }

  const categoryTerms = getTermsByCategory(term.category).filter((t) => t.slug !== slug);
  const relatedInCategory = categoryTerms.slice(0, 4);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Glossary", path: "/glossary" },
    { name: term.term, path: `/glossary/${slug}` },
  ];

  const faqItems = term.faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
      <SchemaScript schema={createFAQSchema(faqItems)} />
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
                href="/glossary"
                className="text-neutral-500 hover:text-emerald-600 dark:text-white/50 dark:hover:text-emerald-400"
              >
                Glossary
              </Link>
              <span className="mx-2 text-neutral-300 dark:text-white/30">/</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                {term.term}
              </span>
            </nav>

            <div className="mx-auto max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm mb-6">
                <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {categoryLabels[term.category]}
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {term.term}
              </h1>

              <p className="mt-6 text-xl text-neutral-600 dark:text-white/60">
                {term.shortDefinition}
              </p>
            </div>
          </div>
        </section>

        {/* Full Definition */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">What is {term.term}?</h2>
            <p className="text-lg text-neutral-600 dark:text-white/70 leading-relaxed">
              {term.fullDefinition}
            </p>

            {term.usageInContext && (
              <div className="mt-8 p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-neutral-700 dark:text-white/80">
                    <strong>In Practice:</strong> {term.usageInContext}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Why It Matters */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Lightbulb className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold">Why It Matters for AI Visibility</h2>
            </div>
            <p className="text-lg text-neutral-600 dark:text-white/70 leading-relaxed">
              {term.whyItMatters}
            </p>
          </div>
        </section>

        {/* Examples */}
        {term.examples.length > 0 && (
          <section className="border-t border-neutral-200 dark:border-white/10 py-16">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-6">Examples</h2>
              <ul className="space-y-4">
                {term.examples.map((example, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-lg border border-neutral-200 dark:border-white/10"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      {idx + 1}
                    </span>
                    <span className="text-neutral-600 dark:text-white/70">{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Common Misconceptions */}
        {term.commonMisconceptions && (
          <section className="border-t border-neutral-200 dark:border-white/10 py-16 bg-neutral-50 dark:bg-transparent">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-6">Common Misconceptions</h2>
              <div className="p-6 rounded-xl border border-amber-500/30 bg-amber-500/5">
                <p className="text-neutral-600 dark:text-white/70">
                  {term.commonMisconceptions}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        {term.faqs.length > 0 && (
          <section className="border-t border-neutral-200 dark:border-white/10 py-16">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <HelpCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-6">
                {term.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl border border-neutral-200 dark:border-white/10"
                  >
                    <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                    <p className="text-neutral-600 dark:text-white/70">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Terms */}
        {term.relatedTerms.length > 0 && (
          <section className="border-t border-neutral-200 dark:border-white/10 py-16 bg-neutral-50 dark:bg-transparent">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-6">Related Terms</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {term.relatedTerms.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/glossary/${related.slug}`}
                    className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-white dark:hover:bg-white/[0.02] transition-colors group"
                  >
                    <span className="font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {related.term}
                    </span>
                    <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* More from Category */}
        {relatedInCategory.length > 0 && (
          <section className="border-t border-neutral-200 dark:border-white/10 py-16">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-6">
                More {categoryLabels[term.category]} Terms
              </h2>
              <div className="grid gap-4">
                {relatedInCategory.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/glossary/${t.slug}`}
                    className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-white dark:hover:bg-white/[0.02] transition-colors group"
                  >
                    <div>
                      <div className="font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {t.term}
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-white/50 mt-1">
                        {t.shortDefinition}
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Improve Your AI Visibility?
            </h2>
            <p className="mt-6 text-lg text-neutral-600 dark:text-white/60">
              Get a free audit to see how your brand appears across ChatGPT, Claude, Perplexity, and other AI platforms.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/tools/free-audit"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 text-base font-medium text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/25"
              >
                Get Your Free Audit
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/glossary"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 dark:border-white/20 px-8 py-4 text-base font-medium hover:bg-neutral-50 dark:hover:bg-white/5 transition-all"
              >
                Browse All Terms
              </Link>
            </div>
          </div>
        </section>
      </ThemedLayout>
    </>
  );
}
