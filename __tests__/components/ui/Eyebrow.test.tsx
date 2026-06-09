import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Eyebrow } from "@/components/ui/Eyebrow";

describe("Eyebrow", () => {
  it("renders its text", () => {
    render(<Eyebrow>Our Platform</Eyebrow>);
    expect(screen.getByText("Our Platform")).toBeDefined();
  });
  it("defaults to gold tone and applies the kicker classes", () => {
    render(<Eyebrow>Kicker</Eyebrow>);
    const el = screen.getByText("Kicker");
    expect(el.className).toContain("uppercase");
    expect(el.className).toContain("tracking-[0.2em]");
    expect(el.className).toContain("text-gold-primary");
  });
  it("supports plum tone and merges extra className", () => {
    render(<Eyebrow tone="plum" className="mb-8">K</Eyebrow>);
    const el = screen.getByText("K");
    expect(el.className).toContain("text-plum-primary");
    expect(el.className).toContain("mb-8");
  });
});
