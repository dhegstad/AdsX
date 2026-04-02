import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { getAllAppDirectories } from "@/lib/app-directories";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

export const metadata: Metadata = createPageMetadata({
  title: "Best Shopify Apps by Category | 2026 Directory",
  description:
    "Browse the best Shopify apps across 25 categories. Compare top-rated apps for email marketing, AI chatbots, order tracking, wholesale, and more.",
  path: "/apps",
  keywords: [
    "best Shopify apps",
    "Shopify app directory",
    "top Shopify apps 2026",
    "Shopify app comparison",
    "best apps for Shopify store",
  ],
});

export default function AppsDirectoryPage() {
  const directories = getAllAppDirectories();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Shopify Apps", path: "/apps" },
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
            <Link href="/" className="hover:text-[#EAEAEA]">
              HOME
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">SHOPIFY APPS</span>
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
            Best Shopify Apps
            <br />
            by Category
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            Comprehensive, independently reviewed guides to the best Shopify
            apps across {directories.length} categories. Each guide compares
            pricing, ratings, features, and best-fit use cases.
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
            {
              label: "CATEGORIES",
              value: directories.length.toString(),
            },
            {
              label: "APPS REVIEWED",
              value: (directories.length * 8).toString(),
            },
            { label: "UPDATED", value: "2026" },
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

        {/* Category Grid */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ALL CATEGORIES
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {directories.map((dir, idx) => (
              <Link
                key={dir.slug}
                href={`/apps/best-shopify-${dir.slug}-apps`}
                className={`group p-6 border-b border-[#333] ${
                  idx % 3 !== 2 ? "lg:border-r" : ""
                } ${idx % 2 !== 1 ? "md:border-r lg:border-r-0" : "md:border-r-0"} ${
                  idx % 3 !== 2 ? "lg:border-r" : "lg:border-r-0"
                } hover:bg-[#111] transition-colors`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-xs tracking-widest text-[#10b981] px-2 py-1 border border-[#10b981]"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {dir.apps.length} APPS
                      </span>
                    </div>
                    <h2 className="font-semibold text-lg group-hover:text-[#10b981] transition-colors">
                      Best {dir.categoryName} Apps
                    </h2>
                    <p className="text-sm text-[#888] mt-2 line-clamp-2">
                      {dir.description}
                    </p>
                  </div>
                  <span className="text-[#888] group-hover:text-[#10b981] group-hover:translate-x-1 transition-all shrink-0 ml-4">
                    &rarr;
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
            Get your app recommended by AI
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            AdsX helps Shopify apps and e-commerce brands appear in AI-powered
            recommendations across ChatGPT, Claude, and Perplexity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/free-audit" className="cta-btn cta-btn-primary">
              Get Your Free Audit
            </Link>
            <Link href="/contact" className="cta-btn">
              Talk to Sales
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
