import Link from "next/link";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="relative mx-auto max-w-xl px-6 py-24 text-center">
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="relative">
            <div className="text-8xl font-bold text-emerald-500 mb-4">404</div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Page not found
            </h1>
            <p className="mt-4 text-lg text-white/60">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-medium text-black hover:bg-emerald-400 transition-colors"
              >
                Go home
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 font-medium hover:bg-white/5 transition-colors"
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
