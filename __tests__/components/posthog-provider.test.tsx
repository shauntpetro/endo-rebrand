import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const analytics = vi.hoisted(() => ({
  capture: vi.fn(),
  init: vi.fn(),
  pathname: "/",
}));

vi.mock("next/navigation", () => ({
  usePathname: () => analytics.pathname,
}));

vi.mock("posthog-js/dist/module.slim", () => ({
  default: {
    __loaded: false,
    capture: analytics.capture,
    init: analytics.init,
  },
}));

import PostHogProvider, {
  allowsAnalytics,
  sanitizePostHogEvent,
  toAnalyticsPathname,
} from "@/components/PostHogProvider";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
  Reflect.deleteProperty(window.navigator, "doNotTrack");
  Reflect.deleteProperty(window.navigator, "globalPrivacyControl");
});

describe("PostHogProvider", () => {
  it("reduces pathnames to the fixed public route set", () => {
    expect(toAnalyticsPathname("/contact?email=private%40example.com#form")).toBe(
      "/contact",
    );
    expect(toAnalyticsPathname("/private%40example.com")).toBe("/other");
    expect(toAnalyticsPathname("not a valid route")).toBe("/other");
  });

  it("honors browser privacy signals before loading analytics", async () => {
    expect(allowsAnalytics({ doNotTrack: "1" })).toBe(false);
    expect(allowsAnalytics({ doNotTrack: "yes" })).toBe(false);
    expect(allowsAnalytics({ globalPrivacyControl: true })).toBe(false);
    expect(allowsAnalytics({ connection: { saveData: true } })).toBe(false);
    expect(allowsAnalytics({ doNotTrack: "0" })).toBe(true);

    vi.useFakeTimers();
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", "ph_test");
    Object.defineProperty(window.navigator, "globalPrivacyControl", {
      configurable: true,
      value: true,
    });
    analytics.capture.mockReset();
    analytics.init.mockReset();

    render(<PostHogProvider />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    });

    expect(analytics.init).not.toHaveBeenCalled();
    expect(analytics.capture).not.toHaveBeenCalled();
  });

  it("contains an initialization failure and retries on the next route", async () => {
    vi.useFakeTimers();
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", "ph_test");
    window.history.replaceState(
      null,
      "",
      "/?email=private%40example.com#contact-form",
    );
    analytics.capture.mockReset();
    analytics.init.mockReset();
    analytics.pathname = "/";
    analytics.init.mockImplementationOnce(() => {
      throw new Error("analytics unavailable");
    });

    const { rerender } = render(<PostHogProvider />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(4000);
    });

    expect(analytics.init).toHaveBeenCalledTimes(1);
    expect(analytics.capture).not.toHaveBeenCalled();

    analytics.pathname = "/pipeline";
    rerender(<PostHogProvider />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(4000);
    });

    expect(analytics.init).toHaveBeenCalledTimes(2);
    const config = analytics.init.mock.calls[1]?.[1];
    expect(config).toMatchObject({
      autocapture: false,
      capture_pageleave: false,
      capture_pageview: false,
      disable_capture_url_hashes: true,
      disable_session_recording: true,
      mask_personal_data_properties: true,
    });

    const sanitizedPageview = config?.before_send?.({
      uuid: "00000000-0000-4000-8000-000000000000",
      event: "$pageview",
      properties: {
        token: "ph_test",
        distinct_id: "anonymous-device",
        $current_url:
          "https://example.com/contact?email=private%40example.com#contact-form",
        $pathname: "/contact?email=private%40example.com#contact-form",
        $referrer:
          "https://search.example/results?q=private%40example.com#result",
        email: "private@example.com",
        link_text: "Ada Lovelace",
      },
      $set_once: {
        $initial_current_url:
          "https://example.com/?email=private%40example.com",
      },
    });

    expect(sanitizedPageview).toMatchObject({
      properties: {
        token: "ph_test",
        distinct_id: "anonymous-device",
        $current_url: "https://example.com/contact",
        $pathname: "/contact",
      },
    });
    expect(sanitizedPageview?.properties).not.toHaveProperty("$referrer");
    expect(sanitizedPageview?.properties).not.toHaveProperty("email");
    expect(sanitizedPageview?.properties).not.toHaveProperty("link_text");
    expect(sanitizedPageview).not.toHaveProperty("$set_once");
    expect(JSON.stringify(sanitizedPageview)).not.toContain("private");

    const sanitizedSiteEvent = config?.before_send?.({
      uuid: "00000000-0000-4000-8000-000000000001",
      event: "endocyclic_site_event",
      properties: {
        token: "ph_test",
        distinct_id: "anonymous-device",
        event_id: "cta_partnership",
        pathname: "/contact?email=private%40example.com#contact-form",
        email: "private@example.com",
        company: "Private Company",
        message: "Confidential message",
        link_text: "Arbitrary CTA copy",
      },
    });

    expect(sanitizedSiteEvent).toMatchObject({
      event: "endocyclic_site_event",
      properties: {
        token: "ph_test",
        distinct_id: "anonymous-device",
        event_id: "cta_partnership",
        pathname: "/contact",
      },
    });
    expect(Object.keys(sanitizedSiteEvent?.properties ?? {}).sort()).toEqual(
      ["distinct_id", "event_id", "pathname", "token"].sort(),
    );
    expect(JSON.stringify(sanitizedSiteEvent)).not.toContain("private");
    expect(
      config?.before_send?.({
        uuid: "00000000-0000-4000-8000-000000000002",
        event: "endocyclic_site_event",
        properties: {
          event_id: "not_allowlisted",
          pathname: "/contact",
        },
      }),
    ).toBeNull();
    expect(
      sanitizePostHogEvent({
        uuid: "00000000-0000-4000-8000-000000000003",
        event: "$autocapture",
        properties: { $current_url: "https://example.com/" },
      }),
    ).toBeNull();

    expect(analytics.capture).toHaveBeenCalledWith("$pageview", {
      $current_url: `${window.location.origin}/pipeline`,
      $pathname: "/pipeline",
    });
    expect(JSON.stringify(analytics.capture.mock.calls)).not.toContain(
      "private",
    );
  });

  it("delegates only allowlisted CTA ids without reading link content", async () => {
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", "ph_test");
    analytics.capture.mockClear();
    analytics.pathname = "/investors";
    window.history.replaceState(
      null,
      "",
      "/investors?email=private%40example.com#data-room",
    );

    render(
      <>
        <PostHogProvider />
        <a href="/contact?email=private@example.com" data-site-event="cta_data_room">
          Private Person at Private Company
        </a>
        <button data-site-event="not_allowlisted">Do not capture</button>
      </>,
    );

    fireEvent.click(
      screen.getByRole("link", { name: "Private Person at Private Company" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Do not capture" }));

    await act(async () => {
      await Promise.resolve();
    });

    expect(analytics.capture).toHaveBeenCalledWith("endocyclic_site_event", {
      event_id: "cta_data_room",
      pathname: "/investors",
    });
    expect(
      analytics.capture.mock.calls.filter(
        ([event]) => event === "endocyclic_site_event",
      ),
    ).toHaveLength(1);
    expect(JSON.stringify(analytics.capture.mock.calls)).not.toContain(
      "Private Person",
    );
    expect(JSON.stringify(analytics.capture.mock.calls)).not.toContain(
      "private@example.com",
    );
  });
});
