"use client";

import { motion } from "framer-motion";

export const PeptideRing = ({ color, className, style }: { color: string, className?: string, style?: any }) => (
  <svg viewBox="0 0 100 100" className={className} style={style}>
    {/* Main Ring - Thinner, more elegant stroke */}
    <motion.path
      d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z"
      fill="none"
      stroke={color}
      strokeWidth="8" 
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Subtle internal connections representing cross-links or structure */}
    <motion.path
      d="M50 20 L75 35 M75 65 L50 80 M25 65 L15 70"
      stroke={color}
      strokeWidth="3"
      strokeOpacity="0.4"
      strokeLinecap="round"
    />
  </svg>
);

export const IntracellularTarget = ({ color, className, style }: { color: string, className?: string, style?: any }) => (
  <svg viewBox="0 0 100 100" className={className} style={style}>
    {/* Protein Complex Look - Cluster of blobs */}
    <g fill={color}>
      <circle cx="40" cy="40" r="25" opacity="0.8" />
      <circle cx="65" cy="50" r="20" opacity="0.6" />
      <circle cx="45" cy="70" r="18" opacity="0.7" />
      <circle cx="70" cy="75" r="15" opacity="0.5" />
    </g>
    {/* Active site highlight */}
    <circle cx="55" cy="55" r="10" fill="white" fillOpacity="0.4" />
  </svg>
);
