"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

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

const generateBarHeights = () => Array.from({ length: 30 }, (_, i) => 20 + ((i * 7 + 13) % 60) + 20);

export function AiVisibilityDemoLight() {
  const [data, setData] = useState(initialData);
  const [visibilityScore, setVisibilityScore] = useState(67.3);
  const [barHeights, setBarHeights] = useState(generateBarHeights);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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

  if (!isMounted) return null;

  const totalMentions = data.reduce((acc, item) => acc + item.mentions, 0);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-xl">
      {/* Header */}
      <div className="border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-neutral-900">Live AI Visibility Dashboard</span>
          </div>
          <div className="text-sm text-neutral-500">Last 7 days</div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 border-b border-neutral-200">
        {data.map((item) => {
          const platform = platforms.find((p) => p.name === item.platform);
          return (
            <div
              key={item.platform}
              className="px-6 py-4 border-r border-neutral-200 last:border-r-0"
            >
              <div className="flex items-center gap-2 text-neutral-500 text-sm">
                <span className={`h-2 w-2 rounded-full ${platform?.color}`} />
                {item.platform}
              </div>
              <div className="mt-2 text-2xl font-bold text-neutral-900">{item.mentions}</div>
              <div
                className={`mt-1 flex items-center gap-1 text-sm ${
                  item.change >= 0 ? "text-emerald-600" : "text-red-500"
                }`}
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
              className="flex-1 bg-emerald-500/30 rounded-t transition-all hover:bg-emerald-500/50"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-neutral-400">
          <span>Jan 18</span>
          <span>Jan 25</span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-200 px-6 py-4 bg-neutral-50">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-neutral-500">AI Visibility Score</div>
            <div className="text-3xl font-bold text-emerald-600">{visibilityScore}%</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-neutral-500">Total Mentions</div>
            <div className="text-2xl font-bold text-neutral-900">{totalMentions}</div>
          </div>
        </div>
        <div className="mt-4 h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${visibilityScore}%` }}
          />
        </div>
      </div>
    </div>
  );
}
