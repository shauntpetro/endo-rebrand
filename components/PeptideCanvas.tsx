"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Sphere, Cylinder, Float, Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useRef, useState, useMemo, useEffect, useSyncExternalStore, Suspense } from "react";
import * as THREE from "three";

/** Deterministic pseudo-random: same seed always yields the same 0-1 value */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const emptySubscribe = () => () => {};

// Brand palette adapted for 3D — tightened to plum backbone + gold residues
const PALETTE = {
  plum: "#9F8CA6",
  plumDeep: "#6E5E74",
  gold: "#C9A961",
  goldBright: "#E6C871",
  bond: "#5A4A52", // warm bronze-plum (lighter than the old near-black)
};

const UP = new THREE.Vector3(0, 1, 0);

/** Build a cylinder bond (position + rotation + length) spanning two points. */
function makeBond(a: THREE.Vector3, b: THREE.Vector3) {
  const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
  const dist = a.distanceTo(b);
  const dir = new THREE.Vector3().subVectors(b, a).normalize();
  const quat = new THREE.Quaternion().setFromUnitVectors(UP, dir);
  const e = new THREE.Euler().setFromQuaternion(quat);
  return {
    position: [mid.x, mid.y, mid.z] as [number, number, number],
    rotation: [e.x, e.y, e.z] as [number, number, number],
    height: dist,
  };
}

interface MoleculeProps {
  count?: number;
  radius?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  variant?: "hero" | "background";
}

/**
 * A cyclic peptide rendered as a clean closed backbone macrocycle with
 * outward side-chain residues — reads unmistakably as a cyclic peptide.
 */
function Molecule({ count = 16, radius = 2.2, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, variant = "hero" }: MoleculeProps) {
  const spin = useRef<THREE.Group>(null!);

  const { backbone, sideChains, backboneBonds, sideBonds } = useMemo(() => {
    const N = count;
    const crown = radius * 0.14; // gentle out-of-plane saddle for organic 3D form

    const backbone: { position: [number, number, number]; size: number; color: string; theta: number }[] = [];
    for (let i = 0; i < N; i++) {
      const t = (i / N) * Math.PI * 2;
      backbone.push({
        position: [radius * Math.cos(t), radius * Math.sin(t), crown * Math.sin(t * 2)] as [number, number, number],
        size: 0.32 + seededRandom(i * 4 + 3) * 0.05,
        color: i % 2 === 0 ? PALETTE.plum : PALETTE.plumDeep,
        theta: t,
      });
    }

    // Backbone bonds: consecutive residues only — closes the ring, no interior struts.
    const backboneBonds = backbone.map((cur, i) =>
      makeBond(new THREE.Vector3(...cur.position), new THREE.Vector3(...backbone[(i + 1) % N].position)),
    );

    // Side-chain residues: a short outward stub + a smaller gold sphere per residue.
    const sideChains: { position: [number, number, number]; size: number }[] = [];
    const sideBonds: ReturnType<typeof makeBond>[] = [];
    for (let i = 0; i < N; i++) {
      const t = backbone[i].theta;
      const outward = new THREE.Vector3(Math.cos(t), Math.sin(t), 0);
      const len = radius * (0.34 + 0.18 * seededRandom(i * 7));
      const base = new THREE.Vector3(...backbone[i].position);
      const tip = base
        .clone()
        .add(outward.multiplyScalar(len))
        .add(new THREE.Vector3(0, 0, (seededRandom(i * 7 + 2) - 0.5) * radius * 0.18));
      sideChains.push({ position: [tip.x, tip.y, tip.z], size: 0.16 + seededRandom(i * 7 + 1) * 0.05 });
      sideBonds.push(makeBond(base, tip));
    }

    return { backbone, sideChains, backboneBonds, sideBonds };
  }, [count, radius]);

  // Stately spin around the ring's own normal so the macrocycle stays presented.
  useFrame((_, delta) => {
    if (spin.current) spin.current.rotation.z += delta * 0.16;
  });

  const presTilt: [number, number, number] = variant === "hero" ? [-0.5, 0.45, 0] : [-0.3, 0.2, 0];
  const bondR = variant === "hero" ? 0.075 : 0.06;

  return (
    <Float speed={variant === "hero" ? 1.2 : 0.9} rotationIntensity={0.2} floatIntensity={0.35}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* Fixed presentation tilt — keeps the ring at a flattering 3/4 angle */}
        <group rotation={presTilt}>
          <group ref={spin}>
            {/* Backbone bonds (the macrocycle) */}
            {backboneBonds.map((b, i) => (
              <group key={`bb-${i}`} position={b.position} rotation={b.rotation}>
                <Cylinder args={[bondR, bondR, b.height, 10]} rotation={[Math.PI / 2, 0, 0]}>
                  <meshStandardMaterial color={PALETTE.bond} roughness={0.35} metalness={0.55} />
                </Cylinder>
              </group>
            ))}

            {/* Side-chain bonds (thinner) */}
            {sideBonds.map((b, i) => (
              <group key={`sb-${i}`} position={b.position} rotation={b.rotation}>
                <Cylinder args={[bondR * 0.7, bondR * 0.7, b.height, 8]} rotation={[Math.PI / 2, 0, 0]}>
                  <meshStandardMaterial color={PALETTE.bond} roughness={0.4} metalness={0.5} />
                </Cylinder>
              </group>
            ))}

            {/* Backbone atoms (plum, pearlescent) */}
            {backbone.map((a, i) => (
              <Sphere key={`ba-${i}`} args={[a.size, 32, 32]} position={a.position}>
                <meshStandardMaterial
                  color={a.color}
                  roughness={0.18}
                  metalness={0.25}
                  envMapIntensity={2.0}
                  emissive={a.color}
                  emissiveIntensity={0.1}
                />
              </Sphere>
            ))}

            {/* Side-chain residues (gold, glowy — catches the bloom) */}
            {sideChains.map((s, i) => (
              <Sphere key={`sc-${i}`} args={[s.size, 24, 24]} position={s.position}>
                <meshStandardMaterial
                  color={variant === "hero" ? PALETTE.goldBright : PALETTE.gold}
                  roughness={0.12}
                  metalness={0.35}
                  envMapIntensity={2.2}
                  emissive={PALETTE.gold}
                  emissiveIntensity={variant === "hero" ? 0.4 : 0.2}
                />
              </Sphere>
            ))}
          </group>
        </group>
      </group>
    </Float>
  );
}

