import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrutalistLayout } from "@/components/brutalist-layout";
import {
  getAllPersonas,
  getPersonaBySlug,
} from "@/lib/personas";
import { getAllIndustries } from "@/lib/industries";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  SchemaScript,
} from "@/lib/seo/schemas";

interface PageProps {
  params: Promise<{ persona: string }>;
}

export async function generateStaticParams() {
  const personas = getAllPersonas();
  return personas.map((persona) => ({
    persona: persona.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { persona: slug } = await params;
  const persona = getPersonaBySlug(slug);

  if (!persona) {
    return { title: "Persona Not Found" };
  }

  return createPageMetadata({
    title: `${persona.headline} | AdsX`,
    description: persona.description,
    path: `/for/${slug}`,
    keywords: persona.keywords,
  });
}

const seniorityLabels = {
  "c-suite": "C-SUITE",
  director: "DIRECTOR",
  manager: "MANAGER",
};

export default async function PersonaPage({ params }: PageProps) {
  const { persona: slug } = await params;
  const persona = getPersonaBySlug(slug);

  if (!persona) {
    notFound();
  }

  const otherPersonas = getAllPersonas()
    .filter((p) => p.slug !== slug)
    .slice(0, 4);

  const industries = getAllIndustries();
  const relevantIndustries = industries.filter((i) =>
    persona.relevantIndustries.includes(i.slug)
  );

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/for" },
    { name: persona.title, path: `/for/${slug}` },
  ];

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
      <SchemaScript schema={createFAQSchema(persona.faqs)} />
      <BrutalistLayout>
        {/* Hero */}
        <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
          <div
            className="text-xs tracking-widest text-[#888] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Link href="/" className="hover:text-[#EAEAEA]">HOME</Link>
            <span className="mx-2">/</span>
            <Link href="/for" className="hover:text-[#EAEAEA]">FOR</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">{persona.title.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span
              className="text-xs tracking-widest px-3 py-1 border border-[#10b981] text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {seniorityLabels[persona.seniority]}
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
            {persona.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            {persona.description}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/tools/free-audit" className="cta-btn cta-btn-primary">
              Get Your Free Audit
            </Link>
            <Link href="/contact" className="cta-btn">
              Schedule a Call
            </Link>
          </div>
        </div>

        {/* Pain Points */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              WHY {persona.title.toUpperCase()}S CARE ABOUT AI VISIBILITY
            </div>
          </div>
          <div>
            {persona.painPoints.map((painPoint, idx) => (
              <div
                key={painPoint.title}
                className={`p-6 ${idx < persona.painPoints.length - 1 ? "border-b border-[#333]" : ""}`}
              >
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <span
                      className="text-[#f59e0b] text-xs shrink-0"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{painPoint.title}</h3>
                      <p className="text-[#888]">{painPoint.description}</p>
                    </div>
                  </div>
                  <div className="p-4 border border-[#10b981]/30 bg-[#10b981]/5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#10b981]">✓</span>
                      <span
                        className="text-xs tracking-widest text-[#10b981]"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        OUR SOLUTION
                      </span>
                    </div>
                    <p className="text-[#ccc]">{painPoint.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KPIs */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              METRICS THAT MATTER TO {persona.title.toUpperCase()}S
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            {persona.kpis.map((kpi, idx) => (
              <div
                key={kpi.metric}
                className={`p-6 ${idx % 2 === 0 ? "md:border-r" : ""} ${idx < persona.kpis.length - 2 ? "border-b" : idx === persona.kpis.length - 2 && persona.kpis.length % 2 === 0 ? "" : idx < persona.kpis.length - 1 ? "border-b" : ""} border-[#333]`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-[#10b981]">◉</span>
                  <div>
                    <h3 className="font-semibold mb-2">{kpi.metric}</h3>
                    <p className="text-sm text-[#888]">{kpi.howWeHelp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Objections */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              COMMON QUESTIONS FROM {persona.title.toUpperCase()}S
            </div>
          </div>
          <div>
            {persona.objections.map((objection, idx) => (
              <div
                key={objection.objection}
                className={`p-6 ${idx < persona.objections.length - 1 ? "border-b border-[#333]" : ""}`}
              >
                <p className="text-lg italic text-[#ccc] mb-4">
                  &ldquo;{objection.objection}&rdquo;
                </p>
                <div className="ml-6 p-4 border-l-2 border-[#10b981]">
                  <p className="text-[#888]">{objection.response}</p>
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
                INDUSTRIES WHERE {persona.title.toUpperCase()}S WORK WITH US
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
              FAQS FOR {persona.title.toUpperCase()}S
            </div>
          </div>
          <div>
            {persona.faqs.map((faq, idx) => (
              <div
                key={faq.question}
                className={`p-6 ${idx < persona.faqs.length - 1 ? "border-b border-[#333]" : ""}`}
              >
                <h3 className="font-semibold mb-3">{faq.question}</h3>
                <p className="text-[#888]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Personas */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              SOLUTIONS FOR OTHER ROLES
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {otherPersonas.map((p, idx) => (
              <Link
                key={p.slug}
                href={`/for/${p.slug}`}
                className={`group flex items-center justify-between p-6 ${idx < 3 ? "lg:border-r" : ""} ${idx % 2 === 0 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b last:border-b-0 hover:bg-[#111] transition-colors`}
              >
                <div>
                  <div className="font-semibold group-hover:text-[#10b981] transition-colors">
                    {p.title}
                  </div>
                  <div className="text-sm text-[#888]">
                    {p.fullTitle}
                  </div>
                </div>
                <span className="text-[#888] group-hover:text-[#10b981] group-hover:translate-x-1 transition-all">
                  &rarr;
                </span>
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
            Ready to take control of AI visibility?
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
