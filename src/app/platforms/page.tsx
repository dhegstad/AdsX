import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { getAllPlatforms, getPlatformsByImportance } from "@/lib/platforms";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

export const metadata: Metadata = createPageMetadata({
  title: "AI Platforms: Visibility Optimization Guide | AdsX",
  description:
    "Complete guide to AI platform visibility. Learn how to get your brand recommended by ChatGPT, Claude, Perplexity, Gemini, and other leading AI assistants.",
  path: "/platforms",
  keywords: [
    "AI platforms",
    "ChatGPT visibility",
    "Claude visibility",
    "AI assistant optimization",
    "AI search platforms",
  ],
});

const importanceBadges: Record<string, { label: string; color: string }> = {
  critical: { label: "CRITICAL", color: "#ef4444" },
  high: { label: "HIGH", color: "#f59e0b" },
  medium: { label: "MEDIUM", color: "#3b82f6" },
};

export default function PlatformsIndexPage() {
  const allPlatforms = getAllPlatforms();
  const criticalPlatforms = getPlatformsByImportance("critical");
  const highPlatforms = getPlatformsByImportance("high");
  const mediumPlatforms = getPlatformsByImportance("medium");

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "AI Platforms", path: "/platforms" },
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
            <span className="text-[#10b981]">AI PLATFORMS</span>
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
            AI Platform<br />Visibility Guide
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            Your complete guide to getting your brand recommended by the world&apos;s leading
            AI assistants. Learn platform-specific strategies for ChatGPT, Claude, Perplexity, and more.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#333]">
          {[
            { label: "PLATFORMS COVERED", value: allPlatforms.length.toString() },
            { label: "COMBINED USERS", value: "500M+" },
            { label: "CRITICAL PRIORITY", value: criticalPlatforms.length.toString() },
            { label: "HIGHER CONVERSION", value: "4.2x" },
          ].map((stat, idx) => (
            <div
              key={stat.label}
              className={`p-6 ${idx < 3 ? "border-r" : ""} border-[#333] text-center`}
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

        {/* Critical Priority */}
        {criticalPlatforms.length > 0 && (
          <div className="border-b border-[#333]">
            <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
              <div
                className="text-xs tracking-widest mb-2"
                style={{ fontFamily: "var(--font-mono)", color: "#ef4444" }}
              >
                CRITICAL PRIORITY
              </div>
              <p className="text-[#888] text-sm">
                Essential platforms for AI visibility with highest user reach
              </p>
            </div>
            <div className="grid lg:grid-cols-2">
              {criticalPlatforms.map((platform, idx) => {
                const badge = importanceBadges[platform.visibilityImportance];
                return (
                  <Link
                    key={platform.slug}
                    href={`/platforms/${platform.slug}`}
                    className={`group p-6 ${idx % 2 === 0 ? "lg:border-r" : ""} ${idx < criticalPlatforms.length - 2 ? "border-b" : idx === criticalPlatforms.length - 2 && criticalPlatforms.length % 2 === 0 ? "" : idx < criticalPlatforms.length - 1 ? "border-b" : ""} border-[#333] hover:bg-[#111] transition-colors`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3
                            className="text-xl font-semibold group-hover:text-[#10b981] transition-colors"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {platform.name}
                          </h3>
                          <span
                            className="text-[10px] tracking-widest px-2 py-1 border"
                            style={{
                              fontFamily: "var(--font-mono)",
                              color: badge.color,
                              borderColor: badge.color,
                            }}
                          >
                            {badge.label}
                          </span>
                        </div>
                        <p className="text-sm text-[#888] mb-3">
                          {platform.company}
                        </p>
                        <p className="text-[#ccc] text-sm line-clamp-2">
                          {platform.description}
                        </p>
                        <div className="mt-4 flex items-center gap-4 text-xs text-[#888]">
                          {platform.stats.slice(0, 2).map((stat, statIdx) => (
                            <span key={statIdx}>
                              {stat.value} {stat.label}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-[#888] group-hover:text-[#10b981] group-hover:translate-x-1 transition-all shrink-0">
                        &rarr;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* High Priority */}
        {highPlatforms.length > 0 && (
          <div className="border-b border-[#333]">
            <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
              <div
                className="text-xs tracking-widest mb-2"
                style={{ fontFamily: "var(--font-mono)", color: "#f59e0b" }}
              >
                HIGH PRIORITY
              </div>
              <p className="text-[#888] text-sm">
                Important platforms with significant visibility impact
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3">
              {highPlatforms.map((platform, idx) => {
                const badge = importanceBadges[platform.visibilityImportance];
                return (
                  <Link
                    key={platform.slug}
                    href={`/platforms/${platform.slug}`}
                    className={`group p-6 ${idx % 3 !== 2 ? "lg:border-r" : ""} ${idx % 2 !== 1 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b last:border-b-0 hover:bg-[#111] transition-colors`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold group-hover:text-[#10b981] transition-colors">
                            {platform.name}
                          </h3>
                          <span
                            className="text-[10px] tracking-widest px-2 py-0.5 border"
                            style={{
                              fontFamily: "var(--font-mono)",
                              color: badge.color,
                              borderColor: badge.color,
                            }}
                          >
                            {badge.label}
                          </span>
                        </div>
                        <p className="text-sm text-[#888] mb-2">
                          {platform.company}
                        </p>
                        <p className="text-sm text-[#ccc] line-clamp-2">
                          {platform.description}
                        </p>
                      </div>
                      <span className="text-[#888] group-hover:text-[#10b981] group-hover:translate-x-1 transition-all shrink-0">
                        &rarr;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Medium Priority */}
        {mediumPlatforms.length > 0 && (
          <div className="border-b border-[#333]">
            <div className="p-6 border-b border-[#333]">
              <div
                className="text-xs tracking-widest mb-2"
                style={{ fontFamily: "var(--font-mono)", color: "#3b82f6" }}
              >
                MEDIUM PRIORITY
              </div>
              <p className="text-[#888] text-sm">
                Emerging platforms and specialized AI assistants
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3">
              {mediumPlatforms.map((platform, idx) => {
                const badge = importanceBadges[platform.visibilityImportance];
                return (
                  <Link
                    key={platform.slug}
                    href={`/platforms/${platform.slug}`}
                    className={`group p-6 ${idx % 3 !== 2 ? "lg:border-r" : ""} ${idx % 2 !== 1 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b last:border-b-0 hover:bg-[#111] transition-colors`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold group-hover:text-[#10b981] transition-colors">
                            {platform.name}
                          </h3>
                          <span
                            className="text-[10px] tracking-widest px-2 py-0.5 border"
                            style={{
                              fontFamily: "var(--font-mono)",
                              color: badge.color,
                              borderColor: badge.color,
                            }}
                          >
                            {badge.label}
                          </span>
                        </div>
                        <p className="text-sm text-[#888] mb-2">
                          {platform.company}
                        </p>
                        <p className="text-sm text-[#ccc] line-clamp-2">
                          {platform.description}
                        </p>
                      </div>
                      <span className="text-[#888] group-hover:text-[#10b981] group-hover:translate-x-1 transition-all shrink-0">
                        &rarr;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Why Platform-Specific */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              WHY PLATFORM-SPECIFIC OPTIMIZATION MATTERS
            </div>
          </div>
          <div className="p-8">
            <p className="text-[#ccc] mb-8 max-w-3xl">
              Each AI platform has unique characteristics, user bases, and recommendation patterns.
              While core optimization principles apply across platforms, understanding platform-specific
              nuances can significantly improve your visibility where it matters most.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "DIFFERENT USER BASES", desc: "Each platform attracts different demographics with different needs and intent signals." },
                { title: "UNIQUE FEATURES", desc: "Web browsing, memory, custom GPTs, and other features create different visibility opportunities." },
                { title: "TRAINING DIFFERENCES", desc: "Different training data and methodologies mean each platform has different knowledge." },
              ].map((item) => (
                <div key={item.title} className="p-4 border border-[#333]">
                  <div
                    className="text-xs tracking-widest text-[#10b981] mb-2"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {item.title}
                  </div>
                  <p className="text-sm text-[#888]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 md:p-16 text-center bg-[#0c0c0c]">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Check your multi-platform AI visibility
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Get a free audit showing how your brand appears across all major AI platforms.
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
