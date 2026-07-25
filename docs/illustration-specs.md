# EndoCyclic — Scientific Illustration Prompt Specs

**Style: crisp editorial scientific illustration** — clean, precise, detailed, with defined edges and legible structure (like a modern Nature Reviews cover graphic). Not watercolor, not photoreal 3D. Public claims are grounded in `truth.md`; user-supplied mechanistic references may inform abstract visual transitions but never add public scientific claims. All prompts use the site's Calm Clinical palette.

## How to use
1. Paste the **Prompt** into ChatGPT (image generation); add the aspect ratio in words.
2. Iterate 2–3× using the *Avoid* / *Usage* notes ("crisp defined edges, not fuzzy", "no text", "lighter off-white background").
3. Preserve the original generated PNG outside `public/`, then export the
   approved production master to optimized **.avif** at its versioned path.
   Create responsive variants as deterministic crops, never independent
   redraws.

## Locked anchor (first line of every prompt)
> Clean, precise editorial scientific illustration in the style of a modern Nature Reviews cover graphic — crisp defined edges, clear and detailed anatomical and molecular structure, refined clean linework with subtle flat shading and gentle depth, calm and restrained, generous negative space, publication quality, no text, no labels, no neon, no photorealistic 3D render, no loose watercolor, no fuzzy or diffused abstraction.

## Locked peptide motif (mandatory; supersedes every legacy prompt below)

Reference assets:

- `docs/assets/canonical-endo-peptide-v1.svg`
- `docs/assets/canonical-endo-peptide-v1.png`

Every generated scientific illustration that contains a peptide uses this same
conceptual platform motif. It is a visual identity system, not a published
chemical formula or amino-acid sequence.

- The motif is one intact, nearly front-facing ring of exactly 13 glossy,
  individually countable spherical residues with a clean open center.
- Lock the upright orientation and read clockwise from the orange bead at
  12 o’clock: 1 orange, 5 warm taupe, 3 violet, 3 orange, 1 warm taupe.
  Totals: 4 orange, 6 warm taupe, 3 violet.
- Preserve the exact color adjacency and orientation. The upper-left bead next
  to the top orange bead is warm taupe.
- Use pearl/enamel dimensional shading, crisp brown/plum keylines, a consistent
  upper-left cream highlight, short bronze/tan connectors behind the beads, and
  a very soft neutral shadow down/right.
- Never communicate targeting, uptake, activation, or program identity by
  recoloring, changing the bead count, changing the sequence, adding side
  chains, or converting the motif into a ball-and-stick structure. Use the
  surrounding tissue, membrane pocket, endosome, pH field, selective thread,
  localization contour, or target context instead.
- Keep primary rings fully visible and at least 96 CSS pixels across in their
  final use. Repeated/context rings should remain at least 48–56 CSS pixels.
  For smaller appearances, composite the canonical sprite deterministically
  rather than asking image generation to redraw it.
- For four-stage mechanism visuals, the approved visual order is:
  **Target** (diseased-tissue selectivity) → **Enter** (selective uptake and
  early endosome) → **Activate** (pH-mediated activation in the acidified
  endosome, with subsequent intracellular access shown conceptually) →
  **ENDO-205 evidence** (the intact peptide visibly seated in an illustrated
  intracellular-target pocket, followed by the separately qualified ENDO-205
  preclinical lesion-elimination state). Uptake always precedes activation.
  Keep the program-specific evidence visually and verbally distinct from the
  three platform stages, with all labels and qualifications in accessible HTML.

Only diseased-tissue selectivity, selective uptake through a proprietary
endocytic pathway, pH-mediated activation, and the separately qualified
ENDO-205 preclinical lesion-elimination finding are approved public claims.
Early-endosome, cytoplasmic, and teal contact-pocket details are compositional
metaphors derived from the user-supplied infographic; never repeat them as an
approved ENDO-205 mechanism or target claim in public copy.

Any older prompt text below that requests a teal-only peptide, an inert-to-active
peptide recolor, a gray peptide, a gold/teal split ring, a side-chain appendage,
or a different bead count is obsolete and must be replaced by this locked motif.

### Four-stage visual semantics

| Stage | What the illustration must show | What changes visually |
|---|---|---|
| **1 · Target** | The canonical ring localizes to diseased tissue while healthy tissue remains quiet. | Tissue placement, localization contour, or selective thread. |
| **2 · Enter** | The intact ring enters through a diseased-cell membrane pocket and is enclosed in an early endosome. | Membrane invagination and early-endosome context. |
| **3 · Activate** | The already-internalized ring sits in an acidified endosome where pH-mediated activation occurs; the conceptual art then shows the same intact ring in the cytoplasm. | Acidified endosomal field, restrained pH cue, and one unchanged cytoplasmic ring immediately downstream. |
| **4 · ENDO-205 evidence** | Inside the diseased cell, the intact canonical ring is visibly seated in a pocket on an illustrated teal intracellular target. A separate downstream evidence state then shows the same lesion receding to represent the approved ENDO-205 preclinical lesion-elimination finding. | Unambiguous illustrated peptide-to-target contact first, then a separately qualified lesion/tissue state; never the peptide identity, bead count, sequence, or color. |

The peptide remains visually identical in all four beats. External
plasma-membrane or lesion-surface docking is scientifically incorrect for the
illustrated target beat and must be rejected: the ring enters the diseased
cell, undergoes pH-mediated activation, and only then appears seated in the
illustrated intracellular-target pocket. Detailed pathway labels from research
infographics—such as named membrane proteins or trafficking regulators—must
not be promoted into public website copy unless they are first approved in
`truth.md`.

## Current production asset registry

These are the active versioned masters and deterministic derivatives. Generate
or revise only the master named for the task; make responsive derivatives by
cropping the approved master so the peptide motif is never repainted.

| Story / placement | Production master | Deterministic derivative |
|---|---|---|
| Homepage hero | `public/illustrations/hero-home-v8.avif` | `public/illustrations/hero-home-mobile-v8.avif` |
| Innovation clearance hero | `public/illustrations/innovation-target-clearance-v2.avif` | `public/illustrations/innovation-target-clearance-mobile-v2.avif` |
| Homepage state transition | `public/illustrations/selective-state-transition-v3.avif` | `public/illustrations/selective-state-transition-mobile-v3.avif` |
| Shared four-stage mechanism | `public/illustrations/selective-mechanism-v11.avif` | — |
| Platform breadth | `public/illustrations/platform-breadth-v3.avif` | — |
| News regulatory threshold | `public/illustrations/news-regulatory-threshold-v2.avif` | — |
| ENDO-205 translation | `public/illustrations/endo-205-translation-v6.avif` | — |
| ENDO-205 portfolio banner | `public/illustrations/endo-205-portfolio-desktop-v6.avif` | `public/illustrations/endo-205-translation-v6.avif` below 1024px |
| ENDO-205 clinical translation | `public/illustrations/endo-205-clinical-translation-v7.avif` | — |
| Care-gap selective shift | `public/illustrations/care-gap-selective-shift-v7.avif` | `public/illustrations/care-gap-selective-path-mobile-v6.avif` |
| Pipeline portfolio | `public/illustrations/pipeline-portfolio-wide-v2.avif` | — |
| FemLUNA targeting | `public/illustrations/femluna-targeting-v3.avif` | `public/illustrations/femluna-targeting-v3-portrait.avif` |
| FemLUNA comparison, targeted state | `public/illustrations/femluna-comparison-targeted-v2.avif` | — |
| Oncology program pair | `public/illustrations/oncology-pair-v4.avif` | `public/illustrations/endo-311-localization-pair-v4.avif`, `public/illustrations/endo-995-intracellular-v4.avif` |
| Investor platform | `public/illustrations/investor-platform-v3.avif` | — |

The active shared mechanism is
`public/illustrations/selective-mechanism-v11.avif`. The superseded
`public/illustrations/selective-mechanism-v8.avif` plate is retained for
version history but must not be reused because its escaped peptide appeared
partially fragmented. Versions 7 and 6 are also retained only as historical
records; v6 contains the rejected external-docking interpretation. No older
plate is an active source.

### Asset-specific outcome boundaries

- **Homepage hero v8:** carries the approved sequence and includes one
  secondary lesion-dispersal cue only when adjacent HTML explicitly qualifies
  it as the ENDO-205 preclinical lesion-elimination finding.
- **Innovation target-clearance v2:** is a close-up of the canonical intact
  peptide physically seated in an illustrated intracellular-target pocket
  inside one lesion. That lesion's right edge recedes in the same field to
  represent the qualified ENDO-205 preclinical lesion-elimination finding. It
  is a hero teaser; the shared mechanism plate remains the complete sequence.
- **Innovation state transition v3:** ends at intracellular target access. It
  may show uptake, pH-mediated endosomal escape, and the intact peptide
  approaching or seating in an intracellular target pocket, but it must not
  show lesion elimination or any treatment outcome.
- **Shared mechanism v11 and ENDO-205 translation v6:** show selective uptake →
  pH-mediated activation → the intact peptide seated in an illustrated
  intracellular target → a spatially separate, explicitly qualified ENDO-205
  preclinical lesion-elimination beat.
- **ENDO-205 portfolio panorama v6:** distributes that same sequence across a
  native 1774 × 887 full-bleed well matched to the component's 2:1 media
  surface. Tissue and cellular context cross all four
  edges; the intact canonical ring enters through a membrane pocket, remains
  complete through the endosomal states, seats visibly in the illustrated teal
  intracellular target, and only then gives way to a spatially separate
  receding-lesion field. Its first localization beat sits below the top-left
  HTML label-safe zone. Large baked-in ivory margins, obscured steps, or a small
  centered mechanism strip are rejection criteria.
- **ENDO-205 clinical translation v7:** isolates the qualified preclinical
  lesion-elimination sequence on the left from the conceptual Phase 1 study pathway on
  the right. The right side communicates study structure only—never clinical
  efficacy, safety, or outcome.
- **Care-gap selective shift v7:** keeps the current-therapy lesion visibly
  persistent on the left. The right proceeds through an illustrated target
  state to a separately qualified ENDO-205 preclinical lesion-elimination
  beat; it must not read as a clinical before/after result.

Every master containing the platform peptide must use the canonical 13-bead
motif above. Teal, gold, rose, membrane pockets, endosomes, localization
contours, selective threads, and target halos belong to the **surrounding
context**, never to the peptide beads themselves.

## Palette (max 5 areas, colorblind-safe, never red/green)

| Meaning | Hex |
|---|---|
| Background | `#FBFAF8` |
| Peptide motif | orange `#E89A16`, violet `#6F38B5`, warm taupe `#B8AA9B` |
| Selective path / uptake context | `#4A9B8E` / `#2F6E62` |
| Anatomy / linework | `#2E263A` |
| Disease (sparing) | `#C98B84` / `#FBF4F3` |
| Neutral / context | `#B7B2BB` `#EDF5F2` `#F6F3EE` |

---

## 1. Homepage hero — approved mechanism to a qualified clearance endpoint

- **Current production files:** `public/illustrations/hero-home-v8.avif`
  and the deterministic crop
  `public/illustrations/hero-home-mobile-v8.avif`.
- **Placement:** full-bleed homepage hero. Wide 16:9 master; keep the subject
  in the center-right and the left third quiet for the HTML headline,
  subheadline, and CTA.
- **Aspect ratio:** wide 16:9 (with a secondary 21:9 letterbox crop)
- **Suggested file:** `public/illustrations/hero-home-v8.avif`
- **Approved claims (truth.md):** selective uptake through a proprietary
  endocytic pathway, pH-mediated activation, and the separately qualified
  ENDO-205 preclinical lesion-elimination finding. Any intracellular organelle
  or teal contact-pocket detail is an abstract visual bridge from the supplied
  reference, not an additional public mechanism or target claim. The neutral
  cleared field does not imply restored histology, clinical outcome imagery,
  or a platform-wide result.
