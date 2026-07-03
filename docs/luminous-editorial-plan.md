# Luminous Editorial — Build Plan

Rebrand of the EndoCyclic site to award-quality **"Luminous Editorial"**: EndoCyclic's cream identity kept and elevated with warm light, monumental type, and deliberate plum-dark cinematic beats (the mechanism = the "dark room"). Approved 2026-07-03. Branch: `design/luminous-editorial`.

Ground rules: truth.md immutable; all copy traceable to it; Lighthouse 90+; reduced-motion + GPU degradation everywhere.

## Phase A — Factual + engineering foundation
**Engineering**
- [ ] `usePrefersReducedMotion` hook (JS-driven motion: canvas RAF, mouse listeners, setInterval) — MotionConfig only covers Framer transitions
- [ ] Fix Hero GPU gate: canvas only when `gpuTier === 'high'` (today gates on `!== 'none'`, so low-tier loads full 3D)
- [ ] `/innovation` double-mounts MechanismCanvas (mobile+desktop) — render one

**Factual (truth.md-grounded — NOTE some audit flags are actually approved):**
- [ ] EfficacyGraph — relabel unmistakably **illustrative/schematic**, soften exact-zero endpoints, reconsider absolute "Complete Lesion Clearance" headline (truth.md supports "designed to eliminate lesions" + "demonstrated elimination" preclinically, but NOT a quantified curve to 0)
- [ ] PipelinePreview — split "IND Cleared" badge: ENDO-205 = IND cleared; **FemLUNA = IND-enabling**. Oncology → "25%+ of solid tumor types"
- [ ] Scene2 — "Perfect Specificity" → "High Specificity" / "Target-Selective"
- [ ] Scene4 + Shapes.tsx — "Nucleus" → "intracellular target"
- [ ] Scene5 — "No inflammation, no toxicity" → "Correction, not destruction" (approved) + label VolumeCounter illustrative; fix invalid `bg-gold-primary/20/50`
- [ ] ImpactSection — add "$" to $200B counter
- [ ] Credibility/Achievement — drop unsourced **"Nature"**; reframe "Trusted/Supported by/partners" → "Recognized & supported by" (UCLA is a partner; NIH/White House = recognition)
- [ ] 8yr vs 7-10yr — standardize on **"8-year"** (fix /impact, /imaging "7-10 years")
- [ ] MissionPillars — oncology "cold tumors" keep "designed to restore responsiveness"; **KEEP "definitive" for FemLUNA (truth.md line 38 approves it)**
- [ ] **KEEP "unicorn"** (truth.md line 62 approves it)

## Phase B — Luminous tokens + the 4 cuts
- [ ] Warm bone ground (--surface cool #F8F9FA → warm bone), --gold-deep #9C7C33 text-safe, plum-dark beat token, luminous glow utilities
- [ ] CUT: delete `mechanism/PeptideRing.tsx` (dead), `shaders/DitherMaterial.tsx` (dead)
- [ ] CUT: `TransitionStatement` — remove from homepage; replace with one cinematic statement beat
- [ ] CUT: consolidate two logo walls → keep one (CredibilitySection); fold in AchievementBar logos; remove AchievementBar from homepage

## Phase C — Signature hero
- [ ] Rebuild PeptideCanvas: luminous warm peptide on cream (drop bloom-for-bloom's-sake → intentional warm light), gate on `gpuTier==='high'`, dpr cap, reduced-motion freeze, remove unused shadow map
- [ ] Hero.tsx: fix 2.8s delayChildren (LCP), monumental type, warm luminous treatment, reduced-motion

## Phase D — Cinematic per-page rebuild (Fable workflow, page-owned agents)
- [ ] `/` homepage sections · `/innovation` (dark-room mechanism) · `/pipeline` · `/imaging` · `/impact` · `/team` · `/news` · `/contact` · `/investors`
- [ ] KEEP (re-skin only): MechanismCanvas, PortfolioMatrix, SuppressionCorrection, Navbar, ScrollProgress/BackToTop
- [ ] Testimonials → single founder pull-quote (rename away from "Testimonials"); revisit "wipe it out" / "only way forward"

## Phase E — Polish + verification
- [ ] Lighthouse 90+, reduced-motion + keyboard + contrast pass, cross-device, `npm run build` + `npm run lint` + `npm test`
- [ ] Final adversarial truth.md review
