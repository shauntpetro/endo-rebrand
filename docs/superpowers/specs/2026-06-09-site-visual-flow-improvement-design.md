# EndoCyclic Site — Focused Visual & Flow Improvement

**Date:** 2026-06-09
**Scope:** Focused high-impact pass — 4 flagship moves across mechanism visuals, diagrams, and flow. Not a comprehensive refactor.
**Audience:** Investor / partner diligence ("strategic diligence front door").

---

## Context & constraints

- All copy must trace to `truth.md`. Do not modify `truth.md`. Do not use prohibited language ("cure" without "potential", "guaranteed", "proven", "safe" pre-Phase 3).
- Fixed surface (do not touch for this work): `tailwind.config.ts`, `app/globals.css`, `PeptideCanvas.tsx`, `components/mechanism/shaders/*`, and the 3D/R3F internals.
- Design tokens: Gold `#C9A961` (therapeutic/primary), Clinical Teal `#4A9B8E` (diagnostic), Plum `#4A3F5C` / Plum Dark `#2E263A`, Cream `#F5F1E8`. Fonts: Playfair (headings), Inter (body).
- Performance: lazy-load heavy sections, `ssr:false` for Canvas, graceful GPU degradation, Lighthouse 90+.

### ⚠️ Known data discrepancy (decided)

`truth.md` and the live pipeline code disagree on two candidates. **Decision: the site code is authoritative / current.** The oncology pairing is real:

| Candidate | Role (authoritative) |
|---|---|
| ENDO-205 | Endometriosis therapeutic — non-hormonal, Phase 1 / IND cleared |
| FemLUNA™ | Endometriosis diagnostic — non-invasive imaging, IND-enabling |
| ENDO-995 | Oncology therapeutic — tumor-selective cyclic peptide, preclinical |
| ENDO-311 | Oncology diagnostic — targeted imaging agent, preclinical |

`truth.md` is stale on ENDO-995/311 and should be refreshed **by the user** (out of scope here — agent will not edit `truth.md`). All new copy in this work uses the authoritative roles above.

---

## Flagship move 1 — "Matched Pairs" Portfolio Diagram

**Approved direction: Option B (2×2 matrix), "Detect & Treat" wording.** ("Theranostic" rejected — phonetic proximity to "Theranos" is investor-facing downside.)

