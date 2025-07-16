import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Shield, 
  AlertTriangle, 
  Search, 
  TrendingUp, 
  Users, 
  FileText,
  CheckCircle,
  XCircle,
  Eye,
  Flag,
  ExternalLink,
  Download,
  AlertCircle,
  Star
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScamReportForm } from "@/components/ScamReportForm";
import { FraudDetectionDisplay, brokerFraudData } from "@/components/FraudDetectionSystem";
import { useToast } from "@/hooks/use-toast";

const ScamBrokerShield = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("check");
  const [searchResult, setSearchResult] = useState<any>(null);
  const { toast } = useToast();

  // Get high-risk brokers for the blacklist
  const highRiskBrokers = Object.entries(brokerFraudData)
    .filter(([_, data]) => data.riskScore >= 60)
    .map(([id, data]) => ({
      id,
      name: id.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      riskScore: data.riskScore,
      warnings: data.warnings,
      status: data.regulatoryStatus,
      complaints: data.complaintCount
    }));

  const filteredBrokers = highRiskBrokers.filter(broker =>
    broker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Please enter a broker name",
        description: "Enter the name of the broker you want to check.",
        variant: "destructive"
      });
      return;
    }

    const query = searchTerm.toLowerCase().trim();
    
    // Check our fraud detection database
    const matchedBrokers = Object.entries(brokerFraudData)
      .filter(([id, _]) => 
        id.includes(query.replace(/\s+/g, '-')) || 
        id.replace(/[-_]/g, ' ').toLowerCase().includes(query)
      );

    if (matchedBrokers.length > 0) {
      setSearchResult(matchedBrokers);
    } else {
      setSearchResult("not_found");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/30 to-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 mt-20 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-16 w-16 text-primary mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Scam Broker Shield
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-slate-600 mb-4 max-w-3xl mx-auto leading-relaxed">
            Advanced fraud detection system protecting traders from scam brokers and financial fraud
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4 bg-white/80 backdrop-blur-sm border border-slate-200">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-foreground">5.7M</div>
            <div className="text-sm text-muted-foreground">Protected Users</div>
          </Card>
          <Card className="text-center p-4 bg-white/80 backdrop-blur-sm border border-slate-200">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-foreground">{highRiskBrokers.length}</div>
            <div className="text-sm text-muted-foreground">High-Risk Brokers</div>
          </Card>
          <Card className="text-center p-4 bg-white/80 backdrop-blur-sm border border-slate-200">
            <div className="flex items-center justify-center mb-2">
              <Flag className="h-8 w-8 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-foreground">847</div>
            <div className="text-sm text-muted-foreground">Scam Reports</div>
          </Card>
          <Card className="text-center p-4 bg-white/80 backdrop-blur-sm border border-slate-200">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-foreground">$47M</div>
            <div className="text-sm text-muted-foreground">Fraud Prevented</div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border border-slate-200">
            <TabsTrigger value="check" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Broker Check
            </TabsTrigger>
            <TabsTrigger value="blacklist" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Blacklist
            </TabsTrigger>
            <TabsTrigger value="report" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Report Scam
            </TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Protection Guide
            </TabsTrigger>
          </TabsList>

          {/* Broker Check Tab */}
          <TabsContent value="check" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Search className="h-5 w-5 text-primary" />
                  Advanced Broker Safety Check
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Enter a broker name to check for fraud alerts, regulatory status, and community warnings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      placeholder="Enter broker name (e.g., IC Markets, Plus500)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 bg-white border-slate-200"
                    />
                    <Button onClick={handleSearch} className="bg-primary text-white hover:bg-primary/90">
                      <Search className="h-4 w-4 mr-2" />
                      Check Now
                    </Button>
                  </div>

                  {/* Search Results */}
                  {searchResult && searchResult !== "not_found" && (
                    <div className="space-y-4">
                      {searchResult.map(([brokerId, data]: [string, any]) => (
                        <div key={brokerId} className="border border-slate-200 rounded-lg p-6 bg-white">
                          <div className="mb-4">
                            <h4 className="font-semibold text-foreground text-lg capitalize mb-2">
                              {brokerId.replace(/[-_]/g, ' ')} - Safety Assessment
                            </h4>
                          </div>
                          <FraudDetectionDisplay 
                            brokerId={brokerId} 
                            brokerName={brokerId.replace(/[-_]/g, ' ')} 
                            compact={false}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {searchResult === "not_found" && (
                    <Alert className="border-yellow-200 bg-yellow-50">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <AlertDescription className="text-yellow-800">
                        <span className="font-bold">Broker Not Found</span>
                        <br />
                        We don't have information about "{searchTerm}" in our database. Please verify their regulatory status independently before investing, or submit a report if you have concerns.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Quick Check Examples */}
                  {!searchResult && (
                    <div className="mt-6">
                      <h5 className="font-medium text-foreground mb-3">Quick Check Examples:</h5>
                      <div className="grid md:grid-cols-3 gap-3">
                        {["IC Markets", "XTB", "Plus500"].map((name) => (
                          <Button 
                            key={name}
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSearchTerm(name);
                              handleSearch();
                            }}
                            className="justify-start"
                          >
                            Check {name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Chrome Extension Promo */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Download className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 mb-1">Browser Protection Extension</h3>
                    <p className="text-sm text-blue-700 mb-3">
                      Get real-time warnings when visiting potentially fraudulent broker websites
                    </p>
                    <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                      Download for Chrome
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blacklist Tab */}
          <TabsContent value="blacklist" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  High-Risk Broker Blacklist
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Brokers with high fraud risk scores, regulatory warnings, or multiple complaints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      placeholder="Search blacklisted brokers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 bg-white border-slate-200"
                    />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by risk" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Risk Levels</SelectItem>
                        <SelectItem value="critical">Critical Risk</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                        <SelectItem value="medium">Medium Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {filteredBrokers.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No brokers found matching your search.</p>
                  ) : (
                    <div className="space-y-4">
                      {filteredBrokers.map((broker, index) => (
                        <div key={index} className="border border-red-200 bg-red-50 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-red-800 text-lg">{broker.name}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className="bg-red-100 text-red-800 border-red-200">
                                  Risk: {broker.riskScore}/100
                                </Badge>
                                <Badge className={`border ${
                                  broker.status === "revoked" ? "bg-red-100 text-red-800 border-red-200" :
                                  broker.status === "warning" ? "bg-orange-100 text-orange-800 border-orange-200" :
                                  "bg-yellow-100 text-yellow-800 border-yellow-200"
                                }`}>
                                  {broker.status.toUpperCase()}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-red-600 font-medium">HIGH RISK</div>
                              <div className="text-xs text-muted-foreground">{broker.complaints} complaints</div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="text-sm text-red-700">
                              <span className="font-medium">Primary Issues:</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {broker.warnings.slice(0, 3).map((warning, i) => (
                                <Badge key={i} variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                                  {warning}
                                </Badge>
                              ))}
                              {broker.warnings.length > 3 && (
                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                                  +{broker.warnings.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-red-200 mt-3">
                            <div className="text-xs text-red-600">
                              ⚠️ Avoid depositing funds with this broker
                            </div>
                            <Button variant="outline" size="sm" className="text-red-700 border-red-300 hover:bg-red-100">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report Scam Tab */}
          <TabsContent value="report" className="space-y-6">
            <ScamReportForm />
          </TabsContent>

          {/* Protection Guide Tab */}
          <TabsContent value="education" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Shield className="h-5 w-5 text-green-600" />
                    How to Protect Yourself
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <h4 className="font-medium text-foreground">Verify Regulation</h4>
                        <p className="text-sm text-muted-foreground">Always check if the broker is regulated by a reputable authority like FCA, ASIC, or CySEC.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <h4 className="font-medium text-foreground">Check License Status</h4>
                        <p className="text-sm text-muted-foreground">Visit the regulator's website to confirm the license is active and valid.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <h4 className="font-medium text-foreground">Read Reviews</h4>
                        <p className="text-sm text-muted-foreground">Look for independent reviews and check multiple sources for balanced opinions.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      <div>
                        <h4 className="font-medium text-foreground">Start Small</h4>
                        <p className="text-sm text-muted-foreground">Begin with the minimum deposit to test withdrawal processes before committing larger amounts.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Red Flags to Watch
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-foreground">Guaranteed Profits</h4>
                        <p className="text-sm text-muted-foreground">No legitimate broker can guarantee profits in trading.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-foreground">Pressure Tactics</h4>
                        <p className="text-sm text-muted-foreground">Avoid brokers that pressure you to deposit immediately or claim limited-time offers.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-foreground">No Contact Information</h4>
                        <p className="text-sm text-muted-foreground">Legitimate brokers provide clear contact details and physical addresses.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-foreground">Withdrawal Difficulties</h4>
                        <p className="text-sm text-muted-foreground">Complex withdrawal processes or excessive documentation requests are warning signs.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-blue-50 border border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <FileText className="h-5 w-5" />
                  Regulatory Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-800">FCA (UK)</h4>
                    <p className="text-sm text-blue-700 mb-2">Financial Conduct Authority</p>
                    <Button variant="outline" size="sm" className="w-full text-blue-700 border-blue-300">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Check FCA Register
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-800">ASIC (Australia)</h4>
                    <p className="text-sm text-blue-700 mb-2">Securities & Investments Commission</p>
                    <Button variant="outline" size="sm" className="w-full text-blue-700 border-blue-300">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Check ASIC Register
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-800">CySEC (Cyprus)</h4>
                    <p className="text-sm text-blue-700 mb-2">Cyprus Securities Commission</p>
                    <Button variant="outline" size="sm" className="w-full text-blue-700 border-blue-300">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Check CySEC Register
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default ScamBrokerShield;