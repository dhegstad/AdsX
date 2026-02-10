import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrutalistLayout } from "@/components/brutalist-layout";
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
  ecommerce: "E-COMMERCE",
  crm: "CRM",
  marketing: "MARKETING",
  analytics: "ANALYTICS",
  cms: "CMS",
};

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
      <BrutalistLayout>
        {/* Hero */}
        <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
          <div
            className="text-xs tracking-widest text-[#888] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Link href="/" className="hover:text-[#EAEAEA]">HOME</Link>
            <span className="mx-2">/</span>
            <Link href="/integrations" className="hover:text-[#EAEAEA]">INTEGRATIONS</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">{integration.name.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span
              className="text-xs tracking-widest px-3 py-1 border border-[#10b981] text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {categoryLabels[integration.category]}
            </span>
          </div>
          <h1
            className="uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 5vw, 60px)",
              lineHeight: 0.95,
              letterSpacing: "-1px",
            }}
          >
            AI Visibility for {integration.name}
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            {integration.description}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/tools/free-audit" className="cta-btn cta-btn-primary">
              Get Your Free Audit
            </Link>
            <Link href="/contact" className="cta-btn">
              Talk to Sales
            </Link>
          </div>
        </div>

        {/* Platform Context */}
        <div className="border-b border-[#333] p-8 bg-[#0c0c0c]">
          <div className="max-w-3xl mx-auto">
            <div
              className="text-xs tracking-widest text-[#10b981] mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ABOUT {integration.name.toUpperCase()}
            </div>
            <p className="text-[#ccc] leading-relaxed">
              {integration.platformContext}
            </p>
          </div>
        </div>

        {/* Why AI Matters */}
        <div className="border-b border-[#333] p-8">
          <div className="max-w-3xl mx-auto">
            <div
              className="text-xs tracking-widest text-[#888] mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              WHY AI VISIBILITY MATTERS
            </div>
            <p className="text-[#ccc] leading-relaxed">
              {integration.whyAIMatters}
            </p>
          </div>
        </div>

        {/* Common AI Queries */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              COMMON AI QUERIES FOR {integration.name.toUpperCase()} USERS
            </div>
          </div>
          <div className="p-6">
            <div className="max-w-2xl mx-auto space-y-3">
              {integration.commonQueries.map((query) => (
                <div
                  key={query}
                  className="flex items-center gap-3 p-4 border border-[#333] bg-[#0a0a0a]"
                >
                  <span className="text-[#10b981]">&ldquo;</span>
                  <span className="text-[#ccc]">{query}</span>
                  <span className="text-[#10b981]">&rdquo;</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              HOW WE HELP {integration.name.toUpperCase()} USERS
            </div>
          </div>
          <div className="grid lg:grid-cols-3">
            {integration.useCases.map((useCase, idx) => (
              <div
                key={useCase.title}
                className={`p-6 ${idx < 2 ? "lg:border-r" : ""} border-[#333] ${idx < integration.useCases.length - 3 ? "border-b lg:border-b-0" : ""}`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <span
                    className="text-[#10b981] text-sm shrink-0"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-semibold text-lg">{useCase.title}</h3>
                </div>
                <p className="text-sm text-[#888] mb-4">
                  {useCase.description}
                </p>
                <div className="p-3 border border-[#10b981]/30 bg-[#10b981]/5">
                  <span
                    className="text-xs tracking-widest text-[#10b981]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    BENEFIT
                  </span>
                  <p className="text-sm text-[#ccc] mt-1">
                    {useCase.benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optimization Tips */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {integration.name.toUpperCase()} AI OPTIMIZATION TIPS
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            {integration.optimizationTips.map((tip, idx) => (
              <div
                key={tip.tip}
                className={`p-6 flex items-start gap-4 ${idx % 2 === 0 ? "md:border-r" : ""} ${idx < integration.optimizationTips.length - 2 ? "border-b" : idx === integration.optimizationTips.length - 2 && integration.optimizationTips.length % 2 === 0 ? "" : idx < integration.optimizationTips.length - 1 ? "border-b" : ""} border-[#333]`}
              >
                <span
                  className="flex h-8 w-8 items-center justify-center bg-[#10b981] text-black font-bold text-sm shrink-0"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {idx + 1}
                </span>
                <div>
                  <h3 className="font-semibold mb-2">{tip.tip}</h3>
                  <p className="text-sm text-[#888]">{tip.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Industry */}
        {relevantIndustry && (
          <div className="border-b border-[#333]">
            <div className="p-6 border-b border-[#333]">
              <div
                className="text-xs tracking-widest text-[#888]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                RELATED INDUSTRY
              </div>
            </div>
            <Link
              href={`/industries/${relevantIndustry.slug}`}
              className="group flex items-center justify-between p-6 hover:bg-[#111] transition-colors"
            >
              <div>
                <div className="font-semibold text-lg group-hover:text-[#10b981] transition-colors">
                  {relevantIndustry.name}
                </div>
                <div className="text-[#888] mt-1">
                  {relevantIndustry.subheadline}
                </div>
              </div>
              <span className="text-[#888] group-hover:text-[#10b981] group-hover:translate-x-1 transition-all">
                &rarr;
              </span>
            </Link>
          </div>
        )}

        {/* FAQs */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {integration.name.toUpperCase()} AI VISIBILITY FAQS
            </div>
          </div>
          <div>
            {integration.faqs.map((faq, idx) => (
              <div
                key={faq.question}
                className={`p-6 ${idx < integration.faqs.length - 1 ? "border-b border-[#333]" : ""}`}
              >
                <h3 className="font-semibold mb-3">{faq.question}</h3>
                <p className="text-[#888]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Integrations */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              OTHER INTEGRATIONS
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {otherIntegrations.map((i, idx) => (
              <Link
                key={i.slug}
                href={`/integrations/${i.slug}`}
                className={`group flex items-center justify-between p-6 ${idx < 3 ? "lg:border-r" : ""} ${idx % 2 === 0 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b last:border-b-0 hover:bg-[#111] transition-colors`}
              >
                <div>
                  <div className="font-semibold group-hover:text-[#10b981] transition-colors">
                    {i.name}
                  </div>
                  <div className="text-sm text-[#888]">
                    {categoryLabels[i.category]}
                  </div>
                </div>
                <span className="text-[#888] group-hover:text-[#10b981] group-hover:translate-x-1 transition-all">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
          <div className="p-6 text-center">
            <Link
              href="/integrations"
              className="text-[#10b981] hover:text-[#EAEAEA] font-medium"
            >
              View all integrations &rarr;
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 md:p-16 text-center bg-[#0c0c0c]">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to optimize {integration.name} for AI search?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Get a free audit to see how your brand appears across ChatGPT, Claude, Perplexity, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/free-audit" className="cta-btn cta-btn-primary">
              Get Your Free Audit
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
