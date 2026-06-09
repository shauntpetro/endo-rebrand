# EndoCyclic Therapeutics — Agent Instructions

This is the rebrand website for EndoCyclic Therapeutics, a clinical-stage precision medicine company. The site is the strategic diligence front door for investors, partners, and stakeholders.

## Setup

Read these files for full context before making any changes:
- `README.md` — project overview, structure, design choices
- `truth.md` — approved scientific facts. **Only modify when explicitly prompted by the user.** All copy must match this file.
- `program.md` — optimization methodology, editable surface, eval rubric

The repo is a Next.js 16 app (React 19, TypeScript, Tailwind CSS 4, Three.js/R3F, Framer Motion). Dev server runs on port 3000.

```bash
npm install
npm run dev
```

## What you CAN do

Modify content in the **editable surface** components:
- `components/Hero.tsx` — headline, subheadline, badge text
- `components/MilestoneProofBar.tsx` — milestone labels and sublabels
- `components/WhyNowSection.tsx` — card titles and descriptions
- `components/MissionPillars.tsx` — pillar descriptions
- `components/PipelinePreview.tsx` — pipeline items and descriptions
- `components/ImpactSection.tsx` — stats and impact copy

You can also modify page-level files (`app/*/page.tsx`), layout files, API routes, and any component for bug fixes, features, or structural improvements.

## What you CANNOT do

- **Modify `truth.md` without explicit user request** — only update when the user explicitly asks
- **Contradict truth.md** — every claim on the site must be traceable to this file
- **Use prohibited language** — never say "cure" (without "potential"), "guaranteed", "proven", or "safe" (pre-Phase 3). See `truth.md` for full list.
- **Break the design system** — do not modify `tailwind.config.ts` or `app/globals.css` for content experiments
- **Modify 3D visualization code** for content experiments — `PeptideCanvas.tsx`, `mechanism/*`, `shaders/*` are fixed surface

## Design system

| Token | Value | Usage |
|-------|-------|-------|
| Gold | `#C9A961` | Primary accent, CTAs, hover states, focus outlines |
| Plum | `#4A3F5C` | Headings, dark UI elements |
| Plum Dark | `#2E263A` | Dark backgrounds, footer |
| Clinical Teal | `#4A9B8E` | Diagnostic/medical indicators |
| Cream | `#F5F1E8` | Light section backgrounds |
| Black | `#1A1A1A` | Body text |

**Fonts:** Playfair Display (headings), Inter (body), Montserrat (logo)

**Animations:** `shimmer` (2s), `glow-pulse` (3s), `float` (6s) — defined in tailwind.config.ts

## Performance constraints

- Lazy-load heavy sections with `next/dynamic` + `Skeleton` loaders
- SSR disabled for all Canvas/3D components (`ssr: false`)
- GPU detection via `useGPUDetect` hook — degrade gracefully (full 3D → static gradient)
- Target Lighthouse 90+
- `useVisibility` hook triggers scroll animations via IntersectionObserver

## Security

- Contact/newsletter forms: honeypot fields + rate limiting (5 requests/min/IP)
- Security headers in `next.config.ts`: HSTS, X-Frame-Options, CSP basics
- Strip HTML tags from all user input

## Eval criteria

For every content change, score 1-5 on each:
1. **Factual accuracy** — matches truth.md?
2. **10-second clarity** — buyer understands value prop in 10 seconds?
3. **Pharma-grade polish** — passes banker/Stifel review?
4. **CTA conversion** — drives toward partnership/contact?
5. **Performance** — Lighthouse 90+, no jank?

If a change doesn't improve clarity, discard it. Simpler copy beats clever copy. One improvement at a time.

## Key facts (from truth.md)

- **Company:** EndoCyclic Therapeutics, Inc. — Irvine, CA — Founder & CEO: Dr. Tanya Petrossian, PhD
- **Platform:** Precision peptide platform with pH-mediated activation, selective uptake by diseased tissue, non-hormonal
- **ENDO-205:** FDA IND Allowance (2026), Phase 1, first-in-class non-hormonal, short-course disease-modifying therapeutic
- **FemLUNA™:** IND-enabling, first non-invasive endometriosis diagnostic, detects sub-millimeter lesions
- **Disease burden:** 190M+ women, 10% reproductive-age, $200B US cost, $180-250B global market (McKinsey), 8-year diagnostic delay
- **Milestones:** FDA IND Allowance (2026), NIH perfect "10" score, NICHD awards, NIH SBIR Success Story, Milken Institute, Fast Track filing underway, White House recognition
