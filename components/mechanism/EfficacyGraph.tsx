"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MECHANISM_COLORS } from "./constants";
import clsx from "clsx";

const DATA = {
  mouse: {
    control: [100, 110, 120, 125, 130, 132, 135],
    hormone: [100, 90, 80, 70, 65, 65, 65], // Plateau showing suppression but not clearance
    endo: [100, 80, 40, 10, 0, 0, 0], // Complete clearance
  },
  rat: {
    control: [100, 105, 115, 120, 128, 135, 140],
    hormone: [100, 88, 75, 68, 65, 65, 65], // Plateau
    endo: [100, 75, 30, 5, 0, 0, 0], // Complete clearance
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

  const renderPoints = (points: {x: number, y: number, value: number, week: number}[], color: string, label: string, delayBase = 0) => {
      return points.map((p, i) => (
        <motion.circle 
            key={i}
            cx={p.x} 
            cy={p.y} 
            r={6} 
            fill="white"
            stroke={color}
            strokeWidth={hoveredIndex === i ? 4 : 2}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delayBase + i * 0.05, duration: 0.3 }}
            className="transition-all duration-300"
        />
      ));
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-xl overflow-hidden border border-stone-100 relative group">
      {/* Header */}
      <div className="p-8 pb-0 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="h-px w-8 bg-stone-300"></span>
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Preclinical Efficacy</h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-800">
              Complete Lesion <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-dark">
                Clearance
              </span>
            </h2>
        </div>

        {/* Controls */}
        <div className="flex bg-stone-100 p-1 rounded-lg shadow-inner">
            <button 
                onClick={() => setModel('mouse')}
                className={clsx(
                    "px-5 py-2 rounded-md text-xs font-bold uppercase tracking-wide transition-all duration-300",
                    model === 'mouse' 
                        ? "bg-white text-stone-800 shadow-sm ring-1 ring-black/5" 
                        : "text-stone-500 hover:text-stone-700 hover:bg-stone-200/50"
                )}
            >
                Mouse Model
            </button>
            <button 
                onClick={() => setModel('rat')}
                className={clsx(
                    "px-5 py-2 rounded-md text-xs font-bold uppercase tracking-wide transition-all duration-300",
                    model === 'rat' 
                        ? "bg-white text-stone-800 shadow-sm ring-1 ring-black/5" 
                        : "text-stone-500 hover:text-stone-700 hover:bg-stone-200/50"
                )}
            >
                Rat Model
            </button>
        </div>
      </div>

      {/* Graph Area */}
      <div className="w-full overflow-x-auto p-2 md:p-8">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="gradEndo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={MECHANISM_COLORS.peptideActive} stopOpacity="0.2" />
              <stop offset="100%" stopColor={MECHANISM_COLORS.peptideActive} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradHormone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C0879A" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#C0879A" stopOpacity="0" />
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

          {/* Grid Lines — staggered reveal */}
          {[0, 0.25, 0.5, 0.75, 1].map((tick, idx) => {
              const y = height - padding - tick * (height - 2 * padding);
              return (
                <motion.g
                  key={tick}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.3 }}
                >
                    <line
                        x1={padding}
                        y1={y}
                        x2={width - padding}
                        y2={y}
                        stroke="#F3F4F6"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                    />
                    <text
                        x={padding - 16}
                        y={y}
                        fill="#9CA3AF"
                        fontSize="11"
                        fontWeight="500"
                        textAnchor="end"
                        alignmentBaseline="middle"
                    >
                        {Math.round(tick * maxY)}
                    </text>
                </motion.g>
              );
          })}
          
          {/* Y-axis title */}
          <text
            x={16}
            y={height / 2}
            transform={`rotate(-90 16 ${height / 2})`}
            fill="#9CA3AF"
            fontSize="10"
            fontWeight="700"
            textAnchor="middle"
            style={{ letterSpacing: "0.12em" }}
          >
            LESION VOLUME (% OF BASELINE)
          </text>

          {/* Crosshair Line */}
          {hoveredIndex !== null && (
             <motion.line
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                x1={padding + (hoveredIndex / (WEEKS.length - 1)) * (width - 2 * padding)}
                x2={padding + (hoveredIndex / (WEEKS.length - 1)) * (width - 2 * padding)}
                y1={padding}
                y2={height - padding}
                stroke="#E5E7EB"
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
                        fill={isHovered ? "#1F2937" : "#9CA3AF"} 
                        fontWeight={isHovered ? "700" : "500"}
                        fontSize="11" 
                        textAnchor="middle"
                        className="transition-colors duration-200"
                      >
                        {week}w
                      </text>
                      <line x1={x} y1={height - padding} x2={x} y2={height - padding + 6} stroke="#E5E7EB" />
                  </g>
              );
          })}

          {/* Control Line (Gray) */}
          <motion.path 
            d={controlPath}
            fill="none"
            stroke="#D1D5DB"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ opacity: hoveredIndex !== null ? 0.3 : 1 }}
          />

          {/* Hormone Line (Pink) */}
          <motion.path 
            d={getAreaPath(hormonePath)}
            fill="url(#gradHormone)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
          <motion.path 
            d={hormonePath}
            fill="none"
            stroke="#C0879A" 
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            style={{ opacity: hoveredIndex !== null ? 0.5 : 1 }}
          />

          {/* ENDO-205 Line (Gold - Hero) */}
          <motion.path 
            d={getAreaPath(endoPath)}
            fill="url(#gradEndo)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
          <motion.path 
            d={endoPath}
            fill="none"
            stroke={MECHANISM_COLORS.peptideActive}
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
          />

          {/* Pulsing glow dot at ENDO-205 leading edge */}
          <motion.circle
            cx={endoPoints[endoPoints.length - 1].x}
            cy={endoPoints[endoPoints.length - 1].y}
            r={4}
            fill={MECHANISM_COLORS.peptideActive}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.9, duration: 0.4 }}
          />

          {/* Clearance Marker */}
           <motion.g
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.8, type: "spring" }}
            style={{ display: hoveredIndex !== null ? 'none' : 'block' }}
           >
             {/* Find the index where it first hits 0 or close to it */}
             {(() => {
                const firstZeroIndex = data.endo.findIndex(v => v <= 0);
                if (firstZeroIndex !== -1) {
                    const p = endoPoints[firstZeroIndex];
                    return (
                        <g transform={`translate(${p.x}, ${p.y})`}>
                             <motion.line 
                                x1="0" y1="-15" x2="0" y2="0" 
                                stroke={MECHANISM_COLORS.peptideActive} 
                                strokeWidth="2" 
                             />
                             <motion.rect x="-70" y="-32" width="140" height="32" rx="16" fill={MECHANISM_COLORS.peptideActive} animate={{ opacity: [0.85, 1, 0.85] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
                             <text x="0" y="-16" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">
                                COMPLETE CLEARANCE
                             </text>
                        </g>
                    )
                }
                return null;
             })()}
           </motion.g>

           {/* Suppression Marker (For Hormone) */}
           <motion.g
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2.0, type: "spring" }}
            style={{ display: hoveredIndex !== null ? 'none' : 'block' }}
           >
             {(() => {
                const lastIndex = data.hormone.length - 1;
                const p = hormonePoints[lastIndex];
                return (
                    <g transform={`translate(${p.x}, ${p.y})`}>
                         <motion.line 
                            x1="0" y1="-15" x2="0" y2="0" 
                            stroke="#C0879A" 
                            strokeWidth="2" 
                         />
                         <rect x="-75" y="-32" width="150" height="32" rx="16" fill="white" stroke="#C0879A" strokeWidth="2" />
                         <text x="0" y="-16" fill="#C0879A" fontSize="10" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">
                            INCOMPLETE RESPONSE
                         </text>
                    </g>
                )
             })()}
           </motion.g>

          {/* Points */}
          {showPoints && (
              <>
                {renderPoints(controlPoints, "#9CA3AF", "Control", 1.5)}
                {renderPoints(hormonePoints, "#C0879A", "Hormone", 1.7)}
                {renderPoints(endoPoints, MECHANISM_COLORS.peptideActive, "ENDO-205", 1.9)}
              </>
          )}

          {/* Legend - Positioned Inside */}
          <g transform={`translate(${width - padding - 180}, ${padding + 20})`}>
              <rect width="160" height="90" rx="8" fill="white" fillOpacity="0.9" stroke="#F3F4F6" />
              <g transform="translate(16, 24)">
                <circle cx="6" cy="6" r="4" fill={MECHANISM_COLORS.peptideActive} />
                <text x="20" y="10" fill="#4B5563" fontSize="12" fontWeight="600">ENDO-205</text>
              </g>
              <g transform="translate(16, 48)">
                <circle cx="6" cy="6" r="4" fill="#C0879A" />
                <text x="20" y="10" fill="#6B7280" fontSize="12">Hormone Therapy</text>
              </g>
              <g transform="translate(16, 72)">
                <circle cx="6" cy="6" r="4" fill="#D1D5DB" />
                <text x="20" y="10" fill="#9CA3AF" fontSize="12">Control</text>
              </g>
          </g>

          {/* Unified Tooltip Overlay */}
          {hoveredIndex !== null && (
              <g transform={`translate(${padding + (hoveredIndex / (WEEKS.length - 1)) * (width - 2 * padding)}, 0)`}>
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    className="pointer-events-none"
                  >
                       {/* Floating Card */}
                      <foreignObject x={hoveredIndex > 3 ? -190 : 10} y={padding} width="180" height="120">
                          <motion.div
                            initial={{ scale: 0.95, filter: "blur(4px)" }}
                            animate={{ scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.2 }}
                            className="bg-white/95 backdrop-blur text-stone-800 p-3 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-stone-200 text-xs"
                          >
                              <div className="font-bold text-stone-500 mb-2 border-b border-stone-100 pb-1 uppercase tracking-wider">Week {WEEKS[hoveredIndex]}</div>
                              <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                      <span className="flex items-center gap-2 font-medium"><span className="w-2 h-2 rounded-full bg-gold-primary shadow-sm"></span>ENDO-205</span>
                                      <span className="font-mono font-bold text-gold-dark bg-gold-primary/10 px-1.5 py-0.5 rounded">{endoPoints[hoveredIndex].value}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                      <span className="flex items-center gap-2 text-stone-600"><span className="w-2 h-2 rounded-full shadow-sm" style={{ background: '#C0879A' }}></span>Hormone</span>
                                      <span className="font-mono text-stone-600">{hormonePoints[hoveredIndex].value}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                      <span className="flex items-center gap-2 text-stone-400"><span className="w-2 h-2 rounded-full bg-stone-300"></span>Control</span>
                                      <span className="font-mono text-stone-400">{controlPoints[hoveredIndex].value}</span>
                                  </div>
                              </div>
                          </motion.div>
                      </foreignObject>
                  </motion.g>
              </g>
          )}

        </svg>
      </div>
      
      <div className="px-8 pb-8 flex justify-between items-center border-t border-stone-100 pt-4 mt-2">
         <div className="flex flex-col gap-0.5">
            <div className="text-xs text-stone-400 font-medium tracking-wide uppercase">
               Lesion Volume (% of baseline) over 12 weeks
            </div>
            <div className="text-[10px] italic text-stone-400/80">Representative preclinical data</div>
         </div>
         
         <div className="flex items-center gap-2">
             <label className="text-xs font-medium text-stone-500 cursor-pointer select-none flex items-center gap-2">
                Show Data Points
                <div className={clsx(
                    "w-10 h-5 rounded-full p-1 transition-colors duration-300 flex items-center",
                    showPoints ? "bg-gold-primary" : "bg-stone-200"
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

