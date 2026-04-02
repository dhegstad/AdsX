import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { getAllProducts } from "@/lib/sell-products";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

export const metadata: Metadata = createPageMetadata({
  title: "What to Sell on Shopify | Product Ideas & Guides",
  description:
    "Discover the best products to sell on Shopify. Step-by-step guides for 40+ product types with market data, profit margins, and everything you need to start selling online.",
  path: "/sell",
  keywords: [
    "what to sell on Shopify",
    "best products to sell online",
    "Shopify product ideas",
    "how to sell online",
    "sell on Shopify",
  ],
});

export default function SellPage() {
  const products = getAllProducts();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Sell on Shopify", path: "/sell" },
  ];

  const difficultyColor: Record<string, string> = {
    beginner: "#10b981",
    intermediate: "#f59e0b",
    advanced: "#ef4444",
  };

  const beginnerProducts = products.filter((p) => p.difficulty === "beginner");
  const intermediateProducts = products.filter((p) => p.difficulty === "intermediate");
  const advancedProducts = products.filter((p) => p.difficulty === "advanced");

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
            <span className="text-[#10b981]">SELL ON SHOPIFY</span>
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
            What to Sell<br />on Shopify
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            Explore {products.length} product ideas with detailed guides covering market
            size, profit margins, requirements, and step-by-step instructions to start
            selling on Shopify.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="https://shopify.pxf.io/adsx"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn-primary"
            >
              Start Selling on Shopify
            </a>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 border-b border-[#333]">
          {[
            { label: "PRODUCT GUIDES", value: products.length.toString() },
            { label: "BEGINNER FRIENDLY", value: beginnerProducts.length.toString() },
            { label: "AVG. MARGIN", value: "60%+" },
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

        {/* Beginner Products */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div className="flex items-center gap-3">
              <span
                className="text-xs tracking-widest px-3 py-1 border border-[#10b981] text-[#10b981]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                BEGINNER
              </span>
              <span
                className="text-xs tracking-widest text-[#888]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                GREAT FOR FIRST-TIME SELLERS
              </span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {beginnerProducts.map((product, idx) => (
              <Link
                key={product.slug}
                href={`/sell/${product.slug}`}
                className={`group p-6 ${idx % 3 !== 2 ? "lg:border-r" : ""} ${idx % 2 !== 1 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b hover:bg-[#111] transition-colors`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#10b981]">&#9679;</span>
                      <h3 className="text-lg font-semibold group-hover:text-[#10b981] transition-colors">
                        {product.productName}
                      </h3>
                    </div>
                    <p className="text-[#888] text-sm line-clamp-2 mb-3">
                      {product.subheadline}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className="text-[10px] px-2 py-0.5 border border-[#10b981]/30 text-[#10b981] bg-[#10b981]/5"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {product.marketSize}
                      </span>
                      <span
                        className="text-[10px] px-2 py-0.5 border border-[#333] text-[#888]"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {product.avgMargin} MARGIN
                      </span>
                    </div>
                  </div>
                  <span className="text-[#888] group-hover:text-[#10b981] group-hover:translate-x-1 transition-all shrink-0 ml-2">
                    &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Intermediate Products */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div className="flex items-center gap-3">
              <span
                className="text-xs tracking-widest px-3 py-1 border border-[#f59e0b] text-[#f59e0b]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                INTERMEDIATE
              </span>
              <span
                className="text-xs tracking-widest text-[#888]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                SOME EXPERIENCE HELPFUL
              </span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {intermediateProducts.map((product, idx) => (
              <Link
                key={product.slug}
                href={`/sell/${product.slug}`}
                className={`group p-6 ${idx % 3 !== 2 ? "lg:border-r" : ""} ${idx % 2 !== 1 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b hover:bg-[#111] transition-colors`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#f59e0b]">&#9679;</span>
                      <h3 className="text-lg font-semibold group-hover:text-[#f59e0b] transition-colors">
                        {product.productName}
                      </h3>
                    </div>
                    <p className="text-[#888] text-sm line-clamp-2 mb-3">
                      {product.subheadline}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className="text-[10px] px-2 py-0.5 border border-[#f59e0b]/30 text-[#f59e0b] bg-[#f59e0b]/5"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {product.marketSize}
                      </span>
                      <span
                        className="text-[10px] px-2 py-0.5 border border-[#333] text-[#888]"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {product.avgMargin} MARGIN
                      </span>
                    </div>
                  </div>
                  <span className="text-[#888] group-hover:text-[#f59e0b] group-hover:translate-x-1 transition-all shrink-0 ml-2">
                    &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Advanced Products */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div className="flex items-center gap-3">
              <span
                className="text-xs tracking-widest px-3 py-1 border border-[#ef4444] text-[#ef4444]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                ADVANCED
              </span>
              <span
                className="text-xs tracking-widest text-[#888]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                SPECIALIZED SKILLS REQUIRED
              </span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {advancedProducts.map((product, idx) => (
              <Link
                key={product.slug}
                href={`/sell/${product.slug}`}
                className={`group p-6 ${idx % 3 !== 2 ? "lg:border-r" : ""} ${idx % 2 !== 1 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b hover:bg-[#111] transition-colors`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#ef4444]">&#9679;</span>
                      <h3 className="text-lg font-semibold group-hover:text-[#ef4444] transition-colors">
                        {product.productName}
                      </h3>
                    </div>
                    <p className="text-[#888] text-sm line-clamp-2 mb-3">
                      {product.subheadline}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className="text-[10px] px-2 py-0.5 border border-[#ef4444]/30 text-[#ef4444] bg-[#ef4444]/5"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {product.marketSize}
                      </span>
                      <span
                        className="text-[10px] px-2 py-0.5 border border-[#333] text-[#888]"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {product.avgMargin} MARGIN
                      </span>
                    </div>
                  </div>
                  <span className="text-[#888] group-hover:text-[#ef4444] group-hover:translate-x-1 transition-all shrink-0 ml-2">
                    &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 md:p-16 text-center bg-[#0c0c0c] border-t border-[#333]">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to start selling?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Shopify powers millions of businesses worldwide. Start your free trial and
            launch your product in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://shopify.pxf.io/adsx"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn-primary"
            >
              Start Free Shopify Trial
            </a>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
