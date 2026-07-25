# EndoCyclic site audit — July 25, 2026

Independent audit of the current working tree (uncommitted, ahead of `be2d71e`).
Verified live against `npm run dev` across all ten public routes at **1280px and
390px** (20 route/viewport combinations), plus API contract testing and a
baseline validation run.

This is a fresh pass, not a re-reading of `site-audit-2026-07-22.md`. Findings
below were measured in a live browser, and every candidate defect was verified
before being reported.

---

## Anti-patterns verdict — **PASS**

The site does not read as AI-generated. Checked against the standard tells:

| Tell | Present? |
| --- | --- |
| AI palette (cyan-on-dark, purple→blue gradients, neon on dark) | No — warm ivory `#FFF8F4`, plum ink, clinical teal, restrained gold |
| Gradient text on headings or metrics | No |
| Glassmorphism / decorative blur / glow borders | No — nav is a 95%-opaque solid surface |
| Identical card grids (icon + heading + text, repeated) | No — authored, varied compositions |
| Overused fonts (Inter/Roboto/system) | No — Hanken Grotesk only |
| Rounded icons above every heading | No |
| Everything centered | No — left-aligned, asymmetric editorial grids |
| Pure black/white | No — all neutrals tinted |
| Sparklines / decorative charts | No — figures carry real scientific meaning |
| Bounce/elastic easing | No — transform/opacity/clip-path only |

The scientific illustrations are the differentiator and they are doing real
narrative work rather than decorating. The one borderline pattern is the hero
proof ribbon (Clinical threshold / Regulatory / Current stage), which is
adjacent to the "hero metric" template — but it carries editorial labels rather
than vanity numbers and is justified for a diligence audience. Keep as-is.

---

## Executive summary

**1 high-severity issue, 3 medium, 0 critical.** The interface is in strong
shape. The single genuine accessibility defect is a class of failure that
Lighthouse structurally cannot detect, which is why it survived prior passes.

| Severity | Count |
| --- | ---: |
| Critical | 0 |
| High | 1 (4 instances) |
| Medium | 3 |
| Low | 0 |

**Top issues**

1. **Text-over-image contrast failures** on `/media` (3 captions) and
   `/pipeline` (1 caption) — measured 2.37–3.80:1 against a 4.5:1 requirement.
2. **Honeypot spam protection has zero test coverage** — 0 of 345 tests assert
   the drop behavior on any of the three form endpoints.
3. **Next.js smooth-scroll advisory** logged on every route.
4. **`/pipeline` is 11,181px tall on mobile** (~13 phone screens), the longest
   route by a wide margin.

The remaining launch blockers are unchanged and are all **deployment and legal
configuration, not interface defects** — see "Carried forward" below.

---

## High severity

### H1 — Caption text over illustrations fails WCAG 1.4.3 (AA)

**Category:** Accessibility · **Standard:** WCAG 2.1 SC 1.4.3 Contrast (Minimum), Level AA

Four overlay captions place near-white text (`#FFF8F4`) directly over light
scientific illustrations. Where a scrim exists it fades to ~10% opacity across
the tile, so the upper glyph rows sit on near-bare artwork.

Measured by compositing the actual decoded image pixels with the exact CSS
gradient stops, then computing per-pixel contrast under the glyph boxes:

| Route | Caption | Size/weight | Worst | Mean | Required |
| --- | --- | --- | ---: | ---: | ---: |
| `/pipeline` | "A common logic of selective uptake and pH-mediated activation." | 14px / 500 | **2.37:1** | 3.62:1 | 4.5:1 |
| `/media` | "Platform + ENDO-205 evidence" | 12px / 600 | **2.54:1** | 4.26:1 | 4.5:1 |
| `/media` | "Portfolio" | 12px / 600 | **2.61:1** | 3.63:1 | 4.5:1 |
| `/media` | "Evidence 04 · ENDO-205 preclinical" | 10.4px / 400 | **3.80:1** | 4.83:1 | 4.5:1 |

`/pipeline` fails at `sm` and above only — below `sm` the sentence correctly
moves below the image. `/media` fails at both 390px and 1280px.

**Why this survived earlier passes:** Lighthouse and axe skip contrast checks
when text overlaps a replaced element such as `<img>`, because they cannot
sample the rendered pixels. Both tools report these routes as 100/100. The
failure is real and visible — the `/pipeline` caption is legibly weak on screen.

