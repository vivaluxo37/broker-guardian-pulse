import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, CheckCircle, XCircle, Smartphone, Trophy } from "lucide-react";

interface Broker {
  id: string;
  name: string;
  logo: string;
  rating: number;
  isAwardWinner: boolean;
  peopleCount: number;
  feeLevel: "Low" | "Average" | "High";
  feeRating: number;
  inactivityFee: boolean;
  investorProtection: boolean;
  mobilePlatform: boolean;
  mobileRating?: number;
  riskDisclaimer?: string;
  recommended?: boolean;
}

const brokers: Broker[] = [
  {
    id: "interactive-brokers",
    name: "Interactive Brokers",
    logo: "/lovable-uploads/af8d1c16-b424-4842-813a-c6c4f0033292.png",
    rating: 4.9,
    isAwardWinner: true,
    peopleCount: 250621,
    feeLevel: "Low",
    feeRating: 4.3,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.3,
    recommended: true
  },
  {
    id: "ic-markets",
    name: "IC Markets",
    logo: "/lovable-uploads/64b914e9-41e8-49b4-9132-f149648ce8ff.png",
    rating: 4.4,
    isAwardWinner: false,
    peopleCount: 31363,
    feeLevel: "Low",
    feeRating: 4.5,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.8,
    riskDisclaimer: "70.64% of retail CFD accounts lose money",
    recommended: true
  },
  {
    id: "xtb",
    name: "XTB",
    logo: "/lovable-uploads/0eabf75e-7984-481a-85ea-46dfc5362774.png",
    rating: 4.7,
    isAwardWinner: true,
    peopleCount: 56311,
    feeLevel: "Low",
    feeRating: 4.3,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.4,
    riskDisclaimer: "78% of retail CFD accounts lose money",
    recommended: true
  },
  {
    id: "ig",
    name: "IG",
    logo: "/lovable-uploads/e43933f0-8529-4995-8e41-1af47089bad1.png",
    rating: 4.4,
    isAwardWinner: false,
    peopleCount: 19037,
    feeLevel: "Low",
    feeRating: 3.6,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 5.0,
    riskDisclaimer: "70% of retail CFD accounts lose money"
  },
  {
    id: "xm",
    name: "XM",
    logo: "/lovable-uploads/faae4d4b-1b85-41bd-b95d-0021424f7af8.png",
    rating: 4.2,
    isAwardWinner: false,
    peopleCount: 6163,
    feeLevel: "Low",
    feeRating: 3.9,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.8,
    riskDisclaimer: "76.24% of retail CFD accounts lose money"
  },
  {
    id: "eightcap",
    name: "Eightcap",
    logo: "/lovable-uploads/f9612c51-17be-4caf-934a-b51871174c0d.png",
    rating: 4.2,
    isAwardWinner: false,
    peopleCount: 1599,
    feeLevel: "Low",
    feeRating: 4.1,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.8,
    riskDisclaimer: "59.57% of retail CFD accounts lose money"
  },
  {
    id: "fbs",
    name: "FBS",
    logo: "/lovable-uploads/4ca082a3-c41f-493b-905f-e7681ae97a34.png",
    rating: 4.0,
    isAwardWinner: false,
    peopleCount: 1689,
    feeLevel: "Low",
    feeRating: 3.9,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.3,
    riskDisclaimer: "71.99% of retail CFD accounts lose money"
  },
  {
    id: "vantage",
    name: "Vantage",
    logo: "/lovable-uploads/bc9c7d52-7497-4515-bba5-c3998d6dd692.png",
    rating: 4.2,
    isAwardWinner: false,
    peopleCount: 5616,
    feeLevel: "Low",
    feeRating: 3.8,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.3,
    riskDisclaimer: "74-89% of retail CFD accounts lose money"
  }
];

const assetTypes = [
  "Stock, ETF", "Forex", "Fund", "Bond", "Options", "Futures", "Crypto", "CFD"
];

