"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";

export function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const onMove: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    // Disabled magnetic effect for now as per request
    // const rect = e.currentTarget.getBoundingClientRect();
    // const dx = e.clientX - (rect.left + rect.width / 2);
    // const dy = e.clientY - (rect.top + rect.height / 2);
    // x.set(dx * 0.12);
    // y.set(dy * 0.12);
  };

  return (
    <motion.div style={{ x, y }}>
      <Link
        href={href}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className="inline-flex items-center justify-center rounded-sm bg-plum-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-colors duration-300 hover:bg-gold-primary"
      >
        {children}
      </Link>
    </motion.div>
  );
}

