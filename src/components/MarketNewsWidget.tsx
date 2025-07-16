import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, TrendingUp, TrendingDown, Clock, Globe } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  time: string;
  category: "forex" | "stocks" | "crypto" | "commodities";
  impact: "high" | "medium" | "low";
  sentiment: "positive" | "negative" | "neutral";
  url?: string;
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Federal Reserve Signals Potential Rate Cut in December",
    summary: "Fed Chair Powell hints at a 25 basis point cut as inflation shows signs of cooling down to target levels.",
    source: "Reuters",
    time: "2 hours ago",
    category: "forex",
    impact: "high",
    sentiment: "positive"
  },
  {
    id: "2",
    title: "EUR/USD Breaks Above 1.2000 as ECB Maintains Hawkish Stance",
    summary: "The euro strengthens against the dollar following ECB's commitment to fighting inflation.",
    source: "Bloomberg",
    time: "4 hours ago",
    category: "forex",
    impact: "medium",
    sentiment: "positive"
  },
  {
    id: "3",
    title: "Oil Prices Surge 3% on OPEC+ Production Cut Speculation",
    summary: "WTI crude oil rallies as markets anticipate potential supply restrictions from major producers.",
    source: "MarketWatch",
    time: "6 hours ago",
    category: "commodities",
    impact: "high",
    sentiment: "positive"
  },
  {
    id: "4",
    title: "Bitcoin Consolidates Near $45,000 Amid ETF Approval Hopes",
    summary: "Cryptocurrency markets remain range-bound as investors await regulatory decisions on spot Bitcoin ETFs.",
    source: "CoinDesk",
    time: "8 hours ago",
    category: "crypto",
    impact: "medium",
    sentiment: "neutral"
  },
  {
    id: "5",
    title: "S&P 500 Reaches New All-Time High on Tech Earnings Beat",
    summary: "Major technology stocks drive markets higher after strong quarterly results from leading companies.",
    source: "CNBC",
    time: "12 hours ago",
    category: "stocks",
    impact: "high",
    sentiment: "positive"
  },
  {
    id: "6",
    title: "Gold Retreats from Weekly Highs as Dollar Stabilizes",
    summary: "Precious metals pull back slightly as US dollar finds support after recent weakness.",
    source: "Financial Times",
    time: "1 day ago",
    category: "commodities",
    impact: "low",
    sentiment: "negative"
  }
];

export function MarketNewsWidget() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [refreshTime, setRefreshTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-accent text-accent-foreground";
      case "low": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "negative": return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Globe className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "forex": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "stocks": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "crypto": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "commodities": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const filteredNews = selectedCategory === "all" 
    ? mockNews 
    : mockNews.filter(news => news.category === selectedCategory);

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Market News
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Updated {refreshTime.toLocaleTimeString()}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="forex">Forex</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="commodities">Gold/Oil</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCategory} className="space-y-4 mt-6">
            {filteredNews.map((news) => (
              <div 
                key={news.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={getCategoryColor(news.category)}>
                        {news.category.toUpperCase()}
                      </Badge>
                      <Badge className={getImpactColor(news.impact)}>
                        {news.impact.toUpperCase()} IMPACT
                      </Badge>
                      <span className="text-sm text-muted-foreground">{news.source}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{news.time}</span>
                    </div>

                    <h3 className="font-semibold text-lg leading-tight">
                      {news.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {news.summary}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getSentimentIcon(news.sentiment)}
                        <span className="text-sm text-muted-foreground capitalize">
                          {news.sentiment} sentiment
                        </span>
                      </div>

                      <Button variant="ghost" size="sm" className="h-8">
                        Read More
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center pt-4">
              <Button variant="outline">
                Load More News
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}