"use client";

import type { CaptureResult, Properties } from "posthog-js/dist/module.slim";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

let analyticsPromise: Promise<
  typeof import("posthog-js/dist/module.slim")["default"] | null
> | null = null;

const SITE_EVENT_NAME = "endocyclic_site_event";
const SITE_EVENT_ATTRIBUTE = "data-site-event";

export const SITE_EVENT_IDS = [
  "cta_partnership",
  "cta_investor_summary",
  "cta_data_room",
  "cta_media_kit",
  "contact_form_start",
  "contact_form_validation_failure",
  "contact_form_submission_success",
  "contact_form_submission_failure",
  "investor_form_start",
  "investor_form_validation_failure",
  "investor_form_submission_success",
  "investor_form_submission_failure",
] as const;

export type SiteEventId = (typeof SITE_EVENT_IDS)[number];

const SITE_EVENT_ID_SET = new Set<string>(SITE_EVENT_IDS);
const TRACKABLE_PATHNAMES = new Set([
  "/",
  "/contact",
  "/form-response",
  "/imaging",
  "/impact",
  "/innovation",
  "/investors",
  "/media",
  "/news",
  "/pipeline",
  "/team",
]);
const URL_PROPERTY_KEYS = new Set([
  "$current_url",
  "$external_click_url",
  "$initial_current_url",
  "$initial_referrer",
  "$referrer",
  "$session_entry_url",
]);
const ANALYTICS_IDLE_TIMEOUT_MS = 8_000;
const ANALYTICS_FALLBACK_DELAY_MS = 4_000;
const REQUIRED_TRANSPORT_PROPERTY_KEYS = new Set([
  "$device_id",
  "$geoip_disable",
  "$insert_id",
  "$lib",
  "$lib_version",
  "$process_person_profile",
  "$session_id",
  "$time",
  "$window_id",
  "distinct_id",
  "token",
]);

type PrivacyAwareNavigator = {
  doNotTrack?: string | null;
  globalPrivacyControl?: boolean;
  connection?: {
    saveData?: boolean;
  };
};

export function allowsAnalytics({
  doNotTrack,
  globalPrivacyControl,
  connection,
}: PrivacyAwareNavigator) {
  const normalizedDnt = doNotTrack?.trim().toLowerCase();
  return (
    globalPrivacyControl !== true &&
    normalizedDnt !== "1" &&
    normalizedDnt !== "yes" &&
    connection?.saveData !== true
  );
}

