"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6">
        <motion.div
          className="text-center max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Decorative molecule */}
          <motion.div
            className="mx-auto mb-8 w-24 h-24 rounded-full border-2 border-gold-primary/30 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-primary/20 to-gold-primary/5 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-gold-primary font-bold text-lg">?</span>
            </motion.div>
          </motion.div>

          <h1 className="text-6xl font-bold text-plum-dark font-serif mb-4">404</h1>
          <h2 className="text-xl font-medium text-stone-600 mb-3">Page Not Found</h2>
          <p className="text-stone-400 mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-plum-dark text-white rounded-lg font-medium hover:bg-plum-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-2"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1L1 8L8 15M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 text-stone-600 rounded-lg font-medium hover:border-gold-primary hover:text-gold-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-2"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
