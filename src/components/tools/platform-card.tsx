"use client";

import { Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";
import type { PlatformResult } from "@/types/visibility";

interface PlatformCardProps {
  result: PlatformResult;
}

export function PlatformCard({ result }: PlatformCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [showRaw, setShowRaw] = useState(false);

  const { brandAnalysis, displayName, error } = result;

  const getSentimentColor = () => {
    if (!brandAnalysis.sentiment) return isDark ? "text-white/40" : "text-neutral-400";
    switch (brandAnalysis.sentiment) {
      case "positive":
        return isDark ? "text-emerald-400" : "text-emerald-600";
      case "negative":
        return "text-red-400";
      default:
        return isDark ? "text-yellow-400" : "text-yellow-600";
    }
  };

  const getSentimentLabel = () => {
    if (!brandAnalysis.sentiment) return "N/A";
    return brandAnalysis.sentiment.charAt(0).toUpperCase() + brandAnalysis.sentiment.slice(1);
  };

  return (
    <div
      className={cn(
        "rounded-xl border overflow-hidden",
        isDark ? "border-white/10 bg-white/[0.02]" : "border-neutral-200 bg-white"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center justify-between px-5 py-4 border-b",
          isDark ? "border-white/10" : "border-neutral-100"
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "h-3 w-3 rounded-full",
              error
                ? "bg-yellow-500"
                : brandAnalysis.mentioned
                ? "bg-emerald-500"
                : "bg-red-400"
            )}
          />
          <span className="font-semibold text-lg">{displayName}</span>
        </div>
        {!error && (
          <div
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium",
              brandAnalysis.mentioned
                ? isDark
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-emerald-100 text-emerald-700"
                : isDark
                ? "bg-red-500/20 text-red-400"
                : "bg-red-100 text-red-700"
            )}
          >
            {brandAnalysis.mentioned ? "Mentioned" : "Not Mentioned"}
          </div>
        )}
        {error && (
          <div
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium",
              isDark
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-yellow-100 text-yellow-700"
            )}
          >
            Error
          </div>
        )}
      </div>

      {/* Body */}
      {!error && (
        <div className="px-5 py-4 space-y-4">
          {/* Metrics row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div
                className={cn(
                  "text-xs uppercase tracking-wider mb-1",
                  isDark ? "text-white/40" : "text-neutral-500"
                )}
              >
                Position
              </div>
              <div className="text-2xl font-bold">
                {brandAnalysis.position ? `#${brandAnalysis.position}` : "—"}
              </div>
            </div>
            <div>
              <div
                className={cn(
                  "text-xs uppercase tracking-wider mb-1",
                  isDark ? "text-white/40" : "text-neutral-500"
                )}
              >
                Sentiment
              </div>
              <div className={cn("text-lg font-medium", getSentimentColor())}>
                {getSentimentLabel()}
              </div>
            </div>
            <div>
              <div
                className={cn(
                  "text-xs uppercase tracking-wider mb-1",
                  isDark ? "text-white/40" : "text-neutral-500"
                )}
              >
                Status
              </div>
              <div className="flex items-center gap-1.5">
                {brandAnalysis.mentioned ? (
                  <Check className="h-5 w-5 text-emerald-500" />
                ) : (
                  <X className="h-5 w-5 text-red-400" />
                )}
                <span className="text-sm font-medium">
                  {brandAnalysis.mentioned ? "Visible" : "Invisible"}
                </span>
              </div>
            </div>
          </div>

          {/* Context snippet */}
          {brandAnalysis.context && (
            <div
              className={cn(
                "rounded-lg p-4 text-sm leading-relaxed",
                isDark ? "bg-white/5 text-white/70" : "bg-neutral-50 text-neutral-600"
              )}
            >
              &quot;{brandAnalysis.context}&quot;
            </div>
          )}

          {/* Competitor mentions */}
          {result.competitorAnalysis.length > 0 && (
            <div>
              <div
                className={cn(
                  "text-xs uppercase tracking-wider mb-2",
                  isDark ? "text-white/40" : "text-neutral-500"
                )}
              >
                Competitors
              </div>
              <div className="space-y-1.5">
                {result.competitorAnalysis.map((comp) => (
                  <div
                    key={comp.name}
                    className={cn(
                      "flex items-center justify-between text-sm rounded-lg px-3 py-2",
                      isDark ? "bg-white/5" : "bg-neutral-50"
                    )}
                  >
                    <span className={isDark ? "text-white/70" : "text-neutral-700"}>
                      {comp.name}
                    </span>
                    <div className="flex items-center gap-3">
                      {comp.position && (
                        <span
                          className={cn(
                            "text-xs",
                            isDark ? "text-white/40" : "text-neutral-500"
                          )}
                        >
                          #{comp.position}
                        </span>
                      )}
                      {comp.mentioned ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Raw response toggle */}
          <button
            onClick={() => setShowRaw(!showRaw)}
            className={cn(
              "flex items-center gap-1 text-xs transition-colors",
              isDark
                ? "text-white/30 hover:text-white/50"
                : "text-neutral-400 hover:text-neutral-600"
            )}
          >
            {showRaw ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
            {showRaw ? "Hide" : "Show"} full AI response
          </button>
          {showRaw && (
            <div
              className={cn(
                "rounded-lg p-4 text-xs leading-relaxed max-h-64 overflow-y-auto whitespace-pre-wrap",
                isDark
                  ? "bg-white/5 text-white/50"
                  : "bg-neutral-50 text-neutral-500"
              )}
            >
              {result.rawResponse}
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="px-5 py-4">
          <p
            className={cn(
              "text-sm",
              isDark ? "text-white/40" : "text-neutral-500"
            )}
          >
            Could not reach this platform. Please try again later.
          </p>
        </div>
      )}
    </div>
  );
}
