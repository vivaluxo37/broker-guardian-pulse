import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, X, Star, Shield, Smartphone, DollarSign, TrendingUp, BarChart3 } from "lucide-react";

interface Broker {
  id: string;
  name: string;
  logo: string;
  rating: number;
  regulation: string[];
  minDeposit: number;
  spreads: {
    eurusd: number;
    gbpusd: number;
    usdjpy: number;
  };
  commission: string;
  leverage: string;
  platforms: string[];
  accountTypes: string[];
  instruments: number;
  mobilePlatform: boolean;
  demoAccount: boolean;
  islamicAccount: boolean;
  features: string[];
  pros: string[];
  cons: string[];
}

const allBrokers: Broker[] = [
  {
    id: "interactive-brokers",
    name: "Interactive Brokers",
    logo: "/lovable-uploads/a278588e-21c7-4534-bd33-a5e69e619191.png",
    rating: 4.9,
    regulation: ["SEC", "CFTC", "FCA"],
    minDeposit: 0,
    spreads: { eurusd: 0.2, gbpusd: 0.3, usdjpy: 0.2 },
    commission: "$0.005 per share",
    leverage: "Up to 1:50",
    platforms: ["TWS", "WebTrader", "Mobile"],
    accountTypes: ["Individual", "Joint", "IRA", "Corporate"],
    instruments: 135,
    mobilePlatform: true,
    demoAccount: true,
    islamicAccount: false,
    features: ["Smart Routing", "Advanced Analytics", "Paper Trading"],
    pros: ["Low costs", "Wide asset selection", "Professional tools"],
    cons: ["Complex interface", "High learning curve"]
  },
  {
    id: "ic-markets",
    name: "IC Markets",
    logo: "/lovable-uploads/64b914e9-41e8-49b4-9132-f149648ce8ff.png",
    rating: 4.4,
    regulation: ["ASIC", "CySEC"],
    minDeposit: 200,
    spreads: { eurusd: 0.1, gbpusd: 0.1, usdjpy: 0.1 },
    commission: "$7 per lot",
    leverage: "Up to 1:500",
    platforms: ["MetaTrader 4", "MetaTrader 5", "cTrader"],
    accountTypes: ["Standard", "Raw Spread", "cTrader"],
    instruments: 232,
    mobilePlatform: true,
    demoAccount: true,
    islamicAccount: true,
    features: ["Raw Spreads", "ECN Trading", "VPS"],
    pros: ["Tight spreads", "Fast execution", "Multiple platforms"],
    cons: ["Commission-based pricing", "Limited educational resources"]
  },
  {
    id: "xtb",
    name: "XTB",
    logo: "/lovable-uploads/0eabf75e-7984-481a-85ea-46dfc5362774.png",
    rating: 4.7,
    regulation: ["FCA", "CySEC", "KNF"],
    minDeposit: 0,
    spreads: { eurusd: 0.7, gbpusd: 1.2, usdjpy: 0.8 },
    commission: "0% on stocks",
    leverage: "Up to 1:30",
    platforms: ["xStation 5", "MetaTrader 4"],
    accountTypes: ["Standard", "Pro"],
    instruments: 5400,
    mobilePlatform: true,
    demoAccount: true,
    islamicAccount: false,
    features: ["Commission-free stocks", "Educational content", "Market analysis"],
    pros: ["User-friendly platform", "Great education", "No stock commissions"],
    cons: ["Higher forex spreads", "Limited leverage for retail"]
  }
];

