# EndoCyclic Therapeutics — "Kinetic Editorial" Ground-Up Redesign

**Date:** 2026-07-03 · **Branch:** `redesign/kinetic-editorial`
**Status:** Approved direction (art direction, palette, scope chosen by user). Building.

This spec is also the **build kit** used to brief page-building agents. Every claim on
the site must trace to `truth.md`. Nothing here may contradict it.

---

## 1. Direction

**Kinetic Editorial** — an editorial science-journal-meets-lookbook. The site reads like
a beautifully art-directed print dossier brought to life:

- **Typography is the hero.** Enormous **Fraunces** serif display, dramatic scale jumps,
  italic emphasis words, generous negative space.
- **Printed-dossier language.** Section folios (`§ 01 — The Problem`), running heads,
  hairline rules, tabular figures, an editorial 12-column grid that is broken on purpose.
- **Warm gallery-white ground** (`#F7F4EC`) with restrained **gold** as the single ink
  highlight, and deep **plum plates** (`#241E30`) for full-bleed dramatic beats.
- **Precise, non-bouncy motion.** Line-masked reveals, character-staggered headlines,
  in-view rises with ease-out-expo, count-ups, a horizontal-scroll pipeline gallery, a
  magnetic CTA, a drawing gold rule. Always degrades to fully-readable static content.

This is a deliberate departure from the previous warm-cream "Luminous Editorial" site:
lighter/cooler gallery ground, far bolder type scale, dossier folios, kinetic motion, and
zero Three.js — mechanism is told in crafted SVG, not a WebGL scene (also removes the
fabricated-efficacy-graph diligence risk).

### Non-negotiables
- Only the logo + official brand assets are used (see §7).
- No prohibited language: never "cure" without "potential", "guaranteed", "proven", or
  "safe" (pre-Phase 3). Use approved language from `truth.md` §"Approved Language".
- Accessibility: WCAG AA contrast, focus-visible rings, reduced-motion safe, keyboard
  operable, semantic landmarks, `alt` on images.

---

## 2. Design tokens (defined in `app/globals.css` `@theme`)

| Token | Value | Use |
|---|---|---|
| `--color-paper` | `#F7F4EC` | Page ground (warm gallery white) |
| `--color-paper-raised` | `#FCFAF4` | Raised cards / insets |
| `--color-ink` | `#17140F` | Primary text, display headings on paper |
| `--color-ink-muted` | `#57503F` | Secondary/body text on paper (7:1) |
| `--color-line` | `rgba(23,20,15,0.14)` | Hairline rules on paper |
| `--color-plum` | `#3B3350` | Secondary headings, mid plum |
| `--color-plum-deep` | `#241E30` | Dark plate backgrounds |
| `--color-plum-abyss` | `#1A1524` | Deepest plate / footer |
| `--color-gold` | `#C9A961` | Brand gold — decor, rules, large display accents |
| `--color-gold-ink` | `#7A5E1F` | Gold **text** on paper (AA, ~5.5:1) |
| `--color-gold-light` | `#E3C77E` | Gold text/accent on dark plates (AA) |
| `--color-paper-on-dark` | `#EDE7DA` | Body text on dark plates |
| `--color-muted-on-dark` | `#B7AE9C` | Secondary text on dark plates (7:1) |
| `--color-teal` | `#3E8E82` | Diagnostic indicator (decor) |
| `--color-teal-ink` | `#2E6E62` | Teal text on paper (AA) |
| `--color-rose` | `#C98B84` | Warm accent (decor only, sparing) |

**Fonts** (next/font/google, both variable): **Fraunces** → `--font-fraunces` (display/serif),
**Hanken Grotesk** → `--font-hanken` (text/UI). Logo remains the image asset. No Inter,
Playfair, Montserrat, or monospace.

