import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Target,
  TrendingUp,
  CheckCircle,
  Quote,
  Clock,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import {
  getAllExamples,
  getExampleBySlug,
  getExamplesByCategory,
  type BrandExample,
} from "@/lib/examples";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  SchemaScript,
} from "@/lib/seo/schemas";

interface PageProps {
  params: Promise<{ brand: string }>;
}

export async function generateStaticParams() {
  const examples = getAllExamples();
  return examples.map((example) => ({
    brand: example.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand: slug } = await params;
  const example = getExampleBySlug(slug);

  if (!example) {
    return { title: "Example Not Found" };
  }

  return createPageMetadata({
    title: `${example.headline} | AdsX Case Study`,
    description: example.description,
    path: `/examples/${slug}`,
    keywords: example.keywords,
  });
}

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

export default async function ExamplePage({ params }: PageProps) {
  const { brand: slug } = await params;
  const example = getExampleBySlug(slug);

  if (!example) {
    notFound();
  }

  const relatedExamples = getExamplesByCategory(example.category)
    .filter((e) => e.slug !== slug)
    .slice(0, 3);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Examples", path: "/examples" },
    { name: example.brand, path: `/examples/${slug}` },
  ];

  const faqItems = example.faqs.map((faq) => ({
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
                href="/examples"
                className="text-neutral-500 hover:text-emerald-600 dark:text-white/50 dark:hover:text-emerald-400"
              >
                Examples
              </Link>
              <span className="mx-2 text-neutral-300 dark:text-white/30">/</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                {example.brand}
              </span>
            </nav>

            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm">
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {categoryLabels[example.category]}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-white/20 px-4 py-2 text-sm">
                  <Clock className="h-3 w-3" />
                  <span className="text-neutral-600 dark:text-white/60">
                    {example.timeline}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {example.headline}
              </h1>

              <p className="mt-6 text-lg text-neutral-600 dark:text-white/60">
                {example.description}
              </p>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {example.metrics.map((metric) => (
                <div key={metric.metric} className="text-center">
                  <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                    {metric.value}
                  </div>
                  <div className="mt-1 font-medium">{metric.metric}</div>
                  <div className="mt-1 text-sm text-neutral-500 dark:text-white/50">
                    {metric.context}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Challenge */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20">
                <Target className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold">The Challenge</h2>
            </div>
            <p className="text-lg text-neutral-600 dark:text-white/70 leading-relaxed">
              {example.challenge}
            </p>
          </div>
        </section>

        {/* Approach */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold">The Approach</h2>
            </div>
            <p className="text-lg text-neutral-600 dark:text-white/70 leading-relaxed">
              {example.approach}
            </p>
          </div>
        </section>

        {/* Strategies */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold">Key Strategies</h2>
              <p className="mt-2 text-neutral-600 dark:text-white/60">
                The specific tactics that drove success
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {example.strategies.map((strategy, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02]"
                >
                  <h3 className="font-semibold text-lg mb-3">{strategy.strategy}</h3>
                  <p className="text-sm text-neutral-600 dark:text-white/60 mb-4">
                    {strategy.implementation}
                  </p>
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-emerald-700 dark:text-emerald-300">
                      {strategy.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold">The Results</h2>
            </div>
            <p className="text-lg text-neutral-600 dark:text-white/70 leading-relaxed">
              {example.results}
            </p>
          </div>
        </section>

        {/* Quote */}
        {example.quote && (
          <section className="border-t border-neutral-200 dark:border-white/10 py-16">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
              <div className="relative p-8 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <Quote className="absolute top-4 left-4 h-8 w-8 text-emerald-500/30" />
                <blockquote className="pl-8">
                  <p className="text-xl italic text-neutral-700 dark:text-white/80 mb-4">
                    &ldquo;{example.quote.text}&rdquo;
                  </p>
                  <footer className="text-neutral-600 dark:text-white/60">
                    <span className="font-medium">{example.quote.author}</span>
                    <span className="mx-2">-</span>
                    <span>{example.quote.role}</span>
                  </footer>
                </blockquote>
              </div>
            </div>
          </section>
        )}

        {/* Key Takeaways */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">Key Takeaways</h2>
            <ul className="space-y-4">
              {example.keyTakeaways.map((takeaway, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-lg border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02]"
                >
                  <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-neutral-700 dark:text-white/80">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQs */}
        {example.faqs.length > 0 && (
          <section className="border-t border-neutral-200 dark:border-white/10 py-16">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <HelpCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-6">
                {example.faqs.map((faq, idx) => (
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

        {/* Related Examples */}
        {relatedExamples.length > 0 && (
          <section className="border-t border-neutral-200 dark:border-white/10 py-16 bg-neutral-50 dark:bg-transparent">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-8">
                More {categoryLabels[example.category]} Examples
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedExamples.map((ex) => (
                  <Link
                    key={ex.slug}
                    href={`/examples/${ex.slug}`}
                    className="group p-6 rounded-xl border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-white dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="font-semibold text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                      {ex.brand}
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-white/50 mb-3">
                      {ex.industry}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-white/60 line-clamp-2">
                      {ex.headline}
                    </p>
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
              Ready for Similar Results?
            </h2>
            <p className="mt-6 text-lg text-neutral-600 dark:text-white/60">
              Get a free audit to see how your brand can improve AI visibility like {example.brand}.
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
                href="/examples"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 dark:border-white/20 px-8 py-4 text-base font-medium hover:bg-neutral-50 dark:hover:bg-white/5 transition-all"
              >
                Browse All Examples
              </Link>
            </div>
          </div>
        </section>
      </ThemedLayout>
    </>
  );
}
