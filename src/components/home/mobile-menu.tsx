"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "BLOG", href: "/blog" },
  { label: "ABOUT", href: "/about" },
  { label: "PRICING", href: "/pricing" },
  { label: "CONTACT", href: "/contact" },
];

export function MobileMenuButton() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 border border-[#333] hover:border-[#EAEAEA] transition-colors"
        aria-label="Toggle menu"
      >
        <span className={`w-5 h-0.5 bg-[#EAEAEA] transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-5 h-0.5 bg-[#EAEAEA] transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
        <span className={`w-5 h-0.5 bg-[#EAEAEA] transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <nav className="absolute top-[60px] left-0 right-0 z-50 border-b border-[#333] bg-[#0a0a0a]">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-6 py-4 text-sm tracking-widest text-[#888] hover:text-[#EAEAEA] hover:bg-[#111] transition-colors border-b border-[#222] last:border-b-0"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block mx-6 my-4 text-center py-3 bg-[#10b981] text-black text-sm font-bold tracking-widest"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            GET STARTED
          </Link>
        </nav>
      )}
    </>
  );
}
