# EndoCyclic Therapeutics — Agent Instructions

This is the rebrand website for EndoCyclic Therapeutics, a clinical-stage precision medicine company. The site is the strategic diligence front door for investors, partners, and stakeholders.

## Setup

Read these files for full context before making any changes:
- `README.md` — project overview, structure, design choices
- `truth.md` — approved scientific facts. **Only modify when explicitly prompted by the user.** All copy must match this file.
- `program.md` — optimization methodology, editable surface, eval rubric

The repo is a Next.js 16 app (React 19, TypeScript, Tailwind CSS 4, Framer Motion). Dev server runs on port 3000. The site is a **single-page cinematic "scroll-film"** in a **"Modernist Color-Block" (Bauhaus-tech)** design system (2026 ground-up redesign): saturated plum/ink/gold/teal/cream color-block panels, oversized **Syne** grotesque display type, geometric shapes, and highlight-marker accents. There is **no top nav and no separate content routes** — a persistent HUD navigates the acts, and deep content (pipeline, team, news, contact, investors, media, imaging) opens as in-place **overlays** (deep-linkable via `#!<id>` hashes). No Three.js/WebGL.

```bash
npm install
npm run dev
```

## What you CAN do

Content and structure live in a few clear places:
- `lib/site.ts` — the shared content/data source (pipeline candidates, disease-burden stats, milestones, partners, team bios, news, contact constants). Every fact here traces to `truth.md`. Edit copy here.
- `app/page.tsx` — the film shell (composes the scenes + HUD + overlay host).
- `components/film/scenes/*` — the 8 full-viewport acts (Cover, Problem, Platform, Mechanism, Pipeline [horizontal pin], Proof, Team, Ask).
- `components/film/overlays/*` — the 7 in-place content panels (Pipeline, Team, News, Contact, Invest, Media, Imaging).
- `components/film/*` — the framework (HUD, Scene/HorizontalPin, OverlayHost + `overlay.tsx` context, FilmCTA).
- `components/site/*` — reusable primitives still in use (Reveal, SplitText, Marquee, CountUp, Field, ScrollManager).

You can also modify layout files, API routes, and any component for bug fixes, features, or structural improvements.

## What you CANNOT do

- **Modify `truth.md` without explicit user request** — only update when the user explicitly asks
- **Contradict truth.md** — every claim on the site must be traceable to this file
- **Use prohibited language** — never say "cure" (without "potential"), "guaranteed", "proven", or "safe" (pre-Phase 3). See `truth.md` for full list.
- **Invent data** — never fabricate efficacy numbers, clearance rates, or claims not in `truth.md`.
- **Break the design system** — the design tokens live in `app/globals.css` (Tailwind v4 `@theme`); there is no `tailwind.config.ts`. Don't redefine tokens or restyle the framework (`components/film/*`) for one-off content experiments — reuse the `Scene`/overlay tones, `FilmCTA`, and the utility classes.

## Design system — "Modernist Color-Block" (Bauhaus-tech)

Tokens are in `app/globals.css` under `@theme`, consumed as Tailwind utilities. Sections/panels are **whole saturated color blocks** (via `Scene` / overlay `tone`), not tinted surfaces.

| Token | Value | Usage |
|-------|-------|-------|
| Cream / paper | `#F1EBDD` | Light panel + text on dark |
| Cream-2 | `#E7DCCB` | Deeper cream panel (rhythm) |
| Ink | `#17131C` | Near-black panel + text on light |
| Plum | `#2E263A` | Brand dark panel |
| Gold | `#C9A961` | Solid gold blocks/shapes/accents |
| Gold ink | `#6E551C` | Gold **text** on cream (AA) |
| Gold soft | `#E3C77E` | Gold text/accent on dark (AA) |
| Teal | `#3E8E82` | Solid teal blocks/shapes |
| Teal ink | `#2A5F55` | Teal text on cream (AA) |
| Paper-on-dark | `#F1EBDD` | Text on ink/plum/teal panels |

**Fonts:** **Syne** (grotesque display, variable) via `--font-syne` (mapped to `font-serif`/`.t-*` headings); **Hanken Grotesk** (body/UI) via `--font-hanken`. The wordmark is the `logo.avif` image. No serif, no italics (Syne has none — `.italic-display` is a no-op; accent with color or `.mark-gold`/`.mark-teal`).

**Utilities (globals.css):** `.t-display` (hero words, keep to 1–3 words), `.t-h1`–`.t-h3`, `.t-lead`, `.t-body`, `.t-label`, `.t-num` (big figures); `.mark-gold`/`.mark-teal` (highlight markers); `.shape-dot`/`.shape-bar`/`.shape-half-*` (geometry); `.container-editorial`, `.section-rhythm`, `.klink`. Tailwind text-size utilities override `.t-*` sizes when co-applied (use for small elements). Motion easing: `--ease-expo`, `--ease-quart`.

## Performance & motion constraints

- All motion is transform/opacity/clip-path only; content stays readable if motion can't run.
- Respect reduced motion: `MotionProvider` sets `reducedMotion="user"`; components use framer's `useReducedMotion`.
- Scroll reveals via framer `whileInView` (`components/site/Reveal.tsx`); count-ups via IntersectionObserver (`CountUp.tsx`).
- Target Lighthouse 90+.

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
