import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrutalistLayout } from "@/components/brutalist-layout";
import {
  getAllAppDirectories,
  getAppDirectoryBySlug,
} from "@/lib/app-directories";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  createItemListSchema,
  SchemaScript,
} from "@/lib/seo/schemas";
import { getRelatedArticlesForPage } from "@/lib/seo/internal-linking";
import { RelatedArticles } from "@/components/related-articles";

// ISR: generate on first request, cache for 24 hours
export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllAppDirectories().map((d) => ({
    category: `best-shopify-${d.slug}-apps`,
  }));
}

interface PageProps {
  params: Promise<{ category: string }>;
}

function extractSlug(category: string): string | null {
  const match = category.match(/^best-shopify-(.+)-apps$/);
  return match ? match[1] : null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const slug = extractSlug(category);
  if (!slug) return { title: "App Directory Not Found" };

  const directory = getAppDirectoryBySlug(slug);
  if (!directory) return { title: "App Directory Not Found" };

  return createPageMetadata({
    title: `Best Shopify ${directory.categoryName} Apps in 2026 | AdsX`,
    description: directory.description,
    path: `/apps/best-shopify-${slug}-apps`,
    keywords: directory.keywords,
  });
}

export default async function AppDirectoryPage({ params }: PageProps) {
  const { category } = await params;
  const slug = extractSlug(category);
  if (!slug) notFound();

  const directory = getAppDirectoryBySlug(slug);
  if (!directory) notFound();

  const allDirectories = getAllAppDirectories();
  const otherDirectories = allDirectories
    .filter((d) => d.slug !== slug)
    .slice(0, 6);
  const relatedArticles = getRelatedArticlesForPage(
    directory.keywords,
    directory.categoryName
  );

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Shopify Apps", path: "/apps" },
    {
      name: `Best ${directory.categoryName} Apps`,
      path: `/apps/best-shopify-${slug}-apps`,
    },
  ];

  const faqItems = directory.faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
      <SchemaScript schema={createFAQSchema(faqItems)} />
      <SchemaScript
        schema={createItemListSchema({
          name: directory.headline,
          description: directory.description,
          slug: `best-shopify-${slug}-apps`,
          items: directory.apps.map((app, idx) => ({
            name: app.name,
            description: app.description,
            position: idx + 1,
          })),
        })}
      />
      <BrutalistLayout>
        {/* Hero */}
        <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
          <div
            className="text-xs tracking-widest text-[#888] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Link href="/" className="hover:text-[#EAEAEA]">
              HOME
            </Link>
            <span className="mx-2">/</span>
            <Link href="/apps" className="hover:text-[#EAEAEA]">
              SHOPIFY APPS
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">
              {directory.categoryName.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span
              className="text-xs tracking-widest px-3 py-1 border border-[#10b981] text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {directory.apps.length} APPS REVIEWED
            </span>
            <span
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              UPDATED 2026
            </span>
          </div>
          <h1
            className="uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 4vw, 48px)",
              lineHeight: 1,
              letterSpacing: "-1px",
            }}
          >
            {directory.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            {directory.description}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              QUICK COMPARISON
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#333] text-left">
                  <th
                    className="p-4 text-xs tracking-widest text-[#888]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    APP
                  </th>
                  <th
                    className="p-4 text-xs tracking-widest text-[#888]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    PRICING
                  </th>
                  <th
                    className="p-4 text-xs tracking-widest text-[#888]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    RATING
                  </th>
                  <th
                    className="p-4 text-xs tracking-widest text-[#888]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    BEST FOR
                  </th>
                </tr>
              </thead>
              <tbody>
                {directory.apps.map((app, idx) => (
                  <tr
                    key={idx}
                    className={`${idx < directory.apps.length - 1 ? "border-b border-[#333]" : ""} hover:bg-[#111] transition-colors`}
                  >
                    <td className="p-4 font-semibold">{app.name}</td>
                    <td className="p-4 text-[#10b981]">{app.pricing}</td>
                    <td className="p-4 text-[#f59e0b]">{app.rating}</td>
                    <td className="p-4 text-[#888]">{app.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* App Cards */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              DETAILED REVIEWS
            </div>
          </div>
          <div>
            {directory.apps.map((app, idx) => (
              <div
                key={idx}
                className={`p-6 ${idx < directory.apps.length - 1 ? "border-b border-[#333]" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="flex h-8 w-8 items-center justify-center bg-[#10b981]/10 text-sm font-bold text-[#10b981] shrink-0"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold">{app.name}</h2>
                      <span
                        className="text-xs px-2 py-1 border border-[#f59e0b]/30 text-[#f59e0b]"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {app.rating}
                      </span>
                      <span
                        className="text-xs px-2 py-1 border border-[#10b981]/30 text-[#10b981]"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {app.pricing}
                      </span>
                    </div>
                    <p className="text-[#888] mb-4">{app.description}</p>
                    <div className="inline-flex items-center gap-2 text-sm text-[#3b82f6] px-3 py-1 border border-[#3b82f6]/30 bg-[#3b82f6]/5 mb-4">
                      <span>Best for:</span>
                      <span>{app.bestFor}</span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2 mt-3">
                      {app.features.map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className="text-[#10b981] shrink-0">+</span>
                          <span className="text-[#ccc]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selection Criteria */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              HOW TO CHOOSE THE RIGHT {directory.categoryName.toUpperCase()} APP
            </div>
          </div>
          <div>
            {directory.selectionCriteria.map((criterion, idx) => (
              <div
                key={idx}
                className={`p-6 flex items-start gap-4 ${idx < directory.selectionCriteria.length - 1 ? "border-b border-[#333]" : ""}`}
              >
                <span
                  className="text-[#10b981] text-xs shrink-0 mt-1"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-[#ccc]">{criterion}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        {directory.faqs.length > 0 && (
          <div className="border-b border-[#333]">
            <div className="p-6 border-b border-[#333]">
              <div
                className="text-xs tracking-widest text-[#888]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                FREQUENTLY ASKED QUESTIONS
              </div>
            </div>
            <div>
              {directory.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`p-6 ${idx < directory.faqs.length - 1 ? "border-b border-[#333]" : ""}`}
                >
                  <h3 className="font-semibold mb-3">{faq.question}</h3>
                  <p className="text-[#888]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Directories */}
        {otherDirectories.length > 0 && (
          <div className="border-b border-[#333]">
            <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
              <div
                className="text-xs tracking-widest text-[#888]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                EXPLORE MORE APP CATEGORIES
              </div>
            </div>
            <div className="grid md:grid-cols-3">
              {otherDirectories.map((d, idx) => (
                <Link
                  key={d.slug}
                  href={`/apps/best-shopify-${d.slug}-apps`}
                  className={`group p-6 ${idx < otherDirectories.length - 1 ? "md:border-r" : ""} border-[#333] border-b last:border-b-0 hover:bg-[#111] transition-colors`}
                >
                  <span
                    className="text-xs tracking-widest text-[#10b981] px-2 py-1 border border-[#10b981]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {d.apps.length} APPS
                  </span>
                  <h3 className="font-semibold mt-3 group-hover:text-[#10b981] transition-colors">
                    Best Shopify {d.categoryName} Apps
                  </h3>
                  <p className="text-sm text-[#888] mt-2 line-clamp-2">
                    {d.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <RelatedArticles articles={relatedArticles} />

        {/* CTA */}
        <div className="p-8 md:p-16 text-center bg-[#0c0c0c]">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Get found when shoppers ask AI for{" "}
            {directory.categoryName.toLowerCase()} apps
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            AdsX helps Shopify apps and e-commerce brands appear in AI-powered
            recommendations across ChatGPT, Claude, and Perplexity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/free-audit" className="cta-btn cta-btn-primary">
              Get Your Free Audit
            </Link>
            <Link href="/apps" className="cta-btn">
              Browse All Categories
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
