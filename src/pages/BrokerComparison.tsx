import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, X, Star, Shield, TrendingUp, DollarSign } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

interface Broker {
  id: string;
  name: string;
  logo: string;
  rating: number;
  regulation: string[];
  minDeposit: number;
  eurUsdSpread: number;
  leverage: string;
  platforms: string[];
  account_types: string[];
  commission: string;
  withdrawal_time: string;
  customer_support: string;
  education: boolean;
  demo_account: boolean;
  islamic_account: boolean;
  pros: string[];
  cons: string[];
}

const allBrokers: Broker[] = [
  {
    id: "1",
    name: "XM Global",
    logo: "/lovable-uploads/01ce80d9-1df7-4bb8-9445-5012485f2889.png",
    rating: 4.5,
    regulation: ["CySEC", "ASIC", "IFSC"],
    minDeposit: 5,
    eurUsdSpread: 1.6,
    leverage: "1:888",
    platforms: ["MT4", "MT5", "WebTrader"],
    account_types: ["Micro", "Standard", "XM Zero"],
    commission: "No commission on Standard",
    withdrawal_time: "1-3 business days",
    customer_support: "24/5 multilingual",
    education: true,
    demo_account: true,
    islamic_account: true,
    pros: ["Low minimum deposit", "High leverage", "Strong regulation", "Educational resources"],
    cons: ["Higher spreads on some pairs", "Limited cryptocurrency options"]
  },
  {
    id: "2",
    name: "IG Markets",
    logo: "/lovable-uploads/0211e090-45a0-45f5-bbaf-c9df5dde39e8.png",
    rating: 4.7,
    regulation: ["FCA", "ASIC", "MAS"],
    minDeposit: 250,
    eurUsdSpread: 0.6,
    leverage: "1:30",
    platforms: ["IG Platform", "MT4", "ProRealTime"],
    account_types: ["Standard", "Professional"],
    commission: "From $8 per lot",
    withdrawal_time: "1-2 business days",
    customer_support: "24/5 phone & chat",
    education: true,
    demo_account: true,
    islamic_account: false,
    pros: ["Tight spreads", "Strong regulation", "Advanced charting", "Wide market access"],
    cons: ["Higher minimum deposit", "Complex fee structure"]
  },
  {
    id: "3",
    name: "Pepperstone",
    logo: "/lovable-uploads/04e39e67-4fc8-4df2-ba16-c215860693a6.png",
    rating: 4.6,
    regulation: ["ASIC", "FCA", "CySEC"],
    minDeposit: 200,
    eurUsdSpread: 0.8,
    leverage: "1:500",
    platforms: ["MT4", "MT5", "cTrader"],
    account_types: ["Standard", "Razor"],
    commission: "From $3.50 per lot",
    withdrawal_time: "1-2 business days",
    customer_support: "24/5 multilingual",
    education: true,
    demo_account: true,
    islamic_account: true,
    pros: ["Fast execution", "Low spreads", "Multiple platforms", "Good customer service"],
    cons: ["Limited educational content", "Withdrawal fees on some methods"]
  },
  {
    id: "4",
    name: "OANDA",
    logo: "/lovable-uploads/08a94209-3538-484a-9f2a-f19f59e5762e.png",
    rating: 4.4,
    regulation: ["NFA", "FCA", "ASIC"],
    minDeposit: 0,
    eurUsdSpread: 1.2,
    leverage: "1:50",
    platforms: ["OANDA Trade", "MT4", "TradingView"],
    account_types: ["Standard", "Premium"],
    commission: "No commission",
    withdrawal_time: "1-5 business days",
    customer_support: "24/5 phone & chat",
    education: true,
    demo_account: true,
    islamic_account: false,
    pros: ["No minimum deposit", "Fractional units", "Good research", "Reliable platform"],
    cons: ["Higher spreads", "Limited leverage", "No MT5"]
  },
  {
    id: "5",
    name: "IC Markets",
    logo: "/lovable-uploads/0eabf75e-7984-481a-85ea-46dfc5362774.png",
    rating: 4.8,
    regulation: ["ASIC", "CySEC"],
    minDeposit: 200,
    eurUsdSpread: 0.1,
    leverage: "1:500",
    platforms: ["MT4", "MT5", "cTrader"],
    account_types: ["Standard", "Raw Spread"],
    commission: "From $3 per lot",
    withdrawal_time: "1-2 business days",
    customer_support: "24/5 multilingual",
    education: true,
    demo_account: true,
    islamic_account: true,
    pros: ["Ultra-low spreads", "Fast execution", "Multiple platforms", "Strong regulation"],
    cons: ["Commission-based pricing", "Limited educational resources"]
  }
];

