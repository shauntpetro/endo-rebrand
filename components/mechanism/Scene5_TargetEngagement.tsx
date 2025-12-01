"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MECHANISM_COLORS } from "./constants";
import { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, Sphere, Cylinder } from "@react-three/drei";
import * as THREE from "three";

// Copied PALETTE from PeptideCanvas for consistency
const PALETTE = {
  plum: "#9F8CA6",
  gold: "#D6B65F",
  brown: "#8C7A6B",
  darkPlum: "#5D4E60",
  bond: "#2A2A2A",
};

function EngagementMolecule({ engaged }: { engaged: boolean }) {
  const { atoms, bonds } = useMemo(() => {
    const count = 8;
    const radius = 1.2;
    const atomList = [];
    const bondList = [];
    
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const r = radius;
      const x = r * Math.cos(t);
      const y = r * Math.sin(t);
      
      const colorKeys = ["plum", "gold", "brown", "darkPlum"];
      const colorKey = colorKeys[i % colorKeys.length] as keyof typeof PALETTE;

      atomList.push({ 
        position: [x, y, 0] as [number, number, number], 
        size: 0.3,
        color: PALETTE[colorKey]
      });
    }

    for (let i = 0; i < count; i++) {
      const current = atomList[i];
      const next = atomList[(i + 1) % count];
      const start = new THREE.Vector3(...current.position);
      const end = new THREE.Vector3(...next.position);
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const dist = start.distanceTo(end);
      
      const direction = new THREE.Vector3().subVectors(end, start).normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);
      const euler = new THREE.Euler().setFromQuaternion(quaternion);

      bondList.push({
        position: [mid.x, mid.y, mid.z] as [number, number, number],
        rotation: [euler.x, euler.y, euler.z] as [number, number, number],
        height: dist
      });
    }
    return { atoms: atomList, bonds: bondList };
  }, []);

  return (
    <Float speed={engaged ? 0 : 2} rotationIntensity={engaged ? 0 : 1} floatIntensity={engaged ? 0 : 0.5}>
      <group scale={engaged ? 0.5 : 1}>
        {bonds.map((bond, i) => (
           <group key={`bond-${i}`} position={bond.position} rotation={bond.rotation}>
             <Cylinder args={[0.06, 0.06, bond.height, 8]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color={PALETTE.bond} roughness={0.6} metalness={0.1} />
             </Cylinder>
           </group>
        ))}
        {atoms.map((atom, i) => (
            <group key={`atom-${i}`} position={atom.position}>
              <Sphere args={[atom.size, 32, 32]}>
                <meshStandardMaterial color={atom.color} roughness={0.3} metalness={0.15} envMapIntensity={1.2} />
              </Sphere>
            </group>
        ))}
      </group>
    </Float>
  );
}

export const Scene5_TargetEngagement = () => {
  const [engaged, setEngaged] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
        setEngaged(prev => !prev);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full relative flex items-center justify-center bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden p-8">
      <div className="absolute top-6 left-6 z-10">
        <h3 className="font-bold text-stone-800 uppercase tracking-widest text-xs mb-1">Target Engagement</h3>
      </div>

      <div className="absolute bottom-8 right-8 z-20 opacity-50 pointer-events-none">
        <button 
            className={clsx(
                "px-9 py-4 rounded-lg text-lg font-bold transition-all duration-300 relative overflow-hidden group",
                engaged ? "bg-gold-primary text-white shadow-[0_0_20px_rgba(201,169,97,0.6)]" : "bg-black-primary text-gold-primary shadow-lg"
            )}
        >
            <span className="relative z-10 flex items-center gap-2">
                {engaged ? (
                    <>
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-xl">✓</motion.span>
                      Target Engaged
                    </>
                ) : (
                    <>Engage Target</>
                )}
            </span>
        </button>
      </div>

      {/* The Cell Container */}
      <motion.div 
        className="w-[400px] h-[400px] rounded-full relative flex items-center justify-center overflow-hidden"
        style={{ 
            background: `radial-gradient(circle at 30% 30%, ${MECHANISM_COLORS.lesionTissue}, #FFCAB8)`,
            border: `2px solid ${MECHANISM_COLORS.cellMembrane}`,
            boxShadow: 'inset 0 0 60px rgba(0,0,0,0.05)'
        }}
        animate={{
            scale: engaged ? 0.8 : 1,
            opacity: engaged ? 0.5 : 1,
            filter: engaged ? "grayscale(0.5)" : "grayscale(0)"
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        {/* Nucleus */}
        <div className="absolute w-24 h-24 rounded-full bg-purple-900/20 blur-xl top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2" />

        {/* Intracellular Target */}
        <motion.div
            className="w-20 h-20 rounded-xl flex items-center justify-center relative z-10"
            style={{ 
                backgroundColor: MECHANISM_COLORS.intracellularTarget,
                boxShadow: '0 10px 20px rgba(244, 224, 77, 0.3)'
            }}
            animate={{
                rotate: engaged ? 0 : [0, 5, -5, 0],
            }}
            transition={{
                rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
        >
            <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">Target</span>
            
            {/* Binding Site */}
            <div className="absolute -top-3 w-10 h-5 bg-amber-200/50 rounded-b-full backdrop-blur-sm" />
        </motion.div>

        {/* Peptide approaching (3D) */}
        <AnimatePresence>
            {!engaged && (
                <motion.div
                    className="absolute w-32 h-32 z-20 pointer-events-none"
                    initial={{ x: 200, y: -200, opacity: 0, scale: 0.5 }}
                    animate={{ 
                        x: 30, y: -40, 
                        opacity: 1, 
                        scale: 1,
                        rotate: 360 
                    }}
                    exit={{ x: 0, y: 0, opacity: 0, scale: 0.2 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
                        <ambientLight intensity={1} />
                        <spotLight position={[10, 10, 10]} intensity={1.5} />
                        <Environment preset="city" />
                        <EngagementMolecule engaged={false} />
                    </Canvas>
                </motion.div>
            )}
        </AnimatePresence>
        
        {/* Binding Flash */}
        {engaged && (
            <>
                <motion.div 
                    className="absolute w-32 h-32 rounded-full bg-amber-400/40 blur-xl z-0"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <motion.div 
                    className="absolute w-full h-full rounded-full border-4 border-red-500/30 z-0"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
            </>
        )}

        {engaged && (
            <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 font-black text-2xl rotate-12 border-[4px] border-red-600 px-4 py-2 rounded-lg z-30 bg-white/80 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 3, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: -12 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
            >
                DEGRADATION
            </motion.div>
        )}

      </motion.div>

      {engaged && (
          <motion.div 
            className="absolute bottom-24 text-center z-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, type: "spring" }}
          >
              <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-2xl shadow-xl border border-white/50">
                  <h3 className="text-xl font-bold text-stone-800 mb-1">Natural Clearance</h3>
                  <p className="text-stone-500 text-sm">No inflammation, no toxicity</p>
                  <div className="mt-4 pt-4 border-t border-stone-100">
                     <VolumeCounter />
                  </div>
              </div>
          </motion.div>
      )}
    </div>
  );
};

const VolumeCounter = () => {
    const [volume, setVolume] = useState(100);

    useEffect(() => {
        const interval = setInterval(() => {
            setVolume(v => Math.max(0, v - 1));
        }, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400">
                {volume}%
            </div>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mt-1">Lesion Volume</span>
        </div>
    );
};
