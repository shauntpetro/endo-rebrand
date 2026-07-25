import { PHASES, PIPELINE, type Area, type Modality } from "@/lib/site";

const AREAS: Area[] = ["Endometriosis", "Oncology"];

const PHASE_LABELS = [
  { full: "Discovery", mobileLines: ["Disc."] },
  { full: "Pre-clinical", mobileLines: ["Pre", "clin."] },
  { full: "IND-enabling", mobileLines: ["IND", "enab."] },
  { full: "Phase 1", mobileLines: ["Ph.", "1"] },
  { full: "Phase 2", mobileLines: ["Ph.", "2"] },
  { full: "Phase 3", mobileLines: ["Ph.", "3"] },
] as const;

const programHref = (programId: string) => {
  if (programId === "ENDO-205") return "/pipeline#endo-205";
  if (programId === "FemLUNA") return "/pipeline#femluna";
  if (programId === "ENDO-995") return "/pipeline#endo-995";
  return "/pipeline#endo-311";
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
    markerFill: string;
    markerBorder: string;
    track: string;
  }
> = {
  Endometriosis: {
    index: "01",
    accentText: "text-rose-ink",
    accentTextDark: "text-rose-on-dark",
    areaBg: "bg-petal",
    rowBg: "bg-petal/35",
    areaBorder: "border-l-rose",
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
}: {
  area: Area;
  modality: Modality;
}) {
  const style = AREA_STYLE[area];
  const diagnostic = modality === "Diagnostic";

  return (
    <span
      aria-hidden
      data-pipeline-current-marker
      className="relative inline-flex h-8 w-8 items-center justify-center"
    >
      <span
        className={
          diagnostic
            ? `h-4 w-4 rounded-full border-2 bg-surface ${style.markerBorder}`
            : `h-4 w-4 rounded-full border-2 border-surface ${style.markerFill}`
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
    <div
      role="group"
      aria-label="How to read the portfolio"
      className="grid gap-4 sm:grid-cols-2 lg:min-w-[30rem]"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-on-dark">Disease area</p>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
          {AREAS.map((area) => (
            <AreaKey key={area} area={area} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-on-dark">Program type</p>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
          <ModalityKey modality="Therapeutic" />
          <ModalityKey modality="Diagnostic" />
        </div>
      </div>
    </div>
  );
}

function StageRail({
  area,
  modality,
  phaseIndex,
  programName,
}: {
  area: Area;
  modality: Modality;
  phaseIndex: number;
  programName: string;
}) {
  const style = AREA_STYLE[area];
  const progress = (phaseIndex / (PHASES.length - 1)) * 83.334;

  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          Development stage
        </p>
        <p className="text-xs font-medium text-muted">
          Current
          <span aria-hidden> · </span>
          <span
            data-pipeline-current-label
            className={`font-semibold ${style.accentText}`}
          >
            {currentStage(phaseIndex)}
          </span>
        </p>
      </div>

      <div className="relative mt-4 h-8">
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
      <ol
        aria-label={`${programName} development stages`}
        className="mt-1 grid list-none grid-cols-6"
      >
        {PHASE_LABELS.map((phase, index) => {
          const isCurrent = index === phaseIndex;

          return (
            <li
              key={phase.full}
              aria-current={isCurrent ? "step" : undefined}
              className={`min-w-0 px-0.5 text-center text-xs font-medium leading-[1.05] tracking-[-0.025em] sm:leading-[1.1] sm:tracking-[-0.015em] ${
                isCurrent ? style.accentText : "text-muted"
              }`}
            >
              <span className="sr-only">
                {phase.full}
                {isCurrent ? `, current stage for ${programName}` : ""}
              </span>
              <span aria-hidden className="sm:hidden">
                {phase.mobileLines.map((line) => (
                  <span
                    key={line}
                    data-mobile-stage-segment
                    className="block"
                  >
                    {line}
                  </span>
                ))}
              </span>
              <span aria-hidden className="hidden sm:inline">
                {phase.full}
              </span>
            </li>
          );
        })}
      </ol>
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
                Current development
              </p>
              <h2 id="pipeline-atlas-title" className="mt-4 text-[clamp(1.7rem,3.2vw,2.65rem)] font-medium leading-[1.08] tracking-[-0.03em] !text-on-dark">
                Current stages across endometriosis and oncology.
              </h2>
              <p id="pipeline-atlas-description" className="mt-4 max-w-xl text-sm leading-relaxed text-muted-on-dark sm:text-base">
                Programs are grouped by disease area. Filled and outlined markers
                distinguish therapeutics from diagnostics; position shows the
                reported current stage.
              </p>
            </div>
            <ReadingKey />
          </div>
        </header>

        <div className="bg-surface">
          {AREAS.map((area) => {
            const programs = PIPELINE.filter((program) => program.area === area);
            const style = AREA_STYLE[area];

            return (
              <section
                key={area}
                aria-labelledby={`pipeline-area-${area.toLowerCase()}`}
                className="border-b border-line last:border-b-0"
              >
                <div className={`grid gap-3 border-b border-l-[5px] border-b-line px-5 py-5 min-[400px]:grid-cols-[1fr_auto] min-[400px]:items-end sm:px-8 lg:px-10 ${style.areaBorder} ${style.areaBg}`}>
                  <div>
                    <p className={`text-xs font-semibold tracking-[0.14em] ${style.accentText}`}>{style.index}</p>
                    <h3 id={`pipeline-area-${area.toLowerCase()}`} className="mt-1 text-xl font-semibold !text-ink">
                      {area}
                    </h3>
                  </div>
                  <p className="text-xs font-medium text-muted">
                    {programs.length} investigational programs
                  </p>
                </div>

                <ol className="divide-y divide-line">
                  {programs.map((program) => (
                    <li
                      key={program.id}
                      data-pipeline-row="program"
                      className="grid bg-surface lg:grid-cols-[minmax(15rem,0.78fr)_minmax(0,1.7fr)]"
                    >
                      <div className={`min-w-0 px-5 pb-2 pt-6 sm:px-8 lg:border-r lg:border-line lg:px-10 lg:py-7 ${style.rowBg}`}>
                        <p className={`text-xs font-semibold uppercase tracking-[0.11em] ${style.accentText}`}>
                          {program.modality}
                        </p>
                        <a
                          href={programHref(program.id)}
                          className="group mt-1 inline-flex min-h-11 items-center gap-2 text-xl font-medium leading-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-ink"
                        >
                          <span className="link-underline">{program.name}</span>
                          <span aria-hidden className="text-sm text-teal-ink transition-transform duration-300 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none">→</span>
                        </a>
                        <p className="mt-1 max-w-[28rem] text-sm leading-relaxed text-muted">
                          {program.indication}
                        </p>

                        {program.id === "ENDO-205" && (
                          <p className="mt-3 text-xs font-medium text-rose-ink">
                            FDA IND Allowance · 2026
                          </p>
                        )}
                      </div>

                      <div className="min-w-0 px-5 pb-7 pt-4 sm:px-8 lg:flex lg:items-center lg:px-10 lg:py-7">
                        <div className="w-full">
                          <StageRail
                            area={area}
                            modality={program.modality}
                            phaseIndex={program.phaseIndex}
                            programName={program.name}
                          />
                        </div>
                      </div>
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
