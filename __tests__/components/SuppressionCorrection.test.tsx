import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("framer-motion", () => {
  const motion = new Proxy({}, {
    get: (_t, prop) => typeof prop === "string"
      ? React.forwardRef(({ children, ...props }: any, ref: any) =>
          React.createElement(prop as any, { ...props, ref }, children))
      : undefined,
  });
  return { motion, AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children), useInView: () => true };
});

import SuppressionCorrection from "@/components/SuppressionCorrection";

describe("SuppressionCorrection", () => {
  it("shows both the hormonal-suppression and targeted-correction columns", () => {
    render(<SuppressionCorrection />);
    expect(screen.getByText(/Hormonal Suppression/i)).toBeDefined();
    expect(screen.getByText(/Targeted Correction/i)).toBeDefined();
    expect(screen.getByText(/ENDO-205/)).toBeDefined();
  });

  it("uses only approved language — no prohibited claims", () => {
    const { container } = render(<SuppressionCorrection />);
    const text = (container.textContent || "").toLowerCase();
    expect(text).not.toMatch(/guaranteed|proven/);
    expect(text).not.toMatch(/\bcure\b/);
    expect(text).toContain("non-hormonal");
  });
});
