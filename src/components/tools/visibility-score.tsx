"use client";

import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";
import type { AuditResponse } from "@/types/visibility";

interface VisibilityScoreProps {
  summary: AuditResponse["summary"];
}

export function VisibilityScore({ summary }: VisibilityScoreProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const getScoreColor = (score: number) => {
    if (score >= 70) return isDark ? "text-emerald-400" : "text-emerald-600";
    if (score >= 40) return isDark ? "text-yellow-400" : "text-yellow-600";
    return "text-red-400";
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 70) return "from-emerald-500 to-emerald-400";
    if (score >= 40) return "from-yellow-500 to-yellow-400";
    return "from-red-500 to-red-400";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    if (score >= 20) return "Poor";
    return "Invisible";
  };

  return (
    <div
      className={cn(
        "rounded-2xl border overflow-hidden",
        isDark ? "border-white/10 bg-white/[0.02]" : "border-neutral-200 bg-white"
      )}
    >
      {/* Score header */}
      <div className="px-6 py-6 text-center">
        <div
          className={cn(
            "text-xs uppercase tracking-wider mb-3",
            isDark ? "text-white/40" : "text-neutral-500"
          )}
        >
          AI Visibility Score
        </div>
        <div
          className={cn(
            "text-6xl font-bold",
            getScoreColor(summary.visibilityScore)
          )}
        >
          {summary.visibilityScore}
        </div>
        <div
          className={cn(
            "text-sm font-medium mt-1",
            getScoreColor(summary.visibilityScore)
          )}
        >
          {getScoreLabel(summary.visibilityScore)}
        </div>

        {/* Progress bar */}
        <div
          className={cn(
            "mt-4 h-3 rounded-full overflow-hidden",
            isDark ? "bg-white/10" : "bg-neutral-200"
          )}
        >
          <div
            className={cn(
              "h-full rounded-full bg-gradient-to-r transition-all duration-1000",
              getScoreBarColor(summary.visibilityScore)
            )}
            style={{ width: `${summary.visibilityScore}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div
        className={cn(
          "grid grid-cols-3 border-t divide-x",
          isDark
            ? "border-white/10 divide-white/10"
            : "border-neutral-100 divide-neutral-100"
        )}
      >
        <div className="px-4 py-4 text-center">
          <div
            className={cn(
              "text-xs uppercase tracking-wider mb-1",
              isDark ? "text-white/40" : "text-neutral-500"
            )}
          >
            Platforms
          </div>
          <div className="text-xl font-bold">
            {summary.platformsMentioned}
            <span className={isDark ? "text-white/30" : "text-neutral-400"}>
              /{summary.totalPlatforms}
            </span>
          </div>
        </div>
        <div className="px-4 py-4 text-center">
          <div
            className={cn(
              "text-xs uppercase tracking-wider mb-1",
              isDark ? "text-white/40" : "text-neutral-500"
            )}
          >
            Avg Position
          </div>
          <div className="text-xl font-bold">
            {summary.avgPosition ? `#${summary.avgPosition}` : "—"}
          </div>
        </div>
        <div className="px-4 py-4 text-center">
          <div
            className={cn(
              "text-xs uppercase tracking-wider mb-1",
              isDark ? "text-white/40" : "text-neutral-500"
            )}
          >
            Best On
          </div>
          <div className="text-lg font-bold truncate">
            {summary.bestPlatform || "—"}
          </div>
        </div>
      </div>
    </div>
  );
}
