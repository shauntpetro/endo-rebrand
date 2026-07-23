import Link from "next/link";
import Image from "next/image";
import { Download, Lock } from "lucide-react";
import Button from "@/components/site/Button";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import NIHRecognitionPanel from "@/components/site/NIHRecognitionPanel";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import Section from "@/components/site/Section";
import InvestorRequestForm from "./InvestorRequestForm";

const DILIGENCE_PATH = [
  { index: "01", label: "Regulatory path", href: "#regulatory" },
  { index: "02", label: "Platform & programs", href: "#platform" },
  { index: "03", label: "External validation", href: "#validation" },
  { index: "04", label: "Controlled access", href: "#data-room" },
] as const;

const REGULATORY_PATH = [
  {
    index: "01",
    status: "Preclinical",
    statusClass: "text-gold-ink",
    nodeClass: "bg-gold",
    label: "Preclinical evidence",
    title: "Disease biology",
    text: "Demonstrated elimination of endometriosis lesions and associated inflammation.",
  },
  {
    index: "02",
    status: "Achieved · 2026",
    statusClass: "text-teal-ink",
    nodeClass: "bg-teal",
    label: "FDA milestone",
    title: "IND Allowance",
    text: "FDA IND Allowance for ENDO-205 in 2026.",
  },
  {
    index: "03",
    status: "Current",
    statusClass: "text-rose-ink",
    nodeClass: "bg-rose",
    label: "Current stage",
    title: "Phase 1",
    text: "First-in-human clinical study in healthy pre-menopausal women of reproductive age.",
  },
  {
    index: "04",
    status: "Filing underway",
    statusClass: "text-rose-ink",
    nodeClass: "bg-surface ring-2 ring-rose",
    label: "Next regulatory step",
    title: "Fast Track",
    text: "Fast Track filing is underway.",
  },
] as const;

const PROGRAMS = [
  {
    name: "ENDO-205",
    type: "Therapeutic · Endometriosis",
    stage: "FDA IND Allowance (2026) · Phase 1",
    href: "/pipeline#endo-205",
  },
  {
    name: "FemLUNA™",
    type: "Diagnostic · Endometriosis imaging",
    stage: "IND-enabling",
    href: "/pipeline#femluna",
  },
  {
    name: "ENDO-995",
    type: "Therapeutic · Malignant solid tumors",
    stage: "Preclinical",
    href: "/pipeline#oncology",
  },
  {
    name: "ENDO-311",
    type: "Diagnostic · Solid tumors",
    stage: "Preclinical",
    href: "/pipeline#oncology",
  },
] as const;

const SUPPORTING_VALIDATION = [
  "Multiple NICHD awards and recognition as an NIH SBIR Success Story",
  "UCLA partnership, RADx Tech, and White House recognition",
  "Founding member of the Milken Institute Women’s Health Network",
] as const;

