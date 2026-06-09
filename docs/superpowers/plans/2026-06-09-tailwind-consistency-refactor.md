# Tailwind Consistency & Pattern-Extraction Refactor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate styling duplication/drift — consolidate near-white backgrounds into one `surface` token, remove the unused `deep-plum` duplicate, swap raw hex that matches a token, and extract the most-duplicated class strings into small `components/ui/` components — with **zero rendered visual change**.

**Architecture:** Three waves: (A) tokens, (B) mechanical hex→token swaps, (C) shared-component extraction (one component per task: create → test → migrate sites → build). Parity is the contract: every change must look identical in the browser. Tokens live in BOTH `tailwind.config.ts` and `app/globals.css` — update both.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4 (`@theme` block in globals.css), Framer Motion, `clsx` (^2.1.1, already a dep), Vitest + jsdom + @testing-library/react.

**Spec:** `docs/superpowers/specs/2026-06-09-tailwind-consistency-refactor-design.md`

**Hard constraints:**
- **Do NOT touch the fixed surface:** `components/PeptideCanvas.tsx`, `components/mechanism/*`, `components/shaders/*`. (`SystemicMap.tsx` is NOT fixed surface — it may be touched.)
- **Do NOT change dynamic inline styles** (MotionValues, computed coords, `colorFor()` gradients, animated color arrays) or SVG presentation attributes (`fill`/`stroke`/`stopColor`).
- **Zero visual change.** If a swap shifts a color, revert that swap.

**Test pattern** (repo standard, for any test that renders a component using framer-motion/useVisibility):
```tsx
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
```
(Plain presentational components that don't import framer-motion don't need the mock.)

**Per-wave verification:** after each task, run `npx tsc --noEmit`, `npm test`, and (for tasks with visual impact) `npm run build` + a browser screenshot of an affected page compared against the pre-change look. The only currently-failing tests are the pre-existing `Testimonials.test.tsx` (2 failures) — ignore those; nothing else may newly fail.

---

## File Structure

