import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrutalistLayout } from "@/components/brutalist-layout";
import {
  getAllIndustries,
  getIndustryBySlug,
} from "@/lib/industries";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  SchemaScript,
} from "@/lib/seo/schemas";
import { getRelatedArticlesForPage } from "@/lib/seo/internal-linking";
import { RelatedArticles } from "@/components/related-articles";

interface PageProps {
  params: Promise<{ industry: string }>;
}

export async function generateStaticParams() {
  const industries = getAllIndustries();
  return industries.map((industry) => ({
    industry: industry.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return { title: "Industry Not Found" };
  }

  return createPageMetadata({
    title: `${industry.headline} | AdsX`,
    description: industry.description,
    path: `/industries/${slug}`,
    keywords: industry.keywords,
  });
}

export default async function IndustryPage({ params }: PageProps) {
  const { industry: slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  const otherIndustries = getAllIndustries().filter((i) => i.slug !== slug);
  const relatedArticles = getRelatedArticlesForPage(industry.keywords, industry.name);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: industry.name, path: `/industries/${slug}` },
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
            <Link href="/industries" className="hover:text-[#EAEAEA]">INDUSTRIES</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">{industry.name.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span
              className="text-xs tracking-widest px-3 py-1 border border-[#10b981] text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {industry.name.toUpperCase()} SOLUTIONS
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
            {industry.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            {industry.subheadline}
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
          {industry.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`p-6 ${idx < industry.stats.length - 1 ? "border-r" : ""} border-[#333] text-center`}
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

        {/* Challenges */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {industry.name.toUpperCase()} AI VISIBILITY CHALLENGES
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            {industry.challenges.map((challenge, idx) => (
              <div
                key={challenge.title}
                className={`p-6 ${idx % 2 === 0 ? "md:border-r" : ""} ${idx < industry.challenges.length - 2 ? "border-b" : idx === industry.challenges.length - 2 && industry.challenges.length % 2 === 0 ? "" : idx < industry.challenges.length - 1 ? "border-b" : ""} border-[#333]`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="text-[#f59e0b] text-xs shrink-0"
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

        {/* Use Cases */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              HOW WE HELP {industry.name.toUpperCase()} BRANDS
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            {industry.useCases.map((useCase, idx) => (
              <div
                key={useCase.title}
                className={`p-6 ${idx % 2 === 0 ? "md:border-r" : ""} ${idx < industry.useCases.length - 2 ? "border-b" : idx === industry.useCases.length - 2 && industry.useCases.length % 2 === 0 ? "" : idx < industry.useCases.length - 1 ? "border-b" : ""} border-[#333]`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-[#10b981]">✓</span>
                  <div>
                    <h3 className="font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-sm text-[#888]">{useCase.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Industries */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              OTHER INDUSTRIES WE SERVE
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            {otherIndustries.map((ind, idx) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className={`group flex items-center justify-between p-6 ${idx % 2 === 0 ? "md:border-r" : ""} border-[#333] border-b last:border-b-0 hover:bg-[#111] transition-colors`}
              >
                <div>
                  <div className="font-semibold group-hover:text-[#10b981] transition-colors">
                    {ind.name}
                  </div>
                  <div className="text-sm text-[#888]">
                    {ind.subheadline}
                  </div>
                </div>
                <span className="text-[#888] group-hover:text-[#10b981] group-hover:translate-x-1 transition-all">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>

        <RelatedArticles articles={relatedArticles} />

        {/* CTA */}
        <div className="p-8 md:p-16 text-center bg-[#0c0c0c]">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to dominate AI search in {industry.name}?
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
