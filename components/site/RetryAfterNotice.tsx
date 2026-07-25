"use client";

import { useCallback, useEffect, useState } from "react";
import { clsx } from "clsx";
import {
  formatRetryAfterCountdown,
  getRetryAfterDeadline,
  secondsUntilRetry,
} from "@/lib/form-client";

type RetryGate = {
  deadline: number;
  initialSeconds: number;
};

export function useRetryAfterGate() {
  const [gate, setGate] = useState<RetryGate | null>(null);
  const [clock, setClock] = useState(() => Date.now());
  const secondsRemaining = gate
    ? secondsUntilRetry(gate.deadline, clock)
    : 0;

  useEffect(() => {
    if (!gate || secondsRemaining === 0) return;

    const delay = Math.min(
      1_000,
      Math.max(1, gate.deadline - Date.now()),
    );
    const timeout = window.setTimeout(() => {
      setClock(Date.now());
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [clock, gate, secondsRemaining]);

  const startRetryGate = useCallback((response: Response) => {
    const now = Date.now();
    const deadline = getRetryAfterDeadline(response.headers, now);
    setClock(now);
    setGate({
      deadline,
      initialSeconds: secondsUntilRetry(deadline, now),
    });
  }, []);

  const clearRetryGate = useCallback(() => {
    setGate(null);
  }, []);

  return {
    clearRetryGate,
    hasRetryGate: gate !== null,
    initialRetrySeconds: gate?.initialSeconds ?? 0,
    retryBlocked: secondsRemaining > 0,
    retrySeconds: secondsRemaining,
    startRetryGate,
  };
}

export default function RetryAfterNotice({
  id,
  secondsRemaining,
  initialSeconds,
  className,
  announce = true,
}: {
  id: string;
  secondsRemaining: number;
  initialSeconds: number;
  className?: string;
  announce?: boolean;
}) {
  const waiting = secondsRemaining > 0;

  return (
    <div
      className={clsx(
        "min-w-0 [overflow-wrap:anywhere]",
        className,
      )}
    >
      <p id={id} aria-live="off">
        {formatRetryAfterCountdown(secondsRemaining)}
      </p>
      {announce && (
        <p
          className="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {waiting
            ? `Submission temporarily paused. ${formatRetryAfterCountdown(initialSeconds)}`
            : "Submission is available again."}
        </p>
      )}
    </div>
  );
}