**Fluid type scale** (utilities in globals.css):
- `.t-display` hero: `clamp(3rem, 10.5vw, 11rem)`, lh .9, weight ~380, tracking -.03em
- `.t-h1`: `clamp(2.5rem, 7vw, 6rem)` · `.t-h2`: `clamp(2rem, 4.4vw, 3.75rem)`
- `.t-h3`: `clamp(1.4rem, 2.3vw, 2rem)` · `.t-lead`: `clamp(1.15rem, 1.5vw, 1.5rem)`
- body `1.0625rem`/1.7 · `.t-label`: `.75rem` uppercase tracking .18em

**Spacing rhythm:** side gutter `clamp(1.5rem, 5vw, 6rem)`; section gap `clamp(5rem, 12vw, 11rem)`;
max content width `min(100% - 2*gutter, 1400px)`.

---

## 3. Shared components (`components/site/`)

Built first (Phase A); every page composes from these. Do **not** re-invent them.

- `Nav.tsx` — fixed editorial nav; logo image left; links right with kinetic gold underline;
  right-aligned "Partnership" CTA; folio strip; full-screen mobile overlay. Links per §6.
- `Footer.tsx` — dark plum plate; sitemap columns (Platform / Company / Connect); one-line
  newsletter; folio + copyright; LinkedIn + Twitter.
- `Container.tsx` — max-width + fluid gutters. `Section.tsx` — vertical rhythm + `tone`
  (`paper` | `dark`) + optional folio + eyebrow.
- `FolioHeading.tsx` — `§ 01 — Label` running head with hairline.
- `Eyebrow.tsx` — small tracked label with a short gold rule.
- `Reveal.tsx` — in-view translateY/opacity rise (ease-out-expo, once).
- `LineReveal.tsx` / `SplitText.tsx` — masked per-line / per-word/char headline reveal.
- `Marquee.tsx` — seamless logo/validation marquee (pauses on hover, reduced-motion static).
- `CountUp.tsx` — animate integer/number on in-view (reduced-motion → final value).
- `MagneticButton.tsx` — primary/ghost CTA with subtle magnetic pull (pointer-fine only).
- `Field.tsx` — labelled input/textarea/select with error + focus styling.
- `Rule.tsx` — hairline divider (paper/dark variants).
- `PeptideDiagram.tsx` — SVG mechanism schematic: pH gradient → selective uptake →
  correction. Animated draw on view; static-safe. Used on home + innovation. No fake data.
- `ScrollManager.tsx` — restores scroll to top on route change (client).

Shared data: `lib/site.ts` — nav links, pipeline candidates (from `pipelineData` facts),
disease-burden stats, validation/partner logos, contact constants (`info@endocyclic.com`,
LinkedIn, Twitter), route metadata helpers.

---

## 4. Motion & a11y rules
- Framer Motion. `MotionConfig reducedMotion="user"` stays (MotionProvider).
- Only animate `transform`/`opacity`/`clip-path`. Easing: ease-out-expo
  `[0.16,1,0.3,1]` / quart. No bounce/elastic. Durations 0.5–0.9s; stagger 0.06–0.09s.
- Every reveal must leave content readable if motion can't run (no stuck opacity:0 for SSR
  content — use in-view `whileInView` with `initial` guarded by `useReducedMotion`, or CSS
  transform-only reveals like the previous `.reveal-rise` pattern).
- Focus-visible gold ring (2px, offset 2px). Skip-to-content link retained.

---

## 5. Preserved infrastructure (not redesigned)
- `app/api/contact|newsletter|investor/route.ts` — **untouched**. New forms must POST the
  exact fields:
  - contact: `{ name, email, company, subject, message, _honeypot }`; subjects ∈
    `partnership | media | investor | career | general | other | data | report`; message ≥ 10 chars.
  - newsletter: `{ email, _honeypot }`.
  - investor: `{ name, email, company, role, message, _honeypot }`; name/email/company required.
- `components/MotionProvider.tsx`, `components/PostHogProvider.tsx` — kept.
- Sentry configs, `next.config.ts`, `robots.ts`, `sitemap.ts` — kept.
- `public/*` assets reused. `__tests__/api/*` kept; component tests updated/removed as needed.

