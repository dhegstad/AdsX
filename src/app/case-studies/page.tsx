import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";

const caseStudies = [
  {
    idx: "01",
    title: "SaaS Company Increases AI Mentions by 340%",
    category: "B2B SOFTWARE",
    description: "A project management SaaS was invisible in AI search. We optimized their content strategy and secured key mentions across ChatGPT and Perplexity.",
    metrics: [
      { label: "AI MENTIONS", value: "+340%" },
      { label: "ORGANIC TRAFFIC", value: "+127%" },
      { label: "DEMO REQUESTS", value: "+89%" },
    ],
    challenge: "Despite strong Google rankings, the brand wasn't appearing in AI recommendations for their category.",
    solution: "Restructured content for AI retrieval, built third-party citations, and established category authority.",
    timeline: "90 DAYS",
  },
  {
    idx: "02",
    title: "E-commerce Brand Captures Product Recommendations",
    category: "E-COMMERCE",
    description: "A DTC skincare brand wasn't appearing in AI product recommendations. We restructured their content to be AI-readable and built citation authority.",
    metrics: [
      { label: "RECOMMENDATION RATE", value: "47%" },
      { label: "REVENUE FROM AI", value: "$2.1M" },
      { label: "NEW CUSTOMERS", value: "+12K" },
    ],
    challenge: "AI assistants were recommending competitors despite the brand having superior products and reviews.",
    solution: "Optimized product data for AI shopping, built review presence, created comparison content.",
    timeline: "120 DAYS",
  },
  {
    idx: "03",
    title: "Fintech Startup Dominates Category Queries",
    category: "FINTECH",
    description: "A payment processing startup needed to compete with established players. We positioned them as the go-to recommendation for their niche.",
    metrics: [
      { label: "CATEGORY RANKING", value: "#1" },
      { label: "BRAND SEARCHES", value: "+215%" },
      { label: "ENTERPRISE LEADS", value: "+156%" },
    ],
    challenge: "Breaking through in a category dominated by legacy players with established AI presence.",
    solution: "Carved out niche positioning, built thought leadership content, secured key industry mentions.",
    timeline: "180 DAYS",
  },
];

export default function CaseStudiesPage() {
  return (
    <BrutalistLayout>
      {/* Hero */}
      <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
        <div
          className="text-xs tracking-widest text-[#888] mb-4"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          SECTION: CASE STUDIES
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
          Real results in<br />AI search
        </h1>
        <p className="mt-6 max-w-2xl text-[#888] text-lg">
          See how we&apos;ve helped brands capture visibility where customers are actually searching.
        </p>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-3 border-b border-[#333]">
        {[
          { label: "AVG. VISIBILITY INCREASE", value: "340%" },
          { label: "CLIENT RETENTION", value: "94%" },
          { label: "REVENUE GENERATED", value: "$12M+" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-6 border-r last:border-r-0 border-[#333] text-center"
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

      {/* Case Studies */}
      <div className="border-b border-[#333]">
        {caseStudies.map((study, index) => (
          <div
            key={study.title}
            className={`grid lg:grid-cols-[1fr_2fr] ${index < caseStudies.length - 1 ? "border-b border-[#333]" : ""}`}
          >
            {/* Left Column - Meta */}
            <div className="p-8 lg:border-r border-[#333] bg-[#0c0c0c]">
              <div
                className="text-xs tracking-widest text-[#10b981] mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                CASE {study.idx} — {study.category}
              </div>
              <h2
                className="text-xl md:text-2xl uppercase mb-6"
                style={{ fontFamily: "var(--font-display)", lineHeight: 1.1 }}
              >
                {study.title}
              </h2>
              <p className="text-[#888] text-base mb-6">
                {study.description}
              </p>
              <div className="space-y-4">
                <div>
                  <div
                    className="text-[10px] tracking-widest text-[#888] mb-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    CHALLENGE
                  </div>
                  <p className="text-sm text-[#ccc]">{study.challenge}</p>
                </div>
                <div>
                  <div
                    className="text-[10px] tracking-widest text-[#888] mb-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    SOLUTION
                  </div>
                  <p className="text-sm text-[#ccc]">{study.solution}</p>
                </div>
                <div>
                  <div
                    className="text-[10px] tracking-widest text-[#888] mb-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    TIMELINE
                  </div>
                  <p className="text-sm text-[#10b981]">{study.timeline}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Metrics */}
            <div className="p-8 flex items-center">
              <div className="grid grid-cols-3 gap-4 w-full">
                {study.metrics.map((metric) => (
                  <div key={metric.label} className="text-center p-4 border border-[#333]">
                    <div
                      className="text-2xl md:text-3xl lg:text-4xl text-[#10b981] mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {metric.value}
                    </div>
                    <div
                      className="text-[10px] tracking-widest text-[#888]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Process Strip */}
      <div className="border-b border-[#333]">
        <div className="p-6 border-b border-[#333]">
          <div
            className="text-xs tracking-widest text-[#888]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            HOW WE DELIVER RESULTS
          </div>
        </div>
        <div className="grid md:grid-cols-4">
          {[
            { step: "01", title: "AUDIT", desc: "Deep analysis of current AI visibility" },
            { step: "02", title: "STRATEGY", desc: "Custom roadmap for your category" },
            { step: "03", title: "EXECUTE", desc: "Content optimization and authority building" },
            { step: "04", title: "MONITOR", desc: "Ongoing tracking and optimization" },
          ].map((item, i) => (
            <div
              key={item.step}
              className={`p-6 ${i < 3 ? "md:border-r" : ""} border-b md:border-b-0 border-[#333]`}
            >
              <div
                className="text-[#10b981] text-xs mb-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                STEP {item.step}
              </div>
              <div
                className="text-lg uppercase mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.title}
              </div>
              <p className="text-[#888] text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="p-8 md:p-16 text-center bg-[#0c0c0c]">
        <h2
          className="text-2xl md:text-3xl uppercase mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Ready to become the next case study?
        </h2>
        <p className="text-[#888] mb-8 max-w-lg mx-auto">
          Let&apos;s discuss how we can drive similar results for your brand.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="cta-btn cta-btn-primary">
            Start Your Project
          </Link>
          <Link href="/tools/free-audit" className="cta-btn">
            Run Free Audit
          </Link>
        </div>
      </div>
    </BrutalistLayout>
  );
}
