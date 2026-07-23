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
    <main id="main-content" className="flex min-h-svh flex-col justify-center bg-paper pt-24">
      <div className="container-page">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="t-hero mt-5 max-w-xl text-ink">An unexpected error occurred.</h1>
        <p className="t-lead mt-5 max-w-lg">
          Please try again, or return to the homepage. Our team has been notified.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <button onClick={reset} className="rounded-full bg-plum px-6 py-3 text-sm font-medium text-on-dark transition-colors hover:bg-teal-ink">
            Try again
          </button>
          <Link href="/" className="rounded-full border border-line px-6 py-3 text-sm text-ink transition-colors hover:border-ink">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
