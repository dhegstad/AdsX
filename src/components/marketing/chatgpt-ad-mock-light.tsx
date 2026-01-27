"use client";

import { MessageSquare } from "lucide-react";

export function ChatGptAdMockLight() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-xl">
      {/* Phone frame */}
      <div className="bg-neutral-100 px-4 py-3 flex items-center justify-center gap-2">
        <div className="h-2 w-16 bg-neutral-300 rounded-full" />
      </div>

      {/* Chat interface */}
      <div className="p-4 space-y-4">
        {/* User message */}
        <div className="flex justify-end">
          <div className="bg-emerald-500 text-white rounded-2xl rounded-br-md px-4 py-2 max-w-[80%]">
            <p className="text-sm">What are the best project management tools for remote teams?</p>
          </div>
        </div>

        {/* AI response */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
              <span className="text-emerald-600 text-sm">◎</span>
            </div>
            <div className="bg-neutral-100 rounded-2xl rounded-tl-md px-4 py-3 text-sm text-neutral-700">
              <p>Here are some excellent project management tools for remote teams:</p>
              <ul className="mt-2 space-y-1 text-neutral-600">
                <li>• <strong className="text-neutral-800">Asana</strong> - Great for task tracking</li>
                <li>• <strong className="text-neutral-800">Monday.com</strong> - Visual workflows</li>
                <li>• <strong className="text-neutral-800">Notion</strong> - All-in-one workspace</li>
              </ul>
            </div>
          </div>

          {/* Sponsored Ad Card */}
          <div className="ml-11 rounded-xl border border-emerald-500/30 bg-emerald-50 overflow-hidden">
            <div className="px-4 py-2 border-b border-emerald-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Y</span>
                </div>
                <span className="font-medium text-sm text-neutral-900">Your Brand</span>
              </div>
              <span className="text-xs text-emerald-600 font-medium">Sponsored</span>
            </div>
            <div className="p-4">
              <p className="text-sm text-neutral-600">These options may help if you&apos;re looking for a solution built specifically for distributed teams.</p>
              <div className="mt-3 flex gap-2">
                <div className="flex-1 rounded-lg border border-neutral-200 bg-white p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm text-neutral-900">TeamFlow Pro</p>
                      <p className="text-xs text-neutral-500 mt-1">Built for remote-first teams</p>
                    </div>
                    <div className="h-8 w-8 rounded bg-gradient-to-br from-violet-500 to-purple-600" />
                  </div>
                </div>
              </div>
              <button className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                <MessageSquare className="h-4 w-4" />
                Chat with Your Brand
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="border-t border-neutral-200 p-4">
        <div className="flex items-center gap-3 rounded-full border border-neutral-300 bg-neutral-50 px-4 py-3">
          <span className="text-neutral-400 text-sm flex-1">Ask ChatGPT...</span>
          <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center">
            <span className="text-neutral-500">↑</span>
          </div>
        </div>
      </div>
    </div>
  );
}
