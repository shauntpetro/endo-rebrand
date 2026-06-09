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

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next/image", () => ({
  default: (props: any) => React.createElement("img", props),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) =>
    React.createElement("a", { href, ...props }, children),
}));

vi.mock("lucide-react", () => ({
  Menu: () => React.createElement("span", null, "Menu"),
  X: () => React.createElement("span", null, "X"),
}));

import Navbar from "@/components/Navbar";

describe("Navbar", () => {
  it("renders navigation links", () => {
    render(React.createElement(Navbar));
    expect(screen.getByText("Innovation")).toBeDefined();
    expect(screen.getByText("Pipeline")).toBeDefined();
    expect(screen.getByText("Contact")).toBeDefined();
    expect(screen.getByText("Investors")).toBeDefined();
  });
});