export function stripPrivateUrlParts(value: string) {
  try {
    const url = new URL(value, "https://relative.invalid");
    if (url.origin === "https://relative.invalid") {
      return url.pathname;
    }
    if (url.protocol === "http:" || url.protocol === "https:") {
      return `${url.origin}${url.pathname}`;
    }
  } catch {
    // Fall through to a conservative string-only strip.
  }

  return value.split(/[?#]/, 1)[0];
}

export function toAnalyticsPathname(value: string) {
  try {
    const pathname = new URL(value, "https://relative.invalid").pathname;
    return TRACKABLE_PATHNAMES.has(pathname) ? pathname : "/other";
  } catch {
    return "/other";
  }
}

function toAnalyticsCurrentUrl(value: string, pathname: string) {
  try {
    const url = new URL(value, "https://relative.invalid");
    return url.origin === "https://relative.invalid"
      ? pathname
      : `${url.origin}${pathname}`;
  } catch {
    return pathname;
  }
}

export function isSiteEventId(value: unknown): value is SiteEventId {
  return typeof value === "string" && SITE_EVENT_ID_SET.has(value);
}

function sanitizePropertyUrls(properties: Properties | undefined) {
  if (!properties) return properties;

  const sanitized = { ...properties };
  for (const key of URL_PROPERTY_KEYS) {
    const value = sanitized[key];
    if (typeof value === "string") {
      sanitized[key] = stripPrivateUrlParts(value);
    }
  }
  return sanitized;
}

function transportProperties(properties: Properties) {
  return Object.fromEntries(
    Object.entries(properties).filter(([key]) =>
      REQUIRED_TRANSPORT_PROPERTY_KEYS.has(key),
    ),
  );
}

export function sanitizePostHogEvent(event: CaptureResult | null) {
  if (!event) return null;

  if (event.event === SITE_EVENT_NAME) {
    const eventId = event.properties.event_id;
    if (!isSiteEventId(eventId)) return null;

    return {
      uuid: event.uuid,
      event: SITE_EVENT_NAME,
      properties: {
        ...transportProperties(event.properties),
        event_id: eventId,
        pathname: toAnalyticsPathname(
          typeof event.properties.pathname === "string"
            ? event.properties.pathname
            : "/other",
        ),
      },
      timestamp: event.timestamp,
    };
  }

  if (event.event !== "$pageview") return null;

  const sanitized = sanitizePropertyUrls(event.properties) ?? {};
  const pathname = toAnalyticsPathname(
    typeof sanitized.$pathname === "string"
      ? sanitized.$pathname
      : typeof sanitized.$current_url === "string"
        ? sanitized.$current_url
        : "/other",
  );
  const currentUrl =
    typeof sanitized.$current_url === "string"
      ? toAnalyticsCurrentUrl(sanitized.$current_url, pathname)
      : pathname;

  return {
    uuid: event.uuid,
    event: "$pageview",
    properties: {
      ...transportProperties(sanitized),
      $current_url: currentUrl,
      $pathname: pathname,
    },
    timestamp: event.timestamp,
  };
}

async function loadAnalytics() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return null;
  if (
    typeof navigator !== "undefined" &&
    !allowsAnalytics(navigator as PrivacyAwareNavigator)
  ) {
    return null;
  }
  if (!analyticsPromise) {
    analyticsPromise = import("posthog-js/dist/module.slim")
      .then(({ default: posthog }) => {
        if (!posthog.__loaded) {
          posthog.init(key, {
            api_host:
              process.env.NEXT_PUBLIC_POSTHOG_HOST ||
              "https://us.i.posthog.com",
            person_profiles: "identified_only",
            capture_pageview: false,
            capture_pageleave: false,
            autocapture: false,
            disable_capture_url_hashes: true,
            disable_session_recording: true,
            mask_personal_data_properties: true,
            before_send: sanitizePostHogEvent,
          });
        }
        return posthog;
      })
      .catch(() => {
        analyticsPromise = null;
        return null;
      });
  }
  return analyticsPromise;
}

/**
 * Captures one stable, allowlisted interaction id at the current static route.
 * Callers cannot attach properties, so form content and arbitrary UI text
 * cannot enter the analytics payload.
 */
export async function captureSiteEvent(eventId: SiteEventId) {
  if (
    !isSiteEventId(eventId) ||
    typeof window === "undefined" ||
    !process.env.NEXT_PUBLIC_POSTHOG_KEY ||
    !allowsAnalytics(window.navigator as PrivacyAwareNavigator)
  ) {
    return;
  }

  const pathname = toAnalyticsPathname(window.location.pathname);
  try {
    const posthog = await loadAnalytics();
    posthog?.capture(SITE_EVENT_NAME, { event_id: eventId, pathname });
  } catch {
    // Analytics must never interrupt navigation or form behavior.
  }
}

/**
 * Analytics waits until the load event and a later idle window so it cannot
 * compete with above-the-fold rendering. Later route changes capture
 * immediately once the shared client has loaded.
 */
export default function PostHogProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      !process.env.NEXT_PUBLIC_POSTHOG_KEY ||
      !allowsAnalytics(window.navigator as PrivacyAwareNavigator)
    ) {
      return;
    }

    const captureDelegatedSiteEvent = (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(`[${SITE_EVENT_ATTRIBUTE}]`)
          : null;
      const eventId = target?.getAttribute(SITE_EVENT_ATTRIBUTE);
      if (isSiteEventId(eventId)) {
        void captureSiteEvent(eventId);
      }
    };

    document.addEventListener("click", captureDelegatedSiteEvent);
    return () => {
      document.removeEventListener("click", captureDelegatedSiteEvent);
    };
  }, []);

  useEffect(() => {
    if (
      !process.env.NEXT_PUBLIC_POSTHOG_KEY ||
      !allowsAnalytics(window.navigator as PrivacyAwareNavigator)
    ) {
      return;
    }
    let cancelled = false;
    let timer: number | undefined;
    let idleCallback: number | undefined;
    let waitingForLoad = false;

    const capturePageview = async () => {
      const posthog = await loadAnalytics();
      if (!cancelled && posthog) {
        // Never forward query strings or hashes: contact routes can contain
        // routing metadata, and malformed/native submissions may contain PII.
        posthog.capture("$pageview", {
          $current_url: `${window.location.origin}${toAnalyticsPathname(pathname)}`,
          $pathname: toAnalyticsPathname(pathname),
        });
      }
    };

    const scheduleInitialCapture = () => {
      waitingForLoad = false;
      if (cancelled) return;

      if (typeof window.requestIdleCallback === "function") {
        idleCallback = window.requestIdleCallback(
          () => void capturePageview(),
          { timeout: ANALYTICS_IDLE_TIMEOUT_MS },
        );
      } else {
        timer = window.setTimeout(
          () => void capturePageview(),
          ANALYTICS_FALLBACK_DELAY_MS,
        );
      }
    };

    if (analyticsPromise) {
      void capturePageview();
    } else if (document.readyState === "complete") {
      scheduleInitialCapture();
    } else {
      waitingForLoad = true;
      window.addEventListener("load", scheduleInitialCapture, { once: true });
    }

    return () => {
      cancelled = true;
      if (waitingForLoad) {
        window.removeEventListener("load", scheduleInitialCapture);
      }
      if (timer !== undefined) window.clearTimeout(timer);
      if (idleCallback !== undefined) window.cancelIdleCallback(idleCallback);
    };
  }, [pathname]);

  return null;
}
