# EndoCyclic full-site audit — July 22–23, 2026

## Executive verdict

**Release-candidate pass with external dependencies.** The public site now
feels authored, calm, and clinically credible. It avoids the common AI-site
tells: no glassmorphism, neon gradients, generic card walls, decorative
dashboards, or gratuitous motion. The remaining launch dependencies are
approved domain/inbox configuration, durable lead infrastructure, legal
policies, and content-owner review—not unresolved interface defects.

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
- Added dedicated narrow-screen crops for both sides of the care-gap artwork so
  the current-path loop and selective-path mechanism remain legible instead of
  shrinking the complete desktop illustration into a phone-width frame.
- Reframed News as a selected recognition archive rather than an implicitly complete milestone record.
- Promoted the 2026 FDA IND Allowance announcement to the sole featured News
  story and added a purpose-built regulatory milestone visual. The 2025 NIH
  award remains visible as independent validation in the archive.
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
- Kept the Innovation mechanism pinned through all three stages while ensuring
  that inactive tab panels are truly hidden. This removes the overlapping
  stage-copy crossfade and leaves exactly one readable panel at every point in
  the sequence.

### Accessibility and conversion

- Strengthened field boundaries, placeholder contrast, focus rings, and select affordance.
- Added accessible error summaries and first-invalid-field focus to Contact and Investor forms.
- Added `aria-busy`, semantic status regions, clearer failure messages, and calm status entrances.
- Reduced the mobile Contact routing preamble and the mobile Media hero height.
- Compacted the mobile footer into a clear two-column navigation rhythm, balanced
  the Media asset mosaic at tablet widths, and moved Team’s three-person
  development chapter to three columns at 1280px to avoid an orphan card.
- Added distinct accessible names to Contact, Investor, and company-update forms.
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
- Consolidated the Pipeline atlas from separate desktop and mobile trees into
  four unique responsive program rows. The prerendered route is now 16.6%
  smaller in raw HTML and contains 17% fewer elements.
- Moved Contact `?subject=` routing into the page boundary so approved deep
  links render the correct inquiry route in the initial server response and
  remain synchronized through client navigation. Contact is intentionally
  request-rendered; the other public content routes remain statically
  prerendered.
- Removed Framer Motion from the project. Home portfolio transitions now use a
  persistent responsive highlight, directional image crossfades, staggered
  detail entrances, and transform-only phase-marker travel; Investors uses
  progressive CSS view-linked motion.
- Production initial JavaScript fell from about 260.3 KB to 213.0 KB gzip on
  Home (−47.4 KB, −18.2%) and from 255.1 KB to 209.4 KB gzip on Investors
  (−45.7 KB, −17.9%). Neither route contains Framer runtime signatures.
- Media press and alternate-format requests now use the browser-safe,
  preselected Contact route as the primary path. Direct email appears only when
  an approved public inbox is configured.
- Added a shared 32 KiB streaming JSON reader to Contact, Investor, and company
  update endpoints. Oversized declared or chunked bodies now stop with HTTP 413
  before unbounded JSON parsing.
- Temporarily overrode Next 16.2.11’s vulnerable nested PostCSS and Sharp
  versions with PostCSS 8.5.22 and Sharp 0.35.3. The production build, AVIF image
  optimizer, and full suite pass, and `npm audit --omit=dev` reports zero
  vulnerabilities. Remove the overrides when a stable Next release carries the
  fixed versions directly.

### Diligence, media, and launch hardening

- Added a typed evidence-reference model and quiet visible provenance labels.
  Institutional records are now distinguished from company-reported
  milestones throughout the Home evidence dossier and Investors validation
  chapter.
- Narrowed the NIH ACT ENDO item to the defensible claim of challenge
  participation and added direct institutional records for NIH portfolio,
  NIH challenge, and Milken network references.
- Added an explicit logo-use disclaimer so named relationships are not
  presented as implied endorsements.
- Repackaged the two conceptual scientific media visuals as publication-ready
  ZIP downloads. Each archive includes the source AVIF, approved caption,
  conceptual-use qualification, and media-inquiry instructions.
- Corrected dark-card heading contrast in the Media asset mosaic and verified
  the scientific, wordmark, and authentic leadership assets at desktop and
  mobile widths.
- Replaced the unresolved production-origin fallback with the reserved
  `https://endocyclic.invalid` origin, removed the root-wide Home canonical,
  and suppressed sitemap URLs and indexing until a valid HTTPS
  `NEXT_PUBLIC_SITE_URL` is configured.
- Locked the internal concept laboratory out of production. Both the index and
  direct slugs return clean HTTP 404 responses, emit crawl-denial headers, leak
  no concept copy, and no longer produce fallback errors in server logs.
- Added an explicit noindex 404, disabled framework disclosure, removed Sentry
  from `script-src`, removed unsupported medical-specialty structured data, and
  added a Railway health check.
- Replaced hardcoded form addresses with validated
  `NEXT_PUBLIC_CONTACT_EMAIL`, `FORM_FROM_EMAIL`, and `FORM_TO_EMAIL`
  configuration. Blank or invalid values fail closed without rendering dead
  `mailto:` links or empty email properties in structured data.
- Consolidated all three form routes behind one bounded process-local limiter
  using Railway’s `X-Real-IP`, exact JSON media-type checks, no-store responses,
  32 KiB body limits, safe header construction, and PII-minimal provider logs.

## Continuation pass — July 23, 2026

- Disabled automatic prefetching in the shared Button by default. Fresh
  throttled-mobile Lighthouse runs dropped Home transfer from roughly 315 KiB
  to 289 KiB and Pipeline from roughly 314 KiB to 294 KiB without changing
  route behavior.
- Added an explicit high-priority fetch hint to the Pipeline hero LCP image.
  Lighthouse now passes all three LCP discovery checks: priority hint,
  initial-document discoverability, and eager loading.
- Extended visible provenance into Impact, Imaging, Pipeline, and News. Patient
  burden is now separated from investor market sizing, and the newsroom labels
  company announcements versus institutional profiles.
- Distilled the FemLUNA comparison by removing duplicate image-overlay labels
  and replacing two repeated explanation panels with one concise matched-view
  explanation.
- Shortened the Contact path, corrected the dark-surface focus treatment, and
  delayed the Pipeline chapter navigation until after the development atlas.
- Added a 3:1+ shared control-boundary token for form fields and radio cards,
  persistent non-color cues for inline prose links, resolvable mobile-menu
  `aria-controls`, and Label-in-Name-safe download actions.
- Re-labeled the direct wordmark and founder portrait as web-resolution assets;
  source and print formats remain request-only.
- Regenerated the three-page investor memo with provenance-specific milestone
  language, no stale domain or inbox, and a domain-neutral
  `/investors#data-room` route. All pages were rendered and visually verified;
  the tagged PDF retains embedded fonts, Unicode maps, metadata, and clean
  reading order.

## Refinement pass — July 23, 2026

- Tightened the public mechanism narrative to the approved fact base:
  pH-mediated activation, selective uptake by diseased tissue, and
  non-hormonal action. The Home mobile sequence no longer adds physiological-pH
  or acidic-microenvironment specifics that are not present in `truth.md`.
- Removed the unsupported low-visual-contrast explanation from the FemLUNA™
  comparison. The current view now states only that current imaging can miss
  small lesions, with the approved superficial and sub-millimeter qualification
  in the supporting copy.
- Removed unsupported causal detail from shared disease-burden labels and
  separated global burden from diagnostic delay in the Impact heading. The
  Impact evidence note now names the company-reported $200B annual US burden
  and eight-year delay explicitly.
- Normalized public White House references to company-reported recognition and
  aligned current-stage labels with the approved “Pre-clinical” terminology.
- Reframed platform breadth consistently as therapeutic and diagnostic programs
  across endometriosis and oncology. Investors no longer repeats its FDA/Phase
  1 proof line beneath a title that already carries the same message.
- Added direct, quiet routes from all three Innovation development paths to the
  appropriate Pipeline chapters, including the paired oncology chapter.
- Strengthened partnership conversion on Team and Impact while preserving
  clear secondary review paths.
- Added a persistent non-color current-page cue to the Investors desktop link
  and a visible “Current” cue to every active mobile-menu destination.
- Removed duplicate Contact and Media destinations from the Footer utility row;
  those routes remain in the Company navigation.
- Capped the Team tablet portrait mosaic to the authentic source width, corrected
  responsive image hints, and removed the desktop thumbnail-size regression.
  A higher-resolution authentic portrait remains the preferred long-term asset.
- Replaced Home’s extremely low-contrast decorative “IND” letters with an
  abstract clinical-thread mark. Desktop automated accessibility now scores
  100 without making the chapter visually louder.
- Added 1440px and 1600px responsive image candidates. At 1440px the Home hero
  now selects a 1440px rendition at roughly 57 KiB rather than the prior full
  1672px source at roughly 80 KiB.
- Added immutable one-year caching for versioned scientific illustrations and a
  one-day floor for unversioned optimized images. Removed persistent compositor
  hints from one-shot hero animations.
- Added intent-based portfolio image priming on hover, focus, and press. Only
  one portfolio image exists initially; the signaled destination is prepared
  without adding the other three assets—about 86 KiB—to the initial waterfall.

## Hardening and metadata pass — July 23, 2026

- Corrected the unconfigured-preview indexing guard. Public HTML remains
  crawlable so its `noindex, nofollow` directive can be processed, while a
  global `X-Robots-Tag: noindex, nofollow, noarchive` also covers non-HTML
  resources. The sitemap remains empty until an approved HTTPS origin is set.
