# EndoCyclic full-site audit — July 22, 2026

## Executive verdict

**Pass with reservations.** The public site now feels authored, calm, and clinically credible. It avoids the common AI-site tells: no glassmorphism, neon gradients, generic card walls, decorative dashboards, or gratuitous motion. The principal design issue was over-explanation—most visibly on Pipeline—rather than a lack of visual ambition.

The audit covered all ten public routes at approximately 390px and 1280px:

- `/`
- `/innovation`
- `/pipeline`
- `/imaging`
- `/impact`
- `/team`
- `/news`
- `/investors`
- `/media`
- `/contact`

After remediation, every route returns HTTP 200, has exactly one H1 and one `main#main-content`, has no horizontal overflow at either audited width, contains no images missing `alt`, and contains no duplicate IDs.

## Improvements completed

### Reading and narrative flow

- Removed the redundant interactive program comparison from Pipeline. The route now moves directly from the stage atlas to the platform thesis and detailed program chapters.
- Reduced Pipeline height by about 18% at both audited widths: approximately 13,228px to 10,922px at 390px, and 9,962px to 8,197px at 1280px.
- Converted the Pipeline thesis into a semantic H2 and capped expressive secondary headings below the hero scale on Innovation and Imaging.
- Removed repeated FemLUNA™ claims and duplicate exits from Imaging.
- Linked Innovation directly to the ENDO-205 chapter rather than the top of Pipeline.
- Re-sequenced Impact so evidence and ENDO-205 precede the partnership ask.
- Rebuilt Impact’s care-gap comparison as one responsive pathway dossier: current therapies → design shift → platform design objective. It remains single-column through tablet and becomes an asymmetric connected composition on wide screens.
- Reframed News as a selected recognition archive rather than an implicitly complete milestone record.
- Kept Team biographies at two columns through 1280px and reduced repeated founder language.
- Narrowed root metadata so “first-in-class” is not applied more broadly than the approved facts support.

### Motion and micro-interactions

- Added quiet, transform-and-opacity hero entrances to shared page heroes and the custom Home hero.
- Made `Reveal.delay` produce a real view-range stagger instead of merely increasing translate distance; scroll-linked reveals keep text at full opacity so contrast never drops during motion.
- Added reduced-motion-safe pressed feedback to shared buttons, navigation CTAs, and form submit controls.
- Replaced the background-size link underline animation with a transform-only underline.
- Kept the navigation shell at fixed geometry and faded its scrolled surface with opacity, avoiding height and margin animation.
- Throttled navigation scroll observation to animation frames.
- Preserved the existing reduced-motion fallback: content remains visible when animation is unsupported or disabled.

### Accessibility and conversion

- Strengthened field boundaries, placeholder contrast, focus rings, and select affordance.
- Added accessible error summaries and first-invalid-field focus to Contact and Investor forms.
- Added `aria-busy`, semantic status regions, clearer failure messages, and calm status entrances.
- Reduced the mobile Contact routing preamble and the mobile Media hero height.
- Marked functional hero content as navigation or complementary content rather than forcing it into a figure.
- Added active-state styling and `aria-current` for Investors in both navigation modes.
- Hid and inerted the complete background while the mobile menu is open; Escape, focus trapping, and focus restoration remain intact.
- Added external-window announcements to footer social links.
- Increased shared hero captions to 14px on small screens.

### Reliability and performance

- Forms no longer report success when delivery is unconfigured or rejected by the mail provider.
- Removed raw personal-data logging from Contact, Investor, and update-request endpoints.
- Added client-side length limits that match server validation.
- Corrected the Home hero image `sizes` hints; the Next Image warning no longer recurs.
- Preserved AVIF/Next Image delivery and delayed analytics.

## Remaining pre-launch dependencies

### High priority

1. **Production lead durability and rate limiting**
   - The endpoints now fail honestly when Resend is unavailable, but lead capture still depends on email delivery.
   - The in-memory rate limiter is not durable across serverless instances and treats a missing forwarding header as one shared `unknown` client.
   - Add a trusted distributed rate limiter and a durable CRM/queue before launch.

2. **Privacy and compliance pages**
   - Contact, investor, and update-request forms collect personal data, and analytics may load, but no approved Privacy, Terms, Accessibility, consent, retention, or unsubscribe language exists in the repository.
   - Add counsel-approved policies and footer/form links; do not invent this copy.

3. **Team credential approval trail**
   - Several detailed biographies in `lib/site.ts` include credentials and accomplishments not present in `truth.md`.
   - Verify each item with the content owner and add an approved source trail, or narrow the biographies. Normalize any remaining use of “IND clearance” to the approved “FDA IND Allowance.”

4. **Visible sources for disease-burden statistics**
   - Impact figures match `truth.md`, but visitors cannot independently verify most values.
   - Add a restrained references ledger using verified authoritative URLs supplied or approved by the content owner.

5. **Investor PDF accessibility**
   - `public/downloads/endocyclic-investor-summary.pdf` is untagged and lacks complete document metadata.
   - Add tagged headings, reading order, link semantics, Title, and Author metadata.

### Medium priority

- Connect update requests to a real subscriber list or CRM; the current confirmed workflow is an accepted email request, not automated list enrollment.
- Add a verified 2026 News source when one is available.
- Extract the Investor request form into a client island so the rest of the route can remain static/server-rendered.
- Provide a browser-safe alternative to Media’s `mailto:` asset requests, such as approved direct downloads or a preselected Contact route.
- Add visible “last reviewed” dates to the investor memo and approved media boilerplate.
- Replace the founder portrait only when a higher-resolution authentic image is supplied; do not generate people.
- The remaining Pipeline scale reveals use GSAP for three media moments. Production Lighthouse remains above target; re-test the route if that motion layer expands.

## Quality score

| Criterion | Score | Note |
| --- | ---: | --- |
| Factual accuracy | 4/5 | New copy matches `truth.md`; detailed team credentials still need an approval trail. |
| 10-second clarity | 5/5 | Value proposition, lead program, stage, and CTA are immediately legible. |
| Pharma-grade polish | 4/5 | Visual system and route flow are strong; policy, citation, and PDF dependencies remain. |
| CTA conversion | 5/5 | CTAs are sequenced by intent and form recovery is substantially clearer. |
| Performance | 5/5 | Responsive and image checks pass; production Lighthouse scores 99 on Home and 97 on Pipeline. |

## Verification completed

- ESLint with zero warnings
- TypeScript `--noEmit`
- Vitest: 3 files, 17 tests passed
- `git diff --check`
- Live desktop and mobile route matrix
- Mobile menu focus/inert behavior
- API delivery-failure smoke tests
- Production Lighthouse: Home 99 performance / 100 accessibility / 100 best practices / 100 SEO
- Production Lighthouse: Pipeline 97 performance / 100 accessibility / 100 best practices / 100 SEO
- Production Lighthouse: Impact 92 performance / 100 accessibility / 100 best practices / 100 SEO after the pathway redesign
- Zero measured layout shift and zero total blocking time on both Lighthouse routes
- `truth.md` left untouched