**Removed** (old visual surface, rebuilt fresh): all `components/*.tsx` except the two
providers; `components/ui/*`, `components/mechanism/*`, `components/pipeline/*`,
`hooks/useGPUDetect|useVisibility`, `app/test-scene/`. Old page bodies replaced.

---

## 6. Pages & prescribed content (all copy traceable to truth.md)

Nav order: Innovation · Pipeline · Imaging · Impact · Team · News & Media(`/news`) ·
Investors · Contact. Footer also links Media Kit(`/media`). Each route keeps its
`layout.tsx` with `metadata` + JSON-LD.

### `/` Home (flagship — built by hand)
1. **Hero** — folio (EndoCyclic / Irvine, CA / Clinical-stage). Kinetic display headline:
   *"Correction, not destruction."* Sub: non-hormonal precision peptide designed to
   eliminate endometriosis lesions — not mask the pain. CTAs: Explore the platform / Partner
   with us. Status chip: FDA IND Allowance · 2026.
2. **Validation marquee** — NIH · NICHD · UCLA · Milken Institute · RADx Tech · White House
   recognition (text set; logos where official assets exist).
3. **The Problem (§01)** — data spread: 190M+ women · 10% of reproductive-age women ·
   $200B US burden · 8-yr diagnostic delay · $180–250B market (McKinsey). Count-ups.
   Framed: current therapies are hormonal, symptomatic, don't modify disease.
4. **The Platform (§02)** — precision peptide platform: pH-mediated activation, selective
   uptake by diseased tissue via endocytic pathway, non-hormonal; acts only in diseased
   tissue, avoiding hormones/surgery/systemic toxicity. `PeptideDiagram`.
5. **Mechanism plate (§03, dark)** — three editorial steps (pH gradient → selective uptake →
   correction). "Designed to act only where disease lives."
6. **Pipeline (§04)** — horizontal editorial gallery of the 4 candidates (ENDO-205,
   FemLUNA™, ENDO-995, ENDO-311) with phase, area, one-line mechanism. Link → /pipeline.
7. **Proof / milestones (§05)** — NIH perfect "10" score, NICHD awards, NIH SBIR Success
   Story, Fast Track filing underway, Milken founding member, White House recognition.
8. **Closing CTA plate (dark)** — "The strategic diligence front door." Partner / Investors.

### `/innovation` — platform & mechanism deep dive
Hero: *"A new grammar for medicine."* Sections: the platform (pH activation, endocytic
selective uptake, non-hormonal); "Correction, not destruction" mechanism (PeptideDiagram,
expanded 5-beat: challenge → cyclic advantage → pH activation → selective uptake → target
engagement, told editorially); platform breadth (therapeutics · diagnostics · oncology;
expanding into additional women's health + oncology); ENDO-205 preclinical facts (eliminated
lesions + inflammation; no dose-limiting toxicities in GLP tox — state as preclinical).
CTA → pipeline / partner.

### `/pipeline` — the portfolio
Hero: *"Four programs. One platform."* Phase legend (Discovery→Phase 3). Editorial detail
plates for each candidate using `lib/site` pipeline data + highlights. Endometriosis pair
(ENDO-205 Rx + FemLUNA Dx) and Oncology pair (ENDO-995 Rx + ENDO-311 Dx) grouped as
"detect & treat" matches. Status per truth.md: ENDO-205 IND Allowance/Phase 1; FemLUNA
IND-enabling; ENDO-995 & ENDO-311 pre-clinical. CTA → innovation / partner.

### `/imaging` — FemLUNA + ENDO-311 (may use a dark hero)
Hero: *"See what laparoscopy can't."* FemLUNA: first non-invasive, definitive endometriosis
diagnostic; detects superficial & sub-millimeter lesions missed by current imaging;
non-invasive alternative to laparoscopy (current gold standard). Before/after imaging
comparison using `standard-mri.webp` vs `FemLUNA-enhanced.webp` (label as illustrative).
ENDO-311: radiation-free, non-hormonal, heavy-metal-free tumor imaging; companion to
ENDO-995. CTA → pipeline / contact.

