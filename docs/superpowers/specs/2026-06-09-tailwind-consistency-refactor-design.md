# Tailwind Consistency & Pattern-Extraction Refactor — Design

**Date:** 2026-06-09
**Scope:** Two buckets, approved by user: (1) consistency cleanup (raw hex → tokens, standardize page backgrounds, dedupe token) and (2) extract the most-duplicated styling patterns into shared components. User explicitly authorized editing the design-token "fixed surface" (`globals.css`, `tailwind.config.ts`).
**Basis:** Audit (this session) across `app/`, content/UI components, and viz components.

## Goal

Reduce styling duplication and raw-hex drift so brand values and repeated UI patterns live in **one place**, without altering the rendered design or touching legitimately-dynamic styles.

## Guiding principle

This is **not** a "convert all inline styles to Tailwind" rewrite. The audit found most inline styles are necessary (Framer Motion `animate`/MotionValue targets, computed SVG coordinates, Three.js materials, GLSL uniforms). We change only: (a) static raw hex that duplicates a token, (b) a few trivial static inline props, and (c) copy-pasted class strings that should be components. Pixel output must stay the same (near-white consolidation is a deliberate, sub-2% normalization the user approved).

## Out of scope (do NOT touch)

- **Fixed surface:** `components/PeptideCanvas.tsx`, `components/mechanism/*` (incl. Scene1–5, EfficacyGraph, MechanismCanvas, Shapes, PeptideRing, constants.ts), `components/shaders/*`. The mechanism scenes' incidental chrome (e.g. `letterSpacing`, `MECHANISM_COLORS` labels) is flagged-only — leave it.
- **`MECHANISM_COLORS` / `PALETTE`** local viz palettes — keep; they are semantic aliases feeding SVG/Three.js/Framer targets, not CSS chrome.
- **Dynamic inline styles** anywhere: MotionValues (`y`, `scaleX`, `x`, `clipPath`), computed coordinates (`left: ${node.x}%`), `colorFor()`-derived gradients with alpha, animated `backgroundColor` arrays. These stay inline.
- **SVG presentation attributes** (`fill`, `stroke`, `fontSize` on `<text>`) — cannot be Tailwind; leave as-is.

## Part 1 — Token changes (`globals.css` + `tailwind.config.ts`)

Tokens are defined in BOTH files; every change updates both (raw `--name` + `@theme` `--color-name` mirror in globals.css; the `colors` map in tailwind.config.ts).

1. **Add `surface` = `#F8F9FA`** — the canonical app/page background. Then migrate all near-white page backgrounds to `bg-surface`:
   - 9 sites of `bg-[#F8F9FA]` (`app/page.tsx`, `app/error.tsx`, `app/not-found.tsx`, and the 6 `loading.tsx` files),
   - `app/layout.tsx` body `bg-[#F5F5F5]` → `bg-surface`,
   - `app/pipeline/page.tsx` `bg-[#FAF9F6]` → `bg-surface`.
   (All three near-whites are within ~2% of each other; consolidating to one is the cleanup.)
2. **Remove `deep-plum`** (duplicate of `plum-primary` `#4A3F5C`). It has **zero usages** — delete its 3 definition sites (`tailwind.config.ts:35`, `globals.css:29`, `globals.css:55`). Keep `plum-primary`.
3. No other new tokens. One-off plum-tint gradient steps (`#E8E4F0`, `#E0DBEA`, `#D8D1E4`, `#FDF6E9`, `#efe9db`, `#ece6dc`) are single-use and stay as arbitrary values — tokenizing single-use values adds indirection without payoff.

## Part 2 — Raw hex → existing token (mechanical, ~16–30 sites)

Replace raw hex / arbitrary-value classes with the existing token wherever the value is an EXACT token match. Categories (audit gives exact file:lines):
- `#C9A961` → `gold-primary` (e.g. `MilestoneProofBar.tsx:54`, `InnovationSection.tsx:228`, `layout.tsx:135` selection color).
- `#F3F0F7` → `pastel-plum` (`GrantHighlight.tsx:19`, `WhyNowSection.tsx:38`).
- `#E5D4A6` → `gold-light` (`InnovationSection.tsx:34`).
- `#F5F1E8` → `cream-primary` (`CanvasErrorBoundary.tsx:15`, `PortfolioMatrix.tsx` gradient start).
- `#2D2D2D` → `black-soft` (`layout.tsx:135`).
- `#4A9B8E` / `#C9A961` in `pipeline/page.tsx` `getColor()` → reference token values (keep the function returning hex for the dynamic alpha trick, but source from a typed `{Therapeutic, Diagnostic}` map; do not inline-literal).
- SystemicMap legend dots: `#D4A5A5` → `bg-warm-rose`, `#FF6B6B` → `bg-coral-primary` (SystemicMap is NOT fixed surface). `#9F8CA6` has no token → leave.
- Trivial static inline → class: `Navbar.tsx:134` `width:"100%"` → `w-full`; `test-scene/page.tsx:27` `height:"520px"` → `h-[520px]`; `innovation/page.tsx:206` `opacity:0.9` → `opacity-90`; `innovation/page.tsx:353` redundant `position/zIndex` → delete (already in className); SystemicMap `letterSpacing` → `tracking-[…]`.
- `imaging/page.tsx:162,164` `shadow-[0_0_25px_#D4AF37]` → existing `shadow-gold-glow*` utilities (note: `#D4AF37` ≠ token gold; confirm visual match before swap — if it shifts the glow color, keep as arbitrary).

