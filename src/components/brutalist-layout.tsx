"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";

interface BrutalistLayoutProps {
  children: ReactNode;
}

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "BLOG", href: "/blog" },
  { label: "ABOUT", href: "/about" },
  { label: "PRICING", href: "/pricing" },
  { label: "CONTACT", href: "/contact" },
];

const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ],
  resources: [
    { label: "Free Audit", href: "/tools/free-audit" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Services", href: "/services" },
  ],
  industries: [
    { label: "SaaS", href: "/industries/saas" },
    { label: "E-commerce", href: "/industries/ecommerce" },
    { label: "Fintech", href: "/industries/fintech" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function BrutalistLayout({ children }: BrutalistLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <style jsx global>{`
        .v1-page {
          --bg-color: #080808;
          --text-main: #EAEAEA;
          --text-dim: #888888;
          --border-color: #333333;
          --accent: #10b981;
          --font-display: var(--font-display), 'Archivo Black', sans-serif;
          --font-mono: var(--font-mono-brutal), 'JetBrains Mono', monospace;
          --font-body: var(--font-body-brutal), 'Space Grotesk', sans-serif;
        }

        .v1-page * {
          cursor: crosshair;
        }

        .v1-page a, .v1-page button, .v1-page input, .v1-page textarea, .v1-page select {
          cursor: pointer;
        }

        .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.06;
          background: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
        }

        .cta-btn {
          background: transparent;
          color: var(--text-main);
          border: 1px solid var(--text-main);
          padding: 12px 32px;
          font-family: var(--font-mono);
          font-weight: 700;
          text-transform: uppercase;
          font-size: 12px;
          transition: all 0.2s;
          display: inline-block;
          text-decoration: none;
        }

        .cta-btn:hover {
          background: var(--accent);
          color: black;
          border-color: var(--accent);
          box-shadow: 4px 4px 0px var(--accent);
          transform: translate(-2px, -2px);
        }

        .cta-btn-primary {
          background: var(--text-main);
          color: var(--bg-color);
        }

        .cta-btn-primary:hover {
          background: var(--accent);
          color: black;
          border-color: var(--accent);
        }

        .v1-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-color);
          color: var(--text-main);
          padding: 12px 16px;
          font-family: var(--font-body);
          font-size: 14px;
          width: 100%;
          transition: border-color 0.2s;
        }

        .v1-input:focus {
          outline: none;
          border-color: var(--accent);
        }

        .v1-input::placeholder {
          color: var(--text-dim);
        }

        .service-item {
          transition: background 0.15s, color 0.15s;
        }

        .service-item:hover {
          background: var(--text-main);
          color: var(--bg-color);
        }

        .service-item:hover .idx {
          color: var(--bg-color);
        }

        .service-item:hover .desc {
          color: #333;
        }

        .barcode {
          height: 40px;
          width: 80px;
          background: repeating-linear-gradient(
            90deg,
            #fff,
            #fff 2px,
            #000 2px,
            #000 4px
          );
        }
      `}</style>

      <div className="v1-page min-h-screen bg-[#080808] text-[#EAEAEA]" style={{ fontFamily: "var(--font-body)" }}>
        <div className="noise-overlay" />

        <div className="w-full min-h-screen flex flex-col max-w-[1600px] mx-auto p-3">
          <div className="border border-[#333] bg-[#0a0a0a] flex-grow flex flex-col">

            {/* Header */}
            <header className="border-b border-[#333] h-[60px] flex justify-between items-center px-4 md:px-6">
              <Link href="/" className="text-2xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                ADSX
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-[12px] tracking-widest text-[#888] hover:text-[#EAEAEA] transition-colors"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex gap-3 items-center">
                <div
                  className="hidden sm:block border border-[#EAEAEA] bg-[#EAEAEA] text-[#080808] px-2 py-1 text-[10px] font-bold"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  SYS: ONLINE
                </div>

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
              </div>
            </header>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <nav className="md:hidden border-b border-[#333] bg-[#0a0a0a]">
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

            {children}

            {/* Footer */}
            <footer className="bg-[#050505] border-t border-[#333]">
              {/* Main Footer Content */}
              <div className="p-6 md:p-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {/* Brand Column */}
                <div className="col-span-2 md:col-span-3 lg:col-span-1">
                  <Link
                    href="/"
                    className="text-2xl tracking-tight inline-block mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    ADSX
                  </Link>
                  <p className="text-sm text-[#888] mb-6">
                    AI search advertising for forward-thinking brands.
                  </p>
                  <div
                    className="border border-[#EAEAEA] p-2 w-fit text-[10px] leading-tight"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    AI SEARCH IS THE NEW FRONTIER
                  </div>
                </div>

                {/* Company Links */}
                <div>
                  <div
                    className="text-xs tracking-widest text-[#10b981] mb-4"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    COMPANY
                  </div>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-[#888] hover:text-[#EAEAEA] transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources Links */}
                <div>
                  <div
                    className="text-xs tracking-widest text-[#10b981] mb-4"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    RESOURCES
                  </div>
                  <ul className="space-y-3">
                    {footerLinks.resources.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-[#888] hover:text-[#EAEAEA] transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Industries Links */}
                <div>
                  <div
                    className="text-xs tracking-widest text-[#10b981] mb-4"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    INDUSTRIES
                  </div>
                  <ul className="space-y-3">
                    {footerLinks.industries.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-[#888] hover:text-[#EAEAEA] transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal Links */}
                <div>
                  <div
                    className="text-xs tracking-widest text-[#10b981] mb-4"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    LEGAL
                  </div>
                  <ul className="space-y-3">
                    {footerLinks.legal.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-[#888] hover:text-[#EAEAEA] transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="px-6 md:px-10 py-4 border-t border-[#222] flex flex-col sm:flex-row justify-between items-center gap-4">
                <div
                  className="text-xs text-[#888]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  &copy; {new Date().getFullYear()} ADSX. All rights reserved.
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href="https://twitter.com/adsx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#888] hover:text-[#EAEAEA] transition-colors"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    X/TWITTER
                  </a>
                  <a
                    href="https://linkedin.com/company/adsx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#888] hover:text-[#EAEAEA] transition-colors"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    LINKEDIN
                  </a>
                  <a
                    href="mailto:hello@adsx.com"
                    className="text-xs text-[#888] hover:text-[#EAEAEA] transition-colors"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    EMAIL
                  </a>
                </div>
              </div>
            </footer>

          </div>
        </div>
      </div>
    </>
  );
}
