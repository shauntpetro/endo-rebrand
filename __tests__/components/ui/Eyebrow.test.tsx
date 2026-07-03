import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Eyebrow } from "@/components/ui/Eyebrow";

describe("Eyebrow", () => {
  it("renders its text", () => {
    render(<Eyebrow>Our Platform</Eyebrow>);
    expect(screen.getByText("Our Platform")).toBeDefined();
  });
  it("defaults to the WCAG-safe gold-deep tone and applies the kicker classes", () => {
    render(<Eyebrow>Kicker</Eyebrow>);
    const el = screen.getByText("Kicker");
    expect(el.className).toContain("uppercase");
    expect(el.className).toContain("tracking-[0.2em]");
    // On light backgrounds the default gold must be the text-safe gold-deep (~4.8:1).
    expect(el.className).toContain("text-gold-deep");
  });
  it("uses bright gold-primary for the gold-on-dark tone (plum-dark beats)", () => {
    render(<Eyebrow tone="gold-on-dark">K</Eyebrow>);
    expect(screen.getByText("K").className).toContain("text-gold-primary");
  });
  it("supports plum tone and merges extra className", () => {
    render(<Eyebrow tone="plum" className="mb-8">K</Eyebrow>);
    const el = screen.getByText("K");
    expect(el.className).toContain("text-plum-primary");
    expect(el.className).toContain("mb-8");
  });
});
