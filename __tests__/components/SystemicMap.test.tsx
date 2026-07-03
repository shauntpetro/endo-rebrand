import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("framer-motion", () => {
  const motion = new Proxy({}, {
    get: (_t, prop) => typeof prop === "string"
      ? React.forwardRef(({ children, ...props }: any, ref: any) =>
          React.createElement(prop as any, { ...props, ref }, children))
      : undefined,
  });
  return { motion, AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children), useInView: () => true };
});
vi.mock("@/hooks/useVisibility", () => ({ useVisibility: () => ({ ref: { current: null }, setRef: vi.fn(), isVisible: true }) }));

import SystemicMap from "@/components/SystemicMap";

describe("SystemicMap", () => {
  it("renders the associated-comorbidities legend copy from truth.md", () => {
    render(<SystemicMap />);
    expect(screen.getByText(/Associated comorbidities/i)).toBeDefined();
    expect(screen.getByText(/Cardiovascular/i)).toBeDefined();
    expect(screen.getByText(/cancer risk/i)).toBeDefined();
    expect(screen.getByText(/Inflammatory/i)).toBeDefined();
  });

  it("pins a node's detail panel on click", () => {
    render(<SystemicMap />);
    const node = screen.getByLabelText(/View Pelvic Cavity details/i);
    fireEvent.click(node);
    // Description now appears in the visible panel AND the persistent aria-live
    // region (a11y improvement), so there may be more than one match.
    expect(screen.getAllByText(/Primary site of endometrial implants/i).length).toBeGreaterThan(0);
  });
});
