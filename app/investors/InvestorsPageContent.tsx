import Link from "next/link";
import Image from "next/image";
import { Download, Lock } from "lucide-react";
import Button from "@/components/site/Button";
import Container from "@/components/site/Container";
import EvidenceNote from "@/components/site/EvidenceNote";
import Eyebrow from "@/components/site/Eyebrow";
import InvestorRegulatoryPath from "@/components/figures/InvestorRegulatoryPath";
import NIHRecognitionPanel from "@/components/site/NIHRecognitionPanel";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import Section from "@/components/site/Section";
import { EVIDENCE_LINKS, INVESTOR_VALIDATION } from "@/lib/site";
import InvestorRequestForm from "./InvestorRequestForm";

const DILIGENCE_PATH = [
  { index: "01", label: "Regulatory path", href: "#regulatory" },
  { index: "02", label: "Platform & programs", href: "#platform" },
  { index: "03", label: "Evidence & recognition", href: "#validation" },
  { index: "04", label: "Controlled access", href: "#data-room" },
] as const;

const REGULATORY_PATH = [
  {
    index: "01",
    status: "Pre-clinical",
    statusClass: "text-gold-ink",
    nodeClass: "bg-gold",
    label: "Preclinical evidence",
    title: "Lesion and inflammation findings",
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
    label: "Parallel regulatory activity",
    title: "Fast Track",
    text: "Fast Track filing is underway.",
    parallel: true,
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
    stage: "Pre-clinical",
    href: "/pipeline#endo-995",
  },
  {
    name: "ENDO-311",
    type: "Diagnostic · Solid tumors",
    stage: "Pre-clinical",
    href: "/pipeline#endo-311",
  },
] as const;

