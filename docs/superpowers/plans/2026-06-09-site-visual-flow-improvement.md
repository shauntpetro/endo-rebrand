# EndoCyclic Site Visual & Flow Improvement — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 4 focused, high-impact upgrades to the EndoCyclic site — a "Matched Pairs" portfolio diagram (pipeline + homepage), a Suppression-vs-Correction mechanism panel + smoother scene transitions, a richer interactive SystemicMap, and homepage flow cleanup.

**Architecture:** Extract the pipeline candidate data into one shared module so `/pipeline`, the homepage, and the new diagram share a single source of truth. Build one new `PortfolioMatrix` component with `full`/`compact` variants used in two places. Add two small, isolated, unit-testable components (`PortfolioMatrix`, `SuppressionCorrection`). Make surgical edits to existing files for the rest. Every claim traces to `truth.md` or the authoritative pipeline data (per the approved spec).

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, lucide-react, Vitest + jsdom + @testing-library/react.

**Spec:** `docs/superpowers/specs/2026-06-09-site-visual-flow-improvement-design.md`

**Brand tokens:** Gold `#C9A961` (therapeutic), Clinical Teal `#4A9B8E` (diagnostic), Plum `#4A3F5C`, Plum Dark `#2E263A`, Cream `#F5F1E8`. Tailwind names already in repo: `gold-primary`, `clinical-teal`, `plum-primary`, `plum-dark`, `cream-primary`, `black-primary`, `black-soft`.

**Do NOT touch:** `truth.md`, `tailwind.config.ts`, `app/globals.css`, `PeptideCanvas.tsx`, `components/mechanism/shaders/*`, `components/mechanism/Scene*.tsx` scientific content.

**Test pattern (every component test uses this header):**
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
  return { motion, AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children), useInView: () => true, useScroll: () => ({ scrollYProgress: { get: () => 0 } }), useTransform: () => 0 };
});
vi.mock("@/hooks/useVisibility", () => ({ useVisibility: () => ({ ref: { current: null }, setRef: vi.fn(), isVisible: true }) }));
```

**Verification commands:**
- Unit tests: `npm test`
- Type/lint: `npx tsc --noEmit` and `npm run lint`
- Visual: dev server on port 3000 via `preview_start`, then `preview_screenshot` / `preview_snapshot` per the harness verification workflow.

---

## File Structure

| File | Responsibility | Create/Modify |
|---|---|---|
| `components/pipeline/pipelineData.ts` | Single source of truth: `PipelineItem` type, `PHASES`, `pipeline[]` (adds `area` field) | **Create** |
| `components/PortfolioMatrix.tsx` | 2×2 "Matched Pairs" diagram, `variant: "full" \| "compact"` | **Create** |
| `components/SuppressionCorrection.tsx` | Side-by-side hormonal-suppression vs ENDO-205-correction panel | **Create** |
| `__tests__/components/pipelineData.test.ts` | Data integrity tests | **Create** |
| `__tests__/components/PortfolioMatrix.test.tsx` | Renders 4 candidates, pair labels, both variants | **Create** |
| `__tests__/components/SuppressionCorrection.test.tsx` | Renders both columns, approved language only | **Create** |
| `__tests__/components/SystemicMap.test.tsx` | Nodes clickable, legend + comorbidity copy present | **Create** |
| `app/pipeline/page.tsx` | Import shared data; mount `<PortfolioMatrix variant="full"/>` above table | **Modify** |
| `components/PipelinePreview.tsx` | Replace `PeptideEngine` octagon with `<PortfolioMatrix variant="compact"/>`; delete `PeptideEngine` | **Modify** |
| `app/innovation/page.tsx` | Mount `<SuppressionCorrection/>` after the "Five Layers" summary | **Modify** |
| `components/mechanism/MechanismCanvas.tsx` | Soften scene transition (crossfade, no scale-pop) + persistent continuity motif | **Modify** |
| `components/SystemicMap.tsx` | Pause-on-inspect, click-to-pin, expanded comorbidity legend | **Modify** |
| `app/page.tsx` | Remove redundant bottom `AchievementBar`; add inner-page cross-link CTA strip | **Modify** |

---

## Task 0: Safety net — initialize git (optional but recommended)

This repo is not currently a git repository, so the per-task "Commit" steps below will fail unless git is initialized. Initialize it once for version safety.

- [ ] **Step 1: Initialize git and make a baseline commit**

```bash
cd /Users/shauntpetrossian/Desktop/endo-rebrand-main
git init
printf "node_modules/\n.next/\n.superpowers/\n.env*\n" >> .gitignore
git add -A
git commit -m "chore: baseline before visual/flow improvements"
```

Expected: a baseline commit is created. (If you prefer not to use git, skip every "Commit" step in this plan.)

---

## Task 1: Extract shared pipeline data

**Files:**
- Create: `components/pipeline/pipelineData.ts`
- Test: `__tests__/components/pipelineData.test.ts`

This is a pure refactor (no behavior change yet) plus one new field (`area`) the matrix needs. Data values are copied verbatim from the current `app/pipeline/page.tsx` so `/pipeline` keeps rendering identically.

- [ ] **Step 1: Write the failing test**

Create `__tests__/components/pipelineData.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { pipeline, PHASES, type PipelineItem } from "@/components/pipeline/pipelineData";

