"use client";

import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";
import type { AuditResponse } from "@/types/visibility";
import { VisibilityScore } from "./visibility-score";
import { PlatformCard } from "./platform-card";

interface AuditResultsProps {
  data: AuditResponse;
  brandName: string;
}

export function AuditResults({ data, brandName }: AuditResultsProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          Visibility Report:{" "}
          <span className={isDark ? "text-emerald-400" : "text-emerald-600"}>
            {brandName}
          </span>
        </h2>
        <p
          className={cn(
            "mt-2 text-sm",
            isDark ? "text-white/40" : "text-neutral-500"
          )}
        >
          Analyzed on {new Date(data.timestamp).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* Score */}
      <VisibilityScore summary={data.summary} />

      {/* Platform Results */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Platform Breakdown</h3>
        <div className="grid gap-6 lg:grid-cols-2">
          {data.results.map((result) => (
            <PlatformCard key={result.platform} result={result} />
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div
        className={cn(
          "rounded-xl border p-6",
          isDark ? "border-white/10 bg-white/[0.02]" : "border-neutral-200 bg-neutral-50"
        )}
      >
        <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
        <ul className="space-y-2">
          {data.summary.visibilityScore < 40 && (
            <li
              className={cn(
                "flex items-start gap-2 text-sm",
                isDark ? "text-white/60" : "text-neutral-600"
              )}
            >
              <span className="text-red-400 mt-0.5">●</span>
              <span>
                Your brand has low AI visibility. AI platforms are not consistently recommending{" "}
                <strong>{brandName}</strong> to users searching in your category. Immediate action
                is recommended.
              </span>
            </li>
          )}
          {data.summary.visibilityScore >= 40 &&
            data.summary.visibilityScore < 70 && (
              <li
                className={cn(
                  "flex items-start gap-2 text-sm",
                  isDark ? "text-white/60" : "text-neutral-600"
                )}
              >
                <span className="text-yellow-400 mt-0.5">●</span>
                <span>
                  Your brand has moderate AI visibility but there is significant room for
                  improvement. Optimization could move you into the top positions.
                </span>
              </li>
            )}
          {data.summary.visibilityScore >= 70 && (
            <li
              className={cn(
                "flex items-start gap-2 text-sm",
                isDark ? "text-white/60" : "text-neutral-600"
              )}
            >
              <span className="text-emerald-400 mt-0.5">●</span>
              <span>
                Your brand has strong AI visibility. Continue monitoring to maintain your position
                and protect against competitors.
              </span>
            </li>
          )}
          {data.results.some(
            (r) => !r.brandAnalysis.mentioned && !r.error
          ) && (
            <li
              className={cn(
                "flex items-start gap-2 text-sm",
                isDark ? "text-white/60" : "text-neutral-600"
              )}
            >
              <span className="text-red-400 mt-0.5">●</span>
              <span>
                You are missing from{" "}
                {data.results
                  .filter((r) => !r.brandAnalysis.mentioned && !r.error)
                  .map((r) => r.displayName)
                  .join(", ")}
                . These platforms have millions of users making purchasing decisions.
              </span>
            </li>
          )}
          <li
            className={cn(
              "flex items-start gap-2 text-sm",
              isDark ? "text-white/60" : "text-neutral-600"
            )}
          >
            <span className={isDark ? "text-emerald-400 mt-0.5" : "text-emerald-600 mt-0.5"}>●</span>
            <span>
              Build authoritative content, earn expert mentions, and optimize for LLM-friendly
              formats to improve your AI visibility score.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
