import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import { getAllIntegrations, type Integration } from "@/lib/integrations";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

export const metadata: Metadata = createPageMetadata({
  title: "Platform Integrations | AdsX",
  description:
    "Get AI search visibility for your platform. We help businesses using Shopify, HubSpot, Salesforce, WordPress, and more get recommended by ChatGPT, Claude, and Perplexity.",
  path: "/integrations",
  keywords: [
    "AI visibility integrations",
    "Shopify AI visibility",
    "HubSpot AI search",
    "platform AI optimization",
  ],
});

const categoryLabels: Record<Integration["category"], string> = {
  ecommerce: "E-commerce",
  crm: "CRM",
  marketing: "Marketing",
  analytics: "Analytics",
  cms: "CMS",
};

const categoryDescriptions: Record<Integration["category"], string> = {
  ecommerce: "E-commerce platforms for online stores",
  crm: "Customer relationship management platforms",
  marketing: "Marketing automation platforms",
  analytics: "Analytics and tracking platforms",
  cms: "Content management systems",
};

export default function IntegrationsPage() {
  const integrations = getAllIntegrations();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Integrations", path: "/integrations" },
  ];

  // Group integrations by category
  const categories = integrations.reduce(
    (acc, integration) => {
      if (!acc[integration.category]) {
        acc[integration.category] = [];
      }
      acc[integration.category].push(integration);
      return acc;
    },
    {} as Record<Integration["category"], Integration[]>
  );

  const categoryOrder: Integration["category"][] = [
    "ecommerce",
    "crm",
    "marketing",
    "cms",
    "analytics",
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
                Integrations
              </span>
            </nav>

            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm mb-6">
                <Layers className="h-4 w-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Platform Integrations
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                AI Visibility for{" "}
                <span className="gradient-text">Your Platform</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-white/60">
                Get your business recommended by AI assistants, optimized for the platforms you already use.
                We help businesses on Shopify, HubSpot, WordPress, and more dominate AI search results.
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

        {/* Integrations Grid */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="space-y-16">
              {categoryOrder
                .filter((category) => categories[category])
                .map((category) => (
                  <div key={category}>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold">{categoryLabels[category]}</h2>
                      <p className="text-neutral-600 dark:text-white/60 mt-1">
                        {categoryDescriptions[category]}
                      </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {categories[category].map((integration) => (
                        <Link
                          key={integration.slug}
                          href={`/integrations/${integration.slug}`}
                          className="group rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6 hover:border-emerald-500/30 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                {integration.name}
                              </h3>
                              <p className="text-neutral-600 dark:text-white/60 text-sm mt-2 line-clamp-2">
                                {integration.description}
                              </p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0" />
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {integration.useCases.slice(0, 2).map((useCase) => (
                              <span
                                key={useCase.title}
                                className="text-xs text-neutral-500 dark:text-white/50 bg-neutral-100 dark:bg-white/5 px-2 py-1 rounded-full"
                              >
                                {useCase.title}
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
              Don&apos;t See Your Platform?
            </h2>
            <p className="mt-6 text-lg text-neutral-600 dark:text-white/60">
              We work with businesses on any platform. Get in touch to discuss AI visibility for your setup.
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
