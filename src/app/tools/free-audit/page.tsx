"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Zap, Shield } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import { AuditForm } from "@/components/tools/audit-form";
import { AuditResults } from "@/components/tools/audit-results";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";
import type { AuditResponse } from "@/types/visibility";

export default function FreeAuditPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
    <ThemedLayout>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div
              className={cn(
                "mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm",
                isDark
                  ? "border-emerald-500/30 bg-emerald-500/10"
                  : "border-emerald-500/30 bg-emerald-500/10"
              )}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span
                className={cn(
                  "font-medium",
                  isDark ? "text-emerald-400" : "text-emerald-600"
                )}
              >
                Free AI Visibility Audit
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Is your brand visible in{" "}
              <span className="gradient-text">AI search?</span>
            </h1>
            <p
              className={cn(
                "mt-6 text-lg sm:text-xl",
                isDark ? "text-white/60" : "text-neutral-600"
              )}
            >
              See how your brand appears when customers ask ChatGPT, Claude, and other
              AI platforms for recommendations in your category.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section
        className={cn(
          "border-t py-16",
          isDark ? "border-white/10" : "border-neutral-200"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {status === "success" && results ? (
            <div className="mx-auto max-w-4xl">
              <AuditResults data={results} brandName={brandName} />

              {/* CTA to upgrade */}
              <div
                className={cn(
                  "mt-12 rounded-2xl border p-8 text-center",
                  isDark
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-emerald-200 bg-emerald-50"
                )}
              >
                <h3 className="text-2xl font-bold">Want deeper insights?</h3>
                <p
                  className={cn(
                    "mt-3 text-lg",
                    isDark ? "text-white/60" : "text-neutral-600"
                  )}
                >
                  Get continuous monitoring, historical tracking, and competitor analysis
                  with the full AdsX Visibility Tracker.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/signup"
                    className={cn(
                      "inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-medium transition-all",
                      isDark
                        ? "bg-emerald-500 text-black hover:bg-emerald-400"
                        : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25"
                    )}
                  >
                    Start Free Trial
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className={cn(
                      "inline-flex items-center gap-2 rounded-lg border px-8 py-4 text-base font-medium transition-all",
                      isDark
                        ? "border-white/20 hover:bg-white/5"
                        : "border-neutral-300 hover:bg-neutral-50"
                    )}
                  >
                    Talk to Our Team
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left: Benefits */}
              <div>
                <h2 className="text-2xl font-bold">
                  Why check your AI visibility?
                </h2>
                <p
                  className={cn(
                    "mt-4 text-lg",
                    isDark ? "text-white/60" : "text-neutral-600"
                  )}
                >
                  Millions of people now ask AI assistants for product and service
                  recommendations. If you&apos;re not showing up, your competitors are.
                </p>

                <div className="mt-8 space-y-6">
                  {[
                    {
                      icon: BarChart3,
                      title: "Multi-Platform Analysis",
                      description:
                        "See how your brand appears across ChatGPT, Claude, and other major AI platforms.",
                    },
                    {
                      icon: Zap,
                      title: "Instant Results",
                      description:
                        "Get your visibility score in seconds. Real queries to real AI platforms.",
                    },
                    {
                      icon: Shield,
                      title: "Competitor Tracking",
                      description:
                        "See which competitors are being recommended instead of you.",
                    },
                  ].map((benefit) => (
                    <div key={benefit.title} className="flex gap-4">
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                          isDark
                            ? "bg-emerald-500/10 border border-emerald-500/20"
                            : "bg-emerald-100"
                        )}
                      >
                        <benefit.icon
                          className={cn(
                            "h-5 w-5",
                            isDark ? "text-emerald-400" : "text-emerald-600"
                          )}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{benefit.title}</h3>
                        <p
                          className={cn(
                            "mt-1 text-sm",
                            isDark ? "text-white/60" : "text-neutral-600"
                          )}
                        >
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className={cn(
                    "mt-8 rounded-xl border p-5",
                    isDark ? "border-white/10 bg-white/[0.02]" : "border-neutral-200 bg-neutral-50"
                  )}
                >
                  <p
                    className={cn(
                      "text-sm italic",
                      isDark ? "text-white/60" : "text-neutral-600"
                    )}
                  >
                    &quot;We had no idea we were invisible in ChatGPT. AdsX helped us go from not
                    mentioned to #1 recommended in our category.&quot;
                  </p>
                  <p
                    className={cn(
                      "mt-2 text-xs font-medium",
                      isDark ? "text-white/40" : "text-neutral-500"
                    )}
                  >
                    — VP Marketing, B2B SaaS Company
                  </p>
                </div>
              </div>

              {/* Right: Form */}
              <div
                className={cn(
                  "rounded-2xl border p-6 lg:p-8",
                  isDark ? "border-white/10 bg-white/[0.02]" : "border-neutral-200 bg-white shadow-lg"
                )}
              >
                <h3 className="text-xl font-bold mb-1">Run Your Free Audit</h3>
                <p
                  className={cn(
                    "text-sm mb-6",
                    isDark ? "text-white/40" : "text-neutral-500"
                  )}
                >
                  Enter your details below. We&apos;ll query AI platforms in real-time.
                </p>

                {status === "error" && (
                  <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                    {errorMessage}
                  </div>
                )}

                <AuditForm
                  showLeadCapture
                  onLeadSubmit={handleSubmit}
                  onSubmit={() => {}}
                  isLoading={status === "loading"}
                />

                <p
                  className={cn(
                    "mt-4 text-xs text-center",
                    isDark ? "text-white/30" : "text-neutral-400"
                  )}
                >
                  Your data is secure. We don&apos;t share your information with third parties.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </ThemedLayout>
  );
}
