"use client";

import { pipeline, PHASES, type PipelineItem, type DiseaseArea } from "@/components/pipeline/pipelineData";

const AREAS: { key: DiseaseArea; sub: string }[] = [
  { key: "Endometriosis", sub: "Women's Health" },
  { key: "Oncology", sub: "Solid Tumors" },
];

/** Accent = luminous decoration color; text = deepened tone for WCAG-legible labels on cream. */
function tonesFor(type: PipelineItem["type"]) {
  return type === "Therapeutic"
    ? { accent: "#C9A961", text: "#8A6D2E" } // gold-primary / gold-deep
    : { accent: "#4A9B8E", text: "#2F6E62" }; // clinical-teal / teal-deep
}

function cell(area: DiseaseArea, type: PipelineItem["type"]) {
  return pipeline.find((p) => p.area === area && p.type === type);
}

function Pips({ item }: { item: PipelineItem }) {
  const { accent } = tonesFor(item.type);
  return (
    <div className="flex gap-1 items-center mt-2.5" aria-hidden>
      {PHASES.map((_, i) => (
        <span
          key={i}
          className="h-[5px] flex-1 rounded-full"
          style={{
            background: i <= item.phase ? accent : "#e7e0d4",
            boxShadow: i === item.phase ? `0 0 0 2px #FAF6EC, 0 0 0 3.5px ${accent}` : undefined,
          }}
        />
      ))}
    </div>
  );
}

function Card({ item, compact, delay }: { item: PipelineItem; compact: boolean; delay: number }) {
  const { accent, text } = tonesFor(item.type);
  return (
    <div
      className="reveal-rise group relative bg-bone-raised rounded-2xl border border-plum-dark/10 px-4 py-3.5 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset] transition-all duration-500 hover:border-gold-primary/40 hover:-translate-y-1"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Warm accent rule — hairline that finds its color per candidate type */}
      <span className="absolute left-0 top-3.5 bottom-3.5 w-[3px] rounded-full" style={{ background: `linear-gradient(${accent}, ${accent}40)` }} />
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-serif font-bold text-plum-dark leading-none" style={{ fontSize: compact ? 16 : 20 }}>
          {item.name}
        </span>
        <span
          className="text-[10px] font-extrabold uppercase tracking-[0.1em] px-2 py-[3px] rounded-full border"
          style={{ color: text, borderColor: `${accent}66`, background: `${accent}14` }}
        >
          {item.status}
        </span>
      </div>
      {!compact && <p className="text-[11px] font-semibold text-[#544c60] mt-1.5 leading-snug">{item.mechanism}</p>}
      <Pips item={item} />
      <p className="text-[10px] font-bold uppercase tracking-[0.1em] mt-2" style={{ color: text }}>
        {PHASES[item.phase]}
      </p>
    </div>
  );
}

function RowGroup({ type, compact, rowIdx, showPairTag }: { type: PipelineItem["type"]; compact: boolean; rowIdx: number; showPairTag: boolean }) {
  return (
    <>
      <div className="[writing-mode:vertical-rl] rotate-180 flex items-center justify-center text-[10px] font-extrabold tracking-[0.2em] uppercase text-plum-primary">
        {type}
      </div>
      {AREAS.map((a, colIdx) => {
        const item = cell(a.key, type);
        return <div key={a.key}>{item ? <Card item={item} compact={compact} delay={0.25 + rowIdx * 0.12 + colIdx * 0.08} /> : null}</div>;
      })}
      {showPairTag && (
        <div className="col-start-2 col-end-4 flex justify-center -my-0.5">
          <span className="text-[10px] font-extrabold tracking-[0.14em] uppercase text-gold-deep flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-gold-primary/50 after:content-[''] after:w-6 after:h-px after:bg-gold-primary/50">
            Detect &amp; Treat — matched pair
          </span>
        </div>
      )}
    </>
  );
}

export default function PortfolioMatrix({ variant = "full" }: { variant?: "full" | "compact" }) {
  const compact = variant === "compact";
  return (
    <section
      aria-label="Portfolio of matched therapeutic and diagnostic pairs"
      className="relative overflow-hidden rounded-[18px] border border-plum-dark/10 p-6 md:p-8"
      style={{
        background:
          "radial-gradient(90% 70% at 78% 8%, rgba(201,169,97,0.12), transparent 60%), #FAF6EC",
      }}
    >
      <div className="relative">
        <p className="reveal-rise text-[10px] font-extrabold uppercase tracking-[0.28em] text-gold-deep mb-1.5" style={{ animationDelay: "0.05s" }}>
          Therapeutics &amp; Diagnostics · One Platform
        </p>
        <h3 className="reveal-rise font-serif font-bold text-plum-dark leading-none text-balance" style={{ fontSize: compact ? 24 : 30, animationDelay: "0.12s" }}>
          One Platform, <span className="text-gold-primary italic">Matched Pairs</span>
        </h3>
        {!compact && (
          <p className="reveal-rise text-xs text-[#544c60] max-w-[460px] leading-relaxed mt-2" style={{ animationDelay: "0.18s" }}>
            A single precision-peptide engine producing matched pairs — a diagnostic to find disease and a therapeutic to clear it — across two disease areas.
          </p>
        )}

        <div className="grid mt-6" style={{ gridTemplateColumns: "26px 1fr 1fr", gap: 12 }}>
          <div />
          {AREAS.map((a) => (
            <div key={a.key} className="text-center font-serif italic text-plum-primary" style={{ fontSize: compact ? 14 : 17 }}>
              {a.key}
              <span className="block not-italic font-sans text-[10px] font-bold tracking-[0.16em] uppercase text-[#5f5866] mt-1">{a.sub}</span>
            </div>
          ))}

          {(["Therapeutic", "Diagnostic"] as const).map((type, rowIdx) => (
            <RowGroup key={type} type={type} compact={compact} rowIdx={rowIdx} showPairTag={rowIdx === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
