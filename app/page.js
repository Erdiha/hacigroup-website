import Hero from "@/components/sections/Hero";
import ComparisonSection from "@/components/sections/ComparisonSection";
import ProgramCards from "@/components/sections/ProgramCards";
import StatsStrip from "@/components/sections/StatsStrip";
import CTABanner from "@/components/sections/CTABanner";

export default function Page() {
  return (
    <>
      <Hero />
      <ComparisonSection />
      <ProgramCards />
      <StatsStrip />
      <CTABanner />
    </>
  );
}
