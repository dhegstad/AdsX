import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Building2,
} from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import {
  getAllLocations,
  getLocationBySlug,
} from "@/lib/locations";
import { getAllIndustries } from "@/lib/industries";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  SchemaScript,
} from "@/lib/seo/schemas";

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  const locations = getAllLocations();
  return locations.map((location) => ({
    city: location.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return { title: "Location Not Found" };
  }

  return createPageMetadata({
    title: `${location.headline} | AdsX`,
    description: location.description,
    path: `/locations/${slug}`,
    keywords: location.keywords,
  });
}

const challengeIcons = [AlertTriangle, TrendingUp, MapPin, Building2];
const opportunityIcons = [Lightbulb, TrendingUp, CheckCircle, Building2];

export default async function LocationPage({ params }: PageProps) {
  const { city: slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const otherLocations = getAllLocations()
    .filter((l) => l.slug !== slug)
    .slice(0, 4);

  const industries = getAllIndustries();
  const relevantIndustries = industries.filter((i) =>
    location.relevantIndustries.includes(i.slug)
  );

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
    { name: location.city, path: `/locations/${slug}` },
  ];

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
      <SchemaScript schema={createFAQSchema(location.faqs)} />
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
                href="/locations"
                className="text-neutral-500 hover:text-emerald-600 dark:text-white/50 dark:hover:text-emerald-400"
              >
                Locations
              </Link>
              <span className="mx-2 text-neutral-300 dark:text-white/30">/</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                {location.city}
              </span>
            </nav>

            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm mb-6">
                <MapPin className="h-4 w-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {location.city}, {location.state}
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {location.headline.split(" ").slice(0, -2).join(" ")}{" "}
                <span className="gradient-text">
                  {location.headline.split(" ").slice(-2).join(" ")}
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-white/60">
                {location.description}
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
              {location.stats.map((stat) => (
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

        {/* Market Context */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-8">
                The {location.city} Market
              </h2>
              <p className="text-lg text-neutral-600 dark:text-white/60 leading-relaxed">
                {location.marketContext}
              </p>
            </div>
          </div>
        </section>

        {/* AI Adoption Insights */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm mb-6">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  AI Adoption Insights
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">
                AI Search in {location.city}
              </h2>
              <p className="text-lg text-neutral-600 dark:text-white/60 leading-relaxed">
                {location.aiAdoptionInsights}
              </p>
            </div>
          </div>
        </section>

        {/* Local Challenges */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {location.city} AI Visibility Challenges
              </h2>
              <p className="mt-4 text-lg text-neutral-600 dark:text-white/60">
                Unique obstacles businesses face in the {location.city} market
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {location.localChallenges.map((challenge, idx) => {
                const Icon = challengeIcons[idx % challengeIcons.length];
                return (
                  <div
                    key={challenge.title}
                    className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <Icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
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

        {/* Local Opportunities */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {location.city} AI Visibility Opportunities
              </h2>
              <p className="mt-4 text-lg text-neutral-600 dark:text-white/60">
                Why {location.city} is a prime market for AI search visibility
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {location.localOpportunities.map((opportunity, idx) => {
                const Icon = opportunityIcons[idx % opportunityIcons.length];
                return (
                  <div
                    key={opportunity.title}
                    className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <Icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{opportunity.title}</h3>
                        <p className="mt-2 text-neutral-600 dark:text-white/60">
                          {opportunity.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Relevant Industries */}
        {relevantIndustries.length > 0 && (
          <section className="border-t border-neutral-200 dark:border-white/10 py-16 bg-neutral-50 dark:bg-transparent">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-8">
                Key Industries in {location.city}
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {relevantIndustries.map((industry) => (
                  <Link
                    key={industry.slug}
                    href={`/industries/${industry.slug}`}
                    className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-white dark:hover:bg-white/[0.02] transition-colors group"
                  >
                    <div>
                      <div className="font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {industry.name}
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-white/50">
                        AI Visibility Solutions
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-12">
              AI Visibility FAQs for {location.city}
            </h2>
            <div className="space-y-8">
              {location.faqs.map((faq) => (
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

        {/* Other Locations */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Other Locations We Serve</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {otherLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-white dark:hover:bg-white/[0.02] transition-colors group"
                >
                  <div>
                    <div className="font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {loc.city}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-white/50">
                      {loc.state}
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/locations"
                className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
              >
                View all locations
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Dominate AI Search in {location.city}?
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
