"use client";

import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";

interface SubmitResult {
  submitted: number;
  succeeded: number;
  failed: number;
}

interface Props {
  selectedCount: number;
  onSubmit: () => void;
  isSubmitting: boolean;
  result: SubmitResult | null;
}

export function SubmitPanel({
  selectedCount,
  onSubmit,
  isSubmitting,
  result,
}: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (selectedCount === 0 && !result) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t px-6 py-4",
        isDark
          ? "border-white/10 bg-black/95 backdrop-blur"
          : "border-neutral-200 bg-white/95 backdrop-blur shadow-lg"
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <div>
          {result ? (
            <div className="flex items-center gap-4">
              <span
                className={cn(
                  "text-sm font-medium",
                  isDark ? "text-white/70" : "text-neutral-600"
                )}
              >
                Submitted: {result.submitted}
              </span>
              <span className={cn("text-sm font-medium", isDark ? "text-emerald-400" : "text-emerald-600")}>
                Succeeded: {result.succeeded}
              </span>
              {result.failed > 0 && (
                <span className={cn("text-sm font-medium", isDark ? "text-red-400" : "text-red-600")}>
                  Failed: {result.failed}
                </span>
              )}
            </div>
          ) : (
            <span
              className={cn(
                "text-sm font-medium",
                isDark ? "text-white/70" : "text-neutral-600"
              )}
            >
              {selectedCount} URL{selectedCount !== 1 ? "s" : ""} selected
            </span>
          )}
        </div>
        {!result && (
          <button
            onClick={onSubmit}
            disabled={isSubmitting || selectedCount === 0}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-all disabled:opacity-50",
              isDark
                ? "bg-emerald-500 text-black hover:bg-emerald-400"
                : "bg-emerald-500 text-white hover:bg-emerald-600"
            )}
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Submitting...
              </>
            ) : (
              "Submit for Indexing"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
