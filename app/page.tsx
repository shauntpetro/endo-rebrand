import dynamic from "next/dynamic";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import MilestoneProofBar from "@/components/MilestoneProofBar";
import { SectionSkeleton } from "@/components/ui/Skeleton";
import { Eyebrow } from "@/components/ui/Eyebrow";

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
    <main className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      <Hero />
      <MilestoneProofBar />
      <WhyNowSection />
      <GrantHighlight />
      <CredibilitySection />
      <Testimonials />
      <MissionPillars />

      <InnovationSection />
      <PipelinePreview />
      <ImpactSection />
      <section className="bg-plum-dark text-white py-16">
        <div className="container mx-auto px-6">
          <Eyebrow tone="gold-on-dark" className="mb-8 text-center block">Continue Exploring</Eyebrow>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { href: "/innovation", title: "The Mechanism", desc: "How our peptides act only in diseased tissue" },
              { href: "/imaging", title: "How We Detect It", desc: "FemLUNA™ non-invasive imaging" },
              { href: "/pipeline", title: "How We Treat It", desc: "Our matched therapeutic & diagnostic pairs" },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="group rounded-xl border border-white/10 hover:border-gold-primary/50 bg-white/5 hover:bg-white/10 p-6 transition-all duration-300">
                <div className="text-lg font-serif font-bold mb-1 group-hover:text-gold-primary transition-colors">{c.title}</div>
                <div className="text-sm text-white/60 leading-relaxed">{c.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
