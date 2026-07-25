import { afterEach, describe, expect, it, vi } from "vitest";
import {
  FORM_REQUEST_TIMEOUT_MS,
  MAX_RETRY_AFTER_SECONDS,
  FormRequestTimeoutError,
  formatRetryAfterCountdown,
  getRetryAfterDeadline,
  isFormRequestTimeoutError,
  postFormJson,
  secondsUntilRetry,
} from "@/lib/form-client";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("postFormJson", () => {
  it("posts JSON and returns the response with its parsed body", async () => {
    vi.useFakeTimers();
    const response = {
      json: vi.fn().mockResolvedValue({ success: true }),
    } as unknown as Response;
    const fetchMock = vi.fn().mockResolvedValue(response);
    vi.stubGlobal("fetch", fetchMock);

    const result = await postFormJson<{ success: boolean }>("/api/contact", {
      name: "Ada",
    });

    expect(result).toEqual({
      response,
      data: { success: true },
    });
    expect(fetchMock).toHaveBeenCalledWith("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Ada" }),
      signal: expect.any(AbortSignal),
    });
    expect(vi.getTimerCount()).toBe(0);
  });

  it("returns null when the response body is not valid JSON", async () => {
    vi.useFakeTimers();
    const response = {
      json: vi.fn().mockRejectedValue(new SyntaxError("Invalid JSON")),
    } as unknown as Response;
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));

    await expect(postFormJson("/api/contact", {})).resolves.toEqual({
      response,
      data: null,
    });
    expect(vi.getTimerCount()).toBe(0);
  });

  it("aborts the fetch after 12 seconds and exposes a timeout error", async () => {
    vi.useFakeTimers();
    let requestSignal: AbortSignal | undefined;
    vi.stubGlobal(
      "fetch",
      vi.fn((_input: RequestInfo | URL, init?: RequestInit) => {
        requestSignal = init?.signal ?? undefined;

        return new Promise<Response>((_resolve, reject) => {
          requestSignal?.addEventListener(
            "abort",
            () => reject(new DOMException("Aborted", "AbortError")),
            { once: true },
          );
        });
      }),
    );

    const request = postFormJson("/api/contact", {});
    const rejection = expect(request).rejects.toSatisfy((error: unknown) => {
      expect(error).toBeInstanceOf(FormRequestTimeoutError);
      expect(isFormRequestTimeoutError(error)).toBe(true);
      expect((error as FormRequestTimeoutError).timeoutMs).toBe(
        FORM_REQUEST_TIMEOUT_MS,
      );
      return true;
    });

    await vi.advanceTimersByTimeAsync(FORM_REQUEST_TIMEOUT_MS);

    await rejection;
    expect(requestSignal?.aborted).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("preserves non-timeout fetch errors and still clears the timer", async () => {
    vi.useFakeTimers();
    const networkError = new TypeError("Failed to fetch");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(networkError));

    await expect(postFormJson("/api/contact", {})).rejects.toBe(networkError);
    expect(vi.getTimerCount()).toBe(0);
  });
});

describe("Retry-After helpers", () => {
  const now = Date.UTC(2026, 6, 24, 12, 0, 0);

  it("parses delay-seconds and HTTP dates relative to the server clock", () => {
    expect(
      getRetryAfterDeadline(new Headers({ "Retry-After": " 12 " }), now),
    ).toBe(now + 12_000);

    const serverNow = Date.UTC(2026, 6, 24, 15, 0, 0);
    expect(
      getRetryAfterDeadline(
        new Headers({
          Date: new Date(serverNow).toUTCString(),
          "Retry-After": new Date(serverNow + 45_000).toUTCString(),
        }),
        now,
      ),
    ).toBe(now + 45_000);
  });

  it("falls back for malformed values and bounds excessive delays", () => {
    expect(
      getRetryAfterDeadline(new Headers({ "Retry-After": "-1" }), now),
    ).toBe(now + 60_000);
    expect(
      getRetryAfterDeadline(
        new Headers({ "Retry-After": "not-a-date" }),
        now,
      ),
    ).toBe(now + 60_000);
    expect(
      getRetryAfterDeadline(
        new Headers({ "Retry-After": "9".repeat(400) }),
        now,
      ),
    ).toBe(now + MAX_RETRY_AFTER_SECONDS * 1_000);
  });

  it("reports an exact, pluralized countdown", () => {
    expect(secondsUntilRetry(now + 61_000, now)).toBe(61);
    expect(formatRetryAfterCountdown(61)).toBe(
      "You can try again in 1 minute and 1 second.",
    );
    expect(formatRetryAfterCountdown(1)).toBe(
      "You can try again in 1 second.",
    );
    expect(formatRetryAfterCountdown(0)).toBe("You can try again now.");
  });
});
