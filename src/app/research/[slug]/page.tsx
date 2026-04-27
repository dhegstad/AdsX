import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  SchemaScript,
} from "@/lib/seo/schemas";
import {
  getAllReports,
  getReportBySlug,
} from "@/lib/research-reports";

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllReports().map((report) => ({ slug: report.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const report = getReportBySlug(slug);

  if (!report) {
    return { title: "Report Not Found" };
  }

  return createPageMetadata({
    title: report.title,
    description: report.description,
    path: `/research/${slug}`,
    keywords: report.keywords,
  });
}

export default async function ResearchReportPage({ params }: PageProps) {
  const { slug } = await params;
  const report = getReportBySlug(slug);

  if (!report) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Research", path: "/research" },
    { name: report.title, path: `/research/${slug}` },
  ];

  // Create a Dataset schema for the research report
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: report.title,
    description: report.description,
    url: `https://www.adsx.com/research/${slug}`,
    datePublished: report.publishDate,
    creator: {
      "@type": "Organization",
      name: "AdsX",
      url: "https://www.adsx.com",
    },
    publisher: {
      "@type": "Organization",
      name: "AdsX",
      url: "https://www.adsx.com",
    },
    keywords: report.keywords.join(", "),
    license: "https://www.adsx.com/terms",
  };

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
      <SchemaScript schema={datasetSchema} />
      {report.faqs.length > 0 && (
        <SchemaScript schema={createFAQSchema(report.faqs)} />
      )}
      <BrutalistLayout>
        {/* Header */}
        <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
          <div
            className="text-xs tracking-widest text-[#888] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Link href="/" className="hover:text-[#EAEAEA]">HOME</Link>
            <span className="mx-2">/</span>
            <Link href="/research" className="hover:text-[#EAEAEA]">RESEARCH</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">{report.category.toUpperCase()}</span>
          </div>

          <div
            className="text-[10px] tracking-widest text-[#10b981] mb-4 inline-block px-2 py-1 border border-[#10b981]/30"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            ADSX RESEARCH &middot; {report.publishDate.toUpperCase()}
          </div>

          <h1
            className="uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 5vw, 56px)",
              lineHeight: 1,
              letterSpacing: "-1px",
            }}
          >
            {report.headline}
          </h1>
          <p className="mt-6 max-w-3xl text-[#888] text-lg">
            {report.description}
          </p>
        </div>

        {/* TL;DR */}
        <div className="border-b border-[#333] p-8 md:p-12 bg-[#10b981]/5">
          <div
            className="text-xs tracking-widest text-[#10b981] mb-3 flex items-center gap-2"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="inline-block w-2 h-2 bg-[#10b981]" />
            KEY TAKEAWAY
          </div>
          <p className="text-[#EAEAEA] text-lg leading-relaxed max-w-3xl font-medium">
            {report.tldr}
          </p>
        </div>

        {/* Key Findings */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              KEY FINDINGS
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {report.keyFindings.map((finding, idx) => (
              <div
                key={idx}
                className={`p-6 ${idx % 3 < 2 ? "lg:border-r" : ""} ${idx % 2 === 0 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b`}
              >
                <div
                  className="text-3xl text-[#10b981] font-bold mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {finding.stat}
                </div>
                <p className="text-[#888] text-sm">{finding.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Points */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              DATA POINTS
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#111]">
                  <th
                    className="border-b border-[#333] px-6 py-3 text-left text-xs tracking-wider text-[#10b981]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    METRIC
                  </th>
                  <th
                    className="border-b border-[#333] px-6 py-3 text-left text-xs tracking-wider text-[#10b981]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    VALUE
                  </th>
                  <th
                    className="border-b border-[#333] px-6 py-3 text-left text-xs tracking-wider text-[#10b981]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    CONTEXT
                  </th>
                </tr>
              </thead>
              <tbody>
                {report.dataPoints.map((dp, idx) => (
                  <tr key={idx} className="hover:bg-[#111] transition-colors">
                    <td className="border-b border-[#333] px-6 py-4 text-[#EAEAEA] font-medium">
                      {dp.label}
                    </td>
                    <td
                      className="border-b border-[#333] px-6 py-4 text-[#10b981] font-bold"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {dp.value}
                    </td>
                    <td className="border-b border-[#333] px-6 py-4 text-[#888] text-sm">
                      {dp.context}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Sections */}
        <div className="border-b border-[#333]">
          <div className="p-8 md:p-12 max-w-4xl">
            {report.sections.map((section, idx) => (
              <div key={idx} className="mb-10 last:mb-0">
                <h2
                  className="uppercase text-2xl mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {section.title}
                </h2>
                <p className="text-[#ccc] leading-relaxed text-base whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Methodology */}
        <div className="border-b border-[#333] p-8 md:p-12 bg-[#0c0c0c]">
          <div
            className="text-xs tracking-widest text-[#888] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            METHODOLOGY
          </div>
          <p className="text-[#888] leading-relaxed max-w-3xl">
            {report.methodology}
          </p>
        </div>

        {/* FAQs */}
        {report.faqs.length > 0 && (
          <div className="border-b border-[#333]">
            <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
              <div
                className="text-xs tracking-widest text-[#10b981]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                FREQUENTLY ASKED QUESTIONS
              </div>
            </div>
            <div className="p-8 md:p-12 max-w-3xl space-y-8">
              {report.faqs.map((faq, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                  <p className="text-[#888] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="p-8 md:p-16 text-center">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Get your own AI visibility data
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            See how your brand compares to these benchmarks with a personalized AI visibility audit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/free-audit" className="cta-btn cta-btn-primary">
              Get Your Free Audit
            </Link>
            <Link href="/research" className="cta-btn">
              View All Research
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
