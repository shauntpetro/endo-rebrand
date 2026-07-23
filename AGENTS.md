# EndoCyclic Therapeutics — Agent Instructions

This is the rebrand website for EndoCyclic Therapeutics, a clinical-stage precision medicine company. The site is the strategic diligence front door for investors, partners, and stakeholders.

## Setup

Read these files for full context before making any changes:
- `README.md` — project overview, structure, design choices
- `truth.md` — approved scientific facts. **Only modify when explicitly prompted by the user.** All copy must match this file.
- `program.md` — optimization methodology, editable surface, eval rubric

The repo is a Next.js 16 app (React 19, TypeScript, Tailwind CSS 4, Framer Motion). Dev server runs on port 3000. The site is a **clean, conventional multi-page site** in a **"Calm Clinical"** design system (2026 ground-up redesign): a soft off-white ground, muted plum text, gentle clinical-teal accents and soft pastel section washes, **one clean sans (Hanken Grotesk) at modest sizes**, and generous whitespace. Restraint is the point — quiet and refined, not loud. **Nav and Footer live in the root layout** (`app/layout.tsx`); each page is a normal route. No Three.js/WebGL, no scroll-jacking.

```bash
npm install
npm run dev
```

## What you CAN do

Content and structure live in a few clear places:
- `lib/site.ts` — the shared content/data source (nav links, pipeline candidates, disease-burden stats, milestones, partners, team bios, news, contact constants). Every fact here traces to `truth.md`.
- `app/page.tsx` — the homepage (the GOLD-STANDARD reference for the calm style).
- `app/<route>/page.tsx` + `app/<route>/layout.tsx` — the 9 pages (innovation, pipeline, imaging, impact, team, news, contact, investors, media). `page.tsx` is the content (`"use client"` only if it has a form/filter/modal); `layout.tsx` is a server component holding `metadata` + JSON-LD.
- `components/site/*` — the shared UI: `Nav`, `Footer`, `Section`, `Container`, `Eyebrow`, `Button`, `Reveal`, `CountUp`, `Field`, `ScrollManager`.

You can also modify API routes and any component for bug fixes, features, or structural improvements.

## What you CANNOT do

- **Modify `truth.md` without explicit user request** — only update when the user explicitly asks
- **Contradict truth.md** — every claim on the site must be traceable to this file
- **Use prohibited language** — never say "cure" (without "potential"), "guaranteed", "proven", or "safe" (pre-Phase 3). See `truth.md` for full list.
- **Invent data** — never fabricate efficacy numbers, clearance rates, or claims not in `truth.md`.
- **Break the design system** — the design tokens live in `app/globals.css` (Tailwind v4 `@theme`); there is no `tailwind.config.ts`. Keep it calm: reuse `Section` tones + the `.t-*` utility classes and the shared components; don't reach for oversized type, bold color-blocks, or busy decoration.

## Design system — "Calm Clinical"

Tokens are in `app/globals.css` under `@theme`, consumed as Tailwind utilities. Sections are gently washed (`Section tone=…`), not saturated blocks.

| Token | Value | Usage |
|-------|-------|-------|
| Paper | `#FBFAF8` | Primary soft off-white ground |
| Tint plum / teal / warm | `#F4F1F8` / `#EDF5F2` / `#F6F3EE` | Soft section washes for rhythm |
| Ink | `#2E263A` | Headings + strong text (muted plum) |
| Ink body | `#4B4553` | Body text |
| Muted | `#6F6A76` | Secondary / captions (AA on paper) |
| Teal | `#4A9B8E` | Decorative dots/fills |
| Teal ink | `#2F6E62` | Teal **text** / links (AA) |
| Plum | `#2E263A` | Rare dark section (e.g. closing CTA), footer |
| Line | `#2E263A1F` | Hairlines |

**Fonts:** **Hanken Grotesk** only, via `--font-hanken` — headings and body at modest sizes (weight ~500 for headings). The wordmark is the `logo.avif` image. No serif, no display face, no monospace.

**Utilities (globals.css):** `.t-hero` (page H1 — modest, not huge), `.t-h2`, `.t-h3`, `.t-lead`, `.t-body`, `.t-stat` (big figures), `.eyebrow` (small tracked teal label); `.section` (vertical rhythm), `.container-page` / `.container-prose`, `.reveal` (quiet CSS fade-up — always ends visible), `.hairline`, `.link-underline`. Components: `<Section tone="paper|white|tint-plum|tint-teal|tint-warm|plum">`, `<Button variant="primary|ghost|ghost-on-dark|quiet">`, `<Eyebrow>`, `<Reveal delay>`, `<CountUp>`, `Field` (`TextField`/`TextArea`/`SelectField`/`Honeypot`).

Note: don't add a root `loading.tsx`/`template.tsx` — a whole-page Suspense boundary was found to leave content hidden; they were removed on purpose.

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
