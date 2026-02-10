import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { getAllLists, getListCategories, getListsByCategory, type CuratedList } from "@/lib/curated-lists";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

export const metadata: Metadata = createPageMetadata({
  title: "Best AI Visibility Resources: Curated Guides | AdsX",
  description:
    "Curated guides to the best AI visibility tools, strategies, and resources. Expert recommendations for improving your brand's presence across AI assistants.",
  path: "/best",
  keywords: [
    "best AI visibility tools",
    "AI marketing guides",
    "AI optimization resources",
    "ChatGPT marketing resources",
  ],
});

const categoryLabels: Record<string, string> = {
  tools: "TOOLS & SOFTWARE",
  strategies: "STRATEGIES",
  resources: "RESOURCES",
  guides: "GUIDES",
};

const categoryDescriptions: Record<string, string> = {
  tools: "The best tools and software for AI visibility monitoring and optimization",
  strategies: "Proven strategies for improving AI visibility across industries",
  resources: "Essential resources for learning and implementing AI visibility",
  guides: "Step-by-step guides for AI visibility success",
};

export default function BestIndexPage() {
  const allLists = getAllLists();
  const categories = getListCategories().filter((c) => c.count > 0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Best Of", path: "/best" },
  ];

  // Featured lists (first 4)
  const featuredLists = allLists.slice(0, 4);

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
            <span className="text-[#10b981]">BEST OF</span>
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
            Best AI Visibility<br />Resources
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            Curated guides to the best tools, strategies, and resources for improving
            your brand&apos;s visibility across AI assistants.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#333]">
          {[
            { label: "CURATED GUIDES", value: allLists.length.toString() },
            { label: "CATEGORIES", value: categories.length.toString() },
            { label: "EXPERT REVIEWED", value: "100%" },
            { label: "UPDATED", value: "MONTHLY" },
          ].map((stat, idx) => (
            <div
              key={stat.label}
              className={`p-6 ${idx < 3 ? "border-r" : ""} border-[#333] text-center`}
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

        {/* Featured Lists */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              FEATURED GUIDES
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            {featuredLists.map((list, idx) => (
              <Link
                key={list.slug}
                href={`/best/${list.slug}`}
                className={`group p-6 ${idx % 2 === 0 ? "md:border-r" : ""} ${idx < 2 ? "border-b" : ""} border-[#333] hover:bg-[#111] transition-colors`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span
                      className="text-xs tracking-widest text-[#10b981] px-2 py-1 border border-[#10b981]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {categoryLabels[list.category]}
                    </span>
                    <h3 className="text-xl font-semibold mt-3 group-hover:text-[#10b981] transition-colors">
                      {list.title}
                    </h3>
                    <p className="text-[#888] mt-2 line-clamp-2">
                      {list.description}
                    </p>
                    <div className="flex items-center gap-4 mt-4 text-sm text-[#888]">
                      <span>{list.items.length} items</span>
                      <span>Updated {list.lastUpdated}</span>
                    </div>
                  </div>
                  <span className="text-[#888] group-hover:text-[#10b981] group-hover:translate-x-1 transition-all shrink-0 mt-8">
                    &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Categories */}
        {categories.map((cat, catIdx) => {
          const lists = getListsByCategory(cat.slug as CuratedList["category"]);
          return (
            <div key={cat.slug} className={catIdx < categories.length - 1 ? "border-b border-[#333]" : ""}>
              <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className="text-xs tracking-widest text-[#10b981] mb-2"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {categoryLabels[cat.slug]}
                    </div>
                    <p className="text-[#888] text-sm">
                      {categoryDescriptions[cat.slug]}
                    </p>
                  </div>
                  <span
                    className="text-xs tracking-widest text-[#888]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {cat.count} GUIDES
                  </span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3">
                {lists.map((list, idx) => (
                  <Link
                    key={list.slug}
                    href={`/best/${list.slug}`}
                    className={`group p-5 ${idx % 3 !== 2 ? "lg:border-r" : ""} ${idx % 2 !== 1 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b last:border-b-0 hover:bg-[#111] transition-colors`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[#10b981]">★</span>
                          <span className="text-xs text-[#888]">
                            {list.items.length} items
                          </span>
                        </div>
                        <h3 className="font-semibold group-hover:text-[#10b981] transition-colors">
                          {list.title}
                        </h3>
                        <p className="text-sm text-[#888] mt-2 line-clamp-2">
                          {list.description}
                        </p>
                      </div>
                      <span className="text-[#888] group-hover:text-[#10b981] group-hover:translate-x-1 transition-all shrink-0">
                        &rarr;
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* All Lists */}
        <div className="border-t border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ALL CURATED GUIDES
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 p-6 gap-3">
            {allLists.map((list) => (
              <Link
                key={list.slug}
                href={`/best/${list.slug}`}
                className="flex items-center gap-3 p-4 hover:bg-[#111] transition-colors group"
              >
                <span className="text-[#10b981] shrink-0">★</span>
                <span className="group-hover:text-[#10b981] transition-colors">
                  {list.title}
                </span>
                <span className="text-[#888] group-hover:text-[#10b981] transition-colors ml-auto">
                  &rarr;
                </span>
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
            Ready to apply what you&apos;ve learned?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Get a free audit to see how your brand appears across AI platforms and identify optimization opportunities.
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
