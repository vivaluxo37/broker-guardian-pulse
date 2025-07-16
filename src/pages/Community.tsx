import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Users, 
  Trophy, 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Eye,
  Clock,
  User,
  Shield,
  Award,
  TrendingUp,
  Search,
  Filter,
  Plus
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    reputation: number;
    badges: string[];
    verified: boolean;
  };
  category: string;
  replies: number;
  views: number;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  lastReply: string;
  pinned: boolean;
  solved: boolean;
}

interface UserReview {
  id: string;
  brokerId: string;
  brokerName: string;
  rating: number;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
    tradingExperience: string;
  };
  verificationLevel: "basic" | "verified" | "expert";
  helpful: number;
  notHelpful: number;
  createdAt: string;
  pros: string[];
  cons: string[];
}

// Mock data
const forumPosts: ForumPost[] = [
  {
    id: "1",
    title: "Best broker for scalping strategies?",
    content: "Looking for a broker with ultra-low spreads and fast execution for scalping EUR/USD...",
    author: {
      id: "user1",
      name: "TradingPro2024",
      avatar: "/lovable-uploads/a278588e-21c7-4534-bd33-a5e69e619191.png",
      reputation: 1250,
      badges: ["Expert Trader", "Top Contributor"],
      verified: true
    },
    category: "Broker Discussion",
    replies: 24,
    views: 890,
    upvotes: 18,
    downvotes: 2,
    createdAt: "2024-01-15",
    lastReply: "2 hours ago",
    pinned: true,
    solved: false
  },
  {
    id: "2",
    title: "WARNING: Avoid BrokerXYZ - My Experience",
    content: "I've been trading with BrokerXYZ for 6 months and here's what happened...",
    author: {
      id: "user2",
      name: "ForexVeteran",
      avatar: "/lovable-uploads/64b914e9-41e8-49b4-9132-f149648ce8ff.png",
      reputation: 890,
      badges: ["Verified Reviewer", "Community Helper"],
      verified: true
    },
    category: "Broker Reviews",
    replies: 45,
    views: 1200,
    upvotes: 32,
    downvotes: 5,
    createdAt: "2024-01-14",
    lastReply: "1 hour ago",
    pinned: false,
    solved: false
  }
];

const userReviews: UserReview[] = [
  {
    id: "1",
    brokerId: "ic-markets",
    brokerName: "IC Markets",
    rating: 4.5,
    title: "Excellent for algorithmic trading",
    content: "Been using IC Markets for 2 years now. Their Raw Spread account is perfect for my EA trading. Execution is lightning fast and I've never had any issues with withdrawals.",
    author: {
      id: "user1",
      name: "AlgoTrader_Max",
      avatar: "/lovable-uploads/a278588e-21c7-4534-bd33-a5e69e619191.png",
      verified: true,
      tradingExperience: "5+ years"
    },
    verificationLevel: "expert",
    helpful: 28,
    notHelpful: 3,
    createdAt: "2024-01-10",
    pros: ["Fast execution", "Low spreads", "Reliable platform", "Good customer support"],
    cons: ["High minimum deposit", "Limited educational resources"]
  }
];

