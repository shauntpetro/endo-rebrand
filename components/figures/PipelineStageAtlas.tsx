import Link from "next/link";
import { PHASES, PIPELINE, type Area, type Modality } from "@/lib/site";

const AREAS: Area[] = ["Endometriosis", "Oncology"];

const PHASE_LABELS = [
  { full: "Discovery", lines: ["Discovery"] },
  { full: "Pre-clinical", lines: ["Pre-", "clinical"] },
  { full: "IND-enabling", lines: ["IND-", "enabling"] },
  { full: "Phase 1", lines: ["Phase 1"] },
  { full: "Phase 2", lines: ["Phase 2"] },
  { full: "Phase 3", lines: ["Phase 3"] },
] as const;

const programHref = (programId: string) => {
  if (programId === "ENDO-205") return "/pipeline#endo-205";
  if (programId === "FemLUNA") return "/pipeline#femluna";
  return "/pipeline#oncology";
};

const AREA_STYLE: Record<
  Area,
  {
    index: string;
    accentText: string;
    accentTextDark: string;
    areaBg: string;
    rowBg: string;
    areaBorder: string;
    activeCell: string;
    markerFill: string;
    markerBorder: string;
    track: string;
  }
> = {
  Endometriosis: {
    index: "01",
    accentText: "text-rose-ink",
    accentTextDark: "text-[#efb2bf]",
    areaBg: "bg-petal",
    rowBg: "bg-petal/35",
    areaBorder: "border-l-rose",
    activeCell: "bg-petal",
    markerFill: "bg-rose",
    markerBorder: "border-rose",
    track: "bg-rose/55",
  },
  Oncology: {
    index: "02",
    accentText: "text-teal-ink",
    accentTextDark: "text-teal-on-dark",
    areaBg: "bg-tint-teal",
    rowBg: "bg-tint-teal/45",
    areaBorder: "border-l-teal",
    activeCell: "bg-tint-teal",
    markerFill: "bg-teal",
    markerBorder: "border-teal",
    track: "bg-teal/55",
  },
};

function currentStage(phaseIndex: number) {
  return PHASE_LABELS[phaseIndex]?.full ?? PHASES[phaseIndex];
}

function StageMarker({
  area,
  modality,
  onDark = false,
  className = "",
}: {
  area: Area;
  modality: Modality;
  onDark?: boolean;
  className?: string;
}) {
  const style = AREA_STYLE[area];
  const diagnostic = modality === "Diagnostic";

  return (
    <span
      aria-hidden
      data-pipeline-current-marker
      className={`relative inline-flex h-8 w-8 items-center justify-center ${className}`}
    >
      <span
        className={
          diagnostic
            ? `h-4 w-4 rounded-full border-2 ${onDark ? "bg-plum" : "bg-surface"} ${style.markerBorder}`
            : `h-4 w-4 rounded-full border-2 ${onDark ? "border-plum" : "border-surface"} ${style.markerFill}`
        }
      />
    </span>
  );
}

function AreaKey({ area }: { area: Area }) {
  const style = AREA_STYLE[area];

  return (
    <span className={`inline-flex items-center gap-2 text-xs font-medium ${style.accentTextDark}`}>
      <span aria-hidden className={`h-1.5 w-5 ${style.markerFill}`} />
      {area}
    </span>
  );
}

function ModalityKey({ modality }: { modality: Modality }) {
  const diagnostic = modality === "Diagnostic";

  return (
    <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-on-dark">
      <span
        aria-hidden
        className={
          diagnostic
            ? "h-3.5 w-3.5 rounded-full border-2 border-on-dark bg-plum"
            : "h-3.5 w-3.5 rounded-full bg-on-dark"
        }
      />
      {modality}
    </span>
  );
}

