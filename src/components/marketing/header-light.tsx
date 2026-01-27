"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Services", href: "/services" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "About", href: "/about" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
];

export function HeaderLight() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        "fixed top-0 left-0 right-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-xl transition-all duration-300",
        scrolled && "bg-white/95 shadow-sm"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 transition-all duration-300",
          scrolled ? "py-3" : "py-4"
        )}
      >
        {/* Logo */}
        <Link href="/light" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <span className="text-emerald-600 font-bold text-sm">X</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-neutral-900">AdsX</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <Link
            href="/contact"
            className="rounded-lg bg-emerald-500 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-emerald-600"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden text-neutral-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden bg-white",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="space-y-1 px-6 pb-6 border-t border-neutral-200">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-3 text-base text-neutral-600 transition-colors hover:text-neutral-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 block rounded-lg bg-emerald-500 px-5 py-3 text-center text-sm font-medium text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Scroll Progress */}
      <ScrollProgressLight />
    </header>
  );
}

function ScrollProgressLight() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-100">
      <div
        className="h-full bg-emerald-500 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
