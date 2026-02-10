import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrutalistLayout } from "@/components/brutalist-layout";
import {
  getAllPlatforms,
  getPlatformBySlug,
} from "@/lib/platforms";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  SchemaScript,
} from "@/lib/seo/schemas";

interface PageProps {
  params: Promise<{ platform: string }>;
}

export async function generateStaticParams() {
  const platforms = getAllPlatforms();
  return platforms.map((platform) => ({
    platform: platform.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { platform: slug } = await params;
  const platform = getPlatformBySlug(slug);

  if (!platform) {
    return { title: "Platform Not Found" };
  }

  return createPageMetadata({
    title: `${platform.headline} | AdsX`,
    description: platform.description,
    path: `/platforms/${slug}`,
    keywords: platform.keywords,
  });
}

const importanceBadges: Record<string, { label: string; color: string }> = {
  critical: { label: "CRITICAL PRIORITY", color: "#ef4444" },
  high: { label: "HIGH PRIORITY", color: "#f59e0b" },
  medium: { label: "MEDIUM PRIORITY", color: "#3b82f6" },
};

export default async function PlatformPage({ params }: PageProps) {
  const { platform: slug } = await params;
  const platform = getPlatformBySlug(slug);

  if (!platform) {
    notFound();
  }

  const otherPlatforms = getAllPlatforms().filter((p) => p.slug !== slug);
  const badge = importanceBadges[platform.visibilityImportance];

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "AI Platforms", path: "/platforms" },
    { name: platform.name, path: `/platforms/${slug}` },
  ];

  const faqItems = platform.faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
      <SchemaScript schema={createFAQSchema(faqItems)} />
      <BrutalistLayout>
        {/* Hero */}
        <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
          <div
            className="text-xs tracking-widest text-[#888] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Link href="/" className="hover:text-[#EAEAEA]">HOME</Link>
            <span className="mx-2">/</span>
            <Link href="/platforms" className="hover:text-[#EAEAEA]">PLATFORMS</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">{platform.name.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span
              className="text-xs tracking-widest px-3 py-1 border"
              style={{
                fontFamily: "var(--font-mono)",
                color: badge.color,
                borderColor: badge.color,
              }}
            >
              {badge.label}
            </span>
            <span className="text-xs tracking-widest text-[#888]" style={{ fontFamily: "var(--font-mono)" }}>
              {platform.company}
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
            {platform.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            {platform.description}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/tools/free-audit" className="cta-btn cta-btn-primary">
              Check Your {platform.name} Visibility
            </Link>
            <Link href="/contact" className="cta-btn">
              Talk to Sales
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 border-b border-[#333]">
          {platform.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`p-6 ${idx < platform.stats.length - 1 ? "border-r" : ""} border-[#333] text-center`}
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
                {stat.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* Overview + User Base */}
        <div className="grid lg:grid-cols-[2fr_1fr] border-b border-[#333]">
          <div className="p-8 lg:border-r border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888] mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ABOUT {platform.name.toUpperCase()}
            </div>
            <p className="text-[#ccc] leading-relaxed">
              {platform.overview}
            </p>
          </div>
          <div className="p-8 bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#888] mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              WHO USES {platform.name.toUpperCase()}
            </div>
            <p className="text-[#ccc] leading-relaxed mb-4">
              {platform.userBase}
            </p>
            <div className="p-4 border border-[#10b981]/30 bg-[#10b981]/5">
              <div
                className="text-xs tracking-widest text-[#10b981] mb-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                AUDIENCE PROFILE
              </div>
              <p className="text-sm text-[#ccc]">
                {platform.audienceProfile}
              </p>
            </div>
          </div>
        </div>

        {/* Why It Matters */}
        <div className="border-b border-[#333] p-8 bg-[#0c0c0c]">
          <div
            className="text-xs tracking-widest text-[#888] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            WHY {platform.name.toUpperCase()} VISIBILITY MATTERS
          </div>
          <p className="text-[#ccc] leading-relaxed max-w-3xl">
            {platform.whyItMatters}
          </p>
        </div>

        {/* Key Features */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {platform.name.toUpperCase()} KEY FEATURES
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            {platform.keyFeatures.map((feature, idx) => (
              <div
                key={idx}
                className={`p-6 ${idx % 2 === 0 ? "md:border-r" : ""} ${idx < platform.keyFeatures.length - 2 ? "border-b" : idx === platform.keyFeatures.length - 2 && platform.keyFeatures.length % 2 === 0 ? "" : idx < platform.keyFeatures.length - 1 ? "border-b" : ""} border-[#333]`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="text-[#10b981] text-xs"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.feature}</h3>
                    <p className="text-sm text-[#888]">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optimization Strategies */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981] mb-2"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              HOW TO OPTIMIZE FOR {platform.name.toUpperCase()}
            </div>
            <p className="text-[#888] text-sm">
              Strategies to improve your visibility on this platform
            </p>
          </div>
          <div>
            {platform.optimizationStrategies.map((strategy, idx) => (
              <div
                key={idx}
                className={`p-6 ${idx < platform.optimizationStrategies.length - 1 ? "border-b border-[#333]" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-[#10b981]">✓</span>
                  <div>
                    <h3 className="font-semibold mb-1">{strategy.strategy}</h3>
                    <p className="text-[#888] text-sm">{strategy.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        {platform.faqs.length > 0 && (
          <div className="border-b border-[#333]">
            <div className="p-6 border-b border-[#333]">
              <div
                className="text-xs tracking-widest text-[#888]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {platform.name.toUpperCase()} VISIBILITY FAQS
              </div>
            </div>
            <div>
              {platform.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`p-6 ${idx < platform.faqs.length - 1 ? "border-b border-[#333]" : ""}`}
                >
                  <h3 className="font-semibold mb-3">{faq.question}</h3>
                  <p className="text-[#888]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Platforms */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              OTHER AI PLATFORMS
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {otherPlatforms.slice(0, 6).map((p, idx) => (
              <Link
                key={p.slug}
                href={`/platforms/${p.slug}`}
                className={`group flex items-center justify-between p-6 ${idx % 3 !== 2 ? "lg:border-r" : ""} ${idx % 2 !== 1 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b last:border-b-0 hover:bg-[#111] transition-colors`}
              >
                <div>
                  <div className="font-semibold group-hover:text-[#10b981] transition-colors">
                    {p.name}
                  </div>
                  <div className="text-sm text-[#888]">
                    {p.company}
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
            Ready to dominate {platform.name} visibility?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Get a free audit to see how your brand appears on {platform.name} and other AI platforms.
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
