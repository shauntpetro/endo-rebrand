"use client";

import { motion } from "framer-motion";
import { pipeline, PHASES, type PipelineItem, type DiseaseArea } from "@/components/pipeline/pipelineData";

const AREAS: { key: DiseaseArea; sub: string }[] = [
  { key: "Endometriosis", sub: "Women's Health" },
  { key: "Oncology", sub: "Solid Tumors" },
];

function colorFor(type: PipelineItem["type"]) {
  return type === "Therapeutic" ? "#C9A961" : "#4A9B8E";
}

function cell(area: DiseaseArea, type: PipelineItem["type"]) {
  return pipeline.find((p) => p.area === area && p.type === type);
}

function Pips({ item }: { item: PipelineItem }) {
  const c = colorFor(item.type);
  return (
    <div className="flex gap-1 items-center mt-2" aria-hidden>
      {PHASES.map((_, i) => (
        <span
          key={i}
          className="h-[5px] flex-1 rounded-full"
          style={{
            background: i <= item.phase ? c : "#ece6dc",
            boxShadow: i === item.phase ? `0 0 0 2px #fff, 0 0 0 4px ${c}` : undefined,
          }}
        />
      ))}
    </div>
  );
}

function Card({ item, compact }: { item: PipelineItem; compact: boolean }) {
  const c = colorFor(item.type);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -3 }}
      className="relative bg-white rounded-2xl border border-[#e3ddd1] px-4 py-3.5"
    >
      <span className="absolute left-0 top-3.5 bottom-3.5 w-[3px] rounded-full" style={{ background: `linear-gradient(${c}, ${c}33)` }} />
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-serif font-bold text-plum-dark leading-none" style={{ fontSize: compact ? 16 : 20 }}>
          {item.name}
        </span>
        <span
          className="text-[8px] font-extrabold uppercase tracking-[0.12em] px-2 py-[3px] rounded-full border"
          style={{ color: c, borderColor: `${c}55`, background: `${c}0f` }}
        >
          {item.status}
        </span>
      </div>
      {!compact && <p className="text-[10px] font-semibold text-[#857d8a] mt-1.5">{item.mechanism}</p>}
      <Pips item={item} />
      <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-gray-400 mt-1.5">{PHASES[item.phase]}</p>
    </motion.div>
  );
}

function RowGroup({ type, compact, showPairTag }: { type: PipelineItem["type"]; compact: boolean; showPairTag: boolean }) {
  return (
    <>
      <div className="[writing-mode:vertical-rl] rotate-180 flex items-center justify-center text-[9px] font-extrabold tracking-[0.2em] uppercase text-[#8a8290]">
        {type}
      </div>
      {AREAS.map((a) => {
        const item = cell(a.key, type);
        return <div key={a.key}>{item ? <Card item={item} compact={compact} /> : null}</div>;
      })}
      {showPairTag && (
        <div className="col-start-2 col-end-4 flex justify-around -my-0.5">
          {AREAS.map((a) => (
            <span key={a.key} className="text-[8.5px] font-extrabold tracking-[0.14em] uppercase text-gold-primary flex items-center gap-1.5 before:content-[''] before:w-4 before:h-px before:bg-gold-primary/40 after:content-[''] after:w-4 after:h-px after:bg-gold-primary/40">
              Detect &amp; Treat — matched pair
            </span>
          ))}
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
      className="relative overflow-hidden rounded-[18px] p-6 md:p-8"
      style={{ background: "#F7F4EF" }}
    >
      <div className="relative">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-gold-primary mb-1.5">Therapeutics &amp; Diagnostics · One Platform</p>
        <h3 className="font-serif font-bold text-plum-dark leading-none" style={{ fontSize: compact ? 24 : 30 }}>
          One Platform, <span className="text-gold-primary italic">Matched Pairs</span>
        </h3>
        {!compact && (
          <p className="text-xs text-[#6b6470] max-w-[460px] leading-relaxed mt-2">
            A single precision-peptide engine producing matched pairs — a diagnostic to find disease and a therapeutic to clear it — across two disease areas.
          </p>
        )}

        <div className="grid mt-5" style={{ gridTemplateColumns: "26px 1fr 1fr", gap: 12 }}>
          <div />
          {AREAS.map((a) => (
            <div key={a.key} className="text-center font-serif italic text-plum-primary" style={{ fontSize: compact ? 14 : 17 }}>
              {a.key}
              <span className="block not-italic font-sans text-[8px] font-bold tracking-[0.18em] uppercase text-[#9b93a3] mt-0.5">{a.sub}</span>
            </div>
          ))}

          {(["Therapeutic", "Diagnostic"] as const).map((type, rowIdx) => (
            <RowGroup key={type} type={type} compact={compact} showPairTag={rowIdx === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
