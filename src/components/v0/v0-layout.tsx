"use client";

import { cn } from "@/lib/utils";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";

interface V0LayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * V0 Layout - Original design backup
 * This is the previous site design, preserved for potential rollback.
 */
export function V0Layout({ children, className }: V0LayoutProps) {
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

export { useTheme } from "@/context/theme-context";
