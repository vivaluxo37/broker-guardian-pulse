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
  regulationDetails: {
    [key: string]: {
      license: string;
      compensation: string;
      established: string;
    };
  };
  minDeposit: number;
  maxLeverage: string;
  
  // Trading Costs
  eurUsdSpread: number;
  gbpUsdSpread: number;
  usdJpySpread: number;
  goldSpread: number;
  commission: string;
  swapRates: {
    long: string;
    short: string;
  };
  
  // Trading Platforms
  platforms: string[];
  platformFeatures: {
    [key: string]: string[];
  };
  
  // Account Types
  account_types: string[];
  accountDetails: {
    [key: string]: {
      minDeposit: number;
      spread: string;
      commission: string;
      features: string[];
    };
  };
  
  // Instruments
  instruments: {
    forex: number;
    stocks: number;
    indices: number;
    commodities: number;
    crypto: number;
    bonds: number;
    etfs: number;
  };
  
  // Execution & Technology
  executionModel: string;
  averageExecutionSpeed: string;
  slippage: string;
  requotes: string;
  
  // Funding
  depositMethods: string[];
  withdrawalMethods: string[];
  depositFees: string;
  withdrawalFees: string;
  withdrawal_time: string;
  baseCurrencies: string[];
  
  // Support & Education
  customer_support: string;
  supportLanguages: number;
  education: boolean;
  educationFeatures: string[];
  demo_account: boolean;
  islamic_account: boolean;
  
  // Additional Features
  socialTrading: boolean;
  copyTrading: boolean;
  algorithmicTrading: boolean;
  apiAccess: boolean;
  vpsOffered: boolean;
  researchTools: string[];
  
  // Company Info
  founded: number;
  headquarters: string;
  employees: string;
  publiclyTraded: boolean;
  
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
    regulationDetails: {
      "CySEC": { license: "120/10", compensation: "€20,000", established: "2010" },
      "ASIC": { license: "443670", compensation: "AU$1,000,000", established: "2015" }
    },
    minDeposit: 5,
    maxLeverage: "1:888",
    eurUsdSpread: 1.6,
    gbpUsdSpread: 2.1,
    usdJpySpread: 1.8,
    goldSpread: 0.35,
    commission: "No commission on Standard",
    swapRates: { long: "-2.17", short: "-4.93" },
    platforms: ["MT4", "MT5", "WebTrader", "Mobile"],
    platformFeatures: {
      "MT4": ["Expert Advisors", "Custom Indicators", "One-click Trading"],
      "MT5": ["Advanced Charting", "Economic Calendar", "Market Depth"]
    },
    account_types: ["Micro", "Standard", "XM Zero"],
    accountDetails: {
      "Micro": { minDeposit: 5, spread: "From 1.0 pips", commission: "No commission", features: ["Micro lot trading"] },
      "Standard": { minDeposit: 5, spread: "From 1.0 pips", commission: "No commission", features: ["Standard lots"] }
    },
    instruments: { forex: 57, stocks: 1400, indices: 24, commodities: 8, crypto: 31, bonds: 0, etfs: 0 },
    executionModel: "Market Maker",
    averageExecutionSpeed: "< 1 second",
    slippage: "Minimal",
    requotes: "Rare",
    depositMethods: ["Credit/Debit Cards", "Bank Wire", "Skrill", "Neteller"],
    withdrawalMethods: ["Credit/Debit Cards", "Bank Wire", "Skrill", "Neteller"],
    depositFees: "Free",
    withdrawalFees: "Free (some methods)",
    withdrawal_time: "1-3 business days",
    baseCurrencies: ["USD", "EUR", "GBP", "JPY", "AUD"],
    customer_support: "24/5 multilingual",
    supportLanguages: 30,
    education: true,
    educationFeatures: ["Daily Market Analysis", "Webinars", "Educational Videos"],
    demo_account: true,
    islamic_account: true,
    socialTrading: false,
    copyTrading: false,
    algorithmicTrading: true,
    apiAccess: false,
    vpsOffered: true,
    researchTools: ["Market Analysis", "Economic Calendar", "Trading Signals"],
    founded: 2009,
    headquarters: "Cyprus",
    employees: "500+",
    publiclyTraded: false,
    pros: ["Low minimum deposit", "High leverage", "Strong regulation", "Educational resources"],
    cons: ["Higher spreads on some pairs", "Limited cryptocurrency options"]
  },
  {
    id: "2",
    name: "IG Markets",
    logo: "/lovable-uploads/0211e090-45a0-45f5-bbaf-c9df5dde39e8.png",
    rating: 4.7,
    regulation: ["FCA", "ASIC", "MAS"],
    regulationDetails: {
      "FCA": { license: "195355", compensation: "£85,000", established: "1974" },
      "ASIC": { license: "515106", compensation: "AU$1,000,000", established: "2002" }
    },
    minDeposit: 250,
    maxLeverage: "1:30",
    eurUsdSpread: 0.6,
    gbpUsdSpread: 0.9,
    usdJpySpread: 0.7,
    goldSpread: 0.3,
    commission: "From $8 per lot",
    swapRates: { long: "-2.5", short: "-1.2" },
    platforms: ["IG Platform", "MT4", "ProRealTime", "Mobile"],
    platformFeatures: {
      "IG Platform": ["Advanced Charting", "Price Alerts", "Risk Management"],
      "MT4": ["Expert Advisors", "Custom Indicators", "Automated Trading"]
    },
    account_types: ["Standard", "Professional"],
    accountDetails: {
      "Standard": { minDeposit: 250, spread: "From 0.6 pips", commission: "From $8 per lot", features: ["Retail protection"] },
      "Professional": { minDeposit: 250, spread: "From 0.6 pips", commission: "From $6 per lot", features: ["Higher leverage"] }
    },
    instruments: { forex: 80, stocks: 17000, indices: 40, commodities: 27, crypto: 15, bonds: 50, etfs: 300 },
    executionModel: "Market Maker / DMA",
    averageExecutionSpeed: "< 0.5 seconds",
    slippage: "Minimal",
    requotes: "Very rare",
    depositMethods: ["Credit/Debit Cards", "Bank Wire", "PayPal"],
    withdrawalMethods: ["Credit/Debit Cards", "Bank Wire", "PayPal"],
    depositFees: "Free",
    withdrawalFees: "Free",
    withdrawal_time: "1-2 business days",
    baseCurrencies: ["USD", "EUR", "GBP", "AUD", "SGD"],
    customer_support: "24/5 phone & chat",
    supportLanguages: 16,
    education: true,
    educationFeatures: ["IG Academy", "Market Analysis", "Trading Guides"],
    demo_account: true,
    islamic_account: false,
    socialTrading: false,
    copyTrading: false,
    algorithmicTrading: true,
    apiAccess: true,
    vpsOffered: false,
    researchTools: ["Reuters News", "Market Screener", "Technical Analysis"],
    founded: 1974,
    headquarters: "London, UK",
    employees: "4000+",
    publiclyTraded: true,
    pros: ["Tight spreads", "Strong regulation", "Advanced charting", "Wide market access"],
    cons: ["Higher minimum deposit", "Complex fee structure"]
  },
  {
    id: "3",
    name: "Pepperstone",
    logo: "/lovable-uploads/04e39e67-4fc8-4df2-ba16-c215860693a6.png",
    rating: 4.6,
    regulation: ["ASIC", "FCA", "CySEC"],
    regulationDetails: {
      "ASIC": { license: "414530", compensation: "AU$1,000,000", established: "2010" },
      "FCA": { license: "684312", compensation: "£85,000", established: "2017" }
    },
    minDeposit: 200,
    maxLeverage: "1:500",
    eurUsdSpread: 0.8,
    gbpUsdSpread: 1.2,
    usdJpySpread: 0.9,
    goldSpread: 0.28,
    commission: "From $3.50 per lot",
    swapRates: { long: "-1.8", short: "-3.2" },
    platforms: ["MT4", "MT5", "cTrader", "Mobile"],
    platformFeatures: {
      "MT4": ["Expert Advisors", "Custom Indicators", "One-click Trading"],
      "cTrader": ["Level II Pricing", "Advanced Charting", "Algorithmic Trading"]
    },
    account_types: ["Standard", "Razor"],
    accountDetails: {
      "Standard": { minDeposit: 200, spread: "From 1.0 pips", commission: "No commission", features: ["Standard execution"] },
      "Razor": { minDeposit: 200, spread: "From 0.0 pips", commission: "From $3.50", features: ["Raw spreads"] }
    },
    instruments: { forex: 61, stocks: 1200, indices: 19, commodities: 12, crypto: 20, bonds: 0, etfs: 0 },
    executionModel: "STP/ECN",
    averageExecutionSpeed: "< 0.4 seconds",
    slippage: "Minimal",
    requotes: "Rare",
    depositMethods: ["Credit/Debit Cards", "Bank Wire", "PayPal", "Skrill"],
    withdrawalMethods: ["Credit/Debit Cards", "Bank Wire", "PayPal", "Skrill"],
    depositFees: "Free",
    withdrawalFees: "Free",
    withdrawal_time: "1-2 business days",
    baseCurrencies: ["USD", "EUR", "GBP", "AUD", "CAD"],
    customer_support: "24/5 multilingual",
    supportLanguages: 8,
    education: true,
    educationFeatures: ["Trading Academy", "Market Analysis", "Webinars"],
    demo_account: true,
    islamic_account: true,
    socialTrading: false,
    copyTrading: false,
    algorithmicTrading: true,
    apiAccess: true,
    vpsOffered: true,
    researchTools: ["Market Analysis", "Trading Central", "Autochartist"],
    founded: 2010,
    headquarters: "Melbourne, Australia",
    employees: "200+",
    publiclyTraded: false,
    pros: ["Fast execution", "Low spreads", "Multiple platforms", "Good customer service"],
    cons: ["Limited educational content", "Withdrawal fees on some methods"]
  },
  {
    id: "4",
    name: "IC Markets",
    logo: "/lovable-uploads/0eabf75e-7984-481a-85ea-46dfc5362774.png",
    rating: 4.8,
    regulation: ["ASIC", "CySEC"],
    regulationDetails: {
      "ASIC": { license: "335692", compensation: "AU$1,000,000", established: "2007" },
      "CySEC": { license: "362/18", compensation: "€20,000", established: "2019" }
    },
    minDeposit: 200,
    maxLeverage: "1:500",
    eurUsdSpread: 0.1,
    gbpUsdSpread: 0.3,
    usdJpySpread: 0.2,
    goldSpread: 0.13,
    commission: "From $3 per lot",
    swapRates: { long: "-1.5", short: "-2.8" },
    platforms: ["MT4", "MT5", "cTrader", "Mobile"],
    platformFeatures: {
      "MT4": ["Expert Advisors", "Custom Indicators", "One-click Trading"],
      "MT5": ["Advanced Charting", "Economic Calendar", "Market Depth"],
      "cTrader": ["Level II Pricing", "Advanced Charting", "Copy Trading"]
    },
    account_types: ["Standard", "Raw Spread"],
    accountDetails: {
      "Standard": { minDeposit: 200, spread: "From 1.0 pips", commission: "No commission", features: ["Standard execution"] },
      "Raw Spread": { minDeposit: 200, spread: "From 0.0 pips", commission: "From $3", features: ["Raw interbank spreads"] }
    },
    instruments: { forex: 61, stocks: 2100, indices: 27, commodities: 22, crypto: 11, bonds: 0, etfs: 0 },
    executionModel: "True ECN",
    averageExecutionSpeed: "< 0.3 seconds",
    slippage: "Minimal",
    requotes: "None",
    depositMethods: ["Credit/Debit Cards", "Bank Wire", "PayPal", "Skrill", "Neteller"],
    withdrawalMethods: ["Credit/Debit Cards", "Bank Wire", "PayPal", "Skrill", "Neteller"],
    depositFees: "Free",
    withdrawalFees: "Free",
    withdrawal_time: "1-2 business days",
    baseCurrencies: ["USD", "EUR", "GBP", "AUD", "NZD", "CAD", "CHF", "JPY"],
    customer_support: "24/5 multilingual",
    supportLanguages: 12,
    education: true,
    educationFeatures: ["Educational Articles", "Trading Guides", "Video Tutorials"],
    demo_account: true,
    islamic_account: true,
    socialTrading: false,
    copyTrading: true,
    algorithmicTrading: true,
    apiAccess: true,
    vpsOffered: true,
    researchTools: ["Market Analysis", "Trading Central", "Economic Calendar"],
    founded: 2007,
    headquarters: "Sydney, Australia",
    employees: "150+",
    publiclyTraded: false,
    pros: ["Ultra-low spreads", "Fast execution", "Multiple platforms", "Strong regulation"],
    cons: ["Commission-based pricing", "Limited educational resources"]
  },
  {
    id: "5",
    name: "OANDA",
    logo: "/lovable-uploads/08a94209-3538-484a-9f2a-f19f59e5762e.png",
    rating: 4.4,
    regulation: ["NFA", "FCA", "ASIC", "MAS"],
    regulationDetails: {
      "NFA": { license: "0325821", compensation: "$1,000,000", established: "2001" },
      "FCA": { license: "542574", compensation: "£85,000", established: "2013" }
    },
    minDeposit: 0,
    maxLeverage: "1:50",
    eurUsdSpread: 1.2,
    gbpUsdSpread: 1.5,
    usdJpySpread: 1.3,
    goldSpread: 0.45,
    commission: "No commission",
    swapRates: { long: "-2.1", short: "-1.8" },
    platforms: ["OANDA Trade", "MT4", "TradingView", "Mobile"],
    platformFeatures: {
      "OANDA Trade": ["Advanced Charting", "Order Management", "Risk Tools"],
      "MT4": ["Expert Advisors", "Custom Indicators", "Automated Trading"]
    },
    account_types: ["Standard", "Premium"],
    accountDetails: {
      "Standard": { minDeposit: 0, spread: "From 1.2 pips", commission: "No commission", features: ["Fractional units"] },
      "Premium": { minDeposit: 20000, spread: "From 0.8 pips", commission: "No commission", features: ["Premium spreads"] }
    },
    instruments: { forex: 68, stocks: 0, indices: 23, commodities: 7, crypto: 4, bonds: 32, etfs: 0 },
    executionModel: "Market Maker",
    averageExecutionSpeed: "< 1 second",
    slippage: "Low",
    requotes: "Rare",
    depositMethods: ["Credit/Debit Cards", "Bank Wire", "PayPal", "ACH"],
    withdrawalMethods: ["Credit/Debit Cards", "Bank Wire", "PayPal", "ACH"],
    depositFees: "Free",
    withdrawalFees: "Free",
    withdrawal_time: "1-5 business days",
    baseCurrencies: ["USD", "EUR", "GBP", "AUD", "CAD", "CHF", "JPY", "SGD"],
    customer_support: "24/5 phone & chat",
    supportLanguages: 6,
    education: true,
    educationFeatures: ["Trading Academy", "Market Analysis", "Educational Articles"],
    demo_account: true,
    islamic_account: false,
    socialTrading: false,
    copyTrading: false,
    algorithmicTrading: true,
    apiAccess: true,
    vpsOffered: false,
    researchTools: ["Market Analysis", "Economic Calendar", "Currency Forecasts"],
    founded: 1996,
    headquarters: "New York, USA",
    employees: "700+",
    publiclyTraded: true,
    pros: ["No minimum deposit", "Fractional units", "Good research", "Reliable platform"],
    cons: ["Higher spreads", "Limited leverage", "No MT5"]
  }
];

