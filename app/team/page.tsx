import Image from "next/image";
import Button from "@/components/site/Button";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import NextChapter from "@/components/site/NextChapter";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import Section from "@/components/site/Section";
import {
  EVIDENCE_LINKS,
  LEADERSHIP_TEAM,
  type Member,
  NEWS,
  PARTNERSHIP_CONTACT_HREF,
  TEAM,
} from "@/lib/site";

const FOUNDER = TEAM[0];
const ARCHIVAL_FOUNDER_PROFILE = NEWS.find((article) => article.id === 8);

/* Crops each authentic portrait to the subject rather than the frame centre. */
const PORTRAIT_FOCAL_POINTS: Record<string, string> = {
  melanie: "object-[50%_18%]",
  david: "object-[50%_15%]",
  andrea: "object-[50%_16%]",
  aileen: "object-[50%_18%]",
  miganush: "object-[50%_14%]",
};

const LEADERSHIP_BRIEF = [
  {
    label: "Role",
    value: "Founder & CEO",
  },
  {
    label: "Company",
    value: "EndoCyclic Therapeutics, Inc.",
  },
  {
    label: "Base",
    value: "Irvine, California",
  },
  {
    label: "Platform",
    value: "Precision peptides · pH-mediated activation · selective uptake",
  },
  {
    label: "Portfolio",
    value: "Therapeutics · diagnostics · endometriosis · oncology",
  },
  {
    label: "Clinical entry",
    value: "ENDO-205 · Phase 1 · FDA IND Allowance (2026)",
  },
] as const;

const DILIGENCE_RECORD = [
  {
    category: "Archival institutional profile",
    title: "Founder context",
    detail:
      "UCLA profiles Dr. Tanya Petrossian and the founding of EndoCyclic Therapeutics.",
    source: "Read the 2017 UCLA founder profile",
    href: ARCHIVAL_FOUNDER_PROFILE?.link,
    marker: "bg-rose",
  },
  {
    category: "Institutional record",
    title: "Women’s-health network",
    detail:
      "EndoCyclic is a founding member of the Milken Institute Women’s Health Network.",
    source: "Review the Milken Institute record",
    href: EVIDENCE_LINKS.milkenNetworkRecord,
    marker: "bg-gold",
  },
  {
    category: "Company announcement",
    title: "NIH grant recognition",
    detail:
      "A perfect overall impact score of 10 on an NIH Commercialization Readiness Pilot grant.",
    source: "Review the NIH grant announcement",
    href: EVIDENCE_LINKS.nihGrantAnnouncement,
    marker: "bg-rose",
  },
  {
    category: "Company announcement",
    title: "Clinical entry",
    detail:
      "ENDO-205 received FDA IND Allowance in 2026 and is in Phase 1.",
    source: "Review the FDA IND announcement",
    href: EVIDENCE_LINKS.fdaAnnouncement,
    marker: "bg-teal",
  },
] as const;

function FounderPortraitField() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-paper via-petal to-tint-plum">
      <div
        aria-hidden
        className="absolute -left-16 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full border border-rose/25"
      />
      <div
        aria-hidden
        className="absolute left-[18%] top-[18%] h-px w-[34%] bg-gradient-to-r from-rose via-gold to-teal"
      />

      <div className="absolute inset-y-0 right-0 w-[78%] overflow-hidden rounded-tl-[7rem] border-l border-line bg-peony/55 shadow-[-18px_0_50px_rgb(57_38_56/0.08)] sm:w-[42%] sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent sm:shadow-none lg:w-[62%]">
        <Image
          src={FOUNDER.image}
          alt={`Portrait of ${FOUNDER.name}`}
          fill
          priority
          fetchPriority="high"
          sizes="(min-width: 1024px) 290px, (min-width: 640px) 42vw, 78vw"
          className="object-cover object-top saturate-[0.9] sm:object-contain sm:object-bottom"
        />
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-petal/85 to-transparent sm:w-24"
        />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <PageHero
      eyebrow="Founder & CEO"
      title="Dr. Tanya Petrossian, PhD"
      intro="Founder and CEO of EndoCyclic Therapeutics, a clinical-stage precision medicine company advancing a proprietary peptide platform across endometriosis and oncology."
      actions={
        <>
          <Button href={PARTNERSHIP_CONTACT_HREF}>
            Discuss a partnership
          </Button>
          <Button href="#tanya-petrossian" variant="ghost">
            Review the leadership brief
          </Button>
        </>
      }
      proof="Irvine, California · Clinical-stage"
      caption="Dr. Tanya Petrossian, PhD · Founder & CEO"
      tone="tint-plum"
      layout="evidence"
      frame="line"
      visualAspect="content"
      visualClassName="h-[21rem] bg-tint-warm sm:h-[22rem] lg:h-[23rem]"
    >
      <FounderPortraitField />
    </PageHero>
  );
}