export function BrokerComparisonTool() {
  const [selectedBrokers, setSelectedBrokers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    minRating: "",
    maxSpread: "",
    minLeverage: "",
    regulation: "",
    platform: ""
  });

  const filteredBrokers = allBrokers.filter(broker => {
    const matchesSearch = broker.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = !filters.minRating || broker.rating >= parseFloat(filters.minRating);
    const matchesSpread = !filters.maxSpread || broker.spreads.eurusd <= parseFloat(filters.maxSpread);
    const matchesRegulation = !filters.regulation || broker.regulation.some(reg => reg.includes(filters.regulation));
    const matchesPlatform = !filters.platform || broker.platforms.some(platform => platform.includes(filters.platform));

    return matchesSearch && matchesRating && matchesSpread && matchesRegulation && matchesPlatform;
  });

  const toggleBrokerSelection = (brokerId: string) => {
    setSelectedBrokers(prev => {
      if (prev.includes(brokerId)) {
        return prev.filter(id => id !== brokerId);
      } else if (prev.length < 3) {
        return [...prev, brokerId];
      }
      return prev;
    });
  };

  const clearFilters = () => {
    setFilters({
      minRating: "",
      maxSpread: "",
      minLeverage: "",
      regulation: "",
      platform: ""
    });
    setSearchTerm("");
  };

  const selectedBrokerData = allBrokers.filter(broker => selectedBrokers.includes(broker.id));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Broker Comparison Tool
          {selectedBrokers.length > 0 && (
            <Badge variant="secondary">
              {selectedBrokers.length} selected
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="select" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="select">Select Brokers</TabsTrigger>
            <TabsTrigger value="compare" disabled={selectedBrokers.length < 2}>
              Compare ({selectedBrokers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="select" className="space-y-6">
            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search brokers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="min-rating">Min Rating</Label>
                  <Select value={filters.minRating} onValueChange={(value) => setFilters(prev => ({ ...prev, minRating: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="4.5">4.5+</SelectItem>
                      <SelectItem value="4.0">4.0+</SelectItem>
                      <SelectItem value="3.5">3.5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="max-spread">Max EUR/USD Spread</Label>
                  <Select value={filters.maxSpread} onValueChange={(value) => setFilters(prev => ({ ...prev, maxSpread: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="0.2">0.2 pips</SelectItem>
                      <SelectItem value="0.5">0.5 pips</SelectItem>
                      <SelectItem value="1.0">1.0 pips</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="regulation">Regulation</Label>
                  <Select value={filters.regulation} onValueChange={(value) => setFilters(prev => ({ ...prev, regulation: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="FCA">FCA</SelectItem>
                      <SelectItem value="CySEC">CySEC</SelectItem>
                      <SelectItem value="ASIC">ASIC</SelectItem>
                      <SelectItem value="SEC">SEC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="platform">Platform</Label>
                  <Select value={filters.platform} onValueChange={(value) => setFilters(prev => ({ ...prev, platform: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="MetaTrader">MetaTrader</SelectItem>
                      <SelectItem value="cTrader">cTrader</SelectItem>
                      <SelectItem value="TWS">TWS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button variant="outline" onClick={clearFilters} size="sm" className="w-full">
                    <X className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </div>
            </div>

            {/* Broker List */}
            <div className="space-y-4">
              {filteredBrokers.map((broker) => (
                <Card 
                  key={broker.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedBrokers.includes(broker.id) ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => toggleBrokerSelection(broker.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Checkbox 
                          checked={selectedBrokers.includes(broker.id)}
                          onChange={() => {}}
                        />
                        
                        <div className="w-12 h-12 bg-background rounded-lg p-2">
                          <img 
                            src={broker.logo} 
                            alt={broker.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div>
                          <h3 className="font-semibold">{broker.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-accent fill-current mr-1" />
                              {broker.rating}
                            </div>
                            <span>•</span>
                            <span>Min: ${broker.minDeposit}</span>
                            <span>•</span>
                            <span>{broker.spreads.eurusd} pips EUR/USD</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {broker.regulation.slice(0, 2).map((reg) => (
                          <Badge key={reg} variant="outline">
                            {reg}
                          </Badge>
                        ))}
                        {broker.mobilePlatform && <Smartphone className="h-4 w-4 text-primary" />}
                        <Shield className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedBrokers.length >= 2 && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  You have selected {selectedBrokers.length} brokers. Click compare to see detailed comparison.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="compare" className="space-y-6">
            {selectedBrokerData.length >= 2 && (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-48">Feature</TableHead>
                      {selectedBrokerData.map((broker) => (
                        <TableHead key={broker.id} className="text-center">
                          <div className="flex flex-col items-center gap-2">
                            <img 
                              src={broker.logo} 
                              alt={broker.name}
                              className="w-8 h-8 object-contain"
                            />
                            <span className="font-medium">{broker.name}</span>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Overall Rating</TableCell>
                      {selectedBrokerData.map((broker) => (
                        <TableCell key={broker.id} className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="h-4 w-4 text-accent fill-current" />
                            {broker.rating}
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium">Regulation</TableCell>
                      {selectedBrokerData.map((broker) => (
                        <TableCell key={broker.id} className="text-center">
                          <div className="flex flex-wrap gap-1 justify-center">
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
                      {selectedBrokerData.map((broker) => (
                        <TableCell key={broker.id} className="text-center">
                          ${broker.minDeposit}
                        </TableCell>
                      ))}
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium">EUR/USD Spread</TableCell>
                      {selectedBrokerData.map((broker) => (
                        <TableCell key={broker.id} className="text-center">
                          {broker.spreads.eurusd} pips
                        </TableCell>
                      ))}
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium">Commission</TableCell>
                      {selectedBrokerData.map((broker) => (
                        <TableCell key={broker.id} className="text-center">
                          {broker.commission}
                        </TableCell>
                      ))}
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium">Max Leverage</TableCell>
                      {selectedBrokerData.map((broker) => (
                        <TableCell key={broker.id} className="text-center">
                          {broker.leverage}
                        </TableCell>
                      ))}
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium">Platforms</TableCell>
                      {selectedBrokerData.map((broker) => (
                        <TableCell key={broker.id} className="text-center">
                          <div className="flex flex-wrap gap-1 justify-center">
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
                      <TableCell className="font-medium">Instruments</TableCell>
                      {selectedBrokerData.map((broker) => (
                        <TableCell key={broker.id} className="text-center">
                          {broker.instruments}+
                        </TableCell>
                      ))}
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium">Mobile Platform</TableCell>
                      {selectedBrokerData.map((broker) => (
                        <TableCell key={broker.id} className="text-center">
                          {broker.mobilePlatform ? 
                            <Badge variant="secondary" className="bg-green-100 text-green-800">Yes</Badge> : 
                            <Badge variant="outline">No</Badge>
                          }
                        </TableCell>
                      ))}
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium">Demo Account</TableCell>
                      {selectedBrokerData.map((broker) => (
                        <TableCell key={broker.id} className="text-center">
                          {broker.demoAccount ? 
                            <Badge variant="secondary" className="bg-green-100 text-green-800">Yes</Badge> : 
                            <Badge variant="outline">No</Badge>
                          }
                        </TableCell>
                      ))}
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium">Islamic Account</TableCell>
                      {selectedBrokerData.map((broker) => (
                        <TableCell key={broker.id} className="text-center">
                          {broker.islamicAccount ? 
                            <Badge variant="secondary" className="bg-green-100 text-green-800">Yes</Badge> : 
                            <Badge variant="outline">No</Badge>
                          }
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedBrokerData.map((broker) => (
                <Card key={broker.id}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={broker.logo} 
                        alt={broker.name}
                        className="w-10 h-10 object-contain"
                      />
                      <CardTitle className="text-lg">{broker.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-green-600 mb-2">Pros</h4>
                      <ul className="text-sm space-y-1">
                        {broker.pros.map((pro, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-red-600 mb-2">Cons</h4>
                      <ul className="text-sm space-y-1">
                        {broker.cons.map((con, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full">
                      Visit {broker.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}