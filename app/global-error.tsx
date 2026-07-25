"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { loadClientSentry } from "@/lib/client-sentry";

export function GlobalErrorContent({ reset }: { reset: () => void }) {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <main
      ref={mainRef}
      id="main-content"
      tabIndex={-1}
      className="flex min-h-svh flex-col justify-center bg-paper py-20"
    >
      <div className="container-page">
        <Link
          href="/"
          aria-label="EndoCyclic Therapeutics — home"
          className="inline-flex min-h-11 w-44 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-ink"
        >
          {/* A plain image keeps the root recovery surface independent of the
              optimized-image runtime that may have failed with the layout. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.avif"
            alt="EndoCyclic Therapeutics"
            width={233}
            height={70}
            className="h-auto w-full object-contain object-left"
          />
        </Link>
        <p className="eyebrow mt-14">Site recovery</p>
        <h1 className="t-hero mt-5 max-w-xl text-ink">
          The site couldn’t load.
        </h1>
        <p className="t-lead mt-5 max-w-lg">
          Please try again, or return to the homepage. The issue may be logged
          automatically to help us investigate.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-plum px-6 py-3 text-sm font-medium text-on-dark transition-colors hover:bg-teal-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-ink"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-line px-6 py-3 text-sm text-ink transition-colors hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-ink"
          >
            Return home
          </Link>
        </div>
      </div>
    </main>
  );
}

export async function reportGlobalError(error: Error) {
  try {
    const sentry = await loadClientSentry();
    sentry?.captureException(error);
  } catch {
    // Reporting is best-effort; recovery remains available without it.
  }
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("Root layout error:", error);
    }
    void reportGlobalError(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-svh bg-paper font-sans text-ink-body antialiased">
        <GlobalErrorContent reset={reset} />
      </body>
    </html>
  );
}