- **Palette mapping:** the peptide always uses the locked orange/violet/warm
  taupe 13-bead motif. Clinical teal belongs only to the selective thread,
  uptake contour, or tissue context. Background = #FBFAF8; anatomy linework =
  #2E263A; healthy tissue = #EDF5F2 / #F6F3EE; diseased tissue = #C98B84 /
  #FBF4F3.
- **Composition:** Center-right subject placement. The primary focal event is
  the intact canonical ring visibly seated in a teal intracellular target
  pocket inside the rose lesion. A restrained acidified-endosome and escape
  cue precedes it. Farther downstream, repeat that same lesion silhouette as a
  paler receding state before progressively smaller remnants end in a neutral
  cleared field.
  This must read as one lesion changing state, not unrelated floating clusters.
  Healthy surrounding cells remain quiet and spared. Keep the left third clean
  for the HTML headline and qualification.

**Prompt — copy into ChatGPT:**

```text
Clean, precise editorial scientific illustration in the style of a modern Nature Reviews cover graphic — crisp defined edges, clear and detailed anatomical and molecular structure, refined clean linework with subtle flat shading and gentle depth, calm and restrained, generous negative space, publication quality, no text, no labels, no neon, no photorealistic 3D render, no loose watercolor, no fuzzy or diffused abstraction.

SUBJECT: A calm, premium hero image for a precision-medicine biotech homepage. In the CENTER-RIGHT, show one intact instance of the canonical EndoCyclic peptide from docs/assets/canonical-endo-peptide-v1.png physically seated in a defined teal contact pocket inside rose diseased tissue. Treat that pocket as an abstract compositional metaphor from the supplied infographic, not a named or approved molecular target. The ring contains exactly 13 glossy, individually countable beads in the exact upright orange/violet/warm-taupe sequence with no side chains. To the left of that contact, include a restrained acidified-endosome opening and one unchanged ring emerging into the cytoplasm as a purely conceptual visual bridge after pH-mediated activation. To the far right, repeat the SAME lesion silhouette once as a paler, partially receding state, then show progressively smaller and fainter rose remnants ending in a neutral cleared field as the secondary cue for the separately qualified ENDO-205 preclinical lesion elimination finding. Do not imply restored histology. These must read as successive states of one lesion, not unrelated floating clusters. A fine clinical-teal selective thread may guide the sequence, but it must remain outside the peptide and must not recolor any bead. The peptide must never dock on an external plasma membrane, lesion edge, or lesion surface.

CRISP STRUCTURAL DETAIL: every structure must read clearly and legibly with defined edges — the peptide ring's residues are individually distinct and connected; each healthy cell has a clean membrane and a nucleus; the diseased cluster has defined abnormal outlines. Crisp does NOT mean busy: keep it minimal, composed, and airy. Use crisp clean defined vector-like edges rather than soft diffused watercolor edges.

COLOR MAPPING: preserve the canonical peptide colors exactly: orange #E89A16, violet #6F38B5, and warm taupe #B8AA9B, with brown/plum keylines and bronze/tan connectors. Background is a clean, evenly-lit soft off-white (#FBFAF8). Healthy cell membranes and primary structural linework are muted plum-ink (#2E263A); healthy cell interiors are a very soft teal wash (#EDF5F2) or warm neutral (#F6F3EE). The small diseased cluster is dusty rose (#C98B84) over pale rose (#FBF4F3). Clinical teal (#4A9B8E / #2F6E62) is reserved for the selective path or uptake context and never appears on the peptide beads.

COMPOSITION & NEGATIVE SPACE: subject sits in the center-right; keep the ENTIRE LEFT THIRD of the frame as clean empty off-white negative space reserved for a headline and preclinical qualification added later in HTML. Make intracellular target engagement the dominant focal point and the downstream lesion-remnant cue smaller, quieter, and unmistakably secondary. No borders, no gridlines, no drop-shadows, no decorative icons, no scientific diagram lines or axes.

FORMAT: a wide 16:9 horizontal landscape composition (also intended to crop to an ultra-wide 21:9 with the subject held in the central-right sixty percent). Publication quality, isolated conceptual-but-detailed illustration on a clean soft off-white background.

EXCLUSIONS: no text, no labels, no letters or numbers; no neon or glow; no photorealistic 3D render; no loose watercolor and no fuzzy, blurry, or diffused edges — use crisp clean defined edges instead; no dark background and no gradient sky — use a clean evenly-lit soft off-white background; no red and no green; no drop-shadows, borders, or gridlines; no real or accurate chemical formula and no fabricated data, graphs, or efficacy indicators; keep it calm and uncluttered. Please produce 2–3 iterations.
```

- **Avoid:** no text, no labels, no letters or numbers, no captions; no neon or glowing colors; no photorealistic 3D render; no loose watercolor, no fuzzy/diffused/blurry edges, no vague abstraction; no dark background, no gradient sky, no vignette; no red or green; no drop-shadows, borders, gridlines, or decorative icons; no busy clutter; no accurate/real chemical formula or labeled scientific diagram; no fabricated data, graphs, or efficacy indicators; the peptide ring must NOT be a fuzzy bead ring — it must be a clean legible macrocycle of connected residues.
- **Usage:** Export the approved master as
  `public/illustrations/hero-home-v8.avif`, then create
  `public/illustrations/hero-home-mobile-v8.avif` as a deterministic crop.
  Keep the explicit lesion-clearance endpoint adjacent to an HTML qualification identifying
  it as an ENDO-205 preclinical finding. If
  the generator changes any bead count, color adjacency, or orientation,
  composite the canonical sprite rather than accepting a redraw.

---

## 2. The cyclic peptide (macrocycle)

- **Placement:** Hero illustration for the "how a cyclic peptide works" section on /innovation. Centered on the page with a headline/caption overlaid to one side in HTML; the illustration itself carries no baked-in text. Save to public/illustrations/cyclic-peptide.webp.
- **Aspect ratio:** square 1:1
- **Suggested file:** `public/illustrations/cyclic-peptide.webp`
- **Depicts (truth.md):** The locked conceptual platform glyph: one intact,
  upright ring of exactly 13 spherical beads with the approved color sequence,
  no side chains, and no ball-and-stick conversion. It signals the proprietary
  precision peptide platform without claiming a published chemical formula.
- **Palette mapping:** Preserve the canonical orange #E89A16, violet #6F38B5,
  and warm taupe #B8AA9B beads, brown/plum keylines, and bronze/tan connectors.
  Background: soft off-white #FBFAF8. An optional supporting halo may use soft
  teal #EDF5F2, but it cannot overlap or recolor the motif.
- **Composition:** Centered ring occupying the middle ~55-65% of a square frame, faint elliptical tilt, open empty center, symmetrical, floating in generous negative space on all sides for an HTML headline/caption overlay. Upper-left light for subtle depth.

**Prompt — copy into ChatGPT:**

```text
Clean, precise editorial scientific illustration in the style of a modern Nature Reviews cover graphic — crisp defined edges, clear and detailed anatomical and molecular structure, refined clean linework with subtle flat shading and gentle depth, calm and restrained, generous negative space, publication quality, no text, no labels, no neon, no photorealistic 3D render, no loose watercolor, no fuzzy or diffused abstraction.

SUBJECT: Reproduce the canonical conceptual platform motif from docs/assets/canonical-endo-peptide-v1.png as one isolated, upright, nearly front-facing ring with a clean open center. It contains exactly 13 glossy, individually countable spherical beads. Starting from the orange bead at 12 o’clock and reading clockwise: 1 orange, 5 warm taupe, 3 violet, 3 orange, 1 warm taupe. Preserve this exact count, adjacency, and orientation. Use no side chains, appendages, letter labels, or ball-and-stick chemistry.

STRUCTURAL DETAIL: Each residue node has a clean plum-ink outline and a smooth subtle flat/cel shading gradient within it for gentle rounded depth; bonds are clean solid strokes of consistent weight; the ring sits flat and centered, facing the viewer, with a very slight elliptical tilt for grace but still clearly circular. One small, tasteful detail may suggest 3D form — a soft, consistent light from upper-left giving each node a quiet highlight and a faint soft contact shadow beneath the whole ring — but keep edges crisp and defined, not diffused.

COLOR MAPPING: exact canonical peptide colors only—orange #E89A16, violet #6F38B5, warm taupe #B8AA9B, crisp brown/plum keylines, bronze/tan connectors, and consistent upper-left cream highlights. Keep the background evenly-lit soft off-white #FBFAF8. A faint soft-teal #EDF5F2 supporting halo may sit behind the intact ring, but teal never replaces a bead color.

COMPOSITION & NEGATIVE SPACE: The ring is centered and occupies roughly the middle 55–65% of the square frame, floating in generous calm negative space on all sides so a headline or caption can be overlaid in HTML nearby; the open center of the ring stays clean and empty. Balanced, symmetrical, premium, minimal — ruthlessly free of clutter: no gridlines, no borders, no drop-shadow boxes, no decorative icons, no scattered particles, no motion streaks.

FORMAT: square 1:1 aspect ratio. A single isolated illustration on a clean, evenly-lit soft off-white background (not dark, not a gradient sky). Crisp, clean, defined edges rather than soft diffused watercolor edges; a clear detailed conceptual structure rather than a vague fuzzy abstraction. Publication quality, no text, no labels. Iterate 2–3 times, adjusting node spacing and ring symmetry until the macrocycle reads instantly as a clean ring of connected residues.
```

- **Avoid:** No text or labels; no real/accurate chemical formula or invented data; no neon; no photorealistic 3D render; no loose watercolor or fuzzy diffused abstraction; no fuzzy bead cluster (must read as an obvious ring); no dark or gradient-sky background; no gridlines, borders, drop-shadow boxes, decorative icons, scattered particles, or motion streaks; no red/green (colorblind-safe); no dusty rose (no disease element in this image).
- **Usage:** Prefer the deterministic
  `docs/assets/canonical-endo-peptide-v1.svg` or PNG rather than regenerating
  the isolated glyph. If a raster derivative is required, preserve exact bead
  centers, scale, orientation, and color sequence.

---

## 3. Mechanism stage 3 — pH-mediated activation

- **Placement:** third beat inside the shared mechanism master
  `public/illustrations/selective-mechanism-v11.avif`, following Target and Enter.
- **Depicts (truth.md):** The already-internalized canonical peptide inside a
  clearly acidified endosome. pH-mediated activation is communicated by the
  endosomal environment, a restrained proton/pH field, and a contextual
  antique-gold cue—not by changing the peptide. The same intact ring appearing
  immediately afterward in the cytoplasm remains a conceptual visual detail,
  not an additional public mechanism claim.
- **Sequence guardrail:** The ring must already be inside the cell after
  selective uptake. Activation must occur inside the acidified endosome, then a
  second unchanged ring must be visibly outside that opening endosome in the
  cytoplasm. Never place activation at the tissue boundary before entry, never
  imply external plasma-membrane or lesion-surface docking, and never use a
  gray-to-teal molecular “switch.”
- **Palette mapping:** The peptide remains canonical orange/violet/warm taupe.
  Endosomal membrane and disease context may use rose/plum; selective-entry
  context may use teal; the acidified/pH cue may use restrained antique gold.

**Prompt — copy into ChatGPT:**

