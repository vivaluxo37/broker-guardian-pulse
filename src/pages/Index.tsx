import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { BrokerSection } from "@/components/BrokerSection";
import { MatchSection } from "@/components/MatchSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
