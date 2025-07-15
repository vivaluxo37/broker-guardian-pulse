import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Bot, Sparkles, Shield, TrendingUp, ArrowRight } from "lucide-react";

export function MatchSection() {
  const [formData, setFormData] = useState({
    experience: "",
    tradingStyle: "",
    budget: "",
    interests: [] as string[],
  });

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

  const handleMatch = () => {
    // Simulate matching process
    console.log("Matching with data:", formData);
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
              Meet Nuri AI Assistant
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
            Get instant answers 24/7 with our AI-powered investing assistant for broker recommendations, 
            finance answers, and smarter investment decisions.
          </p>
          
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 shadow-glow">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-gradient-primary rounded-2xl shadow-glow animate-glow-pulse">
                  <Bot className="h-12 w-12 text-primary-foreground" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Ask Nuri AI Now</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input 
                  placeholder="Ask me anything about brokers, trading, or investing..."
                  className="flex-1 h-12 bg-background/50 backdrop-blur-sm border-border"
                />
                <Button variant="premium" size="lg" className="group">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Ask Nuri
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Matching Form */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Find Your Perfect Broker Match
                </span>
              </CardTitle>
              <p className="text-foreground/70">
                Answer a few questions and we'll match you with the best brokers for your needs
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Experience Level */}
                <div className="space-y-3">
                  <Label htmlFor="experience" className="text-base font-medium">
                    Trading Experience
                  </Label>
                  <Select value={formData.experience} onValueChange={(value) => setFormData(prev => ({...prev, experience: value}))}>
                    <SelectTrigger className="h-12 bg-background/50 backdrop-blur-sm">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                      <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                      <SelectItem value="professional">Professional Trader</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Trading Style */}
                <div className="space-y-3">
                  <Label htmlFor="style" className="text-base font-medium">
                    Trading Style
                  </Label>
                  <Select value={formData.tradingStyle} onValueChange={(value) => setFormData(prev => ({...prev, tradingStyle: value}))}>
                    <SelectTrigger className="h-12 bg-background/50 backdrop-blur-sm">
                      <SelectValue placeholder="Select your trading style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day-trading">Day Trading</SelectItem>
                      <SelectItem value="swing-trading">Swing Trading</SelectItem>
                      <SelectItem value="long-term">Long-term Investing</SelectItem>
                      <SelectItem value="scalping">Scalping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget */}
                <div className="space-y-3">
                  <Label htmlFor="budget" className="text-base font-medium">
                    Initial Deposit
                  </Label>
                  <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({...prev, budget: value}))}>
                    <SelectTrigger className="h-12 bg-background/50 backdrop-blur-sm">
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-1k">Under $1,000</SelectItem>
                      <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                      <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                      <SelectItem value="over-10k">Over $10,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Country/Region
                  </Label>
                  <div className="flex items-center space-x-2 p-3 bg-background/50 backdrop-blur-sm rounded-lg border border-border">
                    <span className="text-2xl">🇵🇭</span>
                    <span className="font-medium">Philippines</span>
                  </div>
                </div>
              </div>

              {/* Trading Interests */}
              <div className="mt-8">
                <Label className="text-base font-medium mb-4 block">
                  What are you interested in trading?
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "Stocks", "Forex", "Crypto", "CFDs", 
                    "Options", "Commodities", "ETFs", "Bonds"
                  ].map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox 
                        id={interest}
                        checked={formData.interests.includes(interest)}
                        onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                      />
                      <Label htmlFor={interest} className="text-sm font-medium cursor-pointer">
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 text-center">
                <Button 
                  variant="premium" 
                  size="xl" 
                  onClick={handleMatch}
                  className="group min-w-[300px]"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  Get My Broker Matches
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-sm text-foreground/60 mt-4">
                  Free matching • No obligations • Regulated brokers only
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
                  <Shield className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">All Brokers Regulated</h3>
              <p className="text-sm text-foreground/60">We only recommend regulated and licensed brokers</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-accent rounded-xl shadow-accent-glow">
                  <TrendingUp className="h-6 w-6 text-accent-foreground" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">Real Money Testing</h3>
              <p className="text-sm text-foreground/60">We test brokers with our own money</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-secondary rounded-xl">
                  <Sparkles className="h-6 w-6 text-secondary-foreground" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">600+ Data Points</h3>
              <p className="text-sm text-foreground/60">Comprehensive analysis for each broker</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}