**Impact:** Low-vision users, and any user on a bright screen, cannot reliably
read the captions that qualify the scientific artwork. On `/media` those
captions are the labels press users rely on to pick the right asset.

**Recommendation:** Strengthen the scrim rather than restyling the type, so the
Calm Clinical look is preserved. Raise the mid-stop of the
`from-plum/80 via-plum/10 to-paper/5` gradient (the `via` stop is the weak
point), or constrain the caption to the lower band where the scrim is already
dense. Re-measure with a compositing check, not Lighthouse.

**Suggested command:** `/harden`, then `/polish`.

---

## Medium severity

### M1 — Honeypot spam protection is untested

**Category:** Test coverage / reliability

`app/api/contact/route.ts:102` returns a decoy success when `_honeypot` is
truthy, correctly ordered before validation and before the delivery check. The
same pattern exists on the investor and newsletter routes.

No test asserts it. Across 56 test files and 345 tests, `_honeypot` appears
three times, all in `__tests__/api/native-form-fallback.test.ts` and all with
the empty value `""` — the non-bot path. Nothing verifies that a filled
honeypot is silently dropped and never delivered.

**Impact:** A refactor that reorders the guards or drops the field would remove
spam protection from all three lead paths with a fully green suite. Given that
lead capture is the site's conversion goal, silent regression here is costly.

**Recommendation:** Add one test per endpoint asserting that a filled
`_honeypot` returns the decoy success **and** that the delivery provider was
never invoked.

**Suggested command:** `/harden`.

### M2 — Next.js smooth-scroll advisory on every route

**Category:** Correctness / console hygiene

```
Detected `scroll-behavior: smooth` on the `<html>` element. To disable smooth
scrolling during route transitions, add `data-scroll-behavior="smooth"` to your
<html> element.
```

`app/globals.css:249` sets `scroll-behavior: smooth` (correctly overridden under
`prefers-reduced-motion` at lines 703/708/746/769). Next 16 wants the paired
`data-scroll-behavior="smooth"` attribute on `<html>` so it can suppress smooth
scrolling during route transitions.

**Impact:** Without it, client-side route changes can animate the scroll reset
instead of jumping, which reads as a lag on navigation. Also the only recurring
console warning, which makes real warnings easier to miss.

**Recommendation:** Add `data-scroll-behavior="smooth"` to the `<html>` element
in `app/layout.tsx`. One-line change.

**Suggested command:** `/polish`.

### M3 — `/pipeline` mobile length

**Category:** Information architecture

Measured document heights (px):

| Route | 1280px | 390px |
| --- | ---: | ---: |
| `/pipeline` | 8,369 | **11,181** |
| `/investors` | 6,372 | 8,945 |
| `/media` | 5,702 | 8,794 |
| `/` | 8,058 | 9,554 |
| `/imaging` | 5,761 | 7,822 |
| `/innovation` | 8,546 | 7,544 |
| `/impact` | 5,659 | 7,160 |
| `/team` | 3,353 | 5,134 |
| `/news` | 2,983 | 4,454 |
| `/contact` | 2,192 | 2,947 |

`/pipeline` at 11,181px is roughly 13 phone screens. The July 22 pass had
reduced it to 10,922px; it has since grown past that. The sticky chapter rail
mitigates this, but the route carries the heaviest diligence load and is the
least scannable on the device most likely used for a first look.

**Impact:** Scroll fatigue on the highest-value diligence page.

**Recommendation:** Not a defect — flag for an editorial density pass. Consider
native disclosure for the per-program detail below the atlas on phones only,
matching the pattern already used for the Home evidence dossier.

**Suggested command:** `/distill`.

---

## Verified as *not* defects

Reported by tooling, then disproven — recorded so they are not re-raised:

- **Inline prose links 18px tall** (`/investors`: "McKinsey estimate", "WHO").
  WCAG 2.2 SC 2.5.8 explicitly exempts targets in a sentence. Not a defect.
- **"Missing focus indicator" on 25/25 controls.** Artifact of programmatic
  `.focus()`, which does not trigger `:focus-visible`. After a real keypress,
  **100% of controls show a visible indicator** (see positives).
- **Hero ribbon contrast 1.32–3.02:1** on `/`. Artifact of a colour parser that
  mis-read `oklab()` as RGB. Real background is `#FFF7F3`; the ribbon passes.
