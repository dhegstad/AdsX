import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrutalistLayout } from "@/components/brutalist-layout";
import {
  getAllLocations,
  getLocationBySlug,
} from "@/lib/locations";
import { getAllIndustries } from "@/lib/industries";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  SchemaScript,
} from "@/lib/seo/schemas";
import { getRelatedArticlesForPage } from "@/lib/seo/internal-linking";
import { RelatedArticles } from "@/components/related-articles";

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  const locations = getAllLocations();
  return locations.map((location) => ({
    city: location.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return { title: "Location Not Found" };
  }

  return createPageMetadata({
    title: `${location.headline} | AdsX`,
    description: location.description,
    path: `/locations/${slug}`,
    keywords: location.keywords,
  });
}

export default async function LocationPage({ params }: PageProps) {
  const { city: slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const otherLocations = getAllLocations()
    .filter((l) => l.slug !== slug)
    .slice(0, 4);
  const relatedArticles = getRelatedArticlesForPage(location.keywords, location.city);

  const industries = getAllIndustries();
  const relevantIndustries = industries.filter((i) =>
    location.relevantIndustries.includes(i.slug)
  );

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
    { name: location.city, path: `/locations/${slug}` },
  ];

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
      <SchemaScript schema={createFAQSchema(location.faqs)} />
      <BrutalistLayout>
        {/* Hero */}
        <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
          <div
            className="text-xs tracking-widest text-[#888] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Link href="/" className="hover:text-[#EAEAEA]">HOME</Link>
            <span className="mx-2">/</span>
            <Link href="/locations" className="hover:text-[#EAEAEA]">LOCATIONS</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">{location.city.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span
              className="text-xs tracking-widest px-3 py-1 border border-[#10b981] text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {location.city}, {location.state}
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
            {location.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            {location.description}
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

        {/* Stats */}
        <div className="grid grid-cols-3 border-b border-[#333]">
          {location.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`p-6 ${idx < location.stats.length - 1 ? "border-r" : ""} border-[#333] text-center`}
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
                {stat.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* Market Context */}
        <div className="border-b border-[#333] p-8">
          <div className="max-w-3xl mx-auto">
            <div
              className="text-xs tracking-widest text-[#888] mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              THE {location.city.toUpperCase()} MARKET
            </div>
            <p className="text-[#ccc] leading-relaxed">
              {location.marketContext}
            </p>
          </div>
        </div>

        {/* AI Adoption Insights */}
        <div className="border-b border-[#333] p-8 bg-[#0c0c0c]">
          <div className="max-w-3xl mx-auto">
            <div
              className="text-xs tracking-widest text-[#10b981] mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              AI SEARCH IN {location.city.toUpperCase()}
            </div>
            <p className="text-[#ccc] leading-relaxed">
              {location.aiAdoptionInsights}
            </p>
          </div>
        </div>

        {/* Local Challenges */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {location.city.toUpperCase()} AI VISIBILITY CHALLENGES
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            {location.localChallenges.map((challenge, idx) => (
              <div
                key={challenge.title}
                className={`p-6 ${idx % 2 === 0 ? "md:border-r" : ""} ${idx < location.localChallenges.length - 2 ? "border-b" : idx === location.localChallenges.length - 2 && location.localChallenges.length % 2 === 0 ? "" : idx < location.localChallenges.length - 1 ? "border-b" : ""} border-[#333]`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="text-[#f59e0b] text-xs"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold mb-2">{challenge.title}</h3>
                    <p className="text-sm text-[#888]">{challenge.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local Opportunities */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {location.city.toUpperCase()} AI VISIBILITY OPPORTUNITIES
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            {location.localOpportunities.map((opportunity, idx) => (
              <div
                key={opportunity.title}
                className={`p-6 ${idx % 2 === 0 ? "md:border-r" : ""} ${idx < location.localOpportunities.length - 2 ? "border-b" : idx === location.localOpportunities.length - 2 && location.localOpportunities.length % 2 === 0 ? "" : idx < location.localOpportunities.length - 1 ? "border-b" : ""} border-[#333]`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-[#10b981]">✓</span>
                  <div>
                    <h3 className="font-semibold mb-2">{opportunity.title}</h3>
                    <p className="text-sm text-[#888]">{opportunity.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Relevant Industries */}
        {relevantIndustries.length > 0 && (
          <div className="border-b border-[#333]">
            <div className="p-6 border-b border-[#333]">
              <div
                className="text-xs tracking-widest text-[#888]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                KEY INDUSTRIES IN {location.city.toUpperCase()}
              </div>
            </div>
            <div className="grid md:grid-cols-3">
              {relevantIndustries.map((industry, idx) => (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className={`group flex items-center justify-between p-6 ${idx % 3 !== 2 ? "lg:border-r" : ""} border-[#333] border-b last:border-b-0 hover:bg-[#111] transition-colors`}
                >
                  <div>
                    <div className="font-semibold group-hover:text-[#10b981] transition-colors">
                      {industry.name}
                    </div>
                    <div className="text-sm text-[#888]">
                      AI Visibility Solutions
                    </div>
                  </div>
                  <span className="text-[#888] group-hover:text-[#10b981] group-hover:translate-x-1 transition-all">
                    &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              AI VISIBILITY FAQS FOR {location.city.toUpperCase()}
            </div>
          </div>
          <div>
            {location.faqs.map((faq, idx) => (
              <div
                key={faq.question}
                className={`p-6 ${idx < location.faqs.length - 1 ? "border-b border-[#333]" : ""}`}
              >
                <h3 className="font-semibold mb-3">{faq.question}</h3>
                <p className="text-[#888]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Locations */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              OTHER LOCATIONS WE SERVE
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {otherLocations.map((loc, idx) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className={`group flex items-center justify-between p-6 ${idx < 3 ? "lg:border-r" : ""} ${idx % 2 === 0 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b last:border-b-0 hover:bg-[#111] transition-colors`}
              >
                <div>
                  <div className="font-semibold group-hover:text-[#10b981] transition-colors">
                    {loc.city}
                  </div>
                  <div className="text-sm text-[#888]">
                    {loc.state}
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
              href="/locations"
              className="text-[#10b981] hover:text-[#EAEAEA] font-medium"
            >
              View all locations &rarr;
            </Link>
          </div>
        </div>

        <RelatedArticles articles={relatedArticles} />

        {/* CTA */}
        <div className="p-8 md:p-16 text-center bg-[#0c0c0c]">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to dominate AI search in {location.city}?
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
