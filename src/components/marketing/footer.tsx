"use client";

import Link from "next/link";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";

const navigation = {
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  industries: [
    { name: "SaaS", href: "/industries/saas" },
    { name: "E-commerce", href: "/industries/ecommerce" },
    { name: "Fintech", href: "/industries/fintech" },
  ],
  resources: [
    { name: "Case Studies", href: "/case-studies" },
    { name: "Compare", href: "/compare" },
    { name: "Free Audit", href: "/tools/free-audit" },
    { name: "Pricing", href: "/pricing" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={cn(
      "border-t",
      theme === "dark" ? "border-white/10 bg-black" : "border-neutral-200 bg-white"
    )}>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-500 font-bold text-sm">X</span>
              </div>
              <span className={cn(
                "text-xl font-bold tracking-tight",
                theme === "dark" ? "text-white" : "text-neutral-900"
              )}>AdsX</span>
            </Link>
            <p className={cn(
              "mt-4 text-sm",
              theme === "dark" ? "text-white/40" : "text-neutral-500"
            )}>
              Advertising for the AI search era.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className={cn(
              "text-sm font-semibold",
              theme === "dark" ? "text-white/80" : "text-neutral-700"
            )}>Company</h3>
            <ul className="mt-4 space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm transition-colors",
                      theme === "dark"
                        ? "text-white/40 hover:text-white"
                        : "text-neutral-500 hover:text-neutral-900"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className={cn(
              "text-sm font-semibold",
              theme === "dark" ? "text-white/80" : "text-neutral-700"
            )}>Industries</h3>
            <ul className="mt-4 space-y-3">
              {navigation.industries.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm transition-colors",
                      theme === "dark"
                        ? "text-white/40 hover:text-white"
                        : "text-neutral-500 hover:text-neutral-900"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className={cn(
              "text-sm font-semibold",
              theme === "dark" ? "text-white/80" : "text-neutral-700"
            )}>Resources</h3>
            <ul className="mt-4 space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm transition-colors",
                      theme === "dark"
                        ? "text-white/40 hover:text-white"
                        : "text-neutral-500 hover:text-neutral-900"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={cn(
          "mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4",
          theme === "dark" ? "border-white/10" : "border-neutral-200"
        )}>
          <p className={cn(
            "text-sm",
            theme === "dark" ? "text-white/30" : "text-neutral-400"
          )}>
            &copy; {new Date().getFullYear()} AdsX. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {navigation.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm transition-colors",
                  theme === "dark"
                    ? "text-white/30 hover:text-white"
                    : "text-neutral-400 hover:text-neutral-900"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
