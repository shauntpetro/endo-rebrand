"use client";

import { motion } from "framer-motion";

/**
 * Generates a wavy circle path matching the reference graphic's cyclic peptide style.
 */
function wavyCirclePath(cx: number, cy: number, baseR: number, amplitude: number, bumps: number): string {
  const steps = bumps * 12;
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    const r = baseR + amplitude * Math.sin(angle * bumps);
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return points.join(" ") + " Z";
}

interface PeptideRingProps {
  color?: string;
}

export const PeptideRing = ({ color = "#C9A961" }: PeptideRingProps) => {
  const path = wavyCirclePath(50, 50, 30, 8, 12);

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="w-full h-full absolute top-0 left-0"
    >
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};
