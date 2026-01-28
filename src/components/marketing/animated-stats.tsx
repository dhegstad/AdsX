"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";

interface Stat {
  value: string;
  label: string;
}

interface AnimatedStatsProps {
  stats: Stat[];
}

function parseValue(value: string): { prefix: string; number: number; suffix: string; decimals: number } {
  const match = value.match(/^([^\d]*)(\d+\.?\d*)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: "", decimals: 0 };

  const numStr = match[2];
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

  return {
    prefix: match[1],
    number: parseFloat(numStr),
    suffix: match[3],
    decimals,
  };
}

function AnimatedNumber({ value, isVisible }: { value: string; isVisible: boolean }) {
  const [displayValue, setDisplayValue] = useState("0");
  const { prefix, number, suffix, decimals } = parseValue(value);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = number * easeOut;

      setDisplayValue(currentValue.toFixed(decimals));

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayValue(number.toFixed(decimals));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, number, decimals]);

  return (
    <span>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

export function AnimatedStats({ stats }: AnimatedStatsProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-8 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className={cn(
            "text-4xl font-bold lg:text-5xl",
            isDark ? "text-emerald-400" : "text-emerald-600"
          )}>
            <AnimatedNumber value={stat.value} isVisible={isVisible} />
          </div>
          <div className={cn(
            "mt-2 text-sm",
            isDark ? "text-white/50" : "text-neutral-600"
          )}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
