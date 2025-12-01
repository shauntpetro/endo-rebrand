"use client";

import { motion } from "framer-motion";

interface PeptideRingProps {
  color?: string;
}

export const PeptideRing = ({ color = "#C9A961" }: PeptideRingProps) => {
  return (
    <motion.svg 
      viewBox="0 0 100 100" 
      className="w-full h-full absolute top-0 left-0"
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background transparent ring */}
      <circle 
        cx="50" 
        cy="50" 
        r="48" 
        fill="none" 
        stroke={color} 
        strokeWidth="1" 
        strokeDasharray="4 4"
        opacity={0.3}
      />
      
      {/* Animated nodes */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 50 + 48 * Math.cos(rad);
        const y = 50 + 48 * Math.sin(rad);
        
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="3"
            fill={color}
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.5 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 0.2,
              ease: "easeInOut" 
            }}
          />
        );
      })}
    </motion.svg>
  );
};