### `/impact` — disease burden & mission
Hero: *"The most common disease you've never been taught to see."* Full data spread (all
disease-burden stats), comorbidities (cardiovascular, certain cancers, inflammatory),
"leading cause of infertility and chronic pelvic pain", the 8-year delay narrative, and the
mission: eliminate lesions, modify disease, non-hormonal, preserve fertility (framed
"designed to"). Milken Women's Health Network founding member. CTA → partner / news.

### `/team` — leadership (rebuild; keep the 7 real bios verbatim from old page)
Founder spotlight (Dr. Tanya Petrossian, quote, bio, LinkedIn) on a dark plate; bench grid of
6 (Hartsough, Lin, Fernandez, Lukes, Ryan, Stepanians) with accessible bio dialog (focus
trap, Esc, restore focus). Photos from `public/team/*`. Keep names/roles/bios exactly.

### `/news` — newsroom (rebuild; keep the 9 real articles + newsletter form)
Editorial index: featured lead + grid, category filter (All/Press Release/Award/Interview),
search. Newsletter block posts to `/api/newsletter` (honeypot). Keep article
titles/sources/dates/links/images exactly. Media Kit link.

### `/contact` — contact (rebuild; keep form contract)
Split editorial layout: left = invitation + direct email + LinkedIn; right = form (name,
email, company, subject select with the 8 valid subjects, message ≥10). Honeypot, inline
validation, success state, rate-limit-aware errors. Reads `?subject=` query to preselect.

### `/investors` — investor relations (rebuild; keep form contract)
Hero: *"The diligence front door."* Investment highlights (IND Allowance 2026, first-in-class
non-hormonal, $180–250B market, platform breadth, NIH perfect-10, experienced ex-FDA team).
Data-room request form → `/api/investor` (name, email, company, role, message). Investor
summary PDF download (`/downloads/endocyclic-investor-summary.pdf`). Confidentiality note.

### `/media` — media kit (rebuild; keep content)
Boilerplate (verbatim-equivalent from truth.md), key-facts grid, logo downloads
(`logo.avif`, `challenge-logo.svg`), leadership blurb, media contact (`info@endocyclic.com`).

### System pages
`not-found.tsx` (editorial 404), `error.tsx`, `loading.tsx`, `template.tsx` (page-enter),
`opengraph-image.tsx` — restyled to the new system; keep functional behavior.

---

## 7. Asset inventory (only these)
Logo `logo.avif`; `challenge-logo.svg`; team `/team/*.avif` (7); partners `NIH_2013_logo_vertical.svg`,
`Milken_Institute_logo.svg`, `University_of_California,_Los_Angeles_logo.svg`,
`biocom_ca_primary_logo.svg`, `Endofound.webp`, `white-house.webp`, `recognition-perfect10.webp`,
`challenge-logo.svg`; imaging `standard-mri.webp`, `FemLUNA-enhanced.webp`; misc
`Female-Body-Silhouette.svg`, `cubes.webp`, `noise.svg`, `grid.svg`. No stock photos except
the few Unsplash URLs already present in the news dataset (kept as-is for those articles).

## 8. Build order
- **Phase A (hand):** tokens (globals.css) + fonts (layout.tsx) + tailwind.config.ts +
  `lib/site.ts` + all `components/site/*` + `/` homepage. Commit checkpoint.
- **Phase B (workflow fan-out):** 9 remaining pages + their `layout.tsx`, each agent given
  this spec + globals.css + the finished homepage as gold-standard reference + the old page
  (content harvest only) + truth.md. Reuse shared components; no new global tokens.
- **Phase C (workflow verify):** `tsc`/`next build` + review agents (cohesion, truth.md
  compliance, a11y). 
- **Phase D (hand):** apply fixes, delete orphaned old files, preview-verify, polish.

## 9. Eval (per CLAUDE.md, score 1–5)
Factual accuracy · 10-second clarity · pharma-grade polish · CTA conversion · performance.
