"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface V1LayoutProps {
  children: ReactNode;
}

export function V1Layout({ children }: V1LayoutProps) {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=JetBrains+Mono:wght@400;700;800&family=Space+Grotesk:wght@300;400;700&display=swap');

        .v1-page {
          --bg-color: #080808;
          --text-main: #EAEAEA;
          --text-dim: #888888;
          --border-color: #333333;
          --accent: #10b981;
          --font-display: 'Archivo Black', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
          --font-body: 'Space Grotesk', sans-serif;
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
            <header className="border-b border-[#333] h-[60px] flex justify-between items-center px-6">
              <Link href="/v1" className="text-2xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                ADSX
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                {[
                  { label: "HOME", href: "/v1" },
                  { label: "BLOG", href: "/v1/blog" },
                  { label: "ABOUT", href: "/v1/about" },
                  { label: "PRICING", href: "/v1/pricing" },
                  { label: "CONTACT", href: "/v1/contact" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-[10px] tracking-widest text-[#888] hover:text-[#EAEAEA] transition-colors"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="flex gap-3">
                <div
                  className="border border-[#EAEAEA] bg-[#EAEAEA] text-[#080808] px-2 py-1 text-[10px] font-bold"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  SYS: ONLINE
                </div>
              </div>
            </header>

            {children}

            {/* Footer */}
            <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 bg-[#050505] border-t border-[#333]">
              <div className="flex gap-6 items-center">
                <div
                  className="text-3xl"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-1px" }}
                >
                  AX
                </div>
                <div
                  className="text-[9px] text-[#888]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  &copy; {new Date().getFullYear()} ADSX
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <div
                  className="border border-[#EAEAEA] p-1.5 w-[120px] text-[8px] leading-tight text-justify"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  AI SEARCH IS THE NEW FRONTIER. YOUR COMPETITORS ARE ALREADY OPTIMIZING.
                </div>
                <div className="barcode" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
