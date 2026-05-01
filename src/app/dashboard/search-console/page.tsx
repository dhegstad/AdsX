"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, LogOut, RefreshCw } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";
import { Header } from "@/components/marketing/header";
import { authClient } from "@/lib/auth-client";
import { ConnectGoogle } from "@/components/search-console/connect-google";
import { IndexCoverageStatsCards } from "@/components/search-console/index-coverage-stats";
import { UrlTable } from "@/components/search-console/url-table";
import { SubmitPanel } from "@/components/search-console/submit-panel";
import type { UrlStatus, IndexCoverageStats } from "@/types/search-console";

interface StatusResponse {
  stats: IndexCoverageStats;
  urls: UrlStatus[];
  total: number;
  offset: number;
  limit: number;
}

interface SubmitResult {
  submitted: number;
  succeeded: number;
  failed: number;
}

export default function SearchConsolePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const session = authClient.useSession();

  const [googleLinked, setGoogleLinked] = useState<boolean | null>(null);
  const [stats, setStats] = useState<IndexCoverageStats | null>(null);
  const [urls, setUrls] = useState<UrlStatus[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedUrls, setSelectedUrls] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkGoogleLinked = useCallback(async () => {
    try {
      const res = await fetch("/api/search-console/analytics?days=1");
      if (res.status === 401) {
        const data = await res.json();
        if (data.error?.includes("No Google account")) {
          setGoogleLinked(false);
          return;
        }
      }
      setGoogleLinked(true);
    } catch {
      setGoogleLinked(false);
    }
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/search-console/status?limit=50&offset=0`);
      if (!res.ok) {
        const data = await res.json();
        if (res.status === 401 && data.error?.includes("No Google account")) {
          setGoogleLinked(false);
          setLoading(false);
          return;
        }
        throw new Error(data.error || "Failed to load data");
      }
      const data: StatusResponse = await res.json();
      setStats(data.stats);
      setUrls(data.urls);
      setTotal(data.total);
      setOffset(data.offset + data.limit);
      setGoogleLinked(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const res = await fetch(
        `/api/search-console/status?limit=50&offset=${offset}`
      );
      if (!res.ok) throw new Error("Failed to load more");
      const data: StatusResponse = await res.json();
      setUrls((prev) => [...prev, ...data.urls]);
      setOffset(data.offset + data.limit);

      // Update stats with new data
      if (stats) {
        setStats({
          total: data.stats.total,
          indexed: stats.indexed + data.stats.indexed,
          notIndexed: stats.notIndexed + data.stats.notIndexed,
          errors: stats.errors + data.stats.errors,
        });
      }
    } catch {
      setError("Failed to load more URLs");
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (session.data?.user) {
      checkGoogleLinked();
    }
  }, [session.data?.user, checkGoogleLinked]);

  useEffect(() => {
    if (googleLinked === true) {
      loadData();
    }
  }, [googleLinked, loadData]);

  const toggleUrl = (url: string) => {
    setSelectedUrls((prev) => {
      const next = new Set(prev);
      if (next.has(url)) {
        next.delete(url);
      } else {
        next.add(url);
      }
      return next;
    });
    setSubmitResult(null);
  };

  const selectAllUnindexed = () => {
    const unindexed = urls
      .filter((u) => u.verdict && u.verdict !== "PASS")
      .map((u) => u.url);
    setSelectedUrls(new Set(unindexed));
    setSubmitResult(null);
  };

  const clearSelection = () => {
    setSelectedUrls(new Set());
    setSubmitResult(null);
  };

  const handleSubmit = async () => {
    if (selectedUrls.size === 0) return;
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const res = await fetch("/api/search-console/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: Array.from(selectedUrls) }),
      });

      if (!res.ok) throw new Error("Submit failed");
      const data = await res.json();
      setSubmitResult({
        submitted: data.submitted,
        succeeded: data.succeeded,
        failed: data.failed,
      });
      setSelectedUrls(new Set());
    } catch {
      setError("Failed to submit URLs for indexing");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  // Not logged in
  if (!session.data?.user) {
    return (
      <div
        className={cn(
          "min-h-screen flex items-center justify-center",
          isDark ? "bg-black text-white" : "bg-white text-neutral-900"
        )}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sign in to access Search Console</h1>
          <p
            className={cn(
              "mt-2",
              isDark ? "text-white/60" : "text-neutral-600"
            )}
          >
            You need an account to view index coverage data.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link
              href="/login"
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all",
                isDark
                  ? "bg-emerald-500 text-black hover:bg-emerald-400"
                  : "bg-emerald-500 text-white hover:bg-emerald-600"
              )}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen",
        isDark ? "bg-black text-white" : "bg-white text-neutral-900"
      )}
    >
      <Header />

      {/* Header */}
      <section className="pt-28 pb-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/dashboard"
                className={cn(
                  "inline-flex items-center gap-1 text-sm mb-2 transition-colors",
                  isDark
                    ? "text-white/40 hover:text-white/60"
                    : "text-neutral-400 hover:text-neutral-600"
                )}
              >
                <ArrowLeft className="h-3 w-3" />
                Dashboard
              </Link>
              <h1 className="text-3xl font-bold">Search Console</h1>
              <p
                className={cn(
                  "mt-1",
                  isDark ? "text-white/60" : "text-neutral-600"
                )}
              >
                Index coverage and URL inspection
              </p>
            </div>
            <div className="flex items-center gap-3">
              {googleLinked && (
                <button
                  onClick={loadData}
                  disabled={loading}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                    isDark
                      ? "border-white/10 hover:bg-white/5"
                      : "border-neutral-200 hover:bg-neutral-50"
                  )}
                >
                  <RefreshCw
                    className={cn("h-4 w-4", loading && "animate-spin")}
                  />
                  Refresh
                </button>
              )}
              <button
                onClick={handleSignOut}
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                  isDark
                    ? "border-white/10 hover:bg-white/5"
                    : "border-neutral-200 hover:bg-neutral-50"
                )}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-6">
          {/* Google not linked */}
          {googleLinked === false && <ConnectGoogle />}

          {/* Loading */}
          {googleLinked === true && loading && urls.length === 0 && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent mx-auto mb-4" />
                <p
                  className={cn(
                    "text-sm",
                    isDark ? "text-white/60" : "text-neutral-600"
                  )}
                >
                  Inspecting URLs... This may take a moment.
                </p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              className={cn(
                "rounded-lg border p-4 text-sm",
                isDark
                  ? "border-red-500/30 bg-red-500/10 text-red-400"
                  : "border-red-200 bg-red-50 text-red-600"
              )}
            >
              {error}
            </div>
          )}

          {/* Quota warning */}
          {googleLinked === true && total > 0 && (
            <div
              className={cn(
                "rounded-lg border p-3 text-xs",
                isDark
                  ? "border-amber-500/20 bg-amber-500/5 text-amber-400/80"
                  : "border-amber-200 bg-amber-50 text-amber-700"
              )}
            >
              API Limits: URL Inspection = 2,000/day (600/min). Indexing API =
              200 submissions/day. Total site URLs: {total}.
            </div>
          )}

          {/* Stats */}
          {stats && <IndexCoverageStatsCards stats={stats} />}

          {/* URL Table */}
          {urls.length > 0 && (
            <>
              <UrlTable
                urls={urls}
                selectedUrls={selectedUrls}
                onToggleUrl={toggleUrl}
                onSelectAllUnindexed={selectAllUnindexed}
                onClearSelection={clearSelection}
              />

              {/* Load More */}
              {offset < total && (
                <div className="text-center">
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-lg border px-6 py-2.5 text-sm font-medium transition-all",
                      isDark
                        ? "border-white/10 hover:bg-white/5"
                        : "border-neutral-200 hover:bg-neutral-50"
                    )}
                  >
                    {loadingMore ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Loading...
                      </>
                    ) : (
                      `Load More (${urls.length} of ${total})`
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Submit Panel */}
      <SubmitPanel
        selectedCount={selectedUrls.size}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        result={submitResult}
      />
    </div>
  );
}
