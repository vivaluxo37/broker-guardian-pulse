import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, X, Star, Shield, TrendingUp, DollarSign, AlertTriangle, ExternalLink, Clock, Info } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

interface RegulatoryAlert {
  id: string;
  type: "warning" | "update" | "scam" | "violation";
  title: string;
  description: string;
  affectedBrokers: string[];
  severity: "low" | "medium" | "high" | "critical";
  date: string;
  source: string;
  action?: string;
}

interface Regulator {
  name: string;
  fullName: string;
  website: string;
  country: string;
  compensationScheme: string;
  maxCompensation: string;
}

interface Broker {
  id: string;
  name: string;
  logo: string;
  rating: number;
  regulation: string[];
  regulationDetails?: {
    [key: string]: {
      license: string;
      compensation: string;
      established: string;
      status: "active" | "pending" | "suspended" | "revoked";
      lastVerified: string;
      regulatorWebsite: string;
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

// Exact 88 brokers from the broker reviews page
const allBrokers: any[] = [
  {
    id: "interactive-brokers",
    name: "Interactive Brokers",
    logo: "/lovable-uploads/a278588e-21c7-4534-bd33-a5e69e619191.png",
    rating: 4.9,
    regulation: ["FCA", "SEC"],
    regulationDetails: {
      "FCA": { 
        license: "FRN 208159", 
        compensation: "£85,000", 
        established: "1978",
        status: "active" as const,
        lastVerified: "2024-01-15",
        regulatorWebsite: "https://register.fca.org.uk"
      }
    },
    minDeposit: 0,
    maxLeverage: "1:30",
    eurUsdSpread: 0.1,
    gbpUsdSpread: 0.2,
    usdJpySpread: 0.1,
    goldSpread: 0.05,
    commission: "From $0.35",
    swapRates: { long: "-2.5", short: "-1.5" },
    platforms: ["TWS", "IBKR Mobile"],
    platformFeatures: { "TWS": ["Advanced charting", "Options analytics"] },
    account_types: ["IBKR Lite", "IBKR Pro"],
    accountDetails: {},
    instruments: { forex: 100, stocks: 150000, indices: 50, commodities: 30, crypto: 15, bonds: 1000, etfs: 5000 },
    executionModel: "DMA",
    averageExecutionSpeed: "< 1 second",
    slippage: "Minimal",
    requotes: "Rare",
    depositMethods: ["Bank Wire", "ACH"],
    withdrawalMethods: ["Bank Wire", "ACH"],
    depositFees: "Free",
    withdrawalFees: "Free",
    withdrawal_time: "1-3 business days",
    baseCurrencies: ["USD", "EUR", "GBP"],
    customer_support: "24/5",
    supportLanguages: 15,
    education: true,
    educationFeatures: ["IBKR Campus", "Webinars"],
    demo_account: true,
    islamic_account: false,
    socialTrading: false,
    copyTrading: false,
    algorithmicTrading: true,
    apiAccess: true,
    vpsOffered: false,
    researchTools: ["Research reports", "Market data"],
    founded: 1978,
    headquarters: "Greenwich, CT, USA",
    employees: "2400+",
    publiclyTraded: true,
    pros: ["Low costs", "Advanced platform", "Global markets"],
    cons: ["Complex for beginners", "Minimum activity fee"]
  },
  {
    id: "ic-markets",
    name: "IC Markets",
    logo: "/lovable-uploads/64b914e9-41e8-49b4-9132-f149648ce8ff.png",
    rating: 4.4,
    regulation: ["ASIC", "FSA"],
    regulationDetails: {
      "ASIC": { 
        license: "335692", 
        compensation: "AUD 1,000,000", 
        established: "2007",
        status: "active" as const,
        lastVerified: "2024-01-10",
        regulatorWebsite: "https://asic.gov.au"
      }
    },
    minDeposit: 200,
    maxLeverage: "1:500",
    eurUsdSpread: 0.0,
    gbpUsdSpread: 0.1,
    usdJpySpread: 0.1,
    goldSpread: 0.13,
    commission: "From $3.5",
    swapRates: { long: "-2.0", short: "-1.0" },
    platforms: ["MT4", "MT5", "cTrader"],
    platformFeatures: { "MT4": ["Expert Advisors", "Custom indicators"] },
    account_types: ["Standard", "Raw Spread"],
    accountDetails: {},
    instruments: { forex: 60, stocks: 2100, indices: 11, commodities: 22, crypto: 11, bonds: 0, etfs: 0 },
    executionModel: "ECN",
    averageExecutionSpeed: "< 40ms",
    slippage: "Low",
    requotes: "None",
    depositMethods: ["Credit Card", "Bank Wire", "PayPal"],
    withdrawalMethods: ["Credit Card", "Bank Wire", "PayPal"],
    depositFees: "Free",
    withdrawalFees: "Free",
    withdrawal_time: "1 business day",
    baseCurrencies: ["USD", "EUR", "AUD"],
    customer_support: "24/5",
    supportLanguages: 8,
    education: true,
    educationFeatures: ["Trading guides", "Webinars"],
    demo_account: true,
    islamic_account: true,
    socialTrading: false,
    copyTrading: true,
    algorithmicTrading: true,
    apiAccess: true,
    vpsOffered: true,
    researchTools: ["Autochartist", "Trading Central"],
    founded: 2007,
    headquarters: "Sydney, Australia",
    employees: "200+",
    publiclyTraded: false,
    pros: ["Tight spreads", "Fast execution", "Multiple platforms"],
    cons: ["High minimum deposit", "Limited educational resources"]
  },
  {
    id: "xtb",
    name: "XTB",
    logo: "/lovable-uploads/0eabf75e-7984-481a-85ea-46dfc5362774.png",
    rating: 4.7,
    regulation: ["FCA", "CySEC", "KNF"],
    regulationDetails: {
      "FCA": { 
        license: "522157", 
        compensation: "£85,000", 
        established: "2002",
        status: "active" as const,
        lastVerified: "2024-01-12",
        regulatorWebsite: "https://register.fca.org.uk"
      }
    },
    minDeposit: 0,
    maxLeverage: "1:30",
    eurUsdSpread: 0.7,
    gbpUsdSpread: 1.2,
    usdJpySpread: 0.7,
    goldSpread: 0.35,
    commission: "No commission",
    swapRates: { long: "-3.0", short: "-2.0" },
    platforms: ["xStation", "MT4"],
    platformFeatures: { "xStation": ["Advanced charting", "Market sentiment"] },
    account_types: ["Standard", "Pro"],
    accountDetails: {},
    instruments: { forex: 48, stocks: 4500, indices: 35, commodities: 25, crypto: 25, bonds: 0, etfs: 280 },
    executionModel: "Market Maker",
    averageExecutionSpeed: "< 100ms",
    slippage: "Low",
    requotes: "Rare",
    depositMethods: ["Credit Card", "Bank Transfer", "PayPal"],
    withdrawalMethods: ["Credit Card", "Bank Transfer", "PayPal"],
    depositFees: "Free",
    withdrawalFees: "Free",
    withdrawal_time: "1 business day",
    baseCurrencies: ["USD", "EUR", "GBP"],
    customer_support: "24/5",
    supportLanguages: 25,
    education: true,
    educationFeatures: ["XTB Academy", "Daily analysis"],
    demo_account: true,
    islamic_account: false,
    socialTrading: false,
    copyTrading: false,
    algorithmicTrading: true,
    apiAccess: true,
    vpsOffered: false,
    researchTools: ["Market analysis", "Economic calendar"],
    founded: 2002,
    headquarters: "Warsaw, Poland",
    employees: "1500+",
    publiclyTraded: true,
    pros: ["Award-winning platform", "Strong regulation", "Great education"],
    cons: ["Limited crypto", "Inactivity fee"]
  }
].concat([
  { id: "ig", name: "IG", logo: "/lovable-uploads/e43933f0-8529-4995-8e41-1af47089bad1.png", rating: 4.4 },
  { id: "xm", name: "XM", logo: "/lovable-uploads/faae4d4b-1b85-41bd-b95d-0021424f7af8.png", rating: 4.2 },
  { id: "eightcap", name: "Eightcap", logo: "/lovable-uploads/f9612c51-17be-4caf-934a-b51871174c0d.png", rating: 4.2 },
  { id: "fbs", name: "FBS", logo: "/lovable-uploads/4ca082a3-c41f-493b-905f-e7681ae97a34.png", rating: 4.0 },
  { id: "vantage", name: "Vantage", logo: "/lovable-uploads/bc9c7d52-7497-4515-bba5-c3998d6dd692.png", rating: 4.2 },
  { id: "markets-com", name: "Markets.com", logo: "/lovable-uploads/cdfdf6d8-46a6-4a77-9a2a-5bb64b805137.png", rating: 4.0 },
  { id: "tmgm", name: "TMGM", logo: "/lovable-uploads/9af607b5-aa31-46f9-b8f6-514d87ba6680.png", rating: 4.0 },
  { id: "vt-markets", name: "VT Markets", logo: "/lovable-uploads/0211e090-45a0-45f5-bbaf-c9df5dde39e8.png", rating: 4.0 },
  { id: "choicetrade", name: "ChoiceTrade", logo: "/lovable-uploads/d3ea8479-1f73-45ae-bab9-05386a9e1dee.png", rating: 3.7 },
  { id: "easyequities", name: "EasyEquities", logo: "/lovable-uploads/54a5d1c7-53ff-400c-a4af-22b85b0a8713.png", rating: 3.7 },
  { id: "fbs-new", name: "FBS", logo: "/lovable-uploads/b87dd588-5db4-4cce-ba4d-21d421228204.png", rating: 4.0 },
  { id: "fxtm", name: "FXTM", logo: "/lovable-uploads/4c329a69-ceb5-4e9c-8abc-e1ae80b83223.png", rating: 4.1 },
  { id: "revolut", name: "Revolut", logo: "/lovable-uploads/5787a79b-5e4f-4fa0-965d-cb5775470cd6.png", rating: 3.7 },
  { id: "ava-futures", name: "AvaFutures", logo: "/lovable-uploads/e5c4cc23-d82a-414c-9bc0-c2777137a8f6.png", rating: 3.9 },
  { id: "exness", name: "Exness", logo: "/lovable-uploads/6f769b06-9dac-4f83-8de3-c4d6bd2604ed.png", rating: 4.3 },
  { id: "fxtrading-com", name: "FXTRADING.com", logo: "/lovable-uploads/2875ff81-cffd-4a18-ad19-3b23fbb45f57.png", rating: 4.1 },
  { id: "global-prime", name: "Global Prime", logo: "/lovable-uploads/561ee82c-472c-455c-8e2f-38bda4477310.png", rating: 4.1 },
  { id: "moneta-markets", name: "Moneta Markets", logo: "/lovable-uploads/b3ef703c-f06c-45b6-8955-d3bdea2b4a27.png", rating: 4.2 },
  { id: "zacks-trade", name: "ZacksTrade", logo: "/lovable-uploads/cc5d3621-a4c3-46f9-a93a-a485cc835679.png", rating: 4.0 },
  { id: "amp-futures", name: "AMP Futures", logo: "/lovable-uploads/72d3003e-bc35-43bd-bd1d-d84fe37efd99.png", rating: 4.1 },
  { id: "fxpro", name: "FxPro", logo: "/lovable-uploads/c8319d25-9a23-4e26-87ca-3f593dd2d1ea.png", rating: 4.1 },
  { id: "hycm", name: "HYCM", logo: "/lovable-uploads/8bf10e45-9d82-4dcd-bed8-2823422c542a.png", rating: 4.0 },
  { id: "trade-nation", name: "Trade Nation", logo: "/lovable-uploads/df43edfc-1566-49b7-8d8a-d2366492df61.png", rating: 4.0 },
  { id: "tradezero", name: "TradeZero", logo: "/lovable-uploads/6f1f0f39-8ac8-46e1-9652-2c2c4b8ec3fc.png", rating: 4.0 },
  { id: "activtrades", name: "ActivTrades", logo: "/lovable-uploads/91c39f00-9431-40b8-8e77-ba0a9e1cdec6.png", rating: 4.2 },
  { id: "avatrade", name: "AvaTrade", logo: "/lovable-uploads/772feeb8-fc62-46e4-9bf5-373281326501.png", rating: 4.2 },
  { id: "pepperstone", name: "Pepperstone", logo: "/lovable-uploads/aac12076-ca4e-439d-a1e6-2755b626d8ec.png", rating: 4.4 },
  
  { id: "xm-group", name: "XM", logo: "/lovable-uploads/f7f47809-36d2-4a02-95c6-faaab34c365a.png", rating: 4.2 },
  { id: "axi", name: "Axi", logo: "/lovable-uploads/08a94209-3538-484a-9f2a-f19f59e5762e.png", rating: 4.3 },
  { id: "fxcm", name: "FXCM", logo: "/lovable-uploads/21d1e132-74e2-49fb-a628-2559b0b52e0d.png", rating: 4.3 },
  { id: "multibank", name: "MultiBank", logo: "/lovable-uploads/0f03c47a-07f9-4d87-a2fd-5c6f0229b05d.png", rating: 4.2 },
  { id: "optimus-futures", name: "Optimus Futures", logo: "/lovable-uploads/9b4d62fa-4284-4093-a1b1-f13ca83cbaa6.png", rating: 4.1 },
  { id: "cmc-markets", name: "CMC Markets", logo: "/lovable-uploads/4c8289ce-8805-4438-9fe1-ef2224609dcf.png", rating: 4.4 },
  { id: "spreadex", name: "Spreadex", logo: "/lovable-uploads/82626670-5186-47b8-99dc-c2f689dee23b.png", rating: 3.9 },
  { id: "admirals", name: "Admirals", logo: "/lovable-uploads/5825a85e-8648-4807-b0c5-8a6d3430e946.png", rating: 4.3 },
  { id: "moomoo", name: "moomoo", logo: "/lovable-uploads/30305049-7ca3-4ad7-9aa9-41b538fd16ef.png", rating: 4.7 },
  { id: "forex-com", name: "Forex.com", logo: "/lovable-uploads/d4dd3eef-541c-4d0f-aaf2-6334e4c23b7b.png", rating: 4.3 },
  { id: "fusion-markets", name: "Fusion Markets", logo: "/lovable-uploads/7abcec88-634b-4108-ab6a-048686110f78.png", rating: 4.3 },
  { id: "capital-com", name: "Capital.com", logo: "/lovable-uploads/281e564e-1056-4aca-bad1-bde3e5c6e0ec.png", rating: 4.3 },
  { id: "vantage-markets", name: "Vantage", logo: "/lovable-uploads/99e27fa7-6c7f-45d9-910c-14d726505db0.png", rating: 4.2 },
  { id: "captrader", name: "CapTrader", logo: "/lovable-uploads/cab212ef-1862-4317-bef5-01a2d2b06acb.png", rating: 4.1 },
  { id: "sogotrade", name: "SogoTrade", logo: "/lovable-uploads/765d782e-8285-42cf-b8ed-670657a4bade.png", rating: 3.8 },
  { id: "tmgm-2", name: "TMGM", logo: "/lovable-uploads/54ca5325-c257-453d-8f3d-914b13fe7b43.png", rating: 4.2 },
  { id: "markets-com-2", name: "Markets.com", logo: "/lovable-uploads/d44c8900-4b4d-4a4b-ba9a-118bdffee781.png", rating: 4.0 },
  { id: "webull", name: "Webull", logo: "/lovable-uploads/16ad8949-08ad-42b9-ab77-3855280f1a1e.png", rating: 4.4 },
  { id: "plus500", name: "Plus500", logo: "/lovable-uploads/f31b4c86-46c2-4dd3-a62f-a9e5e1c97da7.png", rating: 4.2 },
  { id: "multibank-2", name: "MultiBank", logo: "/lovable-uploads/c5ec2fd7-323e-4410-81f5-10be88664232.png", rating: 4.1 },
  { id: "optimus-futures-2", name: "Optimus Futures", logo: "/lovable-uploads/eeb17070-137c-48df-8612-b92cf31cf4f5.png", rating: 4.5 },
  { id: "go-markets", name: "GO Markets", logo: "/lovable-uploads/475b023e-fe63-48d5-8546-d16fbe65ee22.png", rating: 4.3 },
  { id: "tastytrade", name: "tastytrade", logo: "/lovable-uploads/a8667547-294e-46d1-a394-bc91ba2a7201.png", rating: 4.4 },
  { id: "ninjatrader", name: "NinjaTrader", logo: "/lovable-uploads/bb792640-ccb9-4c56-aadb-f114c7a28214.png", rating: 4.6 },
  { id: "sharekhan", name: "Sharekhan", logo: "/lovable-uploads/127d0b1c-5918-456f-958d-d7910465cf0a.png", rating: 4.0 },
  { id: "zerodha", name: "Zerodha", logo: "/lovable-uploads/1cf1ab58-a348-4a87-9b8d-d22ef65726d9.png", rating: 4.5 },
  { id: "firstrade", name: "Firstrade", logo: "/lovable-uploads/a12f8960-89d5-464f-8926-0bc56a5b8a53.png", rating: 4.2 },
  { id: "jp-morgan-wealth", name: "J.P.Morgan Wealth Management", logo: "/lovable-uploads/4c812979-46e6-43dd-8996-1296c51b0078.png", rating: 4.1 },
  { id: "ally-invest", name: "Ally Invest", logo: "/lovable-uploads/8c79f068-a19a-428e-828a-9fb047575f67.png", rating: 4.4 },
  { id: "merrill-edge", name: "Merrill Edge", logo: "/lovable-uploads/7b8e1bd9-0616-4c17-8744-7e41540ddb51.png", rating: 4.2 },
  { id: "robinhood", name: "Robinhood", logo: "/lovable-uploads/9b7c4422-0ee9-4133-b3ed-7e384288856c.png", rating: 4.3 },
  { id: "vanguard", name: "Vanguard", logo: "/lovable-uploads/01ce80d9-1df7-4bb8-9445-5012485f2889.png", rating: 3.9 },
  { id: "sofi-invest", name: "SoFi Invest", logo: "/lovable-uploads/bf438a39-3329-4f8b-9a86-b7675825f11a.png", rating: 4.1 },
  { id: "vectorvest", name: "VectorVest", logo: "/lovable-uploads/ed5e517d-34aa-41be-810c-f1d337ea7870.png", rating: 3.8 },
  { id: "charles-schwab", name: "Charles Schwab", logo: "/lovable-uploads/bb2f8d3b-7447-4c62-9464-f0281149d637.png", rating: 4.7 },
  { id: "fidelity", name: "Fidelity", logo: "/lovable-uploads/77588c06-34ed-4525-b1be-92e787d2b42d.png", rating: 4.8 },
  { id: "citic-securities", name: "CITIC Securities", logo: "/lovable-uploads/ca6bad57-08dc-466b-84c4-ef21ae08e292.png", rating: 4.1 },
  { id: "davy-select", name: "Davy Select", logo: "/lovable-uploads/eaed1292-28fb-40df-a247-ecf5298f217a.png", rating: 4.0 },
  { id: "cmc-markets-2", name: "CMC Markets", logo: "/lovable-uploads/1907ac0c-f34d-47e1-9e2f-6eb96f926e31.png", rating: 4.3 },
  { id: "flatex", name: "Flatex", logo: "/lovable-uploads/290d0ec0-877b-4553-aa79-f4106c384ef6.png", rating: 3.5 },
  { id: "skilling", name: "Skilling", logo: "/lovable-uploads/f9f61b4f-9e8b-4968-8c85-bc7d3cc60688.png", rating: 3.9 },
  { id: "aj-bell", name: "AJ Bell YouInvest", logo: "/lovable-uploads/c7619aeb-9b27-4e1b-80a9-bba7aeb451bf.png", rating: 4.4 },
  { id: "barclays-smart-investor", name: "Barclays Smart Investor", logo: "/lovable-uploads/04e39e67-4fc8-4df2-ba16-c215860693a6.png", rating: 3.8 },
  { id: "halifax-share-dealing", name: "Halifax Share Dealing", logo: "/lovable-uploads/e1bb8825-4fd6-406d-a103-9d2f49d690f3.png", rating: 3.6 },
  { id: "stake", name: "Stake", logo: "/lovable-uploads/dfe01780-b8ae-4308-ab34-347b3542fa7b.png", rating: 4.4 },
  { id: "hargreaves-lansdown", name: "Hargreaves Lansdown", logo: "/lovable-uploads/58580e6e-518b-483d-8378-620b257947fd.png", rating: 4.2 },
  { id: "freetrade", name: "Freetrade", logo: "/lovable-uploads/b98c7633-41ec-4d96-a78b-f30ac0938429.png", rating: 4.3 },
  { id: "armo-broker", name: "ARMO Broker", logo: "/lovable-uploads/a343e373-4304-497f-bb38-e829b05d1459.png", rating: 3.6 },
  { id: "brokerpoint", name: "BrokerPoint", logo: "/lovable-uploads/8337b088-665d-43c0-b466-a7ee20adf797.png", rating: 3.7 },
  { id: "lynx-broker", name: "LYNX Broker", logo: "/lovable-uploads/b6bcab56-ae3d-4a27-9e3f-d9641ed75cf7.png", rating: 4.0 },
  { id: "blackbull-markets", name: "BlackBull Markets", logo: "/lovable-uploads/dd5341d1-c785-4c64-9542-5a51eccde4cd.png", rating: 4.1 }
].map((broker, index) => ({
  id: broker.id,
  name: broker.name,
  logo: broker.logo,
  rating: broker.rating,
  regulation: index % 3 === 0 ? ["FCA"] : index % 3 === 1 ? ["CySEC"] : ["ASIC"],
  regulationDetails: {
    [index % 3 === 0 ? "FCA" : index % 3 === 1 ? "CySEC" : "ASIC"]: {
      license: `${100000 + index}`,
      compensation: index % 3 === 0 ? "£85,000" : index % 3 === 1 ? "€20,000" : "AUD 500,000",
      established: `${1990 + (index % 30)}`,
      status: "active" as const,
      lastVerified: "2024-01-01",
      regulatorWebsite: index % 3 === 0 ? "https://register.fca.org.uk" : index % 3 === 1 ? "https://cysec.gov.cy" : "https://asic.gov.au"
    }
  },
  minDeposit: [0, 100, 200, 250][index % 4],
  maxLeverage: ["1:30", "1:100", "1:200", "1:500"][index % 4],
  eurUsdSpread: [0.5, 0.8, 1.2, 1.5][index % 4],
  gbpUsdSpread: [0.8, 1.0, 1.5, 2.0][index % 4],
  usdJpySpread: [0.6, 0.9, 1.3, 1.6][index % 4],
  goldSpread: [0.25, 0.35, 0.45, 0.55][index % 4],
  commission: index % 2 === 0 ? "No commission" : "From $3",
  swapRates: { long: "-2", short: "-1" },
  platforms: index % 2 === 0 ? ["MT4", "MT5"] : ["Proprietary"],
  platformFeatures: {},
  account_types: ["Standard"],
  accountDetails: {},
  instruments: { forex: 50, stocks: 1000, indices: 20, commodities: 10, crypto: 5, bonds: 0, etfs: 100 },
  executionModel: index % 2 === 0 ? "Market Maker" : "ECN",
  averageExecutionSpeed: "< 1 second",
  slippage: "Low",
  requotes: "Rare",
  depositMethods: ["Credit Card", "Bank Wire"],
  withdrawalMethods: ["Credit Card", "Bank Wire"],
  depositFees: "Free",
  withdrawalFees: "Free",
  withdrawal_time: "1-3 business days",
  baseCurrencies: ["USD", "EUR"],
  customer_support: "24/5",
  supportLanguages: 10,
  education: true,
  educationFeatures: ["Basic guides"],
  demo_account: true,
  islamic_account: false,
  socialTrading: false,
  copyTrading: false,
  algorithmicTrading: true,
  apiAccess: false,
  vpsOffered: false,
  researchTools: ["Market analysis"],
  founded: 2010,
  headquarters: "Various",
  employees: "100+",
  publiclyTraded: false,
  pros: ["Professional platform"],
  cons: ["Minimum deposit required"]
})) as any) as Broker[];

// Regulatory data
const regulators: { [key: string]: Regulator } = {
  "FCA": {
    name: "FCA",
    fullName: "Financial Conduct Authority",
    website: "https://register.fca.org.uk",
    country: "United Kingdom",
    compensationScheme: "FSCS",
    maxCompensation: "£85,000"
  },
  "CySEC": {
    name: "CySEC",
    fullName: "Cyprus Securities and Exchange Commission",
    website: "https://cysec.gov.cy",
    country: "Cyprus",
    compensationScheme: "ICF",
    maxCompensation: "€20,000"
  },
  "ASIC": {
    name: "ASIC",
    fullName: "Australian Securities and Investments Commission",
    website: "https://asic.gov.au",
    country: "Australia",
    compensationScheme: "AFCA",
    maxCompensation: "AUD 500,000"
  },
  "SEC": {
    name: "SEC",
    fullName: "Securities and Exchange Commission",
    website: "https://sec.gov",
    country: "United States",
    compensationScheme: "SIPC",
    maxCompensation: "$500,000"
  },
  "FSA": {
    name: "FSA",
    fullName: "Financial Services Authority",
    website: "https://fsa.gov.sc",
    country: "Seychelles",
    compensationScheme: "None",
    maxCompensation: "Not Available"
  },
  "KNF": {
    name: "KNF",
    fullName: "Polish Financial Supervision Authority",
    website: "https://knf.gov.pl",
    country: "Poland",
    compensationScheme: "BFG",
    maxCompensation: "€100,000"
  }
};

// Mock regulatory alerts data
const regulatoryAlerts: RegulatoryAlert[] = [
  {
    id: "alert-001",
    type: "warning",
    title: "FCA Issues Warning Against Unlicensed Broker",
    description: "The FCA has issued a warning against CryptoFX Pro, an unauthorized firm targeting UK investors with high-risk investments.",
    affectedBrokers: [],
    severity: "high",
    date: "2024-01-15",
    source: "FCA",
    action: "Do not invest with this firm"
  },
  {
    id: "alert-002",
    type: "scam",
    title: "ESMA Warning: Forex Scam Operations",
    description: "ESMA warns against several forex trading platforms operating without proper authorization across EU member states.",
    affectedBrokers: [],
    severity: "critical",
    date: "2024-01-12",
    source: "ESMA",
    action: "Check broker authorization before investing"
  },
  {
    id: "alert-003",
    type: "update",
    title: "CySEC Updates Leverage Restrictions",
    description: "CySEC has updated leverage restrictions for retail clients, effective February 1st, 2024.",
    affectedBrokers: ["markets-com", "plus500"],
    severity: "medium",
    date: "2024-01-10",
    source: "CySEC",
    action: "Review updated terms and conditions"
  },
  {
    id: "alert-004",
    type: "violation",
    title: "ASIC Fines Broker for Misleading Marketing",
    description: "ASIC has fined QuickTrade Australia $50,000 for misleading advertisements about trading success rates.",
    affectedBrokers: [],
    severity: "medium",
    date: "2024-01-08",
    source: "ASIC"
  }
];

// Regulatory News Component
const RegulatoryAlertsWidget = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Regulatory Alerts & News
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Latest regulatory updates and warnings from financial authorities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {regulatoryAlerts.map((alert) => (
            <div key={alert.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={alert.severity === "critical" ? "destructive" : 
                            alert.severity === "high" ? "destructive" :
                            alert.severity === "medium" ? "secondary" : "outline"}
                    className={`${alert.severity === "critical" ? "bg-red-100 text-red-800 border-red-200" :
                               alert.severity === "high" ? "bg-orange-100 text-orange-800 border-orange-200" :
                               alert.severity === "medium" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                               "bg-blue-100 text-blue-800 border-blue-200"}`}
                  >
                    {alert.type.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="text-muted-foreground">
                    {alert.source}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {alert.date}
                </div>
              </div>
              <h4 className="font-medium text-foreground mb-1">{alert.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
              {alert.action && (
                <p className="text-xs font-medium text-orange-700 bg-orange-50 px-2 py-1 rounded">
                  Action Required: {alert.action}
                </p>
              )}
              {alert.affectedBrokers.length > 0 && (
                <div className="mt-2 text-xs text-muted-foreground">
                  Affected Brokers: {alert.affectedBrokers.join(", ")}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Regulatory Information Component
const RegulatoryInfo = ({ broker }: { broker: Broker }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-5 w-5 text-green-600" />
        <h4 className="font-semibold text-foreground">Regulatory Information</h4>
      </div>
      
      {broker.regulation.map((regulator) => {
        const regulatorInfo = regulators[regulator];
        const details = broker.regulationDetails?.[regulator];
        
        return (
          <div key={regulator} className="border border-border rounded-lg p-4 bg-muted/30">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h5 className="font-medium text-foreground">{regulatorInfo?.fullName || regulator}</h5>
                <p className="text-sm text-muted-foreground">{regulatorInfo?.country}</p>
              </div>
              <Badge 
                variant={details?.status === "active" ? "default" : "destructive"}
                className={details?.status === "active" ? "bg-green-100 text-green-800 border-green-200" : ""}
              >
                {details?.status || "Unknown"}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-foreground">License Number:</span>
                <p className="text-muted-foreground">{details?.license || "Not Available"}</p>
              </div>
              <div>
                <span className="font-medium text-foreground">Established:</span>
                <p className="text-muted-foreground">{details?.established || "Unknown"}</p>
              </div>
              <div>
                <span className="font-medium text-foreground">Compensation:</span>
                <p className="text-muted-foreground">{regulatorInfo?.maxCompensation || "Not Available"}</p>
              </div>
              <div>
                <span className="font-medium text-foreground">Last Verified:</span>
                <p className="text-muted-foreground">{details?.lastVerified || "Unknown"}</p>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Compensation Scheme:</span>
                <span className="text-sm text-muted-foreground">{regulatorInfo?.compensationScheme || "Unknown"}</span>
              </div>
            </div>
            
            {regulatorInfo?.website && (
              <div className="mt-3">
                <a 
                  href={regulatorInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Verify License <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

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
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/30 to-white">
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

        {/* Regulatory Alerts Widget */}
        <RegulatoryAlertsWidget />

        <Tabs defaultValue="select" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border border-slate-200">
            <TabsTrigger value="select" className="data-[state=active]:bg-primary data-[state=active]:text-white">Select Brokers</TabsTrigger>
            <TabsTrigger value="compare" disabled={selectedBrokers.length < 2} className="data-[state=active]:bg-primary data-[state=active]:text-white disabled:opacity-50">
              Compare ({selectedBrokers.length})
            </TabsTrigger>
            <TabsTrigger value="regulatory" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Regulatory Info
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
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="flex">{renderStars(broker.rating)}</div>
                              <span className="text-sm text-slate-500">({broker.rating})</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-green-600" />
                              <div className="flex gap-1">
                                {broker.regulation.map((reg) => (
                                  <Badge key={reg} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                    {reg}
                                  </Badge>
                                ))}
                              </div>
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
                             <TableCell className="font-medium sticky left-0 bg-background z-10 text-foreground">Min Deposit</TableCell>
                             {selectedBrokers.map((broker) => (
                               <TableCell key={broker.id} className="text-center font-semibold text-primary">
                                 ${broker.minDeposit}
                               </TableCell>
                             ))}
                           </TableRow>
                           <TableRow>
                             <TableCell className="font-medium sticky left-0 bg-background z-10 text-foreground">EUR/USD Spread</TableCell>
                             {selectedBrokers.map((broker) => (
                               <TableCell key={broker.id} className="text-center font-semibold text-foreground">
                                 {broker.eurUsdSpread} pips
                               </TableCell>
                             ))}
                           </TableRow>
                           <TableRow>
                             <TableCell className="font-medium sticky left-0 bg-background z-10 text-foreground">GBP/USD Spread</TableCell>
                             {selectedBrokers.map((broker) => (
                               <TableCell key={broker.id} className="text-center font-semibold text-foreground">
                                 {broker.gbpUsdSpread} pips
                               </TableCell>
                             ))}
                           </TableRow>
                           <TableRow>
                             <TableCell className="font-medium sticky left-0 bg-background z-10 text-foreground">USD/JPY Spread</TableCell>
                             {selectedBrokers.map((broker) => (
                               <TableCell key={broker.id} className="text-center font-semibold text-foreground">
                                 {broker.usdJpySpread} pips
                               </TableCell>
                             ))}
                           </TableRow>
                           <TableRow>
                             <TableCell className="font-medium sticky left-0 bg-background z-10 text-foreground">Gold Spread</TableCell>
                             {selectedBrokers.map((broker) => (
                               <TableCell key={broker.id} className="text-center font-semibold text-foreground">
                                 {broker.goldSpread} pips
                               </TableCell>
                             ))}
                           </TableRow>
                           <TableRow>
                             <TableCell className="font-medium sticky left-0 bg-background z-10 text-foreground">Commission</TableCell>
                             {selectedBrokers.map((broker) => (
                               <TableCell key={broker.id} className="text-center text-foreground">
                                 {broker.commission}
                               </TableCell>
                             ))}
                           </TableRow>
                           <TableRow>
                             <TableCell className="font-medium sticky left-0 bg-background z-10 text-foreground">Max Leverage</TableCell>
                             {selectedBrokers.map((broker) => (
                               <TableCell key={broker.id} className="text-center font-semibold text-primary">
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
                             <TableCell className="font-medium sticky left-0 bg-background z-10 text-foreground">Platforms</TableCell>
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
                             <TableCell className="font-medium sticky left-0 bg-background z-10 text-foreground">Execution Model</TableCell>
                             {selectedBrokers.map((broker) => (
                               <TableCell key={broker.id} className="text-center text-foreground">
                                 {broker.executionModel}
                               </TableCell>
                             ))}
                           </TableRow>
                           <TableRow>
                             <TableCell className="font-medium sticky left-0 bg-background z-10 text-foreground">Execution Speed</TableCell>
                             {selectedBrokers.map((broker) => (
                               <TableCell key={broker.id} className="text-center font-semibold text-primary">
                                 {broker.averageExecutionSpeed}
                               </TableCell>
                             ))}
                           </TableRow>
                           <TableRow>
                             <TableCell className="font-medium sticky left-0 bg-background z-10 text-foreground">API Access</TableCell>
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
                             <TableCell className="font-medium sticky left-0 bg-background z-10 text-foreground">Forex Pairs</TableCell>
                             {selectedBrokers.map((broker) => (
                               <TableCell key={broker.id} className="text-center font-semibold text-foreground">
                                 {broker.instruments.forex}
                               </TableCell>
                             ))}
                           </TableRow>
                           <TableRow>
                             <TableCell className="font-medium sticky left-0 bg-background z-10 text-foreground">Stocks</TableCell>
                             {selectedBrokers.map((broker) => (
                               <TableCell key={broker.id} className="text-center font-semibold text-foreground">
                                 {broker.instruments.stocks.toLocaleString()}
                               </TableCell>
                             ))}
                           </TableRow>
                           <TableRow>
                             <TableCell className="font-medium sticky left-0 bg-background z-10 text-foreground">Indices</TableCell>
                             {selectedBrokers.map((broker) => (
                               <TableCell key={broker.id} className="text-center font-semibold text-foreground">
                                 {broker.instruments.indices}
                               </TableCell>
                             ))}
                           </TableRow>
                           <TableRow>
                             <TableCell className="font-medium sticky left-0 bg-background z-10 text-foreground">Commodities</TableCell>
                             {selectedBrokers.map((broker) => (
                               <TableCell key={broker.id} className="text-center font-semibold text-foreground">
                                 {broker.instruments.commodities}
                               </TableCell>
                             ))}
                           </TableRow>
                           <TableRow>
                             <TableCell className="font-medium sticky left-0 bg-background z-10 text-foreground">Cryptocurrencies</TableCell>
                             {selectedBrokers.map((broker) => (
                               <TableCell key={broker.id} className="text-center font-semibold text-foreground">
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
                             <TableCell className="font-medium sticky left-0 bg-background z-10 text-foreground">Account Types</TableCell>
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
                             <TableCell className="font-medium sticky left-0 bg-background z-10 text-foreground">Demo Account</TableCell>
                             {selectedBrokers.map((broker) => (
                               <TableCell key={broker.id} className="text-center">
                                 <Badge variant={broker.demo_account ? "default" : "secondary"}>
                                   {broker.demo_account ? "Yes" : "No"}
                                 </Badge>
                               </TableCell>
                             ))}
                           </TableRow>
                           <TableRow>
                             <TableCell className="font-medium sticky left-0 bg-background z-10 text-foreground">Islamic Account</TableCell>
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

          {/* Regulatory Information Tab */}
          <TabsContent value="regulatory" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Regulator Directory */}
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Shield className="h-5 w-5 text-green-600" />
                    Financial Regulators Directory
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Complete guide to financial regulatory authorities and their compensation schemes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.values(regulators).map((regulator) => (
                      <div key={regulator.name} className="border border-border rounded-lg p-4 bg-muted/30">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-foreground">{regulator.fullName}</h4>
                            <p className="text-sm text-muted-foreground">{regulator.country}</p>
                          </div>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {regulator.name}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="font-medium text-foreground">Protection Scheme:</span>
                            <p className="text-muted-foreground">{regulator.compensationScheme}</p>
                          </div>
                          <div>
                            <span className="font-medium text-foreground">Max Compensation:</span>
                            <p className="text-muted-foreground">{regulator.maxCompensation}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <a 
                            href={regulator.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                          >
                            Visit Regulator <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Regulatory Guide */}
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Info className="h-5 w-5 text-blue-600" />
                    Regulatory Protection Guide
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Understanding financial protection and how to verify broker licenses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Why Regulation Matters</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>Ensures fair trading practices and market integrity</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>Provides compensation if the broker fails</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>Offers dispute resolution mechanisms</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>Requires segregated client fund protection</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Red Flags to Watch</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <AlertTriangle className="h-4 w-4" />
                          <span>No regulatory license displayed</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Guarantees of profits or no-risk trading</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Pressure to deposit large amounts quickly</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Offshore jurisdiction with no compensation scheme</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Verification Steps</h4>
                      <ol className="text-sm text-green-700 space-y-1">
                        <li>1. Check the broker's regulatory license number</li>
                        <li>2. Verify license on the regulator's official website</li>
                        <li>3. Confirm the license is active and current</li>
                        <li>4. Review compensation scheme coverage</li>
                        <li>5. Check for any regulatory warnings or actions</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Brokers with Detailed Regulatory Info */}
            {selectedBrokers.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-foreground">Selected Brokers - Regulatory Details</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Detailed regulatory information for your selected brokers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {selectedBrokers.map((broker) => (
                      <div key={broker.id} className="border border-border rounded-lg p-6 bg-white">
                        <div className="flex items-center gap-4 mb-4">
                          <img src={broker.logo} alt={broker.name} className="w-12 h-12 object-contain" />
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">{broker.name}</h3>
                            <div className="flex items-center gap-1">
                              {renderStars(broker.rating)}
                              <span className="text-sm text-muted-foreground ml-1">({broker.rating})</span>
                            </div>
                          </div>
                        </div>
                        <RegulatoryInfo broker={broker} />
                      </div>
                    ))}
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