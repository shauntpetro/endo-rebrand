"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Generates a wavy circle path matching the reference graphic's cyclic peptide style.
 * Creates an undulating circular outline — like a gear/starburst with smooth rounded bumps.
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

/** Cyclic peptide ring — wavy circular outline matching the reference graphic */
export const PeptideRing = ({ color, className, style, filled }: { color: string; className?: string; style?: React.CSSProperties; filled?: boolean }) => {
  const path = wavyCirclePath(50, 50, 30, 8, 12);

  return (
    <svg viewBox="0 0 100 100" className={className} style={style}>
      <motion.path
        d={path}
        fill={filled ? color : "none"}
        fillOpacity={filled ? 0.15 : 0}
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/** Protonated peptide ring — wavy circular outline with H+ label, matching reference graphic */
export const PeptideRingProtonated = ({ color, className, style }: { color: string; className?: string; style?: React.CSSProperties }) => {
  const path = wavyCirclePath(50, 50, 30, 8, 12);

  return (
    <svg viewBox="0 0 120 100" className={className} style={style}>
      <motion.path
        d={path}
        fill={color}
        fillOpacity={0.15}
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* H+ label in red — matching reference graphic */}
      <text x="90" y="30" fontFamily="sans-serif" fontWeight="bold" fontSize="16" fill="#E53E3E">
        H+
      </text>
    </svg>
  );
};

/** Intracellular target — cell nucleus with nucleolus */
export const IntracellularTarget = ({ color, className, style }: { color: string; className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 100 100" className={className} style={style}>
    {/* Nuclear envelope — outer membrane */}
    <circle cx="50" cy="50" r="40" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="2.5" opacity="0.7" />
    {/* Nuclear envelope — inner membrane */}
    <circle cx="50" cy="50" r="36" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    {/* Chromatin texture — subtle irregular shapes */}
    <circle cx="38" cy="40" r="8" fill={color} fillOpacity="0.1" />
    <circle cx="60" cy="55" r="6" fill={color} fillOpacity="0.08" />
    <circle cx="45" cy="62" r="5" fill={color} fillOpacity="0.06" />
    {/* Nucleolus — darker inner circle */}
    <circle cx="50" cy="48" r="14" fill={color} fillOpacity="0.35" stroke={color} strokeWidth="1.5" opacity="0.6" />
    {/* Nucleolus highlight */}
    <circle cx="47" cy="45" r="5" fill="white" fillOpacity="0.15" />
  </svg>
);

/** Large cell body — crescent/arc shape matching the reference graphic's tissue sections */
export const CellBody = ({
  variant = "normal",
  className,
  style,
}: {
  variant?: "normal" | "lesion";
  className?: string;
  style?: React.CSSProperties;
}) => {
  const fillColor = variant === "normal" ? "#FDEBD0" : "#FDE8D0";
  const strokeColor = variant === "normal" ? "#C9A961" : "#A68945";

  return (
    <svg viewBox="0 0 200 200" className={className} style={style} preserveAspectRatio="xMidYMid meet">
      {/* Large circular cell body */}
      <circle
        cx="100"
        cy="100"
        r="85"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="3"
        opacity="0.9"
      />
      {/* Subtle inner structure */}
      {variant === "lesion" && (
        <>
          {/* Invagination / endocytic pocket */}
          <path
            d="M 60,20 Q 70,40 60,55 Q 45,65 55,80"
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
            opacity="0.4"
          />
        </>
      )}
    </svg>
  );
};
