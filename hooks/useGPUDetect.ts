"use client";

import { useSyncExternalStore } from "react";

export type GPUTier = "high" | "low" | "none";

/** Cached client-side GPU tier — computed once, reused across renders */
let cachedTier: GPUTier | null = null;

function detectGPUTier(): GPUTier {
  if (cachedTier !== null) return cachedTier;

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");

    if (!gl) {
      cachedTier = "none";
      return cachedTier;
    }

    let result: GPUTier = "high";

    const debugInfo = (gl as WebGLRenderingContext).getExtension(
      "WEBGL_debug_renderer_info"
    );

    if (debugInfo) {
      const renderer = (gl as WebGLRenderingContext)
        .getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        .toLowerCase();

      // Known low-power / integrated GPU indicators
      const lowPowerKeywords = [
        "intel",
        "swiftshader",
        "llvmpipe",
        "software",
        "mesa",
        "virtualbox",
        "vmware",
        "microsoft basic",
      ];

      if (lowPowerKeywords.some((kw) => renderer.includes(kw))) {
        result = "low";
      }
    }

    // Also check for mobile/low-memory devices
    if (typeof navigator !== "undefined") {
      const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
      if (memory && memory <= 2) {
        result = "low";
      }
    }

    cachedTier = result;
    return cachedTier;
  } catch {
    cachedTier = "none";
    return cachedTier;
  }
}

const emptySubscribe = () => () => {};

/**
 * Detects GPU capability for graceful 3D degradation.
 * Returns "high" for dedicated GPUs, "low" for integrated/mobile,
 * "none" if WebGL is unavailable.
 */
export function useGPUDetect(): GPUTier {
  return useSyncExternalStore(emptySubscribe, detectGPUTier, () => "high");
}
