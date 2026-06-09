# EndoCyclic Therapeutics — Rebrand Website

EndoCyclic Therapeutics is a clinical-stage precision medicine company building cyclic peptide therapeutics for endometriosis, oncology, and diagnostics. This is their rebrand website — a strategic diligence front door for investors, partners, and stakeholders. The site communicates the company's IND-cleared pipeline, NIH-backed platform, and the $200B unmet need in women's health through interactive 3D visualizations, scroll-driven storytelling, and pharma-grade copy.

## How it works

The repo has a deliberate separation between what's fixed and what's editable, modeled after [karpathy/autoresearch](https://github.com/karpathy/autoresearch). Three files define the boundaries:

- **`truth.md`** — approved scientific facts. Single source of truth for all website copy. Not modified without regulatory review. This is the equivalent of `prepare.py` — the immutable foundation.
- **`program.md`** — optimization instructions for AI agents working on the site. Defines the editable surface, evaluation criteria, and keep/discard discipline. **This file is edited and iterated on by the human.**
- **`components/*.tsx`** — the editable surface. Homepage section components where copy, layout, and presentation are iterated. **These files are edited by the agent**, always checked against `truth.md`.

By design, every content change is evaluated against a **5-point rubric**: factual accuracy, 10-second clarity, pharma-grade polish, CTA conversion strength, and Lighthouse performance. Changes that don't improve clarity get discarded.

## Quick start

**Requirements:** Node >=20.9.0, npm >=10.0.0.

```bash
# 1. Install dependencies
npm install

# 2. Run development server (http://localhost:3000)
npm run dev

# 3. Production build + start
npm run build
npm start

# 4. Lint
npm run lint
```

## Project structure

```
truth.md            — approved scientific facts (do not modify)
program.md          — agent optimization instructions (human edits this)
app/
  page.tsx          — homepage (composes section components)
  layout.tsx        — root layout (fonts, metadata, JSON-LD)
  template.tsx      — page transitions (Framer Motion)
  innovation/       — mechanism of action (3D scroll-driven scenes)
  pipeline/         — pipeline candidates with phase tracking
  imaging/          — FemLUNA diagnostic imaging
  impact/           — disease burden statistics
  team/             — team profiles
  news/             — news & media
  contact/          — contact form + newsletter
  api/contact/      — form submission (rate-limited, honeypot)
  api/newsletter/   — newsletter signup
components/
  Hero.tsx          — hero with 3D peptide canvas background
  Navbar.tsx        — navigation (desktop + mobile, scroll-aware)
  Footer.tsx        — multi-column footer
  PipelinePreview.tsx — interactive peptide engine + pipeline items
  ImpactSection.tsx — animated stat counters (190M, 10%, $200B, 8yr)
  MilestoneProofBar.tsx — IND / Fast Track / NIH milestone badges
  WhyNowSection.tsx — 3-card inflection point
  MissionPillars.tsx — Women's Health / Oncology / Diagnostics
  InnovationSection.tsx — feature listing
  AchievementBar.tsx — recognition badges
  GrantHighlight.tsx — NIH perfect score showcase
  CredibilitySection.tsx — partner/funder logos
  TransitionStatement.tsx — bridge section
  mechanism/        — 3D scenes (Scene1-5, PeptideRing, EfficacyGraph)
  shaders/          — custom Three.js shader materials
  ui/               — MagneticButton, Skeleton loaders
hooks/
  useGPUDetect.ts   — GPU capability detection (high/low/none)
  useVisibility.ts  — IntersectionObserver for scroll-triggered animations
public/             — logos, badges, team photos, SVG patterns
```

## Design choices

- **Editable surface.** The agent only modifies content in specific homepage section components. This keeps diffs reviewable and prevents accidental design system changes. The fixed surface (`truth.md`, `tailwind.config.ts`, `globals.css`, `mechanism/*`, `PeptideCanvas.tsx`) is never touched for content experiments.

- **Pharma-grade accuracy.** Every piece of copy is checked against `truth.md`. Say "curative potential", never "cure". Say "clinical-stage", never "early-stage". No efficacy claims without data. This isn't marketing — it's regulated communication.

- **GPU-aware 3D.** The site uses Three.js/React Three Fiber for interactive peptide and mechanism visualizations. `useGPUDetect` returns "high", "low", or "none" and the site degrades gracefully — full 3D on capable hardware, static gradient fallback on low-end devices. All 3D components are loaded with `next/dynamic` and `ssr: false`.

- **One metric per section.** Every homepage section should answer one question in 10 seconds. This constraint keeps copy focused and prevents feature creep in messaging.

- **Keep/discard discipline.** Content changes follow a strict loop: propose → implement → evaluate against rubric → keep or discard. No accumulation of "nice to have" changes that dilute clarity.

## Tech stack

- **Next.js 16** with React 19, TypeScript, App Router
- **Tailwind CSS 4** with custom Swiss-style color palette
- **Three.js** / React Three Fiber / Drei for 3D visualizations
- **Framer Motion** for scroll animations and page transitions
- **Lucide React** for icons
- **Railway** for deployment (auto-deploys on push to main)

## Pipeline

| Candidate | Type | Indication | Phase | Status |
|-----------|------|-----------|-------|--------|
| ENDO-205 | Therapeutic | Endometriosis | Phase 1 | IND Cleared |
| FemLUNA™ | Diagnostic | Endo Imaging | IND-enabling | Lead Diagnostic |
| ENDO-995 | Therapeutic | Solid Tumors | Preclinical | Preclinical |
| ENDO-311 | Diagnostic | Tumor Diagnostics | Preclinical | Preclinical |

## Deployment

Deployed on [Railway](https://railway.app). See `DEPLOYMENT.md` for step-by-step instructions. Railway auto-deploys on push to `main`.

## License

Proprietary. EndoCyclic Therapeutics, Inc.