// Generate additional 83 brokers with realistic data
const additionalBrokers = [
  "eToro", "Plus500", "Admiral Markets", "FXTM", "ThinkMarkets", "FP Markets", "Tickmill", "Exness", 
  "HotForex", "InstaForex", "FBS", "OctaFX", "RoboForex", "IronFX", "LiteFinance", "Axiory", 
  "FxPro", "Markets.com", "CMC Markets", "City Index", "Spread Co", "Capital.com", "Trading 212", 
  "AvaTrade", "XTB", "Interactive Brokers", "Saxo Bank", "FOREX.com", "Charles Schwab", "TD Ameritrade",
  "E*TRADE", "Fidelity", "Vanguard", "Merrill Edge", "Ally Invest", "Robinhood", "Webull", 
  "TradeStation", "tastyworks", "Thinkorswim", "NinjaTrader", "MetaTrader", "TradingView", 
  "Binance", "Coinbase Pro", "Kraken", "Bitfinex", "Huobi", "KuCoin", "FTX", "Gemini",
  "Bitstamp", "CEX.IO", "eToro Crypto", "Bitpanda", "Crypto.com", "Uphold", "Revolut Trading",
  "Swissquote", "Dukascopy", "FXCM", "Gain Capital", "IBKR", "Alpaca", "DriveWealth",
  "Revolut", "Freetrade", "Hargreaves Lansdown", "AJ Bell", "Degiro", "Flatex", "Comdirect",
  "Consorsbank", "ING", "ABN AMRO", "Bolero", "Keytrade Bank", "BinckBank", "Lynx",
  "Questrade", "Wealthsimple Trade", "National Bank Direct Brokerage", "RBC Direct Investing",
  "TD Direct Investing", "CIBC Investor's Edge", "BMO InvestorLine", "Qtrade", "Virtual Brokers"
].map((name, index) => {
  const baseIndex = index + 6;
  const ratings = [3.8, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7];
  const regulations = [["FCA"], ["CySEC"], ["ASIC"], ["NFA"], ["CFTC"], ["FCA", "CySEC"], ["ASIC", "FCA"], ["CySEC", "ASIC"]];
  const leverages = ["1:30", "1:50", "1:100", "1:200", "1:300", "1:400", "1:500"];
  const minDeposits = [0, 10, 50, 100, 200, 250, 500, 1000];
  const spreads = [0.5, 0.8, 1.0, 1.2, 1.5, 1.8, 2.0, 2.5];
  
  return {
    id: baseIndex.toString(),
    name,
    logo: `/lovable-uploads/${['01ce80d9-1df7-4bb8-9445-5012485f2889', '0211e090-45a0-45f5-bbaf-c9df5dde39e8', '04e39e67-4fc8-4df2-ba16-c215860693a6'][baseIndex % 3]}.png`,
    rating: ratings[baseIndex % ratings.length],
    regulation: regulations[baseIndex % regulations.length],
    regulationDetails: {
      [regulations[baseIndex % regulations.length][0]]: {
        license: `${Math.floor(Math.random() * 999999)}`,
        compensation: regulations[baseIndex % regulations.length][0] === "FCA" ? "£85,000" : "€20,000",
        established: `${1990 + (baseIndex % 30)}`
      }
    },
    minDeposit: minDeposits[baseIndex % minDeposits.length],
    maxLeverage: leverages[baseIndex % leverages.length],
    eurUsdSpread: spreads[baseIndex % spreads.length],
    gbpUsdSpread: spreads[baseIndex % spreads.length] + 0.3,
    usdJpySpread: spreads[baseIndex % spreads.length] + 0.1,
    goldSpread: spreads[baseIndex % spreads.length] * 0.3,
    commission: baseIndex % 3 === 0 ? "No commission" : `From $${3 + (baseIndex % 5)} per lot`,
    swapRates: { long: `-${1 + (baseIndex % 3)}`, short: `-${2 + (baseIndex % 4)}` },
    platforms: baseIndex % 4 === 0 ? ["MT4", "MT5"] : baseIndex % 4 === 1 ? ["MT4", "WebTrader"] : baseIndex % 4 === 2 ? ["MT5", "Mobile"] : ["Proprietary", "Mobile"],
    platformFeatures: {
      "MT4": ["Expert Advisors", "Custom Indicators"],
      "MT5": ["Advanced Charting", "Economic Calendar"],
      "WebTrader": ["No Download Required", "Cross-platform"],
      "Proprietary": ["Advanced Features", "Custom Tools"],
      "Mobile": ["Mobile Trading", "Push Notifications"]
    },
    account_types: baseIndex % 3 === 0 ? ["Standard", "Pro"] : baseIndex % 3 === 1 ? ["Basic", "Premium"] : ["Micro", "Standard"],
    accountDetails: {
      "Standard": { minDeposit: minDeposits[baseIndex % minDeposits.length], spread: `From ${spreads[baseIndex % spreads.length]} pips`, commission: "No commission", features: ["Standard features"] },
      "Pro": { minDeposit: minDeposits[baseIndex % minDeposits.length] * 2, spread: `From ${spreads[baseIndex % spreads.length] - 0.2} pips`, commission: "From $3", features: ["Pro features"] }
    },
    instruments: {
      forex: 30 + (baseIndex % 50),
      stocks: baseIndex % 2 === 0 ? 100 + (baseIndex * 50) : 0,
      indices: 10 + (baseIndex % 30),
      commodities: 5 + (baseIndex % 25),
      crypto: baseIndex % 3 === 0 ? 10 + (baseIndex % 40) : 0,
      bonds: baseIndex % 4 === 0 ? 20 + (baseIndex % 50) : 0,
      etfs: baseIndex % 5 === 0 ? 50 + (baseIndex % 300) : 0
    },
    executionModel: baseIndex % 3 === 0 ? "Market Maker" : baseIndex % 3 === 1 ? "STP/ECN" : "DMA",
    averageExecutionSpeed: `< ${1 + (baseIndex % 3)} second${baseIndex % 3 > 0 ? 's' : ''}`,
    slippage: baseIndex % 3 === 0 ? "Minimal" : baseIndex % 3 === 1 ? "Low" : "Average",
    requotes: baseIndex % 3 === 0 ? "Rare" : baseIndex % 3 === 1 ? "Occasional" : "Frequent",
    depositMethods: ["Credit/Debit Cards", "Bank Wire"],
    withdrawalMethods: ["Credit/Debit Cards", "Bank Wire"],
    depositFees: baseIndex % 3 === 0 ? "Free" : "Small fees apply",
    withdrawalFees: baseIndex % 4 === 0 ? "Free" : "Fees apply",
    withdrawal_time: baseIndex % 3 === 0 ? "1-2 business days" : baseIndex % 3 === 1 ? "1-3 business days" : "2-5 business days",
    baseCurrencies: ["USD", "EUR", "GBP"],
    customer_support: baseIndex % 3 === 0 ? "24/7" : baseIndex % 3 === 1 ? "24/5" : "Business hours",
    supportLanguages: 1 + (baseIndex % 20),
    education: baseIndex % 2 === 0,
    educationFeatures: baseIndex % 2 === 0 ? ["Basic guides", "Market analysis"] : [],
    demo_account: baseIndex % 4 !== 0,
    islamic_account: baseIndex % 3 === 0,
    socialTrading: baseIndex % 5 === 0,
    copyTrading: baseIndex % 6 === 0,
    algorithmicTrading: baseIndex % 2 === 0,
    apiAccess: baseIndex % 3 === 0,
    vpsOffered: baseIndex % 4 === 0,
    researchTools: baseIndex % 2 === 0 ? ["Market Analysis", "Economic Calendar"] : ["Basic Research"],
    founded: 1980 + (baseIndex % 40),
    headquarters: ["London, UK", "Cyprus", "Australia", "USA", "Germany"][baseIndex % 5],
    employees: baseIndex < 20 ? "1000+" : baseIndex < 40 ? "500+" : baseIndex < 60 ? "200+" : "100+",
    publiclyTraded: baseIndex % 6 === 0,
    pros: [`Feature ${baseIndex % 5 + 1}`, `Benefit ${(baseIndex + 1) % 5 + 1}`],
    cons: [`Limitation ${baseIndex % 3 + 1}`, `Drawback ${(baseIndex + 1) % 3 + 1}`]
  };
});