describe("pipelineData", () => {
  it("has exactly four candidates", () => {
    expect(pipeline).toHaveLength(4);
  });

  it("includes both disease areas with a therapeutic+diagnostic pair each", () => {
    const byArea = (area: PipelineItem["area"]) => pipeline.filter(p => p.area === area);
    for (const area of ["Endometriosis", "Oncology"] as const) {
      const items = byArea(area);
      expect(items).toHaveLength(2);
      expect(items.map(i => i.type).sort()).toEqual(["Diagnostic", "Therapeutic"]);
    }
  });

  it("keeps the authoritative ENDO-205 / FemLUNA / ENDO-995 / ENDO-311 identities", () => {
    expect(pipeline.map(p => p.id).sort()).toEqual(["ENDO-205", "ENDO-311", "ENDO-995", "FemLUNA"]);
    const e205 = pipeline.find(p => p.id === "ENDO-205")!;
    expect(e205.area).toBe("Endometriosis");
    expect(e205.type).toBe("Therapeutic");
    expect(PHASES[e205.phase]).toBe("Phase 1");
  });
});
```

- [ ] **Step 2: Run the test, verify it fails**

Run: `npm test -- pipelineData`
Expected: FAIL — cannot resolve `@/components/pipeline/pipelineData`.

- [ ] **Step 3: Create the data module**

Create `components/pipeline/pipelineData.ts`:
```ts
export type CandidateType = "Therapeutic" | "Diagnostic";
export type DiseaseArea = "Endometriosis" | "Oncology";

export interface PipelineItem {
  id: string;
  name: string;
  mechanism: string;
  indication: string;
  area: DiseaseArea;
  phase: number;      // index into PHASES
  progress: number;   // 0-1 progress within phase
  type: CandidateType;
  status: string;
  description: string;
  highlights?: string[];
}

export const PHASES = ["Discovery", "Preclinical", "IND Enabling", "Phase 1", "Phase 2", "Phase 3"];

