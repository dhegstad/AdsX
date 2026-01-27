import Link from "next/link";

const navigation = {
  services: [
    { name: "AI Search Strategy", href: "/services" },
    { name: "ChatGPT Ads", href: "/services" },
    { name: "Content Optimization", href: "/services" },
    { name: "Visibility Tracking", href: "/services" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "API", href: "/api" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
};

export function FooterLight() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/light" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-600 font-bold text-sm">X</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-neutral-900">AdsX</span>
            </Link>
            <p className="text-sm text-neutral-600 max-w-xs">
              The agency for running ads in AI search results. Get your brand recommended by ChatGPT, Perplexity, Claude, and more.
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">Services</h3>
                <ul className="mt-4 space-y-3">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-neutral-900">Company</h3>
                <ul className="mt-4 space-y-3">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">Resources</h3>
                <ul className="mt-4 space-y-3">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-neutral-900">Legal</h3>
                <ul className="mt-4 space-y-3">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-neutral-200 pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} AdsX. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Switch to Dark Mode
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