```text
Clean, precise editorial scientific illustration in the style of a modern Nature Reviews cover graphic — crisp defined edges, clear and detailed anatomical and molecular structure, refined clean linework with subtle flat shading and gentle depth, calm and restrained, generous negative space, publication quality, no text, no labels, no neon, no photorealistic 3D render, no loose watercolor, no fuzzy or diffused abstraction.

Subject: stage 3, Escape. Show the canonical 13-bead EndoCyclic peptide already enclosed inside a clean acidified endosome within a diseased cell, after selective uptake has occurred. Preserve the exact upright orange/violet/warm-taupe bead sequence from docs/assets/canonical-endo-peptide-v1.png. Communicate pH-mediated activation through a restrained warm acidic field inside the endosome, small abstract proton-context marks, and an antique-gold environmental cue around the intact ring. Then show that endosomal boundary opening in a controlled, nonviolent way and one identical intact canonical ring immediately outside it in the cytoplasm, establishing successful intracellular access. Do not recolor, deform, open, or add appendages to either peptide appearance.

Color mapping: preserve the canonical peptide colors exactly. Background is soft off-white #FBFAF8; primary structure is muted plum-ink #2E263A; the endosome uses dusty rose #C98B84 / pale rose #FBF4F3; selective-entry context may use clinical teal #4A9B8E / #2F6E62; the pH field uses restrained antique gold. Context color surrounds the ring and never replaces a bead color.

Composition: the acidified endosome and conceptual intracellular-access event are one continuous left-to-right beat. Center the first intact canonical ring inside the acidified endosome, open the endosomal boundary on its right side, and place the second unchanged ring just beyond that opening in the diseased-cell cytoplasm. Preserve a clear visual handoff from the early-endosome Enter beat on the left toward the illustrated-target and ENDO-205 evidence beat on the right. Do not show the ring seated in a target pocket until stage 4. Keep callouts and all stage labels in accessible HTML.

Style reminders phrased both ways: use crisp, clean, defined edges rather than soft, diffused watercolor edges; use a clean, evenly-lit soft off-white background, not a dark or gradient one; render clearly legible structures (an obvious ring of connected beads, defined cell membranes, a distinct nucleus, a defined rose lesion zone) rather than vague fuzzy blobs. No text, no labels, no numbers, no real or invented chemical formulas, no neon, no glow, no drop-shadows, no borders or frames, no decorative icons, no photorealistic 3D. Publication quality, isolated conceptual-but-detailed illustration on a clean soft off-white background. Please generate this as a square 1:1 image, and run 2–3 iterations to refine.
```

- **Avoid:** No text, no labels, no numbers, no letters. No real or invented chemical formulas or labeled diagram callouts. No neon or glow. No photorealistic 3D render. No loose watercolor, no fuzzy, diffused, or abstract blobs — use crisp, clean, defined edges instead. No dark background and no gradient sky — keep an evenly lit soft off-white ground. No red or green (colorblind-safe). No busy or loud composition, no clutter, no borders/frames, no drop-shadows, no decorative icons or sparkles. Do not depict a vague fuzzy bead ring — the cyclic peptide must read as an obvious, cleanly drawn closed loop of connected residues.
- **Usage:** This is stage 3 of
  `public/illustrations/selective-mechanism-v11.avif`. Reject any version that
  puts activation before uptake, omits the cytoplasmic escape, changes the
  canonical peptide, or docks it on an external membrane or lesion surface.

---

## 4. Mechanism stage 2 — Enter through selective uptake

- **Placement:** second beat inside the shared mechanism master
  `public/illustrations/selective-mechanism-v11.avif`, after Target and before
  Escape.
- **Depicts (truth.md):** A diseased cell internalizing the intact canonical
  peptide through a membrane pocket into an early endosome, while nearby healthy
  tissue remains quiet. This illustrates selective uptake via the proprietary
  endocytic pathway.
- **Palette mapping:** The peptide remains canonical orange/violet/warm taupe.
  Clinical teal belongs to the uptake path and membrane-entry contour; rose/plum
  defines diseased tissue and the early endosome.
- **Composition:** Targeted ring → invaginating membrane pocket → closed early
  endosome. Do not add an acidified pH field until stage 3.

**Prompt — copy into ChatGPT:**

```text
Clean, precise editorial scientific illustration in the style of a modern Nature Reviews cover graphic — crisp defined edges, clear and detailed anatomical and molecular structure, refined clean linework with subtle flat shading and gentle depth, calm and restrained, generous negative space, publication quality, no text, no labels, no neon, no photorealistic 3D render, no loose watercolor, no fuzzy or diffused abstraction.

SUBJECT — stage 2, ENTER. One diseased cell internalizes the intact canonical cyclic-peptide motif by endocytosis while an adjacent healthy cell is passed over and takes up nothing. This beat follows Target and precedes acidified-endosome activation.

COMPOSITION (square 1:1, center-out with a clear left→right read):
- CENTER-RIGHT, the DISEASED CELL, drawn large and detailed as the hero: a cleanly outlined rounded cell with a crisply drawn membrane rendered in dusty rose (#C98B84 line) with a very pale rose interior fill (#FBF4F3), a defined round nucleus inside drawn in muted plum-ink (#2E263A) with a slightly darker plum nucleolus, and a few restrained interior organelle hints. Show the membrane cleanly INVAGINATING—a smooth, defined pocket dimpling inward—around the intact canonical peptide. Just inside, show a defined, closed early ENDOSOME that clearly contains the same unchanged canonical motif, making internalization unambiguous. Do not add an acidified field, pH cue, cytoplasmic escape, or intracellular target in this Enter stage.
- THE PEPTIDE: use the exact canonical 13-bead motif from docs/assets/canonical-endo-peptide-v1.png for every appearance: upright orange/violet/warm-taupe sequence, no recoloring, no side chains, and no bead-count changes. Show one ring at the membrane pocket and, only if scale permits at least 48–56 CSS pixels in final use, one identical ring enclosed inside the early endosome. Use a teal directional contour around the entry event rather than on the peptide.
- LEFT / LOWER-LEFT, the HEALTHY CELL, drawn slightly smaller and quieter: a cleanly outlined cell with an intact, smooth, un-invaginated membrane. If a canonical ring appears nearby, it remains outside. This contrast—diseased cell entry, healthy cell not internalizing—is the whole point.
- Keep the two cells clearly separated with calm negative space between and around them; do not crowd the frame. Leave quiet open space at the top (and/or lower center) for a caption added later in HTML.

COLOR MAPPING (use ONLY these, max 5 color areas, colorblind-safe, no red/green):
- Background: clean, evenly-lit soft off-white #FBFAF8 filling the whole panel — never dark, never a gradient sky, rather a flat calm paper ground.
- Selective uptake path and membrane-entry contour = clinical teal (#4A9B8E fill, #2F6E62 line). The peptide itself retains its canonical colors.
- Healthy cell = calm teal linework with a pale teal wash interior (#EDF5F2), quieter and less saturated than the drug rings.
- Diseased cell membrane / disease context = dusty rose line (#C98B84) with pale rose fill (#FBF4F3), used sparingly and warmly, only for the diseased cell and its endocytic vesicles.
- Primary structure linework / nuclei = muted plum-ink (#2E263A). Any neutral spacing/context = soft cool gray (#B7B2BB) very sparingly.

STYLE NOTES: crisp, clean, defined edges rather than soft diffused watercolor edges; subtle flat / cel shading with gentle depth rather than heavy realistic rendering; every structure clearly legible — the ring reads unmistakably as a ring of connected residues, the invagination reads clearly as a membrane pocket folding inward, the endosome reads clearly as a closed vesicle holding the drug. Calm and restrained, not busy or loud, not cluttered. No gridlines, no borders, no drop shadows, no decorative icons, no arrows-with-text, no numbers, no chemical formulas, no letters anywhere. A clean, evenly-lit soft off-white background, not dark.

FORMAT: stage 2 within the wide shared mechanism master. Publication quality on a clean soft off-white background. Iterate to tighten the membrane invagination, early endosome, and exact canonical peptide rendering.
```

- **Avoid:** No text, labels, numbers, or chemical formulas; no arrows-with-text; no red or green; no neon; no dark or gradient background; no photoreal 3D render; no loose/fuzzy watercolor or diffused abstraction; no gridlines, borders, drop shadows, or decorative icons; no fabricated exact chemical structure — the cyclic peptide is a clean conceptual ring of connected residues, not a real labeled molecule.
- **Usage:** This is stage 2 of
  `public/illustrations/selective-mechanism-v11.avif`. It must appear before the
  acidified-endosome activation and cytoplasmic-escape beat. Keep labels in
  HTML.

---

## 5. ENDO-205 evidence — illustrated target and lesion elimination

- **Placement:** fourth and final beat inside
  `public/illustrations/selective-mechanism-v11.avif`, after Target, Enter, and
  Escape.
- **Depicts (truth.md):** First, the intact canonical peptide physically
  seated in a teal abstract intracellular target pocket inside the diseased
  cell. Second, a restrained conceptual representation of the approved
  ENDO-205 preclinical finding: elimination of endometriosis lesions and
  associated inflammation, with surrounding tissue visually spared.
- **Qualification guardrail:** This stage is specific to **ENDO-205
  preclinical evidence**. It is not a platform-wide mechanism claim, a clinical
  outcome, an efficacy rate, or a promise. Keep “preclinical” and the
  conceptual-disclosure language in accessible HTML adjacent to the art.
- **Palette mapping:** Background #FBFAF8 (flat, evenly lit). Intracellular
  target = clinical teal #4A9B8E / #2F6E62. Diseased-cell cytoplasm and receding
  lesion = dusty rose #C98B84 line + pale rose #FBF4F3 fill. Healthy spared
  tissue = quiet teal/neutral washes with muted plum-ink #2E263A structure.
  Optional context halo = soft teal #EDF5F2 or warm neutral #F6F3EE. No red,
  no green.
- **Composition:** The final quarter has two immediately connected sub-beats.
  First, inside the rose diseased-cell cytoplasm, the intact canonical peptide
  is visibly seated in a defined pocket on a teal abstract intracellular
  target. Second, downstream of that engagement, the lesion recedes into
  progressively fewer and smaller crisp fragments toward a calm cleared
  opening. An orderly field of healthy cells remains pristine around the
  transition. Keep the peptide large enough to read as the locked 13-bead
  motif, make peptide-to-target contact unmistakable, and keep the lesion
  fragments subordinate to the engagement event.

**Prompt — copy into ChatGPT:**

