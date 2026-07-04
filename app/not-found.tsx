import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main-content" className="flex min-h-screen flex-col justify-center bg-paper pt-32">
        <div className="container-editorial">
          <p className="t-label text-gold-ink">Error 404 — Page not found</p>
          <h1 className="t-display mt-8 text-ink">
            This page has <span className="italic-display text-gold-ink">moved on.</span>
          </h1>
          <p className="t-lead mt-8 max-w-xl text-ink-muted">
            The page you’re looking for doesn’t exist or has been relocated. Let’s get you back to the science.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link
              href="/"
              className="t-label rounded-full bg-plum-deep px-7 py-3.5 text-paper-on-dark transition-colors hover:bg-gold-ink"
            >
              Back to home
            </Link>
            <Link href="/contact" className="klink t-label text-ink">
              Contact us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