- **Nav overlapping the hero eyebrow at 390px.** Artifact of a programmatic
  scroll while the browser pane was hidden. On real load, nav bottom is 64px and
  the eyebrow starts at 120px — no overlap at any scroll position.

---

## Positive findings

**Structure and semantics — perfect across all 20 route/viewport combinations:**
exactly one `h1` and one `main` per route; zero horizontal overflow; zero images
missing `alt`; zero broken images; zero duplicate IDs; zero unresolved
`aria-controls`/`aria-labelledby`/`aria-describedby`/`aria-owns`; zero
interactive elements without an accessible name; zero form controls without a
label; no heading-order jumps.

**Keyboard focus — 100%.** All 177 focusable elements sampled across `/`,
`/pipeline`, `/investors`, `/media`, `/innovation` and `/contact` render a
visible `:focus-visible` indicator (solid 2px teal, 2px offset), including the
skip link and dark-surface controls.

**API contracts — correct and fail-closed.**

| Case | Result |
| --- | --- |
| Valid payload, delivery unconfigured | `503` — fails closed, no false success |
| Invalid email (`a..b@example.com`) | `400` with a specific message |
| Wrong `Content-Type` | `415` |
| 40 KB body | `413` |
| 6th request in a minute | `429` with `Retry-After: 46` |

The limiter is genuinely shared across all three endpoints — requests spent on
`/api/contact` throttled `/api/newsletter`, exactly as documented.

**Security headers verified live:** CSP with `frame-ancestors 'none'` and
`object-src 'none'`; `X-Frame-Options: DENY`; HSTS with preload; `nosniff`;
`Referrer-Policy: strict-origin-when-cross-origin`; `Permissions-Policy`
disabling camera/microphone/geolocation; `X-Robots-Tag: noindex, nofollow,
noarchive` while the origin is unconfigured. The framing policy is strong enough
that it blocked this audit's own iframe harness — a good sign.

**Truth governance:** all ten rendered routes are clean of "cure", "cures",
"cured", "guaranteed", "proven", and "is safe". `truth.md` untouched.

**Network:** every request 200/304 across a full ten-route walk at both widths.
Art-directed mobile derivatives resolve correctly and exclusively
(`hero-home-mobile-v8`, `innovation-target-clearance-mobile-v2`,
`endometriosis-biology-mobile-v1`) — no desktop counterpart is fetched on phones.

**Baseline validation:** 56 test files / 345 tests passed, ESLint clean,
TypeScript `--noEmit` clean.

---

## Carried forward — still open, all external to the interface

Unchanged from the July 22–24 audit and re-verified today:

1. **Canonical origin unset.** `NEXT_PUBLIC_SITE_URL` is empty, `sitemap.xml`
   publishes zero URLs, and every response carries `X-Robots-Tag: noindex`. The
   site cannot be indexed until Railway builds with an approved HTTPS origin.
2. **No privacy/legal surface.** `/privacy`, `/terms`, `/termsofuse` and
   `/accessibility` all return 404 while three forms collect personal data.
   Needs counsel-approved copy — do not invent it.
3. **Rate limiter is process-local.** Correct for one replica; not durable
   across replicas. Needs a distributed store plus a durable CRM/queue before
   lead capture is production-grade.
4. **Source methodology for `$200B` US burden and the 8-year diagnostic delay.**
   Needs content-owner/regulatory sign-off before any visible reference ledger.
   `truth.md` must not change without explicit approval.
5. **Asset ceiling.** The founder portrait's authentic source is 291×369 and
   there is no vector wordmark. Both need approved higher-resolution originals;
   neither may be synthetically upscaled.

---

## Next phases

### Phase 1 — Legibility and correctness *(in-repo, no external dependency)*
- Fix the four text-over-image contrast failures by strengthening the scrim
  mid-stop; re-verify by pixel compositing, not Lighthouse.
- Add `data-scroll-behavior="smooth"` to `<html>`.
- Add honeypot drop regression tests for all three form endpoints.
- Re-run the 20-combination browser matrix and the full suite.

### Phase 2 — Launch configuration *(blocked on approvals)*
- Set the approved HTTPS `NEXT_PUBLIC_SITE_URL` on Railway; confirm sitemap
  populates and `noindex` lifts.
