import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import Button from "@/components/site/Button";
import Reveal from "@/components/site/Reveal";
import CountUp from "@/components/site/CountUp";
import { BURDEN_STATS } from "@/lib/site";

/* -------------------------------------------------------------------- Hero */
function Hero() {
  return (
    <Section tone="paper" rhythm={false} className="relative overflow-hidden pt-32 md:pt-40">
      <div aria-hidden className="pointer-events-none absolute right-[-6rem] top-24 h-72 w-72 rounded-full bg-tint-teal blur-2xl md:right-[-2rem]" />
      <div aria-hidden className="pointer-events-none absolute right-24 top-52 h-40 w-40 rounded-full bg-tint-plum blur-2xl" />
      <Container className="relative pb-16 md:pb-24">
        <div className="max-w-3xl reveal">
          <Eyebrow>Impact</Eyebrow>
          <h1 className="t-hero mt-6 text-ink">
            The most common disease you’ve never been taught to see.
          </h1>
          <p className="t-lead mt-6 max-w-2xl">
            Endometriosis affects roughly 1 in 10 women of reproductive age — yet it
            takes an average of eight years to diagnose, and today’s therapies only
            manage symptoms. We’re working to change what that means.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/contact?subject=partnership" variant="primary">Partner with us</Button>
            <Button href="/news" variant="ghost">Read the latest news</Button>
          </div>
        </div>
        <div className="mt-16 h-px w-full bg-line md:mt-24" />
      </Container>
    </Section>
  );
}

/* ---------------------------------------------------------------- The burden */
function Burden() {
  return (
    <Section tone="paper">
      <Container>
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <Eyebrow>The burden</Eyebrow>
            <h2 className="t-h2 mt-4 text-ink">
              A chronic disease, hidden in plain sight.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="self-end md:col-span-6 md:col-start-7">
            <p className="t-body text-muted">
              Endometriosis is a chronic disease in which endometrial-like tissue grows
              outside the uterus — a leading cause of infertility and chronic pelvic
              pain. It is associated with comorbidities including cardiovascular disease,
              an increased risk of certain cancers, and other inflammatory conditions.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {BURDEN_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="border-t border-line pt-5">
              <div className="t-stat">
                <CountUp value={s.value} prefix={"prefix" in s ? s.prefix : ""} suffix={"suffix" in s ? s.suffix : ""} />
              </div>
              <p className="mt-3 text-sm font-medium text-ink">{s.label}</p>
              <p className="mt-1.5 text-sm text-muted">{s.detail}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-2xl text-sm text-muted">
            That eight-year diagnostic delay is one of the widest in medicine — years of
            pain, missed work, and uncertainty before a name is put to the disease. Even
            then, current therapies are largely hormone-based and symptomatic, and do not
            modify the underlying disease.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/* --------------------------------------------------------------- The mission */
function Mission() {
  const points = [
    {
      k: "Modify disease, not mask it",
      v: "Our lead therapeutic is designed to eliminate lesions and change the course of the disease — rather than manage symptoms and return.",
    },
    {
      k: "Non-hormonal by design",
      v: "A precision peptide approach that works without hormones — engineered to act where disease lives and leave healthy tissue untouched.",
    },
    {
      k: "Designed to protect what matters",
      v: "Developed as a short-course therapy designed to preserve fertility and avoid systemic toxicity, hormones, and surgery.",
    },
  ];
  return (
    <Section tone="tint-teal">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>The mission</Eyebrow>
            <h2 className="t-h2 mt-4 text-ink">
              Treat the disease at its source.
            </h2>
            <p className="t-lead mt-5">
              EndoCyclic exists to give women more than symptom management — a therapy
              built to eliminate lesions and modify disease biology.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {points.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.08}>
              <div className="text-sm font-medium text-teal-ink">{`0${i + 1}`}</div>
              <h3 className="t-h3 mt-3 text-ink">{p.k}</h3>
              <p className="mt-2 text-sm text-muted">{p.v}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-2xl text-sm text-muted">
            As a founding member of the Milken Institute’s Women’s Health Network,
            EndoCyclic is helping build the collaboration and investment that women’s
            health has long been denied.
          </p>
        </Reveal>
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
            <Eyebrow tone="dark">Get involved</Eyebrow>
            <h2 className="t-h2 mt-4 text-on-dark">Let’s change what a diagnosis can mean.</h2>
            <p className="mt-5 max-w-xl text-muted-on-dark">
              For partnership, investment, or media — the right person on our team will
              follow up. Or follow the science as it moves forward.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/contact?subject=partnership" variant="ghost-on-dark">Partner with us</Button>
              <Button href="/news" variant="ghost-on-dark">Read the latest news</Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export default function ImpactPage() {
  return (
    <main id="main-content">
      <Hero />
      <Burden />
      <Mission />
      <Closing />
    </main>
  );
}
