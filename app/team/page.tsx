import Image from "next/image";
import Button from "@/components/site/Button";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import NextChapter from "@/components/site/NextChapter";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import Section from "@/components/site/Section";
import { TEAM, type Member } from "@/lib/site";

const [FOUNDER, ...DEVELOPMENT_TEAM] = TEAM;

const PORTRAIT_PLACEMENTS: Record<string, string> = {
  tanya:
    "col-span-3 col-start-1 row-span-1 row-start-1 sm:col-span-2 sm:row-span-3 sm:row-start-1",
  melanie:
    "col-span-1 col-start-1 row-start-2 sm:col-start-3 sm:row-start-1",
  david:
    "col-span-1 col-start-2 row-start-2 sm:col-start-4 sm:row-start-1",
  frank:
    "col-span-1 col-start-3 row-start-2 sm:col-start-3 sm:row-start-2",
  andrea:
    "col-span-1 col-start-1 row-start-3 sm:col-start-4 sm:row-start-2",
  aileen:
    "col-span-1 col-start-2 row-start-3 sm:col-start-3 sm:row-start-3",
  miganush:
    "col-span-1 col-start-3 row-start-3 sm:col-start-4 sm:row-start-3",
};

const PORTRAIT_TONES: Record<string, string> = {
  tanya: "bg-peony",
  melanie: "bg-tint-teal",
  david: "bg-tint-warm",
  frank: "bg-tint-plum",
  andrea: "bg-tint-plum",
  aileen: "bg-tint-warm",
  miganush: "bg-tint-teal",
};

const PORTRAIT_FOCAL_POINTS: Record<string, string> = {
  tanya: "object-[50%_12%]",
  melanie: "object-[50%_18%]",
  david: "object-[50%_15%]",
  frank: "object-[50%_22%]",
  andrea: "object-[50%_16%]",
  aileen: "object-[50%_18%]",
  miganush: "object-[50%_14%]",
};

const FOUNDER_PROOF = [
  {
    label: "Company role",
    value: "Founder & CEO",
    detail: "EndoCyclic Therapeutics, Inc.",
  },
  {
    label: "Platform",
    value: "Precision peptide",
    detail: "pH-mediated activation · Selective uptake",
  },
  {
    label: "Clinical transition",
    value: "Phase 1",
    detail: "ENDO-205 · FDA IND Allowance (2026)",
  },
  {
    label: "Portfolio reach",
    value: "Three paths",
    detail: "Therapeutics · Diagnostics · Oncology",
  },
  {
    label: "Women’s health network",
    value: "Founding member",
    detail: "Milken Institute Women’s Health Network",
  },
] as const;

const DEVELOPMENT_CHAPTERS = [
  {
    index: "01",
    verb: "Prepare",
    title: "Nonclinical toxicology · CMC · Regulatory affairs",
    memberIds: ["melanie", "david", "aileen"],
  },
  {
    index: "02",
    verb: "Evaluate",
    title: "Clinical affairs · Biostatistics",
    memberIds: ["andrea", "miganush"],
  },
  {
    index: "03",
    verb: "Steward",
    title: "Financial leadership",
    memberIds: ["frank"],
  },
] as const;

function getChapterMembers(memberIds: readonly string[]) {
  return memberIds.flatMap((memberId) => {
    const member = DEVELOPMENT_TEAM.find((candidate) => candidate.id === memberId);
    return member ? [member] : [];
  });
}