- Normalized Organization and founder JSON-LD around one stable company ID and
  one Tanya Petrossian ID. The public brand name and legal name are now
  represented separately and consistently across Root, Team, Contact, and
  Media metadata.
- Restored optional client-side Sentry initialization and route tracing through
  a deferred loader. Unconfigured builds do not request the 577 KiB monitoring
  chunk on the initial route; the total static chunk set grew by only about
  9 KiB.
- Hardened all three lead paths. Investor access now requires an explicit
  `{ success: true }` response, newsletter delivery failures no longer mark a
  valid email address invalid, and the selection-based media copy fallback
  restores keyboard focus.
- Replaced broad angle-bracket stripping with tag-aware form sanitization so
  scientific comparisons such as `<6.5` and `>6.0` are preserved while
  plausible markup is removed.
- Coalesced the Home featured-news pointer effect into one layout read and
  transform write per animation frame and removed its persistent compositor
  hint.
- Removed nine fully orphaned presentation components plus the unused Next
  starter `file.svg`. Modified or untracked legacy assets were deliberately
  preserved.

## Shareability and continuity pass — July 23, 2026

- Replaced the single generic social preview with ten route-specific,
  versioned 1200 × 630 progressive JPEG cards. Each card uses the authentic
  wordmark, Hanken Grotesk, existing truth-safe scientific artwork, a
  route-specific headline and alt description, and an explicit conceptual-use
  qualification where appropriate.
- Added a typed public-route metadata map so Open Graph and Twitter always
  publish the same route-correct image descriptor. Platform, Pipeline, Imaging,
  and Impact now also use more descriptive social titles.
- Added immutable one-year caching for the versioned social assets. Every card
  is sRGB JPEG, below 300 KiB, and covered by a file/dimension/metadata contract
  test. No card is requested by normal page loads, so the richer share surface
  adds no client JavaScript or page-transfer cost.
- Permanently redirected the legacy investor-summary URL to the current
  versioned PDF and restored native download semantics to the Pipeline CTA.

## Runtime, responsive, and truth-governance pass — July 23, 2026

- Re-audited all ten public routes at 320, 390, 768, and 1280px. All 40
  route/viewport combinations returned 200 without page-level horizontal
  overflow, broken images, missing alt text, duplicate IDs, heading-order
  defects, undersized visible controls, or keyboard traps. Normal-motion Axe
  runs passed after entrance motion settled.
- Corrected the only reduced-motion accessibility defect: stage 02 and 03
  markers in Innovation’s complete-sequence fallback now use a consistently
  high-contrast plum/on-dark number disk while retaining each stage color in
  the ring. A forced-reduced-motion Lighthouse rerun scores 100 for
  accessibility with no color-contrast failures.
- Returned keyboard focus to the footer email field after invalid newsletter
  submission. The existing alert relationship and `aria-invalid` state remain
  intact.
- Made Imaging’s art-directed hero eager and media-preloaded without fetching
  the wrong portrait/landscape source. Imaging now emits exactly three
  mutually exclusive breakpoint preloads and passes every Lighthouse LCP
  discovery check; measured resource-load delay fell from 68ms in the prior
  warm run to about 30ms.
- Made the featured News milestone image eager and high-priority. It now passes
  every LCP discovery check; measured request discovery delay fell from about
  122ms to 25ms.
- Left the Contact and Media H1 immediately paintable while preserving the
  eyebrow, supporting-copy, proof, and visual entrances. Contact H1 render
  delay fell from 408ms to 79ms; Media fell from 421ms to 87ms.
- Replaced Impact’s doubled-width mobile artwork request with two
  art-directed 768px square AVIF crops. The full composition remains at
  tablet/desktop widths. The measured mobile route transfer fell from about
  405 KiB to 390 KiB while both concepts remain readable as full cards.
- Deferred configured client Sentry initialization until browser idle, with a
  three-second ceiling. The first pre-idle error, unhandled rejection, or route
  transition still initializes immediately; temporary listeners are removed
  synchronously and unconfigured builds schedule no work.
- Standardized explicit high fetch priority across verified hero LCP images,
  added the Calm Clinical paper color to mobile browser chrome, and preserved
  zero layout shift across the audited routes.
- Corrected truth-governance drift without changing `truth.md`: the investor
  summary now says “White House recognition,” the NIH portfolio record is
  explicitly archival, founder naming is normalized to “Dr. Tanya Petrossian,
  PhD · Founder & CEO,” and header/footer terminology consistently uses
  “Platform.”
- Regenerated both investor-summary PDF paths from the corrected source. The
  deliverable remains a three-page tagged PDF; both files are byte-identical,
  and extracted text contains the approved White House and Pre-clinical
  terminology.
- Post-change throttled-mobile Lighthouse runs on the five affected routes
  remain within the 90+ budget: Imaging 93, News 93, Impact 94, Contact 96,
  and Media 93. CLS is 0 on every route and TBT remains at or below 6ms in
  this set. Run-to-run Lighthouse variance was up to two points.
- Final validation for that pass: 35 test files / 153 tests, full ESLint,
  TypeScript, production build, diff whitespace check, and
  `npm audit --omit=dev` all passed. Nine public content routes were statically
  prerendered; Contact is request-rendered so its approved subject is present
  before hydration.

External launch dependencies remain unchanged: counsel-approved Privacy,
Terms, Accessibility, retention, and unsubscribe language; an approved
canonical production origin and public inbox/delivery configuration;
content-owner review of detailed team biographies and investor-access policy;
and an absolute production URL plus review date for the downloadable investor
summary.
- Made the copied and downloaded approved media boilerplate byte-for-text
  identical and added artifact checks for the investor PDFs and publication
  ZIPs.

## Form reliability, rhythm, and runtime pass — July 23, 2026

- Added one browser-safe JSON submission helper shared by Contact, Investor,
  and company updates. Requests now abort after 12 seconds, restore their
  controls, and present a specific recovery message instead of remaining
  disabled indefinitely.
- Bounded Resend delivery at eight seconds and passed the abort signal through
  to the provider fetch. Logical retries now use a stable SHA-256-derived
  idempotency key that contains no contact details and ignores only the
  route-generated timestamp line.
- Unified all three client email checks with the API validator. Addresses such
  as `a..b@example.com` are rejected and focused locally rather than failing as
  an unstructured server error.
- Added explicit POST actions to all three forms and a named newsletter email
  field. If JavaScript fails, the browser now fails closed at the JSON-only API
  boundary instead of placing names, emails, companies, or messages into a GET
  URL.
- Removed query strings and fragments from PostHog page URLs, Sentry request
  URLs, navigation breadcrumbs, and route-transition tracing. Contact routing
  remains functional without forwarding possible form data to telemetry.
- Corrected Contact subject routing at the server boundary. Approved Media,
  Partnership, Investor, Career, General, and Other routes now appear in the
  initial server tree and update correctly through client navigation.
- Reworked the Media boilerplate from one long mobile paragraph into three
  validated editorial paragraphs with a restrained rose rail and 58-character
  measure. Copy and download actions still receive the exact complete approved
  string.
- Reframed the Team development ledger as three calm chapters with distinct
  pastel header washes, larger portraits, shorter bio measures, and a clearer
  desktop header-to-roster split while preserving every approved name and bio.
- Tightened Innovation’s hero-to-mechanism handoff and gave the sticky artwork
  a taller tablet canvas. The three stage sentinels and complete reduced-motion
  fallback remain unchanged.
- Added a live right-edge continuation cue to the mobile Pipeline chapter rail;
  it disappears once the final chapter is reached.
- Delayed Home’s optional GSAP runtime until the first narrative marker is
  genuinely near and added a 120 ms hover-intent delay before portfolio image
  priming. Focus and press still prime immediately.
- Serialized Lighthouse baselines remained above budget: Home 94, Pipeline 94,
  and Innovation 93 on throttled mobile, with zero layout shift and no
  meaningful blocking time. The Pipeline hero reveal was retained after warm
  runs showed only about 54 ms of element-render delay; the earlier one-second
  result was concurrent-audit contention.

## Accessibility, privacy, and native-resilience pass — July 23, 2026

- Closed the remaining analytics URL leak: PostHog now runs as pageview-only
  analytics, disables page-leave capture, autocapture, and session recording,
  strips query strings and fragments from every known URL property in
  `before_send`, and enables personal-data property masking.
- Made the global skip link reliable by giving every public
  `main#main-content` a programmatic focus target. Live keyboard verification
  now lands on `MAIN#main-content`; same-path mobile Contact routing also closes
  cleanly and restores focus to the menu trigger.
- Added an accessible branded `global-error.tsx` boundary for root-layout
  failures, with retry/home recovery and best-effort deferred Sentry reporting.
- Frozen Contact, Investor, and company-update inputs while their submitted
  payload is pending so the visible values cannot diverge from the request.
- Added a bounded progressive fallback for all three forms. Native
  `application/x-www-form-urlencoded` submissions now share the same 32 KiB
  limit, honeypot, validation, rate limiting, sanitization, and delivery path as
  JSON submissions, then receive a privacy-safe `303` to a noindex status page.
  Redirect URLs contain only fixed form/status enums and never submitted data.
- Moved the public investor summary and diligence index immediately after the
  Investor hero, removed the accessible-name override from its PDF link, and
  added point-of-claim provenance for the FDA IND Allowance. Lighthouse now
  reports a clean Label-in-Name audit.