- Add counsel-approved Privacy / Terms / Accessibility routes and link them from
  the footer and all three forms.
- Move rate limiting to a distributed store; connect a durable lead sink.

### Phase 3 — Editorial density and re-baseline
- ~~`/pipeline` mobile density pass (target: back under ~9,500px at 390px).~~
  **Target withdrawn after measurement — see "Phase 3 reassessment" below.**
- Fresh production Lighthouse across all ten routes; the current numbers in the
  July 22 doc predate several passes.

### Phase 4 — Asset quality *(blocked on supplied assets)*
- Replace the founder portrait when an approved ≥582×738 source exists.
- Add an approved vector wordmark and re-cut the media kit.

---

---

## Phase execution — July 25, 2026

### Phase 1 — complete

**H1 caption contrast — fixed and verified on the production build.** Both
scrims lacked a mid-stop, so they collapsed to ~10% opacity exactly where the
text sits. Added explicit mid-stops rather than restyling the type, so the Calm
Clinical treatment is unchanged:

- `app/pipeline/PipelineHero.tsx` — `from-plum/80 via-plum/10 to-paper/5` →
  `from-plum/92 via-plum/76 via-38% to-transparent to-72%`. The `to-72%` cutoff
  keeps the upper artwork untouched; an earlier full-height variant measured
  equally well but visibly muted the four program endpoints, which works against
  "make the selective mechanism the visual protagonist."
- `app/media/page.tsx` — both hero-mosaic scrims → `from-plum/92 via-plum/78`
  with a 60–65% mid-stop; the 10.4px sub-label moved from `text-on-dark/78` to
  `/88`.

Measured by pixel compositing against the glyph boxes on `npm run build` output:

| Route | Caption | Before | After |
| --- | --- | ---: | ---: |
| `/pipeline` | "A common logic of selective uptake…" | 2.37:1 | **7.15:1** |
| `/media` | "Platform + ENDO-205 evidence" | 2.54:1 | **7.41:1** |
| `/media` | "Evidence 04 · ENDO-205 preclinical" | 3.80:1 | **7.57:1** |
| `/media` | "Portfolio" | 2.61:1 | **7.49:1** |

**M1 honeypot coverage — fixed.** Added
`__tests__/api/form-honeypot.test.ts` (6 tests) covering all three endpoints:
the decoy success, that the delivery provider is never invoked, that the guard
answers before validation so bots cannot probe the rules, that trapped and
genuine responses are byte-identical, and that an empty honeypot still delivers.
Mutation-checked: disabling the contact guard fails 3 of the 6, so these are
real regression tests rather than tests that pass either way.

**M2 smooth-scroll advisory — fixed.** Added `data-scroll-behavior="smooth"` to
`<html>` in `app/layout.tsx`.

### Phase 3 — Lighthouse re-baselined; density target withdrawn

**Fresh production Lighthouse, mobile preset, all ten routes:**

