"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, BarChart3 } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (result.error) {
        setError(result.error.message || "Sign up failed. Please try again.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const inputClass = cn(
    "w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
    isDark
      ? "border-white/10 bg-white/5 text-white placeholder:text-white/30"
      : "border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-400"
  );

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center px-6",
        isDark ? "bg-black text-white" : "bg-neutral-50 text-neutral-900"
      )}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <BarChart3
              className={cn(
                "h-8 w-8",
                isDark ? "text-emerald-400" : "text-emerald-600"
              )}
            />
            <span className="text-xl font-bold">AdsX</span>
          </Link>
        </div>

        <div
          className={cn(
            "rounded-2xl border p-8",
            isDark
              ? "border-white/10 bg-white/[0.02]"
              : "border-neutral-200 bg-white shadow-lg"
          )}
        >
          <h1 className="text-2xl font-bold text-center">Create your account</h1>
          <p
            className={cn(
              "mt-2 text-center text-sm",
              isDark ? "text-white/50" : "text-neutral-500"
            )}
          >
            Start tracking your AI visibility today
          </p>

          {error && (
            <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label
                className={cn(
                  "block text-sm font-medium mb-1.5",
                  isDark ? "text-white/70" : "text-neutral-700"
                )}
              >
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                className={inputClass}
              />
            </div>

            <div>
              <label
                className={cn(
                  "block text-sm font-medium mb-1.5",
                  isDark ? "text-white/70" : "text-neutral-700"
                )}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@company.com"
                className={inputClass}
              />
            </div>

            <div>
              <label
                className={cn(
                  "block text-sm font-medium mb-1.5",
                  isDark ? "text-white/70" : "text-neutral-700"
                )}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-medium transition-all mt-6",
                isDark
                  ? "bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-50"
                  : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25 disabled:opacity-50"
              )}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p
            className={cn(
              "mt-6 text-center text-sm",
              isDark ? "text-white/40" : "text-neutral-500"
            )}
          >
            Already have an account?{" "}
            <Link
              href="/login"
              className={cn(
                "font-medium transition-colors",
                isDark
                  ? "text-emerald-400 hover:text-emerald-300"
                  : "text-emerald-600 hover:text-emerald-700"
              )}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
