"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Restores scroll to the top on client-side route changes. */
export default function ScrollManager() {
  const pathname = usePathname();
  useEffect(() => {
    // Skip when navigating to an in-page anchor.
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}
