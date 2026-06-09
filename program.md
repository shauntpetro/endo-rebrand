# EndoCyclic Website — Optimization Program

Modeled after Karpathy's autoresearch: narrow editable surface, fixed truth, clear metrics, keep/discard discipline.

## Goal
Increase buyer/investor clarity and trust. The site should function as a strategic diligence front door.

## Rules
1. Never change approved scientific facts from truth.md
2. Prefer simpler copy over clever copy
3. Keep edits reviewable and localized (one section at a time)
4. Improve one thing at a time
5. If a change adds complexity without improving clarity, discard it
6. All content must pass pharma-grade review
7. Every homepage section should answer one question in 10 seconds

## Editable Surface
Only these files should be modified for content experiments:
- `components/Hero.tsx` — headline, subheadline, badge
- `components/MilestoneProofBar.tsx` — milestone labels and sublabels
- `components/WhyNowSection.tsx` — card content
- `components/MissionPillars.tsx` — pillar descriptions
- `components/PipelinePreview.tsx` — pipeline items and descriptions
- `components/ImpactSection.tsx` — stats and impact copy

## Fixed Surface (Do Not Modify for Content)
- `app/globals.css` — design tokens
- `tailwind.config.ts` — color palette
- `components/PeptideCanvas.tsx` — 3D visualization
- `components/mechanism/*` — scientific visualizations
- `truth.md` — approved facts

## Eval Criteria (Score 1-5 each)
1. **Factual accuracy** — Does it match truth.md?
2. **10-second clarity** — Can a buyer understand the value prop in 10 seconds?
3. **Pharma-grade polish** — Would this pass Stifel/banker review?
4. **CTA conversion** — Does each section drive toward partnership/contact?
5. **Performance** — Lighthouse score 90+, no jank

## Experiment Log Format
| Date | Commit | Experiment | Score | Status | Notes |
|------|--------|-----------|-------|--------|-------|
| 2026-03-10 | initial | Baseline site audit | — | — | Full audit completed |
| 2026-03-10 | update1 | IND Cleared positioning, new sections | — | keep | Hero, MilestoneProofBar, WhyNow added |

## Scorecard Template
For each proposed change:
- [ ] Matches truth.md
- [ ] Improves 10-second clarity
- [ ] Maintains pharma-grade polish
- [ ] Strengthens CTA path
- [ ] No performance regression
- Keep / Discard: ___
- Notes: ___
