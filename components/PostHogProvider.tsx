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

/** Analytics waits for browser idleness, then captures later route changes immediately. */
export default function PostHogProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    let cancelled = false;
    let timer: number | undefined;
    let idleCallback: number | undefined;

    const capturePageview = async () => {
      const posthog = await loadAnalytics();
      if (!cancelled && posthog) {
        posthog.capture("$pageview", { $current_url: window.location.href });
      }
    };

    if (analyticsPromise) {
      void capturePageview();
    } else if (typeof window.requestIdleCallback === "function") {
      idleCallback = window.requestIdleCallback(() => void capturePageview(), {
        timeout: 2500,
      });
    } else {
      timer = window.setTimeout(() => void capturePageview(), 1200);
    }

    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
      if (idleCallback !== undefined) window.cancelIdleCallback(idleCallback);
    };
  }, [pathname]);

  return null;
}
