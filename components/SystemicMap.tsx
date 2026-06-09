"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useVisibility } from "@/hooks/useVisibility";

export default function SystemicMap({ theme = "light" }: { theme?: "light" | "dark" }) {
  const { ref: visRef, isVisible } = useVisibility();
  const [hoverNode, setHoverNode] = useState<number | null>(null);
  const [pinnedNode, setPinnedNode] = useState<number | null>(null);
  const activeNode = pinnedNode ?? hoverNode;
  const beamsActive = isVisible && activeNode === null; // pause beams while inspecting
  const isDark = theme === "dark";

  // Unified palette: plum "emitter" origin, gold "target" spread sites.
  const ORIGIN_COLOR = isDark ? "#B5A3BC" : "#4A3F5C"; // plum
  const TARGET_COLOR = "#C9A961"; // brand gold

  // Refined anatomical coordinates based on silhouette analysis (relative to the silhouette box)
  const nodes = [
    { id: 0, x: 50, y: 46, r: 14, color: ORIGIN_COLOR, label: "Pelvic Cavity", description: "Primary site of endometrial implants" },
    { id: 1, x: 50, y: 10, r: 5, color: TARGET_COLOR, label: "Brain", description: "Central sensitization and pain processing changes" },
    { id: 2, x: 45, y: 28, r: 5, color: TARGET_COLOR, label: "Right Lung", description: "Thoracic endometriosis, catamenial pneumothorax" },
    { id: 3, x: 55, y: 28, r: 5, color: TARGET_COLOR, label: "Left Lung", description: "Thoracic endometriosis, catamenial pneumothorax" },
    { id: 4, x: 50, y: 38, r: 7, color: TARGET_COLOR, label: "Abdomen", description: "Peritoneal implants and adhesions" },
    { id: 5, x: 53, y: 43, r: 5, color: TARGET_COLOR, label: "Bowel", description: "Intestinal lesions affecting motility" },
    { id: 6, x: 46, y: 45, r: 5, color: TARGET_COLOR, label: "Right Ovary", description: "Endometriomas, associated malignancy risk" },
    { id: 7, x: 54, y: 45, r: 5, color: TARGET_COLOR, label: "Left Ovary", description: "Endometriomas, associated malignancy risk" },
    { id: 8, x: 44, y: 56, r: 4, color: TARGET_COLOR, label: "Right Sciatic", description: "Cyclical sciatica from nerve involvement" },
    { id: 9, x: 56, y: 56, r: 4, color: TARGET_COLOR, label: "Left Sciatic", description: "Cyclical sciatica from nerve involvement" },
  ];

  // Get active node data
  const activeNodeData = activeNode !== null ? nodes.find(n => n.id === activeNode) : null;

  // Detailed Female Body Silhouette Path
  const silhouettePath = "M736.728,849.786c-0.634-1.435-13.566-15.425-33.487-23.292c-4.568-1.94-4.545,2.705-16.944-34.925c-26.957-72.647-5.661-112.736-51.135-200.791c-6.888-14.322-9.901-24.921-16.16-50.12c-25.397-104.478-6.032-90.98-15.87-135.251c-17.961-63.049-50.754-59.498-71.782-59.155c-16.944,0.378-45.224-11.699-52.936-19.746c-10.555-11.486-17.912-20.548-11.679-58.855c0,0,7.037-12.141,9.078-34.125c9.284,11.287,24.572-33.84,16.065-42.691c-1.745-1.867-5.169-1.236-6.289,1.015c-1.292,1.484-1.315,3.695-2.888,4.964c-2-9.359,3.289-28.498-7.935-56.968c-5.541-12.289-11.235-15.496-21.547-22.44c-8.401-6.048-28.842-7.595-29.842-7.717h-9.461c-1,0.122-21.441,1.669-29.842,7.717c-10.312,6.944-16.006,10.151-21.547,22.44c-11.224,28.47-5.935,47.609-7.935,56.968c-1.573-1.269-1.596-3.48-2.888-4.964c-1.12-2.251-4.544-2.882-6.289-1.015c-8.507,8.851,6.781,53.978,16.065,42.691c2.041,21.984,9.078,34.125,9.078,34.125c6.233,38.307-1.124,47.369-11.679,58.855c-7.712,8.047-35.992,20.124-52.935,19.746c-21.029-0.343-53.822-3.894-71.782,59.155c-9.838,44.271,9.527,30.773-15.87,135.251c-6.259,25.199-9.272,35.798-16.16,50.12c-45.474,88.055-24.178,128.144-51.135,200.791c-12.399,37.63-12.376,32.985-16.944,34.925c-19.921,7.867-32.853,21.857-33.487,23.292c-8.923,20.454-23.328,27.412-19.921,33.844c0.896,1.702,3.318,2.588,4.944,1.381c5.189,0.91,12.738-4.808,16.127-8.599c4.102-4.706,3.375-7.457,11.332-13.86c1.824,2.047-2.155,20.335-3.12,23.398c-4.877,14.729-26.567,49.619-17.595,54.417c0.945,0.4,2.227,0.955,3.073,0.089c1.553-1.53,3.53-2.604,4.841-4.372c8.025-10.218,17.566-34.36,24.059-39.238c3.279,0.224,1.596,2.346-4.475,22.532c-3.673,13.084-5.142,19.941-5.142,19.941c-10.126,30.466,6.229,25.716,11.501,6.808c0.448-1.537,9.722-26.912,10.129-28.16c1.241-3.291,4.602-17.806,8.801-14.872c0.646,2.469-0.335,3.044-3.536,31.521c-2.6,21.813-3.236,8.789-2.713,26.425c0.079,2.164,4.439,3.257,6.282,2.115c10.539-9.723,12.692-57.611,18.074-61.022c3.669,4.293,4.272,33.754,5.982,39.221c2.652,9.705,7.446,4.802,7.981,3.239c3.825-9.324-0.19-30.536,0.628-45.388c0,0,4.369-14.53,7.198-38.676c4.176-45.514-17.861,13.267,48.59-167.185c0,0,5.299-10.218,13.794-30.791c9.81-21.31,5.988-35.652,19.766-73.451c0.361-1,16.239-47.758,24.363-68.15c45.673,232.645-9.743,77.068-28.904,331.531c-5.708,105.042,1.862,76.707,18.19,223.544c31.719,289.304-15.087,130.161,35.652,384.312c10.99,51.495,9.837,44.86,11.854,56.284c2.28,21.363-1.788,21.528-1.679,31.313c-0.699,24.031,5.964,8.574-1.712,52.53c-4.993,24.181-4.913,9.214-7.677,37.417c-3.463,13.977-13.912,52.732,0.856,52.45c1.286,7.64,5.541,9.156,9.756,6.712c-0.684,2.455,1.381,4.293,2.766,6.011c4.813,1.322,4.76,1.029,6.828-0.555c1.495,5.791,5.173,5.742,6.748,6.16c4.768,1.476,5.904-11.237,6.781-16.16c0.856-0.046,1.705-0.096,2.551-0.129c-1.072,3.151-7.161,15.833,2.634,16.835c7.651,1.238,8.542,0.168,12.727-3.791c6.992-7.01,5.41-8.94,6.623-20.685c0.191-2.384,5.685-6.58,0.872-37.642c-1.855-15.952-0.832,2.69,0.304-35.715c0.371-16.594,5.685-19.576,6.408-31.349c-6.493-27.396-1.465-14.55-4.045-30.51c-6.145-34.313-7.105-27.255,0.575-107.316c6.987-65.839,14.147-68.677,7.72-136.864c-14.296-110.15-0.224-68.945,1.451-126.216c1.503-67.36-4.198-108.808,3.103-168.203c4.314-34.735,12.351-68.835,12.215-90.227c2.948-3.639,4.984-7.885,7.168-11.993c3.172-6.203,2.655-0.513,2.627-35.675c1.424-0.218,2.885-0.281,4.27-0.677c0.162-0.334,0.307-0.661,0.436-0.985c0.007,0.007,0.014,0.015,0.022,0.023c0.008-0.008,0.015-0.016,0.022-0.023c0.129,0.324,0.274,0.651,0.436,0.985c1.385,0.396,2.846,0.459,4.27,0.677c-0.028,35.162-0.545,29.472,2.627,35.675c2.184,4.108,4.22,8.354,7.168,11.993c-0.136,21.392,7.901,55.493,12.215,90.227c7.301,59.394,1.6,100.842,3.103,168.203c1.675,57.27,15.747,16.066,1.451,126.216c-6.427,68.186,0.733,71.025,7.72,136.864c7.68,80.061,6.72,73.003,0.575,107.316c-2.58,15.96,2.448,3.114-4.045,30.51c0.723,11.773,6.037,14.755,6.408,31.349c1.136,38.405,2.159,19.763,0.304,35.715c-4.813,31.062,0.681,35.258,0.872,37.642c1.213,11.745-0.369,13.675,6.623,20.685c4.185,3.959,5.076,5.029,12.727,3.791c9.795-1.002,3.706-13.684,2.634-16.835c0.846,0.033,1.695,0.083,2.551,0.129c0.877,4.923,2.013,17.636,6.781,16.16c1.575-0.418,5.253-0.369,6.748-6.16c2.068,1.584,2.015,1.877,6.828,0.555c1.385-1.718,3.45-3.556,2.766-6.011c4.215,2.444,8.47,0.928,9.756-6.712c14.768,0.282,4.319-38.473,0.856-52.45c-2.764-28.203-2.684-13.236-7.677-37.417c-7.676-43.956-1.013-28.499-1.712-52.53c0.109-9.785-3.959-9.95-1.679-31.313c2.017-11.424,0.864-4.789,11.854-56.284c50.739-254.151,3.933-95.007,35.652-384.312c16.328-146.837,23.898-118.502,18.19-223.544c-19.161-254.463-74.576-98.886-28.904-331.531c8.124,20.392,24.002,67.15,24.363,68.15c13.778,37.8,9.956,52.142,19.766,73.451c8.495,20.573,13.794,30.791,13.794,30.791c66.451,180.451,44.414,121.671,48.59,167.185c2.829,24.146,7.198,38.676,7.198,38.676c0.818,14.852-3.197,36.064,0.628,45.388c0.535,1.563,5.329,6.466,7.981-3.239c1.71-5.467,2.313-34.928,5.982-39.221c5.382,3.411,7.535,51.3,18.074,61.022c1.843,1.142,6.203,0.049,6.282-2.115c0.523-17.636-0.113-4.612-2.713-26.425c-3.201-28.477-4.182-29.052-3.536-31.521c4.199-2.934,7.56,11.581,8.801,14.872c0.407,1.248,9.681,26.623,10.129,28.16c5.272,18.908,21.627,23.658,11.501-6.808c0,0-1.469-6.857-5.142-19.941c-6.071-20.186-7.754-22.308-4.475-22.532c6.493,4.878,16.034,29.02,24.059,39.238c1.311,1.768,3.288,2.842,4.841,4.372c0.846,0.866,2.128,0.311,3.073-0.089c8.972-4.798-12.718-39.688-17.595-54.417c-0.965-3.063-4.944-21.351-3.12-23.398c7.957,6.403,7.23,9.154,11.332,13.86c3.389,3.791,10.938,9.509,16.127,8.599c1.626,1.207,4.048,0.321,4.944-1.381C760.056,877.198,745.651,870.24,736.728,849.786z";
  
  return (
    <div ref={visRef as React.RefObject<HTMLDivElement>} className={`w-full h-full relative ${isDark ? 'bg-plum-dark/50 border-plum-primary/30' : 'bg-white border-gray-200'} overflow-hidden rounded-lg border shadow-inner group transition-colors duration-500`}>
      
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ 
             backgroundImage: `linear-gradient(${isDark ? '#C9A961' : '#1A1A1A'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#C9A961' : '#1A1A1A'} 1px, transparent 1px)`, 
             backgroundSize: '20px 20px' 
           }} 
      />

      {/* Hover Info Panel - Top Left */}
      <AnimatePresence>
        {activeNodeData && (
          <motion.div
            aria-live="polite"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className={`absolute top-4 left-4 z-40 ${isDark ? 'bg-plum-dark/95 border-plum-primary/50' : 'bg-white/95 border-gray-200'} backdrop-blur-xl border px-5 py-4 rounded-lg shadow-xl max-w-[240px]`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0" 
                style={{ backgroundColor: activeNodeData.color }}
              />
              <h4 className={`text-xs font-bold ${isDark ? 'text-gold-primary' : 'text-plum-primary'} uppercase tracking-wider`}>
                {activeNodeData.label}
              </h4>
            </div>
            <p className={`text-[11px] ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
              {activeNodeData.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Abstract Body Silhouette Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative h-[95%] w-full max-w-[400px]">
            <svg aria-hidden="true" viewBox="0 0 837.483 1819.369" className="w-full h-full drop-shadow-2xl">
                <defs>
                    <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={isDark ? "#4A3F5C" : "#F3F0F7"} stopOpacity="0.9" />
                        <stop offset="100%" stopColor={isDark ? "#2E263A" : "#E5D4A6"} stopOpacity="0.3" />
                    </linearGradient>
                    <pattern id="scanLines" patternUnits="userSpaceOnUse" width="10" height="10">
                        <path d="M0,10 l10,-10" stroke={isDark ? "#C9A961" : "#4A3F5C"} strokeWidth="1" opacity="0.05" />
                    </pattern>
                    <mask id="bodyMask">
                        <path d={silhouettePath} fill="white" />
                    </mask>
                </defs>
                
                {/* Main Silhouette Body */}
                <path 
                    d={silhouettePath} 
                    fill="url(#bodyGradient)" 
                    stroke={isDark ? "#C9A961" : "#4A3F5C"} 
                    strokeWidth="1"
                    strokeOpacity={isDark ? "0.3" : "0.15"}
                />
                
                {/* Inner Texture masked to body */}
                <rect x="0" y="0" width="838" height="1820" fill="url(#scanLines)" mask="url(#bodyMask)" />
            </svg>
        </div>
      </div>

      {/* Scanning Effect */}
      <motion.div
        className="absolute w-full h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent blur-sm z-0 opacity-30"
        style={{ top: 0 }}
        animate={beamsActive ? { y: ["5vh", "85vh"], opacity: [0, 0.4, 0] } : undefined}
        transition={beamsActive ? { duration: 6, repeat: Infinity, ease: "linear" } : { duration: 0 }}
      />

      {/* Connection Network — aligned to the silhouette box */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
       <div className="relative h-[95%] w-full max-w-[400px]">
      <svg aria-hidden="true" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#C9A961" : "#4A3F5C"} stopOpacity="0" />
            <stop offset="50%" stopColor="#C9A961" stopOpacity="0.3" />
            <stop offset="100%" stopColor={isDark ? "#C9A961" : "#4A3F5C"} stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {nodes.map((node, i) => (
            i > 0 && (
                <g key={i}>
                    {/* Static Line */}
                    <motion.line
                        x1={`${nodes[0].x}%`}
                        y1={`${nodes[0].y}%`}
                        x2={`${node.x}%`}
                        y2={`${node.y}%`}
                        stroke="url(#lineGradient)"
                        strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                    />
                    
                    {/* Particle Flow Animation */}
                    <motion.circle
                        r="2"
                        fill="#C9A961"
                        filter="url(#glow)"
                        animate={beamsActive ? {
                            cx: [`${nodes[0].x}%`, `${node.x}%`],
                            cy: [`${nodes[0].y}%`, `${node.y}%`],
                            opacity: [0, 0.8, 0]
                        } : undefined}
                        transition={beamsActive ? {
                            duration: 2.5 + i * 0.3,
                            repeat: Infinity,
                            ease: "easeOut"
                        } : { duration: 0 }}
                    />
                </g>
            )
        ))}
      </svg>
       </div>
      </div>

      {/* Interactive Nodes — aligned to the silhouette box */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
       <div className="relative h-[95%] w-full max-w-[400px]">
        {nodes.map((node, i) => (
            <motion.div
                key={i}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-2 rounded-full"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                role="button"
                tabIndex={0}
                aria-label={`View ${node.label} details`}
                aria-pressed={pinnedNode === node.id}
                onMouseEnter={() => setHoverNode(node.id)}
                onMouseLeave={() => setHoverNode(null)}
                onFocus={() => setHoverNode(node.id)}
                onBlur={() => setHoverNode(null)}
                onClick={() => setPinnedNode((p) => (p === node.id ? null : node.id))}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setPinnedNode((p) => (p === node.id ? null : node.id)); } }}
            >
                {/* Soft halo */}
                <div
                    className="absolute rounded-full blur-[5px] pointer-events-none"
                    style={{
                        width: node.r * 3.4,
                        height: node.r * 3.4,
                        left: -node.r * 1.2,
                        top: -node.r * 1.2,
                        background: `radial-gradient(circle, ${node.color} 0%, transparent 70%)`,
                        opacity: isVisible ? (node.id === 0 ? 0.75 : 0.45) : 0,
                        transition: "opacity 0.6s ease",
                    }}
                />

                {/* Origin "emitter" pulse */}
                {node.id === 0 && (
                    <motion.div
                        className="absolute rounded-full border pointer-events-none"
                        style={{ width: node.r * 2, height: node.r * 2, borderColor: "#C9A96166" }}
                        animate={isVisible ? { scale: [1, 2.6], opacity: [0.6, 0] } : undefined}
                        transition={isVisible ? { duration: 2.6, repeat: Infinity, ease: "easeOut" } : { duration: 0 }}
                    />
                )}

                {/* Crisp core */}
                <div
                    className={`relative rounded-full border transition-all duration-500 ease-out ${activeNode === node.id ? "scale-125" : ""}`}
                    style={{
                        width: node.r * 2,
                        height: node.r * 2,
                        backgroundColor: activeNode === node.id ? "#fff" : node.color,
                        borderColor: activeNode === node.id ? "#4A3F5C" : (isDark ? "rgba(255,255,255,0.85)" : "#fff"),
                        boxShadow: `0 0 ${node.r * (activeNode === node.id ? 1.6 : 0.9)}px ${node.color}cc`,
                    }}
                >
                    {activeNode === node.id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-plum-primary" />
                        </div>
                    )}
                </div>
            </motion.div>
        ))}
       </div>
      </div>

      {/* Legend Panel - Bottom Right */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className={`absolute bottom-4 right-4 z-30 ${isDark ? 'bg-plum-dark/90 border-plum-primary/30' : 'bg-white/90 border-gray-200'} backdrop-blur-md border rounded-lg shadow-lg px-5 py-4 max-w-[240px]`}>
        <h3 className={`text-[10px] font-bold ${isDark ? 'text-gold-primary' : 'text-gray-500'} uppercase mb-2 tracking-[0.1em]`}>
          Systemic Impact Map
        </h3>
        <p className={`text-[11px] ${isDark ? 'text-gray-300' : 'text-gray-500'} leading-relaxed mb-3`}>
          Endometriosis is systemic. Hover or click a site to inspect; beams pause while you read.
        </p>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-gold-primary' : 'bg-plum-primary'} shadow-sm`} />
            <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-[0.05em]">Origin</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gold-primary shadow-sm" />
            <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-[0.05em]">Target</span>
          </div>
        </div>
        <div className={`pt-3 border-t ${isDark ? 'border-plum-primary/30' : 'border-gray-200'}`}>
          <p className={`text-[9px] font-bold uppercase tracking-[0.08em] ${isDark ? 'text-gold-primary' : 'text-gray-400'} mb-1.5`}>Associated comorbidities</p>
          <ul className={`text-[10px] ${isDark ? 'text-gray-300' : 'text-gray-500'} space-y-1`}>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-warm-rose" /> Cardiovascular disease</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-coral-primary" /> Increased cancer risk</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: '#9F8CA6' }} /> Inflammatory conditions</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
