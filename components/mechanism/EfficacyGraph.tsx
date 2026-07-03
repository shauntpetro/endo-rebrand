"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MECHANISM_COLORS } from "./constants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import clsx from "clsx";

/**
 * ILLUSTRATIVE / SCHEMATIC figure — NOT a real dataset.
 * Curves are stylized concepts, not measured values. The lead curve trends toward
 * a low residual burden and deliberately never reaches zero, so nothing here should
 * be read as a quantified efficacy claim. truth.md supports "designed to eliminate
 * endometriosis lesions" and preclinical "demonstrated elimination" — but not a
 * quantified clearance curve. Keep this figure conceptual.
 */
const DATA = {
  mouse: {
    control: [100, 110, 120, 125, 130, 132, 135],
    hormone: [100, 90, 80, 70, 65, 65, 65], // Plateau — suppression without elimination
    endo: [100, 78, 52, 34, 24, 18, 15], // Illustrative reduction toward a low residual (never 0)
  },
  rat: {
    control: [100, 105, 115, 120, 128, 135, 140],
    hormone: [100, 88, 75, 68, 65, 65, 65], // Plateau
    endo: [100, 74, 46, 30, 21, 16, 14], // Illustrative reduction toward a low residual (never 0)
  }
};

const WEEKS = [0, 2, 4, 6, 8, 10, 12];

// Helper to create smooth bezier curves
const getSmoothPath = (points: {x: number, y: number}[]) => {
  if (points.length === 0) return "";

  // Start point
  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];

    // Catmull-Rom to Cubic Bezier conversion factors
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return d;
};

