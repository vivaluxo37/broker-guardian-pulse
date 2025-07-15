import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  const { t } = useTranslation();
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Shield className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Trusted by 992K+ traders</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              {t('hero.title')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => scrollToSection("#match")}
              className="group"
            >
              {t('hero.matchButton')}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="glass" 
              size="xl"
              onClick={() => scrollToSection("#brokers")}
            >
              {t('hero.learnMore')}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="bg-card/20 backdrop-blur-sm border border-border rounded-2xl p-6 hover:shadow-card transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
                  <Shield className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">600+</h3>
              <p className="text-foreground/60">Data points analyzed per broker</p>
            </div>
            
            <div className="bg-card/20 backdrop-blur-sm border border-border rounded-2xl p-6 hover:shadow-card transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-accent rounded-xl shadow-accent-glow">
                  <TrendingUp className="h-6 w-6 text-accent-foreground" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">9+</h3>
              <p className="text-foreground/60">Years of broker expertise</p>
            </div>
            
            <div className="bg-card/20 backdrop-blur-sm border border-border rounded-2xl p-6 hover:shadow-card transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-secondary rounded-xl">
                  <Users className="h-6 w-6 text-secondary-foreground" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">992K</h3>
              <p className="text-foreground/60">Successful matches made</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground/30 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}