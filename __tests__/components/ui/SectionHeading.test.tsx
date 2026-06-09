import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "@/components/ui/SectionHeading";

describe("SectionHeading", () => {
  it("renders an h2 with its text", () => {
    render(<SectionHeading>Our Pipeline</SectionHeading>);
    expect(screen.getByRole("heading", { level: 2, name: "Our Pipeline" })).toBeDefined();
  });
  it("applies the canonical heading classes and merges className", () => {
    render(<SectionHeading className="mb-12">Title</SectionHeading>);
    const el = screen.getByRole("heading", { level: 2 });
    expect(el.className).toContain("font-serif");
    expect(el.className).toContain("text-plum-dark");
    expect(el.className).toContain("tracking-tighter");
    expect(el.className).toContain("mb-12");
  });
});
