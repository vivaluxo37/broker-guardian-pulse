import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, TrendingUp, Shield, Award, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const topBrokers = [
  {
    rank: 1,
    name: "Interactive Brokers",
    logo: "/lovable-uploads/64b914e9-41e8-49b4-9132-f149648ce8ff.png",
    category: "Best Overall Broker",
    rating: 4.8,
    warning: "Check regulatory status",
    features: ["Low Fees", "Global Markets", "Advanced Tools"],
    highlight: "premium"
  },
  {
    rank: 2,
    name: "IC Markets",
    logo: "/lovable-uploads/64b914e9-41e8-49b4-9132-f149648ce8ff.png",
    category: "Lowest Spread Forex",
    rating: 4.7,
    warning: "70.64% of retail CFD accounts lose money",
    features: ["Tight Spreads", "Fast Execution", "MetaTrader"],
    highlight: "warning"
  },
  {
    rank: 3,
    name: "XTB",
    logo: "/lovable-uploads/bd73de64-343f-42de-b45f-6a008af2235f.png",
    category: "Best CFD Broker",
    rating: 4.6,
    warning: "78% of retail CFD accounts lose money",
    features: ["User Friendly", "Education", "xStation Platform"],
    highlight: "info"
  },
];

const brokerOfMonth = {
  name: "FP Markets",
  logo: "/lovable-uploads/af8d1c16-b424-4842-813a-c6c4f0033292.png",
  description: "Outstanding performance in trading conditions and customer service",
  rating: 4.9,
  features: ["Award Winning", "Regulated", "Low Costs"]
};

export function BrokerSection() {
  const navigate = useNavigate();
  
  return (
    <section id="brokers" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Broker of the Month */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-accent text-accent-foreground">
            <Award className="h-4 w-4 mr-2" />
            Broker of the Month
          </Badge>
          
          <Card className="max-w-4xl mx-auto bg-gradient-secondary border-accent/20 shadow-accent-glow hover:shadow-glow transition-all duration-500 hover:scale-105">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-background rounded-2xl p-4 shadow-elegant">
                    <img 
                      src={brokerOfMonth.logo} 
                      alt={brokerOfMonth.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">{brokerOfMonth.name}</h3>
                  <p className="text-foreground/70 mb-4">{brokerOfMonth.description}</p>
                  
                  <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(brokerOfMonth.rating) ? 'text-accent fill-current' : 'text-muted-foreground'}`} 
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium">{brokerOfMonth.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                    {brokerOfMonth.features.map((feature) => (
                      <Badge key={feature} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <Button variant="premium" size="lg" className="group">
                    Visit Broker
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Leading Brokers of 2025
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Our top-rated broker recommendations based on comprehensive analysis and real money testing
          </p>
        </div>

        {/* Top Brokers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {topBrokers.map((broker, index) => (
            <Card 
              key={broker.name}
              className={`group hover:shadow-elegant transition-all duration-500 hover:scale-105 border-2 ${
                broker.highlight === 'premium' ? 'border-accent/50 bg-gradient-to-br from-accent/5 to-primary/5' :
                broker.highlight === 'warning' ? 'border-destructive/30' :
                'border-border'
              }`}
            >
              <CardContent className="p-6">
                {/* Rank Badge */}
                <div className="flex items-center justify-between mb-4">
                  <Badge className={`${
                    index === 0 ? 'bg-gradient-accent text-accent-foreground' :
                    index === 1 ? 'bg-gradient-primary text-primary-foreground' :
                    'bg-gradient-secondary text-secondary-foreground'
                  }`}>
                    #{broker.rank} {broker.category}
                  </Badge>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(broker.rating) ? 'text-accent fill-current' : 'text-muted-foreground'}`} 
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">{broker.rating}</span>
                  </div>
                </div>

                {/* Broker Info */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-background rounded-xl p-2 shadow-card">
                    <img 
                      src={broker.logo} 
                      alt={broker.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{broker.name}</h3>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {broker.features.map((feature) => (
                    <Badge key={feature} variant="outline">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Warning */}
                <div className="text-sm text-destructive/80 mb-6 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  ⚠️ {broker.warning}
                </div>

                {/* Action Button */}
                <Button 
                  variant={index === 0 ? "premium" : "default"} 
                  className="w-full group"
                >
                  Visit Broker
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-lg text-foreground/70 mb-6">
            Check out our top broker recommendations in the Philippines
          </p>
          <Button 
            variant="outline" 
            size="lg" 
            className="group"
            onClick={() => navigate("/broker-reviews")}
          >
            See All Broker Reviews
            <TrendingUp className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}