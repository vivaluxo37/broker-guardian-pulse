import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Bot, Sparkles, Shield, TrendingUp, ArrowRight, Star, Globe, ChevronRight } from "lucide-react";

interface BrokerData {
  id: string;
  name: string;
  logo: string;
  rating: number;
  badges?: string[];
  description: string;
}

const allBrokers: BrokerData[] = [
  {
    id: "1",
    name: "eToro",
    logo: "/lovable-uploads/99e27fa7-6c7f-45d9-910c-14d726505db0.png",
    rating: 4.8,
    badges: ["Recommended"],
    description: "Best for social trading"
  },
  {
    id: "2", 
    name: "XTB",
    logo: "/lovable-uploads/aac12076-ca4e-439d-a1e6-2755b626d8ec.png",
    rating: 4.7,
    description: "Excellent trading platform"
  },
  {
    id: "3",
    name: "Interactive Brokers", 
    logo: "/lovable-uploads/561ee82c-472c-455c-8e2f-38bda4477310.png",
    rating: 4.6,
    description: "Professional trading tools"
  },
  {
    id: "4",
    name: "Plus500",
    logo: "/lovable-uploads/82626670-5186-47b8-99dc-c2f689dee23b.png", 
    rating: 4.5,
    description: "User-friendly CFD trading"
  },
  {
    id: "5",
    name: "Saxo Bank",
    logo: "/lovable-uploads/16ad8949-08ad-42b9-ab77-3855280f1a1e.png",
    rating: 4.4,
    description: "Premium trading experience"
  }
];

