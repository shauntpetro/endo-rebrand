"use client";

import { clsx } from "clsx";
import { ArrowUpRight } from "lucide-react";
import Scene, { HorizontalPin } from "@/components/film/Scene";
import { useOverlay } from "@/components/film/overlay";
import { PIPELINE, PHASES } from "@/lib/site";

const PANEL_TONES = ["plum", "gold", "teal", "ink"] as const;

function toneText(i: number) {
  // gold panel → ink text; others → cream text
  return PANEL_TONES[i] === "gold" ? "text-ink" : "text-cream";
}
function toneBg(i: number) {
  return { plum: "bg-plum", gold: "bg-gold", teal: "bg-teal", ink: "bg-ink" }[PANEL_TONES[i]];
}

export default function PipelineScene() {
  const { open } = useOverlay();
  return (
    <Scene id="pipeline-scene" tone="cream" center={false} aria-label="Pipeline">
      <HorizontalPin panels={PIPELINE.length + 1}>
        {/* intro panel */}
        <div className="flex h-full w-screen shrink-0 items-center bg-cream">
          <div className="container-editorial">
            <p className="t-label text-gold-ink">§ Pipeline — scroll sideways</p>
            <h2 className="t-display mt-6 max-w-[12ch] uppercase text-ink">
              Four <span className="text-gold-ink">programs.</span>
            </h2>
            <p className="t-lead mt-8 max-w-md text-ink-muted">
              Two therapeutic + diagnostic pairs across endometriosis and oncology — built on one
              non-hormonal precision peptide platform.
            </p>
            <button
              onClick={() => open("pipeline")}
              className="t-label mt-10 inline-flex items-center gap-2 border-b-2 border-ink pb-1 text-ink transition-colors hover:text-gold-ink"
            >
              Open full pipeline <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* program panels */}
        {PIPELINE.map((c, i) => (
          <div key={c.id} className={clsx("relative flex h-full w-screen shrink-0 items-center", toneBg(i), toneText(i))}>
            {/* index numeral */}
            <span aria-hidden className={clsx("pointer-events-none absolute right-[4vw] top-[12%] t-num text-[28vh] leading-none opacity-10")}>
              0{i + 1}
            </span>
            <div className="container-editorial relative z-10">
              <div className="flex items-center gap-3">
                <span aria-hidden className={clsx("h-2.5 w-2.5", PANEL_TONES[i] === "gold" ? "bg-ink" : "bg-gold")} />
                <span className="t-label">{c.modality}</span>
                <span aria-hidden className="opacity-40">/</span>
                <span className="t-label">{c.area}</span>
              </div>
              <h3 className="t-display mt-6 uppercase">{c.name}</h3>
              <p className={clsx("mt-4 t-lead max-w-2xl", PANEL_TONES[i] === "gold" ? "text-ink/80" : "text-cream/80")}>
                {c.mechanism}
              </p>

              {/* phase scale */}
              <div className="mt-10 max-w-md">
                <div className="flex gap-1.5">
                  {PHASES.map((_, p) => (
                    <span
                      key={p}
                      className={clsx(
                        "h-2 flex-1",
                        p <= c.phaseIndex
                          ? PANEL_TONES[i] === "gold" ? "bg-ink" : "bg-gold"
                          : PANEL_TONES[i] === "gold" ? "bg-ink/25" : "bg-cream/25",
                      )}
                    />
                  ))}
                </div>
                <p className="t-label mt-3">{c.stage}</p>
              </div>

              <button
                onClick={() => open("pipeline", c.id)}
                className={clsx(
                  "t-label mt-10 inline-flex items-center gap-2 px-6 py-3 transition-colors",
                  PANEL_TONES[i] === "gold"
                    ? "bg-ink text-cream hover:bg-cream hover:text-ink"
                    : "bg-gold text-ink hover:bg-cream",
                )}
              >
                View program <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </HorizontalPin>
    </Scene>
  );
}
