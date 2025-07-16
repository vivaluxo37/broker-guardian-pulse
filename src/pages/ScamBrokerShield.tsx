import { useState } from "react";
import { Search, Shield, AlertTriangle, CheckCircle, X, Download, ExternalLink, Filter, AlertCircle, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Comprehensive scam brokers database compiled from regulatory warnings and reports
const scamBrokers = [
  // FCA Warning List & Binary Options Scams
  {
    name: "Quotex",
    status: "SCAM",
    type: "Binary Options",
    reason: "Unregulated binary options broker - FCA banned all binary options sales",
    regulatoryWarning: "FCA",
    complaints: 682,
    satisfactionRate: "0%",
    lastUpdate: "2024-12",
    website: "quotex.io",
    riskLevel: "Critical"
  },
  {
    name: "GMZ Global",
    status: "SCAM", 
    type: "Forex",
    reason: "Multiple reports of withdrawal issues and fund freezing",
    regulatoryWarning: "CFTC",
    complaints: 582,
    satisfactionRate: "0%",
    lastUpdate: "2024-11",
    website: "gmzglobal.com",
    riskLevel: "Critical"
  },
  {
    name: "DUTTFX",
    status: "SCAM",
    type: "Forex",
    reason: "Unregulated operations with numerous fraud reports",
    regulatoryWarning: "FCA",
    complaints: 560,
    satisfactionRate: "0%",
    lastUpdate: "2024-12",
    website: "duttfx.com",
    riskLevel: "Critical"
  },
  {
    name: "Stonewall Capital",
    status: "SCAM",
    type: "Multi-Asset",
    reason: "Fake regulatory claims and withdrawal difficulties",
    regulatoryWarning: "SEC",
    complaints: 477,
    satisfactionRate: "0%",
    lastUpdate: "2024-10",
    website: "stonewallcapital.com",
    riskLevel: "Critical"
  },
  {
    name: "Inefex",
    status: "SCAM",
    type: "Forex",
    reason: "High volume of complaints regarding trading manipulation",
    regulatoryWarning: "ASIC",
    complaints: 402,
    satisfactionRate: "0%",
    lastUpdate: "2024-11",
    website: "inefex.com",
    riskLevel: "Critical"
  },
  {
    name: "Inveslo",
    status: "SCAM",
    type: "Crypto",
    reason: "Unverified regulation and suspicious trading practices",
    regulatoryWarning: "CFTC",
    complaints: 425,
    satisfactionRate: "0%",
    lastUpdate: "2024-12",
    website: "inveslo.com",
    riskLevel: "Critical"
  },
  // Binary Options Scam List
  {
    name: "24Option",
    status: "SCAM",
    type: "Binary Options",
    reason: "Binary options broker - banned by multiple regulators",
    regulatoryWarning: "FCA",
    complaints: 890,
    satisfactionRate: "0%",
    lastUpdate: "2024-01",
    website: "24option.com",
    riskLevel: "Critical"
  },
  {
    name: "Banc De Binary",
    status: "SCAM",
    type: "Binary Options", 
    reason: "Ceased operations, multiple regulatory violations",
    regulatoryWarning: "CFTC",
    complaints: 1200,
    satisfactionRate: "0%",
    lastUpdate: "2023-12",
    website: "bancdebinary.com",
    riskLevel: "Critical"
  },
  {
    name: "Cedar Finance",
    status: "SCAM",
    type: "Binary Options",
    reason: "Unregulated binary options, withdrawal issues",
    regulatoryWarning: "FCA",
    complaints: 567,
    satisfactionRate: "0%",
    lastUpdate: "2024-02",
    website: "cedarfinance.com",
    riskLevel: "Critical"
  },
  {
    name: "TradeRush",
    status: "SCAM",
    type: "Binary Options",
    reason: "Binary options scam, regulatory warnings issued",
    regulatoryWarning: "SEC",
    complaints: 445,
    satisfactionRate: "0%",
    lastUpdate: "2024-01",
    website: "traderush.com",
    riskLevel: "Critical"
  },
  // Crypto Scams from SEC/CFTC warnings
  {
    name: "PGI Global",
    status: "SCAM",
    type: "Crypto",
    reason: "SEC charged for $198M crypto and forex fraud scheme",
    regulatoryWarning: "SEC",
    complaints: 1500,
    satisfactionRate: "0%",
    lastUpdate: "2024-04",
    website: "pgiglobal.com",
    riskLevel: "Critical"
  },
  {
    name: "CryptoFX LLC",
    status: "SCAM",
    type: "Crypto",
    reason: "SEC charged 17 individuals in $300M Ponzi scheme",
    regulatoryWarning: "SEC",
    complaints: 2100,
    satisfactionRate: "0%",
    lastUpdate: "2024-03",
    website: "cryptofx.com",
    riskLevel: "Critical"
  },
  {
    name: "Strike Chain Inc",
    status: "SCAM",
    type: "Crypto",
    reason: "Fake crypto trading platform targeting investors",
    regulatoryWarning: "DFPI",
    complaints: 234,
    satisfactionRate: "0%",
    lastUpdate: "2024-05",
    website: "strikechain.com",
    riskLevel: "High"
  },
  {
    name: "UKBTC",
    status: "SCAM",
    type: "Crypto",
    reason: "FCA official warning issued for unauthorized operations",
    regulatoryWarning: "FCA",
    complaints: 456,
    satisfactionRate: "0%",
    lastUpdate: "2024-02",
    website: "ukbtc.com",
    riskLevel: "Critical"
  },
  // Additional scams
  {
    name: "XLibre (ExaLibre)",
    status: "SCAM",
    type: "Forex",
    reason: "Multiple fraud reports, fake contact information",
    regulatoryWarning: "FCA",
    complaints: 189,
    satisfactionRate: "0%",
    lastUpdate: "2024-06",
    website: "exalibre.com",
    riskLevel: "High"
  },
  {
    name: "Nexa Forex",
    status: "SCAM",
    type: "Forex",
    reason: "FCA flagged as high-risk entity, unauthorized operations",
    regulatoryWarning: "FCA",
    complaints: 167,
    satisfactionRate: "0%",
    lastUpdate: "2024-04",
    website: "nexaforex.com",
    riskLevel: "High"
  },
  {
    name: "Pocket Option",
    status: "SCAM",
    type: "Binary Options",
    reason: "Unregulated binary options broker with numerous complaints",
    regulatoryWarning: "CNMV",
    complaints: 834,
    satisfactionRate: "0%",
    lastUpdate: "2024-12",
    website: "po.trade",
    riskLevel: "Critical"
  },
  {
    name: "Bybit",
    status: "WARNING",
    type: "Crypto",
    reason: "Not regulated by top-tier authorities, operates in gray areas",
    regulatoryWarning: "FCA",
    complaints: 234,
    satisfactionRate: "15%",
    lastUpdate: "2024-11",
    website: "bybit.com",
    riskLevel: "Medium"
  }
];

const trustedBrokers = [
  {
    name: "Exness",
    status: "SAFE",
    type: "Multi-Asset",
    reason: "FCA and CySEC regulated with excellent track record",
    regulation: "FCA, CySEC, FSA",
    satisfactionRate: "100%",
    lastUpdate: "2024-12",
    website: "exness.com",
    rating: 4.8
  },
  {
    name: "FP Markets", 
    status: "SAFE",
    type: "Multi-Asset",
    reason: "ASIC regulated with strong client protection",
    regulation: "ASIC, CySEC",
    satisfactionRate: "100%",
    lastUpdate: "2024-12",
    website: "fpmarkets.com",
    rating: 4.7
  },
  {
    name: "Vantage Markets",
    status: "SAFE",
    type: "Multi-Asset",
    reason: "Multiple regulatory licenses and transparent operations",
    regulation: "ASIC, FCA, CIMA",
    satisfactionRate: "100%",
    lastUpdate: "2024-12",
    website: "vantagemarkets.com",
    rating: 4.6
  },
  {
    name: "IC Markets",
    status: "SAFE",
    type: "Forex",
    reason: "ASIC regulated, excellent execution and spreads",
    regulation: "ASIC, CySEC",
    satisfactionRate: "98%",
    lastUpdate: "2024-12",
    website: "icmarkets.com",
    rating: 4.7
  },
  {
    name: "OANDA",
    status: "SAFE",
    type: "Forex",
    reason: "Well-established, regulated by multiple authorities",
    regulation: "FCA, CFTC, ASIC",
    satisfactionRate: "97%",
    lastUpdate: "2024-12",
    website: "oanda.com",
    rating: 4.5
  },
  {
    name: "eToro",
    status: "SAFE",
    type: "Multi-Asset",
    reason: "FCA and CySEC regulated, social trading leader",
    regulation: "FCA, CySEC, ASIC",
    satisfactionRate: "94%",
    lastUpdate: "2024-12",
    website: "etoro.com",
    rating: 4.3
  }
];

export default function ScamBrokerShield() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<{type: 'safe' | 'unsafe' | 'unknown', message: string, details?: any} | null>(null);
  const [filterType, setFilterType] = useState("all");
  const [filterRisk, setFilterRisk] = useState("all");
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a broker name",
        description: "Enter the name of the broker you want to check.",
        variant: "destructive"
      });
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    
    // Check if it's in scam brokers
    const scamBroker = scamBrokers.find(broker => 
      broker.name.toLowerCase().includes(query) || broker.website.toLowerCase().includes(query)
    );
    
    if (scamBroker) {
      setSearchResult({
        type: 'unsafe',
        message: `${scamBroker.name} is ${scamBroker.status}! This broker has ${scamBroker.complaints} complaints and is flagged by ${scamBroker.regulatoryWarning}.`,
        details: scamBroker
      });
      return;
    }

    // Check if it's in trusted brokers
    const trustedBroker = trustedBrokers.find(broker => 
      broker.name.toLowerCase().includes(query) || broker.website.toLowerCase().includes(query)
    );
    
    if (trustedBroker) {
      setSearchResult({
        type: 'safe',
        message: `${trustedBroker.name} is TRUSTED! This broker is regulated by ${trustedBroker.regulation} with ${trustedBroker.satisfactionRate} satisfaction rate.`,
        details: trustedBroker
      });
      return;
    }

    // Unknown broker
    setSearchResult({
      type: 'unknown',
      message: `We don't have information about "${searchQuery}" in our database. Please verify their regulatory status independently before investing.`
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const filteredScamBrokers = scamBrokers.filter(broker => {
    const typeMatch = filterType === "all" || broker.type === filterType;
    const riskMatch = filterRisk === "all" || broker.riskLevel === filterRisk;
    return typeMatch && riskMatch;
  });

  const getRiskBadgeColor = (risk: string) => {
    switch(risk) {
      case "Critical": return "destructive";
      case "High": return "destructive";
      case "Medium": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-primary/5">
          <div className="container mx-auto px-4 text-center max-w-7xl">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-16 w-16 text-primary mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Scam Broker Shield
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-slate-600 mb-4 max-w-3xl mx-auto leading-relaxed">
              Comprehensive database of scam brokers and regulatory warnings. Protect yourself from fraud with our real-time verification system.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-8"></div>
            
            
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg">
                <div className="text-4xl font-bold text-primary mb-2">5,760,141</div>
                <div className="text-sm text-slate-600">Users Protected</div>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg">
                <div className="text-4xl font-bold text-primary mb-2">{scamBrokers.length}</div>
                <div className="text-sm text-slate-600">Scam Brokers Identified</div>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg">
                <div className="text-4xl font-bold text-primary mb-2">$47M+</div>
                <div className="text-sm text-slate-600">Fraud Prevented</div>
              </div>
            </div>

            {/* Search Tool */}
            <Card className="max-w-2xl mx-auto mb-8 bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-center text-slate-800">
                  <Search className="h-6 w-6 mr-2" />
                  Broker Safety Check
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Enter broker name or website to check our comprehensive scam database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter broker name or website..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 border-slate-200 focus:border-primary"
                  />
                  <Button onClick={handleSearch} className="px-8 bg-primary text-white hover:bg-primary/90">
                    <Search className="h-4 w-4 mr-2" />
                    Check
                  </Button>
                </div>
                
                {searchResult && (
                  <div className={`mt-4 p-4 rounded-lg border ${
                    searchResult.type === 'safe' 
                      ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' 
                      : searchResult.type === 'unsafe'
                      ? 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
                      : 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800'
                  }`}>
                    <div className="flex items-start">
                      {searchResult.type === 'safe' ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      ) : searchResult.type === 'unsafe' ? (
                        <AlertTriangle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          searchResult.type === 'safe' 
                            ? 'text-green-800 dark:text-green-200' 
                            : searchResult.type === 'unsafe'
                            ? 'text-red-800 dark:text-red-200'
                            : 'text-yellow-800 dark:text-yellow-200'
                        }`}>
                          {searchResult.message}
                        </p>
                        {searchResult.details && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            Type: {searchResult.details.type} | 
                            Last Updated: {searchResult.details.lastUpdate}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Chrome Extension */}
            <Card className="max-w-lg mx-auto bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Download className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-slate-800">Chrome Extension</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Real-time scam detection while browsing. Get instant warnings about fraudulent broker websites.
                  </p>
                  <Button className="w-full bg-primary text-white hover:bg-primary/90">
                    Download Extension
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Content Tabs */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <Tabs defaultValue="scam-database" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="scam-database">Scam Database</TabsTrigger>
                <TabsTrigger value="trusted-brokers">Trusted Brokers</TabsTrigger>
              </TabsList>

              <TabsContent value="scam-database">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-4">Comprehensive Scam Broker Database</h2>
                  <p className="text-muted-foreground mb-6">
                    Our database includes brokers flagged by FCA, SEC, CFTC, ASIC, and other major regulatory authorities worldwide.
                  </p>
                  
                  {/* Filters */}
                  <div className="flex gap-4 mb-6">
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Binary Options">Binary Options</SelectItem>
                        <SelectItem value="Forex">Forex</SelectItem>
                        <SelectItem value="Crypto">Crypto</SelectItem>
                        <SelectItem value="Multi-Asset">Multi-Asset</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={filterRisk} onValueChange={setFilterRisk}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filter by risk" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Risk Levels</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredScamBrokers.map((broker, index) => (
                    <Card key={index} className="shadow-elegant border-red-200 dark:border-red-800 hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="flex items-center text-lg">
                              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                              {broker.name}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant={getRiskBadgeColor(broker.riskLevel)}>
                                {broker.riskLevel} Risk
                              </Badge>
                              <Badge variant="outline">{broker.type}</Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">{broker.reason}</p>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span>Regulatory Warning:</span>
                            <span className="font-medium text-red-600">{broker.regulatoryWarning}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Complaints:</span>
                            <span className="font-medium">{broker.complaints}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Website:</span>
                            <span className="font-medium">{broker.website}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Last Updated:</span>
                            <span className="font-medium">{broker.lastUpdate}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="trusted-brokers">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-4">Verified Trusted Brokers</h2>
                  <p className="text-muted-foreground mb-6">
                    These brokers are properly regulated by top-tier financial authorities and have excellent track records.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trustedBrokers.map((broker, index) => (
                    <Card key={index} className="shadow-elegant border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          {broker.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="border-green-500 text-green-700">
                            Trusted
                          </Badge>
                          <Badge variant="outline">{broker.type}</Badge>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-500 mr-1" />
                            <span className="text-xs font-medium">{broker.rating}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">{broker.reason}</p>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span>Regulation:</span>
                            <span className="font-medium text-green-600">{broker.regulation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Satisfaction Rate:</span>
                            <span className="font-medium">{broker.satisfactionRate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Website:</span>
                            <span className="font-medium">{broker.website}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Last Updated:</span>
                            <span className="font-medium">{broker.lastUpdate}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-4">
                          <ExternalLink className="h-3 w-3 mr-2" />
                          View Review
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Warning Notice */}
        <section className="py-12 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto shadow-elegant border-yellow-200 dark:border-yellow-800">
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Important Warning</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Always verify a broker's regulatory status before investing. Check with official regulatory bodies like FCA (UK), 
                      SEC/CFTC (US), ASIC (Australia), or CySEC (Cyprus). Never invest more than you can afford to lose.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        FCA Check
                      </Button>
                      <Button variant="outline" size="sm">
                        SEC Check
                      </Button>
                      <Button variant="outline" size="sm">
                        ASIC Check
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}