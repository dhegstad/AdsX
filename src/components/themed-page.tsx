"use client";

import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";

interface ThemedPageProps {
  children: React.ReactNode;
  className?: string;
}

export function ThemedPage({ children, className }: ThemedPageProps) {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300",
        theme === "dark" ? "bg-black text-white" : "bg-white text-neutral-900",
        className
      )}
    >
      {children}
    </div>
  );
}

// Themed section component for consistent section styling
interface ThemedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "muted";
}

export function ThemedSection({ children, className, variant = "default" }: ThemedSectionProps) {
  const { theme } = useTheme();

  const baseClasses = "border-t";
  const variantClasses = {
    default: theme === "dark" ? "border-white/10" : "border-neutral-200",
    muted: theme === "dark" ? "border-white/10 bg-white/[0.02]" : "border-neutral-200 bg-neutral-50",
  };

  return (
    <section className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </section>
  );
}

// Themed text components
interface ThemedTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "muted";
}

export function ThemedText({ children, className, variant = "primary" }: ThemedTextProps) {
  const { theme } = useTheme();

  const variantClasses = {
    primary: theme === "dark" ? "text-white" : "text-neutral-900",
    secondary: theme === "dark" ? "text-white/70" : "text-neutral-700",
    muted: theme === "dark" ? "text-white/60" : "text-neutral-600",
  };

  return <span className={cn(variantClasses[variant], className)}>{children}</span>;
}

// Themed card component
interface ThemedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function ThemedCard({ children, className, hover = true }: ThemedCardProps) {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "rounded-xl border p-6 transition-all",
        theme === "dark"
          ? "border-white/10 bg-white/[0.02]"
          : "border-neutral-200 bg-white",
        hover && (theme === "dark"
          ? "hover:border-emerald-500/30 hover:bg-white/[0.04]"
          : "hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5"),
        className
      )}
    >
      {children}
    </div>
  );
}
