"use client";

import { useEffect } from "react";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
    Sentry.captureException(error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="flex min-h-screen flex-col justify-center bg-paper"
    >
      <div className="container-editorial">
        <p className="t-label text-gold-ink">Something went wrong</p>
        <h1 className="t-h1 mt-8 max-w-2xl text-ink">
          An unexpected error <span className="italic-display text-gold-ink">occurred.</span>
        </h1>
        <p className="t-lead mt-8 max-w-xl text-ink-muted">
          Please try again, or return to the homepage. Our team has been notified.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <button
            onClick={reset}
            className="t-label rounded-full bg-plum-deep px-7 py-3.5 text-paper-on-dark transition-colors hover:bg-gold-ink"
          >
            Try again
          </button>
          <Link href="/" className="klink t-label text-ink">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
