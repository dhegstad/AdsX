"use client";

import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";
import type { IndexCoverageStats } from "@/types/search-console";

interface Props {
  stats: IndexCoverageStats;
}

export function IndexCoverageStatsCards({ stats }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const cards = [
    {
      label: "Total URLs",
      value: stats.total,
      color: isDark ? "text-white" : "text-neutral-900",
      bg: isDark ? "bg-white/5" : "bg-neutral-50",
      barColor: isDark ? "bg-white/20" : "bg-neutral-300",
      percent: 100,
    },
    {
      label: "Indexed",
      value: stats.indexed,
      color: isDark ? "text-emerald-400" : "text-emerald-600",
      bg: isDark ? "bg-emerald-500/10" : "bg-emerald-50",
      barColor: isDark ? "bg-emerald-500" : "bg-emerald-500",
      percent: stats.total ? (stats.indexed / stats.total) * 100 : 0,
    },
    {
      label: "Not Indexed",
      value: stats.notIndexed,
      color: isDark ? "text-amber-400" : "text-amber-600",
      bg: isDark ? "bg-amber-500/10" : "bg-amber-50",
      barColor: isDark ? "bg-amber-500" : "bg-amber-500",
      percent: stats.total ? (stats.notIndexed / stats.total) * 100 : 0,
    },
    {
      label: "Errors",
      value: stats.errors,
      color: isDark ? "text-red-400" : "text-red-600",
      bg: isDark ? "bg-red-500/10" : "bg-red-50",
      barColor: isDark ? "bg-red-500" : "bg-red-500",
      percent: stats.total ? (stats.errors / stats.total) * 100 : 0,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={cn(
            "rounded-xl border p-4",
            isDark ? "border-white/10" : "border-neutral-200",
            card.bg
          )}
        >
          <p
            className={cn(
              "text-xs font-medium mb-1",
              isDark ? "text-white/50" : "text-neutral-500"
            )}
          >
            {card.label}
          </p>
          <p className={cn("text-2xl font-bold", card.color)}>{card.value}</p>
          <div
            className={cn(
              "mt-2 h-1.5 rounded-full overflow-hidden",
              isDark ? "bg-white/10" : "bg-neutral-200"
            )}
          >
            <div
              className={cn("h-full rounded-full transition-all", card.barColor)}
              style={{ width: `${Math.min(card.percent, 100)}%` }}
            />
          </div>
          <p
            className={cn(
              "text-xs mt-1",
              isDark ? "text-white/40" : "text-neutral-400"
            )}
          >
            {card.percent.toFixed(1)}%
          </p>
        </div>
      ))}
    </div>
  );
}
