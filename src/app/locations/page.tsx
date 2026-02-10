import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
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
      <BrutalistLayout>
        {/* Hero */}
        <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
          <div
            className="text-xs tracking-widest text-[#888] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Link href="/" className="hover:text-[#EAEAEA]">HOME</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">LOCATIONS</span>
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
            AI Search Visibility<br />by Location
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            Get your business recommended by AI assistants in your local market.
            We help businesses across major U.S. cities dominate ChatGPT, Claude, and Perplexity results.
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
            { label: "LOCATIONS", value: locations.length.toString() },
            { label: "REGIONS", value: Object.keys(regions).length.toString() },
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

        {/* Locations by Region */}
        {regionOrder
          .filter((region) => regions[region])
          .map((region, regionIdx) => (
            <div key={region} className={regionIdx < regionOrder.filter(r => regions[r]).length - 1 ? "border-b border-[#333]" : ""}>
              <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
                <div
                  className="text-xs tracking-widest text-[#10b981]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {region.toUpperCase()}
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3">
                {regions[region].map((location, idx) => (
                  <Link
                    key={location.slug}
                    href={`/locations/${location.slug}`}
                    className={`group p-6 ${idx % 3 !== 2 ? "lg:border-r" : ""} ${idx % 2 !== 1 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b last:border-b-0 hover:bg-[#111] transition-colors`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[#10b981]">◉</span>
                          <h3 className="text-xl font-semibold group-hover:text-[#10b981] transition-colors">
                            {location.city}
                          </h3>
                        </div>
                        <p className="text-sm text-[#888] mb-4">
                          {location.state}
                        </p>
                        <p className="text-[#ccc] text-sm line-clamp-2">
                          {location.description}
                        </p>
                        {location.stats.slice(0, 1).map((stat) => (
                          <div
                            key={stat.label}
                            className="mt-4 inline-flex items-center gap-1 text-xs text-[#10b981] px-2 py-1 border border-[#10b981]/30 bg-[#10b981]/5"
                          >
                            <span className="font-semibold">{stat.value}</span>
                          </div>
                        ))}
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
            Don&apos;t see your city?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            We work with businesses in any location. Get in touch to discuss AI visibility for your market.
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
