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
Modify these for content experiments (post-2026 "Modernist Color-Block" single-page scroll-film):
- `lib/site.ts` — shared content/data (pipeline, burden stats, milestones, partners, team bios, news, contacts)
- `app/page.tsx` — the film shell (scene order)
- `components/film/scenes/*` — the 8 acts' composition + copy
- `components/film/overlays/*` — the 7 in-place content panels
- `components/film/*` — framework (HUD, Scene, OverlayHost, FilmCTA); `components/site/*` — reusable primitives

## Fixed Surface (Do Not Modify for Content)
- `app/globals.css` — design tokens (Tailwind v4 `@theme`) and type/layout utilities
- `truth.md` — approved facts
- API routes `app/api/*` — form contracts (contact/newsletter/investor); keep field names stable

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
