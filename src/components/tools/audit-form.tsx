"use client";

import { useState } from "react";
import { Search, Loader2, Plus, X } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/types/visibility";

interface AuditFormProps {
  onSubmit: (data: {
    brandName: string;
    brandUrl: string;
    category: string;
    competitors: string[];
  }) => void;
  isLoading: boolean;
  /** Show lead capture fields (name, email) */
  showLeadCapture?: boolean;
  onLeadSubmit?: (data: {
    firstName: string;
    lastName: string;
    email: string;
    brandName: string;
    brandUrl: string;
    category: string;
    competitors: string[];
  }) => void;
}

export function AuditForm({
  onSubmit,
  isLoading,
  showLeadCapture = false,
  onLeadSubmit,
}: AuditFormProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [brandName, setBrandName] = useState("");
  const [brandUrl, setBrandUrl] = useState("");
  const [category, setCategory] = useState("");
  const [competitorInput, setCompetitorInput] = useState("");
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addCompetitor = () => {
    const name = competitorInput.trim();
    if (name && !competitors.includes(name) && competitors.length < 5) {
      setCompetitors([...competitors, name]);
      setCompetitorInput("");
    }
  };

  const removeCompetitor = (name: string) => {
    setCompetitors(competitors.filter((c) => c !== name));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (showLeadCapture) {
      if (!firstName.trim()) newErrors.firstName = "Required";
      if (!lastName.trim()) newErrors.lastName = "Required";
      if (!email.trim()) newErrors.email = "Required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        newErrors.email = "Invalid email";
    }

    if (!brandName.trim()) newErrors.brandName = "Required";
    if (!brandUrl.trim()) newErrors.brandUrl = "Required";
    else if (!/^https?:\/\/.+\..+/.test(brandUrl.trim()))
      newErrors.brandUrl = "Enter a valid URL (e.g., https://example.com)";
    if (!category) newErrors.category = "Required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (showLeadCapture && onLeadSubmit) {
      onLeadSubmit({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        brandName: brandName.trim(),
        brandUrl: brandUrl.trim(),
        category,
        competitors,
      });
    } else {
      onSubmit({
        brandName: brandName.trim(),
        brandUrl: brandUrl.trim(),
        category,
        competitors,
      });
    }
  };

  const inputClass = cn(
    "w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
    isDark
      ? "border-white/10 bg-white/5 text-white placeholder:text-white/30"
      : "border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-400"
  );

  const labelClass = cn(
    "block text-sm font-medium mb-1.5",
    isDark ? "text-white/70" : "text-neutral-700"
  );

  const errorClass = "text-xs text-red-500 mt-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {showLeadCapture && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setErrors((prev) => ({ ...prev, firstName: "" }));
                }}
                placeholder="Jane"
                className={inputClass}
              />
              {errors.firstName && (
                <p className={errorClass}>{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className={labelClass}>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErrors((prev) => ({ ...prev, lastName: "" }));
                }}
                placeholder="Smith"
                className={inputClass}
              />
              {errors.lastName && (
                <p className={errorClass}>{errors.lastName}</p>
              )}
            </div>
          </div>
          <div>
            <label className={labelClass}>Work Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: "" }));
              }}
              placeholder="jane@company.com"
              className={inputClass}
            />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>
          <div
            className={cn(
              "border-t my-6",
              isDark ? "border-white/10" : "border-neutral-200"
            )}
          />
        </>
      )}

      <div>
        <label className={labelClass}>Brand Name</label>
        <input
          type="text"
          value={brandName}
          onChange={(e) => {
            setBrandName(e.target.value);
            setErrors((prev) => ({ ...prev, brandName: "" }));
          }}
          placeholder="e.g., HubSpot, Stripe, Figma"
          className={inputClass}
        />
        {errors.brandName && (
          <p className={errorClass}>{errors.brandName}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Website URL</label>
        <input
          type="url"
          value={brandUrl}
          onChange={(e) => {
            setBrandUrl(e.target.value);
            setErrors((prev) => ({ ...prev, brandUrl: "" }));
          }}
          placeholder="https://example.com"
          className={inputClass}
        />
        {errors.brandUrl && (
          <p className={errorClass}>{errors.brandUrl}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Category</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setErrors((prev) => ({ ...prev, category: "" }));
          }}
          className={cn(inputClass, !category && (isDark ? "text-white/30" : "text-neutral-400"))}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <p className={errorClass}>{errors.category}</p>}
      </div>

      <div>
        <label className={labelClass}>
          Competitors{" "}
          <span className={isDark ? "text-white/30" : "text-neutral-400"}>
            (optional, up to 5)
          </span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={competitorInput}
            onChange={(e) => setCompetitorInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCompetitor();
              }
            }}
            placeholder="Add a competitor name"
            className={cn(inputClass, "flex-1")}
            disabled={competitors.length >= 5}
          />
          <button
            type="button"
            onClick={addCompetitor}
            disabled={!competitorInput.trim() || competitors.length >= 5}
            className={cn(
              "rounded-lg px-3 py-3 transition-colors",
              isDark
                ? "bg-white/10 hover:bg-white/20 disabled:opacity-30"
                : "bg-neutral-100 hover:bg-neutral-200 disabled:opacity-30"
            )}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        {competitors.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {competitors.map((comp) => (
              <span
                key={comp}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm",
                  isDark
                    ? "bg-white/10 text-white/70"
                    : "bg-neutral-100 text-neutral-700"
                )}
              >
                {comp}
                <button
                  type="button"
                  onClick={() => removeCompetitor(comp)}
                  className="hover:text-red-500 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full flex items-center justify-center gap-2 rounded-lg px-6 py-4 text-base font-medium transition-all",
          isDark
            ? "bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-50"
            : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25 disabled:opacity-50"
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Analyzing AI platforms...
          </>
        ) : (
          <>
            <Search className="h-5 w-5" />
            Run Visibility Audit
          </>
        )}
      </button>
    </form>
  );
}
