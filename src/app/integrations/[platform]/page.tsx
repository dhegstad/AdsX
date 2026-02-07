import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Lightbulb,
  MessageCircle,
  Layers,
} from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import {
  getAllIntegrations,
  getIntegrationBySlug,
} from "@/lib/integrations";
import { getAllIndustries } from "@/lib/industries";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  SchemaScript,
} from "@/lib/seo/schemas";

interface PageProps {
  params: Promise<{ platform: string }>;
}

export async function generateStaticParams() {
  const integrations = getAllIntegrations();
  return integrations.map((integration) => ({
    platform: integration.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { platform: slug } = await params;
  const integration = getIntegrationBySlug(slug);

  if (!integration) {
    return { title: "Integration Not Found" };
  }

  return createPageMetadata({
    title: `${integration.headline} | AdsX`,
    description: integration.description,
    path: `/integrations/${slug}`,
    keywords: integration.keywords,
  });
}

const categoryLabels = {
  ecommerce: "E-commerce Platform",
  crm: "CRM Platform",
  marketing: "Marketing Platform",
  analytics: "Analytics Platform",
  cms: "Content Management System",
};

const useCaseIcons = [Zap, CheckCircle, Lightbulb, MessageCircle, Layers];

export default async function IntegrationPage({ params }: PageProps) {
  const { platform: slug } = await params;
  const integration = getIntegrationBySlug(slug);

  if (!integration) {
    notFound();
  }

  const otherIntegrations = getAllIntegrations()
    .filter((i) => i.slug !== slug)
    .slice(0, 4);

  const industries = getAllIndustries();
  const relevantIndustry = industries.find(
    (i) => i.slug === integration.relevantIndustry
  );

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Integrations", path: "/integrations" },
    { name: integration.name, path: `/integrations/${slug}` },
  ];

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
      <SchemaScript schema={createFAQSchema(integration.faqs)} />
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
                href="/integrations"
                className="text-neutral-500 hover:text-emerald-600 dark:text-white/50 dark:hover:text-emerald-400"
              >
                Integrations
              </Link>
              <span className="mx-2 text-neutral-300 dark:text-white/30">/</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                {integration.name}
              </span>
            </nav>

            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm mb-6">
                <Layers className="h-4 w-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {categoryLabels[integration.category]}
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                AI Visibility for{" "}
                <span className="gradient-text">{integration.name}</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-white/60">
                {integration.description}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/tools/free-audit"
                  className="group flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 text-base font-medium text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/25"
                >
                  Get Your Free Audit
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 rounded-lg border border-neutral-300 dark:border-white/20 px-8 py-4 text-base font-medium hover:bg-neutral-50 dark:hover:bg-white/5 transition-all"
                >
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Context */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-8">
                About {integration.name}
              </h2>
              <p className="text-lg text-neutral-600 dark:text-white/60 leading-relaxed">
                {integration.platformContext}
              </p>
            </div>
          </div>
        </section>

        {/* Why AI Matters */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm mb-6">
                <Zap className="h-4 w-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Why It Matters
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">
                AI Visibility for {integration.name} Users
              </h2>
              <p className="text-lg text-neutral-600 dark:text-white/60 leading-relaxed">
                {integration.whyAIMatters}
              </p>
            </div>
          </div>
        </section>

        {/* Common AI Queries */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Common AI Queries for {integration.name} Users
              </h2>
              <p className="mt-4 text-lg text-neutral-600 dark:text-white/60">
                The types of questions your customers are asking AI
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="grid gap-4">
                {integration.commonQueries.map((query) => (
                  <div
                    key={query}
                    className="flex items-center gap-3 p-4 rounded-lg border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02]"
                  >
                    <MessageCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span className="text-neutral-700 dark:text-white/80 font-medium">
                      &ldquo;{query}&rdquo;
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How We Help {integration.name} Users
              </h2>
              <p className="mt-4 text-lg text-neutral-600 dark:text-white/60">
                Specific use cases for AI visibility optimization
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {integration.useCases.map((useCase, idx) => {
                const Icon = useCaseIcons[idx % useCaseIcons.length];
                return (
                  <div
                    key={useCase.title}
                    className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-4">
                      <Icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-neutral-600 dark:text-white/60 text-sm mb-4">
                      {useCase.description}
                    </p>
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                        Benefit
                      </span>
                      <p className="text-sm text-neutral-600 dark:text-white/60 mt-1">
                        {useCase.benefit}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Optimization Tips */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {integration.name} AI Optimization Tips
              </h2>
              <p className="mt-4 text-lg text-neutral-600 dark:text-white/60">
                Best practices for maximizing AI visibility
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {integration.optimizationTips.map((tip, idx) => (
                <div
                  key={tip.tip}
                  className="flex items-start gap-4 p-6 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{tip.tip}</h3>
                    <p className="text-sm text-neutral-600 dark:text-white/60">
                      {tip.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Industry */}
        {relevantIndustry && (
          <section className="border-t border-neutral-200 dark:border-white/10 py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-8">Related Industry</h2>
              <Link
                href={`/industries/${relevantIndustry.slug}`}
                className="flex items-center justify-between p-6 rounded-xl border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors group max-w-xl"
              >
                <div>
                  <div className="font-semibold text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {relevantIndustry.name}
                  </div>
                  <div className="text-neutral-500 dark:text-white/50 mt-1">
                    {relevantIndustry.subheadline}
                  </div>
                </div>
                <ArrowRight className="h-6 w-6 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-12">
              {integration.name} AI Visibility FAQs
            </h2>
            <div className="space-y-8">
              {integration.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="border-b border-neutral-200 dark:border-white/10 pb-8"
                >
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-neutral-600 dark:text-white/60">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Integrations */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Other Integrations</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {otherIntegrations.map((i) => (
                <Link
                  key={i.slug}
                  href={`/integrations/${i.slug}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors group"
                >
                  <div>
                    <div className="font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {i.name}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-white/50">
                      {categoryLabels[i.category]}
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/integrations"
                className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
              >
                View all integrations
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Optimize {integration.name} for AI Search?
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