const Community = () => {
  const [activeTab, setActiveTab] = useState("forum");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/30 to-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 mt-20 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            Trading Community
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-4 max-w-3xl mx-auto leading-relaxed">
            Connect with fellow traders, share experiences, and learn from the community
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4 bg-white/80 backdrop-blur-sm border border-slate-200">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">15,247</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </Card>
          <Card className="text-center p-4 bg-white/80 backdrop-blur-sm border border-slate-200">
            <div className="flex items-center justify-center mb-2">
              <MessageSquare className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-foreground">2,834</div>
            <div className="text-sm text-muted-foreground">Forum Posts</div>
          </Card>
          <Card className="text-center p-4 bg-white/80 backdrop-blur-sm border border-slate-200">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-foreground">8,923</div>
            <div className="text-sm text-muted-foreground">Broker Reviews</div>
          </Card>
          <Card className="text-center p-4 bg-white/80 backdrop-blur-sm border border-slate-200">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="h-8 w-8 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-foreground">456</div>
            <div className="text-sm text-muted-foreground">Expert Contributors</div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border border-slate-200">
            <TabsTrigger value="forum" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Forum & Q&A
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              User Reviews
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="profiles" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Top Members
            </TabsTrigger>
          </TabsList>

          {/* Forum & Q&A Tab */}
          <TabsContent value="forum" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search discussions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-slate-200"
                  />
                </div>
              </div>
              <Button className="bg-primary text-white hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                New Discussion
              </Button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["all", "Broker Discussion", "Trading Strategies", "Market Analysis", "Platform Issues", "General"].map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-primary text-white" : ""}
                >
                  {category === "all" ? "All Categories" : category}
                </Button>
              ))}
            </div>

            {/* Forum Posts */}
            <div className="space-y-4">
              {forumPosts.map((post) => (
                <Card key={post.id} className="bg-white/80 backdrop-blur-sm border border-slate-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-foreground hover:text-primary cursor-pointer">
                              {post.title}
                            </h3>
                            {post.pinned && <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pinned</Badge>}
                            {post.solved && <Badge variant="default" className="bg-green-100 text-green-800">Solved</Badge>}
                          </div>
                          <p className="text-muted-foreground mb-3 line-clamp-2">{post.content}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span className="font-medium text-foreground">{post.author.name}</span>
                              {post.author.verified && <Shield className="h-4 w-4 text-green-600" />}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{post.replies}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{post.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{post.lastReply}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Button variant="ghost" size="sm" className="flex flex-col items-center p-2">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="text-xs">{post.upvotes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex flex-col items-center p-2">
                          <ThumbsDown className="h-4 w-4" />
                          <span className="text-xs">{post.downvotes}</span>
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{post.category}</Badge>
                        {post.author.badges.map((badge) => (
                          <Badge key={badge} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{post.createdAt}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* User Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Verified User Reviews</h2>
              <Button className="bg-primary text-white hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Write Review
              </Button>
            </div>

            <div className="space-y-6">
              {userReviews.map((review) => (
                <Card key={review.id} className="bg-white/80 backdrop-blur-sm border border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={review.author.avatar} />
                          <AvatarFallback>{review.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground">{review.author.name}</span>
                            {review.author.verified && <Shield className="h-4 w-4 text-green-600" />}
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                review.verificationLevel === "expert" ? "bg-purple-100 text-purple-800 border-purple-200" :
                                review.verificationLevel === "verified" ? "bg-green-100 text-green-800 border-green-200" :
                                "bg-blue-100 text-blue-800 border-blue-200"
                              }`}
                            >
                              {review.verificationLevel === "expert" ? "Expert Trader" :
                               review.verificationLevel === "verified" ? "Verified Account" : "Basic"}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Trading Experience: {review.author.tradingExperience}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground">{review.brokerName}</div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">({review.rating})</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-2">{review.title}</h3>
                    <p className="text-muted-foreground mb-4">{review.content}</p>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-green-700 mb-2">Pros:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {review.pros.map((pro, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-700 mb-2">Cons:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {review.cons.map((con, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <ThumbsUp className="h-4 w-4" />
                          <span>Helpful ({review.helpful})</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <ThumbsDown className="h-4 w-4" />
                          <span>Not Helpful ({review.notHelpful})</span>
                        </Button>
                      </div>
                      <span className="text-xs text-muted-foreground">{review.createdAt}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Community Leaderboard</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Top Contributors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((rank) => (
                      <div key={rank} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                            rank === 1 ? 'bg-yellow-500' : rank === 2 ? 'bg-gray-400' : rank === 3 ? 'bg-orange-500' : 'bg-slate-400'
                          }`}>
                            {rank}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">TradingPro{rank}</div>
                            <div className="text-xs text-muted-foreground">1,{200-rank*50} posts</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-foreground">{2500-rank*100}</div>
                          <div className="text-xs text-muted-foreground">reputation</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Star className="h-5 w-5 text-blue-500" />
                    Top Reviewers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((rank) => (
                      <div key={rank} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                            rank === 1 ? 'bg-blue-500' : rank === 2 ? 'bg-indigo-400' : rank === 3 ? 'bg-purple-500' : 'bg-slate-400'
                          }`}>
                            {rank}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">ReviewMaster{rank}</div>
                            <div className="text-xs text-muted-foreground">{50-rank*5} reviews</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-foreground">{95-rank*2}%</div>
                          <div className="text-xs text-muted-foreground">helpful rate</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Rising Stars
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((rank) => (
                      <div key={rank} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">
                            {rank}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">NewTrader{rank}</div>
                            <div className="text-xs text-muted-foreground">+{100-rank*10} this week</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium text-green-500">+{20-rank*2}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Top Members Tab */}
          <TabsContent value="profiles" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Top Community Members</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((member) => (
                <Card key={member} className="bg-white/80 backdrop-blur-sm border border-slate-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={`/lovable-uploads/a278588e-21c7-4534-bd33-a5e69e619191.png`} />
                      <AvatarFallback>T{member}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold text-foreground mb-2">TradingExpert{member}</h3>
                    
                    <div className="flex justify-center gap-2 mb-4">
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                        Expert Trader
                      </Badge>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Top Reviewer
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <div className="font-bold text-foreground">{2500-member*100}</div>
                        <div className="text-muted-foreground">Reputation</div>
                      </div>
                      <div>
                        <div className="font-bold text-foreground">{150-member*20}</div>
                        <div className="text-muted-foreground">Posts</div>
                      </div>
                      <div>
                        <div className="font-bold text-foreground">{50-member*5}</div>
                        <div className="text-muted-foreground">Reviews</div>
                      </div>
                      <div>
                        <div className="font-bold text-foreground">{95-member}%</div>
                        <div className="text-muted-foreground">Helpful Rate</div>
                      </div>
                    </div>

                    <div className="flex justify-center gap-2 mb-4">
                      {["Trading Master", "Community Helper", "Verified Account"].slice(0, member > 3 ? 1 : 3).map((badge) => (
                        <Award key={badge} className="h-4 w-4 text-yellow-500" />
                      ))}
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Community;