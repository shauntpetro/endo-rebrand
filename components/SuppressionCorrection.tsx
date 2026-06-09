"use client";

import { motion } from "framer-motion";

const LEFT = {
  eyebrow: "Today's Hormonal Drugs",
  title: "System-Wide Suppression",
  points: [
    "Act across the whole body, not just diseased tissue",
    "Hormonal — can suppress fertility and carry systemic side effects",
    "Manage symptoms while lesions remain in place",
    "Require continuous, long-term dosing",
  ],
};

const RIGHT = {
  eyebrow: "ENDO-205",
  title: "Targeted Correction",
  points: [
    "Acts only in diseased tissue via a pH-gated mechanism",
    "Non-hormonal — designed to preserve fertility",
    "Designed to eliminate lesions, not just mask symptoms",
    "Short-course, disease-modifying by design",
  ],
};

function Column({ data, accent, dim, ariaLabel }: { data: typeof LEFT; accent: string; dim?: boolean; ariaLabel?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      aria-label={ariaLabel}
      className={`relative rounded-2xl border p-7 md:p-8 h-full ${dim ? "bg-gray-50 border-gray-200" : "bg-white border-gold-primary/30 shadow-[0_20px_50px_-24px_rgba(201,169,97,0.4)]"}`}
    >
      {ariaLabel && <span className="sr-only">{ariaLabel}</span>}
      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]" style={{ color: accent }}>{data.eyebrow}</span>
      <h3 className={`font-serif font-bold mt-2 mb-6 text-2xl md:text-3xl ${dim ? "text-gray-500" : "text-plum-dark"}`}>{data.title}</h3>
      <ul className="space-y-3.5">
        {data.points.map((p) => (
          <li key={p} className="flex items-start gap-3 text-sm leading-relaxed">
            <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: accent, opacity: dim ? 0.5 : 1 }} />
            <span className={dim ? "text-gray-500" : "text-black-soft"}>{p}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function SuppressionCorrection() {
  return (
    <section className="py-24 bg-cream-primary relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-primary mb-4 block">The Difference</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black-primary">Suppression vs. Correction</h2>
          <p className="text-lg text-black-soft font-light mt-5 leading-relaxed">
            Conventional therapy quiets the whole system. Our lead candidate is designed to act only where disease lives — correction, not destruction.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
          <Column data={LEFT} accent="#9b93a3" dim ariaLabel="Hormonal Suppression" />
          <Column data={RIGHT} accent="#C9A961" />
        </div>
      </div>
    </section>
  );
}
