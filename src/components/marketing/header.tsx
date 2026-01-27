"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollProgress } from "./scroll-progress";

const navigation = [
  { name: "Services", href: "/services" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "About", href: "/about" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
];

export function Header() {
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
        "fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl transition-all duration-300",
        scrolled && "py-0 bg-black/95"
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
          <span className="text-xl font-bold tracking-tight">AdsX</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <Link
            href="/contact"
            className="rounded-lg bg-emerald-500 px-5 py-2 text-sm font-medium text-black transition-all hover:bg-emerald-400"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden"
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
          "lg:hidden",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="space-y-1 px-6 pb-6 border-t border-white/10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-3 text-base text-white/60 transition-colors hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 block rounded-lg bg-emerald-500 px-5 py-3 text-center text-sm font-medium text-black"
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
