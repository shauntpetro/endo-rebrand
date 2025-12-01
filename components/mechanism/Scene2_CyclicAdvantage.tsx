"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { MECHANISM_COLORS } from "./constants";
import { PeptideRing } from "./PeptideRing";

// Dynamically import Canvas to avoid SSR issues
const PeptideCanvas = dynamic(() => import("@/components/PeptideCanvas").then(mod => {
  // We need to extract just the molecule part or create a simplified version
  // For now, let's reuse the full canvas but framed tightly or modify PeptideCanvas to accept a 'single' prop
  return mod;
}), { ssr: false });

// Simplified Molecule component for the scenes
import { Canvas } from "@react-three/fiber";
import { Environment, Float, Sphere, Cylinder } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

// Copied PALETTE from PeptideCanvas for consistency
const PALETTE = {
  plum: "#9F8CA6",
  gold: "#D6B65F",
  brown: "#8C7A6B",
  darkPlum: "#5D4E60",
  bond: "#2A2A2A",
};

function SingleMolecule({ radius = 1.5, count = 8 }: { radius?: number; count?: number }) {
  const { atoms, bonds } = useMemo(() => {
    const atomList = [];
    const bondList = [];
    
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const r = radius * (0.8 + 0.2 * Math.sin(t * 3));
      const x = r * Math.cos(t);
      const y = r * Math.sin(t);
      const z = radius * 0.3 * Math.sin(t * 2);
      
      const colorKeys = ["plum", "gold", "brown", "darkPlum"];
      const colorKey = colorKeys[i % colorKeys.length] as keyof typeof PALETTE;

      atomList.push({ 
        position: [x, y, z] as [number, number, number], 
        size: 0.35,
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
  }, [count, radius]);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <group>
        {bonds.map((bond, i) => (
           <group key={`bond-${i}`} position={bond.position} rotation={bond.rotation}>
             <Cylinder args={[0.08, 0.08, bond.height, 8]} rotation={[Math.PI / 2, 0, 0]}>
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

// Helper for rounded capsule segments
interface CapsuleProps {
  start: [number, number, number];
  end: [number, number, number];
  radius: number;
  color: string;
}

function Capsule({ start, end, radius, color }: CapsuleProps) {
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const direction = new THREE.Vector3().subVectors(endVec, startVec);
  const length = direction.length();
  const mid = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
  
  const up = new THREE.Vector3(0, 1, 0);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction.clone().normalize());
  const euler = new THREE.Euler().setFromQuaternion(quaternion);

  return (
    <group>
      <group position={mid} rotation={euler}>
         <Cylinder args={[radius, radius, length, 16]}>
            <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
         </Cylinder>
      </group>
      <group position={start}>
         <Sphere args={[radius, 16, 16]}>
            <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
         </Sphere>
      </group>
      <group position={end}>
         <Sphere args={[radius, 16, 16]}>
            <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
         </Sphere>
      </group>
    </group>
  )
}

function AntibodyStructure() {
  const structure = useMemo(() => {
    const rHeavy = 0.15;
    const rLight = 0.15;
    
    const segments: { start: [number, number, number]; end: [number, number, number]; radius: number; color: string }[] = [
      // Heavy Chains (Dark Plum)
      { start: [-0.16, -1.4, 0], end: [-0.16, 0.2, 0], radius: rHeavy, color: PALETTE.darkPlum }, // Stem Left
      { start: [0.16, -1.4, 0], end: [0.16, 0.2, 0], radius: rHeavy, color: PALETTE.darkPlum },   // Stem Right
      { start: [-0.16, 0.2, 0], end: [-1.2, 1.5, 0], radius: rHeavy, color: PALETTE.darkPlum },   // Arm Left
      { start: [0.16, 0.2, 0], end: [1.2, 1.5, 0], radius: rHeavy, color: PALETTE.darkPlum },     // Arm Right
      
      // Light Chains (Plum) - Parallel to outer arms
      { start: [-0.6, 0.4, 0], end: [-1.5, 1.5, 0], radius: rLight, color: PALETTE.plum },        // Light Left
      { start: [0.6, 0.4, 0], end: [1.5, 1.5, 0], radius: rLight, color: PALETTE.plum },          // Light Right
      
      // Disulfide Bridges (Bond Color)
      { start: [-0.16, -0.4, 0], end: [0.16, -0.4, 0], radius: 0.05, color: PALETTE.bond },       // Hinge
    ];
    return segments;
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4} floatingRange={[-0.1, 0.1]}>
        <group rotation={[0, 0, 0]} scale={1.5}>
            {structure.map((segment, i) => (
                <Capsule 
                  key={i} 
                  start={segment.start} 
                  end={segment.end} 
                  radius={segment.radius} 
                  color={segment.color} 
                />
            ))}
        </group>
    </Float>
  );
}

export const Scene2_CyclicAdvantage = () => {
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center bg-white rounded-xl border border-stone-200 shadow-sm p-8 overflow-hidden">
      <div className="absolute top-6 left-6 z-10">
        <h3 className="font-bold text-stone-800 uppercase tracking-widest text-xs mb-1">The Cyclic Advantage</h3>
      </div>

      <div className="flex items-end justify-center gap-4 md:gap-8 w-full h-56 relative z-10 mt-8">
        
        {/* Small Molecule */}
        <div className="flex flex-col items-center justify-end h-full gap-3 group relative p-2 w-28">
          <div className="h-24 flex items-center justify-center">
             <motion.div 
                className="relative w-12 h-12"
            >
                <div className="absolute inset-0 border border-dashed border-stone-300 rounded-full opacity-30 animate-[spin_10s_linear_infinite]" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <motion.div className="absolute top-1 right-1 w-2 h-2 bg-stone-400 rounded-full shadow-sm backdrop-blur-sm" />
                  <motion.div className="absolute bottom-1 left-2 w-3 h-3 bg-stone-500 rounded-full shadow-sm backdrop-blur-sm" />
                  <motion.div className="absolute top-3 left-1 w-1.5 h-1.5 bg-stone-300 rounded-full shadow-sm backdrop-blur-sm" />
                </motion.div>
            </motion.div>
          </div>
          <div className="text-center relative z-10">
            <p className="font-bold text-stone-700 text-xs uppercase tracking-wide mb-1">Small Molecule</p>
            <p className="text-[9px] font-medium text-stone-400 uppercase tracking-wider">Lack Specificity</p>
          </div>
        </div>

        {/* Cyclic Peptide (3D) */}
        <div className="flex flex-col items-center justify-end h-full gap-2 w-44">
          <div className="w-40 h-40 relative -mt-8">
            <div className="absolute inset-0 bg-amber-400/5 rounded-full blur-3xl scale-75 animate-pulse" />
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
              <ambientLight intensity={0.8} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
              <Environment preset="city" />
              <SingleMolecule radius={2} count={10} />
            </Canvas>
          </div>
          <div className="text-center relative z-20 -mt-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-amber-100 shadow-lg ring-1 ring-amber-500/10 transform transition-transform hover:scale-105 duration-300">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-amber-500/20 rounded-full blur-sm" />
            <p className="font-bold text-amber-600 text-base font-serif">Cyclic Peptide</p>
            <p className="text-[9px] font-bold text-stone-500 uppercase tracking-[0.2em]">Perfect Specificity</p>
          </div>
        </div>

        {/* Antibody */}
        <div className="flex flex-col items-center justify-end h-full gap-3 group relative p-2 w-28">
          <div className="h-24 w-24 relative flex items-center justify-center">
             <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
               <ambientLight intensity={0.8} />
               <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
               <Environment preset="city" />
               <AntibodyStructure />
             </Canvas>
             <div className="absolute -right-2 top-4 text-[9px] font-mono text-stone-400 rotate-90 origin-bottom-left pointer-events-none">~150 kDa</div>
          </div>
          <div className="text-center relative z-10">
            <p className="font-bold text-stone-700 text-xs uppercase tracking-wide mb-1">Antibody</p>
            <p className="text-[9px] font-medium text-stone-400 uppercase tracking-wider">Too Large</p>
          </div>
        </div>

      </div>

      <motion.div 
        className="mt-6 text-center max-w-md relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-lg text-stone-700 font-serif leading-relaxed">
            "Cyclic peptides occupy the <span className="text-amber-600 italic font-bold">sweet spot</span>: large enough for specificity, small enough to penetrate cells."
        </p>
      </motion.div>
    </div>
  );
};
