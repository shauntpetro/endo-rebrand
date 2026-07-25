import type { NextRequest } from "next/server";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_TRACKED_CLIENTS = 10_000;
const GLOBAL_STATE_KEY = "__endocyclicSharedFormRateLimitV1";

type RateLimitEntry = {
  count: number;
  resetTime: number;
};

type RateLimitState = {
  entries: Map<string, RateLimitEntry>;
  lastCleanup: number;
};

type RateLimitResult =
  | { allowed: true; retryAfterSeconds: 0 }
  | { allowed: false; retryAfterSeconds: number };

type GlobalWithFormRateLimit = typeof globalThis & {
  [GLOBAL_STATE_KEY]?: RateLimitState;
};

function getState(): RateLimitState {
  const runtime = globalThis as GlobalWithFormRateLimit;
  runtime[GLOBAL_STATE_KEY] ??= {
    entries: new Map<string, RateLimitEntry>(),
    lastCleanup: 0,
  };
  return runtime[GLOBAL_STATE_KEY];
}

function normalizeIpHeader(value: string | null): string | null {
  if (!value) return null;

  const firstValue = value.split(",", 1)[0]?.trim();
  if (
    !firstValue ||
    firstValue.length > 128 ||
    /[\r\n]/.test(firstValue)
  ) {
    return null;
  }

  return firstValue;
}

function getClientKey(request: NextRequest): string {
  return (
    normalizeIpHeader(request.headers.get("x-real-ip")) ??
    "unknown"
  );
}

function cleanupExpiredEntries(state: RateLimitState, now: number) {
  if (now - state.lastCleanup < RATE_LIMIT_WINDOW_MS) return;

  for (const [key, entry] of state.entries) {
    if (entry.resetTime <= now) {
      state.entries.delete(key);
    }
  }
  state.lastCleanup = now;
}

function ensureCapacity(state: RateLimitState) {
  if (state.entries.size < MAX_TRACKED_CLIENTS) return;

  const oldestKey = state.entries.keys().next().value;
  if (typeof oldestKey === "string") {
    state.entries.delete(oldestKey);
  }
}

/**
 * A bounded, process-local limiter shared by all three form endpoints. Railway
 * overwrites X-Real-IP at the public edge; do not fall back to a caller-
 * controlled forwarding header. Add an edge/distributed limiter when replicas
 * scale beyond one process.
 */
export function consumeFormRateLimit(
  request: NextRequest,
  now = Date.now(),
): RateLimitResult {
  const state = getState();
  cleanupExpiredEntries(state, now);

  const key = getClientKey(request);
  const entry = state.entries.get(key);

  if (!entry || entry.resetTime <= now) {
    ensureCapacity(state);
    state.entries.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((entry.resetTime - now) / 1_000),
      ),
    };
  }

  entry.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
