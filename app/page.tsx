"use client";

import { OverlayProvider } from "@/components/film/overlay";
import HUD from "@/components/film/HUD";
import OverlayHost from "@/components/film/OverlayHost";

import CoverScene from "@/components/film/scenes/CoverScene";
import ProblemScene from "@/components/film/scenes/ProblemScene";
import PlatformScene from "@/components/film/scenes/PlatformScene";
import MechanismScene from "@/components/film/scenes/MechanismScene";
import PipelineScene from "@/components/film/scenes/PipelineScene";
import ProofScene from "@/components/film/scenes/ProofScene";
import TeamScene from "@/components/film/scenes/TeamScene";
import AskScene from "@/components/film/scenes/AskScene";

export default function Film() {
  return (
    <OverlayProvider>
      <HUD />
      <main id="main-content">
        <CoverScene />
        <ProblemScene />
        <PlatformScene />
        <MechanismScene />
        <PipelineScene />
        <ProofScene />
        <TeamScene />
        <AskScene />
      </main>
      <OverlayHost />
    </OverlayProvider>
  );
}
