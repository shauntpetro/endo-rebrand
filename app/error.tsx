"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
    <main className="min-h-screen flex items-center justify-center bg-surface px-6">
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Warning icon */}
        <motion.div
          className="mx-auto mb-8 w-20 h-20 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18A2 2 0 003.54 21H20.46A2 2 0 0022.18 18L13.71 3.86A2 2 0 0010.29 3.86Z"
              stroke="#C9A961"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <h1 className="text-4xl font-bold text-plum-dark font-serif mb-3">Something went wrong</h1>
        <p className="text-stone-400 mb-8 leading-relaxed">
          An unexpected error occurred. Please try again or return to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-plum-dark text-white rounded-lg font-medium hover:bg-plum-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-2"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M1 1V6H6M15 15V10H10M14.36 5.64A7 7 0 001.64 10.36M1.64 10.36A7 7 0 0014.36 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 text-stone-600 rounded-lg font-medium hover:border-gold-primary hover:text-gold-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-2"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