```text
Clean, precise editorial scientific illustration in the style of a modern Nature Reviews cover graphic — crisp defined edges, clear and detailed anatomical and molecular structure, refined clean linework with subtle flat shading and gentle depth, calm and restrained, generous negative space, publication quality, no text, no labels, no neon, no photorealistic 3D render, no loose watercolor, no fuzzy or diffused abstraction.

SUBJECT — stage 4, ENDO-205 evidence: following Target → Enter → Activate, show the intact canonical peptide visibly seated in an illustrated intracellular-target pocket inside the diseased cell, then show the qualified ENDO-205 preclinical lesion-elimination finding downstream. The peptide must be seated in a teal intracellular-target pocket within rose cytoplasm; it must never dock on the external plasma membrane, lesion boundary, or lesion surface. After that unambiguous illustrated contact state, show the same lesion resolving while surrounding tissue remains visibly spared. This is a preclinical evidence beat, not a clinical result or a universal platform claim. Controlled and nonviolent; no explosion, burning, or tearing.

COMPOSITION — use the rightmost quarter of the shared landscape master as one continuous left-to-right intracellular-to-tissue sequence. FIRST SUB-BEAT: within the rose cytoplasm of the diseased cell, draw one abstract folded intracellular target in clinical teal with a crisp, concave binding pocket. Seat one exact intact canonical 13-bead ring from docs/assets/canonical-endo-peptide-v1.png deeply enough in that pocket that their contours visibly overlap and touch; the ring may remain mostly visible, but it cannot float beside or above the target. This contact is the focal point. Do not place the target outside the cell, and do not place the peptide on the external plasma membrane, lesion edge, or lesion surface. SECOND SUB-BEAT: downstream and spatially separate from the teal intracellular target, continue the same dusty-rose lesion identity into fewer and smaller cleanly drawn fragments that recede toward a calm cleared opening. Render the lesion in restrained dusty rose (#C98B84) outline with a pale rose fill (#FBF4F3), and keep the recession controlled and orderly with crisp edges rather than smearing. SURROUNDING both sub-beats: a clean, orderly, well-rendered field of healthy cells with defined membranes and small round nuclei. The healthy cells are pristine, uniform, and untouched right up to the receding lesion boundary—clearly spared. The canonical peptide remains intact, upright, and unchanged: exactly four orange beads, six warm-taupe beads, and three violet beads in the locked sequence. Use muted plum-ink (#2E263A) for faint structural outlines and a restrained clinical-teal thread for visual continuity from cytoplasmic escape into the intracellular target.

COLOR MAPPING (use ONLY these, max ~5 areas, colorblind-safe, NO red, NO green): background = clean warm soft off-white #FBFAF8, evenly lit and flat, never dark and never a gradient sky. The intracellular target = clinical teal #4A9B8E with #2F6E62 pocket and edge emphasis; make the target crisp, legible, and clearly distinct from the rose cytoplasm. The diseased-cell cytoplasm and receding lesion = sparing dusty rose #C98B84 line with pale rose #FBF4F3 fill. Healthy spared tissue / cells = quiet teal #EDF5F2 or warm neutral #F6F3EE with thin muted-plum structure. Primary structure outline = muted plum-ink #2E263A. Preserve the canonical peptide colors exactly and do not transfer teal into its beads.

STYLE ENFORCEMENT — crisp, clean, defined edges rather than soft diffused watercolor edges; clearly legible cell membranes and nuclei rather than a fuzzy wash of blobs; a clean, evenly-lit soft off-white background, not dark and not a gradient. Subtle flat/cel shading and gentle depth only; refined thin linework; ruthless clutter removal — no gridlines, no borders, no drop shadows, no decorative icons, no glow, no sparkles. Calm and minimal with generous negative space.

FORMAT — fourth beat in the wide shared mechanism master, with line weight, cell style, and palette consistent with Target, Enter, and Escape. Leave all qualification and disclosure text in HTML.

Iterate 2–3 times: first verify that the intact canonical ring is unmistakably seated in the teal intracellular target pocket inside rose cytoplasm; reject the pass if the ring merely floats nearby or appears attached to an external surface. Then refine the downstream lesion so it reads as clearly receding/clearing—fewer, smaller, crisp fragments dissolving to a clean center—while surrounding cells stay pristine and untouched.
```

- **Avoid:** No external plasma-membrane docking, lesion-edge contact, or
  lesion-surface attachment. No peptide floating beside the intracellular
  target. No text or labels. No dark or gradient background. No
  loose/diffused watercolor edges or fuzzy blobs. No neon, glow, sparkles, or
  drop shadows. No photorealistic 3D render. No violence—the lesion gently
  recedes. No red/green. No gridlines, borders, decorative icons, fabricated
  chemical structures, formulas, efficacy figures, or real labeled diagram.
- **Usage:** Stage 4 of
  `public/illustrations/selective-mechanism-v11.avif`. The HTML label must read
  as qualified ENDO-205 preclinical evidence and must not imply clinical
  clearance.

---

## 6. Selective targeting at tissue scale

- **Placement:** /innovation or /impact — full-width or two-thirds editorial figure illustrating the platform's core claim ("acts only where disease lives"). Reserve the left third or a clean horizontal band along the top as calm negative space for an HTML headline/caption overlay; keep the lesion + peptide cluster anchored right-of-center so text does not collide with the key structures. Export at 3:2, ~2400×1600px, transparent or soft off-white background. File: public/illustrations/selective-targeting.webp
- **Aspect ratio:** landscape 3:2
- **Suggested file:** `public/illustrations/selective-targeting.webp`
- **Depicts (truth.md):** A tissue cross-section in which several unchanged
  canonical 13-bead peptide motifs concentrate at one clearly bounded
  endometriosis lesion while healthy tissue stays quiet. No data, chemical
  formula, or outcome claim.
- **Palette mapping:** Peptides retain the locked orange/violet/warm-taupe
  sequence. Teal #4A9B8E / #2F6E62 is reserved for selective paths, uptake
  contours, and localization context. Lesion = #C98B84 / #FBF4F3; anatomy =
  #2E263A; healthy context = #B7B2BB / #F6F3EE.
- **Composition:** Healthy tissue fills most of the frame; the lesion sits as a
  bounded island right-of-center; canonical rings cluster at its boundary with
  a sparse trail elsewhere. Contextual teal guides the eye to the lesion.

**Prompt — copy into ChatGPT:**

```text
Clean, precise editorial scientific illustration in the style of a modern Nature Reviews cover graphic — crisp defined edges, clear and detailed anatomical and molecular structure, refined clean linework with subtle flat shading and gentle depth, calm and restrained, generous negative space, publication quality, no text, no labels, no neon, no photorealistic 3D render, no loose watercolor, no fuzzy or diffused abstraction.

Subject: a tissue cross-section illustrating a targeted precision-medicine peptide that concentrates at diseased tissue. Across most of the frame, draw a broad, calm, orderly field of healthy tissue. Right of center, draw one clearly bounded endometriosis lesion in restrained rose. In and along its edge, place several exact instances of the canonical 13-bead EndoCyclic motif from docs/assets/canonical-endo-peptide-v1.png, preserving the upright orange/violet/warm-taupe sequence in every ring. Use a fine clinical-teal selective path or localization contour around the lesion to communicate targeting; do not recolor the rings.

Color mapping: preserve the peptide's canonical orange #E89A16, violet #6F38B5, and warm taupe #B8AA9B beads. Use clinical teal #4A9B8E / #2F6E62 only for the selective path or localization contour; dusty rose #C98B84 / #FBF4F3 for the lesion; plum-ink #2E263A for structure; and #B7B2BB / #F6F3EE for healthy context on #FBFAF8.

Composition: center-out, left-to-right visual flow. Healthy tissue is a calm orderly field; the lesion is a single distinct island right-of-center; the canonical peptide motifs cluster on and around it along a precise teal contextual path. Leave the left third or top band open for HTML.

Style guardrails: crisp, clean, defined edges rather than soft diffused watercolor edges; clear legible structures rather than vague fuzzy blobs — every cyclic peptide must read as an obvious closed ring of connected residues, and the lesion boundary must be sharply defined; a clean, evenly-lit soft off-white background, not dark and not a gradient sky; subtle flat/cel shading with gentle depth, not a photorealistic 3D render; calm and minimal, not busy or loud. No text, no labels, no numbers, no gridlines, no borders, no drop-shadows, no decorative icons, no neon or glow. This is a conceptual-but-detailed illustration, not an accurate labeled diagram or real chemical formula.

Aspect ratio: landscape three-by-two (wider than tall). Publication quality, isolated illustration on a clean soft off-white background. Generate two to three iterations and keep the cleanest, most legible one.
```

- **Avoid:** no text, no labels, no numbers, no measurement callouts; no dark or gradient-sky background (use flat soft off-white); no loose watercolor, no fuzzy or diffused edges, no vague abstraction; no photorealistic 3D render; no neon or glow; no red or green; no drop-shadows, gridlines, borders, or decorative icons; do not draw a real labeled medical diagram or accurate chemical formula; do not overcrowd — keep generous negative space; peptide rings must stay legible closed loops, not fuzzy blobs.
- **Usage:** Generate 2–3 iterations; keep the version where the cyclic peptide rings read as obvious closed loops of connected residues and the lesion boundary is crisply defined. If the healthy tissue reads as busy or the lesion bleeds outward, ask for "cleaner cell spacing and a sharper lesion boundary." Convert final PNG to WEBP at the target path.

---

## 7. Endometriosis biology (tasteful, detailed)

- **Placement:** /impact page — hero or section-opening editorial illustration accompanying the endometriosis disease-burden narrative (190M+ women, 8-year diagnostic delay). Sits beside or behind an overlaid stat/headline; reserve calm negative space on one side (see composition) for that text.
- **Aspect ratio:** landscape 3:2
- **Suggested file:** `public/illustrations/endometriosis-biology.webp`
- **Depicts (truth.md):** Endometriosis: a crisp pelvic/uterine cross-section showing endometrial-like tissue growing OUTSIDE the uterus as defined lesions on the ovaries, outer fallopian tube, and pelvic wall, with subtle localized inflammation. Traces to truth.md: "Chronic disease characterized by growth of endometrial-like tissue outside the uterus." Purely conceptual-anatomical — no data, no efficacy claim, no drug, no real labeled diagram.
- **Palette mapping:** Background: clean warm soft off-white #FBFAF8 (evenly lit, flat, never dark). Anatomy outlines and primary structure linework: muted plum-ink #2E263A. Uterus/tube/ovary body fill: warm neutral #F6F3EE (with soft cool gray #B7B2BB for gentle depth/shadow on organ forms). Healthy endometrial lining inside the uterus (the one desired/normal note): clinical teal #4A9B8E with deeper teal #2F6E62 as its crisp edge line. Disease — the endometriosis lesions and their inflammation halos: dusty rose #C98B84 outlines with pale rose #FBF4F3 fill, used SPARINGLY on only the ectopic nodules. Max five distinct color areas; colorblind-safe; no red or green.
- **Composition:** Center-left: crisp anatomical cross-section of the uterus and adnexa (uterus, cervix, both fallopian tubes, both ovaries) rendered in clean plum-ink linework with a warm-neutral fill, occupying roughly the left 55–60% of the frame. Endometrial-like lesions (defined dusty-rose masses with pale-rose fill) appear OUTSIDE the uterus — a few small ones on the ovarian surfaces, on the outer tube, and one on the pelvic sidewall/peritoneum — each a legible, discrete abnormal tissue nodule with subtle rose inflammation halos. The right 40% is calm, near-empty soft off-white negative space reserved for an overlaid headline/stat. A single clinical-teal accent marks the healthy endometrial lining inside the uterus, keeping teal as the small, most-saturated focal note against the quieter rose disease and neutral anatomy.

**Prompt — copy into ChatGPT:**

```text
Clean, precise editorial scientific illustration in the style of a modern Nature Reviews cover graphic — crisp defined edges, clear and detailed anatomical and molecular structure, refined clean linework with subtle flat shading and gentle depth, calm and restrained, generous negative space, publication quality, no text, no labels, no neon, no photorealistic 3D render, no loose watercolor, no fuzzy or diffused abstraction.

Subject: a dignified, textbook-clean anatomical cross-section of the female pelvic organs illustrating endometriosis. Draw the uterus, cervix, both fallopian tubes, and both ovaries as clearly legible, cleanly-outlined structures with defined edges — muscular uterine wall, an open central cavity, the tubes arcing out to each ovary. Show endometrial-like tissue growing OUTSIDE the uterus as several small, discrete, clearly-drawn abnormal lesion nodules: a few on the surface of the ovaries, one on the outer wall of a fallopian tube, and one on the pelvic sidewall. Each lesion is a defined tissue mass with a subtle soft inflammation halo around it — clinical and respectful, never graphic, bloody, or distressing. Inside the uterus, show the healthy endometrial lining as a single clean accent band. Keep every structure crisp and anatomically grounded so the whole reads clearly at a glance; crisp clean defined edges rather than soft diffused watercolor edges.

Color mapping — use ONLY these exact colors: a clean, evenly-lit soft off-white background #FBFAF8 (never dark, never a gradient); all anatomy outlines and primary linework in muted plum-ink #2E263A; the uterus, tubes and ovary bodies filled in warm neutral #F6F3EE with soft cool gray #B7B2BB for gentle rounded depth and shading; the healthy endometrial lining inside the uterus in clinical teal #4A9B8E with a deeper teal #2F6E62 edge line — this teal is small and the most saturated, sharpest note in the image; the endometriosis lesions and their inflammation halos in dusty rose #C98B84 outlines with pale rose #FBF4F3 fill, used sparingly on only the ectopic nodules. Maximum five distinct color areas, colorblind-safe, absolutely no red and no green.

Composition: place the pelvic cross-section in the center-left, occupying about the left 55–60% of the frame, with the ectopic lesions arranged around the ovaries, outer tube, and pelvic wall outside the uterus. Leave the right roughly 40% of the frame as calm, near-empty clean off-white negative space for a headline or statistic to be overlaid later in HTML. Consistent, restrained visual hierarchy: the healthy teal lining and the rose lesions are the meaningful accents; everything else stays quiet and neutral. Landscape orientation, 3:2 aspect ratio (wider than tall).

Exclusions — stated plainly: no text, no labels, no numbers, no leader lines or callouts; no gore, no blood, no red; no neon and no glow; a clean evenly-lit soft off-white background, not dark and not a gradient sky; crisp clean linework rather than loose watercolor or fuzzy blur; flat cel-style shading rather than a photorealistic 3D render; no drop-shadows, borders, gridlines, or decorative icons; not overcrowded — keep it minimal, calm, and legible. Do not invent an accurate labeled medical diagram or any chemical formula — keep it a clean, detailed conceptual anatomical illustration. Publication quality, isolated illustration on a clean soft off-white background.
```

