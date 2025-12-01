"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";

// Reusable progress bar component
const PipelineItem = ({ 
  title, 
  description, 
  phase, 
  color = "bg-plum-primary",
  delay = 0 
}: { 
  title: string, 
  description: string, 
  phase: string,
  color?: string,
  delay?: number
}) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="group relative p-6 bg-white/50 backdrop-blur-sm border border-plum-primary/5 rounded-sm hover:bg-white hover:shadow-lg hover:border-plum-primary/10 transition-all duration-300"
  >
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-lg font-bold text-plum-dark font-sans group-hover:text-plum-primary transition-colors">{title}</h3>
      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${color.replace('bg-', 'bg-').replace('primary', 'primary/10')} ${color.replace('bg-', 'text-')}`}>
        {phase}
      </span>
    </div>
    <p className="text-gray-therapeutics font-normal font-sans text-sm mb-4">{description}</p>
    
    {/* Animated Progress Line */}
    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
        className={`h-full ${color} opacity-50`}
      />
    </div>
  </motion.div>
);

function PeptideEngine() {
  const [activeSector, setActiveSector] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const peptideRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D rotation
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate angle for sector highlighting
    // Note: atan2 returns angle in radians from -PI to PI
    // We want 0 at top (-90 deg), so we adjust
    const angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    // Convert to 0-360 starting from top (12 o'clock)
    const normalizedAngle = (angle + 90 + 360) % 360;

    // Update active sector based on angle
    // 0-120: Sector 0 (Top-Right/Right)
    // 120-240: Sector 1 (Bottom)
    // 240-360: Sector 2 (Top-Left)
    // Adjusting to match visual layout of 3 sectors
    if (normalizedAngle >= 330 || normalizedAngle < 90) {
        setActiveSector(0);
    } else if (normalizedAngle >= 90 && normalizedAngle < 210) {
        setActiveSector(1);
    } else {
        setActiveSector(2);
    }

    // Update rotation for the peptide core based on mouse position
    // Map X/Y to rotation angles
    if (peptideRef.current) {
        const rotateY = (mouseX / rect.width) * 60; // -30 to 30 degrees
        const rotateX = -(mouseY / rect.height) * 60; // -30 to 30 degrees
        peptideRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

  }, []);

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Resume auto-rotation logic if we want to reset or drift back
    if (peptideRef.current) {
        peptideRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
    }
  };

  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setActiveSector((prev) => (prev + 1) % 3);
    }, 4000); // Slower cycle
    return () => clearInterval(interval);
  }, [isHovering]);

  const sectors = [
    { name: "Endometriosis", color: "#3A2E45", label: "Non-Hormonal", status: "Clinical" },
    { name: "Diagnostics", color: "#3A8E82", label: "Imaging Agent", status: "Ready" },
    { name: "Oncology", color: "#C9A961", label: "Solid Tumors", status: "Pre-Clinical" }
  ];

  return (
    <div 
        ref={containerRef}
        className="w-full h-full relative overflow-hidden bg-gradient-to-br from-white to-gray-50 font-sans cursor-crosshair"
        onMouseMove={(e) => {
            setIsHovering(true);
            handleMouseMove(e);
        }}
        onMouseLeave={handleMouseLeave}
    >
      
      {/* Central Mechanism - Glassmorphism */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <div className="relative w-72 h-72 flex items-center justify-center">
            {/* Rotating Ring - Trails (Slower) */}
            <motion.div 
               className="absolute inset-0 border border-gray-200 rounded-full opacity-30"
               animate={{ rotate: 360 }}
               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
               className="absolute inset-4 border border-gray-300/50 rounded-full border-dashed"
               animate={{ rotate: -360 }}
               transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Active Sector Highlight Ring - Glow */}
            <motion.div 
               className="absolute inset-0 rounded-full border-2 border-transparent"
               style={{ 
                  borderTopColor: sectors[activeSector].color,
                  filter: `drop-shadow(0 0 10px ${sectors[activeSector].color}40)`
               }}
               animate={{ rotate: activeSector * 120 }}
               transition={{ duration: 0.6, ease: "circOut" }}
            />

            {/* Central Peptide Core - Reactive 3D */}
            <motion.div 
                className="absolute w-36 h-36 bg-white/80 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex items-center justify-center border border-white z-10 overflow-hidden"
                style={{ 
                   perspective: '1000px',
                   top: '50%',
                   left: '50%',
                   x: '-50%',
                   y: '-50%'
                }}
                animate={{
                   x: isHovering ? (activeSector === 0 ? "-50%" : activeSector === 1 ? "calc(-50% + 15px)" : "calc(-50% - 15px)") : "-50%",
                   y: isHovering ? (activeSector === 0 ? "calc(-50% - 15px)" : "calc(-50% + 10px)") : "-50%",
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
               <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />
               
               <div
                  ref={peptideRef}
                  className="relative w-24 h-24 preserve-3d transition-transform duration-200 ease-out"
                  style={{ transformStyle: 'preserve-3d' }}
               >
                  {/* Bonds - Floating/Hanging */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" style={{ transform: 'translateZ(-10px)' }}>
                     {[
                        // Bonds hanging to the side of atoms, not connecting - Octagon with variation
                        { x1: "41%", y1: "4%", x2: "40%", y2: "-6%", rotation: -5, cx: "40.5%", cy: "-1%", atomX: 42, atomY: 8 }, // Top atom bond - slight left variation
                        { x1: "65.5%", y1: "16%", x2: "73%", y2: "7%", rotation: 8, cx: "69.25%", cy: "11.5%", atomX: 64.6, atomY: 17.4 }, // Top-Right bond - longer extension
                        { x1: "76%", y1: "38%", x2: "86%", y2: "36%", rotation: -3, cx: "81%", cy: "37%", atomX: 74, atomY: 40 }, // Right bond - slight angle variation
                        { x1: "66%", y1: "64%", x2: "74%", y2: "74%", rotation: 12, cx: "70%", cy: "69%", atomX: 64.6, atomY: 62.6 }, // Bottom-Right bond - shorter, different angle
                        { x1: "43%", y1: "74%", x2: "43%", y2: "83%", rotation: 4, cx: "43%", cy: "78.5%", atomX: 42, atomY: 72 }, // Bottom atom bond - slight right variation
                        { x1: "18%", y1: "64%", x2: "8%", y2: "72%", rotation: -10, cx: "13%", cy: "68%", atomX: 19.4, atomY: 62.6 }, // Bottom-Left bond - different angle
                        { x1: "8%", y1: "38%", x2: "-2%", y2: "38%", rotation: 6, cx: "3%", cy: "38%", atomX: 10, atomY: 40 }, // Left bond - slight vertical offset
                        { x1: "18.5%", y1: "15%", x2: "10%", y2: "5%", rotation: -8, cx: "14.25%", cy: "10%", atomX: 19.4, atomY: 17.4 }, // Top-Left bond - longer extension
                     ].map((bond, i) => (
                        <g key={i}>
                           <motion.line 
                              x1={bond.x1} y1={bond.y1} x2={bond.x2} y2={bond.y2} 
                              stroke="#2A2A2A" 
                              strokeWidth="5" 
                              strokeLinecap="round" 
                              opacity="0.3"
                              transform={`rotate(${bond.rotation} ${bond.cx} ${bond.cy})`}
                           />
                           {/* Dashed line connecting bond to atom */}
                           <motion.line 
                              x1={bond.x1} y1={bond.y1} x2={`${bond.atomX}%`} y2={`${bond.atomY}%`}
                              stroke="#2A2A2A" 
                              strokeWidth="2" 
                              strokeDasharray="3 3"
                              strokeLinecap="round" 
                              opacity="0.2"
                           />
                        </g>
                     ))}
                  </svg>

                  {/* Atoms - Clean Ring Centered - Regular Octagon */}
                  {[
                     { x: 42, y: 8, color: "#9F8CA6" }, // Top (Plum)
                     { x: 64.6, y: 17.4, color: "#D6B65F" }, // Top-Right (Gold)
                     { x: 74, y: 40, color: "#8C7A6B" }, // Right (Brown)
                     { x: 64.6, y: 62.6, color: "#5D4E60" }, // Bottom-Right (Dark Plum)
                     { x: 42, y: 72, color: "#D6B65F" }, // Bottom (Gold)
                     { x: 19.4, y: 62.6, color: "#5D4E60" }, // Bottom-Left (Dark Plum)
                     { x: 10, y: 40, color: "#9F8CA6" }, // Left (Plum)
                     { x: 19.4, y: 17.4, color: "#D6B65F" }  // Top-Left (Gold)
                  ].map((atom, i) => (
                     <motion.div 
                        key={i} 
                        className="absolute w-4 h-4 rounded-full"
                        style={{
                           background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${atom.color} 60%, #1a1a1a 100%)`,
                           top: `${atom.y}%`,
                           left: `${atom.x}%`,
                           transform: 'translate(-50%, -50%)',
                           boxShadow: `0 4px 10px rgba(0,0,0,0.3)`
                        }}
                        animate={{ 
                           scale: [1, 1.1, 1],
                           z: [0, 10, 0]
                        }}
                        transition={{ 
                           duration: 3, 
                           repeat: Infinity, 
                           delay: i * 0.5,
                           ease: "easeInOut"
                        }}
                     />
                  ))}
               </div>
            </motion.div>
         </div>
      </div>

      {/* Sector Nodes - Enhanced */}
      {sectors.map((sector, i) => {
         const isActive = activeSector === i;
         const angle = (i * 120 - 90) * (Math.PI / 180);
         const radius = 150;
         const x = 50 + (radius / 3.5) * Math.cos(angle); 
         const y = 50 + (radius / 4) * Math.sin(angle);

         return (
            <motion.div
               key={i}
               className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 cursor-pointer"
               style={{ left: `${x}%`, top: `${y}%` }}
               animate={{ scale: isActive ? 1.1 : 0.9, opacity: isActive ? 1 : 0.4 }}
               onClick={() => setActiveSector(i)}
            >
               <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-500 border border-white/50"
                  style={{ 
                     backgroundColor: isActive ? `${sector.color}10` : 'rgba(255,255,255,0.8)',
                     borderColor: isActive ? sector.color : '#E5E7EB',
                     boxShadow: isActive ? `0 10px 30px -10px ${sector.color}60` : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
               >
                  <div 
                     className="w-3 h-3 rounded-full transition-colors duration-500"
                     style={{ 
                        backgroundColor: sector.color,
                        boxShadow: `0 0 10px ${sector.color}`
                     }} 
                  />
               </div>
               <div className="mt-5 text-center pointer-events-none space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] block transition-colors duration-500 leading-tight" style={{ color: isActive ? sector.color : '#9CA3AF' }}>
                     {sector.name}
                  </span>
                  <span className="text-[9px] text-gray-500 font-normal block leading-tight">{sector.label}</span>
                  
                  {isActive && (
                     <motion.div 
                        initial={{ opacity: 0, y: -5 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2.5 px-3.5 py-1.5 bg-black-primary text-white text-[9px] font-bold uppercase tracking-wider rounded-full shadow-lg"
                     >
                        {sector.status}
                     </motion.div>
                  )}
               </div>
            </motion.div>
         );
      })}

      {/* Data Stream Overlay - Monospace */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none">
         <div className="text-[9px] font-mono text-gray-500/90 space-y-1">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               <span className="tracking-[0.1em]">PLATFORM ACTIVE</span>
            </div>
            <div className="tracking-[0.05em]">CYCLE: {activeSector + 1}/3</div>
         </div>
         <motion.div 
            key={activeSector}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-right space-y-2"
         >
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] mb-0.5 leading-tight" style={{ color: sectors[activeSector].color }}>
               Key Characteristic
            </div>
            <div className="text-2xl font-serif italic text-black-primary tracking-tight leading-tight">
               {activeSector === 0 ? 'High Specificity' : activeSector === 1 ? 'High Contrast' : 'Tumor Selective'}
            </div>
         </motion.div>
      </div>
      
      {/* Grid Texture */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none mix-blend-multiply" />
    </div>
  );
}

export default function PipelinePreview() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="bg-gradient-to-b from-[#E8E4F0] via-[#E0DBEA] to-[#D8D1E4] border-b border-black-primary relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/20 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Dynamic Visual Visualization */}
          <motion.div 
            style={{ y }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 relative aspect-[4/5] bg-white border border-black-primary/10 shadow-2xl rounded-sm overflow-hidden group hover:shadow-[0_30px_60px_rgba(58,46,69,0.15)] transition-all duration-700 ring-1 ring-black/5"
          >
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
               {/* Abstract Molecules */}
               <div className="relative w-full h-full">
                 <PeptideEngine />
                 
                 {/* Top Overlay Label */}
                 <div className="absolute top-0 w-full px-8 pt-10 pb-6 z-20 pointer-events-none">
                   <motion.div 
                     initial={{ opacity: 0, y: -10 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.3, duration: 0.6 }}
                     className="inline-block"
                   >
                     <div className="text-2xl font-serif italic mb-2 text-plum-dark relative leading-tight">
                        Precision Medicine
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "3rem" }}
                          transition={{ delay: 0.6, duration: 0.8 }}
                          className="absolute -bottom-2.5 left-0 h-[2px] bg-gold-primary/80" 
                        />
                     </div>
                     <div className="text-[10px] font-sans font-semibold text-plum-primary/70 uppercase tracking-[0.2em] mt-4 leading-tight">Targeting the untargetable</div>
                   </motion.div>
                 </div>
               </div>
             </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 flex flex-col relative z-10"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-plum-primary mb-8 block font-sans">
              Therapeutics & Diagnostics
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-plum-dark mb-12 tracking-tighter leading-[0.9]">
              Our <br/> <span className="italic text-gold-primary">Pipeline</span>
            </h2>
            
            <div className="space-y-8 mb-12">
              <p className="text-xl text-black-soft leading-relaxed font-normal border-l-2 border-gold-primary pl-6 font-sans">
                Redefining care in endometriosis and oncology through a robust pipeline of first-in-class candidates.
              </p>
              
              <div className="space-y-4 pt-8">
                <PipelineItem 
                  title="ENDO-205 & FemLUNA"
                  description="Non-hormonal therapeutic and precision imaging for endometriosis."
                  phase="Phase 1 Ready"
                  color="bg-plum-primary"
                  delay={0.2}
                />
                <PipelineItem 
                  title="ENDO-995 & ENDO-311"
                  description="Targeting 25% of malignant solid tumors and colorectal cancer."
                  phase="Pre-Clinical"
                  color="bg-gold-primary"
                  delay={0.4}
                />
              </div>
            </div>

            <div>
              <Link 
                href="/pipeline"
                className="group inline-flex items-center px-10 py-5 bg-plum-primary text-white text-sm font-bold uppercase tracking-widest hover:bg-gold-primary transition-all duration-300 font-sans rounded-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="flex items-center">
                  View Pipeline
                  <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