- Shortened the News secondary hero action to “View UCLA recognition,” retained
  full provenance for assistive technology, and kept `ENDO-205` together in the
  mobile headline.
- Added direct desktop path labels to the Care Gap illustration, clarified the
  FemLUNA slider percentage as an illustration position rather than performance
  data, and expanded the responsive image ladder. The final Impact audit reports
  zero responsive-image savings; its latest transfer is 373 KiB.
- Final validation: 42 Vitest files / 198 tests passed, ESLint and TypeScript
  passed, the production build generated all expected routes, and the 390 px
  browser matrix found one H1, one focusable main, zero overflow, zero duplicate
  IDs, and zero broken images across all ten public routes plus the native-form
  response page.
- Latest serialized mobile Lighthouse scores are Home 98, Impact 94, Imaging
  97, Investors 98, and News 97 performance. Every run scored 100 accessibility
  and 100 best practices, with zero layout shift and zero blocking time.
- `truth.md` remains untouched.

## Cross-route refinement pass — July 23, 2026

- Re-composed the Team hero as one tall founder portrait beside six balanced
  development-team portraits at phone widths. Corrected the responsive image
  estimates for the smaller tablet portraits and clarified the hero action as
  “Meet the development team.”
- Reduced the Team mobile resume wall with native, keyboard-accessible profile
  disclosures. At tablet widths, the final profile in the three-person chapter
  and the single-member finance chapter now use the available width as
  intentional horizontal profiles rather than leaving empty ledger columns.
  Full biographies remain visible without interaction at desktop widths.
- Removed the cryptic `Disc. / Preclin. / IND / P1 / P2 / P3` mobile Pipeline
  axis. Every program now shows the complete two-line development-stage names
  at all widths. The two-column diligence-signal grid also has complete, even
  borders and outer alignment at tablet widths.
- Improved the Innovation mechanism’s compact instruction and corrected its
  responsive image estimate. Added point-of-claim company/FDA provenance to the
  Innovation clinical-translation proof and the Pipeline oncology descriptions,
  including the applicability estimate.
- Preserved Media visitor intent through a fixed, non-personal
  `intent=press|asset` route. Contact now distinguishes press-desk support from
  alternate-format requests and adapts the message guidance without adding new
  API fields or putting submitted data in the URL.
- Added compact FDA and WHO source links beside the Media key facts and clearly
  labeled the disease-burden figures as company reported. The newsroom still
  needs approved high-resolution/vector source assets before it is fully
  self-serve.
- Restored native HTML validation in the server-rendered Contact, Investor, and
  update-request forms; enhanced custom validation is enabled only after
  hydration. The Contact subject toggle is no longer emitted as an inert
  no-JavaScript control, and the message field now carries its ten-character
  native minimum.
- Replaced the Footer’s visually ambiguous arrow-only update control with a
  clearly labeled “Request updates” action while retaining the existing
  accessible name, pending-state freeze, and recovery behavior.
- Validation after this pass: 42 Vitest files / 201 tests passed, full ESLint
  and TypeScript passed, the production build generated every expected route,
  and `git diff --check` passed. `truth.md` remains untouched.

## Release-quality continuation — July 23, 2026

- Moved the Pipeline chapter rail directly below the hero so it is available
  before the overview begins. Its Overview target now remains below the sticky
  rail instead of scrolling the navigation itself out of context.
- Added intent-based prefetching to persistent desktop and mobile navigation.
  Routes remain excluded from eager viewport prefetch, but focus and pointer
  intent now warm the selected destination before activation.
- Reduced the Home mobile proof wall without removing any evidence. FDA IND
  Allowance and NIH recognition stay immediately visible; supporting milestones
  and institutional relationships use a native, no-JavaScript disclosure on
  phones and remain fully visible at larger breakpoints. The adjacent News &
  Media spread now removes repeated excerpts and excess height only on phones.
- Rebuilt both scientific publication packages as deterministic ZIP archives
  containing byte-identical AVIF sources, native-size progressive JPEG
  derivatives, publication captions, required qualifications, and SHA-256
  manifests. Added a transparent native-size PNG wordmark, a native-size JPEG
  leadership portrait, and one complete versioned web media kit. No portrait or
  wordmark was upscaled, and none is described as a vector or print-ready
  master.
- Added `npm run media:generate` as the authoritative package builder and
  strengthened artifact tests to verify archive entries, decompression,
  checksums, canonical source identity, image dimensions, color space,
  transparency, and progressive JPEG encoding.
- Preserved media intent from News into the press-specific Contact path,
  converted Contact's internal route chooser to client navigation, and clarified
  the Footer's duplicated “Platform” labels with an “Explore” heading and
  destination-specific link names.
- Consolidated the ten public route paths into one metadata export consumed by
  social-image typing and sitemap generation, reducing future canonical and
  sitemap drift.
- Validation after this continuation: the full 42-file / 205-test Vitest suite,
  ESLint, TypeScript, the production build, and `git diff --check` passed.
  Live phone and desktop checks confirmed zero horizontal overflow, zero broken
  images, a closed phone/visible desktop evidence disclosure, the Pipeline rail
  fixed at its 64 px sticky offset, and all new media formats served with the
  expected MIME types.

## Clean-release and resilience pass — July 23, 2026

- Removed the internal concept laboratory from Next’s production route
  discovery. Production manifests, server output, and client chunks now contain
  no `/concepts` route or concept slug. The laboratory remains available on
  demand through `npm run dev:concepts`, which materializes ignored local route
  wrappers and removes them when the process exits.
- Added prebuild and postbuild release guards. A production build now fails if
  local concept routes are present or if a generated manifest/server artifact
  contains them. Concept-only GSAP React and Embla packages moved to
  development dependencies.
- Replaced the full Sentry namespace loader with a narrow local runtime adapter.
  The configured lazy monitoring graph fell from 584,841 to 231,687 raw bytes,
  from 184,179 to 74,967 gzip bytes, and from 155,719 to 64,963 Brotli bytes.
  Replay and rrweb signatures are absent while exception capture, early-error
  handling, URL redaction, and route-transition tracing remain covered.
- Preserved a stable initial payload: configured Home now measures 149,295
  Brotli bytes of first-load JavaScript, and the smallest public routes measure
  144,094 bytes. The monitoring optimization remains deferred from the critical
  path.
- Restored real outline-based focus indicators to shared fields and Contact
  subject cards, with Windows forced-colors fallbacks using system
  `Highlight` and `CanvasText` colors. Focus no longer depends only on a
  box-shadow ring that high-contrast mode may suppress.
- Added a server-rendered no-JavaScript portfolio index with direct links to
  ENDO-205, FemLUNA™, ENDO-995, and ENDO-311. The enhanced tab interface remains
  unchanged when JavaScript is available.
- Hardened every rendered public-email and form-recovery surface against a valid
  254-character configured address using shrinkable wrappers and
  `overflow-wrap:anywhere`.
- PostHog now honors both Do Not Track and Global Privacy Control before its
  deferred import. Existing pageview-only, URL-redaction, no-autocapture, and
  no-session-recording settings remain intact.
- Consolidated the repeated dark-surface rose value into the Calm Clinical
  token set so Home News, Home Portfolio, and Pipeline share one semantic
  `rose-on-dark` treatment.
- Final validation for this pass: 44 Vitest files / 216 tests, full ESLint,
  TypeScript, two production builds (configured measurement and unconfigured
  release), postbuild manifest verification, `git diff --check`, and
  `npm audit --omit=dev` all passed. Live 320px checks confirmed zero overflow,
  broken images, duplicate IDs, or unresolved `aria-controls` on Home and
  Contact; the concept slug returns a clean 404 without concept copy.
- `truth.md` remains untouched.

## Remaining pre-launch dependencies

### Resolved since this audit

- **Investor PDF accessibility:** the current
  `public/downloads/endocyclic-investor-summary-v2.pdf` is a three-page tagged
  PDF with document language, Title and Author metadata, semantic source
  headings/tables/lists, explicit page order, and a public—not confidential—cover.
  Its evidence language now distinguishes institutional records from
  company-reported relationships; the stale legacy domain and inbox are gone.
  The legacy file remains byte-identical and its public URL now redirects
  permanently to the versioned document.
- **Contact deep-link rendering:** approved subjects are represented correctly in
  server HTML and remain stable through hydration. Investors keeps its request
  form as a client island.
- **Media request routing:** Press and asset-format requests now route through
  fixed `intent=press|asset` variants of
  `/contact?subject=media#contact-form`; the live form confirms both the selected
  “Media & press” route and the requested context.
- **Current regulatory News source:** the March 23, 2026 FDA IND Allowance
  announcement is now the featured News item and links to the hosted PR Newswire
  record.

### High priority

1. **Canonical domain and production inbox**
   - `endocyclic.com` currently has no DNS or MX records. The application no
     longer publishes that origin or inbox by default: it uses a reserved
     `.invalid` metadata base, an empty sitemap, explicit `noindex, nofollow`
     directives, and form-only contact routes until approved values are
     configured.
   - The investor PDF is now domain-neutral and routes readers to
     `/investors#data-room`; it no longer blocks launch on an unapproved host or
     inbox.
   - The established company authority remains
     `www.endocyclictherapeutics.com`, with live pages and Google Workspace MX.
     Choose the intended production domain explicitly, connect it to Railway,
     preserve the existing `www` host if replacing the legacy site, and verify
     the authorized inbox before normalizing URLs or sender addresses.
   - The application allows crawlers to fetch preview HTML so they can process
     its `noindex`; the same unconfigured build also sends an
     `X-Robots-Tag: noindex, nofollow, noarchive` header on all responses.
   - A permanent `/peptide` → `/innovation` redirect now protects the legacy
     indexed platform path for either migration strategy.

