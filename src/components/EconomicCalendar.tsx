import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, TrendingUp, TrendingDown, Clock, AlertCircle } from "lucide-react";

interface EconomicEvent {
  id: string;
  time: string;
  currency: string;
  event: string;
  importance: "low" | "medium" | "high";
  forecast?: string;
  previous?: string;
  actual?: string;
  impact: "positive" | "negative" | "neutral";
}

const mockEvents: EconomicEvent[] = [
  {
    id: "1",
    time: "09:30",
    currency: "USD",
    event: "Non-Farm Payrolls",
    importance: "high",
    forecast: "200K",
    previous: "185K",
    actual: "210K",
    impact: "positive"
  },
  {
    id: "2", 
    time: "14:00",
    currency: "EUR",
    event: "ECB Interest Rate Decision",
    importance: "high",
    forecast: "4.50%",
    previous: "4.25%",
    impact: "neutral"
  },
  {
    id: "3",
    time: "10:30",
    currency: "GBP",
    event: "GDP Growth Rate",
    importance: "medium",
    forecast: "0.2%",
    previous: "0.1%",
    actual: "0.3%",
    impact: "positive"
  },
  {
    id: "4",
    time: "16:00",
    currency: "JPY",
    event: "BOJ Press Conference",
    importance: "high",
    forecast: "-",
    previous: "-",
    impact: "neutral"
  },
  {
    id: "5",
    time: "11:00",
    currency: "CAD",
    event: "Employment Change",
    importance: "medium",
    forecast: "15K",
    previous: "12K",
    actual: "8K",
    impact: "negative"
  }
];

export function EconomicCalendar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-accent text-accent-foreground";
      case "low": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "positive": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "negative": return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Economic Calendar
          <Badge variant="secondary" className="ml-auto">
            <Clock className="h-3 w-3 mr-1" />
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="space-y-4">
            {mockEvents.map((event) => (
              <div 
                key={event.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-sm font-mono text-muted-foreground min-w-[50px]">
                    {event.time}
                  </div>
                  
                  <Badge variant="outline" className="min-w-[40px] justify-center">
                    {event.currency}
                  </Badge>
                  
                  <Badge className={getImportanceColor(event.importance)}>
                    {event.importance.toUpperCase()}
                  </Badge>
                  
                  <div className="flex-1">
                    <div className="font-medium">{event.event}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    {event.forecast && (
                      <div className="text-muted-foreground">
                        Forecast: {event.forecast}
                      </div>
                    )}
                    {event.actual && (
                      <div className="font-medium">
                        Actual: {event.actual}
                      </div>
                    )}
                  </div>
                  {getImpactIcon(event.impact)}
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="tomorrow" className="space-y-4">
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Tomorrow's events will be updated soon</p>
            </div>
          </TabsContent>
          
          <TabsContent value="week" className="space-y-4">
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Weekly overview coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}