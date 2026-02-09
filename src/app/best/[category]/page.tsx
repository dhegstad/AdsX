import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Star,
  CheckCircle,
  Info,
  HelpCircle,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import {
  getAllLists,
  getListBySlug,
  getListsByCategory,
  type CuratedList,
} from "@/lib/curated-lists";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  SchemaScript,
} from "@/lib/seo/schemas";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const lists = getAllLists();
  return lists.map((list) => ({
    category: list.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const list = getListBySlug(slug);

  if (!list) {
    return { title: "List Not Found" };
  }

  return createPageMetadata({
    title: `${list.title} | AdsX`,
    description: list.description,
    path: `/best/${slug}`,
    keywords: list.keywords,
  });
}

const categoryLabels: Record<string, string> = {
  tools: "Tools & Software",
  strategies: "Strategies",
  resources: "Resources",
  guides: "Guides",
};

export default async function CuratedListPage({ params }: PageProps) {
  const { category: slug } = await params;
  const list = getListBySlug(slug);

  if (!list) {
    notFound();
  }

  const relatedLists = getListsByCategory(list.category)
    .filter((l) => l.slug !== slug)
    .slice(0, 3);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Best Of", path: "/best" },
    { name: list.title, path: `/best/${slug}` },
  ];

  const faqItems = list.faqs.map((faq) => ({
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
                href="/best"
                className="text-neutral-500 hover:text-emerald-600 dark:text-white/50 dark:hover:text-emerald-400"
              >
                Best Of
              </Link>
              <span className="mx-2 text-neutral-300 dark:text-white/30">/</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                {list.title}
              </span>
            </nav>

            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm">
                  <Star className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {categoryLabels[list.category]}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-white/20 px-4 py-2 text-sm">
                  <Calendar className="h-3 w-3" />
                  <span className="text-neutral-600 dark:text-white/60">
                    Updated {list.lastUpdated}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {list.headline}
              </h1>

              <p className="mt-6 text-lg text-neutral-600 dark:text-white/60">
                {list.description}
              </p>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <p className="text-lg text-neutral-600 dark:text-white/70 leading-relaxed">
              {list.intro}
            </p>
          </div>
        </section>

        {/* Methodology */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-12 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="flex items-start gap-4 p-6 rounded-xl border border-blue-500/20 bg-blue-500/5">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  Our Methodology
                </h2>
                <p className="text-sm text-blue-800 dark:text-blue-200/80">
                  {list.methodology}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Items */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">{list.title}</h2>
            <div className="space-y-6">
              {list.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                          {idx + 1}
                        </span>
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        {item.link && (
                          <Link
                            href={item.link}
                            className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                      <p className="text-neutral-600 dark:text-white/70 mb-3">
                        {item.description}
                      </p>
                      <div className="inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                        <CheckCircle className="h-3 w-3" />
                        <span>{item.highlight}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Considerations */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">Key Considerations</h2>
            <ul className="space-y-4">
              {list.considerations.map((consideration, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-neutral-700 dark:text-white/80">{consideration}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQs */}
        {list.faqs.length > 0 && (
          <section className="border-t border-neutral-200 dark:border-white/10 py-16">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <HelpCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-6">
                {list.faqs.map((faq, idx) => (
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

        {/* Related Lists */}
        {relatedLists.length > 0 && (
          <section className="border-t border-neutral-200 dark:border-white/10 py-16 bg-neutral-50 dark:bg-transparent">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedLists.map((l) => (
                  <Link
                    key={l.slug}
                    href={`/best/${l.slug}`}
                    className="group p-6 rounded-xl border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-white dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                      {categoryLabels[l.category]}
                    </span>
                    <h3 className="font-semibold mt-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {l.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-white/60 mt-2 line-clamp-2">
                      {l.description}
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
              Ready to Improve Your AI Visibility?
            </h2>
            <p className="mt-6 text-lg text-neutral-600 dark:text-white/60">
              Get a free audit to see where you stand and identify your biggest opportunities.
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
                href="/best"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 dark:border-white/20 px-8 py-4 text-base font-medium hover:bg-neutral-50 dark:hover:bg-white/5 transition-all"
              >
                Browse All Guides
              </Link>
            </div>
          </div>
        </section>
      </ThemedLayout>
    </>
  );
}
