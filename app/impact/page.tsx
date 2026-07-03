"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AchievementBar from "@/components/AchievementBar";
import { DitherOverlay } from "@/components/DitherOverlay";
import { Activity, Heart, AlertCircle, ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DotGrid } from "@/components/ui/DotGrid";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SystemicMap = dynamic(() => import("@/components/SystemicMap"), {
  loading: () => (
    <div role="status" aria-label="Loading visualization" className="w-full h-[500px] flex items-center justify-center">
      <div aria-hidden="true" className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-primary/20 to-gold-primary/5 animate-pulse" />
    </div>
  ),
});

const stats = [
  {
    id: 1,
    value: ">190M",
    label: "Women & Girls Worldwide",
    description: "Affected globally. Endometriosis is not rare, and it is not minor.",
    colSpan: "md:col-span-2"
  },
  {
    id: 2,
    value: ">7.5M",
    label: "Living in the US",
    description: "A major public health crisis affecting millions in the United States alone.",
    colSpan: "md:col-span-1"
  },
  {
    id: 3,
    value: "#1",
    label: "Cause of Infertility",
    description: "The leading factor preventing natural conception in women.",
    colSpan: "md:col-span-1"
  },
  {
    id: 4,
    value: ">76",
    label: "Linked Comorbidities",
    description: "Including autoimmune, inflammatory bowel, and cardiovascular diseases.",
    colSpan: "md:col-span-1"
  },
  {
    id: 5,
    value: "$200B",
    label: "Annual Economic Burden",
    description: "The estimated annual US cost in direct medical care and lost productivity.",
    colSpan: "md:col-span-1"
  }
];

const comorbidities = [
  {
    category: "Autoimmune Diseases",
    items: ["Lupus", "Sjögren’s Syndrome", "Hashimoto’s Thyroiditis", "Rheumatoid Arthritis"],
    icon: Activity
  },
  {
    category: "Inflammatory Bowel",
    items: ["Crohn’s Disease", "Ulcerative Colitis", "IBS"],
    icon: AlertCircle
  },
  {
    category: "Cardiovascular Risks",
    items: ["Heart Attack", "Stroke", "Hypertension", "High Cholesterol"],
    icon: Heart
  }
];

