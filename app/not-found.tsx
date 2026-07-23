import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-svh flex-col justify-center bg-paper pt-24">
      <div className="container-page">
        <p className="eyebrow">Error 404</p>
        <h1 className="t-hero mt-5 max-w-xl text-ink">This page couldn’t be found.</h1>
        <p className="t-lead mt-5 max-w-lg">
          The page you’re looking for doesn’t exist or has moved. Let’s get you back on track.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full bg-plum px-6 py-3 text-sm font-medium text-on-dark transition-colors hover:bg-teal-ink">
            Back to home
          </Link>
          <Link href="/contact" className="rounded-full border border-line px-6 py-3 text-sm text-ink transition-colors hover:border-ink">
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