- **Avoid:** No text, labels, numbers, or callout leader lines baked into the image. No graphic or distressing gore, no blood, no red. No neon or glow. No dark or gradient background. No loose watercolor, fuzzy diffusion, or vague abstraction. No photorealistic 3D render. No drop-shadows, borders, gridlines, or decorative medical icons. No overcrowding — keep it minimal and calm. Do not attempt an accurate real chemical structure or a textbook-precise labeled medical diagram.
- **Usage:** Save to public/illustrations/endometriosis-biology.webp (export the ChatGPT PNG, then convert to WebP). Run 2–3 iterations: check that (1) lesions read clearly as OUTSIDE the uterus, not inside; (2) the right-side negative space stays clean for headline overlay; (3) teal stays small and reserved for the healthy lining, with rose used only on the ectopic nodules. Nudge "more restrained, more negative space" if it comes back busy.

---

## 8. FemLUNA — targeted non-invasive imaging

- **Current production files:** `public/illustrations/femluna-targeting-v3.avif`
  (3:2 master),
  `public/illustrations/femluna-targeting-v3-portrait.avif` (4:5
  art-directed derivative), and
  `public/illustrations/femluna-comparison-targeted-v2.avif` (targeted
  comparison state).
- **Responsive art direction:** The portrait derivative is a crop of the approved master centered on the pelvic anatomy and targeted peptide. It is served below 640px and from 1024px upward, where the hero frame is portrait; the landscape master remains the source for the 640–1023px landscape frame. This avoids browser upscaling and preserves the scientific focal point without downloading both assets.
- **Placement:** /imaging page — hero or lead concept illustration. Landscape 3:2. Reserve calm negative space in the upper band and along the left third for an HTML headline/caption overlay (e.g. "Non-invasive. Targeted. Sub-millimeter."). The illustration weight sits center-right; the left third stays quiet off-white for text. File saved to public/illustrations/femluna-imaging.webp.
- **Aspect ratio:** landscape 3:2 (horizontal, roughly 1500x1000)
- **Suggested file:** `public/illustrations/femluna-targeting-v3.avif`
- **Depicts (truth.md):** FemLUNA non-invasive targeted imaging: a clean plum-ink pelvic anatomy cross-section scanned from outside the body by a soft radiation-free imaging field, where a teal targeted imaging agent binds a small sub-millimeter endometriosis lesion and makes it pop with a clean teal highlight and halo, while an identical untagged lesion stays faint gray to show the contrast versus standard imaging.
- **Palette mapping:** Background: soft off-white #FBFAF8. Anatomy linework:
  muted plum-ink #2E263A with pale warm-neutral fill. Every peptide/probe ring
  uses the canonical orange/violet/warm-taupe motif. Clinical teal
  #4A9B8E / #2F6E62 belongs to the detected-lesion halo, localization contour,
  and scan context—not the peptide beads.
- **Composition:** Horizontal 3:2, center-out flow. External scan arcs enter from the left in pale lilac/teal wash; female pelvic cross-section (uterus, fallopian tubes, ovaries) sits slightly right of center in muted plum-ink outline with pale warm fill. Teal-highlighted target lesion with a clean concentric halo is the focal point at center-right; a same-size faint gray untagged lesion sits elsewhere for contrast. Left third and upper band left as open off-white negative space for HTML headline/caption.

**Prompt — copy into ChatGPT:**

```text
Clean, precise editorial scientific illustration in the style of a modern Nature Reviews cover graphic — crisp defined edges, clear and detailed anatomical and molecular structure, refined clean linework with subtle flat shading and gentle depth, calm and restrained, generous negative space, publication quality, no text, no labels, no neon, no photorealistic 3D render, no loose watercolor, no fuzzy or diffused abstraction.

SUBJECT: A conceptual illustration of a non-invasive, targeted molecular imaging agent detecting a tiny endometriosis lesion in the female pelvis. Center-right of the composition: a clean, simplified anatomical cross-section of the female pelvic region — a smooth uterus with the two fallopian tubes curving outward and small rounded ovaries at each side — drawn as confident, even-weight outlines in muted plum-ink (#2E263A) with a very pale warm neutral fill (#F6F3EE), like an elegant medical atlas plate. Keep the anatomy calm and legible with clean interior linework, no clutter, no extra organs.

KEY STORY (make this the clear focal point): on the outer surface of one fallopian tube or the pelvic wall sits a very small, defined abnormal tissue mass—a sub-millimeter endometriosis lesion. Highlight the lesion with a clean clinical-teal localization contour, not a diffuse glow. Show a restrained number of exact canonical 13-bead EndoCyclic ring motifs converging on the lesion; preserve their orange/violet/warm-taupe sequence and use teal only in the surrounding localization path.

CONTRAST ELEMENT: elsewhere on the anatomy, place ONE more identical small lesion of the same size that is NOT highlighted — rendered only as a faint, barely-visible soft cool gray (#B7B2BB) outline with no halo, representing how the same sub-millimeter lesion looks faint and easily missed on standard imaging. The visual point: teal-tagged lesion pops and reads instantly; the gray untagged one nearly disappears. Keep both lesions the same small scale.

NON-INVASIVE SCAN INDICATION: from OUTSIDE the body, on the left, suggest a gentle, radiation-free external scan reaching the anatomy — depict this as a few clean, evenly-spaced concentric arcs or a soft directional sweep in quiet soft lilac (#F4F1F8) / soft teal wash (#EDF5F2) sweeping left-to-right across the pelvis, like a calm imaging field passing through non-invasively. Crisp thin arc lines, not rays, not beams, no scanner machine, no needles — nothing invasive. This reinforces "imaged from outside, no surgery."

COLOR MAPPING (use ONLY these, max 5 color areas): background = clean warm soft off-white #FBFAF8, evenly lit, flat, never dark and never a gradient sky. Anatomy outlines + primary linework = muted plum-ink #2E263A. The targeted imaging agent, the successfully-detected lesion highlight and its clean halo = clinical teal #4A9B8E with #2F6E62 for crisp emphasis lines — this is the most saturated, sharpest, highest-contrast element. The faint undetected/standard-imaging lesion = soft cool gray #B7B2BB, quiet and recessive. External scan field context = soft lilac #F4F1F8 and soft teal wash #EDF5F2, kept pale and subordinate. Optional pale warm neutral #F6F3EE for anatomy fill. Do NOT use red or green. Keep teal clearly the hero color.

COMPOSITION & NEGATIVE SPACE: horizontal landscape, center-out flow with the external scan entering from the left and resolving on the highlighted teal lesion at center-right. Anatomy sits slightly right of center. Keep the LEFT THIRD and the upper band as calm open off-white negative space for a later HTML headline/caption — do not fill it with detail. Strong visual hierarchy: the teal-tagged lesion is unmistakably the first thing the eye lands on. Ruthless clutter removal — no gridlines, no borders, no drop-shadows, no decorative icons, no scanner hardware, no measuring rulers.

RENDERING: crisp, clean, defined edges rather than soft diffused watercolor edges; refined even linework with subtle flat/cel shading and gentle depth rather than heavy rendering or photoreal 3D; a clean, evenly-lit soft off-white background, not dark, not textured, not a gradient. Calm, minimal, on-palette, publication quality, isolated illustration on a clean soft off-white background.

EXCLUSIONS: no text, no letters, no numbers, no labels, no callout lines, no legends; no neon or glowing saturated light; no red and no green anywhere; no photorealistic 3D render; no loose or fuzzy watercolor; no diffused or abstract smudges (the lesion must be a defined shape); no dark or black background; no scanner machine, no medical device, no needles, no surgical tools, no laparoscope; no busy or cluttered detail; no realistic gore or graphic anatomy — keep it clean and editorial.

ASPECT RATIO: horizontal landscape, three-by-two (roughly 1500 by 1000).

Iterate 2–3 times: (1) confirm the teal-tagged lesion with its clean halo is the clear focal point and the gray untagged lesion is genuinely faint for contrast; (2) confirm the pelvic anatomy reads clearly and cleanly with crisp plum-ink outlines and no clutter; (3) confirm the left third stays as open off-white negative space and all edges are crisp rather than watercolor-soft.
```

- **Avoid:** No text/labels/callouts/legends; no red or green; no neon or glow; no photoreal 3D; no loose/fuzzy watercolor or diffuse smudges (lesion must be a defined shape); no dark or gradient background; no scanner hardware, medical device, needles, or surgical/laparoscopic tools; no clutter, gridlines, borders, or drop-shadows; no graphic gore.
- **Usage:** Export the approved master as
  `public/illustrations/femluna-targeting-v3.avif`, derive
  `public/illustrations/femluna-targeting-v3-portrait.avif` mechanically, and
  use `public/illustrations/femluna-comparison-targeted-v2.avif` for the
  targeted comparison state. Keep claims and labels in HTML.

---

## 9. Oncology — reaching an undruggable intracellular target in a cold tumor

- **Current production files:** `public/illustrations/oncology-pair-v4.avif`
  with deterministic derivatives
  `public/illustrations/endo-311-localization-pair-v4.avif` and
  `public/illustrations/endo-995-intracellular-v4.avif`.
- **Placement:** /pipeline oncology section (ENDO-995 tumor-selective cyclic peptide). Landscape banner or right-hand hero illustration beside the oncology copy; the calm off-white space at the top-left and lower band is reserved for an HTML headline/caption overlay. Save to public/illustrations/oncology-cold-tumor.webp.
- **Aspect ratio:** landscape 3:2 (horizontal, roughly 1.5 times as wide as it is tall)
- **Suggested file:** `public/illustrations/oncology-pair-v4.avif`
- **Depicts (truth.md):** A cold solid-tumor context where the unchanged
  canonical peptide crosses a tumor-cell membrane toward a defined abstract
  intracellular binding pocket. Grounded in ENDO-995's selective uptake and
  intracellular-target access; no result or efficacy state is shown.
- **Palette mapping:** Peptide = canonical orange/violet/warm taupe. Teal
  #4A9B8E / #2F6E62 = selective path, membrane-access contour, and target
  context. Plum = structure; cool gray and rose = tumor context.
- **Composition:** Quiet tumor context at left; enlarged hero cell with the
  canonical ring crossing its membrane at center-right. Do not recolor cells as
  a result state or imply restored responsiveness visually.

**Prompt — copy into ChatGPT:**

