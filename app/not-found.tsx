import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-ink text-cream"
    >
      <div aria-hidden className="pointer-events-none absolute -right-[8%] top-1/2 h-[50vmin] w-[50vmin] -translate-y-1/2 shape-dot bg-gold opacity-90" />
      <div className="container-editorial relative z-10">
        <p className="t-label text-gold-soft">Error 404 — off the reel</p>
        <h1 className="t-display mt-8 max-w-[14ch] uppercase">
          This frame <span className="text-gold-soft">doesn’t exist.</span>
        </h1>
        <p className="t-lead mt-8 max-w-lg text-muted-on-dark">
          The page you’re looking for isn’t part of the film. Let’s get you back to the start.
        </p>
        <Link
          href="/"
          className="t-label mt-12 inline-flex items-center gap-2 bg-gold px-8 py-4 text-ink transition-colors hover:bg-cream"
        >
          Back to the beginning
        </Link>
      </div>
    </main>
  );
}
