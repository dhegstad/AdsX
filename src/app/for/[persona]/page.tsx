import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle,
  Target,
  TrendingUp,
  AlertCircle,
  MessageSquare,
  BarChart3,
  Users,
} from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import {
  getAllPersonas,
  getPersonaBySlug,
} from "@/lib/personas";
import { getAllIndustries } from "@/lib/industries";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  SchemaScript,
} from "@/lib/seo/schemas";

interface PageProps {
  params: Promise<{ persona: string }>;
}

export async function generateStaticParams() {
  const personas = getAllPersonas();
  return personas.map((persona) => ({
    persona: persona.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { persona: slug } = await params;
  const persona = getPersonaBySlug(slug);

  if (!persona) {
    return { title: "Persona Not Found" };
  }

  return createPageMetadata({
    title: `${persona.headline} | AdsX`,
    description: persona.description,
    path: `/for/${slug}`,
    keywords: persona.keywords,
  });
}

const seniorityLabels = {
  "c-suite": "C-Suite Executive",
  director: "Director Level",
  manager: "Manager Level",
};

const painPointIcons = [AlertCircle, Target, TrendingUp, BarChart3, Users];

export default async function PersonaPage({ params }: PageProps) {
  const { persona: slug } = await params;
  const persona = getPersonaBySlug(slug);

  if (!persona) {
    notFound();
  }

  const otherPersonas = getAllPersonas()
    .filter((p) => p.slug !== slug)
    .slice(0, 4);

  const industries = getAllIndustries();
  const relevantIndustries = industries.filter((i) =>
    persona.relevantIndustries.includes(i.slug)
  );

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/for" },
    { name: persona.title, path: `/for/${slug}` },
  ];

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
      <SchemaScript schema={createFAQSchema(persona.faqs)} />
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
                For {persona.title}s
              </span>
            </nav>

            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm mb-6">
                <Users className="h-4 w-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {seniorityLabels[persona.seniority]}
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {persona.headline.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="gradient-text">
                  {persona.headline.split(" ").slice(-1).join(" ")}
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-white/60">
                {persona.description}
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
                  Schedule a Call
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Why {persona.title}s Care About AI Visibility
              </h2>
              <p className="mt-4 text-lg text-neutral-600 dark:text-white/60">
                Pain points we solve for {persona.fullTitle}s
              </p>
            </div>

            <div className="space-y-8">
              {persona.painPoints.map((painPoint, idx) => {
                const Icon = painPointIcons[idx % painPointIcons.length];
                return (
                  <div
                    key={painPoint.title}
                    className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-8"
                  >
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
                            <Icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">{painPoint.title}</h3>
                            <p className="mt-2 text-neutral-600 dark:text-white/60">
                              {painPoint.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-5 w-5 text-emerald-500" />
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            Our Solution
                          </span>
                        </div>
                        <p className="text-neutral-600 dark:text-white/60">
                          {painPoint.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* KPIs */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Metrics That Matter to {persona.title}s
              </h2>
              <p className="mt-4 text-lg text-neutral-600 dark:text-white/60">
                How we help you move the KPIs you&apos;re measured on
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {persona.kpis.map((kpi) => (
                <div
                  key={kpi.metric}
                  className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="h-6 w-6 text-emerald-500" />
                    <h3 className="text-lg font-semibold">{kpi.metric}</h3>
                  </div>
                  <p className="text-neutral-600 dark:text-white/60">
                    {kpi.howWeHelp}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Objections */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-24 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Common Questions from {persona.title}s
              </h2>
              <p className="mt-4 text-lg text-neutral-600 dark:text-white/60">
                Concerns we hear and how we address them
              </p>
            </div>

            <div className="space-y-6 max-w-3xl mx-auto">
              {persona.objections.map((objection) => (
                <div
                  key={objection.objection}
                  className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <MessageSquare className="h-6 w-6 text-neutral-400 shrink-0 mt-0.5" />
                    <p className="text-lg font-medium italic">
                      &ldquo;{objection.objection}&rdquo;
                    </p>
                  </div>
                  <div className="ml-10 bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
                    <p className="text-neutral-600 dark:text-white/60">
                      {objection.response}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Relevant Industries */}
        {relevantIndustries.length > 0 && (
          <section className="border-t border-neutral-200 dark:border-white/10 py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-8">
                Industries Where {persona.title}s Work With Us
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {relevantIndustries.map((industry) => (
                  <Link
                    key={industry.slug}
                    href={`/industries/${industry.slug}`}
                    className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors group"
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
        <section className="border-t border-neutral-200 dark:border-white/10 py-24 bg-neutral-50 dark:bg-transparent">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-12">
              FAQs for {persona.title}s
            </h2>
            <div className="space-y-8">
              {persona.faqs.map((faq) => (
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

        {/* Other Personas */}
        <section className="border-t border-neutral-200 dark:border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Solutions for Other Roles</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {otherPersonas.map((p) => (
                <Link
                  key={p.slug}
                  href={`/for/${p.slug}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors group"
                >
                  <div>
                    <div className="font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {p.title}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-white/50">
                      {p.fullTitle}
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
              Ready to Take Control of AI Visibility?
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