```text
Clean, precise editorial scientific illustration in the style of a modern Nature Reviews cover graphic — crisp defined edges, clear and detailed anatomical and molecular structure, refined clean linework with subtle flat shading and gentle depth, calm and restrained, generous negative space, publication quality, no text, no labels, no neon, no photorealistic 3D render, no loose watercolor, no fuzzy or diffused abstraction.

SUBJECT: A conceptual cross-section of a solid "cold" tumor and the moment a targeted peptide reaches an abstract intracellular target inside one tumor cell. On the left, show a restrained cluster of muted tumor cells. At center-right, show one enlarged cell with a clean double-line membrane, cytoplasm, and nucleus. One exact canonical EndoCyclic ring—13 upright, individually countable orange/violet/warm-taupe beads in the locked sequence—crosses the membrane and proceeds toward a defined abstract intracellular binding pocket. A thin clinical-teal contour can indicate the access path. Keep tissue state consistent across the frame; do not depict a gray-to-teal result transformation.

COLOR MAPPING: background #FBFAF8. Preserve the peptide's canonical orange #E89A16, violet #6F38B5, and warm taupe #B8AA9B colors. Use clinical teal #4A9B8E / #2F6E62 only for the membrane-access path and target contour. Structure linework = #2E263A; tumor context = #B7B2BB with sparing #C98B84 / #FBF4F3 warmth.

COMPOSITION & NEGATIVE SPACE: the hero cell and crossing canonical ring sit slightly right of center. Keep the upper-left and lower band open for HTML. The contextual teal path may be precise and crisp, but the peptide retains its fixed identity colors.

STYLE REMINDERS: crisp, clean, defined edges rather than soft diffused watercolor edges; clearly legible structures (an unmistakable peptide ring, defined cell membranes, a visible nucleus, a defined interior binding pocket, a defined dense tumor mass) rather than vague fuzzy shapes; a clean, evenly-lit soft off-white background, not dark and not a gradient; flat/cel shading with gentle depth, not a glossy photorealistic 3D render. Restrained and minimal — crisp does not mean busy or loud. Publication quality, isolated illustration on a clean soft off-white background. Landscape 3:2 aspect ratio (horizontal, about 1.5x wider than tall).

ITERATION NOTES: verify the canonical ring count, color adjacency, and upright orientation first; then refine the membrane crossing and binding pocket. Reject any cell-state transformation, peptide recoloring, or outcome implication.
```

- **Avoid:** No text or labels; no neon; no red or green (colorblind-safe); no photorealistic 3D render; no loose watercolor or fuzzy/diffused abstraction; no dark or gradient-sky background; no gridlines, border frame, drop shadows, decorative icons, or scattered particles; no real/accurate chemical formula or labeled diagram; no fabricated efficacy, data, or exact molecular structure; the peptide must read as an obvious clean ring, not a blob; keep it calm and minimal, not busy or loud.
- **Usage:** Use `public/illustrations/oncology-pair-v4.avif` as the master
  and crop the ENDO-311 and ENDO-995 derivatives mechanically. Do not repaint
  either derivative.

---

## 10. One platform, many applications

- **Current production file:** `public/illustrations/platform-breadth-v3.avif`.
- **Placement:** Homepage or /innovation page — a supporting "platform breadth" section illustration, placed to the right of (or above) a headline + short caption. Sized as a wide banner-style figure. Leave calm negative space in the upper-left or top band for an HTML headline overlay; the central peptide + three branch nodes should sit slightly below-center and read as a single balanced hub-and-spoke diagram.
- **Aspect ratio:** landscape 3:2 (wide horizontal, roughly 1200 x 800)
- **Suggested file:** `public/illustrations/platform-breadth-v3.avif`
- **Depicts (truth.md):** Conceptual, non-fabricated depiction of the truth.md platform claim "Platform spans therapeutics, diagnostics, and oncology" and "one selective precision peptide platform, many ways to reach disease." Central cyclic peptide = the precision peptide platform; three branches = therapeutic (e.g., ENDO-205 non-hormonal therapeutic, healthy orderly cells), diagnostic (FemLUNA/ENDO-311 non-invasive detection, target motif), oncology (ENDO-995 tumor-selective, lesion mass). Fully abstract — no real chemical structure, no efficacy data, no labels.
- **Palette mapping:** Central peptide = locked orange/violet/warm-taupe
  motif. Teal #4A9B8E / #2F6E62 = connectors and selective context only;
  plum = structural linework; rose = oncology lesion; neutral washes = node
  context.
- **Composition:** Central hub-and-spoke: one canonical 13-bead peptide at
  center, with three contextual connectors leading to therapeutic, diagnostic,
  and oncology applications.

**Prompt — copy into ChatGPT:**

```text
Clean, precise editorial scientific illustration in the style of a modern Nature Reviews cover graphic — crisp defined edges, clear and detailed anatomical and molecular structure, refined clean linework with subtle flat shading and gentle depth, calm and restrained, generous negative space, publication quality, no text, no labels, no neon, no photorealistic 3D render, no loose watercolor, no fuzzy or diffused abstraction.

SUBJECT — a single "one platform, many applications" hub-and-spoke concept diagram. At the visual center place one exact canonical EndoCyclic motif from docs/assets/canonical-endo-peptide-v1.png: an upright ring of exactly 13 glossy, individually countable orange/violet/warm-taupe beads in the locked sequence. From the intact ring, three thin clinical-teal contextual connectors branch toward three clean destination nodes: therapeutic, diagnostic, and oncology. The connectors express platform breadth; the peptide itself never changes color, count, sequence, or geometry.

STRUCTURAL DETAIL — every structure must read at a glance: the ring is unmistakably a ring of connected residues; the cells have defined membranes and a nucleus; the target motif has clean concentric circles; the lesion mass is a defined clustered shape. Refined clean linework throughout with subtle flat/cel shading and just enough gentle depth (soft, minimal shading, no harsh shadows) to feel dimensional. Crisp, clean, defined edges everywhere rather than soft diffused watercolor edges.

COLOR MAPPING — canonical peptide colors: orange #E89A16, violet #6F38B5, warm taupe #B8AA9B, with brown/plum keylines and bronze/tan connectors. Use clinical teal #4A9B8E / #2F6E62 only for the three external branch paths and therapeutic context. Use muted plum #2E263A for structural linework, dusty rose #C98B84 / #FBF4F3 for the oncology node, and neutral washes behind the nodes.

COMPOSITION & NEGATIVE SPACE — strong visual hierarchy, ruthless clutter removal: no gridlines, no borders, no frame, no drop-shadows, no decorative icons, no scattered particles. Center-out radial flow from the single hub to three fanned nodes. Position the whole diagram slightly below and right of center, leaving calm open negative space across the top band and upper-left for an HTML headline/caption to be overlaid later. Balanced, minimal, breathable.

BACKGROUND — a clean, evenly-lit soft off-white background (#FBFAF8), flat and uniform, not dark, not a gradient sky, no texture. Isolated illustration floating in clean negative space.

FORMAT — wide landscape 3:2 aspect ratio (horizontal banner, roughly 1200 by 800). Publication quality, isolated illustration on a clean soft off-white background.

EXCLUSIONS — no text, no letters, no numbers, no labels, no real chemical formula, no legend; no neon or glow; no photorealistic 3D render; no loose or fuzzy watercolor; no diffused or blurred abstraction; no dark background; no red or green; no organs, syringes, or clichéd medical icons; no busy scatter of extra molecules. Keep it crisp, clean, calm, and legible.

Please generate this, then iterate 2 to 3 times to sharpen edge crispness, tighten the ring's residue definition, and balance the negative space.
```

- **Avoid:** Avoid: the earlier soft-watercolor failure (fuzzy blurred bead ring, vague wash of cells); dark or gradient backgrounds; neon/glow; photoreal 3D; red or green; in-image text, labels, numbers, or a real chemical formula; clichéd medical icons (organs, syringes); busy scatter of extra molecules; frames, borders, gridlines, drop-shadows. Keep the lesion small and quiet, not gory.
- **Usage:** Export to
  `public/illustrations/platform-breadth-v3.avif`. Verify the canonical ring
  against the reference sprite before optimizing.

---

## 11. Acts only where disease lives (selectivity concept)

- **Placement:** Homepage selectivity/section band or /innovation page hero band. Save to public/illustrations/acts-only-where.webp. Compose so the disease zone sits lower-right (or right third) and the wide expanse of calm healthy tissue occupies the left two-thirds, leaving that left/upper area as clean negative space for an HTML headline + caption overlay. Runs full-bleed as a wide band; keep key content out of the extreme edges for safe cropping.
- **Aspect ratio:** wide 16:9 (horizontal landscape, roughly 1.78:1)
- **Suggested file:** `public/illustrations/acts-only-where.webp`
- **Depicts (truth.md):** A wide field of calm healthy tissue with one
  contained rose-toned lesion where several exact canonical peptide motifs
  concentrate. Selectivity is conveyed through their placement and a precise
  teal contextual path, not through peptide recoloring.
- **Palette mapping:** Peptides = canonical orange/violet/warm taupe.
  Selective paths = clinical teal. Healthy context = gray/warm neutral with
  plum linework. Lesion = sparing rose.
- **Composition:** Quiet healthy field across the left and upper frame; a
  bounded disease pocket at lower-right containing the canonical motifs along a
  precise teal selective path.

**Prompt — copy into ChatGPT:**

```text
Clean, precise editorial scientific illustration in the style of a modern Nature Reviews cover graphic — crisp defined edges, clear and detailed anatomical and molecular structure, refined clean linework with subtle flat shading and gentle depth, calm and restrained, generous negative space, publication quality, no text, no labels, no neon, no photorealistic 3D render, no loose watercolor, no fuzzy or diffused abstraction.

SUBJECT — a single conceptual scene about precision selectivity: a wide, calm expanse of HEALTHY TISSUE that is entirely untouched and at rest, with one small, clearly-bounded region of DISEASE where a targeted therapeutic peptide is precisely concentrated. The visual story: the therapy acts ONLY inside the small diseased zone and spares everything around it.

HEALTHY TISSUE (fills roughly two-thirds of the frame, the left and upper area) — draw an orderly field of cleanly-rendered cells, each cell a well-defined rounded polygon with a crisp membrane outline and a small clearly-drawn central nucleus, packed in a gentle honeycomb-like tissue arrangement. Render these in quiet, muted, low-saturation tones: soft cool gray (#B7B2BB) and warm neutral (#F6F3EE) fills with muted plum-ink (#2E263A) membrane linework. These cells are calm, uniform, evenly spaced, and completely undisturbed — no rose, no teal activity touching them.

DISEASE ZONE (one small, clearly contained region, placed in the lower-right / right third) — a defined, cleanly-bounded abnormal tissue mass that reads unmistakably as a lesion: its cells are visibly irregular, more crowded and disordered than the healthy field, enclosed within a soft, clearly-outlined boundary. Fill this zone with pale rose (#FBF4F3) and accent the irregular cells and boundary in dusty rose (#C98B84). Keep the rose SPARING and contained — it must feel like a small pocket, not spread into the healthy field.

THE PEPTIDE / THERAPEUTIC ACTION — depict 3 to 6 exact instances of the canonical 13-bead EndoCyclic motif, preserving the upright orange/violet/warm-taupe sequence in every ring. Concentrate them at and entering the disease zone. Use a few small crisp clinical-teal directional or localization marks around the motifs to imply selective homing; teal must not replace any peptide bead color.

COLOR MAPPING: background #FBFAF8; healthy tissue #B7B2BB / #F6F3EE with #2E263A outlines; lesion #C98B84 / #FBF4F3; peptide colors locked to orange #E89A16, violet #6F38B5, and warm taupe #B8AA9B; selective path #4A9B8E / #2F6E62.

COMPOSITION & NEGATIVE SPACE — left-to-right / center-out reading: the broad spared healthy field dominates the left and center, the small teal-active disease pocket sits in the right third. Keep the entire left and upper portion as clean, open negative space (calm off-white with only quiet muted cells) so a headline and caption can be overlaid in HTML later. Strong visual hierarchy, ruthless clutter removal — no gridlines, no borders, no drop shadows, no decorative icons, no background patterns.

CRISPNESS — every structure must read clearly with crisp, clean, defined edges rather than soft diffused watercolor edges; use refined clean linework with subtle flat/cel shading and gentle depth rather than fuzzy glow or blur. This is a conceptual illustration, so do not render real chemical formulas, real labeled diagrams, or any in-image text — keep structures clear and detailed but conceptual.

FORMAT — wide 16:9 horizontal landscape orientation. Publication quality, isolated illustration on a clean soft off-white background (#FBFAF8), evenly lit, not dark.

EXCLUSIONS — no text, no labels, no numbers, no letters; no neon or glowing colors; no red or green; no photorealistic 3D render; no loose watercolor; no fuzzy, hazy, or diffused abstraction; no dark or gradient background; no clutter, borders, gridlines, or drop shadows; do not let the rose disease color bleed into the healthy field.

ITERATION NOTE — run 2 to 3 iterations, refining until the healthy field reads as calm, the disease pocket is contained, and every canonical peptide preserves the exact 13-bead count and color adjacency.
```

