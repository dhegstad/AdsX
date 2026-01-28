"use client";

import { useState } from "react";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  message?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  budget: string;
  message: string;
}

export default function ContactPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setStatusMessage(data.message || "Thank you! We'll be in touch soon.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          budget: "",
          message: "",
        });
      } else {
        setStatus("error");
        if (data.errors) {
          setErrors(data.errors);
        }
        setStatusMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Unable to submit. Please try again later.");
    }
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDark ? "bg-black text-white" : "bg-white text-neutral-900"
    )}>
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s talk <span className="gradient-text">AI search</span>
            </h1>
            <p className={cn(
              "mt-6 text-lg sm:text-xl",
              isDark ? "text-white/60" : "text-neutral-600"
            )}>
              Book a strategy call or send us a message. We typically respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className={cn(
        "border-t py-24",
        isDark ? "border-white/10" : "border-neutral-200"
      )}>
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          {status === "success" ? (
            <div className={cn(
              "rounded-xl border p-8 text-center",
              isDark
                ? "border-emerald-500/20 bg-emerald-500/10"
                : "border-emerald-200 bg-emerald-50"
            )}>
              <CheckCircle className="mx-auto h-12 w-12 text-emerald-500" />
              <h2 className="mt-4 text-2xl font-bold">Message sent!</h2>
              <p className={cn(
                "mt-2",
                isDark ? "text-white/60" : "text-neutral-600"
              )}>{statusMessage}</p>
              <button
                onClick={() => setStatus("idle")}
                className={cn(
                  "mt-6 rounded-lg border px-6 py-2 text-sm font-medium transition-colors",
                  isDark
                    ? "border-white/20 hover:bg-white/5"
                    : "border-neutral-300 hover:bg-neutral-50"
                )}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {status === "error" && statusMessage && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-400">{statusMessage}</p>
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className={cn(
                    "block text-sm font-medium",
                    isDark ? "text-white/80" : "text-neutral-700"
                  )}>
                    First name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={cn(
                      "mt-2 block w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-0",
                      errors.firstName ? "border-red-500/50" : (isDark ? "border-white/10" : "border-neutral-300"),
                      isDark
                        ? "bg-white/5 text-white placeholder:text-white/30 focus:border-emerald-500/50"
                        : "bg-white text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500"
                    )}
                    placeholder="Jane"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className={cn(
                    "block text-sm font-medium",
                    isDark ? "text-white/80" : "text-neutral-700"
                  )}>
                    Last name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={cn(
                      "mt-2 block w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-0",
                      errors.lastName ? "border-red-500/50" : (isDark ? "border-white/10" : "border-neutral-300"),
                      isDark
                        ? "bg-white/5 text-white placeholder:text-white/30 focus:border-emerald-500/50"
                        : "bg-white text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500"
                    )}
                    placeholder="Smith"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="email" className={cn(
                  "block text-sm font-medium",
                  isDark ? "text-white/80" : "text-neutral-700"
                )}>
                  Work email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={cn(
                    "mt-2 block w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-0",
                    errors.email ? "border-red-500/50" : (isDark ? "border-white/10" : "border-neutral-300"),
                    isDark
                      ? "bg-white/5 text-white placeholder:text-white/30 focus:border-emerald-500/50"
                      : "bg-white text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500"
                  )}
                  placeholder="jane@company.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="company" className={cn(
                  "block text-sm font-medium",
                  isDark ? "text-white/80" : "text-neutral-700"
                )}>
                  Company <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={cn(
                    "mt-2 block w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-0",
                    errors.company ? "border-red-500/50" : (isDark ? "border-white/10" : "border-neutral-300"),
                    isDark
                      ? "bg-white/5 text-white placeholder:text-white/30 focus:border-emerald-500/50"
                      : "bg-white text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500"
                  )}
                  placeholder="Acme Inc"
                />
                {errors.company && <p className="mt-1 text-sm text-red-400">{errors.company}</p>}
              </div>
              <div>
                <label htmlFor="budget" className={cn(
                  "block text-sm font-medium",
                  isDark ? "text-white/80" : "text-neutral-700"
                )}>
                  Monthly budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={cn(
                    "mt-2 block w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-0",
                    isDark
                      ? "border-white/10 bg-white/5 text-white focus:border-emerald-500/50"
                      : "border-neutral-300 bg-white text-neutral-900 focus:border-emerald-500"
                  )}
                >
                  <option value="" className={isDark ? "bg-black" : "bg-white"}>
                    Select a range
                  </option>
                  <option value="5k-10k" className={isDark ? "bg-black" : "bg-white"}>
                    $5,000 - $10,000
                  </option>
                  <option value="10k-25k" className={isDark ? "bg-black" : "bg-white"}>
                    $10,000 - $25,000
                  </option>
                  <option value="25k+" className={isDark ? "bg-black" : "bg-white"}>
                    $25,000+
                  </option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className={cn(
                  "block text-sm font-medium",
                  isDark ? "text-white/80" : "text-neutral-700"
                )}>
                  How can we help? <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={cn(
                    "mt-2 block w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-0",
                    errors.message ? "border-red-500/50" : (isDark ? "border-white/10" : "border-neutral-300"),
                    isDark
                      ? "bg-white/5 text-white placeholder:text-white/30 focus:border-emerald-500/50"
                      : "bg-white text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500"
                  )}
                  placeholder="Tell us about your goals..."
                />
                {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className={cn(
                  "w-full rounded-lg py-4 text-base font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                  isDark
                    ? "bg-emerald-500 text-black hover:bg-emerald-400"
                    : "bg-emerald-500 text-white hover:bg-emerald-600"
                )}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}

          <div className="mt-12 text-center">
            <p className={isDark ? "text-white/50" : "text-neutral-500"}>
              Prefer to book directly?{" "}
              <a href="#" className={cn(
                "transition-colors",
                isDark ? "text-emerald-400 hover:text-emerald-300" : "text-emerald-600 hover:text-emerald-700"
              )}>
                Schedule a call
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