export function MatchSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedBrokers, setSelectedBrokers] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    country: "Philippines",
    experience: "",
    tradingStyle: "",
    budget: "",
    interests: [] as string[],
  });

  const steps = [
    { title: "Basic Preferences", step: "1/6" },
    { title: "Experience Level", step: "2/6" },
    { title: "Trading Style", step: "3/6" },
    { title: "Budget Range", step: "4/6" },
    { title: "Asset Types", step: "5/6" },
    { title: "Final Result", step: "6/6" }
  ];

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        interests: prev.interests.filter(i => i !== interest)
      }));
    }
  };

  const getFilteredBrokers = () => {
    // Simple filtering logic based on form data
    let filtered = [...allBrokers];
    
    if (formData.experience === "beginner") {
      filtered = filtered.filter(b => ["eToro", "Plus500"].includes(b.name));
    } else if (formData.experience === "professional") {
      filtered = filtered.filter(b => ["Interactive Brokers", "Saxo Bank"].includes(b.name));
    }
    
    return filtered.slice(0, 3); // Show top 3 matches
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const toggleBrokerSelection = (brokerId: string) => {
    setSelectedBrokers(prev => 
      prev.includes(brokerId) 
        ? prev.filter(id => id !== brokerId)
        : [...prev, brokerId]
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Where do you live?</h3>
              <p className="text-foreground/60">Please select your country</p>
            </div>
            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-3 p-4 bg-background/50 backdrop-blur-sm rounded-lg border border-border cursor-pointer hover:border-primary/50 transition-colors">
                <span className="text-3xl">🇵🇭</span>
                <span className="font-medium text-lg">Philippines</span>
              </div>
              <div className="mt-6 text-center">
                <Button onClick={nextStep} variant="premium" size="lg" className="group min-w-[200px]">
                  Start matching
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700 text-center">
                  Go ahead! Future you will be grateful for starting this tool!
                </p>
              </div>
            </div>
          </div>
        );
      
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">What's your trading experience?</h3>
              <p className="text-foreground/60">This helps us recommend suitable brokers</p>
            </div>
            <div className="max-w-md mx-auto space-y-3">
              {[
                { value: "beginner", label: "Beginner (0-1 years)" },
                { value: "intermediate", label: "Intermediate (1-3 years)" },
                { value: "advanced", label: "Advanced (3+ years)" },
                { value: "professional", label: "Professional Trader" }
              ].map((option) => (
                <div key={option.value} 
                     className={`p-4 rounded-lg border cursor-pointer transition-all ${
                       formData.experience === option.value 
                         ? 'border-primary bg-primary/5' 
                         : 'border-border hover:border-primary/50'
                     }`}
                     onClick={() => {
                       setFormData(prev => ({...prev, experience: option.value}));
                       setTimeout(nextStep, 500);
                     }}>
                  <span className="font-medium">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">What's your trading style?</h3>
              <p className="text-foreground/60">Different styles need different features</p>
            </div>
            <div className="max-w-md mx-auto space-y-3">
              {[
                { value: "day-trading", label: "Day Trading" },
                { value: "swing-trading", label: "Swing Trading" },
                { value: "long-term", label: "Long-term Investing" },
                { value: "scalping", label: "Scalping" }
              ].map((option) => (
                <div key={option.value} 
                     className={`p-4 rounded-lg border cursor-pointer transition-all ${
                       formData.tradingStyle === option.value 
                         ? 'border-primary bg-primary/5' 
                         : 'border-border hover:border-primary/50'
                     }`}
                     onClick={() => {
                       setFormData(prev => ({...prev, tradingStyle: option.value}));
                       setTimeout(nextStep, 500);
                     }}>
                  <span className="font-medium">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">What's your initial deposit?</h3>
              <p className="text-foreground/60">This affects minimum requirements</p>
            </div>
            <div className="max-w-md mx-auto space-y-3">
              {[
                { value: "under-1k", label: "Under $1,000" },
                { value: "1k-5k", label: "$1,000 - $5,000" },
                { value: "5k-10k", label: "$5,000 - $10,000" },
                { value: "over-10k", label: "Over $10,000" }
              ].map((option) => (
                <div key={option.value} 
                     className={`p-4 rounded-lg border cursor-pointer transition-all ${
                       formData.budget === option.value 
                         ? 'border-primary bg-primary/5' 
                         : 'border-border hover:border-primary/50'
                     }`}
                     onClick={() => {
                       setFormData(prev => ({...prev, budget: option.value}));
                       setTimeout(nextStep, 500);
                     }}>
                  <span className="font-medium">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">What do you want to trade?</h3>
              <p className="text-foreground/60">Select all that apply</p>
            </div>
            <div className="max-w-md mx-auto">
              <div className="grid grid-cols-2 gap-3 mb-6">
                {["Stocks", "Forex", "Crypto", "CFDs"].map((interest) => (
                  <div key={interest} 
                       className={`p-3 rounded-lg border cursor-pointer transition-all text-center ${
                         formData.interests.includes(interest) 
                           ? 'border-primary bg-primary/5' 
                           : 'border-border hover:border-primary/50'
                       }`}
                       onClick={() => handleInterestChange(interest, !formData.interests.includes(interest))}>
                    <span className="font-medium">{interest}</span>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Button onClick={nextStep} variant="premium" size="lg" className="group min-w-[200px]">
                  Get my matches
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Your Perfect Matches</h3>
              <p className="text-foreground/60">Based on your preferences, here are your top broker recommendations</p>
            </div>
            <div className="space-y-4">
              {getFilteredBrokers().map((broker, index) => (
                <div key={broker.id} 
                     className={`p-4 rounded-lg border transition-all cursor-pointer ${
                       selectedBrokers.includes(broker.id) 
                         ? 'border-primary bg-primary/5' 
                         : 'border-border hover:border-primary/50'
                     }`}
                     onClick={() => toggleBrokerSelection(broker.id)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                          {index + 1}
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded border border-border bg-background flex items-center justify-center">
                        <img src={broker.logo} alt={broker.name} className="w-8 h-8 object-contain" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{broker.name}</h4>
                          {broker.badges?.map((badge) => (
                            <Badge key={badge} className="bg-gradient-accent text-accent-foreground text-xs px-2 py-1">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-foreground/60">{broker.description}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < Math.floor(broker.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                          ))}
                          <span className="text-sm text-foreground/60 ml-1">{broker.rating}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-foreground/40" />
                  </div>
                </div>
              ))}
            </div>
            {selectedBrokers.length > 0 && (
              <div className="text-center mt-6">
                <Button variant="premium" size="lg" className="group min-w-[250px]">
                  Compare these {selectedBrokers.length} brokers
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section id="match" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* AI Assistant Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-accent text-accent-foreground">
            <Bot className="h-4 w-4 mr-2" />
            Powered by AI
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Get matched with top online brokers
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
            Unveil your perfect brokers, one answer at a time
          </p>
        </div>

        {/* Matching Interface */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Form */}
            <div>
              <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-2 bg-gray-200 rounded-full flex-1 max-w-[200px]">
                        <div 
                          className="h-2 bg-gradient-primary rounded-full transition-all duration-500"
                          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-foreground/60">{steps[currentStep].step}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">
                    {steps[currentStep].title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {renderStepContent()}
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Broker List */}
            <div>
              <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {currentStep === steps.length - 1 ? "Your Matches" : "Top Brokers in Philippines"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {(currentStep === steps.length - 1 ? getFilteredBrokers() : allBrokers.slice(0, 5)).map((broker, index) => (
                      <div key={broker.id} 
                           className={`p-4 rounded-lg border transition-all cursor-pointer ${
                             currentStep === steps.length - 1 && selectedBrokers.includes(broker.id)
                               ? 'border-primary bg-primary/5' 
                               : 'border-border hover:border-primary/50'
                           }`}
                           onClick={() => currentStep === steps.length - 1 && toggleBrokerSelection(broker.id)}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                              {index + 1}
                            </span>
                            <div className="w-10 h-10 rounded border border-border bg-background flex items-center justify-center">
                              <img src={broker.logo} alt={broker.name} className="w-6 h-6 object-contain" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium">{broker.name}</h4>
                                {broker.badges?.map((badge) => (
                                  <Badge key={badge} className="bg-gradient-accent text-accent-foreground text-xs px-1.5 py-0.5">
                                    {badge}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center space-x-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`h-3 w-3 ${i < Math.floor(broker.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                                ))}
                                <span className="text-xs text-foreground/60 ml-1">{broker.rating}</span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-foreground/40" />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {currentStep === steps.length - 1 && selectedBrokers.length > 0 && (
                    <div className="mt-6 text-center">
                      <Button variant="premium" size="lg" className="group w-full">
                        Compare these {selectedBrokers.length} brokers
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}