function FloatingParticles({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededRandom(i * 3 + 1000) - 0.5) * 30;
      pos[i * 3 + 1] = (seededRandom(i * 3 + 1001) - 0.5) * 30;
      pos[i * 3 + 2] = (seededRandom(i * 3 + 1002) - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.01;
      ref.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#C9A961" size={0.035} sizeAttenuation depthWrite={false} opacity={0.35} />
    </Points>
  );
}

export default function PeptideCanvas() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
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
        filter: revealed ? "blur(0px)" : "blur(20px)",
        transform: revealed ? "scale(1)" : "scale(0.95)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 35 }}
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Environment preset="city" />

          {/* Dramatic chiaroscuro lighting */}
          <ambientLight intensity={0.4} color="#FFF5E0" />

          <spotLight position={[15, 20, 15]} angle={0.25} penumbra={1} intensity={2.5} color="#FFF0D0" castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#E6D8FF" />
          {/* Gold rim light — backlit halo amplified by Bloom, glows the gold residues */}
          <pointLight position={[0, 10, -5]} intensity={1.0} color="#C9A961" />

          {/* Main Hero Macrocycle */}
          <Molecule position={[0, 2, 0]} scale={1.0} count={16} radius={2.2} variant="hero" />

          {/* Background Macrocycle */}
          <Molecule position={[-9, 7, -10]} scale={0.7} count={9} radius={2} variant="background" />

          {/* Ambient floating particles */}
          <FloatingParticles />

          {/* Postprocessing pipeline */}
          <EffectComposer multisampling={0}>
            <Bloom intensity={0.5} luminanceThreshold={0.55} luminanceSmoothing={0.9} mipmapBlur />
            <Vignette offset={0.3} darkness={0.6} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
