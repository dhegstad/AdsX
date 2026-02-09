import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Users,
  Target,
  Lightbulb,
  CheckCircle,
  MessageCircle,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import {
  getAllPlatforms,
  getPlatformBySlug,
  type Platform,
} from "@/lib/platforms";
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
  const platforms = getAllPlatforms();
  return platforms.map((platform) => ({
    platform: platform.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { platform: slug } = await params;
  const platform = getPlatformBySlug(slug);

  if (!platform) {
    return { title: "Platform Not Found" };
  }

  return createPageMetadata({
    title: `${platform.headline} | AdsX`,
    description: platform.description,
    path: `/platforms/${slug}`,
    keywords: platform.keywords,
  });
}

const importanceBadges: Record<string, { label: string; className: string }> = {
  critical: {
    label: "Critical Priority",
    className: "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400",
  },
  high: {
    label: "High Priority",
    className: "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400",
  },
  medium: {
    label: "Medium Priority",
    className: "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400",
  },
};

export default async function PlatformPage({ params }: PageProps) {
  const { platform: slug } = await params;
  const platform = getPlatformBySlug(slug);

  if (!platform) {
    notFound();
  }

  const otherPlatforms = getAllPlatforms().filter((p) => p.slug !== slug);
  const badge = importanceBadges[platform.visibilityImportance];

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "AI Platforms", path: "/platforms" },
    { name: platform.name, path: `/platforms/${slug}` },
  ];

  const faqItems = platform.faqs.map((faq) => ({
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
                href="/platforms"
                className="text-neutral-500 hover:text-emerald-600 dark:text-white/50 dark:hover:text-emerald-400"
              >
                AI Platforms
              </Link>
              <span className="mx-2 text-neutral-300 dark:text-white/30">/</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                {platform.name}
              </span>
            </nav>

            <div className="mx-auto max-w-3xl text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {platform.company}
                  </span>
                </div>
                <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm ${badge.className}`}>
                  <TrendingUp className="h-3 w-3" />
                  <span className="font-medium">{badge.label}</span>
                </div>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {platform.headline.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="gradient-text">
                  {platform.headline.split(" ").slice(-1)}
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-white/60">
                {platform.description}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/tools/free-audit"
                  className="group flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 text-base font-medium text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/25"
                >
                  Check Your {platform.name} Visibility
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
              {platform.stats.map((stat) => (
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

        {/* Overview */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">About {platform.name}</h2>
            <p className="text-lg text-neutral-600 dark:text-white/70 leading-relaxed">
              {platform.overview}
            </p>
          </div>
        </section>

        {/* User Base */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold">Who Uses {platform.name}</h2>
            </div>
            <p className="text-lg text-neutral-600 dark:text-white/70 leading-relaxed">
              {platform.userBase}
            </p>
            <div className="mt-6 p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-neutral-700 dark:text-white/80">
                <strong>Audience Profile:</strong> {platform.audienceProfile}
              </p>
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Lightbulb className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold">Why {platform.name} Visibility Matters</h2>
            </div>
            <p className="text-lg text-neutral-600 dark:text-white/70 leading-relaxed">
              {platform.whyItMatters}
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold">{platform.name} Key Features</h2>
              <p className="mt-2 text-neutral-600 dark:text-white/60">
                Features that impact visibility opportunities
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {platform.keyFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <MessageCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.feature}</h3>
                      <p className="mt-2 text-neutral-600 dark:text-white/60">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Optimization Strategies */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <Target className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold">
                How to Optimize for {platform.name}
              </h2>
              <p className="mt-2 text-neutral-600 dark:text-white/60">
                Strategies to improve your visibility on this platform
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {platform.optimizationStrategies.map((strategy, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-6 rounded-xl border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 transition-colors"
                >
                  <CheckCircle className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">{strategy.strategy}</h3>
                    <p className="mt-1 text-neutral-600 dark:text-white/60">
                      {strategy.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        {platform.faqs.length > 0 && (
          <section className="border-t border-neutral-200 dark:border-white/10 py-16 bg-neutral-50 dark:bg-transparent">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <HelpCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold">
                  {platform.name} Visibility FAQs
                </h2>
              </div>
              <div className="space-y-6">
                {platform.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02]"
                  >
                    <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                    <p className="text-neutral-600 dark:text-white/70">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Other Platforms */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Other AI Platforms</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {otherPlatforms.slice(0, 6).map((p) => (
                <Link
                  key={p.slug}
                  href={`/platforms/${p.slug}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-white dark:hover:bg-white/[0.02] transition-colors group"
                >
                  <div>
                    <div className="font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {p.name}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-white/50">
                      {p.company}
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
              Ready to Dominate {platform.name} Visibility?
            </h2>
            <p className="mt-6 text-lg text-neutral-600 dark:text-white/60">
              Get a free audit to see how your brand appears on {platform.name} and other AI platforms.
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
