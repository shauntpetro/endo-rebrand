"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}

/**
 * Reports the OS "reduce motion" preference for JS-driven motion that
 * Framer's MotionConfig can't reach — Three.js `useFrame` loops, raw
 * `requestAnimationFrame`, `setInterval`, and mousemove-driven effects.
 *
 * SSR-safe: returns `false` on the server and first client render, then
 * updates once mounted (and live-updates if the OS setting changes).
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
