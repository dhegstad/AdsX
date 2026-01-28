"use client";

import Link from "next/link";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={cn(
      "min-h-screen flex flex-col transition-colors duration-300",
      isDark ? "bg-black text-white" : "bg-white text-neutral-900"
    )}>
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="relative mx-auto max-w-xl px-6 py-24 text-center">
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="relative">
            <div className="text-8xl font-bold text-emerald-500 mb-4">404</div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Page not found
            </h1>
            <p className={cn(
              "mt-4 text-lg",
              isDark ? "text-white/60" : "text-neutral-600"
            )}>
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors",
                  isDark
                    ? "bg-emerald-500 text-black hover:bg-emerald-400"
                    : "bg-emerald-500 text-white hover:bg-emerald-600"
                )}
              >
                Go home
              </Link>
              <Link
                href="/blog"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 font-medium transition-colors",
                  isDark
                    ? "border-white/20 hover:bg-white/5"
                    : "border-neutral-300 hover:bg-neutral-50"
                )}
              >
                Read our blog
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