export const pipeline: PipelineItem[] = [
  {
    id: "ENDO-205",
    name: "ENDO-205",
    mechanism: "Intracellular Peptide Inhibitor",
    indication: "Endometriosis (Non-Hormonal)",
    area: "Endometriosis",
    phase: 3,
    progress: 0.1,
    type: "Therapeutic",
    status: "IND Cleared",
    description: "First-in-class non-hormonal therapeutic targeting the root cause of endometriosis lesions. IND cleared, advancing to clinical trials.",
    highlights: [
      "Short-course treatment under investigation for full and durable lesion clearance",
      "Designed to preserve fertility and avoid hormonal suppression",
      "Targeted mechanism, selectively absorbed by diseased tissue",
    ],
  },
  {
    id: "FemLUNA",
    name: "FemLUNA™",
    mechanism: "Targeted Imaging Agent",
    indication: "Diagnostic Imaging",
    area: "Endometriosis",
    phase: 2,
    progress: 0.5,
    type: "Diagnostic",
    status: "Lead Diagnostic",
    description: "Investigational imaging agent being developed to enable early, accurate, and non-invasive detection of all subtypes of endometriosis, including superficial and sub-millimeter lesions missed by current imaging.",
    highlights: [
      "Developed to visualize all lesion subtypes, including those difficult to detect with standard imaging",
      "Radiation-free, non-hormonal, and free of heavy metals",
      "Intended for use across sensitive populations, including adolescents and reproductive-age women",
      "Compatible with standard and low-field imaging platforms",
    ],
  },
  {
    id: "ENDO-995",
    name: "ENDO-995",
    mechanism: "Tumor-Selective Cyclic Peptide",
    indication: "Malignant Solid Tumors",
    area: "Oncology",
    phase: 1,
    progress: 0.75,
    type: "Therapeutic",
    status: "Preclinical",
    description: "Novel non-hormonal therapeutic peptide in development for malignant solid tumors, with initial focus on colon and endometrial cancers. Designed to overcome therapeutic resistance and restore responsiveness in cold tumors, with potential applicability across 25%+ of all solid tumor types.",
    highlights: [
      "Targets malignant solid tumors with tumor-specific selectivity",
      "Designed to overcome therapeutic resistance and restore responsiveness in cold tumors",
      "Unlocks access to previously undruggable intracellular targets through selective peptide engineering",
    ],
  },
  {
    id: "ENDO-311",
    name: "ENDO-311",
    mechanism: "Targeted Imaging Agent",
    indication: "Solid Tumor Diagnostics",
    area: "Oncology",
    phase: 1,
    progress: 0.6,
    type: "Diagnostic",
    status: "Preclinical",
    description: "Investigational imaging agent for non-invasive detection and monitoring of malignant solid tumors, with initial focus on colon cancer. Radiation-free, non-hormonal, and free of heavy metals. Designed for early-stage tumor localization and disease monitoring.",
    highlights: [
      "Radiation-free, non-hormonal, and free of heavy metals",
      "Compatible with standard imaging systems",
      "Designed for early-stage tumor localization and disease monitoring",
    ],
  },
];
```

- [ ] **Step 4: Run the test, verify it passes**

Run: `npm test -- pipelineData`
Expected: PASS (3 tests).

- [ ] **Step 5: Point `app/pipeline/page.tsx` at the shared data (no visual change)**

In `app/pipeline/page.tsx`:
1. Delete the local `const phases = [...]` (line 10) and the entire `interface PipelineItem {...}` + `const pipeline: PipelineItem[] = [...]` block (lines 12–91).
2. Add this import beneath the existing `import { useState } from "react";` line:
```tsx
import { pipeline, PHASES as phases } from "@/components/pipeline/pipelineData";
```
Everything else in the file already references `phases` and `pipeline`, so no further edits are needed here.

- [ ] **Step 6: Verify pipeline page still type-checks and renders unchanged**

Run: `npx tsc --noEmit`
Expected: no errors.
Then start the dev server (`preview_start`, port 3000), open `/pipeline`, `preview_snapshot`. Expected: the candidate table renders exactly as before (ENDO-205, FemLUNA™, ENDO-995, ENDO-311 with phase bars).

- [ ] **Step 7: Commit**

```bash
git add components/pipeline/pipelineData.ts __tests__/components/pipelineData.test.ts app/pipeline/page.tsx
git commit -m "refactor: extract pipeline data to shared module with area field"
```

---

## Task 2: Build the `PortfolioMatrix` component

**Files:**
- Create: `components/PortfolioMatrix.tsx`
- Test: `__tests__/components/PortfolioMatrix.test.tsx`

The approved diagram (spec Option B, "Detect & Treat" wording): 2×2 grid, columns = disease area, rows = modality, each column a "Detect & Treat — matched pair". `variant="full"` for `/pipeline`, `variant="compact"` for the homepage card.

- [ ] **Step 1: Write the failing test**

Create `__tests__/components/PortfolioMatrix.test.tsx`:
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
vi.mock("@/hooks/useVisibility", () => ({ useVisibility: () => ({ ref: { current: null }, setRef: vi.fn(), isVisible: true }) }));

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
```

- [ ] **Step 2: Run the test, verify it fails**

Run: `npm test -- PortfolioMatrix`
Expected: FAIL — cannot resolve `@/components/PortfolioMatrix`.

- [ ] **Step 3: Implement the component**

Create `components/PortfolioMatrix.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import { pipeline, PHASES, type PipelineItem, type DiseaseArea } from "@/components/pipeline/pipelineData";

const AREAS: { key: DiseaseArea; sub: string }[] = [
  { key: "Endometriosis", sub: "Women's Health" },
  { key: "Oncology", sub: "Solid Tumors" },
];

function colorFor(type: PipelineItem["type"]) {
  return type === "Therapeutic" ? "#C9A961" : "#4A9B8E";
}

function cell(area: DiseaseArea, type: PipelineItem["type"]) {
  return pipeline.find((p) => p.area === area && p.type === type);
}

function Pips({ item }: { item: PipelineItem }) {
  const c = colorFor(item.type);
  return (
    <div className="flex gap-1 items-center mt-2" aria-hidden>
      {PHASES.map((_, i) => (
        <span
          key={i}
          className="h-[5px] flex-1 rounded-full"
          style={{
            background: i <= item.phase ? c : "#ece6dc",
            boxShadow: i === item.phase ? `0 0 0 2px #fff, 0 0 0 4px ${c}` : undefined,
          }}
        />
      ))}
    </div>
  );
}

