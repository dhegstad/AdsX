import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrutalistLayout } from "@/components/brutalist-layout";
import {
  getAllProducts,
  getProductBySlug,
} from "@/lib/sell-products";
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
  return getAllProducts().map((p) => ({ product: p.slug }));
}

interface PageProps {
  params: Promise<{ product: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { product: slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return createPageMetadata({
    title: `How to Sell ${product.productName} on Shopify | AdsX`,
    description: product.description,
    path: `/sell/${slug}`,
    keywords: product.keywords,
  });
}

export default async function SellProductPage({ params }: PageProps) {
  const { product: slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const otherProducts = getAllProducts().filter((p) => p.slug !== slug).slice(0, 8);
  const relatedArticles = getRelatedArticlesForPage(product.keywords, product.productName);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Sell on Shopify", path: "/sell" },
    { name: product.productName, path: `/sell/${slug}` },
  ];

  const difficultyColor: Record<string, string> = {
    beginner: "#10b981",
    intermediate: "#f59e0b",
    advanced: "#ef4444",
  };

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
      <SchemaScript schema={createFAQSchema(product.faqs)} />
      <BrutalistLayout>
        {/* Hero */}
        <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
          <div
            className="text-xs tracking-widest text-[#888] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Link href="/" className="hover:text-[#EAEAEA]">HOME</Link>
            <span className="mx-2">/</span>
            <Link href="/sell" className="hover:text-[#EAEAEA]">SELL ON SHOPIFY</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">{product.productName.toUpperCase()}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="text-xs tracking-widest px-3 py-1 border border-[#10b981] text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              SELL ON SHOPIFY
            </span>
            <span
              className="text-xs tracking-widest px-3 py-1 border"
              style={{
                fontFamily: "var(--font-mono)",
                borderColor: difficultyColor[product.difficulty],
                color: difficultyColor[product.difficulty],
              }}
            >
              {product.difficulty.toUpperCase()}
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
            {product.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            {product.subheadline}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="https://shopify.pxf.io/adsx"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn-primary"
            >
              Start Selling on Shopify
            </a>
            <Link href="/sell" className="cta-btn">
              Browse All Products
            </Link>
          </div>
        </div>

        {/* Market Overview Stats */}
        <div className="grid grid-cols-3 border-b border-[#333]">
          <div className="p-6 border-r border-[#333] text-center">
            <div
              className="text-2xl md:text-4xl text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {product.marketSize.replace(/ market in \d{4}/, "")}
            </div>
            <div
              className="text-[10px] md:text-xs tracking-widest text-[#888] mt-2"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              MARKET SIZE
            </div>
          </div>
          <div className="p-6 border-r border-[#333] text-center">
            <div
              className="text-2xl md:text-4xl text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {product.avgMargin}
            </div>
            <div
              className="text-[10px] md:text-xs tracking-widest text-[#888] mt-2"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              AVG. MARGIN
            </div>
          </div>
          <div className="p-6 text-center">
            <div
              className="text-2xl md:text-4xl"
              style={{
                fontFamily: "var(--font-display)",
                color: difficultyColor[product.difficulty],
              }}
            >
              {product.difficulty.charAt(0).toUpperCase() + product.difficulty.slice(1)}
            </div>
            <div
              className="text-[10px] md:text-xs tracking-widest text-[#888] mt-2"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              DIFFICULTY
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="border-b border-[#333] p-8 md:p-12">
          <p className="text-[#ccc] text-lg leading-relaxed max-w-3xl">
            {product.description}
          </p>
        </div>

        {/* Requirements */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              WHAT YOU NEED TO START
            </div>
          </div>
          <div className="grid md:grid-cols-3">
            {product.requirements.map((req, idx) => (
              <div
                key={req.title}
                className={`p-6 ${idx < product.requirements.length - 1 ? "md:border-r" : ""} border-[#333] border-b md:border-b-0`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="text-[#10b981] text-xs shrink-0 mt-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold mb-2">{req.title}</h3>
                    <p className="text-sm text-[#888]">{req.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              STEP-BY-STEP GUIDE
            </div>
          </div>
          {product.steps.map((step, idx) => (
            <div
              key={step.title}
              className={`p-6 ${idx < product.steps.length - 1 ? "border-b" : ""} border-[#333]`}
            >
              <div className="flex items-start gap-4 max-w-3xl">
                <span
                  className="text-[#10b981] text-lg font-bold shrink-0"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-[#888]">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips for Success */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#f59e0b]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              TIPS FOR SUCCESS
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            {product.tips.map((tip, idx) => (
              <div
                key={idx}
                className={`p-6 ${idx % 2 === 0 ? "md:border-r" : ""} ${idx < product.tips.length - 2 ? "border-b" : idx === product.tips.length - 2 && product.tips.length % 2 === 0 ? "" : idx < product.tips.length - 1 ? "border-b" : ""} border-[#333]`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-[#f59e0b] shrink-0">&#9733;</span>
                  <p className="text-sm text-[#ccc]">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopify Features */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              WHY SHOPIFY FOR {product.productName.toUpperCase()}
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            {product.shopifyFeatures.map((feature, idx) => (
              <div
                key={idx}
                className={`p-6 ${idx % 2 === 0 ? "md:border-r" : ""} ${idx < product.shopifyFeatures.length - 2 ? "border-b" : idx === product.shopifyFeatures.length - 2 && product.shopifyFeatures.length % 2 === 0 ? "" : idx < product.shopifyFeatures.length - 1 ? "border-b" : ""} border-[#333]`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-[#10b981]">&#10003;</span>
                  <p className="text-sm text-[#ccc]">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopify CTA */}
        <div className="border-b border-[#333] p-8 md:p-12 bg-[#0c0c0c]">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-xl md:text-2xl uppercase mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to start selling {product.productName.toLowerCase()}?
            </h2>
            <p className="text-[#888] mb-6">
              Shopify gives you everything you need to build, launch, and grow your {product.productName.toLowerCase()} business. Start your free trial today.
            </p>
            <a
              href="https://shopify.pxf.io/adsx"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn-primary inline-block"
            >
              Start Free Shopify Trial
            </a>
          </div>
        </div>

        {/* FAQs */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              FREQUENTLY ASKED QUESTIONS
            </div>
          </div>
          {product.faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`p-6 ${idx < product.faqs.length - 1 ? "border-b" : ""} border-[#333]`}
            >
              <h3 className="font-semibold mb-2">{faq.question}</h3>
              <p className="text-sm text-[#888]">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Related Products */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              MORE PRODUCTS TO SELL ON SHOPIFY
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            {otherProducts.map((prod, idx) => (
              <Link
                key={prod.slug}
                href={`/sell/${prod.slug}`}
                className={`group flex items-center justify-between p-6 ${idx % 2 === 0 ? "md:border-r" : ""} border-[#333] border-b last:border-b-0 hover:bg-[#111] transition-colors`}
              >
                <div>
                  <div className="font-semibold group-hover:text-[#10b981] transition-colors">
                    {prod.productName}
                  </div>
                  <div className="text-sm text-[#888] flex items-center gap-3 mt-1">
                    <span>{prod.marketSize}</span>
                    <span
                      className="text-[10px] px-2 py-0.5 border"
                      style={{
                        borderColor: difficultyColor[prod.difficulty],
                        color: difficultyColor[prod.difficulty],
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {prod.difficulty.toUpperCase()}
                    </span>
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

        {/* Bottom CTA */}
        <div className="p-8 md:p-16 text-center bg-[#0c0c0c]">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Start selling {product.productName.toLowerCase()} today
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Join thousands of entrepreneurs who use Shopify to sell {product.productName.toLowerCase()} online. Get started with a free trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://shopify.pxf.io/adsx"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn-primary"
            >
              Start Free Shopify Trial
            </a>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
