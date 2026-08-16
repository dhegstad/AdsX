import type { ReactNode } from "react";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { AffiliateCTA } from "@/components/blog/affiliate-cta";
import { EmailCapture } from "@/components/email-capture";
import {
  SchemaScript,
  createFAQSchema,
  createBreadcrumbSchema,
} from "@/lib/seo/schemas";

export interface HubSection {
  heading: string;
  body: ReactNode;
}

export interface HubFAQ {
  question: string;
  answer: string;
}

export interface HubLink {
  title: string;
  href: string;
}

interface HubPageProps {
  /** Hub route slug (no leading slash) — used for CTA subId attribution and breadcrumbs. */
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  intro?: ReactNode;
  sections: HubSection[];
  faqs: HubFAQ[];
  related: HubLink[];
  relatedTitle?: string;
}

// Shared scaffold for the Shopify conversion hubs. Server component so it can
// export clean HTML + JSON-LD; renders the client AffiliateCTA for tracked,
// per-hub-attributed signup CTAs (subId1=<hub slug>).
export function HubPage({
  slug,
  eyebrow,
  title,
  subtitle,
  intro,
  sections,
  faqs,
  related,
  relatedTitle = "Keep reading",
}: HubPageProps) {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: title, path: `/${slug}` },
  ]);
  const faqSchema = createFAQSchema(faqs);

  return (
    <>
      <SchemaScript schema={breadcrumbSchema} />
      <SchemaScript schema={faqSchema} />
      <BrutalistLayout>
        {/* Hero */}
        <section className="border-b border-[#333] p-8 md:p-16">
          <div
            className="text-xs tracking-widest text-[#10b981] mb-6"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {eyebrow}
          </div>
          <h1
            className="uppercase mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 6vw, 64px)",
              lineHeight: 1,
              letterSpacing: "-1px",
            }}
          >
            {title}
          </h1>
          <p className="text-lg md:text-xl text-[#888] max-w-2xl">{subtitle}</p>
          <div className="mt-8 max-w-2xl">
            <AffiliateCTA slug={slug} placement="cta-top" variant="compact" />
          </div>
        </section>

        {intro && (
          <section className="border-b border-[#333] p-8 md:p-12">
            <div className="max-w-3xl space-y-4 text-base leading-relaxed text-[#ccc]">
              {intro}
            </div>
          </section>
        )}

        {sections.map((section, i) => (
          <section key={i} className="border-b border-[#333] p-8 md:p-12">
            <h2
              className="uppercase mb-6 text-2xl tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {section.heading}
            </h2>
            <div className="max-w-3xl space-y-4 text-base leading-relaxed text-[#ccc]">
              {section.body}
            </div>
          </section>
        ))}

        {/* Mid-page decision CTA */}
        <section className="border-b border-[#333] p-6 md:p-10">
          <AffiliateCTA slug={slug} placement="cta-mid" />
        </section>

        {/* FAQ */}
        <section className="border-b border-[#333] p-8 md:p-12">
          <div
            className="text-xs tracking-widest text-[#10b981] mb-6"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            FREQUENTLY ASKED
          </div>
          <div className="max-w-3xl space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-[#333] p-6">
                <h3 className="mb-2 font-semibold text-[#EAEAEA]">
                  {faq.question}
                </h3>
                <p className="text-base leading-relaxed text-[#aaa]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links */}
        {related.length > 0 && (
          <section className="border-b border-[#333] p-8 md:p-12">
            <div
              className="text-xs tracking-widest text-[#10b981] mb-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {relatedTitle}
            </div>
            <div className="flex flex-wrap gap-3">
              {related.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border border-[#333] px-4 py-2 text-sm text-[#888] transition-colors hover:border-[#10b981] hover:text-[#10b981]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Email capture — catch high-intent readers not ready to start today. */}
        <section className="border-b border-[#333]">
          <EmailCapture source={`hub:${slug}`} variant="inline" className="m-6 md:m-10" />
        </section>

        {/* Closing CTA */}
        <section className="p-6 md:p-10">
          <AffiliateCTA slug={slug} placement="cta-footer" />
        </section>
      </BrutalistLayout>
    </>
  );
}
