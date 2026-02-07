import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import { getAllLocations } from "@/lib/locations";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

export const metadata: Metadata = createPageMetadata({
  title: "AI Search Visibility by Location | AdsX",
  description:
    "Get your business recommended by ChatGPT, Claude, and Perplexity in your local market. We help businesses across major U.S. cities dominate AI search results.",
  path: "/locations",
  keywords: [
    "local AI visibility",
    "AI search optimization by city",
    "ChatGPT marketing local",
    "AI visibility services",
  ],
});

export default function LocationsPage() {
  const locations = getAllLocations();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
  ];

  // Group locations by region
  const regions = locations.reduce(
    (acc, location) => {
      if (!acc[location.region]) {
        acc[location.region] = [];
      }
      acc[location.region].push(location);
      return acc;
    },
    {} as Record<string, typeof locations>
  );

  const regionOrder = ["Northeast", "Southeast", "Midwest", "Southwest", "West", "Northwest", "Mountain"];

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
                Locations
              </span>
            </nav>

            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm mb-6">
                <MapPin className="h-4 w-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Local AI Visibility
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                AI Search Visibility{" "}
                <span className="gradient-text">by Location</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-white/60">
                Get your business recommended by AI assistants in your local market.
                We help businesses across major U.S. cities dominate ChatGPT, Claude, and Perplexity results.
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

        {/* Locations Grid */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="space-y-16">
              {regionOrder
                .filter((region) => regions[region])
                .map((region) => (
                  <div key={region}>
                    <h2 className="text-2xl font-bold mb-8">{region}</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {regions[region].map((location) => (
                        <Link
                          key={location.slug}
                          href={`/locations/${location.slug}`}
                          className="group rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6 hover:border-emerald-500/30 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <MapPin className="h-5 w-5 text-emerald-500" />
                                <h3 className="text-xl font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                  {location.city}
                                </h3>
                              </div>
                              <p className="text-sm text-neutral-500 dark:text-white/50 mb-4">
                                {location.state}
                              </p>
                              <p className="text-neutral-600 dark:text-white/60 text-sm line-clamp-2">
                                {location.description}
                              </p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0" />
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {location.stats.slice(0, 1).map((stat) => (
                              <span
                                key={stat.label}
                                className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full"
                              >
                                <span className="font-semibold">{stat.value}</span>
                                <span className="text-neutral-500 dark:text-white/50">
                                  {stat.label.split(" ").slice(0, 3).join(" ")}...
                                </span>
                              </span>
                            ))}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Don&apos;t See Your City?
            </h2>
            <p className="mt-6 text-lg text-neutral-600 dark:text-white/60">
              We work with businesses in any location. Get in touch to discuss AI visibility for your market.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 text-base font-medium text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/25"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </ThemedLayout>
    </>
  );
}
