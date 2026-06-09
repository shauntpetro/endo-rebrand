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

const SystemicMap = dynamic(() => import("@/components/SystemicMap"), {
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-primary/20 to-gold-primary/5 animate-pulse" />
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
    value: "$200B+",
    label: "Annual Economic Burden",
    description: "Estimated global cost in direct medical expenses and lost productivity.",
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yForeground = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <main ref={containerRef} className="min-h-screen bg-cream-primary flex flex-col font-sans overflow-x-hidden selection:bg-plum-primary selection:text-white">
      <Navbar />

      {/* Hero Section - Immersive Parallax */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-cream-primary overflow-hidden pt-24 md:pt-32 pb-12 md:pb-20">
        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply">
             <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-50 brightness-100 contrast-150" />
        </div>
        
        {/* Ambient Gradients */}
        <div className="absolute top-0 left-0 w-[70vw] h-[70vw] bg-plum-primary/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[70vw] h-[70vw] bg-gold-primary/10 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-plum-primary/10 rounded-full bg-white/40 backdrop-blur-md mb-8 shadow-sm"
                >
                    <span className="w-2 h-2 rounded-full bg-gold-primary animate-pulse" />
                    <Eyebrow tone="plum">
                        Global Health Crisis
                    </Eyebrow>
                </motion.div>
                
                {/* Massive Parallax Background Text */}
                <motion.div
                    style={{ y: yBackground }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none select-none z-0 flex items-center justify-center will-change-transform"
                >
                     <span className="text-[22vw] md:text-[28vw] font-serif font-bold text-plum-primary/[0.03] leading-none whitespace-nowrap blur-[2px]">
                        1 in 10
                     </span>
                </motion.div>
                
                <h1 className="relative z-10 text-6xl md:text-8xl lg:text-[9rem] font-serif font-bold text-plum-primary mb-8 leading-[0.9] tracking-tight">
                    The Silent <br />
                    <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-plum-primary via-plum-primary to-gold-primary pr-4 pb-2">Epidemic</span>
                </h1>
                
                <motion.p
                    style={{ y: yForeground }}
                    className="relative z-10 text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed mb-12 will-change-transform"
                >
                    Endometriosis affects an estimated <span className="font-semibold text-plum-primary">190 million</span> women and girls globally. 
                    It is a systemic disease that demands systemic change.
                </motion.p>

                <motion.div 
                    className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Link href="/contact?subject=report" className="group relative inline-flex px-8 py-4 bg-plum-primary text-white text-sm font-bold uppercase tracking-widest rounded-xl overflow-hidden shadow-xl shadow-plum-primary/20 w-full md:w-auto">
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        <span className="relative z-10 flex items-center gap-2">
                            Request the Report <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
      </section>

      {/* Achievement Bar - Scrolling */}
      <AchievementBar theme="light" />

      {/* Elevated Stats Section - Floating Cards */}
      <section className="py-32 bg-gradient-to-b from-cream-primary to-white relative">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                        className={`
                            relative p-8 md:p-10 bg-white rounded-xl border border-gray-100
                            shadow-sm hover:shadow-[0_8px_40px_rgba(201,169,97,0.12)]
                            hover:border-gold-primary/20
                            transition-all duration-500 group
                            ${stat.colSpan || ""}
                        `}
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="w-2 h-2 rounded-full bg-gold-primary" />
                        </div>
                        
                        <h3 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-plum-primary group-hover:scale-[1.02] transition-transform duration-500 origin-left">
                            {stat.value}
                        </h3>
                        
                        <div className="h-px w-12 bg-gray-200 my-6 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-gold-primary group-hover:to-transparent transition-all duration-700" />
                        
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-3 text-gray-400 group-hover:text-plum-primary transition-colors">
                            {stat.label}
                        </h4>
                        <p className="text-base text-gray-600 font-light leading-relaxed">
                            {stat.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* "The Spiral" - Visual Narrative */}
      <section className="py-40 bg-white relative overflow-hidden">
        {/* Abstract Spiral Background */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5 pointer-events-none">
             <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_60s_linear_infinite] text-plum-primary hover:text-gold-primary transition-colors duration-[3000ms]">
                <path d="M50,50 m0,-45 a45,45 0 1,1 0,90 a45,45 0 1,1 0,-90" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-plum-primary" />
                <path d="M50,50 m0,-35 a35,35 0 1,1 0,70 a35,35 0 1,1 0,-70" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-plum-primary" />
                <path d="M50,50 m0,-25 a25,25 0 1,1 0,50 a25,25 0 1,1 0,-50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-plum-primary" />
             </svg>
        </div>

        <div className="container mx-auto max-w-6xl px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                     <div className="flex items-center gap-4 mb-8">
                        <span className="text-gold-primary text-sm font-bold uppercase tracking-widest">The Reality</span>
                        <div className="h-px w-12 bg-gold-primary" />
                     </div>
                     
                     <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 text-plum-primary leading-tight">
                        &ldquo;This is where the <br/> <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-plum-primary pr-4">spiral</span> begins.&rdquo;
                    </h2>
                    
                    <div className="prose prose-lg text-gray-600 font-light leading-relaxed">
                        <p className="mb-6">
                            Symptoms are often misattributed or ignored. Many women are repeatedly diagnosed with urinary tract infections when the real culprit is endometriosis infiltrating the bladder.
                        </p>
                        <p>
                            They are given rounds of antibiotics, and left wondering why the pain never goes away.
                        </p>
                    </div>

                    <div className="mt-12 p-8 bg-cream-primary/50 rounded-xl border-l-2 border-plum-primary">
                        <p className="text-xl font-serif italic text-plum-primary mb-6">
                            &ldquo;They&apos;re given treatment after treatment that doesn&apos;t work, because no one&apos;s looking at the disease underneath.&rdquo;
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative">
                                <div className="absolute inset-0 bg-plum-primary/10 flex items-center justify-center text-xs font-bold text-plum-primary">TP</div>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-plum-primary">Dr. Tanya Petrossian</p>
                                <p className="text-xs text-gray-500">CEO, Founder, and Inventor</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative h-[280px] sm:h-[400px] md:h-[600px] bg-gray-50 rounded-xl overflow-hidden shadow-2xl"
                >
                    {/* Background image with data overlay */}
                    <div className="absolute inset-0 bg-[url('/standard-mri.webp')] bg-cover bg-center opacity-20 mix-blend-multiply grayscale" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-plum-primary/5 to-plum-primary/20" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-10">
                        <h3 className="text-3xl font-serif text-plum-primary mb-2">Diagnostic Delay</h3>
                        <p className="text-6xl font-bold text-plum-primary mb-4">7-10 <span className="text-2xl font-normal text-gray-500">Years</span></p>
                        <p className="text-gray-600 text-sm max-w-xs">
                            The average time it takes for a woman to receive a proper diagnosis for endometriosis.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* Systemic Map & Comorbidities - High Contrast */}
      <section className="min-h-screen py-32 bg-plum-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-plum-dark/80 z-0" />
        <DitherOverlay />
        
        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-24">
                <span className="text-gold-primary font-bold tracking-[0.2em] uppercase text-sm mb-6 block">
                    Beyond the Pelvis
                </span>
                <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
                    A Systemic Crisis
                </h2>
                <p className="text-xl text-gray-300 font-light leading-relaxed">
                    Endometriosis is not a surface-level condition. In 13 to 30 percent of cases, it spreads beyond the pelvic cavity, including to the appendix, where it can cause inflammation and even appendicitis.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                {/* Map - Floating */}
                <div className="lg:col-span-5 h-[400px] md:h-[600px] relative">
                     <div className="absolute inset-0 bg-plum-dark/50 rounded-full blur-3xl -z-10" />
                     <SystemicMap theme="dark" />
                </div>

                {/* Comorbidities List - Interactive */}
                <div className="lg:col-span-7 space-y-4">
                    <h3 className="text-3xl font-serif italic text-white mb-12">Linked Comorbidities & Risks</h3>
                    
                    {comorbidities.map((group, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="group relative p-6 md:p-8 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm"
                        >
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-full bg-plum-dark border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <group.icon className="w-5 h-5 text-gold-primary" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-gold-primary font-bold uppercase tracking-widest text-sm mb-4 group-hover:text-white transition-colors">{group.category}</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {group.items.map((item, j) => (
                                            <motion.span
                                                key={j}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.15 + j * 0.05, duration: 0.3 }}
                                                className="px-4 py-1.5 bg-white/5 rounded-full text-sm text-gray-300 font-light border border-white/10 group-hover:border-gold-primary/30 hover:bg-white/10 transition-all duration-300"
                                            >
                                                {item}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    
                    <p className="mt-12 text-sm text-gray-400 italic border-t border-white/10 pt-8 max-w-lg">
                        &ldquo;A small percentage of patients develop endometriosis-associated ovarian cancer, a rare but serious malignancy that often arises from deep or longstanding disease.&rdquo;
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Erosion of Identity Section - Cinematic */}
      <section className="py-40 px-6 relative overflow-hidden flex items-center justify-center bg-cream-primary">
        {/* Subtle Background Image */}
        <div className="absolute inset-0 bg-[url('/Female-Body-Silhouette.svg')] bg-no-repeat bg-[right_-10%_center] bg-contain opacity-[0.03] mix-blend-multiply pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
            >
                <span className="text-plum-primary/40 text-9xl font-serif absolute -top-20 left-1/2 -translate-x-1/2 select-none opacity-20">
                    Identity
                </span>
                
                <h2 className="text-4xl md:text-6xl font-serif font-bold mb-12 text-plum-primary">The Erosion of Identity</h2>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative p-12 md:p-20 bg-white shadow-2xl shadow-plum-primary/5 rounded-xl border-y-4 border-gold-primary/20 hover:shadow-[0_25px_80px_rgba(74,63,92,0.1)] transition-shadow duration-700"
                >
                    <div className="absolute top-8 left-8 text-6xl font-serif text-gold-primary/20 leading-none">“</div>
                    <blockquote className="text-2xl md:text-4xl font-serif italic text-plum-dark leading-relaxed relative z-10">
                        It’s not just pelvic pain. It’s the erosion of confidence, of identity, of opportunity. It makes it harder to show up to work. Harder to start a family. Harder to live your life the way you imagined.
                    </blockquote>
                    <div className="mt-12 flex items-center justify-center gap-4">
                        <div className="h-px w-12 bg-gold-primary/50" />
                        <div className="text-gold-primary text-xs font-bold uppercase tracking-[0.2em]">Dr. Tanya Petrossian</div>
                        <div className="h-px w-12 bg-gold-primary/50" />
                    </div>
                </motion.div>
            </motion.div>
        </div>
      </section>

      {/* Economic Impact Footer */}
      <section className="py-32 bg-plum-dark text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('/file.svg')] opacity-5 mix-blend-overlay scale-150 rotate-12" />
         <DitherOverlay />
         
         <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">The Cost is Staggering</h2>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-16 font-light leading-relaxed">
                    &ldquo;Each lesion triggers inflammation and a cascade of signaling that spreads beyond the tissue itself. We can&apos;t treat endometriosis as if it&apos;s isolated. The impact is global.&rdquo;
                </p>
                
                <div className="inline-block relative group">
                    <motion.div
                        className="absolute -inset-1 bg-gradient-to-r from-gold-primary to-plum-primary rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"
                        animate={{ opacity: [0.15, 0.3, 0.15] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="relative border border-white/10 px-12 py-8 rounded-lg bg-plum-dark backdrop-blur-xl">
                        <div className="flex flex-col md:flex-row items-baseline gap-2 md:gap-4">
                            <span className="text-gold-primary font-bold text-5xl md:text-7xl tracking-tighter">$200 Billion+</span>
                            <span className="text-gray-400 uppercase tracking-[0.2em] text-sm font-bold">Annually</span>
                        </div>
                    </div>
                </div>
            </motion.div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
