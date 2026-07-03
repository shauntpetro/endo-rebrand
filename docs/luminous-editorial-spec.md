# Luminous Editorial — Component Spec (for restyle agents)

You are restyling ONE EndoCyclic component to the **"Luminous Editorial"** direction and applying its factual fix. EndoCyclic is a clinical-stage biotech investor-diligence site. Read `truth.md` before touching any copy.

## The look (what "Luminous Editorial" means)
Cream identity kept and **elevated with warm light** — the opposite of a flat "de-glow". Drama comes from monumental type, generous whitespace, warm luminous gold accents, and a few deliberate **plum-dark cinematic beats**. NOT dark-everywhere; cream dominates.

## Non-negotiable rules
1. **Content must be visible in its STATIC state.** Never hide content behind `opacity:0` that only a JS/animation reveals — animations can be paused. For entrances use the shared CSS class `reveal-rise` (transform-only; defined in globals.css) with a stagger via inline `style={{animationDelay: "0.15s"}}`. Do NOT use Framer `initial={{opacity:0}}` + mount `animate` for critical content.
2. **Gold contrast (WCAG):** bright gold `#C9A961` (`text-gold-primary`) FAILS as text on cream. For gold **text**, use `text-gold-deep` (`#8A6D2E`). Reserve `gold-primary` for fills, borders, large display headings, and decoration.
3. **Reduced motion:** import `usePrefersReducedMotion` from `@/hooks/usePrefersReducedMotion`. Gate any infinite/looping Framer animation and any `setInterval`/rAF behind it (freeze to a static end-state when reduced).
4. **3D / WebGL** gates on `gpuTier === 'high'` (from `useGPUDetect`), else a static fallback.
5. **truth.md compliance:** every claim traceable. Apply the component's specific factual fix (below). Do NOT introduce forbidden words: "cure" (without "potential"), "guaranteed", "proven", "safe" (pre-Phase-3), or specific efficacy claims without data. NOTE: "unicorn" (NIH score) and "definitive" (FemLUNA) ARE approved — keep them.
6. Keep the build valid: valid TSX, keep exports/props/imports intact, don't break other components that import this one.

## Tokens (already in globals.css + tailwind.config.ts)
- Ground: `bg-surface` / `bg-bone` `#F4EEE1` (warm cream), `bg-bone-raised` `#FAF6EC` (raised cards)
- Dark beat: `bg-plum-dark` `#2E263A` (cinematic sections, footers) with cream text
- Ink text: `text-black-primary` `#1A1A1A`, headings `text-plum-dark` / `text-plum-primary`
- Gold: `gold-primary` (fills/borders/large display), `gold-deep` (text), `gold-light`
- Accent: `clinical-teal` `#4A9B8E` (diagnostic/medical)
- Serif display: `font-serif` (Playfair). Body: `font-sans` (Inter). Labels/eyebrows: uppercase, tracked, small.
- Luminous glow (use sparingly, intentionally): tailwind `shadow-gold-glow` / `shadow-gold-glow-sm`; warm radial gradients `radial-gradient(..., rgba(201,169,97,0.18), transparent)`.

## Craft bar (award quality)
- Monumental serif headings, tight leading, `text-wrap: balance`.
- Hairline borders (`border-plum-dark/10` on cream) over heavy shadows.
- One confident luminous accent per section, not glow everywhere.
- Real typographic hierarchy; generous spacing via flex/grid `gap`.
- Tabular-nums for aligned figures.

## Shared UI primitives (reuse, don't reinvent)
`@/components/ui/Eyebrow`, `SectionHeading`, `DotGrid`, `MagneticButton`. Use them.
