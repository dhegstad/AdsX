"use client";

import { useState } from "react";
import { ExternalLink, X } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-[73px] left-0 right-0 z-40 border-b border-emerald-500/20 bg-emerald-500/10 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-2 lg:px-8">
        <div className="flex items-center justify-center">
          <a
            href="https://openai.com/index/introducing-ads-in-chatgpt/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span className="font-medium">Breaking:</span>
            <span className="text-white/80">OpenAI announces advertising in ChatGPT</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 lg:right-8 p-1 text-white/40 hover:text-white/80 transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
