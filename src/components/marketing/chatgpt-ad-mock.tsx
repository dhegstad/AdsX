"use client";

import { MessageSquare } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";

export function ChatGptAdMock() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={cn(
      "rounded-2xl border overflow-hidden shadow-2xl",
      isDark ? "border-white/10 bg-white/[0.03]" : "border-neutral-200 bg-white"
    )}>
      {/* Phone frame */}
      <div className={cn(
        "px-4 py-3 flex items-center justify-center gap-2",
        isDark ? "bg-neutral-900" : "bg-neutral-100"
      )}>
        <div className={cn(
          "h-2 w-16 rounded-full",
          isDark ? "bg-neutral-700" : "bg-neutral-300"
        )} />
      </div>

      {/* Chat interface */}
      <div className="p-4 space-y-4">
        {/* User message */}
        <div className="flex justify-end">
          <div className="bg-emerald-600 text-white rounded-2xl rounded-br-md px-4 py-2 max-w-[80%]">
            <p className="text-sm">What are the best project management tools for remote teams?</p>
          </div>
        </div>

        {/* AI response */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
              <span className="text-emerald-500 text-sm">◎</span>
            </div>
            <div className={cn(
              "rounded-2xl rounded-tl-md px-4 py-3 text-sm",
              isDark ? "bg-white/5 text-white/80" : "bg-neutral-100 text-neutral-700"
            )}>
              <p>Here are some excellent project management tools for remote teams:</p>
              <ul className={cn(
                "mt-2 space-y-1",
                isDark ? "text-white/60" : "text-neutral-600"
              )}>
                <li>• <strong className={isDark ? "text-white/80" : "text-neutral-800"}>Asana</strong> - Great for task tracking</li>
                <li>• <strong className={isDark ? "text-white/80" : "text-neutral-800"}>Monday.com</strong> - Visual workflows</li>
                <li>• <strong className={isDark ? "text-white/80" : "text-neutral-800"}>Notion</strong> - All-in-one workspace</li>
              </ul>
            </div>
          </div>

          {/* Sponsored Ad Card */}
          <div className={cn(
            "ml-11 rounded-xl border overflow-hidden",
            isDark ? "border-emerald-500/30 bg-emerald-500/5" : "border-emerald-200 bg-emerald-50"
          )}>
            <div className={cn(
              "px-4 py-2 border-b flex items-center justify-between",
              isDark ? "border-emerald-500/20" : "border-emerald-200"
            )}>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Y</span>
                </div>
                <span className="font-medium text-sm">Your Brand</span>
              </div>
              <span className={cn(
                "text-xs font-medium",
                isDark ? "text-emerald-400/80" : "text-emerald-600"
              )}>Sponsored</span>
            </div>
            <div className="p-4">
              <p className={cn(
                "text-sm",
                isDark ? "text-white/70" : "text-neutral-600"
              )}>These options may help if you&apos;re looking for a solution built specifically for distributed teams.</p>
              <div className="mt-3 flex gap-2">
                <div className={cn(
                  "flex-1 rounded-lg border p-3",
                  isDark ? "border-white/10 bg-white/5" : "border-neutral-200 bg-white"
                )}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">TeamFlow Pro</p>
                      <p className={cn(
                        "text-xs mt-1",
                        isDark ? "text-white/50" : "text-neutral-500"
                      )}>Built for remote-first teams</p>
                    </div>
                    <div className="h-8 w-8 rounded bg-gradient-to-br from-violet-500 to-purple-600" />
                  </div>
                </div>
              </div>
              <button className={cn(
                "mt-3 w-full flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                isDark
                  ? "border-white/20 bg-white/5 hover:bg-white/10"
                  : "border-neutral-300 bg-white hover:bg-neutral-50"
              )}>
                <MessageSquare className="h-4 w-4" />
                Chat with Your Brand
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className={cn(
        "border-t p-4",
        isDark ? "border-white/10" : "border-neutral-200"
      )}>
        <div className={cn(
          "flex items-center gap-3 rounded-full border px-4 py-3",
          isDark ? "border-white/20 bg-white/5" : "border-neutral-300 bg-neutral-50"
        )}>
          <span className={cn(
            "text-sm flex-1",
            isDark ? "text-white/40" : "text-neutral-400"
          )}>Ask ChatGPT...</span>
          <div className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center",
            isDark ? "bg-white/10" : "bg-neutral-200"
          )}>
            <span className={isDark ? "text-white/60" : "text-neutral-500"}>↑</span>
          </div>
        </div>
      </div>
    </div>
  );
}
