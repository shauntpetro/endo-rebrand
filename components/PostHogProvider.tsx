"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

let analyticsPromise: Promise<typeof import("posthog-js")["default"]> | null = null;

async function loadAnalytics() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return null;
  if (!analyticsPromise) {
    analyticsPromise = import("posthog-js").then(({ default: posthog }) => {
      if (!posthog.__loaded) {
        posthog.init(key, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
          person_profiles: "identified_only",
          capture_pageview: false,
          capture_pageleave: true,
        });
      }
      return posthog;
    });
  }
  return analyticsPromise;
}

/** Analytics loads after the critical rendering path and remains a tiny island. */
export default function PostHogProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      const posthog = await loadAnalytics();
      if (!cancelled && posthog) {
        posthog.capture("$pageview", { $current_url: window.location.href });
      }
    }, 900);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
