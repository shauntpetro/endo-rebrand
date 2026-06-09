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
  it("renders 3 testimonial cards", () => {
    render(React.createElement(Testimonials));
    expect(screen.getByText("Clinical Advisor")).toBeDefined();
    expect(screen.getByText("Industry Partner")).toBeDefined();
    expect(screen.getByText("Research Collaborator")).toBeDefined();
  });

  it("contains expected quote text", () => {
    render(React.createElement(Testimonials));
    expect(
      screen.getByText(/paradigm shift in how we think about treating endometriosis/)
    ).toBeDefined();
    expect(
      screen.getByText(/cyclic peptide platform is compelling/)
    ).toBeDefined();
  });
});
