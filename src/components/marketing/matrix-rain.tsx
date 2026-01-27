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

  useEffect(() => {
    const columnCount = Math.floor(window.innerWidth / 40);
    const newColumns: Column[] = Array.from({ length: columnCount }, (_, i) => ({
      id: i,
      left: `${(i / columnCount) * 100}%`,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 15,
      chars: generateRandomString(40 + Math.floor(Math.random() * 30)),
    }));
    setColumns(newColumns);
  }, []);

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
