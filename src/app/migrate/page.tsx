import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";
import { getAllMigrations } from "@/lib/migrations";

export const metadata: Metadata = createPageMetadata({
  title: "Migrate to Shopify | Platform Migration Guides | AdsX",
  description:
    "Step-by-step migration guides for moving your online store to Shopify. Migrate from Magento, PrestaShop, OpenCart, and more with our comprehensive guides.",
  path: "/migrate",
  keywords: [
    "migrate to shopify",
    "shopify migration guide",
    "platform migration shopify",
    "switch to shopify",
  ],
});

export default function MigratePage() {
  const migrations = getAllMigrations();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Migrate to Shopify", path: "/migrate" },
  ];

  const difficultyColors: Record<string, string> = {
    easy: "#10b981",
    moderate: "#f59e0b",
    complex: "#ef4444",
  };

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
            <span className="text-[#10b981]">MIGRATE TO SHOPIFY</span>
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
            Migrate to<br />Shopify
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            Step-by-step migration guides for moving your online store to Shopify.
            Transfer products, customers, and orders without losing data or SEO rankings.
          </p>
        </div>

        {/* Migration Guides Grid */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {migrations.length} MIGRATION GUIDES AVAILABLE
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {migrations.map((migration, idx) => (
              <Link
                key={migration.slug}
                href={`/migrate/${migration.slug}`}
                className={`group relative p-6 ${idx % 3 < 2 ? "lg:border-r" : ""} ${idx % 2 === 0 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b hover:bg-[#111] transition-colors`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[#10b981]">&#9654;</span>
                    <h2 className="text-lg font-semibold group-hover:text-[#10b981] transition-colors">
                      {migration.platformName}
                    </h2>
                  </div>
                  <span
                    className="text-[10px] tracking-widest px-2 py-0.5 border border-[#333]"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: difficultyColors[migration.difficulty],
                    }}
                  >
                    {migration.difficulty.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-[#888] mb-4 line-clamp-2">
                  {migration.description}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs text-[#888]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {migration.estimatedTime.toUpperCase()}
                  </span>
                  <span className="text-[#10b981] text-sm font-medium group-hover:translate-x-1 transition-transform">
                    Read guide &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 md:p-16 text-center bg-[#0c0c0c]">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to make the switch?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Start your Shopify store today and get your first 3 months for $1/month.
            All guides include step-by-step instructions for a smooth migration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.shopify.com/free-trial?ref=adsx"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn-primary"
            >
              Start Free Shopify Trial
            </a>
            <Link href="/tools/free-audit" className="cta-btn">
              Get Your Free Audit
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
