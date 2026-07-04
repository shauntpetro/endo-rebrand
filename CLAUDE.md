# EndoCyclic Therapeutics — Agent Instructions

This is the rebrand website for EndoCyclic Therapeutics, a clinical-stage precision medicine company. The site is the strategic diligence front door for investors, partners, and stakeholders.

## Setup

Read these files for full context before making any changes:
- `README.md` — project overview, structure, design choices
- `truth.md` — approved scientific facts. **Only modify when explicitly prompted by the user.** All copy must match this file.
- `program.md` — optimization methodology, editable surface, eval rubric

The repo is a Next.js 16 app (React 19, TypeScript, Tailwind CSS 4, Framer Motion). Dev server runs on port 3000. The site uses the **"Kinetic Editorial"** design system (2026 ground-up redesign): a warm gallery-white ground, oversized Fraunces display type, dossier folios, restrained gold, and deep plum "plates". Mechanism is told in crafted SVG (`components/site/PeptideDiagram.tsx`) — there is no Three.js/WebGL.

```bash
npm install
npm run dev
```

## What you CAN do

Content lives in a few clear places:
- `lib/site.ts` — the shared content/data source (nav, pipeline candidates, disease-burden stats, milestones, partners, contact constants). Every fact here traces to `truth.md`. Edit copy here to keep it consistent across pages.
- `app/page.tsx` and `app/*/page.tsx` — page composition and page-specific copy.
- `components/site/*` — shared, reusable UI (Nav, Footer, Section, Container, Reveal, SplitText, Marquee, CountUp, MagneticButton, Field, PeptideDiagram, FolioHeading, Eyebrow, Rule).

You can also modify layout files, API routes, and any component for bug fixes, features, or structural improvements.

## What you CANNOT do

- **Modify `truth.md` without explicit user request** — only update when the user explicitly asks
- **Contradict truth.md** — every claim on the site must be traceable to this file
- **Use prohibited language** — never say "cure" (without "potential"), "guaranteed", "proven", or "safe" (pre-Phase 3). See `truth.md` for full list.
- **Invent data** — never fabricate efficacy numbers, clearance rates, or claims not in `truth.md`.
- **Break the design system** — the design tokens live in `app/globals.css` (Tailwind v4 `@theme`); there is no `tailwind.config.ts`. Don't redefine tokens or restyle shared primitives for one-off content experiments — reuse `components/site/*` and the utility classes.

## Design system — "Kinetic Editorial"

Tokens are defined in `app/globals.css` under `@theme` and consumed as Tailwind utilities (`bg-paper`, `text-ink`, `text-gold-ink`, `bg-plum-deep`, `border-line`, …).

| Token | Value | Usage |
|-------|-------|-------|
| Paper | `#F7F4EC` | Page ground (warm gallery white) |
| Ink | `#17140F` | Primary text / display headings on paper |
| Ink muted | `#57503F` | Secondary/body text on paper (AA) |
| Gold | `#C9A961` | Decor, rules, large display accents |
| Gold ink | `#7A5E1F` | Gold **text** on paper (AA ~5.5:1) |
| Gold light | `#E3C77E` | Gold text/accent on dark plates (AA) |
| Plum deep | `#241E30` | Dark "plate" backgrounds |
| Plum abyss | `#1A1524` | Deepest plate / footer |
| Paper-on-dark | `#EDE7DA` | Body text on dark plates |
| Teal ink | `#2E6E62` | Diagnostic indicator text (AA) |

**Fonts:** Fraunces (display/serif, variable) via `--font-fraunces`; Hanken Grotesk (body/UI, variable) via `--font-hanken`. The wordmark is the `logo.avif` image asset. No Inter/Playfair/Montserrat/monospace.

**Type/layout utilities (globals.css):** `.t-display`, `.t-h1`–`.t-h3`, `.t-lead`, `.t-body`, `.t-label`, `.t-num`, `.italic-display`, `.container-editorial`, `.container-reading`, `.section-rhythm`, `.klink` (kinetic underline). Motion easing tokens: `--ease-expo`, `--ease-quart`.

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
