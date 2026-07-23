# EndoCyclic Therapeutics — Rebrand Website

EndoCyclic Therapeutics is a clinical-stage precision medicine company developing precision peptide therapeutics and diagnostics for endometriosis and oncology. This rebrand website is the strategic diligence front door for investors, partners, and stakeholders. It communicates the company’s FDA IND Allowance, NIH-backed platform, and the $200B annual US burden of endometriosis through warm editorial storytelling, factual scientific illustrations, and pharma-grade copy.

## How it works

The repo has a deliberate separation between what's fixed and what's editable, modeled after [karpathy/autoresearch](https://github.com/karpathy/autoresearch). Three files define the boundaries:

- **`truth.md`** — approved scientific facts. Single source of truth for all website copy. Not modified without regulatory review. This is the equivalent of `prepare.py` — the immutable foundation.
- **`program.md`** — optimization instructions for AI agents working on the site. Defines the editable surface, evaluation criteria, and keep/discard discipline. **This file is edited and iterated on by the human.**
- **`app/*` and `components/*`** — the editable surface for route content, shared editorial components, forms, and presentation. Copy is always checked against `truth.md`.

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
  page.tsx          — image-led homepage narrative
  layout.tsx        — root layout (fonts, metadata, JSON-LD)
  innovation/       — platform and mechanism of action
  pipeline/         — pipeline candidates with phase tracking
  imaging/          — FemLUNA diagnostic imaging
  impact/           — disease burden statistics
  team/             — team profiles
  news/             — news & media
  contact/          — contact form + newsletter
  api/contact/      — form submission (rate-limited, honeypot)
  api/newsletter/   — newsletter signup
components/
  site/             — navigation, footer, forms, editorial heroes, chapters, figures
  figures/          — accessible code-native scientific diagrams
  concepts/         — exploratory design concepts
public/             — logos, team photos, press assets, and optimized AVIF illustrations
```

## Design choices

- **Calm Clinical, made warmer.** Warm ivory, mulberry, clinical teal, rose, sage, lilac, and restrained gold create an editorial but credible visual system. Hanken Grotesk is the single typeface. Generated imagery is used only for conceptual scientific illustration—not synthetic people, clinical scans, or outcomes.

- **Pharma-grade accuracy.** Every piece of copy is checked against `truth.md`. Say "curative potential", never "cure". Say "clinical-stage", never "early-stage". No efficacy claims without data. This isn't marketing — it's regulated communication.

- **Performance-first motion.** Motion is limited to transform, opacity, and clip-path, respects reduced-motion preferences, and never scroll-jacks. Scientific storytelling relies on optimized AVIF assets and semantic HTML rather than WebGL.

- **One narrative job per chapter.** Each chapter should answer one diligence question in 10 seconds. Varied editorial compositions create rhythm without sacrificing clarity.

- **Keep/discard discipline.** Content changes follow a strict loop: propose → implement → evaluate against rubric → keep or discard. No accumulation of "nice to have" changes that dilute clarity.

## Tech stack

- **Next.js 16** with React 19, TypeScript, App Router
- **Tailwind CSS 4** with the warm Calm Clinical token system in `app/globals.css`
- **Framer Motion** for restrained state transitions and reveals
- **GSAP** and **Embla Carousel** for concept-only progressive enhancements
- **Lucide React** for icons
- **Railway** for deployment (auto-deploys on push to main)

## Pipeline

| Candidate | Type | Indication | Phase | Status |
|-----------|------|-----------|-------|--------|
| ENDO-205 | Therapeutic | Endometriosis | Phase 1 | FDA IND Allowance (2026) |
| FemLUNA™ | Diagnostic | Endo Imaging | IND-enabling | Lead Diagnostic |
| ENDO-995 | Therapeutic | Solid Tumors | Preclinical | Preclinical |
| ENDO-311 | Diagnostic | Tumor Diagnostics | Preclinical | Preclinical |

## Deployment

Deployed on [Railway](https://railway.app). See `DEPLOYMENT.md` for step-by-step instructions. Railway auto-deploys on push to `main`.

## License

Proprietary. EndoCyclic Therapeutics, Inc.
