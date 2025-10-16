"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (typeof window !== "undefined" && POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST || "https://app.posthog.com",
    capture_pageview: false, // We'll manually capture pageviews
    capture_pageleave: true,
    autocapture: false, // Disable autocapture for privacy
  });
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Capture pageview on route change
    if (POSTHOG_KEY) {
      posthog.capture("$pageview");
    }
  }, []);

  if (!POSTHOG_KEY) {
    return <>{children}</>;
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

/**
 * Track custom events
 */
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (POSTHOG_KEY) {
    posthog.capture(eventName, properties);
  }
}

/**
 * Identify user for analytics
 */
export function identifyUser(
  userId: string,
  properties?: Record<string, any>
) {
  if (POSTHOG_KEY) {
    posthog.identify(userId, properties);
  }
}

/**
 * Reset user identity (on logout)
 */
export function resetUser() {
  if (POSTHOG_KEY) {
    posthog.reset();
  }
}