2. **Production lead durability and rate limiting**
   - The endpoints now fail honestly when Resend is unavailable, but lead capture still depends on email delivery.
   - The bounded in-memory limiter is shared across all three endpoints within
     one process and trusts only Railway’s overwritten `X-Real-IP`; it is not
     durable across multiple replicas. A missing trusted header deliberately
     collapses to one `unknown` client rather than trusting spoofable forwarding
     headers.
   - Add a trusted distributed rate limiter and a durable CRM/queue before launch.

3. **Privacy and compliance pages**
   - Contact, investor, and update-request forms collect personal data, and analytics may load, but no approved Privacy, Terms, Accessibility, consent, retention, or unsubscribe language exists in the repository.
   - Add counsel-approved policies and footer/form links; do not invent this copy.
   - Preserve the established `/termsofuse` path with a counsel-approved
     replacement or redirect at cutover. The legacy copy contains stale company
     language and must not be carried forward as-is.

4. **Team credential approval trail**
   - Several detailed biographies in `lib/site.ts` include credentials and accomplishments not present in `truth.md`.
   - Verify each item with the content owner and add an approved source trail, or narrow the biographies. Normalize any remaining use of “IND clearance” to the approved “FDA IND Allowance.”

5. **Disease-burden provenance and regulatory review**
   - Impact figures match `truth.md`, but the source audit could not substantiate
     the current “$200B annual US burden” wording. Public sources reviewed in
     July 2026 report materially lower US estimates, while the indexed legacy
     EndoCyclic Impact page described $200B as a global estimate.
   - The unqualified “average eight-year diagnostic delay” also needs geography:
     the [WHO](https://www.who.int/news-room/fact-sheets/detail/endometriosis)
     reports a global range of 4–12 years, while the exact eight-year figure is
     supported as a median in a
     [UK specialist-centre study](https://pubmed.ncbi.nlm.nih.gov/31328629/).
   - Obtain content-owner/regulatory approval for the intended geography and
     methodology before changing `truth.md` or publishing a visible references
     ledger. The
     [National Academies review](https://www.ncbi.nlm.nih.gov/books/NBK607720/),
     [McKinsey women’s-health blueprint](https://www.mckinsey.com/mhi/our-insights/blueprint-to-close-the-womens-health-gap-how-to-improve-lives-and-economies-for-all),
     and WHO fact sheet are the strongest starting sources.

### Medium priority

- Connect update requests to a real subscriber list or CRM; the current confirmed workflow is an accepted email request, not automated list enrollment.
- Add visible “last reviewed” dates to the investor memo and approved media boilerplate.
- Replace the founder portrait only when a higher-resolution authentic image is supplied; do not generate people.
- Supply an approved vector wordmark, high-resolution leadership portrait,
  layered scientific artwork, and the applicable license/approval records before
  describing newsroom assets as source or print-ready files.

## Quality score

| Criterion | Score | Note |
| --- | ---: | --- |
| Factual accuracy | 4/5 | Copy matches `truth.md`, and institutional versus company-reported evidence is now explicit; the $200B US burden wording, unqualified eight-year delay, and detailed team credentials still need review. |
| 10-second clarity | 5/5 | Value proposition, lead program, stage, and CTA are immediately legible. |
| Pharma-grade polish | 4/5 | Visual system and route flow are strong; policy, citation, and PDF dependencies remain. |
| CTA conversion | 5/5 | CTAs are sequenced by intent and form recovery is substantially clearer. |
| Performance | 5/5 | Responsive and image checks pass; fresh mobile production runs score 93–95 across the six rebuilt routes, with zero layout shift and no more than 10 ms blocking time. |

## Verification completed

- ESLint with zero warnings
- TypeScript `--noEmit`
- Vitest: 39 files, 171 tests passed
- `git diff --check`
- Live desktop and mobile route matrix
- Mobile menu focus/inert behavior
- Static build confirmation for nine public content routes; Contact is
  intentionally request-rendered so approved subject routing is correct in the
  initial HTML
- Pipeline atlas: four unique program rows, four current-stage markers, and no
  horizontal overflow
- Contact deep-link routing verified with an approved subject in the production
  preview
- Media-to-Contact handoff verified live with “Media & press” preselected
- Contact’s initial server HTML contains the selected “Media & press” route and
  the named form landmark before hydration
- Unconfigured public contact surfaces contain zero blank or dead `mailto:`
  links, and Contact/Media JSON-LD omits empty email properties
- Contact, Investor, and update APIs enforce one shared five-request/minute
  limit, return `Retry-After` on HTTP 429, and return `Cache-Control: no-store`
- Oversized API request smoke test returns HTTP 413
- `npm audit --omit=dev`: zero vulnerabilities
- AVIF image-optimizer smoke test passes with Sharp 0.35.3
- Innovation sticky sequence verified live at stages 1, 2, and 3 with exactly
  one non-hidden tab panel at each stage
- Home rapid-switch stress test: one final selected tab, no stale image layer,
  transform-only active/stage markers, zero overflow, and zero broken images
- Production bundle inspection: no `ProjectionNode` or `VisualElement`
  signatures on Home or Investors
- API delivery-failure smoke tests
- Latest mobile production Lighthouse: Home 94, Contact 95, Media 94, Team 94,
  Innovation 93, and Pipeline 94 performance
- All six latest mobile runs score 100 accessibility / 100 best practices,
  report zero layout shift, and measure 0–10 ms total blocking time
- Latest desktop production Lighthouse: Home 99 performance / 100 accessibility / 100 best practices
- Latest Home mobile transfer: 290 KiB over 18 requests, with 1.2s FCP, 3.0s LCP,
  zero layout shift, and zero blocking time
- Earlier production baselines: Home 99, Pipeline 97, and Impact 92 performance
- Zero measured layout shift and no more than 12.5ms total blocking time on the latest Home and Media runs
- Home and Pipeline hero images receive high-priority LCP hints; Pipeline passes
  all LCP discovery checks, and Media reports zero responsive-image savings
- SEO scoring is intentionally deferred while the preview is noindexed pending an approved canonical domain and inbox configuration
- Production CSP excludes `unsafe-eval`, uses `frame-ancestors 'none'`, and aligns `X-Frame-Options: DENY`
- Structured-data smoke checks confirm a shared Organization/WebSite identity and a Pipeline `CollectionPage` with a four-item `ItemList`
- Internal concept routes return clean HTTP 404 responses with
  `X-Robots-Tag: noindex, nofollow, noarchive`, leak no concept copy, and emit
  no fallback errors in production logs
- Media scientific ZIPs pass archive-integrity checks and retain byte-identical
  source AVIF files
- All ten public routes pass the 390px production matrix with one H1, one named
  main, zero horizontal overflow, zero broken images, zero duplicate IDs, and
  zero unresolved `aria-controls`
- Full Vitest suite: 34 files and 143 tests passed after the shareability pass
- Versioned illustration responses return
  `Cache-Control: public, max-age=31536000, immutable`
- All ten versioned social previews return HTTP 200 as `image/jpeg`, publish
  route-correct Open Graph and Twitter metadata, and return
  `Cache-Control: public, max-age=31536000, immutable`
- Home’s 1440px production render selects the new 1440px hero candidate
- Mobile and desktop visual regression covers the revised Impact provenance,
  Imaging slider, Contact chooser, Pipeline transition, Media cards, and News
  source taxonomy
- The final accessibility sweep found no remaining verified high- or
  medium-severity issues
- Latest post-shareability mobile Lighthouse: Home 94 performance / 100
  accessibility / 100 best practices, 291 KiB over 18 requests, 1.2s FCP,
  3.0s LCP, zero layout shift, and 10ms total blocking time
- `truth.md` left untouched

## Continuation pass — claim governance and graceful degradation

Completed July 24, 2026.

- Re-audited all public copy, shared data, metadata, structured data, social-card
  source, and the investor-summary source against `truth.md`. No direct
  contradiction or prohibited public use of “cure,” “guaranteed,” “proven,” or
  “safe” was found.
- Replaced “activated by disease” and molecular “state change” language with the
  approved sequence: pH-mediated activation followed by selective uptake by
  diseased tissue. Home and Platform social cards were regenerated to match.
- Limited the public Team source to the approved founder identity and role.
  Rebuilt the route as a fuller founder-led profile grounded in approved company,
  platform, portfolio, regulatory, and Milken Institute facts. Detailed
  credentials and a broader roster remain unpublished until they have an
  approved source trail.
- Removed unsupported milestone qualifiers and access-policy promises, labeled
  the UCLA Alumni class note neutrally, broadened Platform JSON-LD from
  `MedicalTherapy` to `MedicalEntity`, and normalized FemLUNA™ naming.
- Regenerated the tagged three-page investor summary with the exact approved
  RADx Tech and White House wording; the versioned and legacy PDFs remain
  byte-identical.
- Added a native no-JavaScript mobile navigation and made the homepage portfolio
  fall back to one complete linked program index without duplicate dead tabs.
- Prevented mobile Pipeline stage-label collisions while retaining full
  accessible stage names, tightened shared inner-page hero rhythm at tablet
  widths, and widened the founder portrait tile in the Media asset mosaic at the
  1024px breakpoint.
- Production verification: 45 Vitest files / 222 tests, ESLint, TypeScript,
  optimized build, production-surface manifest guard, and `git diff --check`
  passed. Live Home, Team, Pipeline, Platform, and Media checks found zero
  horizontal overflow, broken images, or duplicate IDs at the available 880px
  browser viewport. Server HTML contains both no-JavaScript fallbacks.
- `truth.md` remains untouched.

## Continuation pass — flow, responsive semantics, and prefetch discipline

Completed July 24, 2026.

- Removed the Pipeline hero's second four-program index. The hero now hands
  directly to the sticky chapter navigation and the full development-stage
  atlas, eliminating a repeated 15–36rem navigation layer before program
  depth on small screens.
- Replaced Imaging's duplicate version of Impact's eight-year dot timeline
  with a route-specific diagnostic-path composition: clinical signal,
  visibility gap, current surgical confirmation, and a clear handoff into the
  FemLUNA™ targeting concept. Impact retains ownership of the burden ledger.
- Tightened the founder route into a clearer platform-to-clinic progression.
  The profile now has one authored founder dossier, a five-part leadership
  path, and fewer repeated partnership actions. The authentic 291×369 Tanya
  Petrossian portrait is rendered near its native display dimensions at tablet
  and desktop breakpoints instead of being stretched across the full hero
  field.
- Fixed the Home evidence dossier's desktop semantics. Mobile keeps a closed
  native disclosure, while tablet and desktop now render an always-visible,
  independently labeled evidence block outside the closed `<details>`.
  Live accessibility-tree inspection confirms the supporting NIH and
  institutional records are exposed at the 880px viewport.
- Aligned keyboard behavior with responsive visual orientation. Innovation's
  horizontal mechanism tabs now reserve Up/Down for page scrolling; the Home
  portfolio reports horizontal orientation below 1024px and vertical
  orientation at desktop, consuming only the matching arrow pair plus
  Home/End.
- Disabled speculative viewport prefetching for same-page Contact query routes,
  no-JavaScript navigation fallbacks, footer links, and the four Home portfolio
  links that all resolve to `/pipeline`. Enhanced primary navigation retains
  explicit focus and pointer-intent prefetching.
- A fresh production performance audit before the fixes confirmed a strong
  baseline: mobile performance 94 on Home and Innovation, 98 on Pipeline,
  zero CLS, zero blocking time, and no runtime, hydration, image-priority, or
  route-bundle regression. The flow changes remove markup and speculative
  requests without adding a new runtime dependency.
- Final verification for this pass: 46 Vitest files / 230 tests, ESLint,
  TypeScript, `npm audit --omit=dev` with zero vulnerabilities, optimized
  production build of all 19 pages, prebuild/postbuild production-surface
  guards, and `git diff --check` passed. A live ten-route production matrix
  found one H1 and one named main per route, zero horizontal overflow, broken
  loaded images, duplicate IDs, or unresolved `aria-controls`; browser
  diagnostics were empty.
- `truth.md` remains untouched.

## Continuation pass — recovery, delivery resilience, and production freshness

Completed July 24, 2026.

- Reworked the previously sparse 404, segment-error, and form-response surfaces
  into branded recovery compositions using the same restrained selective-thread
  visual language as the public site. The artwork is decorative, uses only
  transform/opacity motion, remains hidden at the narrowest widths, and does not
  interfere with recovery actions.
- Segment and root error boundaries now move focus to the recovery landmark
  without scrolling. The global fallback uses the real EndoCyclic wordmark while
  remaining independent of the optimized-image runtime.
- Failed native form submissions retain a direct no-JavaScript recovery link and
  add a progressively enhanced “Go back to your draft” action. The action uses
  browser history and places no submitted values or personally identifiable
  information in the URL.
- Enhanced Contact, Investor, and update-request forms now honor `Retry-After`.
  Numeric and HTTP-date formats use one bounded parser with clock-skew handling,
  a safe fallback, and an exact accessible countdown. Only the submit action is
  gated; entered fields remain editable and retain their values.
- The footer update form now stacks its controls at narrow widths and within the
  narrow desktop footer column, while retaining the compact row at tablet
  widths. The Pipeline chapter navigation gains a persistent forced-colors cue
  for its current location.
- Added a print layer for diligence use: fixed/sticky navigation and interactive
  update controls are removed, reveal content is forced visible, color washes
  and shadows are normalized, and program/figure breaks are made more stable.
- `/contact` no longer consumes server `searchParams`. Its public shell is now
  statically rendered while the smallest existing client form boundary applies
  approved subject and media-intent deep links after hydration and on
  `popstate`.
- Public HTML now revalidates after five minutes and expires from shared stale
  caches after one hour. `/form-response` remains explicitly dynamic and
  private/no-store; versioned illustration and social assets retain the
  one-year immutable policy.
- External buttons that open a new tab now include that behavior in their
  accessible name.
- Final verification for this pass: 47 Vitest files / 244 tests, ESLint,
  TypeScript, `npm audit --omit=dev` with zero vulnerabilities, optimized
  production build, prebuild/postbuild production-surface guards, and
  `git diff --check` passed. The build reports ten static public routes at a
  five-minute revalidation interval and keeps `/form-response` dynamic.
- Live production headers confirm `s-maxage=300,
  stale-while-revalidate=3300` for public HTML, private/no-store for submission
  status, and immutable caching for versioned illustrations. A ten-route browser
  matrix found one H1 and one named main per route, zero horizontal overflow,
  broken images, duplicate IDs, or unresolved `aria-controls`; browser
  diagnostics were empty.
- `truth.md` remains untouched.

## Continuation pass — routed-form continuity, responsive assets, and transfer discipline

Completed July 24, 2026.

- Reproduced and fixed a live same-page Contact routing defect. Partnership,
  investor, media, career, and general deep links now update the selected
  inquiry without remounting the form or clearing a draft. Native history keeps
  back/forward behavior intact and the destination fragment still scrolls into
  view.
- Consolidated rate-limit language across the Contact, Investor, and update
  forms. The alert now remains timeless while the dedicated `Retry-After`
  notice owns the live countdown and ready state. Submit controls reference
  only the current visible retry description, avoiding duplicate or stale
  screen-reader output.
- Made Media asset cards content-sized rather than row-height constrained.
  Copy can expand at browser/text zoom; clipping remains limited to the
  visual-preview layer. The Pipeline chapter rail now emits its continuation
  cue in server HTML and removes it after client measurement only when the
  remaining chapters are already visible.
- Removed measured speculative RSC traffic from offscreen Home news/media
  actions, Platform-to-Pipeline program links, and Pipeline same-page program
  anchors. Post-change full-page traces recorded zero matching prefetch
  requests and reduced scrolled request counts from 31 to 22 on Home, 27 to 22
  on Platform, and 25 to 22 on Pipeline.
- Added crop-specific mobile derivatives for the Home, Platform, and Impact
  hero artwork. These are deterministic crops of the approved source images,
  not regenerated scientific content. Media-qualified preloads deliver one
  matching source per viewport; a 390×844 DPR2 trace loaded no desktop
  counterpart.
- No higher-resolution approved source exists in the repository for Tanya
  Petrossian’s portrait or the EndoCyclic wordmark. Both media-kit copies match
  the public originals at 291×369 and 233×70 respectively, so neither likeness
  nor logo was synthetically reconstructed.
- Verification: 47 Vitest files / 250 tests, ESLint, TypeScript, optimized
  production build, prebuild/postbuild production-surface guards, and
  `git diff --check` passed. All ten public routes, `robots.txt`, and
  `sitemap.xml` returned the expected production status and security headers.
  Live traces found zero CLS, console errors, duplicate/nonmatching hero
  requests, or offscreen RSC-prefetch regressions. Mobile Home measured 94
  performance, 100 accessibility, and 100 best practices with zero layout
  shift and effectively zero blocking time.
- `truth.md` remains untouched.

## Continuation pass — destination focus, mobile continuity, and asset framing

Completed July 24, 2026.

- Fixed the Contact mobile-menu partnership route as one complete interaction.
  Closing the menu no longer returns focus to the trigger after a same-page
  route change; the form region waits until the inert menu background is
  released, then receives focus without moving the viewport. Live production
  verification confirms the partnership route remains selected, the menu is
  removed, and `#contact-form` owns focus.
- Made native-form recovery language honest by default. Server and
  no-JavaScript output now retains the direct return-to-form action without
  promising a restorable draft. “Go back to your draft” appears only after
  hydration when browser history and a same-origin form referrer make recovery
  credible.
- Replaced the Pipeline phone abbreviations with complete, line-wrapped stage
  terminology: Discovery, Pre-clinical, IND-enabling, and Phases 1–3. The
  server-rendered chapter overflow cue is now limited to genuinely narrow
  screens, avoiding a false chevron at the verified 880px tablet viewport.
- Preserved the Selective Thread on Home below 768px with a lightweight,
  CSS-only vertical trace aligned to the existing chapter markers. The optional
  motion runtime remains desktop-only, so the stronger mobile brand continuity
  adds no phone JavaScript or scroll-driven work.
- Kept hero context readable from first paint. Introductory copy and primary
  actions now use transform/clip settling without a delayed opacity fade;
  artwork and secondary evidence retain the restrained staged entrance.
- Reframed Tanya Petrossian’s authentic 291×369 source as a bounded,
  native-proportion mobile inset instead of enlarging and cropping it across the
  full hero field. No synthetic likeness was created. ENDO-311 now uses the
  centered, lighter responsive derivative through tablet and retains the wide
  negative-space master on desktop.
- Moved Team and Impact fragment targets from padded section shells to the
  content they describe. Direct production navigation now lands the Leadership
  and burden headings approximately 100–110px below the fixed navigation,
  instead of exposing a large inter-section gap.
- Verification: 47 Vitest files / 251 tests, ESLint, TypeScript, optimized
  production build, prebuild/postbuild production-surface guards, and
  `git diff --check` passed. Live checks at 880×804 confirmed the Contact focus
  handoff, the Team and Impact anchor positions, the tablet Pipeline chapter
  rail without a false cue, and complete stage labels.
- `truth.md` remains untouched.

## Continuation pass — narrative progression, mobile art direction, and editorial assets

Completed July 24, 2026.

- Re-art-directed the Pipeline hero for phones without generating new
  scientific content. The approved portfolio artwork now uses a taller 8:5
  frame and right-biased crop below 640px, where the peptide and all four
  program endpoints remain legible; its explanatory sentence moves below the
  image instead of covering the smaller field. Tablet and desktop retain the
  original 2:1 composition.
- Tightened the Pipeline sequence from portfolio orientation, to shared
  mechanism, to program value. Repeated stage language was consolidated, the
  ENDO-205 and FemLUNA™ sections now state their distinct portfolio roles, and
  the evidence strip separates clinical entry, NIH review, NICHD support, and
  Fast Track filing.
- Removed the repetitive FemLUNA™ development brief from Imaging after its
  facts were already established by the hero and targeting comparison. The
  diagnostic-gap handoff now adds the approved eight-year delay, while
  ENDO-311 separates radiation-free design from standard-imaging compatibility
  and avoids repeating its companion-program label in the figure caption.
- Renamed the one-person public Team surface to Leadership while preserving the
  stable `/team` route. A three-record ledger now connects the UCLA founder
  profile, Milken Institute Women’s Health Network membership, and ENDO-205
  clinical entry to their source links. The direct anchor targets the full
  record grid rather than its sticky column, so record 01 and the heading both
  clear the fixed navigation.
- Released deterministic web media kit v2 with two additional qualified
  editorial packages: ENDO-205 selective uptake and FemLUNA™ targeting. Each
  ZIP includes native-size AVIF and progressive JPEG files, exact caption and
  alt text, required conceptual-use qualification, and SHA-256 integrity
  checks. The release label explicitly identifies an asset-bundle version, not
  regulatory review or product approval.
- The Media page now presents those program visuals as a dedicated editorial
  sequence and links the complete kit to the versioned v2 archive. Existing
  approved source artwork was reused; no synthetic likeness, logo, or new
  scientific mechanism was generated.
- Verification: 47 Vitest files / 255 tests, ESLint, TypeScript,
  `npm audit --omit=dev` with zero vulnerabilities, optimized production build,
  prebuild/postbuild production-surface guards, deterministic archive
  regeneration, and `git diff --check` passed. A live ten-route production
  matrix found one H1 and one named main per route, zero horizontal overflow,
  broken images, duplicate IDs, or unresolved `aria-controls`. All three new
  archives returned HTTP 200 with `application/zip`.
- `truth.md` remains untouched.

## Continuation pass — focus-safe chapters, conversion routing, and mobile media flow

Completed July 24, 2026.

- Standardized the partnership destination as one shared constant and routed
  every production and concept-surface action directly to the selected Contact
  form. Existing intent-based navigation prefetch still strips the fragment
  before requesting route data.
- Made public hash destinations focusable, visibly named regions across
  Pipeline, Imaging, Impact, Leadership, Investors, Media, and Contact.
  Removed duplicated offsets where the root scroll padding already clears the
  fixed navigation; Pipeline retains a measured 3rem margin to clear its
  additional sticky chapter index.
- Protected the active Selective Sequence tabpanel from scroll-driven stage
  changes while a keyboard reader is focused inside it. Scroll synchronization
  resumes after focus leaves the sequence, and the portfolio atlas reading key
  now exposes the correct group semantics.
- Focused the Contact hero on inquiry routing, then named the form handoff
  “Tell us what you need.” The direct-contact panel keeps only distinct contact
  channels instead of repeating site-navigation resources.
- Reframed the Investor opening around ENDO-205’s FDA IND Allowance and Phase 1
  status, introduced the approved care gap before the evidence figures, and
  moved the diligence index ahead of the PDF on mobile. Program-ledger links no
  longer trigger offscreen Pipeline prefetches.
- Reordered Home News & Media on small screens so owned News and Media
  destinations precede outbound stories. Desktop retains the authored
  featured-story and resource-ledger composition without duplicating links.
- Softened the RADx Tech description to the scope of the linked NIH
  institutional record. No new scientific or performance claim was added.
- Verification: 48 Vitest files / 263 tests, ESLint, TypeScript,
  `npm audit --omit=dev` with zero vulnerabilities, optimized production build,
  prebuild/postbuild production-surface guards, and `git diff --check` passed.
  Fresh mobile Lighthouse checks on Home, Contact, and Investors measured
  92–93 performance, 100 accessibility, 100 best practices, and zero layout
  shift. Live production-preview checks confirmed focus transfer and final
  anchor positions below fixed and sticky navigation.
- `truth.md` remains untouched.

## Continuation pass — share integrity, narrative hierarchy, and landmark polish

Completed July 24, 2026.

- Regenerated and cache-versioned the revised Team, Contact, Investor, and
  Pipeline social cards so public share previews use the current page
  headlines, Tanya Petrossian portrait, and approved portfolio artwork instead
  of stale cached copy.
- Reframed the approved 233 × 70 EndoCyclic wordmark at its native dimensions
  in the Media hero collage and asset card. The treatment remains responsive
  below that width but no longer enlarges the only approved source beyond its
  native size.
- Strengthened the Pipeline first viewport around one precision peptide
  platform, four programs, ENDO-205 Phase 1, and FDA IND Allowance in 2026.
  Innovation now makes the three development paths and four programs explicit;
  Impact preserves its burden-to-care-gap narrative instead of previewing the
  next chapter.
- Replaced repetitive conceptual-image captions with direct qualifications,
  clarified source labels for FDA and NIH announcements, removed repeated copy
  from the featured FDA news item, improved Investor and Leadership metadata,
  and changed the ambiguous Contact fallback to “Not sure where to start.”
- Replaced three nested complementary landmarks with named local groups in
  Contact, Investor regulatory, and Media asset surfaces. The Leadership record
  now uses `overflow-clip`, restoring its intended desktop sticky behavior
  without creating a scrolling ancestor.
- Independent visual, responsive, performance, conversion, and accessibility
  audits found no remaining high-severity issue or material motion regression.
  The only unimplemented visual suggestion was a subjective increase in Contact
  desktop density; the existing sparse composition was retained to avoid
  unnecessary churn.
- Verification: 48 Vitest files / 265 tests, ESLint, TypeScript,
  `npm audit --omit=dev` with zero vulnerabilities, optimized production build,
  prebuild/postbuild production-surface guards, and `git diff --check` passed.
  A live ten-route production matrix found one H1 and one main per route, zero
  horizontal overflow, broken images, duplicate IDs, or unresolved
  `aria-controls`; browser diagnostics were empty. Live geometry confirmed the
  wordmark renders at exactly 233 × 70 and the Leadership record pins at the
  intended 7rem desktop offset.
- `truth.md` remains untouched.

## Continuation pass — resilient navigation, complete print output, and diligence continuity

Completed July 24, 2026.

- Made the desktop navigation respond to its measured content rather than its
  viewport breakpoint alone. At 200% text scaling it now removes the
  non-fitting link group from interaction, exposes the same accessible drawer
  used on narrow screens, and restores the complete desktop navigation when
  space returns. Fit is re-evaluated after resize, font loading, and
  `ResizeObserver` changes.
- Extended the scaled-text pass across all ten public routes. The shared footer,
  Home founder closing, Pipeline diligence signals, and News source links now
  permit long words and labels to wrap inside their tracks without shrinking
  link targets or introducing horizontal page movement.
- Added persistent non-color selected states for Contact inquiry options, Home
  portfolio tabs, current navigation, and the Pipeline chapter index in forced
  colors. The transparent FemLUNA™ comparison range now drives a visible
  high-contrast focus outline around its shared image field.
- Made the Impact ENDO-205 figure print-complete by revealing every
  animation-controlled layer and returning its layout to page flow. Innovation
  now prints the existing complete three-stage mechanism fallback instead of
  one active sticky stage. A live print-media check also caught and corrected
  the ENDO-205 heading color after its dark panel becomes white.
- Unified Contact and Investor submission confirmations across enhanced and
  native modes. Successful Contact, Investor, and update requests now lead to
  Home, Pipeline, and News respectively; failed newsletter submissions can
  return to an allowlisted same-origin source route without reflecting an
  external URL.
- Added the missing Tanya Petrossian founder fragment, routed News readers into
  Investor diligence and Media readers back to sourced News, and kept
  `ENDO-205` intact in the Home News & Media title at phone widths.
- Verification: 49 Vitest files / 274 tests, ESLint, TypeScript,
  `npm audit --omit=dev` with zero vulnerabilities, optimized production build,
  prebuild/postbuild production-surface guards, and `git diff --check` passed.
  A live 20-view matrix covering all ten routes at desktop and 390px found one
  H1 and named main per route, zero horizontal overflow, broken images,
  duplicate IDs, unresolved `aria-controls`, console errors, or page errors.
  A separate 200% text-only matrix found zero overflow on every route and the
  compact menu available throughout.
- `truth.md` remains untouched.

## Continuation pass — desktop hero balance and accessible state integrity

Completed July 24, 2026.

- Re-audited all public hero compositions at phone, tablet, and desktop widths.
  Pipeline and Media were the only routes whose desktop titles exceeded the
  intended three-line ceiling: each was constrained to a five-column narrative
  track at 1280px. Both now use a balanced six-column composition while
  preserving the existing small-screen stack, artwork, restrained type scale,
  and Calm Clinical visual language.
- Added the balanced option to the shared page-hero system instead of applying
  page-specific width overrides. Pipeline now requests an image candidate
  aligned with its smaller six-column visual track, avoiding unnecessary
  over-delivery without changing the source artwork.
- Restored AA contrast to the 12px FemLUNA™ comparison indices by removing
  compounded opacity. Added persistent `Highlight` outlines for active
  Selective Sequence tabs and FemLUNA™ preset buttons in forced-colors mode.
- Disclosed the Contact message field’s ten-character minimum before entry and
  associated the instruction with the textarea. Newsletter and Media download
  accessible names now begin with their exact visible labels, preserving speech
  input compatibility while retaining state and package detail.
- An independent runtime audit found no production-surface P0 or P1 issue.
  Mobile Lighthouse measured 96–99 performance across Home, Innovation,
  Pipeline, Media, Imaging, and Impact, with 0 CLS and 2–4.5ms TBT; desktop
  Home and Innovation measured 100. Existing GSAP enhancement remains deferred
  behind desktop and proximity checks, and reduced motion retains complete
  static content.
- Verification: 49 Vitest files / 275 tests, ESLint, TypeScript,
  `npm audit --omit=dev` with zero vulnerabilities, optimized production build,
  prebuild/postbuild production-surface guards, and `git diff --check` passed.
  Live production geometry confirmed three-line Pipeline and Media titles at
  both 1280px and 390px, with zero horizontal overflow. Rendered checks also
  confirmed the Contact description association and visible-label inclusion
  for the revised actions.
- `truth.md` remains untouched.

## Continuation pass — responsive comparisons, dedicated News art, and composited reveals

Completed July 24, 2026.

- Replaced the two vertically stacked phone illustrations in the Impact
  care-gap comparison with one shared visual field and two accessible tabs.
  The selected path now changes in place with an opacity-and-scale transition;
  arrow, Home, and End keys preserve the expected tab interaction. The
  simultaneous two-panel comparison remains available from 640px through
  tablet, and the full composite remains available at desktop widths.
- Moved the ENDO-205 translation figure and the primary Investor regulatory
  chronology into their horizontal compositions at 768px rather than waiting
  for a desktop breakpoint. At 880px the ENDO-205 figure is now 801px high
  instead of 1,325px, and the regulatory figure is 686px instead of 957px,
  while both retain zero horizontal overflow.
- Generated a dedicated hand-rendered News illustration showing a precision
  peptide crossing a regulatory-to-clinical threshold. The new asset replaces
  recycled ENDO-205 mechanism art in the featured story and its generated
  social card without depicting an FDA seal, clinical outcome, efficacy claim,
  patient, or medical procedure.
- Reduced the Impact mobile image candidate from the 750px source to the 650px
  source at the audited Lighthouse width, saving 12,178 bytes (22.65%) without
  changing the visible crop. Generic scroll reveals now use only opacity and
  transform; authored hero and portfolio clipping remains where it is part of
  the composition.
- Aligned the Investor diligence index’s DOM order with its visual and keyboard
  order, and corrected the footer wordmark link’s accessible name to match the
  visible “EndoCyclic Therapeutics” identity. Forced-colors mode includes the
  new care-gap selected state.
- Verification: 49 Vitest files / 279 tests, ESLint, TypeScript,
  `npm audit --omit=dev` with zero vulnerabilities, optimized production build,
  prebuild/postbuild production-surface guards, and `git diff --check` passed.
  Live production-preview checks at 390px, 880px, and 1280px confirmed the
  shared mobile care-gap field, three-column tablet chronology, three-line News
  title, correct dedicated image delivery, empty browser diagnostics, and zero
  horizontal overflow.
- `truth.md` remains untouched.

## Continuation pass — editorial restraint, mobile asset indexing, and founder focus

Completed July 24, 2026.

- Let the dedicated News illustration become the featured-story protagonist.
  The artwork now occupies 79% of the desktop visual and 77% on phone widths,
  replacing the repeated hero-metric block with a slim regulatory-threshold
  and clinical-development rail. FDA IND Allowance, Phase 1, and 2026 remain
  clear in the primary narrative without being typeset twice at equal weight.
- Reworked the Media download mosaic into an editorial asset index on phones
  while retaining the authored two-column and twelve-column bento at larger
  widths. Preview and copy now sit side by side below 640px; the four asset
  entries decreased from 2,074px to 1,307px combined height, and the complete
  Media route decreased from 8,062px to 7,295px with no hidden download,
  qualification, or usage note.
- Removed synthetic 01–07 numbering from Contact inquiry categories and
  changed the structure from an ordered sequence to an unordered choice list.
  Each route now carries a Selective Thread focus/hover state using only
  transform and opacity, with seven 44px-plus targets and zero mobile overflow.
  The equivalent non-semantic numbering was also removed from the Media asset
  index.
- Consolidated Leadership repetition into a founder-led hierarchy. The hero
  proof now establishes company stage and location, the biography stays focused
  on Dr. Tanya Petrossian and the platform, and the UCLA profile appears once
  within a source-backed founder dossier alongside the Milken network and
  clinical-entry records.
- Separated static Media boilerplate guidance from its polite live region so
  the interface announces only copy success or failure, not a second idle
  message after the state resets. Media program copy now precedes informative
  imagery in DOM order, and News/Media/Contact micro-feedback has keyboard-focus
  parity and reduced-motion fallbacks.
- Verification: 49 Vitest files / 279 tests, ESLint, TypeScript,
  `npm audit --omit=dev` with zero vulnerabilities, optimized production build,
  prebuild/postbuild production-surface guards, and `git diff --check` passed.
  Live production-preview checks at 390px, 880px, and 1280px confirmed the
  revised compositions, correct list semantics, empty runtime diagnostics, and
  zero horizontal overflow.
- The approved Tanya Petrossian portrait remains the only material asset
  limitation: its 291 × 369 source is below a high-density mobile display
  target. The image was not synthetically altered; an approved 582 × 738 or
  larger source would improve sharpness without changing the composition.
- `truth.md` remains untouched.

## Continuation pass — portfolio hierarchy, comparison focus, and image precision

Completed July 24, 2026.

- Removed the Pipeline atlas’s duplicate outer introduction so the authored
  atlas header now introduces the disease-area, modality, and stage system once
  before the first program row. Program-link arrows gained keyboard-focus
  parity and reduced-motion fallbacks.
- Replaced the two stacked phone illustrations in the oncology chapter with one
  shared 4:3 program field. ENDO-311 and ENDO-995 now switch through an
  accessible two-tab comparison with roving focus, Left/Right, Home, and End
  support, truthful per-view alternative text, composited transitions, a
  static reduced-motion state, and a persistent forced-colors selection cue.
- Rebuilt the generic equal-weight Pipeline evidence grid as a sourced
  diligence dossier. FDA IND Allowance and Phase 1 form the dominant 2026
  clinical threshold; the NIH score, NICHD awards, and Fast Track filing remain
  subordinate supporting records rather than four indistinguishable metrics.
- Consolidated the Home hero’s three repeated proof cells into one clinical
  entry ribbon—FDA IND Allowance in 2026 flowing into Phase 1—and removed the
  orphan “02” marker from Innovation’s otherwise unnumbered Platform breadth
  section.
- Corrected four semantic details found in the Imaging, Impact, and Investors
  audit: the mobile care-gap tabpanel now accepts keyboard focus; both
  decorative care-gap images remain hidden from the accessibility tree while
  the live panel description carries meaning; the Imaging diagnostic connector
  no longer sits as an invalid direct child of an ordered list; and the
  investor-summary action has a concise visible-name-preserving download name.
- Replaced full-container focus rectangles on programmatic chapter targets with
  a restrained two-pixel destination rule. Forced-colors mode continues to
  provide the complete system high-contrast outline.
- Added 560, 700, 1120, and 1280 responsive image candidates to match widths
  already declared by the page compositions, and aligned the three audited
  phone heroes to their measured 90vw container. The pre-change performance
  audit measured 92–94 on mobile and 100 on desktop, with zero layout shift,
  negligible blocking time, and no duplicate requests; the new candidates
  avoid several 11–23% image over-deliveries without changing source art.
- Verification: 50 Vitest files / 285 tests, ESLint, TypeScript, optimized
  production build, prebuild/postbuild production-surface guards, and
  `git diff --check` passed. An 18-view production matrix covering Home,
  Innovation, Pipeline, Imaging, Impact, and Investors at 390px, 880px, and
  1280px found one H1 and one main per route, zero horizontal overflow, broken
  images, duplicate IDs, or unresolved `aria-controls`. Live keyboard checks
  confirmed both mobile comparisons, and the rebuilt Pipeline atlas and
  evidence dossier were visually inspected at phone and desktop widths.
- `truth.md` remains untouched.

## Continuation pass — press-asset legibility, editorial affordances, and quiet form feedback

Completed July 24, 2026.

- Replaced Media’s narrow phone crop for the two wide scientific assets with
  full-width 2:1 preview stages. The mechanism and portfolio compositions are
  now visible in full before their download copy, while the wordmark and
  authentic founder portrait retain the compact ledger treatment that suits
  their native geometry.
- Moved the two program-visual packages into a balanced six-column tablet
  composition at 768px, then into the existing five/seven desktop composition.
  At 880px the complete Media route decreased from 8,316px to 7,397px without
  removing a file, caption, qualification, or action.
- Unified Media’s responsive wordmark and founder-portrait hints. A full phone
  scroll now reuses one optimized wordmark URL and one optimized portrait URL
  rather than downloading byte-identical transformations at two widths.
- Corrected the News archive’s false whole-row affordance. Static marks and
  article rows no longer move when non-actionable space is hovered; the concise
  editorial headline is now the primary source link and carries the focused
  transform treatment. Full source and independent-coverage links remain in
  the source column.
- Corrected the Leadership dossier’s ordered-list structure by moving its
  decorative gradient connector outside the list. All direct ordered-list
  children are now list items.
- Reduced screen-reader chatter across Contact and Investor validation. Inline
  field errors remain programmatically associated through `aria-describedby`
  but are no longer simultaneous assertive alerts; server failures retain their
  alert behavior. Retry buttons keep stable names while the existing quiet
  notice owns the countdown, Contact confirmation now sits at the correct
  heading level, and the no-JavaScript navigation disclosure uses the neutral
  “Main menu” name with native expanded state.
- Verification: 50 Vitest files / 287 tests, ESLint, TypeScript, optimized
  production build, prebuild/postbuild production-surface guards, focused
  responsive tests, and `git diff --check` passed. A 15-view production matrix
  covering Media, News, Leadership, Contact, and Investors at 390px, 880px, and
  1280px found one H1 and one main per route, zero horizontal overflow, broken
  images, duplicate IDs, invalid list children, or unresolved
  `aria-controls`. Browser diagnostics remained empty.
- `truth.md` remains untouched.

## Continuation pass — scientific focus, mobile stage clarity, and semantic flow

Completed July 24, 2026.

- Simplified the Home mechanism at tablet and desktop widths so the scientific
  illustration is no longer covered by three large explanatory panels. Three
  restrained numbered hotspots now connect the image to a semantic explanation
  rail below it; the already compact phone sequence remains unchanged.
- Corrected the Home portfolio’s tab-list structure by moving its animated
  selection surface outside the ordered list. Every direct list child is now a
  list item, while the active surface continues to align and animate across the
  two-column phone index and vertical desktop index.
- Replaced Impact’s decorative 01/02/03 chapter numerals with the shared
  Selective Thread mark. The three narrative chapters now use the same quiet
  visual grammar as the rest of the site without adding meaningless spoken
  numbering.
- Clarified the Pipeline atlas hierarchy: the atlas introduction is an H2 and
  Endometriosis and Oncology are H3 disease-area sections. At 320px the six
  development stages now use concise visible labels—Disc., Pre-clin.,
  IND-enab., and Ph. 1–3—while preserving complete stage names for assistive
  technology and restoring the full visible labels from 640px upward.
- Reordered the Investors summary before the diligence index in DOM and focus
  order, matching the desktop visual flow. The summary is now a named article
  with a semantic H2 and a compact 112px side-by-side document composition on
  phones rather than a long stacked preamble.
- Raised News archive headline links to a minimum 44px touch target and removed
  misleading hover behavior from static Pipeline evidence rows.
- Tightened fixed-logo image delivery. Intrinsic logo instances no longer emit
  an unnecessary viewport `sizes` hint, and the image-size configuration
  retains the 384px device candidate without duplicating it in the image-size
  set. Live navigation and footer logos now emit two density candidates instead
  of the previous large merged source set.
- Verification: 51 Vitest files / 290 tests, ESLint, TypeScript, optimized
  production build, prebuild/postbuild production-surface guards, and
  `git diff --check` passed. A 40-view production matrix covered all ten public
  routes at 320px, 390px, 880px, and 1280px and found one H1 and one main per
  route, zero horizontal overflow, broken images, duplicate IDs, invalid list
  children, or unresolved ARIA references. Browser diagnostics remained empty.
- `truth.md` remains untouched.

## Continuation pass — four-stage mechanism, balanced proof, and closing-thread polish

Completed July 24, 2026.

- Rebuilt the Home clinical threshold as a balanced three-part evidence ledger:
  ENDO-205, FDA IND Allowance with its 2026 date, and the current Phase 1 stage
  now read as one composed proof line at desktop widths and a stable one-plus-two
  hierarchy on phones.
- Generated and integrated a new 1774 × 887 scientific illustration for a
  four-stage sequence: diseased-tissue targeting, pH-mediated activation,
  selective uptake, and a qualified ENDO-205 preclinical lesion-clearance
  state. Shared data now keeps the Home, Innovation, Media, media-download, and
  social-card treatments aligned.
- Expanded the Innovation sequence from three to four interactive stages.
  The generated illustration, hotspots, tab rail, active panel, scroll
  sentinels, keyboard navigation, static fallback, captions, and continuation
  state all include stage 04 while retaining explicit preclinical and
  non-clinical-outcome qualifiers.
- Moved the Home thread traveler outside its animated clipping layer. The
  marker remains aligned to the same motion path but now renders as a complete
  12px ring at chapter boundaries, including the transition into Partnering.
- Rebalanced the founder close at tablet widths so Dr. Tanya Petrossian’s name
  no longer breaks inside her surname. The portrait, caption, and CTAs retain
  the same calm visual hierarchy.
- Removed the redundant label from the mobile care-gap comparison and gave the
  successful investor-request state a useful next action back to the pipeline.
- Advanced the complete web media kit to v3 rather than mutating the existing
  v2 release identity. Explicitly versioned investor and media-kit downloads now
  ship with one-year immutable cache headers.
- Verification: 52 Vitest files / 292 tests, ESLint, TypeScript, optimized
  production build, and prebuild/postbuild production-surface guards passed.
  A 20-view production matrix covered all ten public routes at 390px and
  1280px and found one H1 per route, zero horizontal overflow, and zero broken
  images. Home and Innovation were additionally inspected at 880px; the
  four-stage sticky sequence advanced correctly from stage 01 to stage 04,
  the complete thread ring remained visible at the Partnering boundary, and
  browser diagnostics remained empty.
- `truth.md` remains untouched.

## Continuation pass — content-fit routing, durable validation, and media orientation

Completed July 24, 2026.

- Removed the Contact hero’s fixed artwork minimum height. Its routing panel
  now sizes to its content instead of leaving a large blank tail below the
  final destination.
- Kept Contact, Investor, and newsletter validation feedback active until each
  edited value actually satisfies its rule. Whitespace-only names, partial
  email addresses, and undersized messages no longer appear corrected after a
  single keystroke.
- Corrected the Pipeline platform thesis to follow the approved biological
  order: selective uptake by diseased tissue, pH-mediated activation, then
  non-hormonal action.
- Added a concise task index to Media so press and diligence visitors can move
  directly to approved language, web assets, scientific visuals, or the press
  contact. The scientific-visual collection is now a named, focusable region.
- Three independent audits found no critical accessibility or responsive
  failures and confirmed strong route structure, image delivery, and initial
  bundle size. The remaining release blocker is deployment configuration, not
  the interface: Railway must build with the approved HTTPS
  `NEXT_PUBLIC_SITE_URL` before the site is indexable.
- `truth.md` remains untouched.

## Continuation pass — peptide engagement to lesion resolution

Completed July 24, 2026.

- Generated and integrated `selective-mechanism-v5.avif`. The four-stage master
  now shows the locked 13-bead ENDO-205 motif physically engaged on the lesion,
  followed by the same lesion receding into progressively smaller fragments
  while surrounding tissue remains visibly spared.
- Preserved the approved biological order: selective uptake precedes
  pH-mediated activation. Stage 04 remains explicitly qualified as an ENDO-205
  preclinical finding rather than a universal platform or clinical outcome.
- Shifted the stage-04 focus and hotspot toward the engagement-to-resolution
  transition so tablet and desktop views do not point only at the final
  fragments.
- Redrew the compact mobile stage as the same two-beat story and added a
  regression contract for the intact peptide plus three receding lesion
  fragments.
- Propagated the versioned master through Home, Innovation, Media, concept
  previews, editorial downloads, and newly versioned Team and Media social
  cards. The complete web media kit advanced to v5; prior versioned archives
  remain intact.
- Updated the illustration specification so future generated assets must show
  peptide engagement before lesion resolution while preserving four orange,
  six warm-taupe, and three violet beads in the locked orientation.
- `truth.md` remains untouched.

### Remaining deployment checks

- Verify that Railway provides the approved HTTPS `NEXT_PUBLIC_SITE_URL` and
  rebuilds with it. Unconfigured builds intentionally publish no sitemap
  entries, `.invalid` canonical/JSON-LD URLs, and global noindex headers rather
  than guessing a production domain.
- Obtain approved counsel copy for a public Privacy Notice before promoting
  forms that collect personal information. Link it beside Contact, Investor,
  and update forms and from the footer; no policy language has been invented.
- Approve a canonical production origin before regenerating the investor PDF
  with a complete, clickable return URL. The current download cannot safely
  embed an origin that is not configured.
- Resolve the documented source-methodology questions for the `$200B` US burden
  and average eight-year diagnostic-delay figures before adding a visible
  publication-grade reference ledger. `truth.md` was not changed.
- The current request throttle is process-local. Move rate limiting to a trusted
  distributed or edge store before scaling to multiple replicas, and verify the
  trusted client-IP header at the deployment boundary.