- **Avoid:** no text, no labels, no letters or numbers; no neon or glowing color; no red or green; no photorealistic 3D render; no loose watercolor; no fuzzy/hazy/diffused abstraction; no dark or gradient background; no clutter, borders, gridlines, drop shadows, or decorative icons; no real chemical formulas or labeled diagram; rose disease color must not bleed into the healthy field.
- **Usage:** Homepage selectivity band or innovation hero. Keep the disease
  pocket contained, contextual teal separate from the peptide, and key content
  inside responsive crop-safe bounds.

---

## 12. Women's health mission (dignified, detailed)

- **Placement:** /impact mission section hero or lead illustration; also usable as a warm section-break graphic. Save to public/illustrations/womens-health.webp. Compose with the reproductive-anatomy motif offset toward the RIGHT third so the LEFT ~45% stays open, calm negative space for a headline/caption overlay added in HTML later.
- **Aspect ratio:** landscape 3:2 (horizontal, wider than tall — roughly 1.5 times as wide as it is high)
- **Suggested file:** `public/illustrations/womens-health.webp`
- **Depicts (truth.md):** A dignified, cleanly-drawn uterus-and-ovaries anatomical motif in clinical teal with muted plum-ink linework, softened with a few sparse botanical leaf/stem accents to evoke renewal, life, and care — a hopeful women's-health mission emblem with no human face.
- **Palette mapping:** Background soft off-white #FBFAF8; anatomy fill + botanicals clinical teal #4A9B8E with deeper teal #2F6E62 for emphasis; all structural outlines muted plum-ink #2E263A; optional faint halo in soft teal tint #EDF5F2 or warm neutral #F6F3EE. No rose/red/green — entirely healthy, hopeful.
- **Composition:** Center-out balance with the motif set in the right portion of a 3:2 landscape frame; the left ~45% left as calm off-white negative space for an HTML headline/caption overlay. Single focal element, teal anatomy dominant, botanicals as quiet supporting accents.

**Prompt — copy into ChatGPT:**

```text
Clean, precise editorial scientific illustration in the style of a modern Nature Reviews cover graphic — crisp defined edges, clear and detailed anatomical and molecular structure, refined clean linework with subtle flat shading and gentle depth, calm and restrained, generous negative space, publication quality, no text, no labels, no neon, no photorealistic 3D render, no loose watercolor, no fuzzy or diffused abstraction.

SUBJECT: A warm, dignified emblem for a women's health mission — a single, cleanly drawn anatomical uterus-and-ovaries motif (the uterine body with two fallopian tubes curving gracefully outward and an ovary at each tip), rendered as a refined, confident continuous outline. Not clinical or cold: the form is softened and symmetrical like a quiet botanical study, conveying care, hope, and vitality without any human face, figure, or sentimentality. This is a conceptual editorial illustration, not a labeled medical diagram — the anatomy should be recognizable and cleanly structured but idealized and calm.

STRUCTURAL / ANATOMICAL DETAIL (make every structure legible and cleanly drawn):
- The uterus rendered as one crisp, even-weight muted plum-ink outline: a rounded triangular uterine body, symmetrical fallopian tubes sweeping up and outward in smooth arcs, and a small clearly-defined ovary at the end of each tube.
- A subtle, restrained inner suggestion of the endometrial cavity (a single clean interior line), no dense internal detail or clutter.
- The whole anatomical form filled with a soft, healthy clinical-teal tint, reading as "healthy, alive, cared-for," with the crispest and most saturated teal reserved as a gentle accent/glow along the inner cavity or ovaries to draw the eye.
- Around and behind the anatomy, a few clean, well-defined botanical accents — a small number of simple leaves or slender stems in muted teal — growing outward from the ovaries/tubes, evoking renewal and life. Keep these sparse, precise, and clearly drawn (defined leaf edges), not a busy floral wreath.
- Warm, even directional light giving the form gentle dimensional flat/cel shading and soft depth, so it feels hopeful and human, never sterile.

COLOR MAPPING (use ONLY these website colors, max 5 distinct areas, colorblind-safe, NO red/green):
- Background: clean, evenly-lit soft warm off-white #FBFAF8 filling the whole frame — a bright, calm, uniform backdrop, not dark, not a gradient sky.
- The anatomy fill and the botanical accents: clinical teal #4A9B8E, with deeper teal #2F6E62 reserved for the crispest emphasis lines/glow (healthy tissue, vitality, care).
- All primary structural linework and the anatomical outline: muted plum-ink #2E263A, clean and even in weight.
- Optional single quiet supporting wash behind the motif: a very soft teal tint #EDF5F2 or warm neutral #F6F3EE as a faint calm halo — subtle only, no hard edges around it, no borders.
- Do NOT use dusty rose or any warm disease color here — this is an entirely healthy, hopeful image, no lesion or inflammation shown.

COMPOSITION & NEGATIVE SPACE: Center-out balance with the anatomical motif placed toward the RIGHT portion of the frame, leaving the LEFT ~45% as open, calm off-white negative space for a headline/caption to be overlaid later in HTML. Single clear focal element, strong hierarchy (the teal anatomy is the star, botanicals are quiet supporting accents). No gridlines, no borders, no drop shadows, no decorative icons, no scattered particles.

RENDER QUALITY & EXCLUSIONS: crisp, clean, defined edges rather than soft diffused watercolor edges; clearly legible structure rather than vague fuzzy abstraction; a clean, evenly-lit soft off-white background, not dark and not a colored gradient. No text, no letters, no numbers, no labels, no callout lines, no measurement markings. No neon or glowing saturated colors, no photorealistic 3D render, no loose watercolor, no grunge texture, no clutter. Warm, respectful, and dignified — never cold, never cliché, never overly sentimental. Publication quality, isolated conceptual illustration on a clean soft off-white background.

ASPECT RATIO: landscape 3:2, horizontal (about 1.5 times as wide as it is tall).

Iterate 2–3 times, refining toward cleaner linework, calmer negative space on the left, and a more legible, dignified anatomical form each pass.
```

- **Avoid:** No human face or figure; no dusty rose, lesion, or inflammation (this is a fully healthy image); no red or green; no text/labels/measurement marks; no dark or gradient background; no neon, no photorealistic 3D, no loose watercolor, no fuzzy abstraction, no busy floral wreath, no borders, drop shadows, or decorative icons; not cold, clinical, or sentimental/cliché.
- **Usage:** Truth.md grounding: EndoCyclic is a women's-health precision-medicine company (endometriosis lead program, uterine/reproductive anatomy is on-topic); non-hormonal, care-focused mission. This is a conceptual mission emblem — invents no data, no efficacy, no chemical structure. Export as public/illustrations/womens-health.webp. After generation, downscale/convert to WebP and verify the left negative space aligns with the /impact headline overlay. Run 2–3 iterations.

---

## 13. Care gap — symptom-management loop to preclinical lesion elimination

- **Placement:** `/impact`, inside the “The care gap” section.
- **Aspect ratio:** 3:2 landscape, 1536 × 1024, with all essential content inside a centered 4:3 crop-safe area.
- **Production files:** `public/illustrations/care-gap-selective-shift-v7.avif`
  and deterministic targeted-state derivative
  `public/illustrations/care-gap-selective-path-mobile-v6.avif`.
- **Depicts (truth.md):** Current therapies are largely hormone-based and
  symptomatic and do not eliminate lesions or modify underlying disease
  biology. The left therefore keeps the current-therapy lesion intact. The
  right shows selective uptake, pH-mediated escape, intracellular target
  engagement, and a separately qualified visual of the ENDO-205 preclinical
  lesion-elimination finding.
- **Disclosure:** Conceptual comparison of current therapies and the
  platform’s design strategy; the lesion-elimination beat reflects qualified ENDO-205
  preclinical evidence, not clinical outcome data.
- **Guardrail:** The left lesion remains visibly present from beginning to end.
  On the right, lesion recession may begin only after the intact canonical
  peptide is visibly seated in the teal intracellular target pocket. Never
  dock the peptide on the external plasma membrane, lesion edge, or lesion
  surface, and never frame the comparison as a clinical before/after result.

**Final production prompt (built-in ImageGen):**

```text
Use case: scientific-educational
Asset type: responsive website section illustration for a pharmaceutical care-gap comparison
Input images: Image 1 is a STYLE REFERENCE ONLY for the warm ivory ground, delicate editorial ink-and-gouache texture, rose/plum tissue rendering, teal accent, and premium scientific illustration language. Create a NEW composition; do not simply edit the existing layout.
Primary request: Create one calm, wide conceptual illustration that contrasts a repeating symptom-management loop with the directional sequence Target → Enter → Activate → ENDO-205 evidence. The left is the persistent current-therapy state. The right may depict lesion elimination only as a separate, qualified ENDO-205 preclinical evidence beat after intracellular target engagement; the comparison must never read as clinical before/after efficacy.
Subject and composition: landscape 3:2. Divide the composition into two visually related halves with generous quiet negative space at center. LEFT: show one clearly persistent, intact dusty-rose endometriosis lesion/tissue focus. A muted dusty-rose ribbon travels in a repeating closed loop around it without entering it; use 3 small neutral nodes to suggest repeated symptom management. The lesion stays present through the entire left half. RIGHT: begin with an intact dusty-rose lesion at approximately the same scale. One exact canonical 13-bead peptide ring follows a precise teal path through a diseased-cell membrane uptake pocket into an early endosome, appears unchanged inside a distinct acidified endosome with a restrained antique-gold pH context, then exits that opening endosome into the rose cytoplasm. Next, show the unchanged ring physically seated in a concave teal intracellular target pocket visibly embedded inside the full lesion. Only after that unmistakable intracellular contact, repeat the SAME lesion silhouette as a paler partially dispersing state, then show restrained remnants revealing orderly tissue in the same footprint. Uptake must precede pH-mediated escape; cytoplasmic escape must precede target engagement; target engagement must precede the qualified lesion-elimination cue. Preserve the canonical orange/violet/warm-taupe count, color adjacency, and orientation in every appearance.
Responsive safe area: keep every essential lesion, loop, peptide ring, uptake pocket, acidified endosome, intracellular target, and clearance remnant inside the central 82% of the canvas. The image must remain complete and understandable in a centered 4:3 crop as well as the full 3:2 frame. Avoid important details at extreme edges.
Style/medium: refined editorial scientific illustration, crisp defined biological and molecular structures with delicate ink linework, subtle flat/gouache shading, gentle paper texture, publication quality; warm, feminine, calm, and pharma-grade. Match the visual language of Image 1 while improving semantic clarity.
Color palette: warm ivory #FFF8F4 background; muted plum #392638 linework; dusty rose #C9798A and pale peony #F1D8DE for diseased tissue and the looping current-therapy path; canonical peptide beads in orange #E89A16, violet #6F38B5, and warm taupe #B8AA9B; clinical teal #43877D and deep teal #27675E for the directional selective-uptake path; restrained gold #D8B850 only for the acidified-endosome activation context.
Constraints: no embedded text, labels, letters, numbers, axes, measurements, clinical scans, anatomy labels, data, charts, efficacy rates, damaged tissue, explosion, or dramatic glow. No real chemical formula. No logos or watermark. Do not attach the peptide to an external membrane, lesion boundary, or lesion surface. Keep the left lesion persistent. On the right, keep the target-engagement event visually separate from the later controlled lesion-recession cue. The image communicates mechanism strategy plus a qualified ENDO-205 preclinical finding, not clinical performance or outcome.
```