function TeamPortraitField() {
  return (
    <div
      role="img"
      aria-label="Portraits of Dr. Tanya Petrossian and the EndoCyclic development team."
      className="absolute inset-0 grid grid-cols-3 grid-rows-[2.2fr_1fr_1fr] gap-2 bg-tint-warm p-2 sm:grid-cols-4 sm:grid-rows-3 sm:gap-3 sm:p-3"
    >
      {TEAM.map((member, index) => (
        <div
          key={member.id}
          className={`relative min-h-0 overflow-hidden border border-line-soft ${
            member.id === "tanya"
              ? "rounded-bl-[2.75rem] rounded-tr-[5.5rem]"
              : "rounded-bl-2xl rounded-tr-[3rem]"
          } ${PORTRAIT_PLACEMENTS[member.id]} ${PORTRAIT_TONES[member.id]}`}
        >
          <Image
            src={member.image}
            alt=""
            fill
            priority={index === 0}
            sizes={
              member.id === "tanya"
                ? "(min-width: 1184px) 240px, (min-width: 640px) 23vw, 88vw"
                : "(min-width: 1184px) 100px, (min-width: 640px) 9vw, 30vw"
            }
            className={`object-cover saturate-[0.9] ${PORTRAIT_FOCAL_POINTS[member.id]}`}
          />
        </div>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <PageHero
      eyebrow="Development leadership"
      title="A team carrying precision peptide science into the clinic."
      titleClassName="max-w-[18ch]"
      intro="Founder and CEO Dr. Tanya Petrossian leads a team spanning nonclinical toxicology, CMC, clinical affairs, regulatory affairs, biostatistics, and finance."
      actions={
        <>
          <Button href="/pipeline">Review the pipeline</Button>
          <Button href="#development-team" variant="ghost">Meet the team</Button>
        </>
      }
      proof="ENDO-205 · FDA IND Allowance (2026) · Phase 1"
      caption="Founder and development team"
      tone="tint-plum"
      layout="evidence"
      frame="line"
      visualAspect="auto"
      visualClassName="min-h-[34rem] bg-tint-warm sm:min-h-[30rem]"
    >
      <TeamPortraitField />
    </PageHero>
  );
}

function FounderStory() {
  return (
    <Section tone="tint-warm" size="chapter" className="overflow-hidden">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-10 lg:gap-x-16">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow>Founder & CEO</Eyebrow>
              <h2 className="t-h2 mt-5 max-w-2xl text-ink">
                Dr. Tanya Petrossian, PhD
              </h2>
              <p className="t-lead mt-6 max-w-2xl">
                Leadership from platform science into Phase 1.
              </p>
            </Reveal>

            <Reveal delay={0.04}>
              <div className="mt-10 max-w-3xl border-y border-line py-7 sm:py-8">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="h-2 w-2 rounded-full bg-teal" />
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-ink">
                    Leadership brief
                  </p>
                </div>
                <p className="mt-6 text-[clamp(1.3rem,2.1vw,1.75rem)] font-medium leading-[1.3] tracking-[-0.02em] text-ink">
                  As Founder and CEO, she leads EndoCyclic Therapeutics, a
                  clinical-stage precision medicine company in Irvine,
                  California.
                </p>
                <p className="mt-5 max-w-2xl text-[0.98rem] leading-[1.75] text-muted">
                  The company&apos;s proprietary precision peptide platform spans
                  therapeutics, diagnostics, and oncology.
                  ENDO-205 received FDA IND Allowance in 2026 and is in Phase
                  1. EndoCyclic is a founding member of the Milken Institute
                  Women&apos;s Health Network.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="mt-8">
              <div className="flex flex-wrap gap-3">
                <Button
                  href="/contact?subject=partnership"
                >
                  Discuss a partnership
                </Button>
                <Button
                  href="/pipeline#endo-205"
                  variant="ghost"
                >
                  Explore ENDO-205
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.06} className="md:col-span-4 md:col-start-9">
            <figure className="mx-auto w-full max-w-[18rem] md:mx-0 md:max-w-none lg:max-w-[17rem]">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -bottom-3 -left-3 h-full w-full rounded-bl-[4rem] rounded-tr-[7rem] border border-rose/40"
                />
                <div className="relative aspect-[4/5] overflow-hidden rounded-bl-[4rem] rounded-tr-[7rem] border border-line bg-peony editorial-shadow">
                  <Image
                    src={FOUNDER.image}
                    alt={`Portrait of ${FOUNDER.name}`}
                    fill
                    sizes="(min-width: 1024px) 272px, (min-width: 768px) 26vw, 288px"
                    className={`object-cover saturate-[0.9] ${PORTRAIT_FOCAL_POINTS[FOUNDER.id]}`}
                  />
                </div>
                <span
                  aria-hidden
                  className="absolute -right-4 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-4 border-tint-warm bg-teal"
                />
              </div>
              <figcaption className="mt-6 border-t border-line pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-ink">
                  Founder & CEO
                </p>
                <h3 className="t-h3 mt-2 text-ink">
                  Dr. Tanya Petrossian, PhD
                </h3>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-16 md:mt-20">
          <div className="mb-5 flex items-center gap-4">
            <span aria-hidden className="chapter-thread-mark"><span /></span>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-ink">
              Founder continuity
            </p>
          </div>
          <dl className="grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {FOUNDER_PROOF.map((item, index) => (
              <div
                key={item.label}
                className="min-h-44 bg-tint-warm px-5 py-6 sm:px-6 sm:py-7"
              >
                <dt className="flex items-start justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-ink">
                    {item.label}
                  </span>
                  <span className="text-xs font-semibold tracking-[0.14em] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </dt>
                <dd className="mt-3">
                  <span className="block text-xl font-medium tracking-[-0.02em] text-ink">
                    {item.value}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-muted">
                    {item.detail}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </Section>
  );
}

function Portrait({ member }: { member: Member }) {
  return (
    <div className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-b-2xl rounded-t-[4.75rem] bg-peony sm:w-24 lg:w-20 xl:w-24">
      <Image
        src={member.image}
        alt={`Portrait of ${member.name}`}
        fill
        sizes="(min-width: 1280px) 96px, (min-width: 1024px) 80px, (min-width: 640px) 96px, 80px"
        className={`object-cover saturate-[0.88] ${PORTRAIT_FOCAL_POINTS[member.id]}`}
      />
    </div>
  );
}

function DevelopmentProfile({ member, index }: { member: Member; index: number }) {
  return (
    <Reveal as="li" delay={Math.min(index * 0.035, 0.1)} className="border-t border-line pt-6">
      <article>
        <div className="flex items-start gap-5">
          <Portrait member={member} />
          <div className="min-w-0 pt-1">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-ink">
              {member.role}
            </p>
            <h4 className="t-h3 mt-2 text-ink">{member.name}</h4>
          </div>
        </div>
        <p className="mt-6 text-[0.95rem] leading-relaxed text-muted">{member.bio}</p>
      </article>
    </Reveal>
  );
}

function DevelopmentLedger() {
  return (
    <Section
      tone="paper"
      size="chapter"
      id="development-team"
      className="scroll-mt-24 overflow-hidden"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow>Development team</Eyebrow>
            <h2 className="t-h2 mt-5 max-w-2xl text-ink">
              The work around the molecule.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-lg text-muted">
              Nonclinical toxicology, CMC, clinical affairs, regulatory affairs,
              biostatistics, and finance.
            </p>
          </div>
        </div>

        <div className="mt-16 border-b border-line md:mt-20">
          {DEVELOPMENT_CHAPTERS.map((chapter) => {
            const members = getChapterMembers(chapter.memberIds);
            const columns =
              members.length === 3
                ? "md:grid-cols-2 2xl:grid-cols-3"
                : members.length === 2
                  ? "md:grid-cols-2"
                  : "md:grid-cols-1";

            return (
              <section
                key={chapter.index}
                aria-labelledby={`development-chapter-${chapter.index}`}
                className="grid gap-9 border-t border-line py-12 lg:grid-cols-12 lg:gap-12 lg:py-16"
              >
                <header className="lg:col-span-3">
                  <div className="flex items-center gap-3">
                    <span aria-hidden className="chapter-thread-mark"><span /></span>
                    <span className="text-xs font-semibold tracking-[0.16em] text-rose-ink">
                      {chapter.index}
                    </span>
                  </div>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-teal-ink">
                    {chapter.verb}
                  </p>
                  <h3
                    id={`development-chapter-${chapter.index}`}
                    className="mt-3 max-w-xs text-xl font-medium leading-snug tracking-[-0.02em] text-ink"
                  >
                    {chapter.title}
                  </h3>
                </header>

                <ol className={`grid list-none gap-x-8 gap-y-10 lg:col-span-9 ${columns}`}>
                  {members.map((member, memberIndex) => (
                    <DevelopmentProfile
                      key={member.id}
                      member={member}
                      index={memberIndex}
                    />
                  ))}
                </ol>
              </section>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

export default function TeamPage() {
  return (
    <main id="main-content">
      <Hero />
      <FounderStory />
      <DevelopmentLedger />
      <NextChapter
        eyebrow="Partnership"
        title="Bring the development team into the diligence conversation."
        tone="teal"
        actions={
          <>
            <Button href="/contact?subject=partnership">Discuss a partnership</Button>
            <Button href="/pipeline" variant="ghost">Explore the pipeline</Button>
          </>
        }
      >
        Review the four-program portfolio or contact EndoCyclic directly to discuss strategic fit.
      </NextChapter>
    </main>
  );
}
