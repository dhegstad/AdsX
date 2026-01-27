"use client";

import { useEffect, useState } from "react";

const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function generateRandomString(length: number): string {
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

interface Column {
  id: number;
  left: string;
  delay: number;
  duration: number;
  chars: string;
}

export function MatrixRain() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Fewer columns on mobile for performance
    const isMobile = window.innerWidth < 768;
    const columnSpacing = isMobile ? 60 : 40;
    const columnCount = Math.max(5, Math.floor(window.innerWidth / columnSpacing));

    const newColumns: Column[] = Array.from({ length: columnCount }, (_, i) => ({
      id: i,
      left: `${(i / columnCount) * 100}%`,
      delay: (i % 5) * 0.3, // Staggered start, max 1.5s delay
      duration: isMobile ? 8 + Math.random() * 4 : 5 + Math.random() * 5, // Faster: 5-10s on desktop
      chars: generateRandomString(isMobile ? 30 : 40 + Math.floor(Math.random() * 30)),
    }));
    setColumns(newColumns);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="matrix-rain">
      {columns.map((col) => (
        <span
          key={col.id}
          className="matrix-column"
          style={{
            left: col.left,
            animationDelay: `${col.delay}s`,
            animationDuration: `${col.duration}s`,
          }}
        >
          {col.chars}
        </span>
      ))}
    </div>
  );
}
