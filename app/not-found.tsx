import type { Metadata } from "next";
import Button from "@/components/site/Button";
import RecoveryTrace from "@/components/site/RecoveryTrace";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative flex min-h-svh items-center overflow-hidden bg-paper pb-16 pt-28 lg:pb-24 lg:pt-32"
    >
      <div aria-hidden className="hero-thread-trace" />
      <div className="container-page relative z-10">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-7 lg:gap-14">
          <div className="hero-copy-enter md:col-span-7 lg:col-span-6">
            <p data-hero-step="eyebrow" className="eyebrow">
              Error 404
            </p>
            <h1
              data-hero-step="title"
              className="t-hero mt-5 max-w-xl text-ink"
            >
              This page couldn’t be found.
            </h1>
            <p
              data-hero-step="intro"
              className="t-lead mt-5 max-w-lg"
            >
              The page you’re looking for doesn’t exist or has moved. Let’s
              get you back on track.
            </p>
            <div
              data-hero-step="actions"
              className="mt-9 flex flex-wrap gap-3"
            >
              <Button href="/" arrow>
                Back to home
              </Button>
              <Button href="/contact" variant="ghost">
                Contact us
              </Button>
            </div>
          </div>

          <div className="page-enter hidden md:col-span-5 md:block lg:col-span-6">
            <RecoveryTrace />
          </div>
        </div>
      </div>
    </main>
  );
}