function Card({ item, compact }: { item: PipelineItem; compact: boolean }) {
  const c = colorFor(item.type);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -3 }}
      className="relative bg-white rounded-2xl border border-[#ece6dc] shadow-[0_10px_30px_-16px_rgba(46,38,58,0.3)] px-4 py-3.5"
    >
      <span className="absolute left-0 top-3.5 bottom-3.5 w-[3px] rounded-full" style={{ background: `linear-gradient(${c}, ${c}33)` }} />
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-serif font-bold text-plum-dark leading-none" style={{ fontSize: compact ? 16 : 20 }}>
          {item.name}
        </span>
        <span
          className="text-[8px] font-extrabold uppercase tracking-[0.12em] px-2 py-[3px] rounded-full border"
          style={{ color: c, borderColor: `${c}55`, background: `${c}0f` }}
        >
          {item.status}
        </span>
      </div>
      {!compact && <p className="text-[10px] font-semibold text-[#857d8a] mt-1.5">{item.mechanism}</p>}
      <Pips item={item} />
      <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-gray-400 mt-1.5">{PHASES[item.phase]}</p>
    </motion.div>
  );
}

export default function PortfolioMatrix({ variant = "full" }: { variant?: "full" | "compact" }) {
  const compact = variant === "compact";
  return (
    <section
      aria-label="Portfolio of matched therapeutic and diagnostic pairs"
      className="relative overflow-hidden rounded-[18px] p-6 md:p-8"
      style={{ background: "linear-gradient(160deg,#F5F1E8 0%,#efe9db 100%)" }}
    >
      <div className="absolute -top-24 -right-16 w-[340px] h-[340px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,#C9A96133,transparent 70%)" }} />
      <div className="relative">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-gold-primary mb-1.5">Therapeutics &amp; Diagnostics · One Platform</p>
        <h3 className="font-serif font-bold text-plum-dark leading-none" style={{ fontSize: compact ? 24 : 30 }}>
          One Platform, <span className="text-gold-primary italic">Matched Pairs</span>
        </h3>
        {!compact && (
          <p className="text-xs text-[#6b6470] max-w-[460px] leading-relaxed mt-2">
            A single precision-peptide engine producing matched pairs — a diagnostic to find disease and a therapeutic to clear it — across two disease areas.
          </p>
        )}

        <div className="grid mt-5" style={{ gridTemplateColumns: "26px 1fr 1fr", gap: 12 }}>
          <div />
          {AREAS.map((a) => (
            <div key={a.key} className="text-center font-serif italic text-plum-primary" style={{ fontSize: compact ? 14 : 17 }}>
              {a.key}
              <span className="block not-italic font-sans text-[8px] font-bold tracking-[0.18em] uppercase text-[#9b93a3] mt-0.5">{a.sub}</span>
            </div>
          ))}

          {(["Therapeutic", "Diagnostic"] as const).map((type, rowIdx) => (
            <RowGroup key={type} type={type} compact={compact} showPairTag={rowIdx === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RowGroup({ type, compact, showPairTag }: { type: PipelineItem["type"]; compact: boolean; showPairTag: boolean }) {
  return (
    <>
      <div className="[writing-mode:vertical-rl] rotate-180 flex items-center justify-center text-[9px] font-extrabold tracking-[0.2em] uppercase text-[#8a8290]">
        {type}
      </div>
      {AREAS.map((a) => {
        const item = cell(a.key, type);
        return <div key={a.key}>{item ? <Card item={item} compact={compact} /> : null}</div>;
      })}
      {showPairTag && (
        <div className="col-start-2 col-end-4 flex justify-around -my-0.5">
          {AREAS.map((a) => (
            <span key={a.key} className="text-[8.5px] font-extrabold tracking-[0.14em] uppercase text-gold-primary flex items-center gap-1.5 before:content-[''] before:w-4 before:h-px before:bg-gold-primary/40 after:content-[''] after:w-4 after:h-px after:bg-gold-primary/40">
              Detect &amp; Treat — matched pair
            </span>
          ))}
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 4: Run the test, verify it passes**

Run: `npm test -- PortfolioMatrix`
Expected: PASS (4 tests).

- [ ] **Step 5: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add components/PortfolioMatrix.tsx __tests__/components/PortfolioMatrix.test.tsx
git commit -m "feat: add PortfolioMatrix matched-pairs diagram (full + compact)"
```

---

## Task 3: Mount the full matrix on `/pipeline`

**Files:**
- Modify: `app/pipeline/page.tsx`

- [ ] **Step 1: Import the component**

Add beneath the `import { pipeline, PHASES as phases } ...` line added in Task 1:
```tsx
import PortfolioMatrix from "@/components/PortfolioMatrix";
```

- [ ] **Step 2: Insert the matrix between the page header and the filter controls**

In `app/pipeline/page.tsx`, the header block ends with a `</div>` closing `<div className="max-w-4xl mb-20">` (around line 193), immediately before the `{/* Controls */}` comment. Insert this block in that gap:
```tsx
        {/* Portfolio overview diagram */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-16"
        >
          <PortfolioMatrix variant="full" />
        </motion.div>
```

- [ ] **Step 3: Verify in the browser**

Run: `npx tsc --noEmit` (expect no errors). Start/refresh dev server, open `/pipeline`, `preview_screenshot`.
Expected: the cream 2×2 matrix appears above the existing filter pills + candidate table; the table still works.

- [ ] **Step 4: Commit**

```bash
git add app/pipeline/page.tsx
git commit -m "feat: surface PortfolioMatrix at top of pipeline page"
```

---

## Task 4: Swap the homepage octagon for the compact matrix

**Files:**
- Modify: `components/PipelinePreview.tsx`

The `PeptideEngine` function (lines ~66–349) is the primitive octagon visual. Replace its usage with the compact matrix and delete the function.

- [ ] **Step 1: Add the import**

At the top of `components/PipelinePreview.tsx`, add:
```tsx
import PortfolioMatrix from "@/components/PortfolioMatrix";
```

- [ ] **Step 2: Delete the `PeptideEngine` function**

Delete the entire `function PeptideEngine() { ... }` block (from `function PeptideEngine()` through its closing `}` — lines ~66–349). Leave the `PipelineItem` component above it and `PipelinePreview` below it intact.

- [ ] **Step 3: Replace the visual content with the compact matrix**

In `PipelinePreview`, find the inner visual block (the `<div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">` containing `<PeptideEngine />` and the "Precision Medicine" overlay label). Replace that entire `<div className="absolute inset-0 ...">...</div>` with:
```tsx
             <div className="absolute inset-0 flex items-center justify-center p-4 bg-gradient-to-br from-white to-gray-50">
               <div className="w-full">
                 <PortfolioMatrix variant="compact" />
               </div>
             </div>
```

- [ ] **Step 4: Clean up now-unused imports**

In the top `import React, { useEffect, useState, useRef, useCallback } from "react";`, remove the identifiers no longer used after deleting `PeptideEngine`. After deletion, only `useRef` is still used (in `PipelinePreview`). Change that import to:
```tsx
import React, { useRef } from "react";
```
Leave `useVisibility` imported — it is still used by the `PipelineItem` component at the top of the file.

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit` and `npm run lint`.
Expected: no errors, no unused-variable warnings.
Refresh the homepage, scroll to the "Our Pipeline" section, `preview_screenshot`.
Expected: the left card now shows the compact "Matched Pairs" matrix instead of the octagon; the right-side copy + "View Pipeline" CTA are unchanged.

- [ ] **Step 6: Commit**

```bash
git add components/PipelinePreview.tsx
git commit -m "feat: replace homepage octagon engine with compact PortfolioMatrix"
```

---

## Task 5: Suppression-vs-Correction mechanism panel

**Files:**
- Create: `components/SuppressionCorrection.tsx`
- Test: `__tests__/components/SuppressionCorrection.test.tsx`
- Modify: `app/innovation/page.tsx`

Approved language only ("non-hormonal", "designed to eliminate", "correction, not destruction", "short-course"). No prohibited words ("cure" w/o "potential", "guaranteed", "proven", "safe").

- [ ] **Step 1: Write the failing test**

Create `__tests__/components/SuppressionCorrection.test.tsx`:
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
    // "cure" only allowed with "potential"; assert the bare word is absent
    expect(text).not.toMatch(/\bcure\b/);
    expect(text).toContain("non-hormonal");
  });
});
```

- [ ] **Step 2: Run, verify it fails**

Run: `npm test -- SuppressionCorrection`
Expected: FAIL — cannot resolve module.

- [ ] **Step 3: Implement the component**

Create `components/SuppressionCorrection.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";

const LEFT = {
  eyebrow: "Today's Hormonal Drugs",
  title: "System-Wide Suppression",
  points: [
    "Act across the whole body, not just diseased tissue",
    "Hormonal — can suppress fertility and carry systemic side effects",
    "Manage symptoms while lesions remain in place",
    "Require continuous, long-term dosing",
  ],
};

const RIGHT = {
  eyebrow: "ENDO-205",
  title: "Targeted Correction",
  points: [
    "Acts only in diseased tissue via a pH-gated mechanism",
    "Non-hormonal — designed to preserve fertility",
    "Designed to eliminate lesions, not just mask symptoms",
    "Short-course, disease-modifying by design",
  ],
};

function Column({ data, accent, dim }: { data: typeof LEFT; accent: string; dim?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative rounded-2xl border p-7 md:p-8 h-full ${dim ? "bg-gray-50 border-gray-200" : "bg-white border-gold-primary/30 shadow-[0_20px_50px_-24px_rgba(201,169,97,0.4)]"}`}
    >
      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]" style={{ color: accent }}>{data.eyebrow}</span>
      <h3 className={`font-serif font-bold mt-2 mb-6 text-2xl md:text-3xl ${dim ? "text-gray-500" : "text-plum-dark"}`}>{data.title}</h3>
      <ul className="space-y-3.5">
        {data.points.map((p) => (
          <li key={p} className="flex items-start gap-3 text-sm leading-relaxed">
            <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: accent, opacity: dim ? 0.5 : 1 }} />
            <span className={dim ? "text-gray-500" : "text-black-soft"}>{p}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function SuppressionCorrection() {
  return (
    <section className="py-24 bg-cream-primary relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-primary mb-4 block">The Difference</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black-primary">Suppression vs. Correction</h2>
          <p className="text-lg text-black-soft font-light mt-5 leading-relaxed">
            Conventional therapy quiets the whole system. ENDO-205 is designed to act only where disease lives — correction, not destruction.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
          <Column data={LEFT} accent="#9b93a3" dim />
          <Column data={RIGHT} accent="#C9A961" />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test, verify it passes**

Run: `npm test -- SuppressionCorrection`
Expected: PASS (2 tests).

- [ ] **Step 5: Mount it on the innovation page**

In `app/innovation/page.tsx`:
1. Add the import after the existing `import Link from "next/link";`:
```tsx
import SuppressionCorrection from "@/components/SuppressionCorrection";
```
2. The "Mechanism Summary Bridge" section closes with `</section>` right before the `{/* CEO Quote Section */}` comment (around line 366–368). Insert the component on its own line in that gap:
```tsx
      <SuppressionCorrection />

      {/* CEO Quote Section */}
```

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit`. Refresh `/innovation`, scroll past "Five Layers of Precision", `preview_screenshot`.
Expected: a two-column cream panel — muted "System-Wide Suppression" left, gold-accented "Targeted Correction / ENDO-205" right — appears before the CEO quote.

- [ ] **Step 7: Commit**

```bash
git add components/SuppressionCorrection.tsx __tests__/components/SuppressionCorrection.test.tsx app/innovation/page.tsx
git commit -m "feat: add Suppression vs Correction panel to innovation page"
```

---

## Task 6: Smooth the mechanism scene transitions

**Files:**
- Modify: `components/mechanism/MechanismCanvas.tsx`

The sticky numbered rail already exists on the innovation page, so this task is *only* about replacing the abrupt per-scene `scale 0.98 → 1.02` pop with a gentle crossfade and adding a constant background motif so the container reads as continuous. Do not touch scene scientific content.

- [ ] **Step 1: Replace `mode="wait"` with a crossfade**

In `components/mechanism/MechanismCanvas.tsx`, change the opening tag `<AnimatePresence mode="wait">` to `<AnimatePresence mode="popLayout">`. (Removes the hard out-before-in gap so scenes cross-dissolve.)

- [ ] **Step 2: Soften every scene's motion props**

There are five `<motion.div key="sceneN" ...>` wrappers, each with:
```tsx
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
```
Replace all five occurrences with a calmer crossfade (no scale pop, slightly longer):
```tsx
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
```
(Use Edit with `replace_all` on the exact four-line block since all five are identical.)

- [ ] **Step 3: Add a persistent continuity motif behind the scenes**

Inside the inner `<div className="w-full h-full relative">` (the wrapper around `{children}` and `<AnimatePresence>`), add this as the FIRST child, before `{children}`:
```tsx
          {/* Persistent continuity motif — constant across all scenes */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, #C9A961 0%, transparent 60%), linear-gradient(#A68945 1px, transparent 1px), linear-gradient(90deg, #A68945 1px, transparent 1px)",
              backgroundSize: "100% 100%, 28px 28px, 28px 28px",
            }}
          />
```

- [ ] **Step 4: Verify motion + scenes still render**

Run: `npx tsc --noEmit`. Refresh `/innovation`, scroll slowly through the 5 mechanism steps, capture `preview_screenshot` at two different steps.
Expected: scenes cross-dissolve smoothly (no scale jump); a faint constant grid/glow sits behind every scene. The sticky stepper still advances 1→5.

- [ ] **Step 5: Commit**

```bash
git add components/mechanism/MechanismCanvas.tsx
git commit -m "feat: cross-dissolve mechanism scenes with persistent continuity motif"
```

---

## Task 7: Upgrade the SystemicMap (pause-on-inspect, click-to-pin, comorbidity legend)

**Files:**
- Modify: `components/SystemicMap.tsx`
- Test: `__tests__/components/SystemicMap.test.tsx`

No fabricated numbers. Add qualitative comorbidity grouping + legend traceable to `truth.md` (cardiovascular disease, increased cancer risk, inflammatory conditions). Pause beams while a node is being inspected; allow click-to-pin so a node stays open.

- [ ] **Step 1: Write the failing test**

Create `__tests__/components/SystemicMap.test.tsx`:
```tsx
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
    expect(screen.getByText(/Primary site of endometrial implants/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Run, verify it fails**

Run: `npm test -- SystemicMap`
Expected: FAIL — legend copy + click-to-pin not implemented.

- [ ] **Step 3: Add pin state and pause logic**

In `components/SystemicMap.tsx`, replace:
```tsx
  const { ref: visRef, isVisible } = useVisibility();
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const isDark = theme === "dark";
```
with:
```tsx
  const { ref: visRef, isVisible } = useVisibility();
  const [hoverNode, setHoverNode] = useState<number | null>(null);
  const [pinnedNode, setPinnedNode] = useState<number | null>(null);
  const activeNode = pinnedNode ?? hoverNode;
  const beamsActive = isVisible && activeNode === null; // pause beams while inspecting
  const isDark = theme === "dark";
```

- [ ] **Step 4: Gate the scan + particle animations on `beamsActive`**

In the "Scanning Effect" `motion.div`, change `animate={isVisible ? {` to `animate={beamsActive ? {` and `transition={isVisible ? {` to `transition={beamsActive ? {`.
In the "Particle Flow Animation" `motion.circle`, likewise change both `isVisible ?` guards to `beamsActive ?`.
(Leave the static connection lines' `whileInView` untouched.)

- [ ] **Step 5: Wire click-to-pin and hover on the node buttons**

In the "Interactive Nodes" map, replace the four handlers:
```tsx
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                onFocus={() => setActiveNode(node.id)}
                onBlur={() => setActiveNode(null)}
```
with:
```tsx
                onMouseEnter={() => setHoverNode(node.id)}
                onMouseLeave={() => setHoverNode(null)}
                onFocus={() => setHoverNode(node.id)}
                onBlur={() => setHoverNode(null)}
                onClick={() => setPinnedNode((p) => (p === node.id ? null : node.id))}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setPinnedNode((p) => (p === node.id ? null : node.id)); } }}
```

- [ ] **Step 6: Expand the legend with the comorbidity grouping**

Replace the contents of the "Legend Panel - Bottom Right" `motion.div` (the inner `<h3>…</h3>`, `<p>…</p>`, and the Origin/Target `<div className="flex items-center gap-4">…</div>`) with:
```tsx
        <h3 className={`text-[10px] font-bold ${isDark ? 'text-gold-primary' : 'text-gray-500'} uppercase mb-2`} style={{ letterSpacing: '0.1em' }}>
          Systemic Impact Map
        </h3>
        <p className={`text-[11px] ${isDark ? 'text-gray-300' : 'text-gray-500'} leading-relaxed mb-3`}>
          Endometriosis is systemic. Hover or click a site to inspect; beams pause while you read.
        </p>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-gold-primary' : 'bg-plum-primary'} shadow-sm`} />
            <span className="text-[10px] font-semibold text-gray-600 uppercase" style={{ letterSpacing: '0.05em' }}>Origin</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gold-primary shadow-sm" />
            <span className="text-[10px] font-semibold text-gray-600 uppercase" style={{ letterSpacing: '0.05em' }}>Target</span>
          </div>
        </div>
        <div className={`pt-3 border-t ${isDark ? 'border-plum-primary/30' : 'border-gray-200'}`}>
          <p className={`text-[9px] font-bold uppercase tracking-[0.08em] ${isDark ? 'text-gold-primary' : 'text-gray-400'} mb-1.5`}>Associated comorbidities</p>
          <ul className={`text-[10px] ${isDark ? 'text-gray-300' : 'text-gray-500'} space-y-1`}>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: '#D4A5A5' }} /> Cardiovascular disease</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: '#FF6B6B' }} /> Increased cancer risk</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: '#9F8CA6' }} /> Inflammatory conditions</li>
          </ul>
        </div>
```
(Widen the panel if needed: in that same `motion.div`, change `max-w-[220px]` to `max-w-[240px]`.)

- [ ] **Step 7: Run the test, verify it passes**

Run: `npm test -- SystemicMap`
Expected: PASS (2 tests).

- [ ] **Step 8: Verify in browser**

Run: `npx tsc --noEmit`. Open `/impact`, `preview_snapshot`; `preview_click` a node and confirm its panel stays pinned; capture `preview_screenshot`.
Expected: legend shows Origin/Target + an "Associated comorbidities" group (Cardiovascular / cancer risk / Inflammatory); clicking a node pins its description and the particle beams stop until you click it again.

- [ ] **Step 9: Commit**

```bash
git add components/SystemicMap.tsx __tests__/components/SystemicMap.test.tsx
git commit -m "feat: SystemicMap pause-on-inspect, click-to-pin, comorbidity legend"
```

---

## Task 8: Homepage flow cleanup

**Files:**
- Modify: `app/page.tsx`

Two changes: (a) remove the redundant second `AchievementBar` (identical 7-logo ticker), (b) add a small "continue exploring" cross-link strip so the homepage explicitly routes to the science pages.

- [ ] **Step 1: Remove the redundant bottom `AchievementBar`**

In `app/page.tsx`, in the returned JSX, delete the second `<AchievementBar />` (the one on line ~57, between `<ImpactSection />` and `<Footer />`). Keep the top `<AchievementBar theme="light" />`.

- [ ] **Step 2: Add a cross-link CTA strip before the footer**

Add this import at the top of `app/page.tsx` (it is a server component, so use a plain `<a>`/`next/link` — `Link` works in server components):
```tsx
import Link from "next/link";
```
Then, in place of the just-removed bottom `AchievementBar` (between `<ImpactSection />` and `<Footer />`), insert:
```tsx
      <section className="bg-plum-dark text-white py-16">
        <div className="container mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-primary mb-8 text-center">Continue Exploring</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { href: "/innovation", title: "The Mechanism", desc: "How our peptides act only in diseased tissue" },
              { href: "/imaging", title: "How We Detect It", desc: "FemLUNA™ non-invasive imaging" },
              { href: "/pipeline", title: "How We Treat It", desc: "Our matched therapeutic & diagnostic pairs" },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="group rounded-xl border border-white/10 hover:border-gold-primary/50 bg-white/5 hover:bg-white/10 p-6 transition-all duration-300">
                <div className="text-lg font-serif font-bold mb-1 group-hover:text-gold-primary transition-colors">{c.title}</div>
                <div className="text-sm text-white/60 leading-relaxed">{c.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`. Refresh the homepage, scroll to the bottom, `preview_screenshot`.
Expected: the partner ticker appears only once (near the top); above the footer there is now a 3-card "Continue Exploring" strip linking to Innovation / Imaging / Pipeline. Confirm each link navigates (`preview_click` one, then `preview_snapshot`).

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: de-dupe homepage partner ticker, add science cross-link strip"
```

---

## Task 9: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Run the whole test suite**

Run: `npm test`
Expected: all suites pass, including the 4 new component tests and the existing Hero/Testimonials/Navbar/API tests.

- [ ] **Step 2: Type-check and lint the whole project**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Production build smoke test**

Run: `npm run build`
Expected: build completes with no errors (catches SSR/`"use client"` regressions the dev server hides).

- [ ] **Step 4: Visual walkthrough of every touched surface**

With the dev server running, screenshot each: `/` (compact matrix + single ticker + cross-link strip), `/pipeline` (full matrix above table), `/innovation` (Suppression vs Correction panel + smooth scene crossfade), `/impact` (pinned node + comorbidity legend). Confirm no layout breakage at mobile width via `preview_resize` (375px) on `/` and `/pipeline`.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: verification pass for visual/flow improvements"
```

---

## Post-implementation note (not a code task)

`truth.md` is now stale on ENDO-995 / ENDO-311 (the site treats them as the oncology therapeutic + companion diagnostic pair; `truth.md` still lists ENDO-995 as "maintenance therapy" and ENDO-311 as "colorectal cancer"). Per the spec decision, the **site code is authoritative** and `truth.md` was intentionally not modified. **Action for the user:** refresh `truth.md` so the approved-facts file matches the live portfolio.

---

## Self-Review

**Spec coverage:**
- Flagship 1 (Matched Pairs diagram, full + compact) → Tasks 1–4. ✓
- Flagship 2a (Suppression vs Correction) → Task 5. ✓
- Flagship 2b (scene continuity) → Task 6 (scoped down since the numbered rail already exists). ✓
- Flagship 3 (SystemicMap: pause/click + comorbidity legend, no fabricated data) → Task 7. ✓
- Flagship 4 (homepage flow: de-dupe AchievementBar + cross-links; octagon→matrix swap) → Tasks 4 & 8. ✓
- "No truth.md edits" + stale-data note → Post-implementation note. ✓

**Placeholder scan:** No TBD/TODO; every code step has complete code; tests are concrete.

**Type consistency:** `PipelineItem`, `PHASES`, `DiseaseArea`, `CandidateType` defined in Task 1 and consumed consistently in `PortfolioMatrix` (Task 2) and the pipeline page (Task 1 Step 5). `variant: "full" | "compact"` consistent across Tasks 2–4. `hoverNode`/`pinnedNode`/`activeNode`/`beamsActive` introduced and used consistently within Task 7.

**Known environmental caveat:** Repo is not git-initialized (Task 0 handles this). If skipped, ignore all "Commit" steps.
