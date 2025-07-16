import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { EconomicCalendar } from "@/components/EconomicCalendar";
import { TradingCalculators } from "@/components/TradingCalculators";
import { MarketNewsWidget } from "@/components/MarketNewsWidget";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Calculator, Calendar, Globe, TrendingUp } from "lucide-react";

const InteractiveTools = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white text-slate-800">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-primary/5">
        <div className="container mx-auto px-4 mt-20 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Interactive Trading Tools
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-4 max-w-3xl mx-auto leading-relaxed">
              Professional trading tools to help you make informed decisions. From live market data to advanced calculators and broker comparisons.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/80 backdrop-blur-sm border border-slate-200">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="news" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">News</span>
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Calendar</span>
              </TabsTrigger>
              <TabsTrigger value="calculators" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">Calculators</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quick Stats */}
                <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                      <TrendingUp className="h-5 w-5" />
                      Market Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="text-2xl font-bold text-green-600">EUR/USD</div>
                        <div className="text-sm text-slate-500">1.2045 (+0.15%)</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="text-2xl font-bold text-red-500">GBP/USD</div>
                        <div className="text-sm text-slate-500">1.3182 (-0.08%)</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="text-2xl font-bold text-green-600">USD/JPY</div>
                        <div className="text-sm text-slate-500">149.85 (+0.22%)</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="text-2xl font-bold text-green-600">Gold</div>
                        <div className="text-sm text-slate-500">$2,045 (+0.31%)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Featured Tools */}
                <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-slate-800">Featured Tools</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <button className="p-4 text-left border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-200 hover:shadow-md group">
                        <Calculator className="h-6 w-6 mb-2 text-primary group-hover:scale-110 transition-transform" />
                        <div className="font-medium text-slate-800">Position Calculator</div>
                        <div className="text-sm text-slate-500">Calculate optimal position size</div>
                      </button>
                      <button className="p-4 text-left border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-200 hover:shadow-md group">
                        <BarChart3 className="h-6 w-6 mb-2 text-primary group-hover:scale-110 transition-transform" />
                        <div className="font-medium text-slate-800">Broker Compare</div>
                        <div className="text-sm text-slate-500">Compare broker features</div>
                      </button>
                      <button className="p-4 text-left border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-200 hover:shadow-md group">
                        <Calendar className="h-6 w-6 mb-2 text-primary group-hover:scale-110 transition-transform" />
                        <div className="font-medium text-slate-800">Economic Calendar</div>
                        <div className="text-sm text-slate-500">Track market events</div>
                      </button>
                      <button className="p-4 text-left border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-200 hover:shadow-md group">
                        <Globe className="h-6 w-6 mb-2 text-primary group-hover:scale-110 transition-transform" />
                        <div className="font-medium text-slate-800">Market News</div>
                        <div className="text-sm text-slate-500">Latest market updates</div>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Mini versions of key tools */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <MarketNewsWidget />
                </div>
                <div className="space-y-6">
                  <EconomicCalendar />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="news">
              <MarketNewsWidget />
            </TabsContent>

            <TabsContent value="calendar">
              <EconomicCalendar />
            </TabsContent>

            <TabsContent value="calculators">
              <TradingCalculators />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InteractiveTools;