function FounderDossier() {
  return (
    <Section tone="tint-warm" size="chapter" className="overflow-hidden">
      <Container
        id="tanya-petrossian"
        tabIndex={-1}
        role="region"
        aria-labelledby="founder-dossier-title"
        className="outline-none"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Leadership brief</Eyebrow>
            <h2
              id="founder-dossier-title"
              className="t-h2 mt-5 max-w-2xl text-ink"
            >
              From platform science to clinical entry.
            </h2>
            <p className="t-body mt-7 max-w-xl text-muted">
              Dr. Tanya Petrossian leads EndoCyclic as it advances a
              proprietary precision peptide platform across therapeutic and
              diagnostic programs in endometriosis and oncology.
            </p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
              The lead therapeutic, ENDO-205, received FDA IND Allowance in
              2026 and is in Phase 1.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              <Button href="/pipeline#endo-205">
                Explore ENDO-205
              </Button>
              {ARCHIVAL_FOUNDER_PROFILE?.link && (
                <Button
                  href={ARCHIVAL_FOUNDER_PROFILE.link}
                  variant="quiet"
                  external
                >
                  Read the archival UCLA founder profile
                </Button>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-6 lg:col-start-7">
            <dl className="border-y border-line">
              {LEADERSHIP_BRIEF.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-2 border-b border-line py-5 last:border-b-0 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.13em] text-rose-ink">
                    {item.label}
                  </dt>
                  <dd className="text-sm font-medium leading-relaxed text-ink">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function LeadershipProfile({
  member,
  index,
}: {
  member: Member;
  index: number;
}) {
  return (
    <Reveal
      as="li"
      delay={Math.min(index * 0.035, 0.1)}
      className="border-t border-line pt-7"
    >
      <article>
        <div className="flex items-start gap-5">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-line bg-tint-warm sm:h-24 sm:w-24">
            <Image
              src={member.image}
              alt={`Portrait of ${member.name}`}
              fill
              loading="lazy"
              sizes="(min-width: 640px) 96px, 80px"
              className={`object-cover saturate-[0.9] ${PORTRAIT_FOCAL_POINTS[member.id] ?? "object-center"}`}
            />
          </div>
          <div className="min-w-0 pt-1">
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-teal-ink [overflow-wrap:anywhere]">
              {member.role}
            </p>
            <h3 className="t-h3 mt-2 text-ink [overflow-wrap:anywhere]">
              {member.name}
            </h3>
          </div>
        </div>
        <p className="mt-6 text-[0.95rem] leading-relaxed text-muted">
          {member.bio}
        </p>
      </article>
    </Reveal>
  );
}

function LeadershipTeam() {
  return (
    <Section tone="paper" size="chapter" className="overflow-hidden">
      <Container
        id="leadership-team"
        tabIndex={-1}
        role="region"
        aria-labelledby="leadership-team-title"
        className="scroll-mt-24 outline-none"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Functional leads</Eyebrow>
            <h2
              id="leadership-team-title"
              className="t-h2 mt-5 max-w-2xl text-ink"
            >
              The work around the molecule.
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-lg text-muted">
              Nonclinical toxicology, CMC, clinical affairs, regulatory
              affairs, and biostatistics.
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 grid list-none gap-x-10 gap-y-12 border-b border-line pb-12 md:mt-16 md:grid-cols-2">
          {LEADERSHIP_TEAM.map((member, index) => (
            <LeadershipProfile
              key={member.id}
              member={member}
              index={index}
            />
          ))}
        </ol>
      </Container>
    </Section>
  );
}

function DiligenceRecord() {
  return (
    <Section
      tone="paper"
      size="chapter"
      className="overflow-clip"
    >
      <Container>
        <div
          id="leadership-record"
          tabIndex={-1}
          role="region"
          aria-labelledby="diligence-record-title"
          className="grid gap-12 outline-none lg:grid-cols-12 lg:gap-16"
        >
          <Reveal className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <div>
              <Eyebrow>Leadership and company record</Eyebrow>
              <h2
                id="diligence-record-title"
                className="t-h2 mt-5 max-w-md text-ink"
              >
                A documented path into the clinic.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                Founder context, institutional participation, grant
                recognition, and clinical entry—each linked to its available
                source record.
              </p>
              <div
                aria-hidden
                className="mt-10 hidden items-center gap-3 lg:flex"
              >
                <span className="h-2 w-2 rounded-full bg-rose" />
                <span className="h-px flex-1 bg-gradient-to-r from-rose via-gold to-teal" />
                <span className="h-2 w-2 rounded-full border border-teal" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-7 lg:col-start-6">
            <div className="overflow-hidden border-y border-line">
              <ul className="list-none">
                {DILIGENCE_RECORD.map((item) => (
                  <li
                    key={item.title}
                    className="grid gap-5 border-b border-line py-7 last:border-b-0 sm:grid-cols-[1.25rem_minmax(0,1fr)] sm:gap-6 sm:py-8"
                  >
                    <span
                      aria-hidden
                      className={`mt-1.5 h-2.5 w-2.5 rounded-full ${item.marker}`}
                    />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-ink">
                        {item.category}
                      </p>
                      <h3 className="t-h3 mt-2 text-ink">{item.title}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                        {item.detail}
                      </p>
                      {item.href && (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`${item.source}, opens in a new tab`}
                          className="link-underline mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-teal-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-ink"
                        >
                          {item.source}
                          <span aria-hidden className="ml-1.5">
                            ↗
                          </span>
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export default function TeamPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <FounderDossier />
      <LeadershipTeam />
      <DiligenceRecord />
      <NextChapter
        eyebrow="Strategic conversations"
        title="Discuss the platform, pipeline, or partnership fit."
        tone="teal"
        actions={
          <>
            <Button href={PARTNERSHIP_CONTACT_HREF}>
              Discuss a partnership
            </Button>
            <Button href="/pipeline" variant="ghost">
              Explore the pipeline
            </Button>
          </>
        }
      >
        Review the four-program portfolio or contact EndoCyclic directly.
      </NextChapter>
    </main>
  );
}
