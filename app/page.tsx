import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import MilestoneProofBar from "@/components/MilestoneProofBar";
import { SectionSkeleton } from "@/components/ui/Skeleton";

const AchievementBar = dynamic(() => import("@/components/AchievementBar"), {
  loading: () => <SectionSkeleton height="h-16" />,
});
const WhyNowSection = dynamic(() => import("@/components/WhyNowSection"), {
  loading: () => <SectionSkeleton height="h-96" />,
});
const GrantHighlight = dynamic(() => import("@/components/GrantHighlight"), {
  loading: () => <SectionSkeleton height="h-80" />,
});
const CredibilitySection = dynamic(() => import("@/components/CredibilitySection"), {
  loading: () => <SectionSkeleton height="h-48" />,
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <SectionSkeleton height="h-96" />,
});
const MissionPillars = dynamic(() => import("@/components/MissionPillars"), {
  loading: () => <SectionSkeleton height="h-96" />,
});
const TransitionStatement = dynamic(() => import("@/components/TransitionStatement"), {
  loading: () => <SectionSkeleton height="h-screen" />,
});
const InnovationSection = dynamic(() => import("@/components/InnovationSection"), {
  loading: () => <SectionSkeleton height="h-96" />,
});
const PipelinePreview = dynamic(() => import("@/components/PipelinePreview"), {
  loading: () => <SectionSkeleton height="h-96" />,
});
const ImpactSection = dynamic(() => import("@/components/ImpactSection"), {
  loading: () => <SectionSkeleton height="h-96" />,
});

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Navbar />
      <Hero />
      <MilestoneProofBar />
      <AchievementBar theme="light" />
      <WhyNowSection />
      <GrantHighlight />
      <CredibilitySection />
      <Testimonials />
      <MissionPillars />

      <TransitionStatement />

      <InnovationSection />
      <PipelinePreview />
      <ImpactSection />
      <AchievementBar />
      <Footer />
    </main>
  );
}
