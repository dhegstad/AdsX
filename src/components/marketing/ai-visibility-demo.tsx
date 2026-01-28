"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";

const platforms = [
  { name: "ChatGPT", icon: "◎", color: "bg-green-500" },
  { name: "Claude", icon: "◇", color: "bg-orange-500" },
  { name: "Perplexity", icon: "◈", color: "bg-blue-500" },
  { name: "Gemini", icon: "◆", color: "bg-purple-500" },
  { name: "Grok", icon: "✧", color: "bg-red-500" },
];

const initialData = [
  { platform: "ChatGPT", mentions: 247, change: 12.4, trend: "up" },
  { platform: "Claude", mentions: 189, change: 8.2, trend: "up" },
  { platform: "Perplexity", mentions: 156, change: -3.1, trend: "down" },
  { platform: "Gemini", mentions: 134, change: 5.7, trend: "up" },
  { platform: "Grok", mentions: 98, change: 15.3, trend: "up" },
];

// Generate deterministic heights for SSR compatibility
const generateBarHeights = () => Array.from({ length: 30 }, (_, i) => 20 + ((i * 7 + 13) % 60) + 20);

export function AiVisibilityDemo() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [data, setData] = useState(initialData);
  const [visibilityScore, setVisibilityScore] = useState(67.3);
  const [barHeights, setBarHeights] = useState(generateBarHeights);

  // Simulate live updates
  useEffect(() => {
    // Randomize bar heights on client only
    setBarHeights(Array.from({ length: 30 }, () => 20 + Math.random() * 80));

    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((item) => ({
          ...item,
          mentions: item.mentions + Math.floor(Math.random() * 5) - 2,
          change: Math.round((item.change + (Math.random() * 2 - 1)) * 10) / 10,
        }))
      );
      setVisibilityScore((prev) => Math.round((prev + (Math.random() * 2 - 1)) * 10) / 10);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const totalMentions = data.reduce((acc, item) => acc + item.mentions, 0);

  return (
    <div className={cn(
      "rounded-2xl border overflow-hidden",
      isDark ? "border-white/10 bg-white/[0.02]" : "border-neutral-200 bg-white shadow-lg"
    )}>
      {/* Header */}
      <div className={cn(
        "border-b px-6 py-4",
        isDark ? "border-white/10" : "border-neutral-200"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium">Live AI Visibility Dashboard</span>
          </div>
          <div className={cn("text-sm", isDark ? "text-white/50" : "text-neutral-500")}>Last 7 days</div>
        </div>
      </div>

      {/* Stats Row */}
      <div className={cn(
        "grid grid-cols-2 lg:grid-cols-5 border-b",
        isDark ? "border-white/10" : "border-neutral-200"
      )}>
        {data.map((item) => {
          const platform = platforms.find((p) => p.name === item.platform);
          return (
            <div
              key={item.platform}
              className={cn(
                "px-6 py-4 border-r last:border-r-0",
                isDark ? "border-white/10" : "border-neutral-200"
              )}
            >
              <div className={cn(
                "flex items-center gap-2 text-sm",
                isDark ? "text-white/50" : "text-neutral-500"
              )}>
                <span className={`h-2 w-2 rounded-full ${platform?.color}`} />
                {item.platform}
              </div>
              <div className="mt-2 text-2xl font-bold">{item.mentions}</div>
              <div
                className={cn(
                  "mt-1 flex items-center gap-1 text-sm",
                  item.change >= 0
                    ? (isDark ? "text-emerald-400" : "text-emerald-600")
                    : (isDark ? "text-red-400" : "text-red-600")
                )}
              >
                {item.change >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {item.change >= 0 ? "+" : ""}
                {item.change}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Area */}
      <div className="p-6">
        <div className="flex items-end justify-between h-32 gap-1">
          {barHeights.map((height, i) => (
            <div
              key={i}
              className={cn(
                "flex-1 rounded-t transition-all",
                isDark ? "bg-emerald-500/30 hover:bg-emerald-500/50" : "bg-emerald-500/40 hover:bg-emerald-500/60"
              )}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className={cn(
          "mt-4 flex items-center justify-between text-sm",
          isDark ? "text-white/40" : "text-neutral-400"
        )}>
          <span>Jan 18</span>
          <span>Jan 25</span>
        </div>
      </div>

      {/* Footer */}
      <div className={cn(
        "border-t px-6 py-4",
        isDark ? "border-white/10 bg-white/[0.02]" : "border-neutral-200 bg-neutral-50"
      )}>
        <div className="flex items-center justify-between">
          <div>
            <div className={cn("text-sm", isDark ? "text-white/50" : "text-neutral-500")}>AI Visibility Score</div>
            <div className={cn("text-3xl font-bold", isDark ? "text-emerald-400" : "text-emerald-600")}>{visibilityScore}%</div>
          </div>
          <div className="text-right">
            <div className={cn("text-sm", isDark ? "text-white/50" : "text-neutral-500")}>Total Mentions</div>
            <div className="text-2xl font-bold">{totalMentions}</div>
          </div>
        </div>
        <div className={cn(
          "mt-4 h-2 rounded-full overflow-hidden",
          isDark ? "bg-white/10" : "bg-neutral-200"
        )}>
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${visibilityScore}%` }}
          />
        </div>
      </div>
    </div>
  );
}
