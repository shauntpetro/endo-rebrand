import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const runtime = vi.hoisted(() => ({
  captureException: vi.fn(),
  captureRouterTransitionStart: vi.fn(),
  initializeClientSentry: vi.fn(),
}));

vi.mock("@/lib/client-sentry-runtime", () => ({
  initializeClientSentry: runtime.initializeClientSentry,
}));

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv(
    "NEXT_PUBLIC_SENTRY_DSN",
    "https://public@example.ingest.sentry.io/1",
  );
  runtime.initializeClientSentry.mockReset().mockReturnValue({
    captureException: runtime.captureException,
    captureRouterTransitionStart: runtime.captureRouterTransitionStart,
  });
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("loadClientSentry", () => {
  it("shares one deferred initialization across concurrent callers", async () => {
    const { loadClientSentry } = await import("@/lib/client-sentry");

    const [first, second] = await Promise.all([
      loadClientSentry(),
      loadClientSentry(),
    ]);

    expect(runtime.initializeClientSentry).toHaveBeenCalledOnce();
    expect(first).toBe(second);
  });

  it("contains a load failure and retries on the next request", async () => {
    runtime.initializeClientSentry
      .mockImplementationOnce(() => {
        throw new Error("monitoring unavailable");
      })
      .mockReturnValueOnce({
        captureException: runtime.captureException,
        captureRouterTransitionStart: runtime.captureRouterTransitionStart,
      });
    const { loadClientSentry } = await import("@/lib/client-sentry");

    await expect(loadClientSentry()).resolves.toBeNull();
    await expect(loadClientSentry()).resolves.toEqual({
      captureException: runtime.captureException,
      captureRouterTransitionStart: runtime.captureRouterTransitionStart,
    });
    expect(runtime.initializeClientSentry).toHaveBeenCalledTimes(2);
  });
});
