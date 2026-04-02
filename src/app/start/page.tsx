import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { getAllNicheStores } from "@/lib/niche-stores";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

export const metadata: Metadata = createPageMetadata({
  title: "Start a Shopify Store | 50 Niche Store Ideas for 2026",
  description:
    "Explore 50 profitable niche Shopify store ideas with startup costs, revenue potential, essential apps, and step-by-step guides. Find your perfect online business in 2026.",
  path: "/start",
  keywords: [
    "start shopify store",
    "niche store ideas",
    "shopify business ideas 2026",
    "online store ideas",
    "profitable shopify niches",
  ],
});

export default function StartPage() {
  const stores = getAllNicheStores();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Start a Store", path: "/start" },
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
            <span className="text-[#10b981]">START A STORE</span>
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
            Start a Shopify Store<br />50 Niche Ideas for 2026
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            Find your perfect niche store idea with detailed guides covering startup costs,
            revenue potential, essential apps, marketing channels, and expert tips for each
            business model.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="https://shopify.pxf.io/adsx"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn-primary"
            >
              Start Your Free Shopify Trial
            </a>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 border-b border-[#333]">
          {[
            { label: "STORE IDEAS", value: stores.length.toString() },
            { label: "AVG. STARTUP COST", value: "$1.5K" },
            { label: "REVENUE POTENTIAL", value: "$5K-$50K/mo" },
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

        {/* Store Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {stores.map((store, idx) => (
            <Link
              key={store.slug}
              href={`/start/${store.slug}`}
              className={`group p-6 ${idx % 3 !== 2 ? "lg:border-r" : ""} ${idx % 2 !== 1 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b hover:bg-[#111] transition-colors`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#10b981]">&#9670;</span>
                    <h3 className="text-xl font-semibold group-hover:text-[#10b981] transition-colors">
                      {store.nicheName}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3">
                    <div>
                      <div
                        className="text-[10px] tracking-widest text-[#666]"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        STARTUP
                      </div>
                      <div className="text-sm text-[#ccc]">{store.startupCost}</div>
                    </div>
                    <div>
                      <div
                        className="text-[10px] tracking-widest text-[#666]"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        REVENUE/MO
                      </div>
                      <div className="text-sm text-[#10b981]">{store.monthlyRevenuePotential}</div>
                    </div>
                    <div className="col-span-2 mt-1">
                      <div
                        className="text-[10px] tracking-widest text-[#666]"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        FIRST SALE IN
                      </div>
                      <div className="text-sm text-[#ccc]">{store.timeToFirstSale}</div>
                    </div>
                  </div>
                </div>
                <span className="text-[#888] group-hover:text-[#10b981] group-hover:translate-x-1 transition-all shrink-0">
                  &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="p-8 md:p-16 text-center bg-[#0c0c0c] border-t border-[#333]">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to launch your store?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Pick your niche, start your free Shopify trial, and follow our step-by-step guide
            to launch your online store.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://shopify.pxf.io/adsx"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn-primary"
            >
              Start Your Free Shopify Trial
            </a>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