| Route | Perf | A11y | Best practices | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/contact` | 95 | 100 | 100 | 2.9s | 0 | 10ms |
| `/team` | 95 | 100 | 100 | 2.9s | 0 | 10ms |
| `/` | 94 | 100 | 100 | 3.1s | 0 | 10ms |
| `/investors` | 94 | 100 | 100 | 3.0s | 0 | 10ms |
| `/media` | 94 | 100 | 100 | 3.0s | 0 | 0ms |
| `/news` | 94 | 100 | 100 | 3.0s | 0 | 10ms |
| `/pipeline` | 94 | 100 | 100 | 3.0s | 0 | 0ms |
| `/imaging` | 93 | 100 | 100 | 3.2s | 0 | 10ms |
| `/impact` | 93 | 100 | 100 | 3.1s | 0 | 10ms |
| `/innovation` | 92 | 100 | 100 | 3.2s | 0 | 10ms |

Every route clears the 90+ budget with zero layout shift. Note that
**accessibility scored 100 on all ten routes both before and after the contrast
fix** — direct confirmation that Lighthouse cannot see this defect class and
should not be used as the contrast gate on this site.

**The ~9,500px density target was withdrawn after measurement.** Breakdown of
`/pipeline` at 390px (11,181px total):

| Block | Height |
| --- | ---: |
| Stage atlas (header + 4 program rows) | 1,982 |
| Oncology chapter | 1,739 |
| Evidence dossier (NIH panel 356 + supporting records 782) | 1,669 |
| ENDO-205 chapter | 1,497 |
| FemLUNA™ chapter | 1,277 |
| Hero | 998 |
| Platform thesis | 495 |
| Closing CTA | 434 |
| Section padding (all sections) | 1,280 |

Reaching 9,500px would require removing ~1,700px, and each available route to
that number is a regression:

1. **Collapsing the supporting-record list on phones** (the one genuinely
   subordinate block, ~690px) is the pattern used by the Home evidence dossier —
   but that pattern renders the list twice, and
   `__tests__/pages/pipeline-page.test.tsx:134` asserts exactly three
   `[data-pipeline-evidence-record]` elements. That test guards a deliberate
   earlier decision to de-duplicate Pipeline's DOM ("17% fewer elements", July 22
   pass). Re-introducing duplication here would reverse a tested architectural
   choice to win scroll length.
2. **Trimming section padding** (1,280px, 11% of the page) would violate the
   stated "generous whitespace" design principle.
3. **Cutting atlas rows or program chapters** would remove the diligence content
   that is the page's entire purpose.

The remaining length is structural: four programs at full development-stage
detail, plus a sticky chapter rail that already provides direct access to
Overview / ENDO-205 / FemLUNA™ / Oncology / Evidence. The original audit
correctly classified this as "not a defect"; the numeric target attached to it
was wrong and is retracted rather than met by degrading the page. If density is
still wanted, the right move is an editorial decision by the content owner about
which program detail belongs on phones — not a mechanical height cut.

### Phases 2 and 4 — blocked, no code action available

Both remain blocked on inputs this pass cannot supply, and none were worked
around:

- Canonical HTTPS origin (`NEXT_PUBLIC_SITE_URL` still empty, sitemap still
  publishes zero URLs, `X-Robots-Tag: noindex` still set on every response).
- Privacy / Terms / Accessibility copy — still 404. Deliberately not authored:
  inventing legal language for a site that collects personal data would be worse
  than its absence.
- Distributed rate limiter and durable lead sink — requires an infrastructure
  decision (store and CRM/queue), not a code change.
- `$200B` US burden and 8-year diagnostic-delay methodology — requires
  content-owner/regulatory sign-off. `truth.md` untouched.
- Higher-resolution founder portrait and vector wordmark — requires approved
  source assets; neither may be synthetically upscaled.

### Verification after Phase 1 and 3

- 57 test files / **351 tests** passed (up from 345; +6 honeypot tests)
- ESLint clean, `tsc --noEmit` clean, `git diff --check` clean
- Production build succeeded; prebuild and postbuild production-surface guards
  passed; 18 routes generated
- Production CSP re-confirmed without `unsafe-eval`
- All four caption fixes re-measured on the production build, not just dev

---

## Quality score

| Criterion | Score | Note |
| --- | ---: | --- |
| Factual accuracy | 5/5 | All ten routes clean of prohibited language; provenance labelling is consistent. Source-methodology questions remain open but are governance, not copy defects. |
| 10-second clarity | 5/5 | Platform, lead program, stage, and CTA legible immediately at both widths. |
| Pharma-grade polish | 4/5 | Caption contrast now fixed and verified in production. Still held back by the missing Privacy/Terms/Accessibility surface while three forms collect personal data. |
| CTA conversion | 5/5 | Partnership-first hierarchy is consistent; forms fail closed and recover clearly. |
| Performance | 5/5 | Re-baselined on a production build: 92–95 mobile across all ten routes, 100 accessibility and 100 best practices everywhere, zero CLS, ≤10ms TBT. |

## Verification performed

- 20 route/viewport combinations (10 routes × 1280px/390px) with a live DOM
  audit harness covering structure, overflow, images, IDs, ARIA references,
  accessible names, target sizes, contrast, and form labelling
- Pixel-compositing contrast check for all text overlapping images
- Keyboard focus-visibility sweep across six routes after a real keypress
- API contract tests: valid, invalid-email, wrong content-type, oversized body,
  rate limit, `Retry-After`
- Live security-header inspection
- Prohibited-language scan of rendered HTML on all ten routes
- Console and network capture across a full ten-route walk
- `npm test` (56 files / 345 tests), ESLint, `tsc --noEmit`
- `truth.md` not modified
