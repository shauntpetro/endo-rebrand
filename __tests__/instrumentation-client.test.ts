import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const {
  captureException,
  captureRouterTransitionStart,
  loadClientSentry,
} = vi.hoisted(() => ({
  captureException: vi.fn(),
  captureRouterTransitionStart: vi.fn(),
  loadClientSentry: vi.fn(),
}));

vi.mock("@/lib/client-sentry", () => ({
  loadClientSentry,
  sanitizeClientUrl: (value: string) => {
    const url = new URL(value, window.location.origin);
    return `${url.origin}${url.pathname}`;
  },
}));

let idleCallback: IdleRequestCallback | null;
let originalCancelIdleCallback: typeof window.cancelIdleCallback | undefined;
let originalRequestIdleCallback: typeof window.requestIdleCallback | undefined;

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv(
    "NEXT_PUBLIC_SENTRY_DSN",
    "https://public@example.ingest.sentry.io/1",
  );

  captureException.mockReset();
  captureRouterTransitionStart.mockReset();
  loadClientSentry.mockReset().mockResolvedValue({
    captureException,
    captureRouterTransitionStart,
  });

  idleCallback = null;
  originalCancelIdleCallback = window.cancelIdleCallback;
  originalRequestIdleCallback = window.requestIdleCallback;
  window.requestIdleCallback = vi.fn((callback: IdleRequestCallback) => {
    idleCallback = callback;
    return 17;
  });
  window.cancelIdleCallback = vi.fn();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();

  if (originalRequestIdleCallback) {
    window.requestIdleCallback = originalRequestIdleCallback;
  } else {
    Reflect.deleteProperty(window, "requestIdleCallback");
  }

  if (originalCancelIdleCallback) {
    window.cancelIdleCallback = originalCancelIdleCallback;
  } else {
    Reflect.deleteProperty(window, "cancelIdleCallback");
  }
});

describe("client instrumentation", () => {
  it("keeps an unconfigured browser free of listeners and deferred work", async () => {
    vi.stubEnv("NEXT_PUBLIC_SENTRY_DSN", "");
    const addEventListener = vi.spyOn(window, "addEventListener");

    await import("@/instrumentation-client");

    expect(loadClientSentry).not.toHaveBeenCalled();
    expect(window.requestIdleCallback).not.toHaveBeenCalled();
    expect(
      addEventListener.mock.calls.some(
        ([eventName]) =>
          eventName === "error" || eventName === "unhandledrejection",
      ),
    ).toBe(false);
  });

  it("waits for browser idle before initializing monitoring", async () => {
    await import("@/instrumentation-client");

    expect(loadClientSentry).not.toHaveBeenCalled();
    expect(window.requestIdleCallback).toHaveBeenCalledWith(
      expect.any(Function),
      { timeout: 8_000 },
    );

    idleCallback?.({
      didTimeout: false,
      timeRemaining: () => 25,
    });
    await vi.waitFor(() => expect(loadClientSentry).toHaveBeenCalledOnce());

    expect(captureException).not.toHaveBeenCalled();
    expect(captureRouterTransitionStart).not.toHaveBeenCalled();
  });

  it("initializes immediately and captures the first pre-idle error once", async () => {
    const removeEventListener = vi.spyOn(window, "removeEventListener");
    await import("@/instrumentation-client");
    const firstError = new Error("pre-idle failure");

    window.dispatchEvent(
      new ErrorEvent("error", {
        error: firstError,
        message: firstError.message,
      }),
    );

    await vi.waitFor(() => {
      expect(loadClientSentry).toHaveBeenCalledOnce();
      expect(captureException).toHaveBeenCalledWith(firstError);
    });
    expect(window.cancelIdleCallback).toHaveBeenCalledWith(17);
    expect(removeEventListener).toHaveBeenCalledWith(
      "error",
      expect.any(Function),
    );
    expect(removeEventListener).toHaveBeenCalledWith(
      "unhandledrejection",
      expect.any(Function),
    );

    idleCallback?.({
      didTimeout: false,
      timeRemaining: () => 25,
    });
    await Promise.resolve();

    expect(loadClientSentry).toHaveBeenCalledOnce();
    expect(captureException).toHaveBeenCalledOnce();
  });

  it("captures an early unhandled rejection before the SDK is idle-loaded", async () => {
    await import("@/instrumentation-client");
    const rejectionReason = new Error("rejected before idle");
    const rejectionEvent = new Event("unhandledrejection");
    Object.defineProperty(rejectionEvent, "reason", {
      value: rejectionReason,
    });

    window.dispatchEvent(rejectionEvent);

    await vi.waitFor(() => {
      expect(loadClientSentry).toHaveBeenCalledOnce();
      expect(captureException).toHaveBeenCalledWith(rejectionReason);
    });
  });

  it("initializes on the first route transition and preserves route tracing", async () => {
    const { onRouterTransitionStart } = await import(
      "@/instrumentation-client"
    );

    onRouterTransitionStart(
      "/pipeline?email=private%40example.com#data-room",
      "push",
    );

    await vi.waitFor(() => {
      expect(loadClientSentry).toHaveBeenCalledOnce();
      expect(captureRouterTransitionStart).toHaveBeenCalledWith(
        `${window.location.origin}/pipeline`,
        "push",
      );
    });
    expect(window.cancelIdleCallback).toHaveBeenCalledWith(17);
  });
});
