"use client";

import { useState } from "react";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { AuditForm } from "@/components/tools/audit-form";
import { AuditResults } from "@/components/tools/audit-results";
import type { AuditResponse } from "@/types/visibility";

export default function FreeAuditPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [results, setResults] = useState<AuditResponse | null>(null);
  const [brandName, setBrandName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    brandName: string;
    brandUrl: string;
    category: string;
    competitors: string[];
  }) => {
    setStatus("loading");
    setBrandName(data.brandName);
    setErrorMessage("");

    try {
      const response = await fetch("/api/free-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setResults(result);
        setStatus("success");
      } else {
        setErrorMessage(result.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <BrutalistLayout>
      {/* Header */}
      <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
        <div
          className="text-xs tracking-widest text-[#888] mb-4"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <Link href="/" className="hover:text-[#EAEAEA]">HOME</Link>
          <span className="mx-2">/</span>
          <Link href="/tools/free-audit" className="hover:text-[#EAEAEA]">TOOLS</Link>
          <span className="mx-2">/</span>
          <span className="text-[#10b981]">FREE AUDIT</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#10b981]/30 bg-[#10b981]/10 text-[#10b981] text-sm mb-6">
          <span className="h-2 w-2 bg-[#10b981] animate-pulse" />
          <span style={{ fontFamily: "var(--font-mono)" }}>FREE AI VISIBILITY AUDIT</span>
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
          Is Your Brand Visible<br />In AI Search?
        </h1>
        <p className="mt-6 max-w-2xl text-[#888] text-lg">
          See how your brand appears when customers ask ChatGPT, Claude, and other
          AI platforms for recommendations in your category.
        </p>
      </div>

      {/* Main Content */}
      <div className="border-b border-[#333]">
        {status === "success" && results ? (
          <div className="p-8 md:p-16">
            <div className="max-w-4xl mx-auto">
              <AuditResults data={results} brandName={brandName} />

              {/* CTA */}
              <div className="mt-12 border border-[#10b981]/30 bg-[#10b981]/5 p-8 text-center">
                <h3
                  className="text-2xl uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Ready to Improve Your AI Visibility?
                </h3>
                <p className="mt-3 text-lg text-[#888]">
                  Our team can help you get recommended by ChatGPT, Claude, and other AI platforms.
                  Book a call to discuss your custom strategy.
                </p>
                <div className="mt-6">
                  <Link href="/contact" className="cta-btn cta-btn-primary">
                    Book a Strategy Call
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2">
            {/* Left: Benefits */}
            <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#333]">
              <div
                className="text-xs tracking-widest text-[#10b981] mb-6"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                WHY CHECK YOUR AI VISIBILITY
              </div>
              <p className="text-lg text-[#888]">
                Millions of people now ask AI assistants for product and service
                recommendations. If you&apos;re not showing up, your competitors are.
              </p>

              <div className="mt-8 space-y-6">
                {[
                  {
                    idx: "01",
                    title: "Multi-Platform Analysis",
                    description:
                      "See how your brand appears across ChatGPT, Claude, and other major AI platforms.",
                  },
                  {
                    idx: "02",
                    title: "Instant Results",
                    description:
                      "Get your visibility score in seconds. Real queries to real AI platforms.",
                  },
                  {
                    idx: "03",
                    title: "Competitor Tracking",
                    description:
                      "See which competitors are being recommended instead of you.",
                  },
                ].map((benefit) => (
                  <div key={benefit.idx} className="flex gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#333] text-[#10b981]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {benefit.idx}
                    </div>
                    <div>
                      <h3 className="font-semibold">{benefit.title}</h3>
                      <p className="mt-1 text-sm text-[#888]">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border border-[#333] p-5 bg-[#0c0c0c]">
                <p className="text-sm text-[#888]">
                  <span className="text-[#10b981]">800M+ people</span> now use ChatGPT weekly.
                  Many of them are asking for product recommendations in your category.
                </p>
                <p className="mt-2 text-xs text-[#555]" style={{ fontFamily: "var(--font-mono)" }}>
                  SOURCE: OPENAI, 2024
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="p-8 md:p-12 bg-[#0c0c0c]">
              <div
                className="text-xs tracking-widest text-[#10b981] mb-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                RUN YOUR FREE AUDIT
              </div>
              <p className="text-sm text-[#888] mb-6">
                Enter your details below. We&apos;ll query AI platforms in real-time.
              </p>

              {status === "error" && (
                <div className="mb-6 border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                  {errorMessage}
                </div>
              )}

              <AuditForm
                showLeadCapture
                onLeadSubmit={handleSubmit}
                onSubmit={() => {}}
                isLoading={status === "loading"}
              />

              <p className="mt-4 text-xs text-center text-[#555]">
                Your data is secure. We don&apos;t share your information with third parties.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="p-8 md:p-16 text-center bg-[#0c0c0c]">
        <h2
          className="text-2xl md:text-3xl uppercase mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Questions About AI Visibility?
        </h2>
        <p className="text-[#888] mb-8 max-w-lg mx-auto">
          Our team can help you understand your AI search presence and build a strategy
          to get your brand recommended.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="cta-btn cta-btn-primary">
            Talk to an Expert
          </Link>
          <Link href="/blog" className="cta-btn">
            Read Our Blog
          </Link>
        </div>
      </div>
    </BrutalistLayout>
  );
}
