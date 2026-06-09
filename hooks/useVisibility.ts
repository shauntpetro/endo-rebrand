"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export function useVisibility(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Store options in a ref to avoid recreating the observer on every render
  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px 0px", ...optionsRef.current }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /** Callback ref for components that need to merge multiple refs */
  const setRef = useCallback((node: HTMLElement | null) => {
    (ref as React.MutableRefObject<HTMLElement | null>).current = node;
  }, []);

  return { ref, setRef, isVisible };
}