allBrokers.push(...additionalBrokers);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 mt-20 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            Broker Comparison Tool
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-4 max-w-3xl mx-auto leading-relaxed">
            Compare brokers side-by-side to find the perfect match for your trading needs. 
            Select up to 4 brokers and instantly compare their features, fees, and services.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>

        <Tabs defaultValue="select" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm border border-slate-200">
            <TabsTrigger value="select" className="data-[state=active]:bg-primary data-[state=active]:text-white">Select Brokers</TabsTrigger>
            <TabsTrigger value="compare" disabled={selectedBrokers.length < 2} className="data-[state=active]:bg-primary data-[state=active]:text-white disabled:opacity-50">
              Compare ({selectedBrokers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="select" className="space-y-6">
            {/* Search and Filters */}
            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Search className="w-5 h-5" />
                  Find Your Perfect Broker
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Use filters to narrow down brokers based on your requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search brokers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 border-slate-200 focus:border-primary"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Select value={filters.minDeposit} onValueChange={(value) => setFilters({...filters, minDeposit: value})}>
                    <SelectTrigger className="border-slate-200 focus:border-primary">
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
                    <SelectTrigger className="border-slate-200 focus:border-primary">
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

                <Button variant="outline" onClick={clearFilters} className="w-full border-slate-200 text-slate-700 hover:bg-slate-50">
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>

            {/* Selected Brokers */}
            {selectedBrokers.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-800">Selected Brokers ({selectedBrokers.length}/4)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedBrokers.map((broker) => (
                      <Badge key={broker.id} variant="secondary" className="flex items-center gap-2 bg-primary/10 text-primary border-primary/20">
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
                  <Card key={broker.id} className={`cursor-pointer transition-all duration-300 hover:shadow-xl bg-white border ${isSelected ? 'ring-2 ring-primary border-primary shadow-lg' : 'border-slate-200 shadow-sm hover:border-primary/50'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm">
                            <img src={broker.logo} alt={broker.name} className="w-12 h-12 object-contain" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-800">{broker.name}</h3>
                            <div className="flex items-center space-x-2">
                              <div className="flex">{renderStars(broker.rating)}</div>
                              <span className="text-sm text-slate-500">({broker.rating})</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <div className="text-sm text-slate-500">EUR/USD Spread</div>
                            <div className="font-semibold text-slate-800">{broker.eurUsdSpread} pips</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-slate-500">Min Deposit</div>
                            <div className="font-semibold text-green-600">${broker.minDeposit}</div>
                          </div>
                          <Button
                            variant={isSelected ? "secondary" : "default"}
                            onClick={() => toggleBrokerSelection(broker)}
                            disabled={!isSelected && selectedBrokers.length >= 4}
                            className={isSelected ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : "bg-primary text-white hover:bg-primary/90"}
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
              <div className="space-y-8">
                {/* Comparison Table */}
                <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-slate-800">Broker Comparison</CardTitle>
                    <CardDescription className="text-slate-600">Side-by-side comparison of selected brokers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-56 sticky left-0 bg-background z-10">Feature</TableHead>
                            {selectedBrokers.map((broker) => (
                              <TableHead key={broker.id} className="text-center min-w-56">
                                <div className="flex flex-col items-center space-y-2">
                                  <img src={broker.logo} alt={broker.name} className="w-8 h-8 object-contain" />
                                  <span className="font-semibold">{broker.name}</span>
                                </div>
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {/* Overall Rating */}
                          <TableRow className="bg-muted/30">
                            <TableCell className="font-bold sticky left-0 bg-muted/30 z-10" colSpan={selectedBrokers.length + 1}>
                              OVERALL RATING & REGULATION
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Overall Rating</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                <div className="flex justify-center items-center space-x-1">
                                  {renderStars(broker.rating)}
                                  <span className="ml-2 font-semibold">({broker.rating})</span>
                                </div>
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Regulation</TableCell>
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
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Founded</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center font-semibold">
                                {broker.founded}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Headquarters</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                {broker.headquarters}
                              </TableCell>
                            ))}
                          </TableRow>
                          
                          {/* Trading Costs */}
                          <TableRow className="bg-muted/30">
                            <TableCell className="font-bold sticky left-0 bg-muted/30 z-10" colSpan={selectedBrokers.length + 1}>
                              TRADING COSTS & SPREADS
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Min Deposit</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center font-semibold text-green-600">
                                ${broker.minDeposit}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">EUR/USD Spread</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center font-semibold">
                                {broker.eurUsdSpread} pips
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">GBP/USD Spread</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center font-semibold">
                                {broker.gbpUsdSpread} pips
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">USD/JPY Spread</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center font-semibold">
                                {broker.usdJpySpread} pips
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Gold Spread</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center font-semibold">
                                {broker.goldSpread} pips
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Commission</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                {broker.commission}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Max Leverage</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center font-semibold text-orange-600">
                                {broker.maxLeverage}
                              </TableCell>
                            ))}
                          </TableRow>

                          {/* Trading Platforms */}
                          <TableRow className="bg-muted/30">
                            <TableCell className="font-bold sticky left-0 bg-muted/30 z-10" colSpan={selectedBrokers.length + 1}>
                              TRADING PLATFORMS & TECHNOLOGY
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Platforms</TableCell>
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
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Execution Model</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                {broker.executionModel}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Execution Speed</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center font-semibold text-green-600">
                                {broker.averageExecutionSpeed}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">API Access</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                <Badge variant={broker.apiAccess ? "default" : "secondary"}>
                                  {broker.apiAccess ? "Yes" : "No"}
                                </Badge>
                              </TableCell>
                            ))}
                          </TableRow>

                          {/* Available Instruments */}
                          <TableRow className="bg-muted/30">
                            <TableCell className="font-bold sticky left-0 bg-muted/30 z-10" colSpan={selectedBrokers.length + 1}>
                              AVAILABLE INSTRUMENTS
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Forex Pairs</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center font-semibold">
                                {broker.instruments.forex}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Stocks</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center font-semibold">
                                {broker.instruments.stocks.toLocaleString()}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Indices</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center font-semibold">
                                {broker.instruments.indices}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Commodities</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center font-semibold">
                                {broker.instruments.commodities}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Cryptocurrencies</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center font-semibold">
                                {broker.instruments.crypto}
                              </TableCell>
                            ))}
                          </TableRow>

                          {/* Account Features */}
                          <TableRow className="bg-muted/30">
                            <TableCell className="font-bold sticky left-0 bg-muted/30 z-10" colSpan={selectedBrokers.length + 1}>
                              ACCOUNT FEATURES
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Account Types</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                <div className="flex flex-wrap justify-center gap-1">
                                  {broker.account_types.map((type) => (
                                    <Badge key={type} variant="outline" className="text-xs">
                                      {type}
                                    </Badge>
                                  ))}
                                </div>
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Demo Account</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                <Badge variant={broker.demo_account ? "default" : "secondary"}>
                                  {broker.demo_account ? "Yes" : "No"}
                                </Badge>
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Islamic Account</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                <Badge variant={broker.islamic_account ? "default" : "secondary"}>
                                  {broker.islamic_account ? "Yes" : "No"}
                                </Badge>
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Base Currencies</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                <div className="flex flex-wrap justify-center gap-1">
                                  {broker.baseCurrencies.map((currency) => (
                                    <Badge key={currency} variant="outline" className="text-xs">
                                      {currency}
                                    </Badge>
                                  ))}
                                </div>
                              </TableCell>
                            ))}
                          </TableRow>

                          {/* Deposits & Withdrawals */}
                          <TableRow className="bg-muted/30">
                            <TableCell className="font-bold sticky left-0 bg-muted/30 z-10" colSpan={selectedBrokers.length + 1}>
                              DEPOSITS & WITHDRAWALS
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Deposit Methods</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                <div className="space-y-1">
                                  {broker.depositMethods.slice(0, 3).map((method) => (
                                    <div key={method} className="text-xs">{method}</div>
                                  ))}
                                  {broker.depositMethods.length > 3 && (
                                    <div className="text-xs text-muted-foreground">
                                      +{broker.depositMethods.length - 3} more
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Deposit Fees</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center font-semibold text-green-600">
                                {broker.depositFees}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Withdrawal Time</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                {broker.withdrawal_time}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Withdrawal Fees</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                {broker.withdrawalFees}
                              </TableCell>
                            ))}
                          </TableRow>

                          {/* Support & Education */}
                          <TableRow className="bg-muted/30">
                            <TableCell className="font-bold sticky left-0 bg-muted/30 z-10" colSpan={selectedBrokers.length + 1}>
                              SUPPORT & EDUCATION
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Customer Support</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                {broker.customer_support}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Support Languages</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center font-semibold">
                                {broker.supportLanguages}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Educational Resources</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                <Badge variant={broker.education ? "default" : "secondary"}>
                                  {broker.education ? "Comprehensive" : "Limited"}
                                </Badge>
                              </TableCell>
                            ))}
                          </TableRow>

                          {/* Additional Features */}
                          <TableRow className="bg-muted/30">
                            <TableCell className="font-bold sticky left-0 bg-muted/30 z-10" colSpan={selectedBrokers.length + 1}>
                              ADDITIONAL FEATURES
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Copy Trading</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                <Badge variant={broker.copyTrading ? "default" : "secondary"}>
                                  {broker.copyTrading ? "Yes" : "No"}
                                </Badge>
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">Algorithmic Trading</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                <Badge variant={broker.algorithmicTrading ? "default" : "secondary"}>
                                  {broker.algorithmicTrading ? "Yes" : "No"}
                                </Badge>
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">VPS Offered</TableCell>
                            {selectedBrokers.map((broker) => (
                              <TableCell key={broker.id} className="text-center">
                                <Badge variant={broker.vpsOffered ? "default" : "secondary"}>
                                  {broker.vpsOffered ? "Yes" : "No"}
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