import Image from "next/image";
import { MILESTONES, PARTNERS } from "@/lib/site";

export default function HomeEvidenceDossier() {
  const secondary = MILESTONES.filter(
    (item) => !["FDA IND Allowance", "NIH perfect “10” score"].includes(item.title),
  );

  return (
    <figure className="border-y border-line">
      <div className="grid md:grid-cols-12">
        <div className="py-9 md:col-span-5 md:pr-12 md:py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-ink md:text-[0.68rem] md:tracking-[0.16em]">
            Regulatory milestone
          </p>
          <div className="mt-8 flex items-end gap-5">
            <span className="text-[clamp(3.75rem,7vw,6rem)] font-medium leading-none tracking-[-0.055em] text-ink">
              2026
            </span>
            <span aria-hidden className="mb-2 h-2 w-2 rounded-full bg-gold" />
          </div>
          <h3 className="t-h3 mt-6 text-ink">FDA IND Allowance</h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            Achieved for lead therapeutic ENDO-205.
          </p>
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
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-rose-ink md:text-[0.68rem] md:tracking-[0.16em]">
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
            </div>
          </div>
        </div>
      </div>

      <div className="grid border-t border-line md:grid-cols-12">
        <ul className="grid list-none gap-x-8 md:col-span-7 md:grid-cols-2 md:pr-12">
          {secondary.map((item) => (
            <li key={item.title} className="border-b border-line py-5 last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0">
              <p className="font-medium text-ink">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>

        <div className="border-t border-line py-8 md:col-span-5 md:border-l md:border-t-0 md:pl-12">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted md:text-[0.68rem] md:tracking-[0.16em]">
            Institutional validation
          </p>
          <div className="mt-7 grid grid-cols-2 items-center gap-7 sm:grid-cols-3">
            {PARTNERS.map((partner) => (
              <div key={partner.name} className="relative h-12">
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  sizes="110px"
                  className="object-contain object-left"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="sr-only">
        EndoCyclic regulatory milestones, NIH recognition, and institutional validation.
      </figcaption>
    </figure>
  );
}
