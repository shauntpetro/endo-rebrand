"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Sphere, Cylinder, Float } from "@react-three/drei";
import { useRef, useState, useMemo, useEffect, Suspense } from "react";
import * as THREE from "three";

// Brand Palette adapted for 3D style
const PALETTE = {
  plum: "#9F8CA6",
  gold: "#D6B65F",
  brown: "#8C7A6B",
  darkPlum: "#5D4E60",
  bond: "#2A2A2A",
};

interface MoleculeProps {
  count?: number;
  radius?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  variant?: "hero" | "background";
}

function Molecule({ count = 12, radius = 2, position = [0,0,0], rotation = [0,0,0], scale = 1, variant = "hero" }: MoleculeProps) {
  const group = useRef<THREE.Group>(null!);
  
  // Generate structure
  const { atoms, bonds } = useMemo(() => {
    const atomList = [];
    const bondList = [];
    
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      
      const r = radius * (0.8 + 0.4 * Math.sin(t * 3));
      const x = r * Math.cos(t);
      const y = r * Math.sin(t);
      const z = radius * 0.5 * Math.sin(t * 2);
      
      const jitter = 0.1;
      
      const colorKeys = ["plum", "gold", "brown", "darkPlum"];
      const colorKey = colorKeys[i % colorKeys.length] as keyof typeof PALETTE;

      atomList.push({ 
        position: [
          x + (Math.random() - 0.5) * jitter, 
          y + (Math.random() - 0.5) * jitter, 
          z + (Math.random() - 0.5) * jitter
        ] as [number, number, number], 
        size: 0.45 + Math.random() * 0.15,
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
      
      if (count > 8 && i % 4 === 0) {
         const targetIdx = (i + Math.floor(count/2)) % count;
         const target = atomList[targetIdx];
         const start2 = new THREE.Vector3(...current.position);
         const end2 = new THREE.Vector3(...target.position);
         const mid2 = new THREE.Vector3().addVectors(start2, end2).multiplyScalar(0.5);
         const dist2 = start2.distanceTo(end2);
         
         if (dist2 < radius * 2.5) {
            const direction2 = new THREE.Vector3().subVectors(end2, start2).normalize();
            const quaternion2 = new THREE.Quaternion().setFromUnitVectors(up, direction2);
            const euler2 = new THREE.Euler().setFromQuaternion(quaternion2);
            
             bondList.push({
                position: [mid2.x, mid2.y, mid2.z] as [number, number, number],
                rotation: [euler2.x, euler2.y, euler2.z] as [number, number, number],
                height: dist2
             });
         }
      }
    }

    return { atoms: atomList, bonds: bondList };
  }, [count, radius]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.05;
      group.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <Float 
      speed={variant === "hero" ? 1.5 : 1} 
      rotationIntensity={0.5} 
      floatIntensity={0.5}
    >
      <group 
        ref={group} 
        position={position} 
        rotation={rotation}
        scale={scale}
      >
        {/* Bonds */}
        {bonds.map((bond, i) => (
           <group key={`bond-${i}`} position={bond.position} rotation={bond.rotation}>
             <Cylinder args={[0.12, 0.12, bond.height, 12]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial 
                  color={PALETTE.bond}
                  roughness={0.6}
                  metalness={0.1}
                />
             </Cylinder>
           </group>
        ))}

        {/* Atoms */}
        {atoms.map((atom, i) => (
            <group key={`atom-${i}`} position={atom.position}>
              <Sphere args={[atom.size, 32, 32]}>
                <meshStandardMaterial 
                  color={atom.color}
                  roughness={0.3}
                  metalness={0.15}
                  envMapIntensity={1.2}
                />
              </Sphere>
            </group>
        ))}
      </group>
    </Float>
  );
}

export default function PeptideCanvas() {
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Cinematic delay before revealing
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 800); // Start reveal after logo/nav animation
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="absolute inset-0 z-[1] transition-all duration-[2000ms] ease-out"
      style={{
        opacity: revealed ? 1 : 0,
        filter: revealed ? 'blur(0px)' : 'blur(20px)',
        transform: revealed ? 'scale(1)' : 'scale(0.95)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 35 }}
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
        dpr={[1, 2]} 
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          
          <ambientLight intensity={0.8} color="#FFF5E0" />
          
          <spotLight 
            position={[20, 20, 20]} 
            angle={0.3} 
            penumbra={1} 
            intensity={1.5} 
            color="#FFF0D0" 
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#E6D8FF" />

          {/* Main Hero Molecule */}
          <Molecule 
            position={[0, 2, 0]} 
            scale={1.0}
            count={16} 
            radius={2.2} 
            variant="hero"
          />

          {/* Background Molecules */}
          <Molecule 
            position={[-9, 7, -10]} 
            scale={0.7} 
            count={8} 
            radius={2} 
            variant="background"
          />
          <Molecule 
            position={[9, -6, -12]} 
            scale={0.6} 
            count={8} 
            radius={2} 
            variant="background"
          />

        </Suspense>
      </Canvas>
    </div>
  );
}
