"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

/**
 * Global overlay system for the one-page film. Deep content (pipeline detail,
 * team, news, contact, investors, media, imaging) opens as an in-place panel
 * instead of a separate route. Deep-linkable via `#!<id>` hashes.
 */
export type OverlayId =
  | "pipeline"
  | "team"
  | "news"
  | "contact"
  | "invest"
  | "media"
  | "imaging";

export const OVERLAY_IDS: OverlayId[] = [
  "pipeline",
  "team",
  "news",
  "contact",
  "invest",
  "media",
  "imaging",
];

type Ctx = {
  current: OverlayId | null;
  param?: string;
  open: (id: OverlayId, param?: string) => void;
  close: () => void;
};

const OverlayContext = createContext<Ctx | null>(null);

export function useOverlay(): Ctx {
  const c = useContext(OverlayContext);
  if (!c) throw new Error("useOverlay must be used within <OverlayProvider>");
  return c;
}

function parseHash(): { id: OverlayId | null; param?: string } {
  if (typeof window === "undefined") return { id: null };
  const h = window.location.hash;
  if (!h.startsWith("#!")) return { id: null };
  const [id, param] = h.slice(2).split("/");
  return OVERLAY_IDS.includes(id as OverlayId)
    ? { id: id as OverlayId, param }
    : { id: null };
}

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<OverlayId | null>(null);
  const [param, setParam] = useState<string | undefined>(undefined);

  const open = useCallback((id: OverlayId, p?: string) => {
    setCurrent(id);
    setParam(p);
    if (typeof window !== "undefined") {
      const hash = `#!${id}${p ? `/${p}` : ""}`;
      history.replaceState(null, "", hash);
    }
  }, []);

  const close = useCallback(() => {
    setCurrent(null);
    setParam(undefined);
    if (typeof window !== "undefined" && window.location.hash.startsWith("#!")) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  // Open from a deep link on mount, and respond to back/forward hash changes.
  useEffect(() => {
    const apply = () => {
      const { id, param: p } = parseHash();
      setCurrent(id);
      setParam(p);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  return (
    <OverlayContext.Provider value={{ current, param, open, close }}>
      {children}
    </OverlayContext.Provider>
  );
}
