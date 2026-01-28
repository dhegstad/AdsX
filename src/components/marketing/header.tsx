"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollProgress } from "./scroll-progress";
import { useTheme } from "@/context/theme-context";

const navigation = [
  { name: "Services", href: "/services" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "About", href: "/about" },
  { name: "Pricing", href: "/pricing" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
        theme === "dark"
          ? "border-white/10 bg-black/80 backdrop-blur-xl"
          : "border-neutral-200 bg-white/80 backdrop-blur-xl",
        scrolled && (theme === "dark" ? "bg-black/95" : "bg-white/95")
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 transition-all duration-300",
          scrolled ? "py-3" : "py-4"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <span className="text-emerald-500 font-bold text-sm">X</span>
          </div>
          <span className={cn(
            "text-xl font-bold tracking-tight",
            theme === "dark" ? "text-white" : "text-neutral-900"
          )}>AdsX</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm transition-colors",
                theme === "dark"
                  ? "text-white/60 hover:text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA + Theme Toggle */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-lg transition-colors",
              theme === "dark"
                ? "bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
                : "bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900"
            )}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <Link
            href="/contact"
            className={cn(
              "rounded-lg px-5 py-2 text-sm font-medium transition-all",
              theme === "dark"
                ? "bg-emerald-500 text-black hover:bg-emerald-400"
                : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25"
            )}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile: Theme Toggle + Menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-lg transition-colors",
              theme === "dark"
                ? "bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
                : "bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900"
            )}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "p-2",
              theme === "dark" ? "text-white" : "text-neutral-900"
            )}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className={cn(
          "space-y-1 px-6 pb-6 border-t",
          theme === "dark" ? "border-white/10" : "border-neutral-200"
        )}>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "block py-3 text-base transition-colors",
                theme === "dark"
                  ? "text-white/60 hover:text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className={cn(
              "mt-4 block rounded-lg px-5 py-3 text-center text-sm font-medium",
              theme === "dark"
                ? "bg-emerald-500 text-black"
                : "bg-emerald-500 text-white"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}
