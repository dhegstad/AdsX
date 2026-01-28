"use client";

import { useState } from "react";
import Link from "next/link";
import { BarChart3, ArrowRight, LogOut } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";
import { Header } from "@/components/marketing/header";
import { AuditForm } from "@/components/tools/audit-form";
import { AuditResults } from "@/components/tools/audit-results";
import type { AuditResponse } from "@/types/visibility";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const session = authClient.useSession();

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [results, setResults] = useState<AuditResponse | null>(null);
  const [brandName, setBrandName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (data: {
    brandName: string;
    brandUrl: string;
    category: string;
    competitors: string[];
  }) => {
    setStatus("loading");
    setBrandName(data.brandName);
    setErrorMessage("");

    try {
      const response = await fetch("/api/visibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setResults(result);
        setStatus("success");
      } else {
        setErrorMessage(result.message || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  // Not logged in
  if (!session.data?.user) {
    return (
      <div
        className={cn(
          "min-h-screen flex items-center justify-center",
          isDark ? "bg-black text-white" : "bg-white text-neutral-900"
        )}
      >
        <div className="text-center">
          <BarChart3
            className={cn(
              "h-12 w-12 mx-auto mb-4",
              isDark ? "text-emerald-400" : "text-emerald-600"
            )}
          />
          <h1 className="text-2xl font-bold">Sign in to access your dashboard</h1>
          <p
            className={cn(
              "mt-2",
              isDark ? "text-white/60" : "text-neutral-600"
            )}
          >
            You need an account to use the full visibility tracker.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link
              href="/login"
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all",
                isDark
                  ? "bg-emerald-500 text-black hover:bg-emerald-400"
                  : "bg-emerald-500 text-white hover:bg-emerald-600"
              )}
            >
              Sign In
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/signup"
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-medium transition-all",
                isDark
                  ? "border-white/20 hover:bg-white/5"
                  : "border-neutral-300 hover:bg-neutral-50"
              )}
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen",
        isDark ? "bg-black text-white" : "bg-white text-neutral-900"
      )}
    >
      <Header />

      {/* Dashboard Header */}
      <section className="pt-28 pb-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Visibility Dashboard</h1>
              <p
                className={cn(
                  "mt-1",
                  isDark ? "text-white/60" : "text-neutral-600"
                )}
              >
                Welcome back, {session.data.user.name || session.data.user.email}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                isDark
                  ? "border-white/10 hover:bg-white/5"
                  : "border-neutral-200 hover:bg-neutral-50"
              )}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {status === "success" && results ? (
            <div>
              <button
                onClick={() => {
                  setStatus("idle");
                  setResults(null);
                }}
                className={cn(
                  "mb-8 text-sm font-medium transition-colors",
                  isDark
                    ? "text-emerald-400 hover:text-emerald-300"
                    : "text-emerald-600 hover:text-emerald-700"
                )}
              >
                &larr; Run another audit
              </button>
              <AuditResults data={results} brandName={brandName} />
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Audit Form */}
              <div
                className={cn(
                  "lg:col-span-2 rounded-2xl border p-6 lg:p-8",
                  isDark
                    ? "border-white/10 bg-white/[0.02]"
                    : "border-neutral-200 bg-white shadow-sm"
                )}
              >
                <h2 className="text-xl font-bold mb-1">Run Visibility Audit</h2>
                <p
                  className={cn(
                    "text-sm mb-6",
                    isDark ? "text-white/40" : "text-neutral-500"
                  )}
                >
                  Query AI platforms to see how your brand is being recommended.
                </p>

                {status === "error" && (
                  <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                    {errorMessage}
                  </div>
                )}

                <AuditForm
                  onSubmit={handleSubmit}
                  isLoading={status === "loading"}
                />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div
                  className={cn(
                    "rounded-xl border p-5",
                    isDark
                      ? "border-white/10 bg-white/[0.02]"
                      : "border-neutral-200 bg-neutral-50"
                  )}
                >
                  <h3 className="font-semibold mb-3">How it works</h3>
                  <ol className="space-y-3">
                    {[
                      "Enter your brand name and category",
                      "We query ChatGPT, Claude, and other AI platforms",
                      "Results are analyzed for mentions, position, and sentiment",
                      "Get actionable recommendations to improve visibility",
                    ].map((step, i) => (
                      <li
                        key={i}
                        className={cn(
                          "flex gap-3 text-sm",
                          isDark ? "text-white/60" : "text-neutral-600"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium",
                            isDark
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-emerald-100 text-emerald-700"
                          )}
                        >
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div
                  className={cn(
                    "rounded-xl border p-5",
                    isDark
                      ? "border-emerald-500/20 bg-emerald-500/5"
                      : "border-emerald-200 bg-emerald-50"
                  )}
                >
                  <h3 className="font-semibold mb-2">Need help improving?</h3>
                  <p
                    className={cn(
                      "text-sm mb-4",
                      isDark ? "text-white/60" : "text-neutral-600"
                    )}
                  >
                    Our agency team can help you improve your AI visibility with
                    full-service strategy and execution.
                  </p>
                  <Link
                    href="/contact"
                    className={cn(
                      "inline-flex items-center gap-1 text-sm font-medium transition-colors",
                      isDark
                        ? "text-emerald-400 hover:text-emerald-300"
                        : "text-emerald-600 hover:text-emerald-700"
                    )}
                  >
                    Talk to our team
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
