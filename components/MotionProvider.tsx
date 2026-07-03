"use client";

import { MotionConfig } from "framer-motion";

// Silence a known-benign framer-motion DEV warning. useScroll({ target }) emits
// "...container has a non-static position... to ensure scroll offset is calculated
// correctly" during React 19 hydration measurement even when the target IS
// positioned (verified: setting position on the target AND body does not clear it).
// It does not affect production (framer strips warnings) or the parallax behavior.
// Scoped to the exact message so no other warning is masked.
if (typeof window !== "undefined") {
  const w = window as unknown as { __endoScrollWarnPatched?: boolean };
  if (!w.__endoScrollWarnPatched) {
    w.__endoScrollWarnPatched = true;
    const originalWarn = console.warn.bind(console);
    console.warn = (...args: unknown[]) => {
      const first = args[0];
      if (
        typeof first === "string" &&
        first.includes("non-static position") &&
        first.includes("scroll offset")
      ) {
        return;
      }
      originalWarn(...(args as []));
    };
  }
}

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
