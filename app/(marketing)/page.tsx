import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import WorkflowSection from "@/components/landing/WorkflowSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import AuctionShowcase from "@/components/landing/AuctionShowcase";
import ResultsShowcase from "@/components/landing/ResultsShowcase";
import ByovSection from "@/components/landing/ByovSection";
import ComparisonSection from "@/components/landing/ComparisonSection";
import PricingSection from "@/components/landing/PricingSection";
import FaqSection from "@/components/landing/FaqSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      <main>
        <HeroSection />
        <ProblemSection />
        <WorkflowSection />
        <FeaturesSection />
        <AuctionShowcase />
        <ResultsShowcase />
        <ByovSection />
        <ComparisonSection />
        <PricingSection />
        <FaqSection />
      </main>
    </div>
  );
}
