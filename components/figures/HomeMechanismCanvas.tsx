import Image from "next/image";
import {
  PLATFORM_MECHANISM_ALT,
  PLATFORM_MECHANISM_IMAGE,
  PLATFORM_MECHANISM_STEPS,
} from "@/lib/site";
import MobileMechanismFlow from "./MobileMechanismFlow";

const LABELS = [
  {
    ...PLATFORM_MECHANISM_STEPS[0],
    markerClassName: "bg-rose",
    inkClassName: "text-rose-ink",
  },
  {
    ...PLATFORM_MECHANISM_STEPS[1],
    markerClassName: "bg-teal",
    inkClassName: "text-teal-ink",
  },
  {
    ...PLATFORM_MECHANISM_STEPS[2],
    markerClassName: "bg-gold",
    inkClassName: "text-gold-ink",
  },
  {
    ...PLATFORM_MECHANISM_STEPS[3],
    markerClassName: "bg-plum",
    inkClassName: "text-rose-ink",
  },
] as const;

export default function HomeMechanismCanvas() {
  return (
    <figure data-home-mechanism>
      <div
        data-home-mechanism-desktop
        className="hidden overflow-hidden border-y border-line bg-surface md:block"
      >
        <div
          data-mechanism-image
          className="relative aspect-[2/1] overflow-hidden transform-gpu"
        >
          <Image
            src={PLATFORM_MECHANISM_IMAGE}
            alt={PLATFORM_MECHANISM_ALT}
            fill
            sizes="(min-width: 1184px) 1120px, 94vw"
            className="object-contain"
          />
        </div>

        <ol
          data-mechanism-rail
          aria-label="Four-part platform and ENDO-205 evidence sequence"
          className="grid list-none border-t border-line md:grid-cols-2 lg:grid-cols-4"
        >
          {LABELS.map((item) => (
            <li
              key={item.index}
              data-mechanism-label
              className="relative min-w-0 border-b border-line px-6 py-6 md:border-r md:[&:nth-child(even)]:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <span
                aria-hidden
                className={`absolute inset-x-0 top-0 h-0.5 ${item.markerClassName}`}
              />
              <p
                className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] ${item.inkClassName}`}
              >
                <span
                  aria-hidden
                  className={`h-1.5 w-1.5 rounded-full ${item.markerClassName}`}
                />
                {item.index} · {item.label}
              </p>
              <h3 className="mt-3 text-base font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="md:hidden">
        <MobileMechanismFlow embedded />
      </div>

      <figcaption className="mt-4 grid gap-2 text-sm leading-relaxed text-muted md:grid-cols-12">
        <span className="md:col-span-8">
          The illustration shows selective uptake, pH-mediated activation, and
          an intact peptide remaining visible within diseased tissue before a
          separate state shows the same lesion receding.
        </span>
        <span className="md:col-span-4 md:text-right md:text-xs">
          The final state represents the ENDO-205 preclinical lesion-elimination
          finding; not clinical outcome data or restored-tissue histology.
        </span>
      </figcaption>
    </figure>
  );
}
