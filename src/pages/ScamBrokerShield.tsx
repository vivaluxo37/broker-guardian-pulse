import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Shield, Download, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const unsafeBrokers = [
  {
    name: "Bybit",
    reason: "Not regulated by any top-tier financial authority, such as FCA in the UK or ASIC in Australia",
    warning: "Listed on FCA warning list since Feb 2021"
  },
  {
    name: "Pocket Option",
    reason: "Not regulated by any top-tier financial authority, such as FCA in the UK or ASIC in Australia",
    warning: "Listed on CNMV warning list since Jun 2023"
  },
  {
    name: "Quantum AI Trading",
    reason: "Not regulated by any top-tier financial authority, such as FCA in the UK or ASIC in Australia",
    warning: "Listed on Alberta Securities Commission warning list"
  }
];

const trustedBrokers = [
  "XM", "moomoo", "Zerodha", "Fidelity", "Capital.com", "Vantage", "IG", "Stake"
];

const scamBrokers = [
  "Quotex Broker", "Pocket Option", "Immediate Edge", "Quantum AI Trading",
  "Neo Banque", "TradingFX Global", "Bybit broker", "Apex Bitcoin Mining"
];

export default function ScamBrokerShield() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<{type: 'safe' | 'unsafe' | 'unknown', message: string} | null>(null);
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
    
    // Check if it's in unsafe brokers
    const isUnsafe = unsafeBrokers.some(broker => 
      broker.name.toLowerCase().includes(query)
    );
    
    if (isUnsafe) {
      setSearchResult({
        type: 'unsafe',
        message: `${searchQuery} is NOT TRUSTED. This broker appears on regulatory warning lists and is not regulated by top-tier financial authorities.`
      });
      return;
    }

    // Check if it's in trusted brokers
    const isTrusted = trustedBrokers.some(broker => 
      broker.toLowerCase().includes(query)
    );
    
    if (isTrusted) {
      setSearchResult({
        type: 'safe',
        message: `${searchQuery} is TRUSTED. This broker is properly regulated and meets our safety standards.`
      });
      return;
    }

    // Unknown broker
    setSearchResult({
      type: 'unknown',
      message: `We don't have information about "${searchQuery}" in our database. Please verify their regulatory status independently.`
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-16 w-16 text-primary mr-4" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Scam Broker Shield
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Check whether your broker is trusted by BrokerAnalysis. Protect yourself from scam brokers and fraudulent trading platforms.
            </p>
            
            {/* Counter */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold mb-4">Users we helped avoid shady brokers</h3>
              <div className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                5,760,141
              </div>
            </div>

            {/* Search Tool */}
            <Card className="max-w-2xl mx-auto mb-8 shadow-elegant border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Search className="h-6 w-6 mr-2" />
                  Broker Safety Check
                </CardTitle>
                <CardDescription>
                  Enter the name of a broker and see if it can be trusted.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input
                    placeholder="Search for scam broker..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch} className="px-8">
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
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                      )}
                      <p className={`text-sm ${
                        searchResult.type === 'safe' 
                          ? 'text-green-800 dark:text-green-200' 
                          : searchResult.type === 'unsafe'
                          ? 'text-red-800 dark:text-red-200'
                          : 'text-yellow-800 dark:text-yellow-200'
                      }`}>
                        {searchResult.message}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Chrome Extension */}
            <Card className="max-w-lg mx-auto shadow-elegant border-border/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Download className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Chrome Extension</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Detect scam broker websites in real-time as you browse with our free Chrome extension.
                  </p>
                  <Button variant="premium" className="w-full">
                    Download Extension
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Unsafe Brokers */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Most commonly checked unsafe brokers</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {unsafeBrokers.map((broker, index) => (
                <Card key={index} className="shadow-elegant border-red-200 dark:border-red-800">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                      {broker.name}
                    </CardTitle>
                    <Badge variant="destructive">Not trusted broker</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{broker.reason}</p>
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">{broker.warning}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted vs Scam Brokers */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Trusted Brokers */}
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-600">
                    <CheckCircle className="h-6 w-6 mr-2" />
                    More trusted brokers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {trustedBrokers.map((broker, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="justify-start h-auto py-3 border-green-200 hover:border-green-300"
                      >
                        {broker} review
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Scam Brokers */}
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-600">
                    <AlertTriangle className="h-6 w-6 mr-2" />
                    Scam brokers to avoid
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {scamBrokers.map((broker, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="justify-start h-auto py-3 border-red-200 hover:border-red-300 text-red-600 hover:text-red-700"
                      >
                        {broker} scam
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}