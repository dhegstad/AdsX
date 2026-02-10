"use client";

import { useEffect, useState } from "react";
import { throttleRAF } from "@/lib/utils/throttle";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = throttleRAF(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    });

    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
      <div
        className="h-full bg-emerald-500 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
