import { PIPELINE } from "@/lib/site";

const PROGRAM_TONES = [
  "text-rose-ink",
  "text-gold-ink",
  "text-teal-ink",
  "text-ink",
] as const;

const PROGRAM_ENDPOINTS: ReadonlyArray<readonly [number, number, string]> = [
  [492, 145, "#c9798a"],
  [715, 145, "#d8b850"],
  [492, 455, "#43877d"],
  [715, 455, "#8b4b62"],
];

function PeptideRing({ className = "" }: { className?: string }) {
  const nodes = Array.from({ length: 10 }, (_, index) => {
    const angle = (index / 10) * Math.PI * 2 - Math.PI / 2;
    return {
      x: 50 + Math.cos(angle) * 33,
      y: 50 + Math.sin(angle) * 33,
    };
  });

  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      <circle cx="50" cy="50" r="33" fill="none" stroke="#43877d" strokeWidth="2" />
      {nodes.map((node, index) => (
        <circle
          key={index}
          cx={node.x}
          cy={node.y}
          r="6"
          fill="#fff8f4"
          stroke="#27675e"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

export default function ProgramThreadMap() {
  return (
    <figure>
      <div className="editorial-shadow relative overflow-hidden rounded-[2rem] border border-line bg-tint-warm">
        <svg
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
        >
          <path d="M255 300 C360 300 365 145 492 145" fill="none" stroke="#c9798a" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d="M255 300 C375 300 390 205 715 145" fill="none" stroke="#d8b850" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d="M255 300 C360 300 365 455 492 455" fill="none" stroke="#43877d" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d="M255 300 C375 300 390 395 715 455" fill="none" stroke="#8b4b62" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          {PROGRAM_ENDPOINTS.map(([cx, cy, fill]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" fill={fill} />
          ))}
        </svg>

        <div className="relative hidden min-h-[34rem] grid-cols-12 items-center gap-8 p-8 md:grid lg:p-10">
          <div className="col-span-4 flex flex-col items-center text-center">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-surface shadow-[0_18px_50px_rgba(57,38,56,0.08)]">
              <PeptideRing className="h-28 w-28" />
              <span aria-hidden className="absolute -right-2 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-rose" />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-rose-ink">
              One selective thread
            </p>
            <p className="mt-2 max-w-52 text-sm leading-relaxed text-muted">
              A shared precision peptide platform across four programs.
            </p>
          </div>

          <ol aria-label="EndoCyclic precision programs" className="col-span-7 col-start-6 grid grid-cols-2 gap-x-8 gap-y-12">
            {PIPELINE.map((program, index) => (
              <li key={program.id} className="relative border-t border-line bg-tint-warm/95 pt-5">
                <span className={`text-xs font-semibold tracking-[0.16em] ${PROGRAM_TONES[index]}`}>
                  0{index + 1}
                </span>
                <h3 className="t-h3 mt-4 text-ink">{program.name}</h3>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-teal-ink">
                  {program.modality} · {program.area}
                </p>
                <p className="mt-3 text-sm text-muted">{program.stage}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="p-6 sm:p-8 md:hidden">
          <div className="flex items-center gap-5 border-b border-line pb-6">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-surface">
              <PeptideRing className="h-14 w-14" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-ink">
                One selective thread
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                A shared precision peptide platform across four programs.
              </p>
            </div>
          </div>

          <ol aria-label="EndoCyclic precision programs" className="relative ml-6 mt-2 border-l border-rose/50 pl-7">
            {PIPELINE.map((program, index) => (
              <li key={program.id} className="relative border-b border-line py-6 last:border-b-0">
                <span
                  aria-hidden
                  className="absolute -left-[2.15rem] top-[1.9rem] h-3 w-3 rounded-full border-2 border-tint-warm bg-rose"
                />
                <span className={`text-xs font-semibold tracking-[0.14em] ${PROGRAM_TONES[index]}`}>
                  0{index + 1}
                </span>
                <h3 className="mt-2 text-lg font-semibold leading-tight text-ink">{program.name}</h3>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-teal-ink">
                  {program.modality} · {program.area}
                </p>
                <p className="mt-2 text-xs font-medium leading-relaxed text-muted">{program.stage}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <figcaption className="mt-4 text-sm leading-relaxed text-muted">
        One precision peptide platform supports therapeutic and diagnostic programs across endometriosis and oncology.
      </figcaption>
    </figure>
  );
}
