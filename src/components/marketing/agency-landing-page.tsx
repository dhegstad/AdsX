import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  createServiceSchema,
  SchemaScript,
} from "@/lib/seo/schemas";

export interface AgencyLandingProps {
  // SEO
  breadcrumbs: { name: string; path: string }[];
  serviceName: string;
  serviceDescription: string;

  // Hero
  eyebrow: string; // small all-caps label
  heroTop: string; // first line of h1
  heroBottom?: string; // second line of h1
  subtitle: string; // paragraph below h1

  // "Who this is for" section
  audience: {
    title: string;
    items: string[]; // bullet items describing who fits
  };

  // Pain points section
  painPoints: {
    title: string;
    items: { title: string; description: string }[];
  };

  // What's included
  whatsIncluded: {
    title: string;
    sections: { category: string; items: string[] }[];
  };

  // Process
  process: { step: string; title: string; description: string }[];

  // Why AdsX (differentiation)
  whyAdsx: { title: string; description: string }[];

  // FAQs
  faqs: { q: string; a: string }[];

  // Closing CTA
  closingHeadline: string;
  closingBody: string;
}

export function AgencyLandingPage(props: AgencyLandingProps) {
  const {
    breadcrumbs,
    serviceName,
    serviceDescription,
    eyebrow,
    heroTop,
    heroBottom,
    subtitle,
    audience,
    painPoints,
    whatsIncluded,
    process,
    whyAdsx,
    faqs,
    closingHeadline,
    closingBody,
  } = props;

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
      <SchemaScript
        schema={createFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a })))}
      />
      <SchemaScript
        schema={createServiceSchema({
          name: serviceName,
          description: serviceDescription,
          price: "4250",
          priceCurrency: "USD",
        })}
      />
      <BrutalistLayout>
        {/* Hero */}
        <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
          <div
            className="text-xs tracking-widest text-[#888] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {eyebrow}
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
            {heroTop}
            {heroBottom ? (
              <>
                <br />
                {heroBottom}
              </>
            ) : null}
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">{subtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="cta-btn cta-btn-primary">
              Get Your Free Audit
            </Link>
            <Link href="/pricing" className="cta-btn">
              See Pricing
            </Link>
          </div>
        </div>

        {/* Audience */}
        <div className="border-b border-[#333] p-8 md:p-12">
          <div className="max-w-3xl">
            <div
              className="text-xs tracking-widest text-[#10b981] mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              WHO THIS IS FOR
            </div>
            <h2
              className="uppercase mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 3.5vw, 36px)",
                lineHeight: 1,
                letterSpacing: "-1px",
              }}
            >
              {audience.title}
            </h2>
            <ul className="space-y-3">
              {audience.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#ccc]">
                  <span className="text-[#10b981] shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pain points */}
        <div className="border-b border-[#333] bg-[#0c0c0c]">
          <div className="p-8 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              PROBLEMS WE SOLVE
            </div>
            <h2
              className="uppercase mt-2"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 3.5vw, 36px)",
                lineHeight: 1,
                letterSpacing: "-1px",
              }}
            >
              {painPoints.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2">
            {painPoints.items.map((item, idx) => (
              <div
                key={idx}
                className={`p-6 md:p-8 border-[#333] ${
                  idx % 2 === 0 ? "md:border-r" : ""
                } ${idx < painPoints.items.length - 2 ? "border-b" : "md:border-b-0 border-b"} ${
                  idx === painPoints.items.length - 1 ? "border-b-0" : ""
                }`}
              >
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-[#888] text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What's included */}
        <div className="border-b border-[#333]">
          <div className="p-8 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              SCOPE OF WORK
            </div>
            <h2
              className="uppercase mt-2"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 3.5vw, 36px)",
                lineHeight: 1,
                letterSpacing: "-1px",
              }}
            >
              {whatsIncluded.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2">
            {whatsIncluded.sections.map((section, idx) => (
              <div
                key={idx}
                className={`p-6 md:p-8 border-[#333] ${
                  idx % 2 === 0 ? "md:border-r" : ""
                } ${idx < whatsIncluded.sections.length - 2 ? "border-b" : ""}`}
              >
                <div
                  className="text-xs tracking-widest text-[#10b981] mb-4"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {section.category}
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#ccc] text-sm">
                      <span className="text-[#10b981] shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="border-b border-[#333] bg-[#0c0c0c]">
          <div className="p-8 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              HOW IT WORKS
            </div>
          </div>
          <div className="grid md:grid-cols-3">
            {process.map((step, idx) => (
              <div
                key={idx}
                className={`p-6 md:p-8 border-[#333] ${
                  idx < process.length - 1 ? "md:border-r border-b md:border-b-0" : ""
                }`}
              >
                <div
                  className="text-3xl mb-3 text-[#10b981]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-[#888] text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why AdsX */}
        <div className="border-b border-[#333]">
          <div className="p-8 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              WHY ADSX
            </div>
          </div>
          <div>
            {whyAdsx.map((item, idx) => (
              <div
                key={idx}
                className={`p-6 md:p-8 ${
                  idx < whyAdsx.length - 1 ? "border-b border-[#333]" : ""
                }`}
              >
                <h3 className="text-lg font-semibold mb-2 text-[#10b981]">
                  {item.title}
                </h3>
                <p className="text-[#ccc]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing nudge */}
        <div className="border-b border-[#333] p-8 md:p-12 bg-[#0c0c0c]">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="text-xs tracking-widest text-[#10b981] mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              INVESTMENT
            </div>
            <div className="flex items-baseline gap-3 justify-center mb-4">
              <span
                className="text-4xl md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                $4,250
              </span>
              <span className="text-[#888]" style={{ fontFamily: "var(--font-mono)" }}>
                /MONTH STARTING
              </span>
            </div>
            <p className="text-[#888] mb-6">
              3-month minimum, then month-to-month. Final pricing based on scope, ad spend
              volume, and number of platforms. Ad spend billed at cost.
            </p>
            <Link href="/pricing" className="cta-btn">
              See Full Pricing Details
            </Link>
          </div>
        </div>

        {/* FAQs */}
        {faqs.length > 0 && (
          <div className="border-b border-[#333]">
            <div className="p-8 border-b border-[#333]">
              <div
                className="text-xs tracking-widest text-[#888]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                FREQUENTLY ASKED QUESTIONS
              </div>
            </div>
            <div>
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`p-6 md:p-8 ${
                    idx < faqs.length - 1 ? "border-b border-[#333]" : ""
                  }`}
                >
                  <h3 className="font-semibold mb-3">{faq.q}</h3>
                  <p className="text-[#888]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Closing CTA */}
        <div className="p-8 md:p-16 text-center bg-[#0c0c0c]">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {closingHeadline}
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">{closingBody}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="cta-btn cta-btn-primary">
              Get Your Free Audit
            </Link>
            <Link href="/pricing" className="cta-btn">
              See Pricing
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
