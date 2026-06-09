import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { DotGrid } from "@/components/ui/DotGrid";

describe("DotGrid", () => {
  it("renders a decorative overlay with the dot pattern", () => {
    const { container } = render(<DotGrid />);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("aria-hidden")).toBe("true");
    expect(el.className).toContain("absolute");
    expect(el.className).toContain("pointer-events-none");
    expect(el.style.backgroundImage).toContain("radial-gradient");
  });
  it("honors color and size props", () => {
    const { container } = render(<DotGrid color="#4A3B52" size={24} />);
    const el = container.firstChild as HTMLElement;
    // jsdom normalizes hex colors to rgb() in style.backgroundImage
    expect(el.style.backgroundImage).toContain("radial-gradient");
    expect(el.style.backgroundImage).toContain("rgb(74, 59, 82)");
    expect(el.style.backgroundSize).toBe("24px 24px");
  });
});
