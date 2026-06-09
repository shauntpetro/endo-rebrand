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

import PortfolioMatrix from "@/components/PortfolioMatrix";

describe("PortfolioMatrix", () => {
  it("renders all four candidates", () => {
    render(<PortfolioMatrix variant="full" />);
    expect(screen.getByText("ENDO-205")).toBeDefined();
    expect(screen.getByText(/FemLUNA/)).toBeDefined();
    expect(screen.getByText("ENDO-995")).toBeDefined();
    expect(screen.getByText("ENDO-311")).toBeDefined();
  });

  it("labels both disease-area columns and both modality rows", () => {
    render(<PortfolioMatrix variant="full" />);
    expect(screen.getByText("Endometriosis")).toBeDefined();
    expect(screen.getByText("Oncology")).toBeDefined();
    expect(screen.getByText("Therapeutic")).toBeDefined();
    expect(screen.getByText("Diagnostic")).toBeDefined();
  });

  it("shows the matched-pair framing without the rejected 'theranostic' wording", () => {
    const { container } = render(<PortfolioMatrix variant="full" />);
    expect(screen.getAllByText(/Detect & Treat/i).length).toBeGreaterThan(0);
    expect(container.textContent?.toLowerCase()).not.toContain("theranostic");
  });

  it("renders compact variant without the full header subline", () => {
    render(<PortfolioMatrix variant="compact" />);
    expect(screen.getByText("ENDO-205")).toBeDefined();
    expect(screen.queryByText(/a diagnostic to find disease/i)).toBeNull();
  });
});