export default function ImpactPage() {
  const containerRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yBackgroundRaw = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yForegroundRaw = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  // Freeze parallax to a static rest-state when the user prefers reduced motion.
  const yBackground = reduced ? "0%" : yBackgroundRaw;
  const yForeground = reduced ? "0%" : yForegroundRaw;

  return (
    <main ref={containerRef} className="min-h-screen bg-surface flex flex-col font-sans overflow-x-hidden selection:bg-plum-dark selection:text-white">
      <Navbar />

      {/* Hero Section — Luminous Editorial parallax */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 md:pt-32 pb-12 md:pb-20"
        style={{
          background:
            "radial-gradient(75% 55% at 50% 32%, rgba(201,169,97,0.16), transparent 62%), linear-gradient(180deg, #FAF6EC, #F4EEE1 60%)",
        }}
      >
        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply">
             <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-50 brightness-100 contrast-150" />
        </div>

        {/* Warm ambient light */}
        <div className="absolute top-0 left-0 w-[70vw] h-[70vw] bg-plum-primary/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[70vw] h-[70vw] bg-gold-primary/10 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center">
            <div>
                <div
                    className="reveal-rise inline-flex items-center gap-2 px-4 py-2 border border-plum-dark/10 rounded-full bg-bone-raised/70 backdrop-blur-md mb-8 shadow-sm"
                    style={{ animationDelay: "0.05s" }}
                >
                    <span aria-hidden="true" className="w-2 h-2 rounded-full bg-gold-primary" />
                    <Eyebrow tone="plum">
                        Global Health Crisis
                    </Eyebrow>
                </div>

                {/* Massive Parallax Background Text — decorative, transform-only */}
                <motion.div
                    aria-hidden="true"
                    style={{ y: yBackground }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none select-none z-0 flex items-center justify-center will-change-transform"
                >
                     <span className="text-[22vw] md:text-[28vw] font-serif font-bold text-plum-primary/[0.05] leading-none whitespace-nowrap">
                        1 in 10
                     </span>
                </motion.div>

                <h1
                    className="reveal-rise relative z-10 text-6xl md:text-8xl lg:text-[9rem] font-serif font-bold text-plum-dark mb-8 leading-[0.9] tracking-tight text-balance"
                    style={{ animationDelay: "0.15s" }}
                >
                    The Silent <br />
                    <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-plum-primary via-plum-primary to-gold-deep pr-4 pb-2">Epidemic</span>
                </h1>

                <motion.div
                    style={{ y: yForeground }}
                    className="relative z-10 will-change-transform"
                >
                    <p
                        className="reveal-rise text-xl md:text-2xl text-black-soft font-light max-w-3xl mx-auto leading-relaxed mb-12"
                        style={{ animationDelay: "0.28s" }}
                    >
                        Endometriosis affects an estimated <span className="font-semibold text-plum-primary">190 million</span> women and girls globally.
                        It is a systemic disease that demands systemic change.
                    </p>
                </motion.div>

                <div
                    className="reveal-rise relative z-10 flex flex-col md:flex-row items-center justify-center gap-4"
                    style={{ animationDelay: "0.42s" }}
                >
                    <Link href="/contact?subject=report" className="group relative inline-flex px-8 py-4 bg-plum-dark text-white text-sm font-bold uppercase tracking-widest rounded-xl overflow-hidden shadow-xl shadow-plum-primary/20 w-full md:w-auto">
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        <span className="relative z-10 flex items-center gap-2">
                            Request the Report <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* Achievement Bar - Scrolling */}
      <AchievementBar theme="light" />

      {/* Elevated Stats Section — luminous cards */}
      <section
        className="py-32 relative overflow-hidden border-y border-plum-dark/10"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, rgba(201,169,97,0.10), transparent 60%), linear-gradient(180deg, #F4EEE1, #FAF6EC)",
        }}
      >
        <DotGrid />
        <div className="container mx-auto px-6 relative z-10">
            <h2 className="sr-only">Disease Burden Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {stats.map((stat, i) => (
                    <div
                        key={stat.id}
                        className={`
                            reveal-rise relative p-8 md:p-10 bg-bone-raised rounded-xl border border-plum-dark/10
                            shadow-[0_1px_0_rgba(255,255,255,0.6)_inset]
                            hover:shadow-[0_8px_40px_rgba(201,169,97,0.14)]
                            hover:border-gold-primary/40 hover:-translate-y-1
                            transition-all duration-500 group
                            ${stat.colSpan || ""}
                        `}
                        style={{ animationDelay: `${0.15 + i * 0.1}s` }}
                    >
                        {/* One warm accent rule — hairline gold, widens on hover */}
                        <span className="absolute top-0 left-0 h-[2px] w-12 bg-gold-primary transition-all duration-500 group-hover:w-full" />

                        <p className="text-5xl md:text-6xl font-serif font-bold mb-4 text-plum-dark tabular-nums group-hover:scale-[1.02] transition-transform duration-500 origin-left">
                            {stat.value}
                        </p>

                        <div className="h-px w-12 bg-plum-dark/15 my-6 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-gold-primary group-hover:to-transparent transition-all duration-700" />

                        <h3 className="text-sm font-bold uppercase tracking-widest mb-3 text-gold-deep transition-colors">
                            {stat.label}
                        </h3>
                        <p className="text-base text-black-soft font-light leading-relaxed">
                            {stat.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* "The Spiral" - Visual Narrative */}
      <section className="py-40 bg-bone-raised relative overflow-hidden">
        {/* Abstract Spiral Background — CSS spin freezes under reduced motion (globals) */}
        <div aria-hidden="true" className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.05] pointer-events-none">
             <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_60s_linear_infinite] text-plum-primary">
                <path d="M50,50 m0,-45 a45,45 0 1,1 0,90 a45,45 0 1,1 0,-90" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M50,50 m0,-35 a35,35 0 1,1 0,70 a35,35 0 1,1 0,-70" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M50,50 m0,-25 a25,25 0 1,1 0,50 a25,25 0 1,1 0,-50" fill="none" stroke="currentColor" strokeWidth="0.5" />
             </svg>
        </div>

        <div className="container mx-auto max-w-6xl px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="reveal-rise" style={{ animationDelay: "0.05s" }}>
                     <div className="flex items-center gap-4 mb-8">
                        <span className="text-gold-deep text-sm font-bold uppercase tracking-widest">The Reality</span>
                        <div className="h-px w-12 bg-gold-primary" />
                     </div>

                     <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 text-plum-dark leading-tight text-balance">
                        &ldquo;This is where the <br/> <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold-deep to-plum-primary pr-4">spiral</span> begins.&rdquo;
                    </h2>

                    <div className="prose prose-lg text-black-soft font-light leading-relaxed">
                        <p className="mb-6">
                            Symptoms are often misattributed or ignored. Many women are repeatedly diagnosed with urinary tract infections when the real culprit is endometriosis infiltrating the bladder.
                        </p>
                        <p>
                            They are given rounds of antibiotics, and left wondering why the pain never goes away.
                        </p>
                    </div>

                    <div className="mt-12 p-8 bg-surface/70 rounded-xl border-l-2 border-gold-primary">
                        <p className="text-xl font-serif italic text-plum-dark mb-6">
                            &ldquo;They&apos;re given treatment after treatment that doesn&apos;t work, because no one&apos;s looking at the disease underneath.&rdquo;
                        </p>
                        <div className="flex items-center gap-4">
                            <div aria-hidden="true" className="w-12 h-12 rounded-full bg-plum-primary/10 overflow-hidden relative">
                                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-plum-primary">TP</div>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-plum-dark">Dr. Tanya Petrossian</p>
                                <p className="text-xs text-black-soft/70">CEO, Founder, and Inventor</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="reveal-rise relative h-[280px] sm:h-[400px] md:h-[600px] bg-surface rounded-xl overflow-hidden border border-plum-dark/10 shadow-[0_20px_60px_rgba(74,63,92,0.08)]"
                    style={{ animationDelay: "0.2s" }}
                >
                    {/* Background image with data overlay */}
                    <div className="absolute inset-0 bg-[url('/standard-mri.webp')] bg-cover bg-center opacity-20 mix-blend-multiply grayscale" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-plum-primary/5 to-plum-primary/20" />

                    <div className="absolute bottom-0 left-0 right-0 p-10">
                        <h3 className="text-3xl font-serif text-plum-dark mb-2">Diagnostic Delay</h3>
                        <p className="text-6xl font-bold text-plum-dark mb-4 tabular-nums">8 <span className="text-2xl font-normal text-black-soft/70">Years</span></p>
                        <p className="text-black-soft text-sm max-w-xs">
                            The average time it takes for a woman to receive a proper diagnosis for endometriosis.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Systemic Map & Comorbidities — plum-dark cinematic beat */}
      <section className="min-h-screen py-32 bg-plum-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-plum-dark/80 z-0" />
        <DitherOverlay />

        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-24">
                <span className="text-gold-primary font-bold tracking-[0.2em] uppercase text-sm mb-6 block">
                    Beyond the Pelvis
                </span>
                <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight text-balance">
                    A Systemic Crisis
                </h2>
                <p className="text-xl text-gray-300 font-light leading-relaxed">
                    Endometriosis is not a surface-level condition. In 13 to 30 percent of cases, it spreads beyond the pelvic cavity, including to the appendix, where it can cause inflammation and even appendicitis.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                {/* Map - Floating */}
                <div className="lg:col-span-5 h-[400px] md:h-[600px] relative">
                     <SystemicMap theme="light" />
                </div>

                {/* Comorbidities List */}
                <div className="lg:col-span-7 space-y-4">
                    <h3 className="text-3xl font-serif italic text-white mb-12">Linked Comorbidities & Risks</h3>

                    {comorbidities.map((group, i) => (
                        <div
                            key={i}
                            className="reveal-rise group relative p-6 md:p-8 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm"
                            style={{ animationDelay: `${0.1 + i * 0.12}s` }}
                        >
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-full bg-plum-dark border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <group.icon className="w-5 h-5 text-gold-primary" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-gold-primary font-bold uppercase tracking-widest text-sm mb-4 group-hover:text-white transition-colors">{group.category}</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {group.items.map((item, j) => (
                                            <span
                                                key={j}
                                                className="px-4 py-1.5 bg-white/5 rounded-full text-sm text-gray-300 font-light border border-white/10 group-hover:border-gold-primary/30 hover:bg-white/10 transition-all duration-300"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <p className="mt-12 text-sm text-gray-400 italic border-t border-white/10 pt-8 max-w-lg">
                        &ldquo;A small percentage of patients develop endometriosis-associated ovarian cancer, a rare but serious malignancy that often arises from deep or longstanding disease.&rdquo;
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Erosion of Identity Section - Cinematic */}
      <section className="py-40 px-6 relative overflow-hidden flex items-center justify-center bg-surface">
        {/* Subtle Background Image */}
        <div className="absolute inset-0 bg-[url('/Female-Body-Silhouette.svg')] bg-no-repeat bg-[right_-10%_center] bg-contain opacity-[0.03] mix-blend-multiply pointer-events-none" />

        <div className="container mx-auto max-w-5xl text-center relative z-10">
            <div className="reveal-rise relative" style={{ animationDelay: "0.05s" }}>
                <span aria-hidden="true" className="text-plum-primary/40 text-9xl font-serif absolute -top-20 left-1/2 -translate-x-1/2 select-none opacity-20">
                    Identity
                </span>

                <h2 className="text-4xl md:text-6xl font-serif font-bold mb-12 text-plum-dark text-balance">The Erosion of Identity</h2>

                <div
                    className="reveal-rise relative p-12 md:p-20 bg-bone-raised rounded-xl border-y-4 border-gold-primary/25 shadow-[0_20px_60px_rgba(74,63,92,0.08)]"
                    style={{ animationDelay: "0.18s" }}
                >
                    <div aria-hidden="true" className="absolute top-8 left-8 text-6xl font-serif text-gold-primary/25 leading-none">“</div>
                    <blockquote className="text-2xl md:text-4xl font-serif italic text-plum-dark leading-relaxed relative z-10">
                        It’s not just pelvic pain. It’s the erosion of confidence, of identity, of opportunity. It makes it harder to show up to work. Harder to start a family. Harder to live your life the way you imagined.
                    </blockquote>
                    <div className="mt-12 flex items-center justify-center gap-4">
                        <div className="h-px w-12 bg-gold-primary/50" />
                        <div className="text-gold-deep text-xs font-bold uppercase tracking-[0.2em]">Dr. Tanya Petrossian</div>
                        <div className="h-px w-12 bg-gold-primary/50" />
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Economic Impact — closing plum-dark cinematic beat */}
      <section className="py-32 bg-plum-dark text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('/file.svg')] opacity-5 mix-blend-overlay scale-150 rotate-12" />
         <DitherOverlay />
         {/* One warm luminous accent */}
         <div
           className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(201,169,97,0.14) 0%, transparent 70%)" }}
         />

         <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="reveal-rise" style={{ animationDelay: "0.05s" }}>
                <span className="text-gold-primary font-bold tracking-[0.2em] uppercase text-sm mb-6 block">
                    The Cost of Inaction
                </span>
                <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-balance">The Cost Is Staggering</h2>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                    &ldquo;Each lesion triggers inflammation and a cascade of signaling that spreads beyond the tissue itself. We can&apos;t treat endometriosis as if it&apos;s isolated. The impact is global.&rdquo;
                </p>

                <div className="mx-auto max-w-2xl border-t border-white/10 pt-12">
                    <p className="text-lg md:text-xl font-serif italic text-gold-primary leading-relaxed">
                        A systemic disease carries a systemic cost — measured not only in dollars, but in an average eight-year wait for answers.
                    </p>
                </div>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