function ReadingKey() {
  return (
    <div aria-label="How to read the portfolio" className="grid gap-4 sm:grid-cols-2 lg:min-w-[30rem]">
      <div>
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted-on-dark">Disease area</p>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
          {AREAS.map((area) => (
            <AreaKey key={area} area={area} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted-on-dark">Program type</p>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
          <ModalityKey modality="Therapeutic" />
          <ModalityKey modality="Diagnostic" />
        </div>
      </div>
    </div>
  );
}

function TrackSegment({
  area,
  phaseIndex,
  currentIndex,
}: {
  area: Area;
  phaseIndex: number;
  currentIndex: number;
}) {
  if (phaseIndex > currentIndex) return null;

  const style = AREA_STYLE[area];
  const edge =
    phaseIndex === 0
      ? "left-1/2 right-0"
      : phaseIndex === currentIndex
        ? "left-0 right-1/2"
        : "inset-x-0";

  return (
    <span
      aria-hidden
      data-pipeline-stage-track
      className={`absolute top-1/2 h-px origin-left -translate-y-1/2 ${edge} ${style.track}`}
    />
  );
}

function MobileStageRail({
  area,
  modality,
  phaseIndex,
}: {
  area: Area;
  modality: Modality;
  phaseIndex: number;
}) {
  const style = AREA_STYLE[area];
  const progress = (phaseIndex / (PHASES.length - 1)) * 83.334;

  return (
    <div className="mt-4" role="img" aria-label={`Current development stage: ${currentStage(phaseIndex)}`}>
      <div className="relative h-7">
        <span aria-hidden className="absolute left-[8.333%] right-[8.333%] top-1/2 h-px -translate-y-1/2 bg-line" />
        <span
          aria-hidden
          data-pipeline-stage-track
          className={`absolute left-[8.333%] top-1/2 h-px origin-left -translate-y-1/2 ${style.track}`}
          style={{ width: `${progress}%` }}
        />
        <div aria-hidden className="absolute inset-0 grid grid-cols-6">
          {PHASES.map((phase, index) => (
            <span key={phase} className="flex items-center justify-center">
              {index === phaseIndex ? (
                <StageMarker area={area} modality={modality} />
              ) : (
                <span className={`h-1.5 w-1.5 rounded-full ${index < phaseIndex ? style.markerFill : "bg-line"}`} />
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-1 flex items-center justify-between text-[0.72rem] font-medium text-muted">
        <span>Discovery</span>
        <span>Phase 3</span>
      </div>
    </div>
  );
}

export default function PipelineStageAtlas() {
  return (
    <figure
      aria-labelledby="pipeline-atlas-title"
      aria-describedby="pipeline-atlas-description pipeline-atlas-caption"
    >
      <div className="overflow-hidden rounded-bl-[2rem] rounded-tr-[2rem] border border-line bg-surface editorial-shadow sm:rounded-bl-[3.5rem] sm:rounded-tr-[3.5rem]">
        <header data-tone="dark" className="relative overflow-hidden border-b border-line-on-dark bg-plum px-5 py-7 text-on-dark sm:px-8 sm:py-9 lg:px-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(201,121,138,0.2),transparent_30%),radial-gradient(circle_at_92%_78%,rgba(143,197,186,0.16),transparent_28%)]"
          />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-on-dark">
                Portfolio development
              </p>
              <h3 id="pipeline-atlas-title" className="mt-4 text-[clamp(1.7rem,3.2vw,2.65rem)] font-medium leading-[1.08] tracking-[-0.03em] !text-on-dark">
                Two disease areas. Four programs.
              </h3>
              <p id="pipeline-atlas-description" className="mt-4 max-w-xl text-sm leading-relaxed text-muted-on-dark sm:text-base">
                Rows are grouped by disease area. Marker shape identifies therapeutic or diagnostic programs; position shows the reported current stage.
              </p>
            </div>
            <ReadingKey />
          </div>
        </header>

        <div className="hidden lg:block">
          <table className="w-full table-fixed border-collapse text-left">
            <caption className="sr-only">EndoCyclic portfolio development stages by disease area and program</caption>
            <colgroup>
              <col className="w-[7.5rem] lg:w-[9.5rem]" />
              <col className="w-[12.5rem] lg:w-[15rem]" />
              {PHASES.map((phase) => (
                <col key={phase} />
              ))}
            </colgroup>
            <thead className="bg-tint-warm text-ink">
              <tr className="border-b border-line">
                <th rowSpan={2} scope="col" className="border-r border-line px-3 py-4 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted lg:px-5">
                  Disease area
                </th>
                <th rowSpan={2} scope="col" className="border-r border-line px-4 py-4 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted lg:px-6">
                  Program
                </th>
                <th colSpan={6} scope="colgroup" className="px-4 py-3 text-center text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted">
                  Development stage · current position only
                </th>
              </tr>
              <tr className="border-b border-line">
                {PHASE_LABELS.map((phase) => (
                  <th
                    key={phase.full}
                    scope="col"
                    aria-label={phase.full}
                    className="border-l border-line px-1 py-3 text-center text-[0.72rem] font-semibold uppercase leading-tight tracking-[0.055em] text-muted"
                  >
                    <span aria-hidden>
                      {phase.lines.map((line) => (
                        <span key={line} className="block">{line}</span>
                      ))}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            {AREAS.map((area) => {
              const programs = PIPELINE.filter((program) => program.area === area);
              const style = AREA_STYLE[area];

              return (
                <tbody key={area} className="border-b border-line last:border-b-0">
                  {programs.map((program, programIndex) => (
                    <tr
                      key={program.id}
                      data-pipeline-row="desktop"
                      className="border-b border-line last:border-b-0"
                    >
                      {programIndex === 0 && (
                        <th
                          rowSpan={programs.length}
                          scope="rowgroup"
                          className={`border-r border-l-[5px] border-r-line px-3 py-5 align-middle ${style.areaBorder} ${style.areaBg} lg:px-5`}
                        >
                          <span className={`block text-[0.65rem] font-semibold tracking-[0.14em] ${style.accentText}`}>
                            {style.index}
                          </span>
                          <span className="mt-2 block text-sm font-semibold leading-tight text-ink lg:text-base">
                            {area}
                          </span>
                          <span className="mt-2 block text-[0.68rem] font-medium text-muted">
                            {programs.length} programs
                          </span>
                        </th>
                      )}

                      <th scope="row" className={`border-r border-r-line px-4 py-4 align-middle ${style.rowBg} lg:px-6 lg:py-5`}>
                        <Link
                          href={programHref(program.id)}
                          className="group inline-flex min-h-11 items-center gap-2 text-base font-medium leading-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-ink lg:text-lg"
                        >
                          <span className="link-underline">{program.name}</span>
                          <span aria-hidden className="text-sm text-teal-ink transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                        </Link>
                        <span className={`mt-1 block text-[0.65rem] font-semibold uppercase tracking-[0.11em] ${style.accentText}`}>
                          {program.modality} · {program.indication}
                        </span>
                        {program.id === "ENDO-205" && (
                          <span className="mt-2 block text-[0.68rem] font-medium leading-snug text-muted">
                            FDA IND Allowance · 2026
                          </span>
                        )}
                      </th>

                      {PHASES.map((phase, phaseIndex) => {
                        const isCurrent = phaseIndex === program.phaseIndex;
                        return (
                          <td
                            key={phase}
                            aria-current={isCurrent ? "step" : undefined}
                            aria-label={isCurrent ? `${program.name} current stage: ${currentStage(program.phaseIndex)}` : undefined}
                            className={`relative h-28 border-l border-line px-0 text-center align-middle ${isCurrent ? style.activeCell : "bg-surface"}`}
                          >
                            <TrackSegment area={area} phaseIndex={phaseIndex} currentIndex={program.phaseIndex} />
                            <span className="relative z-10 flex flex-col items-center justify-center px-1">
                              {isCurrent ? (
                                <>
                                  <StageMarker area={area} modality={program.modality} />
                                  <span
                                    data-pipeline-current-label
                                    className="mt-1 text-[0.72rem] font-semibold leading-tight text-ink"
                                  >
                                    {currentStage(program.phaseIndex)}
                                  </span>
                                </>
                              ) : (
                                <span
                                  aria-hidden
                                  className={`h-1.5 w-1.5 rounded-full ${phaseIndex < program.phaseIndex ? style.markerFill : "bg-line"}`}
                                />
                              )}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              );
            })}
          </table>
        </div>

        <div className="lg:hidden">
          {AREAS.map((area) => {
            const programs = PIPELINE.filter((program) => program.area === area);
            const style = AREA_STYLE[area];

            return (
              <section key={area} aria-labelledby={`pipeline-mobile-area-${area.toLowerCase()}`}>
                <div className={`flex items-center justify-between gap-4 border-b border-l-[5px] border-b-line px-5 py-5 ${style.areaBorder} ${style.areaBg}`}>
                  <div>
                    <p className={`text-[0.65rem] font-semibold tracking-[0.14em] ${style.accentText}`}>{style.index}</p>
                    <h4 id={`pipeline-mobile-area-${area.toLowerCase()}`} className="mt-1 text-lg font-semibold !text-ink">
                      {area}
                    </h4>
                  </div>
                  <span className="text-xs font-medium text-muted">{programs.length} programs</span>
                </div>

                <ol className="divide-y divide-line">
                  {programs.map((program) => (
                    <li
                      key={program.id}
                      data-pipeline-row="mobile"
                      className="bg-surface px-5 py-6 sm:px-8"
                    >
                      <div className="flex items-start justify-between gap-5">
                        <div className="min-w-0">
                          <p className={`text-[0.65rem] font-semibold uppercase tracking-[0.11em] ${style.accentText}`}>
                            {area} · {program.modality}
                          </p>
                          <Link
                            href={programHref(program.id)}
                            className="group mt-1 inline-flex min-h-11 items-center gap-2 text-xl font-medium leading-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-ink"
                          >
                            <span className="link-underline">{program.name}</span>
                            <span aria-hidden className="text-sm text-teal-ink transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                          </Link>
                          <p className="mt-1 text-xs leading-relaxed text-muted">{program.indication}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted">Current stage</p>
                          <p data-pipeline-current-label className="mt-1 text-sm font-semibold text-ink">
                            {currentStage(program.phaseIndex)}
                          </p>
                        </div>
                      </div>

                      <MobileStageRail area={area} modality={program.modality} phaseIndex={program.phaseIndex} />

                      {program.id === "ENDO-205" && (
                        <p className="mt-3 text-xs font-medium text-rose-ink">FDA IND Allowance · 2026</p>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}
        </div>
      </div>

      <figcaption id="pipeline-atlas-caption" className="mt-5 max-w-3xl text-sm leading-relaxed text-muted">
        Four investigational programs span endometriosis and oncology. Positions indicate the reported current development stage only; later columns are reference stages, not forecasts or measures of efficacy.
      </figcaption>
    </figure>
  );
}
