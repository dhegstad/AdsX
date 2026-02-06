import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, TrendingUp, Target, Shield } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import {
  getAllIndustries,
  getIndustryBySlug,
  type Industry,
} from "@/lib/industries";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  SchemaScript,
} from "@/lib/seo/schemas";

interface PageProps {
  params: Promise<{ industry: string }>;
}

export async function generateStaticParams() {
  const industries = getAllIndustries();
  return industries.map((industry) => ({
    industry: industry.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return { title: "Industry Not Found" };
  }

  return createPageMetadata({
    title: `${industry.headline} | AdsX`,
    description: industry.description,
    path: `/industries/${slug}`,
    keywords: industry.keywords,
  });
}

const challengeIcons = [Target, Shield, TrendingUp, CheckCircle];

export default async function IndustryPage({ params }: PageProps) {
  const { industry: slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  const otherIndustries = getAllIndustries().filter((i) => i.slug !== slug);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: industry.name, path: `/industries/${slug}` },
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
                {industry.name}
              </span>
            </nav>

            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm mb-6">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {industry.name} Solutions
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {industry.headline.split(" ").slice(0, -2).join(" ")}{" "}
                <span className="gradient-text">
                  {industry.headline.split(" ").slice(-2).join(" ")}
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-white/60">
                {industry.subheadline}
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

        {/* Stats */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {industry.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-neutral-600 dark:text-white/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {industry.name} AI Visibility Challenges
              </h2>
              <p className="mt-4 text-lg text-neutral-600 dark:text-white/60">
                Why {industry.name.toLowerCase()} companies need dedicated AI search strategies
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {industry.challenges.map((challenge, idx) => {
                const Icon = challengeIcons[idx % challengeIcons.length];
                return (
                  <div
                    key={challenge.title}
                    className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <Icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{challenge.title}</h3>
                        <p className="mt-2 text-neutral-600 dark:text-white/60">
                          {challenge.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How We Help {industry.name} Brands
              </h2>
              <p className="mt-4 text-lg text-neutral-600 dark:text-white/60">
                Specific strategies for {industry.name.toLowerCase()} AI visibility
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {industry.useCases.map((useCase) => (
                <div
                  key={useCase.title}
                  className="flex items-start gap-4 p-6 rounded-xl border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 transition-colors"
                >
                  <CheckCircle className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">{useCase.title}</h3>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-white/60">
                      {useCase.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Industries */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Other Industries We Serve</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {otherIndustries.map((ind) => (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-white dark:hover:bg-white/[0.02] transition-colors group"
                >
                  <div>
                    <div className="font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {ind.name}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-white/50">
                      {ind.subheadline}
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
              Ready to Dominate AI Search in {industry.name}?
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
