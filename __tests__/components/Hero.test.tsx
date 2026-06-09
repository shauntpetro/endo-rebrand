import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("framer-motion", () => {
  const motion = new Proxy(
    {},
    {
      get: (_target, prop) => {
        if (typeof prop === "string") {
          return React.forwardRef(
            ({ children, ...props }: any, ref: any) => {
              const Tag = prop as keyof React.JSX.IntrinsicElements;
              return React.createElement(Tag, { ...props, ref }, children);
            }
          );
        }
      },
    }
  );
  return {
    motion,
    AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children),
    useInView: () => true,
  };
});

vi.mock("next/dynamic", () => ({
  default: () => () => React.createElement("div", { "data-testid": "mock-canvas" }),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) =>
    React.createElement("a", { href, ...props }, children),
}));

vi.mock("@/hooks/useGPUDetect", () => ({
  useGPUDetect: () => "none",
}));

vi.mock("@/hooks/useVisibility", () => ({
  useVisibility: () => ({ setRef: vi.fn(), isVisible: true }),
}));

vi.mock("@/components/DitherOverlay", () => ({
  DitherOverlay: () => React.createElement("div"),
}));

vi.mock("@/components/CanvasErrorBoundary", () => ({
  default: ({ children }: any) => React.createElement("div", null, children),
}));

vi.mock("@/components/ui/MagneticButton", () => ({
  MagneticButton: ({ children, ...props }: any) =>
    React.createElement("button", props, children),
}));

import Hero from "@/components/Hero";

describe("Hero", () => {
  it("renders headline text", () => {
    render(React.createElement(Hero));
    expect(screen.getByText(/Clinical-stage/)).toBeDefined();
    expect(screen.getByText(/for women/)).toBeDefined();
  });

  it("renders IND Cleared badge", () => {
    render(React.createElement(Hero));
    expect(screen.getByText("IND Cleared")).toBeDefined();
  });
});