function DiligenceIndex() {
  return (
    <Section tone="paper" size="compact">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-4">
            <a
              href="/downloads/endocyclic-investor-summary.pdf"
              download
              aria-label="Download the three-page EndoCyclic investor summary PDF"
              className="group grid gap-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-ink sm:grid-cols-[9.5rem_1fr] sm:items-end lg:grid-cols-1 lg:items-start"
            >
              <span
                aria-hidden
                className="relative block aspect-[8.5/11] w-36 overflow-hidden border border-line bg-surface shadow-[0_18px_50px_rgb(57_38_56/0.12)] transition-transform duration-300 ease-[var(--ease-soft)] group-hover:-translate-y-1 sm:w-[9.5rem]"
              >
                <Image
                  src="/downloads/endocyclic-investor-summary-cover.avif"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 152px, 144px"
                  className="object-cover object-top"
                />
              </span>

              <span className="block min-w-0">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-ink">
                  Investor memo
                </span>
                <span className="t-h3 mt-2 block text-ink">Investor summary</span>
                <span className="mt-2 block text-sm leading-relaxed text-muted">
                  A concise overview of the platform, pipeline, and development milestones.
                </span>
                <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-teal-ink">
                  Download summary (PDF)
                  <Download aria-hidden size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                </span>
                <span className="block text-xs text-muted">3 pages · PDF</span>
              </span>
            </a>
          </div>

          <nav aria-label="Investor diligence sections" className="lg:col-span-7 lg:col-start-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-ink">
              Diligence index
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              Four sections organize the diligence path.
            </p>
            <ol className="grid list-none border-t border-line sm:grid-cols-2">
              {DILIGENCE_PATH.map((item) => (
                <li key={item.href} className="border-b border-line sm:odd:pr-6 sm:even:border-l sm:even:pl-6">
                  <a href={item.href} className="group flex min-h-14 items-center gap-4 text-sm font-medium text-ink">
                    <span className="text-xs font-semibold tracking-[0.16em] text-rose-ink">{item.index}</span>
                    <span className="link-underline">{item.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </Container>
    </Section>
  );
}

function RegulatoryChronology() {
  return (
    <Section tone="tint-teal" size="chapter">
      <Container id="regulatory" className="scroll-mt-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Regulatory path</Eyebrow>
            <h2 className="t-h2 mt-5 max-w-2xl text-ink">
              From preclinical evidence to FDA allowance and Phase 1.
            </h2>
          </div>
          <p className="max-w-lg text-muted lg:col-span-4 lg:col-start-9">
            ENDO-205 is the clinical-stage lead within a four-program precision peptide pipeline.
          </p>
        </div>

        <ol className="mt-14 grid list-none border-y border-line sm:grid-cols-2 xl:grid-cols-4">
          {REGULATORY_PATH.map((item, index) => (
            <Reveal
              as="li"
              key={item.index}
              delay={index * 0.05}
              className="relative grid grid-cols-[2.25rem_1fr] gap-4 border-b border-line py-7 last:border-b-0 sm:block sm:odd:pr-8 sm:even:border-l sm:even:pl-8 sm:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b-0 xl:border-l xl:px-7 xl:first:border-l-0 xl:first:pl-0 xl:last:pr-0"
            >
              <div className="pt-1 sm:flex sm:items-center sm:gap-3 sm:pt-0">
                <span
                  aria-hidden
                  className={`block h-3 w-3 rounded-full border-2 border-tint-teal ${item.nodeClass}`}
                />
                <span className="mt-2 block text-xs font-semibold tracking-[0.16em] text-muted sm:mt-0">
                  {item.index}
                </span>
              </div>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.13em] sm:mt-7 ${item.statusClass}`}>
                  {item.status}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.13em] text-teal-ink">
                  {item.label}
                </p>
                <h3 className="t-h3 mt-3 text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

function PlatformLedger() {
  return (
    <Section tone="paper" size="chapter">
      <Container id="platform" className="scroll-mt-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>Platform & programs</Eyebrow>
              <h2 className="t-h2 mt-5 text-ink">One selective logic across four programs.</h2>
              <p className="mt-5 text-muted">
                The platform combines pH-mediated activation with selective uptake by diseased
                tissue and spans therapeutics, diagnostics, and oncology.
              </p>
              <div className="mt-8 border-t border-line pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-ink">
                  Platform logic
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  pH-mediated activation · selective uptake · non-hormonal
                </p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            <dl className="border-y border-line">
              {PROGRAMS.map((program, index) => (
                <Reveal
                  key={program.name}
                  delay={index * 0.05}
                  className="grid gap-4 border-b border-line py-7 last:border-b-0 sm:grid-cols-[1fr_1.45fr] sm:items-start sm:gap-8"
                >
                  <div>
                    <dt className="t-h3">
                      <Link
                        href={program.href}
                        aria-label={`Review ${program.name} in the full pipeline`}
                        className="group inline-flex min-h-11 items-center gap-2 text-ink transition-colors duration-300 hover:text-teal-ink"
                      >
                        <span className="link-underline">{program.name}</span>
                        <span
                          aria-hidden
                          className="text-sm font-medium text-rose-ink transition-transform duration-300 group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </Link>
                    </dt>
                    <dd className="mt-2 text-sm text-muted">{program.type}</dd>
                  </div>
                  <dd className="text-sm font-medium text-teal-ink sm:text-right">{program.stage}</dd>
                </Reveal>
              ))}
            </dl>
            <div className="mt-8 flex justify-end">
              <Button href="/pipeline" variant="quiet" className="min-h-11">Review the full pipeline</Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ValidationDossier() {
  return (
    <Section tone="tint-warm" size="chapter">
      <Container id="validation" className="scroll-mt-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>External validation</Eyebrow>
            <h2 className="t-h2 mt-5 text-ink">Independent recognition around the platform.</h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {SUPPORTING_VALIDATION.map((item) => (
                <li key={item} className="flex gap-4 py-5 text-sm leading-relaxed text-muted">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <NIHRecognitionPanel />
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
              NIH Commercialization Readiness Pilot grant recognition for the ENDO-205 program.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function DataRoom() {
  return (
    <Section tone="paper" size="chapter">
      <Container id="data-room" className="scroll-mt-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Controlled access</Eyebrow>
            <h2 className="t-h2 mt-5 text-ink">Request the confidential data room.</h2>
            <p className="mt-5 text-muted">
              Share a few details and the appropriate person on our team will review your
              request for investor or strategic-partner access.
            </p>
            <div className="mt-8 flex items-start gap-3 border-y border-line bg-tint-warm px-5 py-5">
              <Lock size={18} className="mt-0.5 shrink-0 text-rose-ink" aria-hidden />
              <p className="text-sm leading-relaxed text-muted">
                Access is granted to qualified investors and partners and may be subject to a
                confidentiality agreement.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7 lg:col-start-6">
            <InvestorRequestForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export default function InvestorsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Investor relations"
        title="FDA IND Allowance. Phase 1. Four programs."
        intro="EndoCyclic is a clinical-stage precision medicine company advancing a non-hormonal peptide platform across endometriosis therapeutics, diagnostics, and oncology."
        actions={
          <>
            <Button href="#data-room">Request data-room access</Button>
            <Button href="/pipeline" variant="ghost">Review the pipeline</Button>
          </>
        }
        proof="ENDO-205 · FDA IND Allowance (2026) · Phase 1"
        caption="Conceptual representation. The precision peptide platform spans therapeutics, diagnostics, and oncology."
        tone="tint-warm"
        layout="reverse"
        frame="soft"
        visualAspect="landscape"
        visualClassName="bg-petal"
        titleClassName="max-w-[19ch] !text-[clamp(2.25rem,4.5vw,3.8rem)]"
      >
        <Image
          src="/illustrations/investor-platform-v2.avif"
          alt="Conceptual illustration of one precision peptide platform branching toward therapeutic, diagnostic, and oncology applications."
          fill
          priority
          sizes="(min-width: 1184px) 544px, (min-width: 1024px) 46vw, 94vw"
          className="object-contain"
        />
      </PageHero>
      <DiligenceIndex />
      <RegulatoryChronology />
      <PlatformLedger />
      <ValidationDossier />
      <DataRoom />
    </main>
  );
}
