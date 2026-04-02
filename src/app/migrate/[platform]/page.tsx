import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrutalistLayout } from "@/components/brutalist-layout";
import {
  getAllMigrations,
  getMigrationBySlug,
} from "@/lib/migrations";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  SchemaScript,
} from "@/lib/seo/schemas";
import { getRelatedArticlesForPage } from "@/lib/seo/internal-linking";
import { RelatedArticles } from "@/components/related-articles";

// ISR: generate on first request, cache for 24 hours
export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllMigrations().map((m) => ({ platform: m.slug }));
}

interface PageProps {
  params: Promise<{ platform: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { platform: slug } = await params;
  const migration = getMigrationBySlug(slug);

  if (!migration) {
    return { title: "Migration Guide Not Found" };
  }

  return createPageMetadata({
    title: `${migration.headline} | AdsX`,
    description: migration.description,
    path: `/migrate/${slug}`,
    keywords: migration.keywords,
  });
}

export default async function MigrationPage({ params }: PageProps) {
  const { platform: slug } = await params;
  const migration = getMigrationBySlug(slug);

  if (!migration) {
    notFound();
  }

  const otherMigrations = getAllMigrations().filter(
    (m) => m.slug !== slug
  );
  const relatedArticles = getRelatedArticlesForPage(migration.keywords, migration.platformName);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Migrate to Shopify", path: "/migrate" },
    { name: migration.platformName, path: `/migrate/${slug}` },
  ];

  const difficultyColors: Record<string, string> = {
    easy: "#10b981",
    moderate: "#f59e0b",
    complex: "#ef4444",
  };

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
      <SchemaScript schema={createFAQSchema(migration.faqs)} />
      <BrutalistLayout>
        {/* Hero */}
        <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
          <div
            className="text-xs tracking-widest text-[#888] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Link href="/" className="hover:text-[#EAEAEA]">HOME</Link>
            <span className="mx-2">/</span>
            <Link href="/migrate" className="hover:text-[#EAEAEA]">MIGRATE TO SHOPIFY</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">{migration.platformName.toUpperCase()}</span>
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
            {migration.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            {migration.description}
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#333] text-xs tracking-widest"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span className="text-[#888]">DIFFICULTY:</span>
              <span style={{ color: difficultyColors[migration.difficulty] }}>
                {migration.difficulty.toUpperCase()}
              </span>
            </div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#333] text-xs tracking-widest"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span className="text-[#888]">ESTIMATED TIME:</span>
              <span className="text-[#EAEAEA]">{migration.estimatedTime.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Data to Migrate */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              WHAT GETS MIGRATED
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {migration.dataToMigrate.map((item, idx) => (
              <div
                key={item}
                className={`p-4 ${idx < migration.dataToMigrate.length - 1 ? "border-r border-[#333]" : ""} border-b border-[#333] last:border-b-0`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#10b981]">&#10003;</span>
                  <span className="text-sm text-[#ccc]">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Migration Steps */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              STEP-BY-STEP MIGRATION GUIDE
            </div>
          </div>
          <div className="divide-y divide-[#333]">
            {migration.steps.map((step, idx) => (
              <div key={step.title} className="p-6 md:p-8">
                <div className="flex items-start gap-4 md:gap-6">
                  <div
                    className="shrink-0 w-10 h-10 flex items-center justify-center border border-[#10b981] text-[#10b981] text-sm"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h2
                      className="text-lg uppercase mb-2"
                      style={{ fontFamily: "var(--font-display)", lineHeight: 1.2 }}
                    >
                      {step.title}
                    </h2>
                    <p className="text-[#888] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Issues */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#f59e0b]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              COMMON ISSUES & SOLUTIONS
            </div>
          </div>
          <div className="divide-y divide-[#333]">
            {migration.commonIssues.map((item) => (
              <div key={item.issue} className="p-6 md:p-8">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-[#f59e0b] shrink-0">&#9888;</span>
                  <h3 className="font-semibold text-[#EAEAEA]">{item.issue}</h3>
                </div>
                <div className="flex items-start gap-3 ml-6">
                  <span className="text-[#10b981] shrink-0">&#10003;</span>
                  <p className="text-[#888]">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopify Advantages */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              WHY SWITCH TO SHOPIFY
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            {migration.shopifyAdvantages.map((advantage, idx) => (
              <div
                key={advantage}
                className={`p-6 ${idx % 2 === 0 ? "md:border-r" : ""} border-[#333] border-b last:border-b-0`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-[#10b981] shrink-0">&#10003;</span>
                  <span className="text-[#ccc]">{advantage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              FREQUENTLY ASKED QUESTIONS
            </div>
          </div>
          <div className="divide-y divide-[#333]">
            {migration.faqs.map((faq) => (
              <div key={faq.question} className="p-6 md:p-8">
                <h3
                  className="text-lg uppercase mb-3"
                  style={{ fontFamily: "var(--font-display)", lineHeight: 1.2 }}
                >
                  {faq.question}
                </h3>
                <p className="text-[#888] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Migrations */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              OTHER MIGRATION GUIDES
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {otherMigrations.slice(0, 6).map((m, idx) => (
              <Link
                key={m.slug}
                href={`/migrate/${m.slug}`}
                className={`group p-6 ${idx % 3 < 2 ? "lg:border-r" : ""} ${idx % 2 === 0 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b last:border-b-0 hover:bg-[#111] transition-colors`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold group-hover:text-[#10b981] transition-colors">
                    {m.platformName} to Shopify
                  </h3>
                  <span
                    className="text-[10px] tracking-widest px-2 py-0.5 border border-[#333]"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: difficultyColors[m.difficulty],
                    }}
                  >
                    {m.difficulty.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-[#888] line-clamp-2">{m.description}</p>
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
            Ready to migrate to Shopify?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Start your Shopify store today and get your first 3 months for $1/month. Migrate from {migration.platformName} with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.shopify.com/free-trial?ref=adsx"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn-primary"
            >
              Start Free Shopify Trial
            </a>
            <Link href="/tools/free-audit" className="cta-btn">
              Get Your Free Audit
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
