import Image from "next/image";
import Link from "next/link";
import { Mail, Linkedin, MapPin } from "lucide-react";
import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import Reveal from "@/components/site/Reveal";
import PageHero from "@/components/site/PageHero";
import ContactForm from "./ContactForm";
import { resolveContactRoute } from "./contact-subject";
import { CONTACT_SUBJECTS, SITE } from "@/lib/site";

const ROUTING_OPTIONS = [
  ...CONTACT_SUBJECTS.slice(0, 3).map((option) => ({
    ...option,
    href: `/contact?subject=${option.value}#contact-form`,
  })),
  {
    value: "data",
    label: "Data room access",
    href: "/investors#data-room",
  },
  ...CONTACT_SUBJECTS.slice(3).map((option) => ({
    ...option,
    href: `/contact?subject=${option.value}#contact-form`,
  })),
] as const;

/* -------------------------------------------------------------- Direct lines */
function DirectLines() {
  return (
    <div
      role="group"
      className="bg-tint-warm p-7 lg:sticky lg:top-28 lg:p-9"
      aria-labelledby="direct-lines-title"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-ink">Direct lines</p>
      <h2 id="direct-lines-title" className="t-h3 mt-3 text-ink">
        EndoCyclic Therapeutics
      </h2>

      <ul className="mt-7 divide-y divide-line border-y border-line">
        {SITE.email ? (
          <li className="flex items-center gap-3">
            <Mail size={17} className="mt-0.5 shrink-0 text-teal-ink" aria-hidden />
            <a href={`mailto:${SITE.email}`} className="link-underline inline-flex min-h-13 min-w-0 items-center text-sm font-medium text-ink [overflow-wrap:anywhere]">
              {SITE.email}
            </a>
          </li>
        ) : null}
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
    </div>
  );
}

function RoutingVisual() {
  return (
    <div
      id="inquiry-routes"
      role="region"
      tabIndex={-1}
      aria-labelledby="inquiry-routes-title"
      data-tone="dark"
      className="relative overflow-hidden bg-plum px-5 py-8 text-on-dark outline-none sm:px-9 sm:py-10 lg:px-11 lg:py-12"
    >
      <div aria-hidden className="absolute -left-20 -top-28 h-72 w-72 rounded-full border border-line-on-dark" />
      <div aria-hidden className="absolute -bottom-24 right-[18%] h-56 w-56 rounded-full bg-rose/10" />

      <div className="relative grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-14">
        <div>
          <p
            id="inquiry-routes-title"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-on-dark"
          >
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
            Choose the closest route. Data-room requests continue through the
            investor diligence path; other inquiries use the contact form.
          </p>
        </div>

        <ul
          aria-label="Inquiry route choices"
          className="grid list-none grid-cols-2 gap-x-4 sm:gap-x-7"
        >
          {ROUTING_OPTIONS.map((option) => (
            <li key={option.value} className="border-t border-line-on-dark last:col-span-2">
              <Link
                href={option.href}
                prefetch={false}
                data-contact-route-link
                data-site-event={
                  option.value === "data"
                    ? "cta_data_room"
                    : option.value === "partnership"
                      ? "cta_partnership"
                      : undefined
                }
                className="group relative flex min-h-12 items-center justify-between gap-2 overflow-hidden py-2.5 text-sm font-medium text-on-dark sm:min-h-14 sm:gap-4 sm:py-3"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold via-rose to-teal transition-transform duration-500 ease-soft group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                />
                <span className="relative flex items-center gap-2 transition-transform duration-300 ease-soft group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none sm:gap-3">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 shrink-0 rounded-full border border-teal-on-dark"
                  />
                  {option.label}
                </span>
                <span
                  aria-hidden
                  className="relative h-1.5 w-1.5 shrink-0 rounded-full bg-gold opacity-45 transition-[opacity,transform] duration-300 group-hover:scale-125 group-hover:opacity-100 group-focus-visible:scale-125 group-focus-visible:opacity-100 motion-reduce:transform-none motion-reduce:transition-none"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- Page */
type ContactPageSearchParams = Record<
  string,
  string | string[] | undefined
>;

export default async function ContactPageContent({
  searchParams = Promise.resolve({}),
  deliveryAvailable = true,
}: {
  searchParams?: Promise<ContactPageSearchParams>;
  deliveryAvailable?: boolean;
} = {}) {
  const route = resolveContactRoute(await searchParams);

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Contact"
        title="Connect with EndoCyclic."
        intro="Choose the route for partnerships, investor relations, media, careers, or general inquiries. Confidential data-room requests use the investor page."
        proof={SITE.email ? `${SITE.location} · ${SITE.email}` : SITE.location}
        tone="tint-warm"
        layout="stacked"
        frame="bleed"
        visualAspect="content"
        visualClassName="bg-plum"
        titleMotion={false}
        visualAs="nav"
        visualLabel="Inquiry routes"
      >
        <RoutingVisual />
      </PageHero>

      <Section tone="paper" size="chapter" className="relative">
        <div aria-hidden className="absolute left-1/2 top-0 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-rose via-gold to-transparent" />
        <Container>
          <div
            id="contact-form"
            role="region"
            tabIndex={-1}
            aria-labelledby="contact-form-title"
            className="outline-none"
          >
            <div className="grid gap-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <Eyebrow>Your inquiry</Eyebrow>
                <h2
                  id="contact-form-title"
                  className="t-h2 mt-5 max-w-2xl text-ink"
                >
                  {deliveryAvailable
                    ? "Tell us what you need."
                    : "Use a direct contact channel."}
                </h2>
              </div>
              <p className="max-w-lg text-muted md:col-span-4 md:col-start-9">
                {deliveryAvailable ? (
                  <>
                    Your inquiry route helps the EndoCyclic team direct your message.
                    {SITE.email
                      ? " You can also contact the company directly by email or LinkedIn."
                      : " You can also connect with the company on LinkedIn."}
                  </>
                ) : SITE.email ? (
                  "Email the company directly or connect on LinkedIn."
                ) : (
                  "Connect with the company on LinkedIn."
                )}
              </p>
            </div>

            <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-start">
              <Reveal className="lg:col-span-7">
                <ContactForm
                  initialSubject={route.subject}
                  initialIntent={route.intent}
                  deliveryAvailable={deliveryAvailable}
                />
              </Reveal>
              <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
                <DirectLines />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
