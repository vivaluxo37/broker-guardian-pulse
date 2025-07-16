import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Sparkles, Shield, TrendingUp, ArrowRight, Star, Globe, ChevronRight, Calculator, Save, User, MessageCircle, DollarSign, Target } from "lucide-react";

interface BrokerData {
  id: string;
  name: string;
  logo: string;
  rating: number;
  badges?: string[];
  description: string;
  features: string[];
  regulatedIn: string[];
  minDeposit: number;
  spreadFrom: number;
  commission: number;
  fees: {
    spreads: number;
    commission: number;
    overnight: number;
    withdrawal: number;
  };
}

interface UserProfile {
  id: string;
  name: string;
  preferences: FormData;
  createdAt: Date;
  recommendedBrokers: string[];
}

interface FormData {
  country: string;
  experience: string;
  tradingStyle: string;
  budget: string;
  interests: string[];
  riskTolerance: string;
  tradingGoals: string;
  regulatoryPreference: string;
  tradingFrequency: string;
}

const allBrokers: BrokerData[] = [
  {
    id: "1",
    name: "eToro",
    logo: "/lovable-uploads/99e27fa7-6c7f-45d9-910c-14d726505db0.png",
    rating: 4.8,
    badges: ["Recommended", "Social Trading"],
    description: "Best for social trading and copy trading",
    features: ["Social Trading", "Copy Trading", "CryptoPortfolio", "Zero Commission Stocks"],
    regulatedIn: ["CySEC", "FCA", "ASIC"],
    minDeposit: 200,
    spreadFrom: 1.0,
    commission: 0,
    fees: { spreads: 1.0, commission: 0, overnight: 0.5, withdrawal: 5 }
  },
  {
    id: "2", 
    name: "XTB",
    logo: "/lovable-uploads/aac12076-ca4e-439d-a1e6-2755b626d8ec.png",
    rating: 4.7,
    badges: ["Low Spreads"],
    description: "Excellent trading platform with low spreads",
    features: ["xStation 5", "MetaTrader 4", "Low Spreads", "Educational Resources"],
    regulatedIn: ["FCA", "CySEC", "IFSC"],
    minDeposit: 250,
    spreadFrom: 0.8,
    commission: 0,
    fees: { spreads: 0.8, commission: 0, overnight: 0.4, withdrawal: 0 }
  },
  {
    id: "3",
    name: "Interactive Brokers", 
    logo: "/lovable-uploads/561ee82c-472c-455c-8e2f-38bda4477310.png",
    rating: 4.6,
    badges: ["Professional"],
    description: "Professional trading tools and global markets",
    features: ["TWS Platform", "Global Markets", "Low Fees", "Advanced Tools"],
    regulatedIn: ["SEC", "FINRA", "FCA", "SFC"],
    minDeposit: 0,
    spreadFrom: 0.2,
    commission: 0.005,
    fees: { spreads: 0.2, commission: 0.005, overnight: 0.3, withdrawal: 0 }
  },
  {
    id: "4",
    name: "Plus500",
    logo: "/lovable-uploads/82626670-5186-47b8-99dc-c2f689dee23b.png", 
    rating: 4.5,
    badges: ["User Friendly"],
    description: "User-friendly CFD trading platform",
    features: ["Simple Platform", "CFD Trading", "Mobile App", "Risk Management"],
    regulatedIn: ["FCA", "CySEC", "ASIC"],
    minDeposit: 100,
    spreadFrom: 0.6,
    commission: 0,
    fees: { spreads: 0.6, commission: 0, overnight: 0.7, withdrawal: 0 }
  },
  {
    id: "5",
    name: "Saxo Bank",
    logo: "/lovable-uploads/16ad8949-08ad-42b9-ab77-3855280f1a1e.png",
    rating: 4.4,
    badges: ["Premium"],
    description: "Premium trading experience with advanced tools",
    features: ["SaxoTraderGO", "Advanced Analysis", "Premium Research", "Multiple Assets"],
    regulatedIn: ["DFSA", "FCA", "FINMA"],
    minDeposit: 2000,
    spreadFrom: 0.4,
    commission: 0.08,
    fees: { spreads: 0.4, commission: 0.08, overnight: 0.4, withdrawal: 0 }
  }
];

