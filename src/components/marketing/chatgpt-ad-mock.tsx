"use client";

import { MessageSquare } from "lucide-react";

export function ChatGptAdMock() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden shadow-2xl">
      {/* Phone frame */}
      <div className="bg-neutral-900 px-4 py-3 flex items-center justify-center gap-2">
        <div className="h-2 w-16 bg-neutral-700 rounded-full" />
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
            <div className="bg-white/5 rounded-2xl rounded-tl-md px-4 py-3 text-sm text-white/80">
              <p>Here are some excellent project management tools for remote teams:</p>
              <ul className="mt-2 space-y-1 text-white/60">
                <li>• <strong className="text-white/80">Asana</strong> - Great for task tracking</li>
                <li>• <strong className="text-white/80">Monday.com</strong> - Visual workflows</li>
                <li>• <strong className="text-white/80">Notion</strong> - All-in-one workspace</li>
              </ul>
            </div>
          </div>

          {/* Sponsored Ad Card */}
          <div className="ml-11 rounded-xl border border-emerald-500/30 bg-emerald-500/5 overflow-hidden">
            <div className="px-4 py-2 border-b border-emerald-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Y</span>
                </div>
                <span className="font-medium text-sm">Your Brand</span>
              </div>
              <span className="text-xs text-emerald-400/80 font-medium">Sponsored</span>
            </div>
            <div className="p-4">
              <p className="text-sm text-white/70">These options may help if you&apos;re looking for a solution built specifically for distributed teams.</p>
              <div className="mt-3 flex gap-2">
                <div className="flex-1 rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">TeamFlow Pro</p>
                      <p className="text-xs text-white/50 mt-1">Built for remote-first teams</p>
                    </div>
                    <div className="h-8 w-8 rounded bg-gradient-to-br from-violet-500 to-purple-600" />
                  </div>
                </div>
              </div>
              <button className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors">
                <MessageSquare className="h-4 w-4" />
                Chat with Your Brand
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-3">
          <span className="text-white/40 text-sm flex-1">Ask ChatGPT...</span>
          <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-white/60">↑</span>
          </div>
        </div>
      </div>
    </div>
  );
}
