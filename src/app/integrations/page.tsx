import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
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
  ecommerce: "E-COMMERCE",
  crm: "CRM",
  marketing: "MARKETING",
  analytics: "ANALYTICS",
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
      <BrutalistLayout>
        {/* Hero */}
        <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
          <div
            className="text-xs tracking-widest text-[#888] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Link href="/" className="hover:text-[#EAEAEA]">HOME</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">INTEGRATIONS</span>
          </div>
          <h1
            className="uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 6vw, 72px)",
              lineHeight: 0.9,
              letterSpacing: "-2px",
            }}
          >
            AI Visibility for<br />Your Platform
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            Get your business recommended by AI assistants, optimized for the platforms you already use.
            We help businesses on Shopify, HubSpot, WordPress, and more dominate AI search results.
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

        {/* Stats Strip */}
        <div className="grid grid-cols-3 border-b border-[#333]">
          {[
            { label: "PLATFORMS", value: integrations.length.toString() },
            { label: "CATEGORIES", value: Object.keys(categories).length.toString() },
            { label: "AVG. ROI", value: "340%" },
          ].map((stat, idx) => (
            <div
              key={stat.label}
              className={`p-6 ${idx < 2 ? "border-r" : ""} border-[#333] text-center`}
            >
              <div
                className="text-2xl md:text-4xl text-[#10b981]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </div>
              <div
                className="text-[10px] md:text-xs tracking-widest text-[#888] mt-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Integrations by Category */}
        {categoryOrder
          .filter((category) => categories[category])
          .map((category, catIdx) => (
            <div key={category} className={catIdx < categoryOrder.filter(c => categories[c]).length - 1 ? "border-b border-[#333]" : ""}>
              <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
                <div
                  className="text-xs tracking-widest text-[#10b981] mb-1"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {categoryLabels[category]}
                </div>
                <p className="text-sm text-[#888]">
                  {categoryDescriptions[category]}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3">
                {categories[category].map((integration, idx) => (
                  <Link
                    key={integration.slug}
                    href={`/integrations/${integration.slug}`}
                    className={`group p-6 ${idx % 3 !== 2 ? "lg:border-r" : ""} ${idx % 2 !== 1 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b last:border-b-0 hover:bg-[#111] transition-colors`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[#10b981]">◉</span>
                          <h3 className="text-xl font-semibold group-hover:text-[#10b981] transition-colors">
                            {integration.name}
                          </h3>
                        </div>
                        <p className="text-sm text-[#888] line-clamp-2">
                          {integration.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {integration.useCases.slice(0, 2).map((useCase) => (
                            <span
                              key={useCase.title}
                              className="text-xs text-[#888] border border-[#333] px-2 py-1"
                            >
                              {useCase.title}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-[#888] group-hover:text-[#10b981] group-hover:translate-x-1 transition-all shrink-0">
                        &rarr;
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

        {/* CTA */}
        <div className="p-8 md:p-16 text-center bg-[#0c0c0c] border-t border-[#333]">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Don&apos;t see your platform?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            We work with businesses on any platform. Get in touch to discuss AI visibility for your setup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="cta-btn cta-btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
