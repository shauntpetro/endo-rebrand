import Image from "next/image";
import { clsx } from "clsx";

export default function NIHRecognitionPanel({
  embedded = false,
  className,
}: {
  embedded?: boolean;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label="NIH Commercialization Readiness Pilot grant with a perfect overall impact score of 10."
      className={clsx(
        "relative overflow-hidden bg-surface",
        embedded
          ? "h-full min-h-0"
          : "min-h-[30rem] rounded-[2rem] border border-line editorial-shadow sm:aspect-[3/2] sm:min-h-[20rem]",
        className,
      )}
    >
      <div aria-hidden className="grid h-full grid-rows-[0.82fr_1.18fr] sm:grid-cols-[0.88fr_1.12fr] sm:grid-rows-none">
        <div className="relative flex flex-col items-center justify-center border-b border-line bg-tint-teal p-5 text-center sm:border-b-0 sm:border-r md:p-8">
          <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full border border-teal/20" />
          <Image
            src="/NIH_2013_logo_vertical.svg"
            alt=""
            width={374}
            height={329}
            sizes="128px"
            className="relative h-auto w-[clamp(4.75rem,12vw,8rem)]"
          />
          <p className="relative mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-teal-ink">
            NICHD
          </p>
        </div>

        <div className="relative flex min-w-0 flex-col justify-between overflow-hidden p-[clamp(1.25rem,4vw,2.75rem)]">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-peony/70" />
          <p className="relative text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-rose-ink">
            NIH recognition
          </p>
          <div className="relative mt-5">
            <p className="text-[clamp(4.25rem,10vw,7.5rem)] font-medium leading-[0.82] tracking-[-0.065em] text-ink">
              10
            </p>
            <p className="mt-4 border-t border-line pt-4 text-xs font-semibold uppercase leading-relaxed tracking-[0.08em] text-ink sm:text-sm sm:tracking-[0.1em]">
              Perfect overall impact score
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Commercialization Readiness Pilot grant
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
