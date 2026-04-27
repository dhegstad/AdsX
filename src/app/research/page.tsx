import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";
import { getAllReports, getReportCategories } from "@/lib/research-reports";

export const metadata: Metadata = createPageMetadata({
  title: "AI Search Advertising Research & Data",
  description:
    "Original research, benchmarks, and data on AI search advertising performance. Industry-leading studies on ChatGPT, Claude, Perplexity visibility and AI-driven product discovery.",
  path: "/research",
  keywords: [
    "AI search advertising research",
    "AI visibility benchmarks",
    "ChatGPT advertising data",
    "AI product recommendations study",
    "e-commerce AI visibility report",
    "AI mention tracking data",
  ],
});

const categoryLabels: Record<string, string> = {
  benchmarks: "BENCHMARKS",
  studies: "STUDIES",
  trackers: "TRACKERS",
};

export default function ResearchPage() {
  const reports = getAllReports();
  const categories = getReportCategories();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Research", path: "/research" },
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
            <span className="text-[#10b981]">RESEARCH</span>
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
            Research<br />&amp; Data
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            Original research and benchmarks from the AdsX team on AI search advertising
            performance, visibility metrics, and the future of AI-driven product discovery.
          </p>
        </div>

        {/* Reports by category */}
        {categories.map((cat) => {
          const catReports = reports.filter((r) => r.category === cat.slug);
          if (catReports.length === 0) return null;

          return (
            <div key={cat.slug} className="border-b border-[#333]">
              <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
                <div
                  className="text-xs tracking-widest text-[#10b981]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {categoryLabels[cat.slug] || cat.slug.toUpperCase()} ({cat.count})
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3">
                {catReports.map((report, idx) => (
                  <Link
                    key={report.slug}
                    href={`/research/${report.slug}`}
                    className={`group p-6 ${idx % 3 < 2 ? "lg:border-r" : ""} ${idx % 2 === 0 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b hover:bg-[#111] transition-colors`}
                  >
                    <div
                      className="text-[10px] tracking-widest text-[#888] mb-3"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {report.publishDate.toUpperCase()} &middot; {report.category.toUpperCase()}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#10b981] transition-colors">
                      {report.title}
                    </h3>
                    <p className="text-sm text-[#888] mb-4 line-clamp-3">
                      {report.description}
                    </p>

                    {/* Key stats preview */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {report.keyFindings.slice(0, 2).map((finding, i) => (
                        <div key={i} className="border border-[#333] p-2">
                          <div
                            className="text-[#10b981] text-lg font-bold"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {finding.stat}
                          </div>
                          <div
                            className="text-[10px] text-[#888] line-clamp-1"
                            style={{ fontFamily: "var(--font-mono)" }}
                          >
                            {finding.description}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-[#10b981] text-sm font-medium">
                      <span>Read full report</span>
                      <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* CTA */}
        <div className="p-8 md:p-16 text-center bg-[#0c0c0c]">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Want custom research for your brand?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Get a personalized AI visibility analysis with data specific to your industry and competitors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/free-audit" className="cta-btn cta-btn-primary">
              Get Your Free Audit
            </Link>
            <Link href="/contact" className="cta-btn">
              Request Custom Research
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
