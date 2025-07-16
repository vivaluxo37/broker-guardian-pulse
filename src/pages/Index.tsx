import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { BrokerSection } from "@/components/BrokerSection";
import { MatchSection } from "@/components/MatchSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white text-slate-800">
      <Navigation />
      <HeroSection />
      <BrokerSection />
      <MatchSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