export const EfficacyGraph = () => {
  const [model, setModel] = useState<'mouse' | 'rat'>('mouse');
  const [showPoints, setShowPoints] = useState(true);
  // Track just the week index to show crosshair across all lines
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const reduced = usePrefersReducedMotion();

  const data = DATA[model];
  const maxY = 160; // Slightly higher to give headroom
  const width = 800;
  const height = 450;
  const padding = 60;

  // Convert data values to coordinate points
  const getCoordinates = (values: number[]) => {
    return values.map((v, i) => ({
      x: padding + (i / (values.length - 1)) * (width - 2 * padding),
      y: height - padding - (v / maxY) * (height - 2 * padding),
      value: v,
      week: WEEKS[i]
    }));
  };

  const controlPoints = getCoordinates(data.control);
  const hormonePoints = getCoordinates(data.hormone);
  const endoPoints = getCoordinates(data.endo);

  const controlPath = getSmoothPath(controlPoints);
  const hormonePath = getSmoothPath(hormonePoints);
  const endoPath = getSmoothPath(endoPoints);

  // Area paths (close the loop for gradients)
  const getAreaPath = (pathD: string) => {
    return `${pathD} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`;
  };

  // Static points — visible in static state (no opacity:0 reveal that a paused animation would hide)
  const renderPoints = (points: {x: number, y: number, value: number, week: number}[], color: string) => {
      return points.map((p, i) => (
        <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={6}
            fill="#FAF6EC"
            stroke={color}
            strokeWidth={hoveredIndex === i ? 4 : 2}
            className="transition-all duration-300"
        />
      ));
  };

  const endoLast = endoPoints[endoPoints.length - 1];

  return (
    <div className="w-full bg-bone-raised rounded-2xl shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] overflow-hidden border border-plum-dark/10 relative group">
      {/* One confident warm luminous accent (static) */}
      <div
        className="absolute -top-16 -right-16 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,169,97,0.14) 0%, transparent 70%)" }}
      />

      {/* Header */}
      <div className="relative z-10 p-8 pb-0 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <div className="flex items-center gap-2 mb-3">
                <span className="h-px w-8 bg-gold-primary"></span>
                <h3 className="text-xs font-bold text-gold-deep uppercase tracking-widest">Preclinical Concept</h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-plum-dark leading-tight text-balance">
              Designed to eliminate <br className="hidden md:block" />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-dark">
                endometriosis lesions
              </span>
            </h2>

            {/* PROMINENT illustrative disclaimer — not a footnote */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold-primary/45 bg-gold-primary/10 px-4 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-primary" />
                <span className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-gold-deep">
                    Illustrative — representative concept, not trial data
                </span>
            </div>
        </div>

        {/* Controls */}
        <div className="flex bg-bone p-1 rounded-lg border border-plum-dark/10">
            <button
                onClick={() => setModel('mouse')}
                className={clsx(
                    "px-5 py-2 rounded-md text-xs font-bold uppercase tracking-wide transition-all duration-300",
                    model === 'mouse'
                        ? "bg-bone-raised text-plum-dark shadow-sm ring-1 ring-plum-dark/10"
                        : "text-plum-dark/50 hover:text-plum-dark hover:bg-plum-dark/5"
                )}
            >
                Mouse Model
            </button>
            <button
                onClick={() => setModel('rat')}
                className={clsx(
                    "px-5 py-2 rounded-md text-xs font-bold uppercase tracking-wide transition-all duration-300",
                    model === 'rat'
                        ? "bg-bone-raised text-plum-dark shadow-sm ring-1 ring-plum-dark/10"
                        : "text-plum-dark/50 hover:text-plum-dark hover:bg-plum-dark/5"
                )}
            >
                Rat Model
            </button>
        </div>
      </div>

      {/* Graph Area */}
      <div className="relative z-10 w-full overflow-x-auto p-2 md:p-8">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
          role="img"
          aria-label="Illustrative schematic of preclinical lesion reduction — not trial data"
        >
          <title>Illustrative preclinical lesion reduction (schematic)</title>
          <desc>
            A stylized, conceptual figure — not a real dataset. It contrasts a control group
            (rising), hormone therapy (plateau, incomplete response), and ENDO-205 (reduction
            toward a low residual burden that never reaches zero). Curves are illustrative
            representations, not measured efficacy values.
          </desc>
          <defs>
            {/* Flattened, low-opacity flat fills (no dramatic gradient-to-zero clip) */}
            <linearGradient id="gradEndo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={MECHANISM_COLORS.peptideActive} stopOpacity="0.10" />
              <stop offset="100%" stopColor={MECHANISM_COLORS.peptideActive} stopOpacity="0.03" />
            </linearGradient>
            <linearGradient id="gradHormone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C0879A" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#C0879A" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Hover Trigger Zones (Invisible Rects) */}
          {WEEKS.map((week, i) => {
              const x = padding + (i / (WEEKS.length - 1)) * (width - 2 * padding);
              const colWidth = (width - 2 * padding) / (WEEKS.length - 1);
              return (
                  <rect
                    key={`trigger-${i}`}
                    x={x - colWidth/2}
                    y={padding}
                    width={colWidth}
                    height={height - 2 * padding}
                    fill="transparent"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="cursor-crosshair"
                    style={{ pointerEvents: 'all' }}
                  />
              );
          })}

          {/* Grid Lines — hairline, static (visible in static state) */}
          {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
              const y = height - padding - tick * (height - 2 * padding);
              return (
                <g key={tick}>
                    <line
                        x1={padding}
                        y1={y}
                        x2={width - padding}
                        y2={y}
                        stroke="rgba(46,38,58,0.08)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                    />
                    <text
                        x={padding - 16}
                        y={y}
                        fill="#8A8391"
                        fontSize="11"
                        fontWeight="500"
                        textAnchor="end"
                        alignmentBaseline="middle"
                    >
                        {Math.round(tick * maxY)}
                    </text>
                </g>
              );
          })}

          {/* Y-axis title */}
          <text
            x={16}
            y={height / 2}
            transform={`rotate(-90 16 ${height / 2})`}
            fill="#8A8391"
            fontSize="10"
            fontWeight="700"
            textAnchor="middle"
            style={{ letterSpacing: "0.12em" }}
          >
            LESION VOLUME (% OF BASELINE) — ILLUSTRATIVE
          </text>

          {/* Crosshair Line (hover-only, non-critical) */}
          {hoveredIndex !== null && (
             <line
                x1={padding + (hoveredIndex / (WEEKS.length - 1)) * (width - 2 * padding)}
                x2={padding + (hoveredIndex / (WEEKS.length - 1)) * (width - 2 * padding)}
                y1={padding}
                y2={height - padding}
                stroke="rgba(46,38,58,0.18)"
                strokeWidth="2"
                strokeDasharray="4 4"
             />
          )}

          {/* X Axis Labels */}
          {WEEKS.map((week, i) => {
              const x = padding + (i / (WEEKS.length - 1)) * (width - 2 * padding);
              const isHovered = hoveredIndex === i;
              return (
                  <g key={week}>
                      <text
                        x={x}
                        y={height - 15}
                        fill={isHovered ? "#2E263A" : "#8A8391"}
                        fontWeight={isHovered ? "700" : "500"}
                        fontSize="11"
                        textAnchor="middle"
                        className="transition-colors duration-200"
                      >
                        {week}w
                      </text>
                      <line x1={x} y1={height - padding} x2={x} y2={height - padding + 6} stroke="rgba(46,38,58,0.15)" />
                  </g>
              );
          })}

          {/* Control Line (neutral) — static */}
          <path
            d={controlPath}
            fill="none"
            stroke="#C3BDB1"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            style={{ opacity: hoveredIndex !== null ? 0.3 : 1, transition: "opacity 0.3s" }}
          />

          {/* Hormone Line (muted plum-pink) — static */}
          <path d={getAreaPath(hormonePath)} fill="url(#gradHormone)" />
          <path
            d={hormonePath}
            fill="none"
            stroke="#C0879A"
            strokeWidth="3"
            style={{ opacity: hoveredIndex !== null ? 0.5 : 1, transition: "opacity 0.3s" }}
          />

          {/* ENDO-205 Line (Gold — hero) — static, visible in static state */}
          <path d={getAreaPath(endoPath)} fill="url(#gradEndo)" />
          <path
            d={endoPath}
            fill="none"
            stroke={MECHANISM_COLORS.peptideActive}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Residual-burden Marker — static (no pulsing, no leading-edge dot) */}
          <g style={{ display: hoveredIndex !== null ? 'none' : 'block' }}>
             <g transform={`translate(${endoLast.x}, ${endoLast.y})`}>
                 <line x1="0" y1="-15" x2="0" y2="0" stroke={MECHANISM_COLORS.peptideActive} strokeWidth="2" />
                 <rect x="-78" y="-32" width="156" height="32" rx="16" fill={MECHANISM_COLORS.peptideActive} />
                 <text x="0" y="-16" fill="#2E263A" fontSize="11" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">
                    SUSTAINED REDUCTION
                 </text>
             </g>
          </g>

          {/* Suppression Marker (For Hormone) — static */}
          <g style={{ display: hoveredIndex !== null ? 'none' : 'block' }}>
             {(() => {
                const lastIndex = data.hormone.length - 1;
                const p = hormonePoints[lastIndex];
                return (
                    <g transform={`translate(${p.x}, ${p.y})`}>
                         <line x1="0" y1="-15" x2="0" y2="0" stroke="#C0879A" strokeWidth="2" />
                         <rect x="-75" y="-32" width="150" height="32" rx="16" fill="#FAF6EC" stroke="#C0879A" strokeWidth="2" />
                         <text x="0" y="-16" fill="#B06E84" fontSize="10" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">
                            INCOMPLETE RESPONSE
                         </text>
                    </g>
                )
             })()}
          </g>

          {/* Points — static */}
          {showPoints && (
              <>
                {renderPoints(controlPoints, "#C3BDB1")}
                {renderPoints(hormonePoints, "#C0879A")}
                {renderPoints(endoPoints, MECHANISM_COLORS.peptideActive)}
              </>
          )}

          {/* Legend - Positioned Inside */}
          <g transform={`translate(${width - padding - 180}, ${padding + 20})`}>
              <rect width="160" height="90" rx="8" fill="#FAF6EC" fillOpacity="0.92" stroke="rgba(46,38,58,0.10)" />
              <g transform="translate(16, 24)">
                <circle cx="6" cy="6" r="4" fill={MECHANISM_COLORS.peptideActive} />
                <text x="20" y="10" fill="#2E263A" fontSize="12" fontWeight="600">ENDO-205</text>
              </g>
              <g transform="translate(16, 48)">
                <circle cx="6" cy="6" r="4" fill="#C0879A" />
                <text x="20" y="10" fill="#5E5769" fontSize="12">Hormone Therapy</text>
              </g>
              <g transform="translate(16, 72)">
                <circle cx="6" cy="6" r="4" fill="#C3BDB1" />
                <text x="20" y="10" fill="#8A8391" fontSize="12">Control</text>
              </g>
          </g>

          {/* Unified Tooltip Overlay (hover-only, non-critical) */}
          {hoveredIndex !== null && (
              <g transform={`translate(${padding + (hoveredIndex / (WEEKS.length - 1)) * (width - 2 * padding)}, 0)`}>
                  <motion.g
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: reduced ? 0 : 0.15 }}
                    className="pointer-events-none"
                  >
                       {/* Floating Card */}
                      <foreignObject x={hoveredIndex > 3 ? -190 : 10} y={padding} width="180" height="120">
                          <motion.div
                            initial={reduced ? false : { scale: 0.95, filter: "blur(4px)" }}
                            animate={{ scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: reduced ? 0 : 0.2 }}
                            className="bg-bone-raised/95 backdrop-blur text-plum-dark p-3 rounded-lg shadow-[0_8px_30px_rgba(46,38,58,0.12)] border border-plum-dark/10 text-xs"
                          >
                              <div className="font-bold text-plum-dark/60 mb-2 border-b border-plum-dark/10 pb-1 uppercase tracking-wider">Week {WEEKS[hoveredIndex]}</div>
                              <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                      <span className="flex items-center gap-2 font-medium"><span className="w-2 h-2 rounded-full bg-gold-primary shadow-sm"></span>ENDO-205</span>
                                      <span className="font-mono font-bold text-gold-deep bg-gold-primary/10 px-1.5 py-0.5 rounded tabular-nums">{endoPoints[hoveredIndex].value}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                      <span className="flex items-center gap-2 text-plum-dark/70"><span className="w-2 h-2 rounded-full shadow-sm" style={{ background: '#C0879A' }}></span>Hormone</span>
                                      <span className="font-mono text-plum-dark/70 tabular-nums">{hormonePoints[hoveredIndex].value}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                      <span className="flex items-center gap-2 text-plum-dark/40"><span className="w-2 h-2 rounded-full bg-[#C3BDB1]"></span>Control</span>
                                      <span className="font-mono text-plum-dark/40 tabular-nums">{controlPoints[hoveredIndex].value}</span>
                                  </div>
                              </div>
                          </motion.div>
                      </foreignObject>
                  </motion.g>
              </g>
          )}

        </svg>
      </div>

      <div className="relative z-10 px-8 pb-8 flex flex-col sm:flex-row justify-between gap-3 sm:items-center border-t border-plum-dark/10 pt-4 mt-2">
         <div className="flex flex-col gap-1 max-w-md">
            <div className="text-xs text-plum-dark/60 font-medium tracking-wide uppercase">
               Illustrative schematic — Lesion volume concept over 12 weeks
            </div>
            <div className="text-xs italic text-plum-dark/55">
               Stylized representation, not measured trial data. Curves trend toward a low residual burden and do not depict a quantified result.
            </div>
         </div>

         <div className="flex items-center gap-2">
             <label className="text-xs font-medium text-plum-dark/60 cursor-pointer select-none flex items-center gap-2">
                Show Data Points
                <div className={clsx(
                    "w-10 h-5 rounded-full p-1 transition-colors duration-300 flex items-center",
                    showPoints ? "bg-gold-primary" : "bg-plum-dark/15"
                )} onClick={() => setShowPoints(!showPoints)}>
                    <div className={clsx(
                        "bg-white w-3.5 h-3.5 rounded-full shadow-sm transition-transform duration-300",
                        showPoints ? "translate-x-5" : "translate-x-0"
                    )} />
                </div>
             </label>
         </div>
      </div>
    </div>
  );
};
