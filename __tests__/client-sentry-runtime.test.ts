import { beforeEach, describe, expect, it, vi } from "vitest";

const sentry = vi.hoisted(() => ({
  captureException: vi.fn(),
  captureRouterTransitionStart: vi.fn(),
  getClient: vi.fn(),
  init: vi.fn(),
}));

vi.mock("@sentry/nextjs", () => sentry);

import { initializeClientSentry } from "@/lib/client-sentry-runtime";

beforeEach(() => {
  sentry.getClient.mockReset().mockReturnValue(undefined);
  sentry.init.mockReset();
});

describe("initializeClientSentry", () => {
  it("initializes a narrow monitoring runtime without Replay configuration", () => {
    const beforeSend = vi.fn((event) => event);
    const beforeBreadcrumb = vi.fn((breadcrumb) => breadcrumb);

    const runtime = initializeClientSentry({
      dsn: "https://public@example.ingest.sentry.io/1",
      beforeSend,
      beforeBreadcrumb,
    });

    expect(sentry.init).toHaveBeenCalledOnce();
    const options = sentry.init.mock.calls[0]?.[0];
    expect(options).toMatchObject({
      dsn: "https://public@example.ingest.sentry.io/1",
      tracesSampleRate: 0.1,
      debug: false,
      beforeSend,
      beforeBreadcrumb,
    });
    expect(options).not.toHaveProperty("replaysSessionSampleRate");
    expect(options).not.toHaveProperty("replaysOnErrorSampleRate");
    expect(runtime).toEqual({
      captureException: sentry.captureException,
      captureRouterTransitionStart: sentry.captureRouterTransitionStart,
    });
  });

  it("reuses an existing client without reinitializing", () => {
    sentry.getClient.mockReturnValue({});

    initializeClientSentry({
      dsn: "https://public@example.ingest.sentry.io/1",
      beforeSend: (event) => event,
      beforeBreadcrumb: (breadcrumb) => breadcrumb,
    });

    expect(sentry.init).not.toHaveBeenCalled();
  });
});