const BrokerComparison = () => {
  const [selectedBrokers, setSelectedBrokers] = useState<Broker[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    minDeposit: "",
    regulation: "",
    platform: "",
    spreadRange: ""
  });

  const filteredBrokers = allBrokers.filter(broker => {
    const matchesSearch = broker.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMinDeposit = !filters.minDeposit || broker.minDeposit <= parseInt(filters.minDeposit);
    const matchesRegulation = !filters.regulation || broker.regulation.includes(filters.regulation);
    const matchesPlatform = !filters.platform || broker.platforms.includes(filters.platform);
    const matchesSpread = !filters.spreadRange || 
      (filters.spreadRange === "low" && broker.eurUsdSpread <= 1.0) ||
      (filters.spreadRange === "medium" && broker.eurUsdSpread > 1.0 && broker.eurUsdSpread <= 2.0) ||
      (filters.spreadRange === "high" && broker.eurUsdSpread > 2.0);

    return matchesSearch && matchesMinDeposit && matchesRegulation && matchesPlatform && matchesSpread;
  });

  const toggleBrokerSelection = (broker: Broker) => {
    if (selectedBrokers.find(b => b.id === broker.id)) {
      setSelectedBrokers(selectedBrokers.filter(b => b.id !== broker.id));
    } else if (selectedBrokers.length < 4) {
      setSelectedBrokers([...selectedBrokers, broker]);
    }
  };

  const clearFilters = () => {
    setFilters({
      minDeposit: "",
      regulation: "",
      platform: "",
      spreadRange: ""
    });
    setSearchTerm("");
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Broker Comparison Tool
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Compare brokers side-by-side to find the perfect match for your trading needs. 
            Select up to 4 brokers and instantly compare their features, fees, and services.
          </p>
        </div>

        <Tabs defaultValue="select" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="select">Select Brokers</TabsTrigger>
            <TabsTrigger value="compare" disabled={selectedBrokers.length < 2}>
              Compare ({selectedBrokers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="select" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Find Your Perfect Broker
                </CardTitle>
                <CardDescription>
                  Use filters to narrow down brokers based on your requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search brokers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Select value={filters.minDeposit} onValueChange={(value) => setFilters({...filters, minDeposit: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Min Deposit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">$0</SelectItem>
                      <SelectItem value="100">$100</SelectItem>
                      <SelectItem value="250">$250</SelectItem>
                      <SelectItem value="500">$500</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filters.regulation} onValueChange={(value) => setFilters({...filters, regulation: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Regulation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FCA">FCA</SelectItem>
                      <SelectItem value="CySEC">CySEC</SelectItem>
                      <SelectItem value="ASIC">ASIC</SelectItem>
                      <SelectItem value="NFA">NFA</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filters.platform} onValueChange={(value) => setFilters({...filters, platform: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MT4">MetaTrader 4</SelectItem>
                      <SelectItem value="MT5">MetaTrader 5</SelectItem>
                      <SelectItem value="cTrader">cTrader</SelectItem>
                      <SelectItem value="WebTrader">WebTrader</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filters.spreadRange} onValueChange={(value) => setFilters({...filters, spreadRange: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Spread Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (≤1.0 pips)</SelectItem>
                      <SelectItem value="medium">Medium (1.0-2.0 pips)</SelectItem>
                      <SelectItem value="high">High (&gt;2.0 pips)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" onClick={clearFilters} className="w-full">
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>

            {/* Selected Brokers */}
            {selectedBrokers.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Selected Brokers ({selectedBrokers.length}/4)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedBrokers.map((broker) => (
                      <Badge key={broker.id} variant="secondary" className="flex items-center gap-2">
                        {broker.name}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-destructive" 
                          onClick={() => toggleBrokerSelection(broker)}
                        />
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Broker List */}
            <div className="grid gap-4">
              {filteredBrokers.map((broker) => {
                const isSelected = selectedBrokers.find(b => b.id === broker.id);
                return (
                  <Card key={broker.id} className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? 'ring-2 ring-primary' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img src={broker.logo} alt={broker.name} className="w-12 h-12 object-contain" />
                          <div>
                            <h3 className="text-lg font-semibold">{broker.name}</h3>
                            <div className="flex items-center space-x-2">
                              <div className="flex">{renderStars(broker.rating)}</div>
                              <span className="text-sm text-muted-foreground">({broker.rating})</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">EUR/USD Spread</div>
                            <div className="font-semibold">{broker.eurUsdSpread} pips</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Min Deposit</div>
                            <div className="font-semibold">${broker.minDeposit}</div>
                          </div>
                          <Button
                            variant={isSelected ? "secondary" : "default"}
                            onClick={() => toggleBrokerSelection(broker)}
                            disabled={!isSelected && selectedBrokers.length >= 4}
                          >
                            {isSelected ? (
                              <>
                                <X className="w-4 h-4 mr-2" />
                                Remove
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4 mr-2" />
                                Select
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="compare" className="space-y-6">
            {selectedBrokers.length >= 2 ? (
              <div className="space-y-6">
                {/* Comparison Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Broker Comparison</CardTitle>
                    <CardDescription>Side-by-side comparison of selected brokers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-48">Feature</TableHead>
                            {selectedBrokers.map((broker) => (
                              <TableHead key={broker.id} className="text-center min-w-48">
                                <div className="flex flex-col items-center space-y-2">
                                  <img src={broker.logo} alt={broker.name} className="w-8 h-8 object-contain" />
                                  <span className="font-semibold">{broker.name}</span>
                                </div>
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Overall Rating</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                <div className="flex justify-center items-center space-x-1">
                                  {renderStars(broker.rating)}
                                  <span className="ml-2">({broker.rating})</span>
                                </div>
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Regulation</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                <div className="flex flex-wrap justify-center gap-1">
                                  {broker.regulation.map((reg) => (
                                    <Badge key={reg} variant="outline" className="text-xs">
                                      {reg}
                                    </Badge>
                                  ))}
                                </div>
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Min Deposit</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center font-semibold">
                                ${broker.minDeposit}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">EUR/USD Spread</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center font-semibold">
                                {broker.eurUsdSpread} pips
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Max Leverage</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center font-semibold">
                                {broker.leverage}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Platforms</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                <div className="flex flex-wrap justify-center gap-1">
                                  {broker.platforms.map((platform) => (
                                    <Badge key={platform} variant="secondary" className="text-xs">
                                      {platform}
                                    </Badge>
                                  ))}
                                </div>
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Commission</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                {broker.commission}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Withdrawal Time</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                {broker.withdrawal_time}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Customer Support</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                {broker.customer_support}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Demo Account</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                <Badge variant={broker.demo_account ? "default" : "secondary"}>
                                  {broker.demo_account ? "Yes" : "No"}
                                </Badge>
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Islamic Account</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                <Badge variant={broker.islamic_account ? "default" : "secondary"}>
                                  {broker.islamic_account ? "Yes" : "No"}
                                </Badge>
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                {/* Pros and Cons */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {selectedBrokers.map((broker) => (
                    <Card key={broker.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <img src={broker.logo} alt={broker.name} className="w-6 h-6 object-contain" />
                          <span>{broker.name}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-green-600 mb-2">Pros</h4>
                          <ul className="space-y-1">
                            {broker.pros.map((pro, index) => (
                              <li key={index} className="text-sm flex items-start space-x-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-600 mb-2">Cons</h4>
                          <ul className="space-y-1">
                            {broker.cons.map((con, index) => (
                              <li key={index} className="text-sm flex items-start space-x-2">
                                <span className="text-red-500 mt-1">✗</span>
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-8 h-8 text-muted-foreground" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Select Brokers to Compare</h3>
                    <p className="text-muted-foreground mb-4">
                      Choose at least 2 brokers from the "Select Brokers" tab to see a detailed comparison.
                    </p>
                    <Button variant="outline" onClick={() => {
                      const selectTab = document.querySelector('[value="select"]') as HTMLElement;
                      selectTab?.click();
                    }}>
                      Select Brokers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default BrokerComparison;