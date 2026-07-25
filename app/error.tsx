"use client";

import { useEffect, useRef } from "react";
import { loadClientSentry } from "@/lib/client-sentry";
import Button from "@/components/site/Button";
import RecoveryTrace from "@/components/site/RecoveryTrace";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });

    if (process.env.NODE_ENV !== "production") {
      console.error("Application error:", error);
    }
    void loadClientSentry()
      .then((sentry) => {
        sentry?.captureException(error);
      })
      .catch(() => {
        // Reporting is best-effort; the recovery UI remains fully functional.
      });
  }, [error]);

  return (
    <main
      ref={mainRef}
      id="main-content"
      tabIndex={-1}
      className="relative flex min-h-svh items-center overflow-hidden bg-paper pb-16 pt-28 lg:pb-24 lg:pt-32"
    >
      <div aria-hidden className="hero-thread-trace" />
      <div className="container-page relative z-10">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-7 lg:gap-14">
          <div className="hero-copy-enter md:col-span-7 lg:col-span-6">
            <p data-hero-step="eyebrow" className="eyebrow">
              Something went wrong
            </p>
            <h1
              data-hero-step="title"
              className="t-hero mt-5 max-w-xl text-ink"
            >
              An unexpected error occurred.
            </h1>
            <p
              data-hero-step="intro"
              className="t-lead mt-5 max-w-lg"
            >
              Please try again, or return to the homepage. The issue may be
              logged automatically to help us investigate.
            </p>
            <div
              data-hero-step="actions"
              className="mt-9 flex flex-wrap gap-3"
            >
              <button
                type="button"
                onClick={reset}
                className="group relative isolate inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full bg-rose-ink px-6 py-3 text-sm font-medium text-on-dark transition-[border-color,color,transform] duration-300 before:absolute before:inset-0 before:z-0 before:origin-left before:scale-x-0 before:bg-plum before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:before:scale-x-100 focus-visible:before:scale-x-100 active:scale-[0.975] motion-reduce:transform-none motion-reduce:transition-none motion-reduce:before:transition-none"
              >
                <span className="relative z-10">Try again</span>
              </button>
              <Button href="/" variant="ghost">
                Back to home
              </Button>
            </div>
          </div>

          <div className="page-enter hidden md:col-span-5 md:block lg:col-span-6">
            <RecoveryTrace
              eyebrow="Recovery path"
              caption="A clear route back to the EndoCyclic experience."
            />
          </div>
        </div>
      </div>
    </main>
  );
}
