import Image from "next/image";
import EvidenceNote from "@/components/site/EvidenceNote";
import { EVIDENCE_LINKS, MILESTONES, NEWS, PARTNERS } from "@/lib/site";

export default function HomeEvidenceDossier() {
  const nihAnnouncement = NEWS.find((article) => article.id === 1);
  const fastTrack = MILESTONES.find(
    (item) => item.title === "Fast Track filing underway",
  );
  const secondary = MILESTONES.filter(
    (item) =>
      ![
        "FDA IND Allowance",
        "NIH perfect “10” score",
        "Fast Track filing underway",
      ].includes(item.title),
  ).map((item) => {
    if (item.title === "Multiple NICHD awards") {
      return {
        ...item,
        reference: {
          basis: "company" as const,
          label: "NICHD awards announcement",
          href: EVIDENCE_LINKS.fdaAnnouncement,
        },
      };
    }

    if (item.title === "NIH SBIR Success Story") {
      return {
        ...item,
        reference: {
          basis: "institutional" as const,
          label: "NIH portfolio company profile",
          href: EVIDENCE_LINKS.nihPortfolio,
        },
      };
    }

    return item;
  });
  const supportingRecordCount = secondary.length + PARTNERS.length;
  const supportingEvidence = (
    <>
      <ul className="grid list-none gap-x-8 border-t border-line md:col-span-7 md:grid-cols-2 md:border-t-0 md:pr-12">
        {secondary.map((item) => (
          <li key={item.title} className="border-b border-line py-5 last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0">
            <p className="font-medium text-ink">{item.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{item.detail}</p>
            <EvidenceNote reference={item.reference} />
          </li>
        ))}
      </ul>

      <div className="border-t border-line py-8 md:col-span-5 md:border-l md:border-t-0 md:pl-12">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          Institutional relationships
        </p>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {PARTNERS.map((partner) => (
            <li
              key={partner.name}
              className="grid min-h-20 grid-cols-[5.5rem_1fr] items-center gap-4 py-3"
            >
              <div className="relative h-10">
                <Image
                  src={partner.src}
                  alt=""
                  fill
                  sizes="88px"
                  className="object-contain object-left"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-ink">{partner.name}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">
                  {partner.relationship}
                </p>
                <EvidenceNote reference={partner.reference} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <figure className="border-y border-line">
      <div className="grid md:grid-cols-12">
        <div className="py-9 md:col-span-5 md:pr-12 md:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-ink">
            Regulatory path
          </p>
          <h3 className="mt-8 max-w-sm text-[clamp(2.4rem,5vw,4.25rem)] font-medium leading-[0.96] tracking-[-0.045em] text-ink">
            Fast Track filing underway.
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            Advancing regulatory designation for the lead program.
          </p>
          {fastTrack && <EvidenceNote reference={fastTrack.reference} />}
        </div>

        <div className="border-t border-line py-9 md:col-span-7 md:border-l md:border-t-0 md:py-12 md:pl-12">
          <div className="grid grid-cols-[4.5rem_1fr] items-center gap-5 sm:grid-cols-[7rem_1fr] sm:gap-7">
            <Image
              src="/NIH_2013_logo_vertical.svg"
              alt="National Institutes of Health"
              width={374}
              height={329}
              sizes="112px"
              className="h-auto w-full"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-ink">
                NIH recognition
              </p>
              <div className="mt-3 flex items-end gap-4">
                <span className="text-[clamp(3.5rem,8vw,6.5rem)] font-medium leading-[0.82] tracking-[-0.06em] text-ink">
                  10
                </span>
                <span className="mb-1 max-w-52 text-sm font-medium leading-snug text-ink">
                  Perfect overall impact score
                </span>
              </div>
              <p className="mt-3 text-sm text-muted">Commercialization Readiness Pilot grant.</p>
              {nihAnnouncement && (
                <a
                  href={nihAnnouncement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-3 inline-flex min-h-11 items-center text-sm font-medium text-teal-ink"
                >
                  Review the company grant announcement
                  <span aria-hidden className="ml-1">↗</span>
                  <span className="sr-only">, opens in a new tab</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <details
        data-home-evidence-mobile
        className="group border-t border-line md:hidden"
      >
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-3 text-sm font-medium text-ink marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-ink [&::-webkit-details-marker]:hidden">
          <span>
            Additional validation &amp; institutional relationships
            <span className="ml-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              {supportingRecordCount} records
            </span>
          </span>
          <span
            aria-hidden
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-lg text-teal-ink transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
          >
            +
          </span>
        </summary>

        <div className="hidden group-open:grid">{supportingEvidence}</div>
      </details>

      <section
        data-home-evidence-desktop
        aria-labelledby="home-evidence-supporting-title"
        className="hidden border-t border-line md:grid md:grid-cols-12"
      >
        <h3 id="home-evidence-supporting-title" className="sr-only">
          Additional validation &amp; institutional relationships
        </h3>
        {supportingEvidence}
      </section>

      <figcaption className="border-t border-line py-4 text-xs leading-relaxed text-muted">
        Source labels distinguish institutional records from company-reported
        milestones. Logos identify named relationships and records; they do not
        imply endorsement.
      </figcaption>
    </figure>
  );
}