const BrokerReviews = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);

  const toggleAssetFilter = (asset: string) => {
    setSelectedAssets(prev => 
      prev.includes(asset) 
        ? prev.filter(a => a !== asset)
        : [...prev, asset]
    );
  };

  const filteredBrokers = brokers.filter(broker => {
    const matchesSearch = broker.name.toLowerCase().includes(searchTerm.toLowerCase());
    // For now, showing all brokers regardless of asset filter
    return matchesSearch;
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating}/5</span>
      </div>
    );
  };

  const getFeeColor = (level: string) => {
    switch (level) {
      case "Low": return "text-green-600";
      case "Average": return "text-yellow-600";
      case "High": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 mt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Broker reviews</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find the right broker and invest on your own
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Filter */}
          <div>
            <h3 className="text-lg font-medium mb-3">Filter by name</h3>
            <Input
              placeholder="Type broker name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          {/* Asset Type Filters */}
          <div>
            <div className="flex flex-wrap gap-2">
              {assetTypes.map((asset) => (
                <Badge
                  key={asset}
                  variant={selectedAssets.includes(asset) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/90"
                  onClick={() => toggleAssetFilter(asset)}
                >
                  {asset}
                </Badge>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-medium text-center">
              Brokers available in France in 2025
            </h3>
          </div>
        </div>

        {/* Recommended Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-6">Recommended for you</h2>
        </div>

        {/* Broker Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrokers.map((broker) => (
            <Card key={broker.id} className="relative hover:shadow-lg transition-shadow">
              {broker.recommended && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                  Recommended for you
                </div>
              )}
              
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <img 
                    src={broker.logo} 
                    alt={broker.name}
                    className="w-12 h-12 object-contain"
                  />
                  {broker.isAwardWinner && (
                    <div className="flex items-center gap-1 text-yellow-600">
                      <Trophy size={16} />
                      <span className="text-xs">2025 Award Winner</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold">{broker.name}</h3>
                  {renderStars(broker.rating)}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {broker.peopleCount.toLocaleString()} people chose this broker
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Fee Level */}
                <div className="flex justify-between items-center">
                  <span className="text-sm">Fee level:</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${getFeeColor(broker.feeLevel)}`}>
                      {broker.feeLevel}
                    </span>
                    {renderStars(broker.feeRating)}
                  </div>
                </div>

                {/* Inactivity Fee */}
                <div className="flex justify-between items-center">
                  <span className="text-sm">Inactivity fee:</span>
                  <div className="flex items-center gap-1">
                    {broker.inactivityFee ? (
                      <XCircle className="text-red-500" size={16} />
                    ) : (
                      <CheckCircle className="text-green-500" size={16} />
                    )}
                    <span className="text-sm">{broker.inactivityFee ? "Yes" : "No"}</span>
                  </div>
                </div>

                {/* Investor Protection */}
                <div className="flex justify-between items-center">
                  <span className="text-sm">Investor protection:</span>
                  <div className="flex items-center gap-1">
                    {broker.investorProtection ? (
                      <CheckCircle className="text-green-500" size={16} />
                    ) : (
                      <XCircle className="text-red-500" size={16} />
                    )}
                    <span className="text-sm">{broker.investorProtection ? "Yes" : "No"}</span>
                  </div>
                </div>

                {/* Mobile Platform */}
                <div className="flex justify-between items-center">
                  <span className="text-sm">Mobile platform:</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {broker.mobilePlatform ? (
                        <CheckCircle className="text-green-500" size={16} />
                      ) : (
                        <XCircle className="text-red-500" size={16} />
                      )}
                      <span className="text-sm">{broker.mobilePlatform ? "Yes" : "No"}</span>
                    </div>
                    {broker.mobileRating && renderStars(broker.mobileRating)}
                  </div>
                </div>

                {/* Risk Disclaimer */}
                {broker.riskDisclaimer && (
                  <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                    {broker.riskDisclaimer}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button className="flex-1" variant="outline">
                    Read review
                  </Button>
                  <Button className="flex-1">
                    Visit broker
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BrokerReviews;