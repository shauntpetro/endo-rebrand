"use client";

import { useInView } from "framer-motion";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Animated counter that is safe in its static state: the FINAL value is
 * rendered in markup (SSR / no-JS / paused animations all show the real
 * figure). When motion is allowed and the element scrolls into view, it
 * counts up from 0. When the user prefers reduced motion, the final value
 * stays put — no rAF loop ever starts.
 */
function Counter({
  value,
  suffix = "",
  decimals = 0,
  reduced = false,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  reduced?: boolean;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "0px" });

  useEffect(() => {
    if (!nodeRef.current) return;

    // Reduced motion: render the final value immediately, skip animation.
    if (reduced) {
      nodeRef.current.textContent = value.toFixed(decimals) + suffix;
      return;
    }

    if (!inView) return;

    let raf = 0;
    let startTime: number;
    const duration = 2000; // 2 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = easeProgress * value;

      if (nodeRef.current) {
        nodeRef.current.textContent = current.toFixed(decimals) + suffix;
      }

      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, suffix, decimals, reduced]);

  return (
    <span ref={nodeRef} className="tabular-nums inline-block">
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const STATS: {
  prefix?: string;
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
  desc: string;
}[] = [
  { value: 190, suffix: "M+", label: "Women Affected", desc: "Worldwide" },
  { value: 10, suffix: "%", label: "Global Prevalence", desc: "Of Reproductive Age" },
  { prefix: "$", value: 200, suffix: "B", label: "Economic Burden", desc: "Annual Cost in US" },
  { value: 8, suffix: "yr", decimals: 0, label: "Avg Diagnosis Delay", desc: "Years of Suffering" },
];

export default function ImpactSection() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      className="text-white border-b border-white/10 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(70% 55% at 76% 18%, rgba(201,169,97,0.12), transparent 62%), linear-gradient(180deg, #4A3F5C, #2E263A 70%)",
      }}
    >
      {/* Static grain — fine dot texture, no drift */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* One confident luminous accent — static warm glow behind the figures */}
      <div
        aria-hidden
        className="absolute top-16 -left-32 w-[36rem] h-[36rem] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,169,97,0.10) 0%, transparent 65%)" }}
      />

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="reveal-rise" style={{ animationDelay: "0.1s" }}>
              <Eyebrow className="mb-8 block font-sans">Impact</Eyebrow>
              <h2
                className="text-5xl md:text-8xl font-serif font-bold mb-12 tracking-tighter leading-none"
                style={{ textWrap: "balance" }}
              >
                Why It <br /> <span className="italic text-gold-primary">Matters</span>
              </h2>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-16 border-t border-white/10 pt-12 mt-12">
              {STATS.map((stat, index) => (
                <div
                  key={index}
                  className="reveal-rise relative group"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-gold-primary/0 via-gold-primary/30 to-gold-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="text-5xl md:text-6xl font-light text-white mb-2 font-serif tracking-tighter tabular-nums group-hover:text-gold-primary transition-colors duration-500">
                    {stat.prefix ? <span>{stat.prefix}</span> : null}
                    <Counter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                      reduced={reduced}
                    />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gold-primary mb-1">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-white/60 font-mono uppercase tracking-wider">
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between lg:pl-12">
            <p
              className="reveal-rise text-2xl md:text-4xl text-white/90 leading-tight font-normal mb-16 font-sans border-l-2 border-gold-primary pl-8"
              style={{ animationDelay: "0.15s" }}
            >
              Endometriosis affects over{" "}
              <span className="text-white font-bold">190 million women</span> and remains one of
              the leading causes of pain and infertility worldwide.
            </p>

            <div className="grid grid-cols-1 gap-6">
              {/* Card 1 */}
              <div
                className="reveal-rise group relative bg-white/5 border border-white/10 p-8 md:p-10 rounded-xl overflow-hidden hover:border-gold-primary/30 hover:-translate-y-1 hover:shadow-gold-glow-sm transition-all duration-500"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-plum-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-gold-primary/10 transition-all duration-500 flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-gold-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-gold-primary transition-colors duration-300">
                      The Diagnostic Gap
                    </h3>
                    <p className="text-white/70 leading-relaxed font-sans">
                      Most patients face years of diagnostic delays and limited treatment options.
                      We are changing that with the first non-invasive diagnostic.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div
                className="reveal-rise group relative bg-white/5 border border-white/10 p-8 md:p-10 rounded-xl overflow-hidden hover:border-gold-primary/30 hover:-translate-y-1 hover:shadow-gold-glow-sm transition-all duration-500"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-plum-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-gold-primary/10 transition-all duration-500 flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-gold-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-gold-primary transition-colors duration-300">
                      Curative Potential
                    </h3>
                    <p className="text-white/70 leading-relaxed font-sans">
                      A disease-modifying therapy with curative potential, built to detect and
                      treat the root cause of disease, not just the symptoms.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-rise mt-12 text-right" style={{ animationDelay: "0.5s" }}>
              <Link
                href="/impact"
                className="inline-flex items-center group text-lg text-white hover:text-gold-primary transition-colors font-sans"
              >
                <span className="border-b border-gold-primary pb-1">Read Full Impact Report</span>
                <span className="ml-3 transform group-hover:translate-x-2 transition-transform duration-300">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
