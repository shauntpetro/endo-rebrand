"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import GrantHighlight from "@/components/GrantHighlight";
import MissionPillars from "@/components/MissionPillars";
import TransitionStatement from "@/components/TransitionStatement";
import InnovationSection from "@/components/InnovationSection";
import PipelinePreview from "@/components/PipelinePreview";
import ImpactSection from "@/components/ImpactSection";
import AchievementBar from "@/components/AchievementBar";

export default function Home() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-[#F8F9FA]"
    >
      <Navbar />
      <Hero />
      <AchievementBar theme="light" />
      <GrantHighlight />
      <MissionPillars />
      
      <TransitionStatement />

      <InnovationSection />
      <PipelinePreview />
      <ImpactSection />
      <AchievementBar />
      <Footer />
    </motion.main>
  );
}