- **Usage:** Keep factual labels and the ENDO-205 preclinical qualification in
  accessible HTML. Serve the approved v7 master and the dedicated v6 mobile
  targeted state mechanically. Test at 390,
  880, and 1280 CSS pixels without `object-cover` cropping.

---

## 14. ENDO-205 — mechanism to clinical translation

- **Placement:** `/innovation`, inside the “Clinical translation” section.
- **Aspect ratio:** 3:2 landscape, 1536 × 1024.
- **Production files:** `public/illustrations/endo-205-translation-v6.avif`
  (mechanism/translation master) and
  `public/illustrations/endo-205-clinical-translation-v7.avif`
  (clinical-development master).
- **Depicts (truth.md):** The mechanism master shows selective uptake →
  pH-mediated endosomal escape → intracellular target engagement → a
  separately qualified ENDO-205 preclinical lesion-elimination beat. The
  clinical-development master places that qualified preclinical story on the
  left and an abstract Phase 1 study pathway on the right.
- **Disclosure:** Conceptual translation pathway. Lesion clearance is
  explicitly preclinical; the Phase 1 pathway communicates study structure,
  not clinical outcome data.
- **Guardrail:** Keep FDA IND Allowance, Phase 1, preclinical, toxicology, and
  participant-population facts in HTML. The left-side preclinical lesion elimination
  beat must be visually separated from the right-side study pathway. Do not
  transfer lesion recession, efficacy, safety, a clinical result, or an
  approval into the Phase 1 side.

**Final production edit prompt (built-in ImageGen):**

```text
Use case: precise-object-edit
Asset type: website scientific editorial section illustration
Input images: Image 1 is the current EndoCyclic clinical-translation illustration and is the primary style, palette, and composition reference.
Primary request: preserve the exact canonical 13-bead orange/violet/warm-taupe peptide, the warm ivory negative space, the delicate translucent watercolor-and-pencil rendering, and the correct intracellular sequence. LEFT: show selective uptake into an early endosome → pH-mediated activation and escape from an opening acidified endosome → the intact peptide physically seated in one teal intracellular target pocket visibly embedded inside a full rose lesion → the SAME lesion silhouette repeated once as a paler dispersing state before restrained remnants reveal orderly tissue. Qualify this sequence in HTML as the ENDO-205 preclinical lesion-elimination finding. RIGHT: show only a restrained, abstract Phase 1 clinical-study pathway with one small unbranded investigational vial, two neutral sample vessels, and subtle concentric observation/monitoring rings. This right side communicates structured clinical translation and study discipline, not results.
Composition/framing: keep the 3:2 landscape canvas and generous central negative space. Left half = the complete intracellular mechanism and separately qualified preclinical lesion elimination beat; center = a clear quiet translation threshold; right half = orderly clinical-study pathway. Do not let lesion fragments, clearance paths, or target-engagement marks cross the threshold into the Phase 1 side. Keep every essential subject inside the central 75% so 4:3 and 3:2 crops remain legible.
Style/medium: match Image 1 exactly—pharma-grade scientific editorial illustration, translucent watercolor wash, fine graphite linework, soft material depth, calm feminine clinical refinement.
Color palette: paper ivory #FBFAF8, muted plum, soft petal rose, clinical teal, minimal antique-gold accent; low saturation and quiet contrast.
Constraints: preserve the canonical peptide’s exact 13-bead count, upright color adjacency, and orientation; do not recolor it for targeting, uptake, escape, or engagement. The peptide seats only in a teal intracellular target pocket—never on an external plasma membrane, lesion edge, or lesion surface. No embedded text, labels, numbers, logos, brands, watermark, patients, clinicians, hospital room, scans, DNA helix, pills, syringes, neon, dramatic glow, clinical before/after framing, efficacy arrows, safety claims, outcome charts, success symbols, or implied clinical results. The controlled lesion-recession cue is permitted only on the left as qualified ENDO-205 preclinical evidence. The vial and vessels must be generic and unbranded.
```

- **Usage:** Preserve the generated PNG outside `public/`; serve the optimized
  v6 mechanism and v7 clinical-translation AVIFs. Place the clinical-translation
  image before the clinical-stage dossier on mobile and beside it on desktop.
  Keep the preclinical qualification and all scientific claims in accessible
  HTML, and verify that the Phase 1 side contains no clearance or outcome cue.

---

## 15. Oncology pair — localization and intracellular access

- **Placement:** `/pipeline`, inside the oncology program pair; responsive derivatives also appear in the homepage portfolio.
- **Master aspect ratio:** 2:1 landscape, 1774 × 887.
- **Production files:**
  - `public/illustrations/oncology-pair-v4.avif`
  - `public/illustrations/endo-311-localization-pair-v4.avif`
  - `public/illustrations/endo-995-intracellular-v4.avif`
- **Depicts (truth.md):** Two distinct conceptual applications of the precision peptide platform in malignant solid tumors: targeted localization for ENDO-311 and selective uptake with intracellular access for ENDO-995.
- **Disclosure:** Conceptual representation of investigational preclinical programs; not clinical imaging, efficacy, or performance data.
- **Guardrail:** The diagnostic half shows localization only; the therapeutic half shows uptake and intracellular access only. Do not imply an imaging result, efficacy, tumor shrinkage, cell death, or a clinical outcome.

**Final production prompt (built-in ImageGen):**

```text
Use case: scientific-educational.
Asset type: matched, crop-safe oncology therapeutic-and-diagnostic master illustration for a clinical-stage biotech website.

Input images: Image 1 is the visual-style and paired-composition reference. Image 2 is the diagnostic-localization visual-language reference. Generate a new composition; do not reproduce either image.

Primary request: Create one premium 2:1 editorial scientific illustration showing two distinct applications of the same precision-peptide platform within a continuous malignant-solid-tumor microenvironment.

LEFT FOCAL ZONE — diagnostic logic:
Show one intact, clearly bounded solid-tumor focus within quieter surrounding tissue. A small family of exact canonical 13-bead EndoCyclic motifs localizes specifically around the tumor boundary. Preserve their upright orange/violet/warm-taupe sequence. Add two or three precise, thin clinical-teal localization contours centered on that intact focus. The agents remain at the target region; do not show membrane penetration, cell destruction, treatment, or an imaging result.

RIGHT FOCAL ZONE — therapeutic logic:
Show one enlarged tumor cell from the same tissue family. One exact canonical 13-bead ring crosses a clean double-line membrane along a restrained clinical-teal uptake contour and proceeds toward a defined but abstract intracellular binding pocket. The motif stays orange/violet/warm taupe and unchanged. Depict selective uptake and intracellular access only. Do not show tumor shrinkage, cell death, immune activation, restored tissue, or a before-and-after outcome.

SHARED PLATFORM LANGUAGE:
Use the same exact canonical ring motif in both focal zones and one extremely fine, restrained clinical-teal contextual thread to connect the applications across a calm central seam. Distinguish diagnostic from therapeutic behavior through form—localization contours versus membrane crossing—not peptide color.

Style/medium: Premium hand-painted medical editorial illustration; crisp colored-pencil linework, translucent gouache, and restrained watercolor. Warm, feminine, scientifically sober, calm institutional sophistication. Match the material sensibility and refined restraint of both references while creating an entirely new composition.

Color palette: warm ivory ground, dusty rose and muted lilac tumor tissue, plum structural linework, canonical orange/violet/warm-taupe peptide beads, and clinical teal localization/uptake contours. Antique gold is limited to non-peptide environmental detail.

Composition/framing: Wide 2:1 landscape. Place the diagnostic focal subject near x=25% and the therapeutic focal subject near x=75%. Keep x=40–60% quiet enough for overlapping responsive crops. Keep the upper 18–20% low-detail for HTML labels. All essential detail must survive independent 4:3 left and right crops.

Constraints: conceptual and preclinical; no text, letters, numbers, labels, legends, arrows, logos, or watermark; no real chemical structure; no scan image, scanner hardware, radiation beam, heavy-metal symbol, efficacy data, performance data, measurement, clinical result, humans, surgery, gore, neon, glossy 3D, or blue-purple science-fiction styling.
```

- **Usage:** Keep the v4 master intact at tablet and desktop widths. Create the
  two v4 4:3 derivatives as deterministic crops so the canonical motifs are not
  redrawn.

---

## 16. Art-directed mobile hero derivatives

- **Purpose:** Preserve crisp vertical detail when a wide desktop illustration
  is rendered inside a taller mobile hero frame. These files contain no new or
  regenerated scientific content; each is a deterministic crop of its listed
  approved source.
- **Breakpoint:** Served only below the 48rem `md` breakpoint through a
  media-qualified `<picture>` source and matching priority preload. The desktop
  source remains the fallback at 48rem and above.
- **Production files:**
  - `public/illustrations/hero-home-mobile-v8.avif` — deterministic crop of
    `hero-home-v8.avif`, retaining the approved selective-uptake and
    pH-activation story, the complete canonical ring, and the neutral,
    qualified preclinical lesion-elimination endpoint.
  - `public/illustrations/selective-state-transition-mobile-v3.avif` —
    deterministic crop of `selective-state-transition-v3.avif`, retaining the
    complete canonical ring, pH-mediated escape, and intracellular target
    access while excluding lesion elimination.
  - `public/illustrations/endometriosis-biology-mobile-v1.avif` — 819 × 1024
    crop of `endometriosis-biology-v1.avif`, retaining the complete central
    pelvic anatomy and visible lesion sites.
- **Guardrail:** Derive future mobile variants from the approved master without
  repainting anatomy, changing molecular structure, adding labels, or implying
  treatment outcome. Verify that only one breakpoint-matched image is requested
  at 390, 768, and 1280 CSS pixels.

---

## 17. Impact hero tablet/desktop derivative

- **Purpose:** Remove the original Impact master’s right-side text-overlay
  reserve when the anatomical art sits in its own PageHero well. The approved
  anatomy is cropped, not repainted or regenerated.
- **Production file:**
  `public/illustrations/endometriosis-biology-impact-v2.avif` — deterministic
  960 × 1024 crop of `endometriosis-biology-v1.avif`.
- **Crop recipe:** Extract source pixels `left=0`, `top=0`, `width=960`,
  `height=1024`; encode as AVIF at quality 82, effort 9, 4:4:4 chroma. The
  original 1536 × 1024 master remains unchanged.
- **Breakpoint:** Served from 48rem upward. The existing
  `endometriosis-biology-mobile-v1.avif` portrait derivative remains active
  below 48rem.
- **Framing:** Tablet favors the upper clinical subject while desktop recenters
  the complete crop. Preserve `object-cover` so the anatomical field fills the
  dedicated visual well without reintroducing a blank copy area.

---
