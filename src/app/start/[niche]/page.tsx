import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrutalistLayout } from "@/components/brutalist-layout";
import {
  getAllNicheStores,
  getNicheStoreBySlug,
} from "@/lib/niche-stores";
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
  return getAllNicheStores().map((n) => ({ niche: n.slug }));
}

interface PageProps {
  params: Promise<{ niche: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { niche: slug } = await params;
  const store = getNicheStoreBySlug(slug);

  if (!store) {
    return { title: "Store Guide Not Found" };
  }

  return createPageMetadata({
    title: `Start a ${store.nicheName} Shopify Store | Complete Guide`,
    description: store.description,
    path: `/start/${slug}`,
    keywords: store.keywords,
  });
}

export default async function NicheStorePage({ params }: PageProps) {
  const { niche: slug } = await params;
  const store = getNicheStoreBySlug(slug);

  if (!store) {
    notFound();
  }

  const otherStores = getAllNicheStores()
    .filter((n) => n.slug !== slug)
    .slice(0, 8);

  const relatedArticles = getRelatedArticlesForPage(store.keywords, store.nicheName);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Start a Store", path: "/start" },
    { name: store.nicheName, path: `/start/${slug}` },
  ];

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
      <SchemaScript schema={createFAQSchema(store.faqs)} />
      <BrutalistLayout>
        {/* Hero */}
        <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
          <div
            className="text-xs tracking-widest text-[#888] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Link href="/" className="hover:text-[#EAEAEA]">HOME</Link>
            <span className="mx-2">/</span>
            <Link href="/start" className="hover:text-[#EAEAEA]">START A STORE</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">{store.nicheName.toUpperCase()}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="text-xs tracking-widest px-3 py-1 border border-[#10b981] text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              STORE GUIDE
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
            {store.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            {store.subheadline}
          </p>

          {/* Stat Badges */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="border border-[#333] px-4 py-3">
              <div
                className="text-[10px] tracking-widest text-[#888] mb-1"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                STARTUP COST
              </div>
              <div
                className="text-lg text-[#10b981]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {store.startupCost}
              </div>
            </div>
            <div className="border border-[#333] px-4 py-3">
              <div
                className="text-[10px] tracking-widest text-[#888] mb-1"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                MONTHLY REVENUE
              </div>
              <div
                className="text-lg text-[#10b981]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {store.monthlyRevenuePotential}
              </div>
            </div>
            <div className="border border-[#333] px-4 py-3">
              <div
                className="text-[10px] tracking-widest text-[#888] mb-1"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                TIME TO FIRST SALE
              </div>
              <div
                className="text-lg text-[#10b981]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {store.timeToFirstSale}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="https://shopify.pxf.io/adsx"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn-primary"
            >
              Start Your Shopify Store
            </a>
            <Link href="/start" className="cta-btn">
              Browse All Store Ideas
            </Link>
          </div>
        </div>

        {/* Description */}
        <div className="border-b border-[#333] p-8 md:p-16">
          <p className="text-[#ccc] text-lg leading-relaxed max-w-3xl">
            {store.description}
          </p>
        </div>

        {/* Market Opportunity */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              MARKET OPPORTUNITY
            </div>
          </div>
          <div className="p-8 md:p-12">
            <p className="text-[#ccc] text-lg leading-relaxed max-w-3xl">
              {store.marketOpportunity}
            </p>
          </div>
        </div>

        {/* Target Audience */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              TARGET AUDIENCE
            </div>
          </div>
          <div className="p-8 md:p-12">
            <p className="text-[#ccc] text-lg leading-relaxed max-w-3xl">
              {store.targetAudience}
            </p>
          </div>
        </div>

        {/* Essential Shopify Apps */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ESSENTIAL SHOPIFY APPS
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            {store.essentialApps.map((app, idx) => (
              <div
                key={app.name}
                className={`p-6 ${idx % 2 === 0 ? "md:border-r" : ""} ${idx < store.essentialApps.length - 2 ? "border-b" : idx === store.essentialApps.length - 2 && store.essentialApps.length % 2 === 0 ? "" : idx < store.essentialApps.length - 1 ? "border-b" : ""} border-[#333]`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="text-[#10b981] text-xs shrink-0 mt-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold mb-1">{app.name}</h3>
                    <p className="text-sm text-[#888]">{app.purpose}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marketing Channels */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              BEST MARKETING CHANNELS
            </div>
          </div>
          <div className="grid md:grid-cols-3">
            {store.marketingChannels.map((mc, idx) => (
              <div
                key={mc.channel}
                className={`p-6 ${idx < store.marketingChannels.length - 1 ? "md:border-r" : ""} border-b md:border-b-0 border-[#333]`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-[#10b981] shrink-0">&#9654;</span>
                  <div>
                    <h3 className="font-semibold mb-2">{mc.channel}</h3>
                    <p className="text-sm text-[#888]">{mc.why}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#f59e0b]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              KEY CHALLENGES TO PREPARE FOR
            </div>
          </div>
          {store.challenges.map((challenge, idx) => (
            <div
              key={challenge.title}
              className={`p-6 ${idx < store.challenges.length - 1 ? "border-b" : ""} border-[#333]`}
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

        {/* Success Tips */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {store.successTips.length} TIPS FOR SUCCESS
            </div>
          </div>
          <div className="p-6 md:p-8">
            <ol className="space-y-4">
              {store.successTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span
                    className="text-[#10b981] text-xs shrink-0 mt-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[#ccc]">{tip}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* FAQs */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              FREQUENTLY ASKED QUESTIONS
            </div>
          </div>
          {store.faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`p-6 ${idx < store.faqs.length - 1 ? "border-b" : ""} border-[#333]`}
            >
              <h3 className="font-semibold mb-3">{faq.question}</h3>
              <p className="text-sm text-[#888] leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Related Stores */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              MORE STORE IDEAS
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            {otherStores.map((s, idx) => (
              <Link
                key={s.slug}
                href={`/start/${s.slug}`}
                className={`group flex items-center justify-between p-6 ${idx % 2 === 0 ? "md:border-r" : ""} border-[#333] border-b last:border-b-0 hover:bg-[#111] transition-colors`}
              >
                <div>
                  <div className="font-semibold group-hover:text-[#10b981] transition-colors">
                    {s.nicheName}
                  </div>
                  <div className="text-sm text-[#888] flex gap-4 mt-1">
                    <span>{s.startupCost}</span>
                    <span className="text-[#10b981]">{s.monthlyRevenuePotential}/mo</span>
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
            Ready to start your {store.nicheName} store?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Launch your {store.nicheName.toLowerCase()} Shopify store today. Get started with a free trial and build the business you have been dreaming about.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://shopify.pxf.io/adsx"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn-primary"
            >
              Start Your Free Shopify Trial
            </a>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
