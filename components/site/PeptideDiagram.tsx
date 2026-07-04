"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { clsx } from "clsx";

/**
 * Editorial schematic of the mechanism: pH-mediated activation → selective
 * uptake by diseased tissue → correction (not destruction). Purely illustrative
 * — no efficacy figures. Strokes draw in on view; static-safe.
 */
const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  { n: "01", title: "pH-mediated activation", body: "The cyclic peptide stays inert until it meets the acidic microenvironment of diseased tissue." },
  { n: "02", title: "Selective uptake", body: "A proprietary endocytic pathway draws it into diseased cells — healthy tissue is passed over." },
  { n: "03", title: "Correction, not destruction", body: "It acts only where disease lives, avoiding hormones, surgery, and systemic toxicity." },
];

export default function PeptideDiagram({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const reduced = useReducedMotion();
  const dark = tone === "dark";
  const ink = dark ? "#EDE7DA" : "#17140F";
  const faint = dark ? "#ede7da33" : "#17140f22";
  const gold = "#C9A961";
  const teal = dark ? "#5FB3A6" : "#3E8E82";

  const draw: Variants = {
    hidden: { pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0 },
    show: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 1.1, ease: EASE, delay: 0.15 * i }, opacity: { duration: 0.3, delay: 0.15 * i } },
    }),
  };
  const pop: Variants = {
    hidden: { scale: reduced ? 1 : 0, opacity: reduced ? 1 : 0 },
    show: (i: number) => ({ scale: 1, opacity: 1, transition: { duration: 0.5, ease: EASE, delay: 0.5 + 0.05 * i } }),
  };

  const hex = "M200,138 L245,164 L245,216 L200,242 L155,216 L155,164 Z";
  const hexNodes = [
    [200, 138], [245, 164], [245, 216], [200, 242], [155, 216], [155, 164],
  ];

  return (
    <figure
      className={clsx("w-full", className)}
      aria-label="Schematic: pH-mediated activation, selective uptake by diseased tissue, then correction."
    >
      <motion.svg
        viewBox="0 0 1200 360"
        role="img"
        className="w-full"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15% 0px" }}
      >
        <defs>
          <linearGradient id="phgrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={teal} stopOpacity="0.14" />
            <stop offset="100%" stopColor={gold} stopOpacity="0.24" />
          </linearGradient>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={gold} />
          </marker>
        </defs>

        {/* connectors */}
        <motion.path d="M272,180 C 350,150 420,150 500,178" fill="none" stroke={gold} strokeWidth="1.5" markerEnd="url(#arrow)" variants={draw} custom={2} />
        <motion.path d="M700,180 C 780,214 850,214 926,186" fill="none" stroke={gold} strokeWidth="1.5" markerEnd="url(#arrow)" variants={draw} custom={4} />

        {/* Panel I — pH activation */}
        <motion.rect x="150" y="128" width="100" height="124" rx="10" fill="url(#phgrad)" variants={pop} custom={0} />
        <motion.path d={hex} fill="none" stroke={ink} strokeWidth="1.75" variants={draw} custom={0} />
        {hexNodes.map((p, i) => (
          <motion.circle key={i} cx={p[0]} cy={p[1]} r="5.5" fill={i === 1 ? gold : ink} variants={pop} custom={i} />
        ))}
        <motion.circle cx="200" cy="190" r="3.5" fill={gold} variants={pop} custom={6} />

        {/* Panel II — selective uptake (cell) */}
        <motion.circle cx="600" cy="180" r="74" fill="none" stroke={ink} strokeWidth="1.75" variants={draw} custom={1} />
        <motion.circle cx="600" cy="180" r="66" fill="none" stroke={faint} strokeWidth="1" variants={draw} custom={1} />
        {/* diseased markers inside */}
        {[[590, 172], [612, 178], [598, 196]].map((p, i) => (
          <motion.circle key={i} cx={p[0]} cy={p[1]} r="6" fill={teal} variants={pop} custom={i + 2} />
        ))}
        {/* peptide entering membrane */}
        <motion.circle cx="533" cy="163" r="7" fill={gold} variants={pop} custom={5} />
        <motion.path d="M486,150 L556,176" fill="none" stroke={gold} strokeWidth="1.5" markerEnd="url(#arrow)" variants={draw} custom={2} />

        {/* Panel III — correction */}
        {/* lesion (dashed, fading) */}
        <motion.path
          d="M958,158 C 946,150 980,140 992,152 C 1010,146 1024,168 1012,182 C 1022,196 1000,214 984,206 C 968,214 950,196 960,182 C 950,174 950,164 958,158 Z"
          fill="none" stroke={teal} strokeWidth="1.5" strokeDasharray="4 5" opacity="0.55" variants={draw} custom={3}
        />
        {/* restored clean tissue */}
        <motion.circle cx="1040" cy="192" r="34" fill="none" stroke={ink} strokeWidth="1.75" variants={draw} custom={5} />
        <motion.circle cx="1040" cy="192" r="6" fill={gold} variants={pop} custom={8} />
      </motion.svg>

      <figcaption className="mt-10 grid gap-8 sm:grid-cols-3">
        {STEPS.map((s) => (
          <div key={s.n}>
            <div className={clsx("t-label mb-2", dark ? "text-gold-light" : "text-gold-ink")}>
              {s.n} — {s.title}
            </div>
            <p className={clsx("text-[0.95rem] leading-relaxed", dark ? "text-muted-on-dark" : "text-ink-muted")}>
              {s.body}
            </p>
          </div>
        ))}
      </figcaption>
    </figure>
  );
}
