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

vi.mock("@/hooks/useVisibility", () => ({
  useVisibility: () => ({ setRef: vi.fn(), isVisible: true }),
}));

import Testimonials from "@/components/Testimonials";

describe("Testimonials", () => {
  it("renders the founder pull-quote with attribution", () => {
    render(React.createElement(Testimonials));
    expect(screen.getByText("From Our Founder")).toBeDefined();
    expect(screen.getByText("Dr. Tanya Petrossian, PhD")).toBeDefined();
    expect(screen.getByText(/Founder & CEO, EndoCyclic Therapeutics/)).toBeDefined();
  });

  it("uses truth.md-safe founder copy (disease-modifying, designed to eliminate)", () => {
    const { container } = render(React.createElement(Testimonials));
    const text = (container.textContent || "").toLowerCase();
    expect(text).toContain("managed, not modified");
    expect(text).toContain("non-hormonal, disease-modifying");
    // no cure-adjacent / absolute language
    expect(text).not.toMatch(/\bcure\b|guaranteed|proven|wipe it out|only way forward/);
  });
});
