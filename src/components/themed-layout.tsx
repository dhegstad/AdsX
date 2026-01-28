"use client";

import { cn } from "@/lib/utils";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";

interface ThemedLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function ThemedLayout({ children, className }: ThemedLayoutProps) {
  // Using Tailwind's dark: prefix for CSS-only theming
  // The .dark class on <html> is set by ThemeScript before React hydrates
  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300 bg-white text-neutral-900 dark:bg-black dark:text-white",
        className
      )}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
}

// Re-export theme hook for convenience (used by Header for toggle)
export { useTheme } from "@/context/theme-context";