Each swap must be visually identical. Where a "near-miss" hex has no exact token (the three near-whites excepted, handled in Part 1), leave it.

## Part 3 — Shared component extraction (the real maintainability win)

New components in `components/ui/`. Each is small, unit-tested, and uses `clsx` (already a dependency) so callers can override/extend via `className`. Migrate existing sites to them.

1. **`<Eyebrow tone="gold|plum" className?>`** — the uppercase kicker label (`font-bold uppercase tracking-[0.2em]` + tone color). Default size `text-xs`; callers pass spacing/size via `className` to preserve per-site sizing (some use `text-[10px]`, varying margins). Migrate ~16 sites.
2. **`<StatusBadge tone="gold|teal|plum">`** — the pill badge (`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border bg-{tone}/10 text-{tone} border-{tone}/20`). Migrate ~8 static badge sites. The animated "IND Cleared" shimmer badge stays bespoke (it has motion) — do not force it through StatusBadge.
3. **`<SectionHeading className?>`** — the big serif section title (`text-5xl md:text-7xl font-serif font-bold text-plum-dark tracking-tighter leading-[0.9]`). Size-variant sites pass `className` to override the size pair. Migrate the ~7 matching sites; skip headings whose styling diverges materially.
4. **`<DotGrid color? size? className?>`** — the dot-pattern overlay div (`absolute inset-0 pointer-events-none` + the radial-gradient `backgroundImage`/`backgroundSize` inline, which is legitimately inline but should live in ONE component, not 5 copies). Migrate the 5 static sites. The animated ImpactSection dot-grid keeps its `motion` wrapper but renders `<DotGrid>` for the pattern.
5. **CTA consolidation** — a single gold CTA. First inspect `components/MagneticButton.tsx`'s actual API. If it already encapsulates the gold CTA, route the ~7 ad-hoc CTA sites through it (supporting both `<Link href>` and `<button onClick>` forms). If it's only the magnetic-motion wrapper, add `components/ui/CtaButton.tsx` (props: `href?`, `onClick?`, `variant?: "solid"|"outline"`, children) capturing `bg-plum-primary text-white hover:bg-gold-primary … rounded-lg uppercase tracking-widest` and migrate the sites. Decide during planning after reading MagneticButton.
6. **(Optional) `<DecorationBlobs>`** — the gold+plum blur-blob pair copy-pasted across `pipeline`, `news`, `media`, `investors` (4 sites). Low-risk extraction; include if it doesn't balloon the change.

## Migration strategy

Work in waves so the build stays green and visual diffs are reviewable:
1. **Wave A — tokens** (Part 1): add `surface`, remove `deep-plum`, migrate background classes. Build + screenshot a couple pages.
2. **Wave B — hex→token** (Part 2): mechanical swaps, grouped by token. Build.
3. **Wave C — components** (Part 3): one component at a time — create + test + migrate its sites + build — so a regression is isolated to one pattern.

## Testing & verification

- **Unit tests** (Vitest, repo's framer-motion/useVisibility mock pattern) for each new `ui/` component: renders children, applies tone/variant classes, merges `className`.
- After each wave: `npx tsc --noEmit`, `npm test`, `npm run build`.
- **Visual regression check:** before/after screenshots of representative pages (`/`, `/pipeline`, `/innovation`, `/contact`) at desktop; confirm no visible change. The whole point is parity — any visible diff is a bug.
- Confirm token grep is clean afterward: no remaining `bg-[#F8F9FA]`/`#F5F5F5`/`#FAF9F6`; no `deep-plum`; reduced raw-`#C9A961` count.

## Risks & mitigations

- **Unintended visual drift** from near-white consolidation or a wrong hex match → mitigate with before/after screenshots per wave; revert any swap that shifts color.
- **Over-extraction churn** (forcing divergent headings/badges through one component) → only migrate sites that match the canonical pattern; leave outliers bespoke.
- **Fixed-surface bleed** → the mechanism/3D/shader files are explicitly excluded; SystemicMap is the only viz file touched (it's not fixed surface).
- **Token defined in two files drift** → every token change updates both `tailwind.config.ts` and `globals.css`; verify with a build.

## Success criteria

1. No rendered visual change (parity confirmed by screenshots).
2. `surface` token replaces all 3 near-white backgrounds; `deep-plum` gone.
3. The 5–6 duplicated patterns each live in one `ui/` component with tests; their sites migrated.
4. tsc clean, all new tests pass, production build succeeds, no new lint-error categories.