export function MatchSection() {
  const [activeTab, setActiveTab] = useState("assistant");
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedBrokers, setSelectedBrokers] = useState<string[]>([]);
  const [savedProfiles, setSavedProfiles] = useState<UserProfile[]>([]);
  const [profileName, setProfileName] = useState("");
  const [tradingVolume, setTradingVolume] = useState(50);
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "Hi! I'm your personal broker matching assistant. Let's find the perfect broker for your trading needs. What's your trading experience level?" }
  ]);
  const [userInput, setUserInput] = useState("");
  
  const [formData, setFormData] = useState<FormData>({
    country: "Philippines",
    experience: "",
    tradingStyle: "",
    budget: "",
    interests: [] as string[],
    riskTolerance: "",
    tradingGoals: "",
    regulatoryPreference: "",
    tradingFrequency: "",
  });

  const steps = [
    { title: "Basic Preferences", step: "1/8" },
    { title: "Experience Level", step: "2/8" },
    { title: "Trading Goals", step: "3/8" },
    { title: "Risk Tolerance", step: "4/8" },
    { title: "Trading Style", step: "5/8" },
    { title: "Budget Range", step: "6/8" },
    { title: "Asset Types", step: "7/8" },
    { title: "Final Result", step: "8/8" }
  ];
  
  // Load saved profiles on component mount
  useEffect(() => {
    const saved = localStorage.getItem('brokerProfiles');
    if (saved) {
      setSavedProfiles(JSON.parse(saved));
    }
  }, []);

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

  const getIntelligentMatches = () => {
    let scored = allBrokers.map(broker => {
      let score = 0;
      
      // Experience-based scoring
      if (formData.experience === "beginner" && ["eToro", "Plus500"].includes(broker.name)) score += 30;
      if (formData.experience === "professional" && ["Interactive Brokers", "Saxo Bank"].includes(broker.name)) score += 30;
      if (formData.experience === "intermediate" && ["XTB", "eToro"].includes(broker.name)) score += 25;
      
      // Budget-based scoring
      const budgetNum = formData.budget === "under-1k" ? 500 : formData.budget === "1k-5k" ? 3000 : 10000;
      if (broker.minDeposit <= budgetNum) score += 20;
      
      // Trading style scoring
      if (formData.tradingStyle === "day-trading" && broker.spreadFrom <= 0.8) score += 25;
      if (formData.tradingStyle === "scalping" && broker.spreadFrom <= 0.5) score += 30;
      if (formData.tradingStyle === "long-term" && broker.commission <= 0.1) score += 20;
      
      // Interest-based scoring
      if (formData.interests.includes("Forex") && broker.spreadFrom <= 1.0) score += 15;
      if (formData.interests.includes("Stocks") && broker.commission <= 0.1) score += 15;
      if (formData.interests.includes("Crypto") && broker.features.includes("CryptoPortfolio")) score += 20;
      
      // Risk tolerance scoring
      if (formData.riskTolerance === "low" && broker.regulatedIn.length >= 2) score += 20;
      if (formData.riskTolerance === "high" && broker.features.includes("Advanced Tools")) score += 15;
      
      return { ...broker, matchScore: score };
    });
    
    return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
  };
  
  const saveProfile = () => {
    if (!profileName.trim()) return;
    
    const newProfile: UserProfile = {
      id: Date.now().toString(),
      name: profileName,
      preferences: { ...formData },
      createdAt: new Date(),
      recommendedBrokers: getIntelligentMatches().map(b => b.id)
    };
    
    const updated = [...savedProfiles, newProfile];
    setSavedProfiles(updated);
    localStorage.setItem('brokerProfiles', JSON.stringify(updated));
    setProfileName("");
  };
  
  const loadProfile = (profile: UserProfile) => {
    setFormData(profile.preferences);
    setCurrentStep(steps.length - 1);
  };
  
  const calculateTradingCosts = (broker: BrokerData, monthlyTrades: number) => {
    const spreadCost = monthlyTrades * broker.fees.spreads;
    const commissionCost = monthlyTrades * broker.fees.commission * 100; // Assuming $100 per trade
    const totalCost = spreadCost + commissionCost;
    return { spreadCost, commissionCost, totalCost };
  };
  
  const handleChatSubmit = () => {
    if (!userInput.trim()) return;
    
    const newMessages = [
      ...chatMessages,
      { role: "user", content: userInput },
      { role: "assistant", content: getAIResponse(userInput) }
    ];
    
    setChatMessages(newMessages);
    setUserInput("");
  };
  
  const getAIResponse = (input: string) => {
    const lower = input.toLowerCase();
    
    if (lower.includes("beginner") || lower.includes("new") || lower.includes("start")) {
      return "Great! For beginners, I recommend brokers with easy-to-use platforms and educational resources. eToro and Plus500 are excellent choices. What's your initial budget for trading?";
    }
    
    if (lower.includes("professional") || lower.includes("advanced") || lower.includes("experienced")) {
      return "Perfect! For professional traders, you'll want advanced tools and low fees. Interactive Brokers and Saxo Bank offer professional-grade platforms. What markets are you interested in trading?";
    }
    
    if (lower.includes("forex") || lower.includes("currency")) {
      return "Forex trading requires tight spreads and reliable execution. Based on your needs, I'd suggest XTB or Interactive Brokers for their competitive forex spreads. What's your trading frequency?";
    }
    
    if (lower.includes("crypto") || lower.includes("bitcoin")) {
      return "For crypto trading, eToro offers a great CryptoPortfolio feature and regulated crypto trading. What's your risk tolerance level?";
    }
    
    return "Thanks for that information! Let me ask you a few more questions to find your perfect match. What's your primary trading goal - short-term profits, long-term investing, or learning to trade?";
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
              <h3 className="text-2xl font-bold mb-2">What are your trading goals?</h3>
              <p className="text-foreground/60">This helps us understand your priorities</p>
            </div>
            <div className="max-w-md mx-auto space-y-3">
              {[
                { value: "short-term-profits", label: "Short-term Profits", desc: "Quick gains and active trading" },
                { value: "long-term-wealth", label: "Long-term Wealth Building", desc: "Steady growth over time" },
                { value: "learning", label: "Learning to Trade", desc: "Educational focus and practice" },
                { value: "supplemental-income", label: "Supplemental Income", desc: "Additional income stream" }
              ].map((option) => (
                <div key={option.value} 
                     className={`p-4 rounded-lg border cursor-pointer transition-all ${
                       formData.tradingGoals === option.value 
                         ? 'border-primary bg-primary/5' 
                         : 'border-border hover:border-primary/50'
                     }`}
                     onClick={() => {
                       setFormData(prev => ({...prev, tradingGoals: option.value}));
                       setTimeout(nextStep, 500);
                     }}>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-foreground/60">{option.desc}</div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">What's your risk tolerance?</h3>
              <p className="text-foreground/60">This affects broker recommendations</p>
            </div>
            <div className="max-w-md mx-auto space-y-3">
              {[
                { value: "low", label: "Conservative", desc: "Prefer stable, regulated brokers" },
                { value: "medium", label: "Moderate", desc: "Balanced approach to risk and returns" },
                { value: "high", label: "Aggressive", desc: "Comfortable with higher risk for potential gains" }
              ].map((option) => (
                <div key={option.value} 
                     className={`p-4 rounded-lg border cursor-pointer transition-all ${
                       formData.riskTolerance === option.value 
                         ? 'border-primary bg-primary/5' 
                         : 'border-border hover:border-primary/50'
                     }`}
                     onClick={() => {
                       setFormData(prev => ({...prev, riskTolerance: option.value}));
                       setTimeout(nextStep, 500);
                     }}>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-foreground/60">{option.desc}</div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">What's your trading style?</h3>
              <p className="text-foreground/60">Different styles need different features</p>
            </div>
            <div className="max-w-md mx-auto space-y-3">
              {[
                { value: "day-trading", label: "Day Trading", desc: "Positions opened and closed same day" },
                { value: "swing-trading", label: "Swing Trading", desc: "Positions held for days to weeks" },
                { value: "long-term", label: "Long-term Investing", desc: "Buy and hold strategy" },
                { value: "scalping", label: "Scalping", desc: "Very short-term, quick profits" }
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
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-foreground/60">{option.desc}</div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 5:
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
      
      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">What do you want to trade?</h3>
              <p className="text-foreground/60">Select all that apply</p>
            </div>
            <div className="max-w-md mx-auto">
              <div className="grid grid-cols-2 gap-3 mb-6">
                {["Stocks", "Forex", "Crypto", "CFDs", "Commodities", "Indices"].map((interest) => (
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
      
      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Your Perfect Matches</h3>
              <p className="text-foreground/60">Based on your preferences, here are your top broker recommendations</p>
            </div>
            
            {/* Save Profile Option */}
            <div className="max-w-md mx-auto mb-6 p-4 bg-background/50 rounded-lg border border-border">
              <div className="flex items-center space-x-2 mb-3">
                <Save className="h-4 w-4" />
                <span className="font-medium">Save this profile for future use</span>
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Profile name (e.g., 'My Trading Profile')"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={saveProfile} size="sm">Save</Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {getIntelligentMatches().map((broker, index) => (
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
                          <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1">
                            {broker.matchScore}% match
                          </Badge>
                          {broker.badges?.map((badge) => (
                            <Badge key={badge} className="bg-gradient-accent text-accent-foreground text-xs px-2 py-1">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-foreground/60">{broker.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < Math.floor(broker.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                            ))}
                            <span className="text-sm text-foreground/60 ml-1">{broker.rating}</span>
                          </div>
                          <span className="text-xs text-foreground/60">Min: ${broker.minDeposit}</span>
                          <span className="text-xs text-foreground/60">Spread: {broker.spreadFrom}%</span>
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
                <Button variant="premium" size="lg" className="group min-w-[250px]" onClick={() => setActiveTab("calculator")}>
                  Compare fees for these {selectedBrokers.length} brokers
                  <Calculator className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
            Intelligent Broker Assistant
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Find Your Perfect Broker
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
            AI-powered matching with decision trees, profile saving, and fee comparison
          </p>
        </div>
        
        {/* Enhanced Interface with Tabs */}
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="assistant" className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>AI Chat</span>
              </TabsTrigger>
              <TabsTrigger value="questionnaire" className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Questionnaire</span>
              </TabsTrigger>
              <TabsTrigger value="profiles" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Saved Profiles</span>
              </TabsTrigger>
              <TabsTrigger value="calculator" className="flex items-center space-x-2">
                <Calculator className="h-4 w-4" />
                <span>Fee Calculator</span>
              </TabsTrigger>
            </TabsList>
            
            {/* AI Chat Assistant */}
            <TabsContent value="assistant">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageCircle className="h-5 w-5" />
                      <span>AI Broker Assistant</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-80 overflow-y-auto mb-4 space-y-4">
                      {chatMessages.map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted text-foreground'
                          }`}>
                            {message.content}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Tell me about your trading experience..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                        className="flex-1"
                      />
                      <Button onClick={handleChatSubmit}>Send</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
                  <CardHeader>
                    <CardTitle>Quick Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {allBrokers.slice(0, 3).map((broker, index) => (
                        <div key={broker.id} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded border border-border bg-background flex items-center justify-center">
                              <img src={broker.logo} alt={broker.name} className="w-6 h-6 object-contain" />
                            </div>
                            <div>
                              <h4 className="font-medium">{broker.name}</h4>
                              <p className="text-sm text-foreground/60">{broker.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Enhanced Questionnaire */}
            <TabsContent value="questionnaire">
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
                        {(currentStep === steps.length - 1 ? getIntelligentMatches() : allBrokers.slice(0, 5)).map((broker, index) => (
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
                                      <Badge key={badge} className="bg-gradient-accent text-accent-foreground text-xs px-1 py-0.5">
                                        {badge}
                                      </Badge>
                                    ))}
                                  </div>
                                  <p className="text-sm text-foreground/60">{broker.description}</p>
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-foreground/40" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Saved Profiles */}
            <TabsContent value="profiles">
              <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Saved Profiles</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {savedProfiles.length === 0 ? (
                    <div className="text-center py-8">
                      <User className="h-12 w-12 mx-auto text-foreground/40 mb-4" />
                      <p className="text-foreground/60">No saved profiles yet. Complete the questionnaire to save your preferences.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {savedProfiles.map((profile) => (
                        <div key={profile.id} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all cursor-pointer"
                             onClick={() => loadProfile(profile)}>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{profile.name}</h4>
                              <p className="text-sm text-foreground/60">
                                {profile.preferences.experience} trader • {profile.preferences.tradingStyle} • {profile.preferences.budget}
                              </p>
                              <p className="text-xs text-foreground/40">
                                Created: {profile.createdAt.toLocaleDateString()}
                              </p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-foreground/40" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Fee Calculator */}
            <TabsContent value="calculator">
              <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calculator className="h-5 w-5" />
                    <span>Trading Cost Calculator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <Label>Monthly Trading Volume (number of trades)</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <input
                        type="range"
                        min="1"
                        max="200"
                        value={tradingVolume}
                        onChange={(e) => setTradingVolume(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-12">{tradingVolume}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allBrokers.map((broker) => {
                      const costs = calculateTradingCosts(broker, tradingVolume);
                      return (
                        <Card key={broker.id} className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-8 h-8 rounded border border-border bg-background flex items-center justify-center">
                              <img src={broker.logo} alt={broker.name} className="w-5 h-5 object-contain" />
                            </div>
                            <h4 className="font-medium">{broker.name}</h4>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Spread Cost:</span>
                              <span>${costs.spreadCost.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Commission:</span>
                              <span>${costs.commissionCost.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-medium border-t pt-2">
                              <span>Total Monthly:</span>
                              <span className="text-primary">${costs.totalCost.toFixed(2)}</span>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700">
                      💡 <strong>Tip:</strong> Consider both spreads and commissions when comparing costs. 
                      For high-frequency trading, tight spreads matter more. For long-term investing, low commissions are key.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}