function DiligenceIndex() {
  return (
    <Section tone="paper" size="compact">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-4 lg:col-start-1 lg:row-start-1">
            <article
              aria-labelledby="investor-summary-title"
              className="grid grid-cols-[7rem_minmax(0,1fr)] items-end gap-5 sm:grid-cols-[9.5rem_1fr] sm:gap-6 lg:grid-cols-1 lg:items-start"
            >
              <div
                aria-hidden
                className="relative block aspect-[8.5/11] w-28 overflow-hidden border border-line bg-surface shadow-[0_18px_50px_rgb(57_38_56/0.12)] sm:w-[9.5rem]"
              >
                <Image
                  src="/downloads/endocyclic-investor-summary-cover-v2.avif"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 152px, (min-width: 640px) 152px, 112px"
                  className="object-cover object-top"
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-ink">
                  Public document
                </p>
                <h2
                  id="investor-summary-title"
                  className="t-h3 mt-2 text-ink"
                >
                  Investor summary
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  A concise overview of the platform, pipeline, and development milestones.
                </p>
                <a
                  href="/downloads/endocyclic-investor-summary-v2.pdf"
                  download
                  data-site-event="cta_investor_summary"
                  className="group mt-4 inline-flex min-h-11 flex-wrap items-center gap-x-2 gap-y-0.5 text-sm font-semibold text-teal-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-ink"
                >
                  <span>Download summary (PDF)</span>
                  <Download
                    aria-hidden
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-y-0.5 group-focus-visible:translate-y-0.5 motion-reduce:transition-none"
                  />
                  {" "}
                  <span className="basis-full text-xs font-normal text-muted">
                    3 pages · PDF
                  </span>
                </a>
              </div>
            </article>
          </div>

          <nav
            aria-label="Investor diligence sections"
            className="lg:col-span-7 lg:col-start-6 lg:row-start-1"
          >
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

function InvestmentThesis() {
  return (
    <Section tone="tint-plum" size="compact">
      <Container>
        <div className="grid gap-10 border-y border-line py-10 lg:grid-cols-12 lg:items-end lg:gap-16 lg:py-14">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Investment context</Eyebrow>
            <h2 className="mt-5 max-w-xl text-[clamp(2.15rem,4.8vw,4rem)] font-medium leading-[1.02] tracking-[-0.04em] text-ink">
              A large unmet need, with a clinical-stage lead.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
              Current therapies are largely hormone-based and symptomatic; they
              do not eliminate lesions or modify disease biology.
            </p>
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-6 lg:col-start-7">
            <dl className="border-t border-line">
              <div className="grid gap-2 border-b border-line py-6 sm:grid-cols-[10rem_1fr] sm:items-baseline">
                <dt className="text-[clamp(2.4rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.055em] text-ink">
                  $180–250B
                </dt>
                <dd className="text-sm leading-relaxed text-muted">
                  Global market potential for endometriosis treatments ·{" "}
                  <a
                    href={EVIDENCE_LINKS.mckinseyWomensHealth}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="prose-link font-medium text-teal-ink"
                  >
                    McKinsey estimate
                    <span className="sr-only">, opens in a new tab</span>
                  </a>
                </dd>
              </div>
              <div className="grid gap-2 border-b border-line py-6 sm:grid-cols-[10rem_1fr] sm:items-baseline">
                <dt className="text-[clamp(2rem,4vw,3.3rem)] font-medium leading-none tracking-[-0.045em] text-ink">
                  190M+
                </dt>
                <dd className="text-sm leading-relaxed text-muted">
                  Women affected by endometriosis worldwide ·{" "}
                  <a
                    href={EVIDENCE_LINKS.whoEndometriosis}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="prose-link font-medium text-teal-ink"
                  >
                    WHO
                    <span className="sr-only">, opens in a new tab</span>
                  </a>
                </dd>
              </div>
              <div className="grid gap-2 border-b border-line py-6 sm:grid-cols-[10rem_1fr] sm:items-baseline">
                <dt className="text-[clamp(1.7rem,3vw,2.5rem)] font-medium leading-none tracking-[-0.035em] text-ink">
                  4 programs
                </dt>
                <dd className="text-sm leading-relaxed text-muted">
                  Therapeutic and diagnostic programs across endometriosis and oncology
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function RegulatoryChronology() {
  return (
    <Section tone="tint-teal" size="chapter">
      <Container
        id="regulatory"
        role="region"
        tabIndex={-1}
        aria-labelledby="investor-regulatory-title"
        className="outline-none"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Regulatory path</Eyebrow>
            <h2
              id="investor-regulatory-title"
              className="t-h2 mt-5 max-w-2xl text-ink"
            >
              From preclinical evidence to FDA IND Allowance and Phase 1.
            </h2>
          </div>
          <p className="max-w-lg text-muted lg:col-span-4 lg:col-start-9">
            ENDO-205 is the clinical-stage lead within a four-program precision peptide pipeline.
          </p>
        </div>

        <InvestorRegulatoryPath items={REGULATORY_PATH} />
      </Container>
    </Section>
  );
}

function PlatformLedger() {
  return (
    <Section tone="paper" size="chapter">
      <Container
        id="platform"
        role="region"
        tabIndex={-1}
        aria-labelledby="investor-platform-title"
        className="outline-none"
      >
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>Platform & programs</Eyebrow>
              <h2 id="investor-platform-title" className="t-h2 mt-5 text-ink">
                One selective logic across four programs.
              </h2>
              <p className="mt-5 text-muted">
                The platform combines selective uptake by diseased tissue with pH-mediated
                activation across therapeutic and diagnostic programs in endometriosis and oncology.
              </p>
              <div className="mt-8 border-t border-line pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-ink">
                  Platform logic
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  selective uptake · pH-mediated activation · non-hormonal
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
                  <dt>
                    <span className="t-h3 block">
                      <Link
                        href={program.href}
                        prefetch={false}
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
                    </span>
                    <span className="mt-2 block text-sm text-muted">{program.type}</span>
                  </dt>
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
      <Container
        id="validation"
        role="region"
        tabIndex={-1}
        aria-labelledby="investor-validation-title"
        className="outline-none"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Validation record</Eyebrow>
            <h2
              id="investor-validation-title"
              className="t-h2 mt-5 text-ink"
            >
              Recognition and relationships around the platform.
            </h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {INVESTOR_VALIDATION.map((item) => (
                <li
                  key={item.title}
                  className="grid gap-3 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6"
                >
                  <div className="flex min-w-0 gap-4">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                    />
                    <div>
                      <p className="text-sm font-medium leading-relaxed text-ink">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                  <EvidenceNote
                    reference={item.reference}
                    flush
                    className="sm:justify-self-end sm:text-right"
                  />
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <NIHRecognitionPanel />
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
              NIH Commercialization Readiness Pilot grant recognition with a perfect overall impact score of 10.
            </p>
            <div className="mt-5">
              <Button href="/news" variant="quiet">
                Review company news and coverage
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function DataRoom({
  deliveryAvailable,
}: {
  deliveryAvailable: boolean;
}) {
  return (
    <Section tone="paper" size="chapter">
      <Container
        id="data-room"
        role="region"
        tabIndex={-1}
        aria-labelledby="investor-data-room-title"
        className="outline-none"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Controlled access</Eyebrow>
            <h2 id="investor-data-room-title" className="t-h2 mt-5 text-ink">
              {deliveryAvailable
                ? "Request the confidential data room."
                : "Contact investor relations about data-room access."}
            </h2>
            <p className="mt-5 text-muted">
              {deliveryAvailable
                ? "Share a few details and the appropriate person on our team will review your request for investor or strategic-partner access."
                : "Use the direct contact options to reach the EndoCyclic team about investor or strategic-partner access."}
            </p>
            <div className="mt-8 flex items-start gap-3 border-y border-line bg-tint-warm px-5 py-5">
              <Lock size={18} className="mt-0.5 shrink-0 text-rose-ink" aria-hidden />
              <p className="text-sm leading-relaxed text-muted">
                Data-room materials are handled through a reviewed request and are not
                distributed on the public site.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7 lg:col-start-6">
            <InvestorRequestForm deliveryAvailable={deliveryAvailable} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export default function InvestorsPageContent({
  deliveryAvailable = true,
}: {
  deliveryAvailable?: boolean;
} = {}) {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Investor relations"
        title="ENDO-205: FDA IND Allowance. Phase 1."
        intro="EndoCyclic is advancing a proprietary, non-hormonal precision peptide platform across four therapeutic and diagnostic programs in endometriosis and oncology."
        actions={
          <>
            <Button href="#data-room">
              {deliveryAvailable
                ? "Request data-room access"
                : "Investor contact options"}
            </Button>
            <Button href="/pipeline" variant="ghost">Review the pipeline</Button>
          </>
        }
        caption="Conceptual portfolio representation; not development-performance data."
        proof={
          <EvidenceNote
            flush
            reference={{
              basis: "company",
              label: "FDA IND Allowance announcement",
              href: EVIDENCE_LINKS.fdaAnnouncement,
            }}
          />
        }
        tone="tint-warm"
        layout="reverse"
        frame="soft"
        visualAspect="landscape"
        visualClassName="bg-petal"
        titleClassName="max-w-[19ch] !text-[clamp(2.25rem,4.5vw,3.8rem)]"
      >
        <Image
          src="/illustrations/investor-platform-v3.avif"
          alt="Conceptual illustration of one precision peptide platform branching toward therapeutic and diagnostic applications across endometriosis and oncology."
          fill
          priority
          fetchPriority="high"
          sizes="(min-width: 1184px) 544px, (min-width: 1024px) 46vw, 90vw"
          className="object-contain"
        />
      </PageHero>
      <DiligenceIndex />
      <InvestmentThesis />
      <RegulatoryChronology />
      <PlatformLedger />
      <ValidationDossier />
      <DataRoom deliveryAvailable={deliveryAvailable} />
    </main>
  );
}
