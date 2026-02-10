import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

export const metadata: Metadata = createPageMetadata({
  title: "Compare AI Visibility | AdsX",
  description:
    "Understand how AI visibility optimization compares to other marketing approaches. Make informed decisions about where to invest your resources.",
  path: "/compare",
  keywords: [
    "AI visibility vs SEO",
    "AI visibility vs PR",
    "AI marketing comparison",
    "ChatGPT optimization comparison",
  ],
});

const comparisons = [
  {
    title: "AI Visibility vs SEO",
    description: "SEO gets you ranked on Google. AI visibility gets you recommended by ChatGPT. Learn why you need both and how they differ.",
    href: "/compare/ai-visibility-vs-seo",
    highlight: "MOST POPULAR",
  },
  {
    title: "AI Visibility vs PR",
    description: "PR builds general awareness. AI visibility drives purchase consideration. Compare costs, ROI, and time to results.",
    href: "/compare/ai-visibility-vs-pr",
    highlight: null,
  },
  {
    title: "AdsX vs DIY",
    description: "You can build AI visibility in-house. But should you? Honest comparison of professional help vs doing it yourself.",
    href: "/compare/ai-visibility-vs-diy",
    highlight: null,
  },
];

export default function ComparePage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
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
            <span className="text-[#10b981]">COMPARE</span>
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
            Compare<br />AI Visibility
          </h1>
          <p className="mt-6 max-w-2xl text-[#888] text-lg">
            Understand how AI visibility optimization compares to other marketing approaches.
            Make informed decisions about where to invest your resources.
          </p>
        </div>

        {/* Comparisons */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              AVAILABLE COMPARISONS
            </div>
          </div>
          <div className="grid md:grid-cols-3">
            {comparisons.map((comparison, idx) => (
              <Link
                key={comparison.title}
                href={comparison.href}
                className={`group relative p-6 ${idx < 2 ? "md:border-r" : ""} border-[#333] hover:bg-[#111] transition-colors`}
              >
                {comparison.highlight && (
                  <div
                    className="absolute top-4 right-4 text-[10px] tracking-widest px-2 py-1 bg-[#10b981] text-black"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {comparison.highlight}
                  </div>
                )}
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-[#10b981]">◉</span>
                  <h2 className="text-xl font-semibold group-hover:text-[#10b981] transition-colors">
                    {comparison.title}
                  </h2>
                </div>
                <p className="text-[#888] mb-6">
                  {comparison.description}
                </p>
                <div className="flex items-center gap-2 text-[#10b981] font-medium">
                  <span>Read comparison</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
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
            Not sure which approach is right for you?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Start with a free visibility audit. We&apos;ll show you where you stand and recommend the best path forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/free-audit" className="cta-btn cta-btn-primary">
              Get Your Free Audit
            </Link>
            <Link href="/contact" className="cta-btn">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
