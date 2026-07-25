export const FORM_REQUEST_TIMEOUT_MS = 12_000;
export const DEFAULT_RETRY_AFTER_SECONDS = 60;
export const MAX_RETRY_AFTER_SECONDS = 24 * 60 * 60;

type HeaderReader = Pick<Headers, "get">;

function boundedRetrySeconds(
  seconds: number,
  fallbackSeconds = DEFAULT_RETRY_AFTER_SECONDS,
): number {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return Math.min(
      Math.max(Math.ceil(fallbackSeconds), 0),
      MAX_RETRY_AFTER_SECONDS,
    );
  }

  return Math.min(Math.ceil(seconds), MAX_RETRY_AFTER_SECONDS);
}

export function getRetryAfterDeadline(
  headers: HeaderReader,
  now = Date.now(),
  fallbackSeconds = DEFAULT_RETRY_AFTER_SECONDS,
): number {
  const fallbackDeadline =
    now + boundedRetrySeconds(fallbackSeconds) * 1_000;
  const value = headers.get("retry-after")?.trim();

  if (!value) return fallbackDeadline;

  if (/^\d+$/.test(value)) {
    const parsedSeconds = Number(value);
    const seconds = Number.isFinite(parsedSeconds)
      ? Math.min(parsedSeconds, MAX_RETRY_AFTER_SECONDS)
      : MAX_RETRY_AFTER_SECONDS;
    return now + seconds * 1_000;
  }

  // Signed or fractional delay values are neither valid delay-seconds nor
  // HTTP dates. Keep them on the safe fallback instead of letting Date.parse
  // reinterpret them as calendar years.
  if (/^[+-]?\d+(?:\.\d+)?$/.test(value)) {
    return fallbackDeadline;
  }

  const retryDate = Date.parse(value);
  if (!Number.isFinite(retryDate)) return fallbackDeadline;

  const serverDate = Date.parse(headers.get("date") ?? "");
  const referenceTime = Number.isFinite(serverDate) ? serverDate : now;
  const delayMs = Math.min(
    Math.max(retryDate - referenceTime, 0),
    MAX_RETRY_AFTER_SECONDS * 1_000,
  );

  return now + delayMs;
}

export function secondsUntilRetry(
  deadline: number,
  now = Date.now(),
): number {
  if (!Number.isFinite(deadline) || !Number.isFinite(now)) return 0;
  return Math.max(0, Math.ceil((deadline - now) / 1_000));
}

export function formatRetryAfterCountdown(seconds: number): string {
  const remaining = Math.max(0, Math.ceil(seconds));
  if (remaining === 0) return "You can try again now.";

  const minutes = Math.floor(remaining / 60);
  const secondsPart = remaining % 60;
  const parts: string[] = [];

  if (minutes > 0) {
    parts.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`);
  }
  if (secondsPart > 0) {
    parts.push(
      `${secondsPart} ${secondsPart === 1 ? "second" : "seconds"}`,
    );
  }

  return `You can try again in ${parts.join(" and ")}.`;
}

export class FormRequestTimeoutError extends Error {
  readonly timeoutMs: number;

  constructor(timeoutMs = FORM_REQUEST_TIMEOUT_MS) {
    super(`Form request timed out after ${timeoutMs}ms.`);
    this.name = "FormRequestTimeoutError";
    this.timeoutMs = timeoutMs;
  }
}

export function isFormRequestTimeoutError(
  error: unknown,
): error is FormRequestTimeoutError {
  return error instanceof FormRequestTimeoutError;
}

export type FormPostResult<T> = {
  response: Response;
  data: T | null;
};

export async function postFormJson<T = unknown>(
  input: RequestInfo | URL,
  payload: unknown,
): Promise<FormPostResult<T>> {
  const controller = new AbortController();
  let timedOut = false;
  const timeoutId = globalThis.setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, FORM_REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(input, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    let data: T | null = null;
    try {
      data = (await response.json()) as T;
    } catch {
      data = null;
    }

    return { response, data };
  } catch (error) {
    if (timedOut) {
      throw new FormRequestTimeoutError();
    }
    throw error;
  } finally {
    globalThis.clearTimeout(timeoutId);
  }
}
