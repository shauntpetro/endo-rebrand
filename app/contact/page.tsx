import { Suspense } from "react";
import Image from "next/image";
import { Mail, Linkedin, MapPin } from "lucide-react";
import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import Button from "@/components/site/Button";
import Eyebrow from "@/components/site/Eyebrow";
import Reveal from "@/components/site/Reveal";
import PageHero from "@/components/site/PageHero";
import ContactForm from "./ContactForm";
import { CONTACT_SUBJECTS, SITE } from "@/lib/site";

/* -------------------------------------------------------------- Direct lines */
function DirectLines() {
  return (
    <aside className="bg-tint-warm p-7 lg:sticky lg:top-28 lg:p-9" aria-labelledby="direct-lines-title">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-ink">Direct lines</p>
      <h2 id="direct-lines-title" className="t-h3 mt-3 text-ink">
        EndoCyclic Therapeutics
      </h2>

      <ul className="mt-7 divide-y divide-line border-y border-line">
        <li className="flex items-center gap-3">
          <Mail size={17} className="mt-0.5 shrink-0 text-teal-ink" aria-hidden />
          <a href={`mailto:${SITE.email}`} className="link-underline inline-flex min-h-13 items-center text-sm font-medium text-ink">
            {SITE.email}
          </a>
        </li>
        <li className="flex items-center gap-3">
          <Linkedin size={17} className="mt-0.5 shrink-0 text-teal-ink" aria-hidden />
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex min-h-13 items-center text-sm font-medium text-ink"
          >
            LinkedIn
            <span className="sr-only"> Opens in a new tab.</span>
          </a>
        </li>
        <li className="flex items-start gap-3 py-4">
          <MapPin size={17} className="mt-0.5 shrink-0 text-teal-ink" aria-hidden />
          <span className="text-sm text-muted">{SITE.location}</span>
        </li>
      </ul>

      <nav aria-label="Related resources" className="mt-8 border-t border-line pt-4">
        <ul className="list-none divide-y divide-line">
          <li>
            <Button href="/investors" variant="quiet" className="min-h-11">
              Investor relations
            </Button>
          </li>
          <li>
            <Button href="/media" variant="quiet" className="min-h-11">
              Media kit
            </Button>
          </li>
          <li>
            <Button href="/pipeline" variant="quiet" className="min-h-11">
              View the pipeline
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

function RoutingVisual() {
  return (
    <div id="inquiry-routes" className="relative scroll-mt-24 overflow-hidden bg-plum px-5 py-8 text-on-dark sm:px-9 sm:py-10 lg:px-11 lg:py-12">
      <div aria-hidden className="absolute -left-20 -top-28 h-72 w-72 rounded-full border border-line-on-dark" />
      <div aria-hidden className="absolute -bottom-24 right-[18%] h-56 w-56 rounded-full bg-rose/10" />

      <div className="relative grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-on-dark">
            Inquiry routing
          </p>
          <div className="relative mt-5 flex min-h-16 max-w-[17rem] items-center border-y border-line-on-dark px-1 sm:mt-7 sm:min-h-24">
            <Image
              src="/logo.avif"
              alt=""
              width={233}
              height={70}
              sizes="176px"
              className="h-auto w-36 brightness-0 invert sm:w-44"
            />
            <span
              aria-hidden
              className="absolute left-full top-1/2 hidden h-px w-[min(12vw,8rem)] -translate-y-1/2 bg-gradient-to-r from-gold via-rose to-teal lg:block"
            />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-on-dark sm:mt-6">
            Choose the closest route. Every inquiry reaches the EndoCyclic team through the
            same inquiry form.
          </p>
        </div>

        <ol className="grid list-none grid-cols-2 gap-x-4 sm:gap-x-7">
          {CONTACT_SUBJECTS.map((option, index) => (
            <li key={option.value} className="border-t border-line-on-dark last:col-span-2">
              <a
                href={`/contact?subject=${option.value}#contact-form`}
                className="group flex min-h-12 items-center justify-between gap-2 py-2.5 text-sm font-medium text-on-dark sm:min-h-14 sm:gap-4 sm:py-3"
              >
                <span className="flex items-center gap-2 sm:gap-3">
                  <span className="text-[0.65rem] font-semibold tracking-[0.14em] text-teal-on-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {option.label}
                </span>
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold opacity-45 transition-opacity group-hover:opacity-100" />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- Page */
export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Contact"
        title="Start with the right conversation."
        intro="Partnership, investor, media, data-room, career, and general inquiries all begin here."
        actions={
          <Button href="#inquiry-routes" variant="primary">
            Choose an inquiry type
          </Button>
        }
        proof={`${SITE.location} · ${SITE.email}`}
        tone="tint-warm"
        layout="stacked"
        frame="bleed"
        visualAspect="auto"
        visualClassName="bg-plum"
        visualAs="nav"
        visualLabel="Inquiry routes"
      >
        <RoutingVisual />
      </PageHero>

      <Section tone="paper" size="chapter" className="relative">
        <div aria-hidden className="absolute left-1/2 top-0 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-rose via-gold to-transparent" />
        <Container id="contact-form" className="scroll-mt-24">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow>Your inquiry</Eyebrow>
              <h2 className="t-h2 mt-5 max-w-2xl text-ink">
                Share the context for your conversation.
              </h2>
            </div>
            <p className="max-w-lg text-muted md:col-span-4 md:col-start-9">
              Your inquiry route helps the EndoCyclic team direct your message. You can also
              contact the company directly by email or LinkedIn.
            </p>
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-start">
            <Reveal className="lg:col-span-7">
              <Suspense fallback={<div aria-hidden className="min-h-[32rem] border-t border-line" />}>
                <ContactForm />
              </Suspense>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
              <DirectLines />
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