| File | Responsibility | Create/Modify |
|---|---|---|
| `tailwind.config.ts` | Add `surface` color; remove `deep-plum` | Modify |
| `app/globals.css` | Add `--surface` + `--color-surface`; remove `deep-plum` defs | Modify |
| 11 background sites (app/*) | `bg-[#F8F9FA]` / `#F5F5F5` / `#FAF9F6` → `bg-surface` | Modify |
| ~10 component/page files | raw hex → existing token (Wave B) | Modify |
| `components/ui/Eyebrow.tsx` | Uppercase kicker label | Create |
| `components/ui/StatusBadge.tsx` | Pill status/credential badge | Create |
| `components/ui/DotGrid.tsx` | Dot-pattern overlay | Create |
| `components/ui/SectionHeading.tsx` | Big serif section title | Create |
| `components/ui/CtaButton.tsx` | Non-magnetic gold CTA (link/button) | Create |
| `__tests__/components/ui/*.test.tsx` | Unit tests for each new component | Create |

---

## Task 1 — Wave A: `surface` token, remove `deep-plum`, migrate backgrounds

**Files:**
- Modify: `tailwind.config.ts`, `app/globals.css`
- Modify (backgrounds): `app/layout.tsx:135`, `app/page.tsx:42`, `app/not-found.tsx:10`, `app/error.tsx:21`, `app/loading.tsx:3`, `app/pipeline/loading.tsx:5`, `app/innovation/loading.tsx:6`, `app/contact/loading.tsx:5`, `app/team/loading.tsx:5`, `app/news/loading.tsx:5`, `app/impact/loading.tsx:6`, `app/pipeline/page.tsx:85`

- [ ] **Step 1: Add the `surface` token in `tailwind.config.ts`**

Find the `colors` map (it contains `"deep-plum": "#4A3F5C",`). Add:
```ts
        surface: "#F8F9FA",
```
and DELETE the line:
```ts
        "deep-plum": "#4A3F5C",
```

- [ ] **Step 2: Add the `surface` token in `app/globals.css` and remove `deep-plum`**

In the raw-variable block (around line 29) DELETE `  --deep-plum: #4A3F5C;` and ADD `  --surface: #F8F9FA;`.
In the `@theme inline` block: DELETE `  --color-deep-plum: var(--deep-plum);` (line ~55) and ADD `  --color-surface: var(--surface);`.

- [ ] **Step 3: Verify the token resolves (build the CSS layer)**

Run: `npx tsc --noEmit` (expect clean). Then `grep -rn "deep-plum" app/ components/ tailwind.config.ts` → expect **no matches**.

- [ ] **Step 4: Migrate the 9 `bg-[#F8F9FA]` sites → `bg-surface`**

In each of these, replace `bg-[#F8F9FA]` with `bg-surface` (leave all other classes untouched):
`app/page.tsx:42`, `app/not-found.tsx:10`, `app/error.tsx:21`, `app/loading.tsx:3`, `app/pipeline/loading.tsx:5`, `app/innovation/loading.tsx:6`, `app/contact/loading.tsx:5`, `app/team/loading.tsx:5`, `app/news/loading.tsx:5`, `app/impact/loading.tsx:6`.

- [ ] **Step 5: Migrate the two other near-whites**

- `app/layout.tsx:135`: in the `<body>` className, `bg-[#F5F5F5]` → `bg-surface`, AND in the same string `text-[#2D2D2D]` → `text-black-soft` and `selection:bg-[#C9A961]` → `selection:bg-gold-primary`.
- `app/pipeline/page.tsx:85`: `bg-[#FAF9F6]` → `bg-surface`.

- [ ] **Step 6: Verify no near-white arbitrary backgrounds remain**

Run: `grep -rn "bg-\[#F8F9FA\]\|bg-\[#F5F5F5\]\|bg-\[#FAF9F6\]" app/ components/` → expect **no matches**.
Run: `npx tsc --noEmit` (clean) and `npm run build` (succeeds).

- [ ] **Step 7: Visual parity check**

Start the dev server; screenshot `/`, `/pipeline`, and `/contact`. The page backgrounds must look unchanged (all three near-whites were within ~2%). If any page looks visibly different, STOP and report.

- [ ] **Step 8: Commit**

```bash
git add tailwind.config.ts app/globals.css app/layout.tsx app/page.tsx app/not-found.tsx app/error.tsx app/loading.tsx app/pipeline app/innovation/loading.tsx app/contact/loading.tsx app/team/loading.tsx app/news/loading.tsx app/impact/loading.tsx
git commit -m "refactor(tailwind): add surface token, remove unused deep-plum, unify page backgrounds"
```

---

## Task 2 — Wave B: raw hex → existing token + trivial static-inline fixes

**Files (modify):** `components/MilestoneProofBar.tsx`, `components/InnovationSection.tsx`, `components/WhyNowSection.tsx`, `components/GrantHighlight.tsx`, `components/CanvasErrorBoundary.tsx`, `components/SystemicMap.tsx`, `components/Navbar.tsx`, `app/innovation/page.tsx`, `app/test-scene/page.tsx`

Only swap hex that is an EXACT token match, and only in `className` (or in `style` for the trivial static fixes). Do NOT touch dynamic styles, gradients built from `colorFor()`, or SVG `fill`/`stroke`/`stopColor` attributes. Verify each file visually unchanged.

- [ ] **Step 1: `#C9A961` → `gold-primary` (className only)**

Run `grep -rn "#C9A961" components/ app/ --include="*.tsx" | grep -viE "mechanism|PeptideCanvas|shaders"` to list candidates. Convert ONLY className arbitrary values where the whole color equals the token, e.g.:
- `MilestoneProofBar.tsx`: `bg-[#C9A961]/10` → `bg-gold-primary/10`.
- `InnovationSection.tsx`: `border-[#C9A961]/40` → `border-gold-primary/40`.
LEAVE: any `rgba(201,169,97,...)` shadow strings, any `style={{...}}` with `${color}`-built gradients, any SVG attr, and `shadow-[0_0_20px_#C9A961]`-style glows unless an exact existing `shadow-gold-glow*` utility matches (verify visually first — if unsure, leave).

- [ ] **Step 2: `#F3F0F7` → `pastel-plum` (className only)**

- `components/WhyNowSection.tsx:38`: `to-[#F3F0F7]` → `to-pastel-plum`.
- `components/GrantHighlight.tsx:19`: `via-[#F3F0F7]` → `via-pastel-plum` (leave `to-[#E8E4F0]` — no token).
- LEAVE `components/SystemicMap.tsx:92` `stopColor={... "#F3F0F7"}` — it's an SVG attribute.

- [ ] **Step 3: `#E5D4A6` → `gold-light`, `#F5F1E8` → `cream-primary` (className only)**

- `components/InnovationSection.tsx`: `from-[#E5D4A6]/20` → `from-gold-light/20` (verify the line; `#E5D4A6` = `gold-light`).
- `components/CanvasErrorBoundary.tsx:15`: `to-[#F5F1E8]` → `to-cream-primary` (leave the `from-[#FDF6E9]` side — no token).

- [ ] **Step 4: SystemicMap legend dots → tokens (NOT fixed surface)**

In `components/SystemicMap.tsx` legend comorbidity dots: `style={{ background: '#D4A5A5' }}` → `className="... bg-warm-rose"` (drop the inline style); `style={{ background: '#FF6B6B' }}` → `bg-coral-primary`. LEAVE `#9F8CA6` (no token) as an inline style. Also convert the three legend `style={{ letterSpacing: '0.1em' }}` / `'0.05em'` → `tracking-[0.1em]` / `tracking-[0.05em]` classes.

- [ ] **Step 5: Trivial static-inline → class**

- `components/Navbar.tsx`: the underline span `style={{ width: "100%" }}` → `className="w-full"` (merge into existing className; remove the style prop).
- `app/test-scene/page.tsx:27`: `style={{ height: "520px" }}` → `className="h-[520px]"`.
- `app/innovation/page.tsx`: `style={{ opacity: 0.9 }}` → `className="opacity-90"`; and the `style={{ position: 'relative', zIndex: -1 }}` that duplicates existing `relative -z-10` classes → delete the redundant style prop.

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit` (clean), `npm test` (no new failures), `npm run build` (succeeds).
Screenshot `/` (MilestoneProofBar, InnovationSection, WhyNowSection), `/impact` (SystemicMap legend) and confirm visually identical.

- [ ] **Step 7: Commit**

```bash
git add components/ app/innovation/page.tsx app/test-scene/page.tsx
git commit -m "refactor(tailwind): swap exact-match raw hex for tokens, tidy trivial static inline styles"
```

---

## Task 3 — Wave C: `<Eyebrow>` component + migrate

**Files:**
- Create: `components/ui/Eyebrow.tsx`, `__tests__/components/ui/Eyebrow.test.tsx`
- Migrate: the ~18 files using the kicker pattern (see Step 5).

- [ ] **Step 1: Write the failing test** — `__tests__/components/ui/Eyebrow.test.tsx`:
```tsx
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
```

- [ ] **Step 2: Run, verify fail** — `npm test -- Eyebrow` → FAIL (module missing).

- [ ] **Step 3: Implement** — `components/ui/Eyebrow.tsx`:
```tsx
import clsx from "clsx";

export function Eyebrow({
  children,
  tone = "gold",
  className,
}: {
  children: React.ReactNode;
  tone?: "gold" | "plum";
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "text-xs font-bold uppercase tracking-[0.2em]",
        tone === "gold" ? "text-gold-primary" : "text-plum-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 4: Run, verify pass** — `npm test -- Eyebrow` → PASS (3 tests).

- [ ] **Step 5: Migrate the kicker sites**

List them: `grep -rln "uppercase tracking-\[0.2em\]" components/ app/ --include="*.tsx" | grep -viE "mechanism|PeptideCanvas|shaders"`.
For each `<span class="... text-xs font-bold uppercase tracking-[0.2em] text-{gold|plum}-primary ...">TEXT</span>` (or `text-[10px]` variants), replace with `<Eyebrow tone="gold|plum" className="<the remaining size/margin/block classes>">TEXT</Eyebrow>` and add `import { Eyebrow } from "@/components/ui/Eyebrow";`.
- **tone:** `text-gold-primary` → `tone="gold"` (default, omit); `text-plum-primary` → `tone="plum"`.
- **Preserve size/spacing** by passing leftover classes (`mb-6 block`, `text-[10px]`, etc.) via `className`. Drop only the four canonical classes the component supplies (`text-xs font-bold uppercase tracking-[0.2em]` and the tone color). If a site uses `text-[10px]` instead of `text-xs`, keep `text-[10px]` in `className` (it overrides via source order — verify it still renders 10px).

Worked example — `components/InnovationSection.tsx` (kicker `<span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-primary mb-6 block">Our Platform</span>`) becomes:
```tsx
<Eyebrow className="mb-6 block">Our Platform</Eyebrow>
```
Migrate every matching site this way. Only migrate sites that match the kicker pattern; skip any divergent label.

- [ ] **Step 6: Verify migration**

Run: `npx tsc --noEmit` (clean), `npm test` (no new failures), `npm run build` (succeeds).
Screenshot `/`, `/innovation`, `/pipeline` and confirm the kicker labels look identical (same size, color, letter-spacing, position).

- [ ] **Step 7: Commit**

```bash
git add components/ui/Eyebrow.tsx __tests__/components/ui/Eyebrow.test.tsx components/ app/
git commit -m "refactor(ui): extract <Eyebrow> kicker label and migrate sites"
```

---

## Task 4 — Wave C: `<StatusBadge>` component + migrate

**Files:**
- Create: `components/ui/StatusBadge.tsx`, `__tests__/components/ui/StatusBadge.test.tsx`
- Migrate: the static badge-pill sites (Hero, GrantHighlight, MissionPillars, WhyNowSection card ids, PipelinePreview static badges). Do NOT migrate the animated shimmer "IND Cleared" badge.

- [ ] **Step 1: Write the failing test** — `__tests__/components/ui/StatusBadge.test.tsx`:
```tsx
import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBadge } from "@/components/ui/StatusBadge";

describe("StatusBadge", () => {
  it("renders children", () => {
    render(<StatusBadge tone="teal">Lead Diagnostic</StatusBadge>);
    expect(screen.getByText("Lead Diagnostic")).toBeDefined();
  });
  it("applies tone classes", () => {
    render(<StatusBadge tone="gold">G</StatusBadge>);
    const el = screen.getByText("G");
    expect(el.className).toContain("text-gold-primary");
    expect(el.className).toContain("border-gold-primary/20");
    expect(el.className).toContain("rounded-full");
  });
  it("supports teal and plum tones", () => {
    const { rerender } = render(<StatusBadge tone="teal">T</StatusBadge>);
    expect(screen.getByText("T").className).toContain("text-clinical-teal");
    rerender(<StatusBadge tone="plum">P</StatusBadge>);
    expect(screen.getByText("P").className).toContain("text-plum-primary");
  });
});
```

- [ ] **Step 2: Run, verify fail** — `npm test -- StatusBadge` → FAIL.

- [ ] **Step 3: Implement** — `components/ui/StatusBadge.tsx`:
```tsx
import clsx from "clsx";

const TONE: Record<"gold" | "teal" | "plum", string> = {
  gold: "text-gold-primary border-gold-primary/20 bg-gold-primary/10",
  teal: "text-clinical-teal border-clinical-teal/20 bg-clinical-teal/10",
  plum: "text-plum-primary border-plum-primary/20 bg-plum-primary/10",
};

export function StatusBadge({
  children,
  tone,
  className,
}: {
  children: React.ReactNode;
  tone: "gold" | "teal" | "plum";
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border",
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 4: Run, verify pass** — `npm test -- StatusBadge` → PASS (3 tests).

- [ ] **Step 5: Migrate static badge sites**

Find candidates: `grep -rn "rounded-full" components/ --include="*.tsx" | grep -iE "uppercase" | grep -viE "mechanism"`. For each STATIC pill that matches `px-* py-* text-[10px] font-bold uppercase tracking-widest rounded-full border bg-{c}/10 text-{c} border-{c}/20`, replace with `<StatusBadge tone="gold|teal|plum" className="<any leftover positioning>">TEXT</StatusBadge>` and import it.
- **Explicitly DO NOT migrate** the animated shimmer badge in `components/PipelinePreview.tsx` (the `phase === "IND Cleared"` branch with `motion.span` sweep) — it has motion; leave bespoke.
- If a badge's exact padding differs (e.g. `px-2` vs `px-2.5`), pass the override via `className` or leave that site bespoke if it would change the look.

- [ ] **Step 6: Verify** — `npx tsc --noEmit`, `npm test`, `npm run build`; screenshot a page with badges (`/`, `/pipeline`) and confirm identical.

- [ ] **Step 7: Commit**
```bash
git add components/ui/StatusBadge.tsx __tests__/components/ui/StatusBadge.test.tsx components/
git commit -m "refactor(ui): extract <StatusBadge> pill and migrate static badge sites"
```

---

## Task 5 — Wave C: `<DotGrid>` component + migrate

**Files:**
- Create: `components/ui/DotGrid.tsx`, `__tests__/components/ui/DotGrid.test.tsx`
- Migrate: `components/WhyNowSection.tsx`, `components/Testimonials.tsx`, `components/MissionPillars.tsx` (the 3 static `radial-gradient(#4A3B52 1px, transparent 1px)` overlays).

- [ ] **Step 1: Write the failing test** — `__tests__/components/ui/DotGrid.test.tsx`:
```tsx
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
    expect(el.style.backgroundImage).toContain("#4A3B52");
    expect(el.style.backgroundSize).toBe("24px 24px");
  });
});
```

- [ ] **Step 2: Run, verify fail** — `npm test -- DotGrid` → FAIL.

- [ ] **Step 3: Implement** — `components/ui/DotGrid.tsx`:
```tsx
import clsx from "clsx";

export function DotGrid({
  color = "#4A3B52",
  size = 24,
  className,
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={clsx("absolute inset-0 pointer-events-none opacity-[0.03]", className)}
      style={{
        backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}
```

- [ ] **Step 4: Run, verify pass** — `npm test -- DotGrid` → PASS (2 tests).

- [ ] **Step 5: Migrate the 3 static sites**

In `components/WhyNowSection.tsx`, `components/Testimonials.tsx`, `components/MissionPillars.tsx`: replace the dot-grid `<div className="absolute inset-0 opacity-[0.03] ..." style={{ backgroundImage: "radial-gradient(#4A3B52 1px, transparent 1px)", backgroundSize: "24px 24px" }} />` with `<DotGrid />` (the defaults match: color `#4A3B52`, size 24). If a site's opacity/size differs from the defaults, pass props/className to match it exactly. Import `{ DotGrid } from "@/components/ui/DotGrid"`. Preserve whatever wrapper/positioning class the original had via `className` if it wasn't `absolute inset-0 opacity-[0.03]`.
- LEAVE the animated `ImpactSection.tsx` dot-grid (it has a `motion` wrapper) and `MilestoneProofBar.tsx` (white dot, 20px) bespoke unless they match defaults exactly — only migrate the 3 confirmed identical ones.

- [ ] **Step 6: Verify** — `npx tsc --noEmit`, `npm test`, `npm run build`; screenshot `/` (WhyNow, Testimonials, MissionPillars) and confirm the dot texture is identical.

- [ ] **Step 7: Commit**
```bash
git add components/ui/DotGrid.tsx __tests__/components/ui/DotGrid.test.tsx components/
git commit -m "refactor(ui): extract <DotGrid> overlay and migrate static sites"
```

---

## Task 6 — Wave C: `<SectionHeading>` component + migrate

**Files:**
- Create: `components/ui/SectionHeading.tsx`, `__tests__/components/ui/SectionHeading.test.tsx`
- Migrate: only `<h2>` headings that match the canonical `text-5xl md:text-7xl font-serif font-bold text-plum-dark tracking-tighter leading-[0.9]` pattern (WhyNowSection, Testimonials, InnovationSection, PipelinePreview, ImpactSection, GrantHighlight). Skip headings whose size/treatment diverges.

- [ ] **Step 1: Write the failing test** — `__tests__/components/ui/SectionHeading.test.tsx`:
```tsx
import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "@/components/ui/SectionHeading";

describe("SectionHeading", () => {
  it("renders an h2 with its text", () => {
    render(<SectionHeading>Our Pipeline</SectionHeading>);
    const el = screen.getByRole("heading", { level: 2, name: "Our Pipeline" });
    expect(el).toBeDefined();
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
```

- [ ] **Step 2: Run, verify fail** — `npm test -- SectionHeading` → FAIL.

- [ ] **Step 3: Implement** — `components/ui/SectionHeading.tsx`:
```tsx
import clsx from "clsx";

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={clsx(
        "text-5xl md:text-7xl font-serif font-bold text-plum-dark tracking-tighter leading-[0.9]",
        className,
      )}
    >
      {children}
    </h2>
  );
}
```

- [ ] **Step 4: Run, verify pass** — `npm test -- SectionHeading` → PASS (2 tests).

- [ ] **Step 5: Migrate matching headings**

Find candidates: `grep -rn "text-5xl md:text-7xl font-serif font-bold" components/ --include="*.tsx" | grep -viE "mechanism"`. For each `<h2>` that uses the canonical class set, replace with `<SectionHeading className="<leftover classes like mb-12 and any inner spans>">...</SectionHeading>`, preserving inner markup (e.g. the italic gold `<span>`) as children. Import `{ SectionHeading }`.
- Only migrate `<h2>` elements. Do NOT touch `<h1>` page titles or headings with a materially different size pair (e.g. `text-3xl md:text-4xl`) — those stay bespoke to avoid visual change.

Worked example — `components/PipelinePreview.tsx` heading:
```tsx
<h2 className="text-5xl md:text-7xl font-serif font-bold text-plum-dark mb-12 tracking-tighter leading-[0.9]">
  Our <br/> <span className="italic text-gold-primary">Pipeline</span>
</h2>
```
becomes:
```tsx
<SectionHeading className="mb-12">
  Our <br/> <span className="italic text-gold-primary">Pipeline</span>
</SectionHeading>
```

- [ ] **Step 6: Verify** — `npx tsc --noEmit`, `npm test`, `npm run build`; screenshot `/`, `/innovation` and confirm headings render identically (size, weight, color, tracking, line-height, inner gold spans).

- [ ] **Step 7: Commit**
```bash
git add components/ui/SectionHeading.tsx __tests__/components/ui/SectionHeading.test.tsx components/
git commit -m "refactor(ui): extract <SectionHeading> and migrate matching h2s"
```

---

## Task 7 — Wave C: `<CtaButton>` component + migrate clean matches

**Files:**
- Create: `components/ui/CtaButton.tsx`, `__tests__/components/ui/CtaButton.test.tsx`
- Migrate: only NON-magnetic gold CTAs that match the canonical solid pattern. Leave `components/ui/MagneticButton.tsx` and its usages alone (it's the motion-enhanced variant).

Context: `MagneticButton` is a `Link`-only, fixed-size magnetic CTA. The ad-hoc CTAs vary in size and element (`<Link>` vs `<button>`). `CtaButton` provides the shared non-magnetic gold CTA with size variants and supports both link and button forms.

- [ ] **Step 1: Write the failing test** — `__tests__/components/ui/CtaButton.test.tsx`:
```tsx
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CtaButton } from "@/components/ui/CtaButton";

describe("CtaButton", () => {
  it("renders a link when href is given", () => {
    render(<CtaButton href="/pipeline">View Pipeline</CtaButton>);
    const el = screen.getByRole("link", { name: "View Pipeline" });
    expect(el.getAttribute("href")).toBe("/pipeline");
    expect(el.className).toContain("uppercase");
  });
  it("renders a button and fires onClick when no href", () => {
    const onClick = vi.fn();
    render(<CtaButton onClick={onClick}>Send</CtaButton>);
    const el = screen.getByRole("button", { name: "Send" });
    fireEvent.click(el);
    expect(onClick).toHaveBeenCalledOnce();
  });
  it("applies the outline variant classes when variant=outline", () => {
    render(<CtaButton href="/x" variant="outline">Learn</CtaButton>);
    expect(screen.getByRole("link", { name: "Learn" }).className).toContain("border-2");
  });
});
```

- [ ] **Step 2: Run, verify fail** — `npm test -- CtaButton` → FAIL.

- [ ] **Step 3: Implement** — `components/ui/CtaButton.tsx`:
```tsx
import clsx from "clsx";
import Link from "next/link";

type Size = "sm" | "md" | "lg";
type Variant = "solid" | "outline";

const SIZES: Record<Size, string> = {
  sm: "px-6 py-3 text-xs",
  md: "px-8 py-4 text-sm",
  lg: "px-10 py-5 text-sm",
};

function classesFor(size: Size, variant: Variant, className?: string) {
  return clsx(
    "inline-flex items-center justify-center rounded-lg font-bold uppercase tracking-widest transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary",
    SIZES[size],
    variant === "solid"
      ? "bg-plum-primary text-white shadow-sm hover:bg-gold-primary hover:shadow-[0_0_20px_rgba(201,169,97,0.3)]"
      : "border-2 border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-plum-dark",
    className,
  );
}

export function CtaButton({
  children,
  href,
  onClick,
  size = "md",
  variant = "solid",
  className,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  size?: Size;
  variant?: Variant;
  className?: string;
}) {
  const cls = classesFor(size, variant, className);
  if (href) {
    return <Link href={href} className={cls}>{children}</Link>;
  }
  return <button type="button" onClick={onClick} className={cls}>{children}</button>;
}
```

- [ ] **Step 4: Run, verify pass** — `npm test -- CtaButton` → PASS (3 tests).

- [ ] **Step 5: Migrate clean-match CTAs (conservative)**

Find candidates: `grep -rn "hover:bg-gold-primary" components/ app/ --include="*.tsx" | grep -viE "mechanism|MagneticButton"`. Migrate ONLY solid gold CTAs whose classes match the canonical solid pattern and whose size maps to `sm`/`md`/`lg` (px-6/py-3, px-8/py-4, px-10/py-5). Replace with `<CtaButton href="..." size="..." variant="solid|outline">TEXT</CtaButton>`, preserving the destination and any `?subject=` query. Import `{ CtaButton }`.
- LEAVE bespoke (do not migrate): `MagneticButton` and its call sites; any CTA with a custom non-standard size, extra inline SVG arrows, or bespoke hover animation that `CtaButton` wouldn't reproduce exactly. The rule is parity — if migrating would change the look, leave it.
- This task is deliberately conservative; migrating even 3–4 of the ~7 sites is a success. Note in the commit which sites were migrated and which were intentionally left.

- [ ] **Step 6: Verify** — `npx tsc --noEmit`, `npm test`, `npm run build`; screenshot each page whose CTA you migrated and confirm pixel-parity (size, colors, hover).

- [ ] **Step 7: Commit**
```bash
git add components/ui/CtaButton.tsx __tests__/components/ui/CtaButton.test.tsx components/ app/
git commit -m "refactor(ui): add <CtaButton> and migrate clean-match gold CTAs"
```

---

## Task 8 — Final verification & parity sweep

**Files:** none (verification only)

- [ ] **Step 1: Full test suite** — `npm test` → all pass except the 2 pre-existing `Testimonials` failures (no new failures).
- [ ] **Step 2: Types + build** — `npx tsc --noEmit && npm run build` → clean, all routes prerender.
- [ ] **Step 3: Token/hex hygiene greps:**
  - `grep -rn "deep-plum" app/ components/ tailwind.config.ts` → none.
  - `grep -rn "bg-\[#F8F9FA\]\|bg-\[#F5F5F5\]\|bg-\[#FAF9F6\]" app/ components/` → none.
  - Raw `#C9A961` className count is reduced vs baseline (spot-check remaining ones are rgba/gradient/SVG, not plain className).
- [ ] **Step 4: Visual parity walkthrough.** With the dev server up, screenshot `/`, `/pipeline`, `/innovation`, `/impact`, `/contact` and compare against the pre-refactor look. The entire change set must be visually indistinguishable. Mobile check at 375px on `/` and `/pipeline` (no overflow). Any visible difference is a bug — fix or revert the offending change.
- [ ] **Step 5: Final commit**
```bash
git add -A
git commit -m "chore: verification pass for tailwind consistency refactor" --allow-empty
```

---

## Self-Review

**Spec coverage:**
- Part 1 tokens (surface, remove deep-plum, migrate backgrounds) → Task 1. ✓
- Part 2 hex→token + trivial static-inline → Task 2. ✓
- Part 3 components: Eyebrow → T3, StatusBadge → T4, DotGrid → T5, SectionHeading → T6, CtaButton → T7. ✓ (Optional `<DecorationBlobs>` intentionally deferred — noted, not required by spec.)
- Migration strategy waves A/B/C → task ordering. ✓
- Testing & parity verification → per-task Verify steps + Task 8. ✓
- Out-of-scope/fixed-surface guardrails → repeated in header + each task. ✓

**Placeholder scan:** No TBD/TODO. Every component task has full code + tests. Migration steps give exact grep targets, the canonical pattern to match, a worked example, and grep/screenshot acceptance — concrete, not hand-waved. (Broad migrations intentionally specify a rule + example + file-list rather than 18 verbatim edits; acceptance is grep + visual parity.)

**Type/name consistency:** Component names and prop APIs (`Eyebrow tone`, `StatusBadge tone`, `DotGrid color/size`, `SectionHeading`, `CtaButton href/onClick/size/variant`) are consistent between their create-tasks and migration references. All live under `components/ui/`. `clsx` (^2.1.1) confirmed available.

**Risk note:** Parity is the contract — every task ends with a visual check and a "revert if it shifts" rule. The conservative migration framing (only clean matches; leave outliers bespoke) prevents over-extraction churn.
