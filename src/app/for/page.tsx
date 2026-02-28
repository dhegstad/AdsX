import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { getAllPersonas } from "@/lib/personas";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

export const metadata: Metadata = createPageMetadata({
  title: "AI Search Visibility by Role | AdsX",
  description:
    "AI visibility solutions tailored for your role. From CMOs to Marketing Managers, see how AdsX helps your team dominate ChatGPT, Claude, and Perplexity results.",
  path: "/for",
  keywords: [
    "AI visibility by role",
    "CMO AI search strategy",
    "marketing team AI visibility",
    "AI search optimization for teams",
  ],
});

const seniorityLabels: Record<string, string> = {
  "c-suite": "C-Suite",
  director: "Director",
  manager: "Manager",
};

const seniorityOrder = ["c-suite", "director", "manager"];

export default function PersonasPage() {
  const personas = getAllPersonas();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "For Teams", path: "/for" },
  ];

  const grouped = personas.reduce(
    (acc, persona) => {
      if (!acc[persona.seniority]) {
        acc[persona.seniority] = [];
      }
      acc[persona.seniority].push(persona);
      return acc;
    },
    {} as Record<string, typeof personas>
  );

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
            <span className="text-[#10b981]">FOR TEAMS</span>
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
            AI Visibility<br />for Your Role
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            Whether you&apos;re a CMO setting strategy or a Marketing Manager running campaigns,
            we have solutions tailored to your role and responsibilities.
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
            { label: "ROLES", value: personas.length.toString() },
            { label: "SENIORITY LEVELS", value: Object.keys(grouped).length.toString() },
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

        {/* Personas by Seniority */}
        {seniorityOrder
          .filter((level) => grouped[level])
          .map((level, levelIdx) => (
            <div key={level} className={levelIdx < seniorityOrder.filter(l => grouped[l]).length - 1 ? "border-b border-[#333]" : ""}>
              <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
                <div
                  className="text-xs tracking-widest text-[#10b981]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {seniorityLabels[level]?.toUpperCase()}
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3">
                {grouped[level].map((persona, idx) => (
                  <Link
                    key={persona.slug}
                    href={`/for/${persona.slug}`}
                    className={`group p-6 ${idx % 3 !== 2 ? "lg:border-r" : ""} ${idx % 2 !== 1 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b last:border-b-0 hover:bg-[#111] transition-colors`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[#10b981]">◉</span>
                          <h3 className="text-xl font-semibold group-hover:text-[#10b981] transition-colors">
                            {persona.title}
                          </h3>
                        </div>
                        <p className="text-sm text-[#888] mb-4">
                          {persona.fullTitle}
                        </p>
                        <p className="text-[#ccc] text-sm line-clamp-2">
                          {persona.description}
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
          ))}

        {/* CTA */}
        <div className="p-8 md:p-16 text-center bg-[#0c0c0c] border-t border-[#333]">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to get started?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            No matter your role, we&apos;ll help you make AI search work for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/free-audit" className="cta-btn cta-btn-primary">
              Get Your Free Audit
            </Link>
            <Link href="/contact" className="cta-btn">
              Contact Us
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
