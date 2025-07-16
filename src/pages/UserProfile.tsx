import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Trophy, 
  Star, 
  MessageSquare, 
  Eye,
  ThumbsUp,
  Award,
  TrendingUp,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Shield,
  BarChart3,
  Target,
  DollarSign,
  Percent
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

interface UserStats {
  totalPosts: number;
  totalReviews: number;
  reputation: number;
  helpfulVotes: number;
  profileViews: number;
  joinDate: string;
  lastActive: string;
  tradingExperience: string;
  location: string;
  website: string;
}

interface TradingStats {
  winRate: number;
  totalTrades: number;
  profitFactor: number;
  avgMonthlyReturn: number;
  riskScore: number;
  preferredInstruments: string[];
  tradingStyle: string;
  accountSize: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock user data
  const userStats: UserStats = {
    totalPosts: 156,
    totalReviews: 23,
    reputation: 2847,
    helpfulVotes: 342,
    profileViews: 1205,
    joinDate: "2022-03-15",
    lastActive: "2 hours ago",
    tradingExperience: "8+ years",
    location: "London, UK",
    website: "tradingblog.com"
  };

  const tradingStats: TradingStats = {
    winRate: 73.5,
    totalTrades: 1248,
    profitFactor: 1.87,
    avgMonthlyReturn: 12.4,
    riskScore: 6.2,
    preferredInstruments: ["EUR/USD", "GBP/USD", "Gold", "S&P 500"],
    tradingStyle: "Swing Trading",
    accountSize: "$50,000 - $100,000"
  };

  const achievements: Achievement[] = [
    {
      id: "1",
      name: "Expert Trader",
      description: "Verified trading experience of 5+ years",
      icon: "🏆",
      unlockedAt: "2023-01-15",
      rarity: "legendary"
    },
    {
      id: "2",
      name: "Top Reviewer",
      description: "Written 20+ high-quality broker reviews",
      icon: "⭐",
      unlockedAt: "2023-06-20",
      rarity: "epic"
    },
    {
      id: "3",
      name: "Community Helper",
      description: "Helped 100+ community members",
      icon: "🤝",
      unlockedAt: "2023-09-10",
      rarity: "rare"
    },
    {
      id: "4",
      name: "Discussion Leader",
      description: "Started 50+ valuable discussions",
      icon: "💬",
      unlockedAt: "2023-11-05",
      rarity: "rare"
    }
  ];

