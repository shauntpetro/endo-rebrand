"use client";
import { Scene1_Challenge } from "@/components/mechanism/Scene1_Challenge";
import { useState } from "react";

export default function TestScene() {
  const [forcePhase, setForcePhase] = useState<number | undefined>(undefined);

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center p-8 gap-4">
      <div className="flex gap-2">
        <button
          onClick={() => setForcePhase(undefined)}
          className={`px-3 py-1 rounded text-sm ${forcePhase === undefined ? 'bg-amber-500 text-white' : 'bg-white text-stone-700'}`}
        >
          Auto
        </button>
        {[0,1,2,3,4,5].map(p => (
          <button
            key={p}
            onClick={() => setForcePhase(p)}
            className={`px-3 py-1 rounded text-sm ${forcePhase === p ? 'bg-amber-500 text-white' : 'bg-white text-stone-700'}`}
          >
            Phase {p}
          </button>
        ))}
      </div>
      <div className="w-full max-w-2xl h-[520px]">
        <Scene1_Challenge forcePhase={forcePhase} />
      </div>
    </div>
  );
}
