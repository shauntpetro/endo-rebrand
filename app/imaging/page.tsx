import Image from "next/image";
import { Radiation, ShieldOff, Sparkles, Layers, ScanLine, Baby } from "lucide-react";
import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import Button from "@/components/site/Button";
import Reveal from "@/components/site/Reveal";

/* -------------------------------------------------------------------- Hero */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pt-32 md:pt-40">
      <div aria-hidden className="pointer-events-none absolute right-[-6rem] top-24 h-72 w-72 rounded-full bg-tint-teal blur-2xl md:right-[-2rem]" />
      <div aria-hidden className="pointer-events-none absolute right-24 top-52 h-40 w-40 rounded-full bg-tint-plum blur-2xl" />
      <Container className="relative">
        <div className="max-w-3xl reveal">
          <Eyebrow>Imaging &amp; diagnostics</Eyebrow>
          <h1 className="t-hero mt-6 text-ink">See what laparoscopy can’t.</h1>
          <p className="t-lead mt-6 max-w-2xl">
            FemLUNA™ is developed to be the first non-invasive, definitive diagnostic for
            endometriosis — designed to detect superficial and sub-millimeter lesions often missed
            by current imaging, as a non-invasive alternative to laparoscopy, today’s diagnostic
            gold standard.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/pipeline" variant="primary">View the full pipeline</Button>
            <Button href="/contact?subject=partnership" variant="ghost">Partner with us</Button>
          </div>
          <p className="mt-10 flex items-center gap-2.5 text-sm text-muted">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-teal" />
            FemLUNA™ · IND-enabling
          </p>
        </div>
        <div className="mt-16 h-px w-full bg-line md:mt-24" />
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- FemLUNA */
const FEMLUNA_HIGHLIGHTS = [
  {
    icon: Radiation,
    title: "Radiation-free imaging",
    body: "No ionizing radiation — designed for repeat use across the long arc of diagnosis and follow-up.",
  },
  {
    icon: ShieldOff,
    title: "Non-hormonal, no heavy metals",
    body: "Free of hormones and heavy metals, in keeping with our precision peptide platform.",
  },
  {
    icon: Baby,
    title: "For sensitive populations",
    body: "Developed with adolescents and reproductive-age women in mind, where invasive workups fall short.",
  },
  {
    icon: ScanLine,
    title: "Standard and low-field imaging",
    body: "Designed to be compatible with standard and low-field imaging systems already in clinical use.",
  },
  {
    icon: Layers,
    title: "Hard-to-see lesion subtypes",
    body: "Developed to visualize lesion subtypes that are difficult to detect with standard imaging.",
  },
  {
    icon: Sparkles,
    title: "Sub-millimeter sensitivity",
    body: "Designed to reveal superficial and sub-millimeter lesions often overlooked by current methods.",
  },
];

function FemLuna() {
  return (
    <Section tone="white" id="femluna">
      <Container>
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <Eyebrow>FemLUNA™</Eyebrow>
            <h2 className="t-h2 mt-4 text-ink">
              A definitive picture, without the operating room.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="self-end md:col-span-6 md:col-start-7">
            <p className="t-body text-muted">
              A targeted imaging agent developed for accurate, non-invasive detection of
              endometriosis — including the superficial and sub-millimeter lesions that current
              imaging so often misses. Intended to shorten the eight-year average diagnostic delay
              and spare patients an invasive procedure.
            </p>
          </Reveal>
        </div>

        {/* Before / after comparison */}
        <Reveal delay={0.05} className="mt-14">
          <div className="grid gap-6 md:grid-cols-2">
            <figure className="overflow-hidden rounded-xl border border-line bg-paper">
              <div className="relative aspect-[1024/559]">
                <Image
                  src="/standard-mri.webp"
                  alt="A standard MRI scan of the pelvis, in which small endometriosis lesions are difficult to distinguish from surrounding tissue."
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="border-t border-line px-4 py-3 text-sm font-medium text-ink">
                Standard MRI
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-xl border border-line bg-paper">
              <div className="relative aspect-[1024/565]">
                <Image
                  src="/FemLUNA-enhanced.webp"
                  alt="An illustrative FemLUNA-enhanced scan of the pelvis, in which lesions appear more clearly delineated against surrounding tissue."
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="border-t border-line px-4 py-3 text-sm font-medium text-ink">
                FemLUNA-enhanced <span className="text-muted">(illustrative)</span>
              </figcaption>
            </figure>
          </div>
          <p className="mt-4 text-sm text-muted">
            Illustrative comparison for concept demonstration only — not clinical study data.
          </p>
        </Reveal>

        {/* Highlights */}
        <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {FEMLUNA_HIGHLIGHTS.map((h, i) => {
            const Icon = h.icon;
            return (
              <Reveal key={h.title} delay={i * 0.06} className="border-t border-line pt-5">
                <Icon size={20} className="text-teal-ink" aria-hidden />
                <h3 className="t-h3 mt-4 text-ink">{h.title}</h3>
                <p className="mt-2 text-sm text-muted">{h.body}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/* --------------------------------------------------------------- ENDO-311 */
const ENDO311_POINTS = [
  {
    title: "Radiation-free, non-hormonal, heavy-metal-free",
    body: "The same platform principles as FemLUNA — designed to image without ionizing radiation, hormones, or heavy metals.",
  },
  {
    title: "Early localization and monitoring",
    body: "Designed for early-stage tumor localization and ongoing disease monitoring in malignant solid tumors.",
  },
  {
    title: "Compatible with standard imaging",
    body: "Developed to work with the standard imaging systems already in clinical use.",
  },
  {
    title: "A companion to ENDO-995",
    body: "The diagnostic half of the oncology “detect and treat” pair, matched to therapeutic candidate ENDO-995.",
  },
];

function Endo311() {
  return (
    <Section tone="tint-teal" id="endo-311">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <Eyebrow>ENDO-311</Eyebrow>
            <h2 className="t-h2 mt-4 text-ink">
              The same imaging principles, extended to oncology.
            </h2>
            <p className="t-body mt-5 text-muted">
              ENDO-311 is an investigational imaging agent for non-invasive detection and monitoring
              of malignant solid tumors, with an initial focus on colon cancer. It is developed as
              the companion diagnostic to our oncology therapeutic candidate, ENDO-995.
            </p>
            <div className="mt-8">
              <Button href="/pipeline" variant="quiet">See the oncology pair</Button>
            </div>
          </Reveal>
          <div className="md:col-span-6 md:col-start-7">
            <dl className="divide-y divide-line border-t border-line">
              {ENDO311_POINTS.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.05}>
                  <div className="py-5">
                    <dt className="t-h3 text-ink">{p.title}</dt>
                    <dd className="mt-1.5 text-sm text-muted">{p.body}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------- Closing CTA */
function Closing() {
  return (
    <Section tone="plum">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow tone="dark">Precision, end to end</Eyebrow>
            <h2 className="t-h2 mt-4 text-on-dark">
              Detect earlier. Treat with precision.
            </h2>
            <p className="mt-5 max-w-xl text-muted-on-dark">
              Our diagnostics and therapeutics are built on one platform. Explore the full pipeline,
              or reach out to discuss partnership.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/pipeline" variant="ghost-on-dark">View the full pipeline</Button>
              <Button href="/contact?subject=partnership" variant="ghost-on-dark">Partner with us</Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export default function ImagingPage() {
  return (
    <main id="main-content">
      <Hero />
      <FemLuna />
      <Endo311 />
      <Closing />
    </main>
  );
}