  const recentActivity = [
    {
      type: "review",
      content: "Reviewed IC Markets - 'Excellent for algorithmic trading'",
      timestamp: "2 hours ago",
      likes: 15
    },
    {
      type: "post",
      content: "Started discussion: 'Best MT4 EAs for beginners'",
      timestamp: "1 day ago",
      likes: 28
    },
    {
      type: "comment",
      content: "Commented on 'XTB vs Plus500 comparison'",
      timestamp: "2 days ago",
      likes: 7
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white";
      case "epic": return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
      case "rare": return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/30 to-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 mt-20 max-w-6xl">
        {/* Profile Header */}
        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/lovable-uploads/a278588e-21c7-4534-bd33-a5e69e619191.png" />
                <AvatarFallback>TP</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">TradingPro2024</h1>
                  <Shield className="h-6 w-6 text-green-600" />
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                    Expert Trader
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{userStats.reputation}</div>
                    <div className="text-sm text-muted-foreground">Reputation</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{userStats.totalPosts}</div>
                    <div className="text-sm text-muted-foreground">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{userStats.totalReviews}</div>
                    <div className="text-sm text-muted-foreground">Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{userStats.helpfulVotes}</div>
                    <div className="text-sm text-muted-foreground">Helpful Votes</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {userStats.joinDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{userStats.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LinkIcon className="h-4 w-4" />
                    <span className="text-primary hover:underline cursor-pointer">{userStats.website}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{userStats.profileViews} profile views</span>
                  </div>
                </div>
              </div>

              <Button className="bg-primary text-white hover:bg-primary/90">
                Follow
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm border border-slate-200">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="trading" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Trading Stats
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Achievements
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Activity
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Reviews
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <BarChart3 className="h-5 w-5" />
                    Community Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Reputation Level</span>
                        <span className="text-sm font-medium text-foreground">Expert (Level 8)</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">1,153 XP to next level</div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Helpful Rate</span>
                        <span className="text-sm font-medium text-foreground">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Response Rate</span>
                        <span className="text-sm font-medium text-foreground">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements.slice(0, 3).map((achievement) => (
                      <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{achievement.name}</div>
                          <div className="text-xs text-muted-foreground">{achievement.description}</div>
                        </div>
                        <Badge className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <MessageSquare className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-4 border-b border-border last:border-b-0 last:pb-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'review' ? 'bg-green-100 text-green-600' :
                        activity.type === 'post' ? 'bg-blue-100 text-blue-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {activity.type === 'review' ? <Star className="h-4 w-4" /> :
                         activity.type === 'post' ? <MessageSquare className="h-4 w-4" /> :
                         <MessageSquare className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground">{activity.content}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>{activity.timestamp}</span>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            <span>{activity.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trading Stats Tab */}
          <TabsContent value="trading" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 text-center p-6">
                <div className="flex items-center justify-center mb-2">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-foreground">{tradingStats.winRate}%</div>
                <div className="text-sm text-muted-foreground">Win Rate</div>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 text-center p-6">
                <div className="flex items-center justify-center mb-2">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-foreground">{tradingStats.totalTrades}</div>
                <div className="text-sm text-muted-foreground">Total Trades</div>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 text-center p-6">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-foreground">{tradingStats.profitFactor}</div>
                <div className="text-sm text-muted-foreground">Profit Factor</div>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 text-center p-6">
                <div className="flex items-center justify-center mb-2">
                  <Percent className="h-8 w-8 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-foreground">{tradingStats.avgMonthlyReturn}%</div>
                <div className="text-sm text-muted-foreground">Avg Monthly Return</div>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200">
                <CardHeader>
                  <CardTitle className="text-foreground">Trading Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <span className="font-medium text-foreground">Trading Style:</span>
                      <span className="ml-2 text-muted-foreground">{tradingStats.tradingStyle}</span>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Experience:</span>
                      <span className="ml-2 text-muted-foreground">{userStats.tradingExperience}</span>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Account Size:</span>
                      <span className="ml-2 text-muted-foreground">{tradingStats.accountSize}</span>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Risk Score:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={tradingStats.riskScore * 10} className="flex-1 h-2" />
                        <span className="text-sm text-muted-foreground">{tradingStats.riskScore}/10</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200">
                <CardHeader>
                  <CardTitle className="text-foreground">Preferred Instruments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {tradingStats.preferredInstruments.map((instrument, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                        <span className="text-foreground">{instrument}</span>
                        <Badge variant="outline">Active</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="bg-white/80 backdrop-blur-sm border border-slate-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{achievement.icon}</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{achievement.unlockedAt}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200">
              <CardHeader>
                <CardTitle className="text-foreground">Activity Timeline</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Complete history of community contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[...recentActivity, ...recentActivity].map((activity, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'review' ? 'bg-green-100 text-green-600' :
                        activity.type === 'post' ? 'bg-blue-100 text-blue-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {activity.type === 'review' ? <Star className="h-5 w-5" /> :
                         activity.type === 'post' ? <MessageSquare className="h-5 w-5" /> :
                         <MessageSquare className="h-5 w-5" />}
                      </div>
                      <div className="flex-1 pb-6 border-b border-border last:border-b-0">
                        <p className="text-foreground font-medium mb-1">{activity.content}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{activity.timestamp}</span>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{activity.likes} likes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{Math.floor(Math.random() * 100)} views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200">
              <CardHeader>
                <CardTitle className="text-foreground">Broker Reviews</CardTitle>
                <CardDescription className="text-muted-foreground">
                  All verified reviews written by this user
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">IC Markets Review</h4>
                          <div className="flex items-center gap-1 mt-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                            <span className="text-sm text-muted-foreground ml-1">(4.5)</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          Verified
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Excellent broker for algorithmic trading. Fast execution, competitive spreads, and reliable platform...
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>January 15, 2024</span>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>28 helpful</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>156 views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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

export default UserProfile;