**Structure:**
- 2×2 grid. Columns = disease area (**Endometriosis / Women's Health**, **Oncology / Solid Tumors**). Rows = modality (**Therapeutic**, **Diagnostic**).
- Four candidate cells: ENDO-205 & ENDO-995 (gold, therapeutic row); FemLUNA™ & ENDO-311 (teal, diagnostic row).
- Each cell: candidate name (Playfair), mechanism line, status badge, animated 6-step **phase pip** row (Discovery → Phase 3, current phase highlighted), phase label.
- Each **column** is a matched pair; label between rows reads "**Detect & Treat — matched pair**" with a drawn connector line down the column.
- Header: eyebrow "Therapeutics & Diagnostics · One Platform"; title "**One Platform, Matched Pairs**"; subline "a diagnostic to find disease and a therapeutic to clear it, across two disease areas."

**Styling:** cream gradient ground, white cells, gold/teal left-accent bars, soft plum shadows, hover lift + gold glow, staggered scroll-reveal, phase pips animate in.

**Placement (two renders of one component):**
1. **`/pipeline`** — full-fidelity, placed at the top of the page above the existing filterable candidate table (which stays — it's the detailed drill-down).
2. **Homepage `PipelinePreview.tsx`** — a **compact variant replaces the `PeptideEngine` octagon visual**. This fixes the weak homepage visual and strengthens the Hero→Pipeline pathway in one move.

**Component:** new `components/PortfolioMatrix.tsx` accepting a `variant: "full" | "compact"` prop and reading from a shared candidate data source (extract the pipeline array so `/pipeline` and the matrix share one source of truth — no data duplication).

---

## Flagship move 2 — Mechanism clarity (`/innovation`)

**2a. "Suppression vs. Correction" comparative panel** (new section on `/innovation`):
- Two columns, side-by-side.
  - *Today's hormonal drugs:* system-wide hormonal suppression, symptomatic only, lesions remain, fertility/side-effect burden.
  - *ENDO-205:* acts only in diseased tissue (pH-gated), non-hormonal, designed to eliminate lesions, fertility-preserving.
- Approved language only: "correction, not destruction", "non-hormonal", "designed to eliminate", "short-course". Frame, don't over-claim.
- Visual treatment: contrasting left (muted/diffuse — "everywhere") vs right (focused/gold — "only here"). Responsive; collapses to stacked on mobile.

**2b. Scene continuity** for the existing 5 mechanism scenes (`MechanismCanvas.tsx` + scene components):
- Add a **persistent numbered progress rail** (1→5 with scene titles) so viewers always know where they are.
- Replace the abrupt `AnimatePresence mode="wait"` hard cuts with a **crossfade** and a **shared/persistent peptide element** carried across scenes, so it reads as one continuous journey.
- **Do not** alter shader/3D internals or scene scientific content — only transition orchestration and the rail chrome.

---

## Flagship move 3 — SystemicMap upgrade (`/impact`, `SystemicMap.tsx`)

- **Interaction:** pause the endless beam animation on hover/focus; make nodes **click-to-inspect** (replacing the loop-only behavior); keyboard-accessible.
- **Comorbidity grouping layer:** cluster hotspots into the systems `truth.md` names — cardiovascular disease, elevated cancer risk, inflammatory conditions — with a **legend**.
- **No fabricated data:** `truth.md` provides comorbidity *categories*, not per-organ incidence figures. Show qualitative relationships and emphasis only — no invented percentages or counts. Every label traceable to `truth.md`.

---

## Flagship move 4 — Homepage flow

- **Replace** the `PeptideEngine` octagon visual in `PipelinePreview.tsx` with the compact `PortfolioMatrix` (see move 1).
- **De-duplicate `AchievementBar`:** it renders twice on the homepage (light + default variant). Investigate intent; remove the redundant instance or clearly differentiate the two. One stays.
- **Connective cross-links** to end the "dead end" inner pages: `/innovation` → "see how we detect it" (`/imaging`) → "and how we treat it" (`/pipeline`). Add as tasteful end-of-page pathway CTAs consistent with existing button styling.

---

## Out of scope (explicitly)

- No edits to `truth.md` (user refreshes it separately).
- No new 3D/shader work; no rewrite of the mechanism scenes' scientific content.
- No comprehensive section-by-section overhaul; no nav/IA restructure beyond the cross-links above.
- No real clinical/efficacy data added (none available; existing `EfficacyGraph` data unchanged).

## Success criteria (per `CLAUDE.md` eval rubric, 1–5 each)

1. Factual accuracy — every claim traces to `truth.md` (or the authoritative pipeline data).
2. 10-second clarity — portfolio + suppression/correction panel make the value prop instantly legible.
3. Pharma-grade polish — passes banker/Stifel review.
4. CTA conversion — cross-links + pipeline pathway drive toward contact/partnership.
5. Performance — Lighthouse 90+, no jank; lazy-load preserved.

## Component-level summary

| Unit | Change | Depends on |
|---|---|---|
| `components/PortfolioMatrix.tsx` (new) | 2×2 matched-pairs diagram, `variant` prop | shared candidate data |
| pipeline data (extract) | move `pipeline[]` to shared module | — |
| `app/pipeline/page.tsx` | mount full matrix above table | PortfolioMatrix |
| `components/PipelinePreview.tsx` | swap octagon → compact matrix | PortfolioMatrix |
| `app/innovation/page.tsx` | add Suppression vs Correction panel | — |
| `components/mechanism/MechanismCanvas.tsx` | progress rail + crossfade continuity | — |
| `components/SystemicMap.tsx` | pause/click interaction + comorbidity legend | — |
| homepage (`app/page.tsx`) | de-dup AchievementBar, cross-link CTAs | — |
