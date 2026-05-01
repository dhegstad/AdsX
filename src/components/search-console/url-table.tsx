"use client";

import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";
import type { UrlStatus, CoverageState } from "@/types/search-console";

interface Props {
  urls: UrlStatus[];
  selectedUrls: Set<string>;
  onToggleUrl: (url: string) => void;
  onSelectAllUnindexed: () => void;
  onClearSelection: () => void;
}

function verdictBadge(verdict: CoverageState | undefined, isDark: boolean) {
  if (!verdict)
    return (
      <span
        className={cn(
          "text-xs px-2 py-0.5 rounded-full",
          isDark ? "bg-white/10 text-white/40" : "bg-neutral-100 text-neutral-400"
        )}
      >
        Unknown
      </span>
    );

  const styles: Record<string, string> = {
    PASS: isDark
      ? "bg-emerald-500/20 text-emerald-400"
      : "bg-emerald-100 text-emerald-700",
    PARTIAL: isDark
      ? "bg-amber-500/20 text-amber-400"
      : "bg-amber-100 text-amber-700",
    NEUTRAL: isDark
      ? "bg-amber-500/20 text-amber-400"
      : "bg-amber-100 text-amber-700",
    FAIL: isDark
      ? "bg-red-500/20 text-red-400"
      : "bg-red-100 text-red-700",
    VERDICT_UNSPECIFIED: isDark
      ? "bg-white/10 text-white/40"
      : "bg-neutral-100 text-neutral-400",
  };

  const labels: Record<string, string> = {
    PASS: "Indexed",
    PARTIAL: "Partial",
    NEUTRAL: "Not Indexed",
    FAIL: "Error",
    VERDICT_UNSPECIFIED: "Unknown",
  };

  return (
    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", styles[verdict])}>
      {labels[verdict] || verdict}
    </span>
  );
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function shortenUrl(url: string) {
  try {
    const u = new URL(url);
    return u.pathname === "/" ? "/" : u.pathname;
  } catch {
    return url;
  }
}

export function UrlTable({
  urls,
  selectedUrls,
  onToggleUrl,
  onSelectAllUnindexed,
  onClearSelection,
}: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const unindexedCount = urls.filter(
    (u) => u.verdict && u.verdict !== "PASS"
  ).length;

  return (
    <div
      className={cn(
        "rounded-xl border overflow-hidden",
        isDark ? "border-white/10" : "border-neutral-200"
      )}
    >
      {/* Table Header Actions */}
      <div
        className={cn(
          "flex items-center justify-between px-4 py-3 border-b",
          isDark ? "border-white/10 bg-white/[0.02]" : "border-neutral-200 bg-neutral-50"
        )}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "text-sm font-medium",
              isDark ? "text-white/70" : "text-neutral-600"
            )}
          >
            {selectedUrls.size > 0
              ? `${selectedUrls.size} selected`
              : `${urls.length} URLs`}
          </span>
          {unindexedCount > 0 && (
            <button
              onClick={onSelectAllUnindexed}
              className={cn(
                "text-xs font-medium transition-colors",
                isDark
                  ? "text-emerald-400 hover:text-emerald-300"
                  : "text-emerald-600 hover:text-emerald-700"
              )}
            >
              Select all unindexed ({unindexedCount})
            </button>
          )}
          {selectedUrls.size > 0 && (
            <button
              onClick={onClearSelection}
              className={cn(
                "text-xs font-medium transition-colors",
                isDark ? "text-white/40 hover:text-white/60" : "text-neutral-400 hover:text-neutral-600"
              )}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr
              className={cn(
                "border-b",
                isDark ? "border-white/10" : "border-neutral-200"
              )}
            >
              <th className="w-10 px-4 py-2" />
              <th
                className={cn(
                  "text-left px-4 py-2 font-medium",
                  isDark ? "text-white/50" : "text-neutral-500"
                )}
              >
                URL
              </th>
              <th
                className={cn(
                  "text-left px-4 py-2 font-medium",
                  isDark ? "text-white/50" : "text-neutral-500"
                )}
              >
                Status
              </th>
              <th
                className={cn(
                  "text-left px-4 py-2 font-medium",
                  isDark ? "text-white/50" : "text-neutral-500"
                )}
              >
                Last Crawl
              </th>
              <th
                className={cn(
                  "text-right px-4 py-2 font-medium",
                  isDark ? "text-white/50" : "text-neutral-500"
                )}
              >
                Clicks
              </th>
              <th
                className={cn(
                  "text-right px-4 py-2 font-medium",
                  isDark ? "text-white/50" : "text-neutral-500"
                )}
              >
                Impressions
              </th>
              <th
                className={cn(
                  "text-right px-4 py-2 font-medium",
                  isDark ? "text-white/50" : "text-neutral-500"
                )}
              >
                Position
              </th>
            </tr>
          </thead>
          <tbody>
            {urls.map((urlStatus) => (
              <tr
                key={urlStatus.url}
                className={cn(
                  "border-b transition-colors",
                  isDark
                    ? "border-white/5 hover:bg-white/[0.02]"
                    : "border-neutral-100 hover:bg-neutral-50",
                  selectedUrls.has(urlStatus.url) &&
                    (isDark ? "bg-emerald-500/5" : "bg-emerald-50/50")
                )}
              >
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedUrls.has(urlStatus.url)}
                    onChange={() => onToggleUrl(urlStatus.url)}
                    className="rounded"
                  />
                </td>
                <td
                  className={cn(
                    "px-4 py-2 font-mono text-xs max-w-[300px] truncate",
                    isDark ? "text-white/80" : "text-neutral-700"
                  )}
                  title={urlStatus.url}
                >
                  {shortenUrl(urlStatus.url)}
                </td>
                <td className="px-4 py-2">
                  {verdictBadge(urlStatus.verdict, isDark)}
                </td>
                <td
                  className={cn(
                    "px-4 py-2 text-xs",
                    isDark ? "text-white/40" : "text-neutral-500"
                  )}
                >
                  {formatDate(urlStatus.lastCrawlTime)}
                </td>
                <td
                  className={cn(
                    "px-4 py-2 text-right tabular-nums",
                    isDark ? "text-white/70" : "text-neutral-700"
                  )}
                >
                  {urlStatus.clicks ?? "-"}
                </td>
                <td
                  className={cn(
                    "px-4 py-2 text-right tabular-nums",
                    isDark ? "text-white/70" : "text-neutral-700"
                  )}
                >
                  {urlStatus.impressions ?? "-"}
                </td>
                <td
                  className={cn(
                    "px-4 py-2 text-right tabular-nums",
                    isDark ? "text-white/70" : "text-neutral-700"
                  )}
                >
                  {urlStatus.position != null
                    ? urlStatus.position.toFixed(1)
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
