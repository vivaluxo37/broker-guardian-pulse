import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, CheckCircle, XCircle, Smartphone, Trophy, FilterX } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Broker {
  id: string;
  name: string;
  logo: string;
  rating: number;
  isAwardWinner: boolean;
  peopleCount: number;
  feeLevel: "Low" | "Average" | "High";
  feeRating: number;
  inactivityFee: boolean;
  investorProtection: boolean;
  mobilePlatform: boolean;
  mobileRating?: number;
  riskDisclaimer?: string;
  recommended?: boolean;
}

const brokers: Broker[] = [
  {
    id: "interactive-brokers",
    name: "Interactive Brokers",
    logo: "/lovable-uploads/a278588e-21c7-4534-bd33-a5e69e619191.png",
    rating: 4.9,
    isAwardWinner: true,
    peopleCount: 250621,
    feeLevel: "Low",
    feeRating: 4.3,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.3,
    recommended: true
  },
  {
    id: "ic-markets",
    name: "IC Markets",
    logo: "/lovable-uploads/64b914e9-41e8-49b4-9132-f149648ce8ff.png",
    rating: 4.4,
    isAwardWinner: false,
    peopleCount: 31363,
    feeLevel: "Low",
    feeRating: 4.5,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.8,
    riskDisclaimer: "70.64% of retail CFD accounts lose money",
    recommended: true
  },
  {
    id: "xtb",
    name: "XTB",
    logo: "/lovable-uploads/0eabf75e-7984-481a-85ea-46dfc5362774.png",
    rating: 4.7,
    isAwardWinner: true,
    peopleCount: 56311,
    feeLevel: "Low",
    feeRating: 4.3,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.4,
    riskDisclaimer: "78% of retail CFD accounts lose money",
    recommended: true
  },
  {
    id: "ig",
    name: "IG",
    logo: "/lovable-uploads/e43933f0-8529-4995-8e41-1af47089bad1.png",
    rating: 4.4,
    isAwardWinner: false,
    peopleCount: 19037,
    feeLevel: "Low",
    feeRating: 3.6,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 5.0,
    riskDisclaimer: "70% of retail CFD accounts lose money"
  },
  {
    id: "xm",
    name: "XM",
    logo: "/lovable-uploads/faae4d4b-1b85-41bd-b95d-0021424f7af8.png",
    rating: 4.2,
    isAwardWinner: false,
    peopleCount: 6163,
    feeLevel: "Low",
    feeRating: 3.9,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.8,
    riskDisclaimer: "76.24% of retail CFD accounts lose money"
  },
  {
    id: "eightcap",
    name: "Eightcap",
    logo: "/lovable-uploads/f9612c51-17be-4caf-934a-b51871174c0d.png",
    rating: 4.2,
    isAwardWinner: false,
    peopleCount: 1599,
    feeLevel: "Low",
    feeRating: 4.1,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.8,
    riskDisclaimer: "59.57% of retail CFD accounts lose money"
  },
  {
    id: "fbs",
    name: "FBS",
    logo: "/lovable-uploads/4ca082a3-c41f-493b-905f-e7681ae97a34.png",
    rating: 4.0,
    isAwardWinner: false,
    peopleCount: 1689,
    feeLevel: "Low",
    feeRating: 3.9,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.3,
    riskDisclaimer: "71.99% of retail CFD accounts lose money"
  },
  {
    id: "vantage",
    name: "Vantage",
    logo: "/lovable-uploads/bc9c7d52-7497-4515-bba5-c3998d6dd692.png",
    rating: 4.2,
    isAwardWinner: false,
    peopleCount: 5616,
    feeLevel: "Low",
    feeRating: 3.8,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.3,
    riskDisclaimer: "74-89% of retail CFD accounts lose money"
  },
  {
    id: "markets-com",
    name: "Markets.com",
    logo: "/lovable-uploads/cdfdf6d8-46a6-4a77-9a2a-5bb64b805137.png",
    rating: 4.0,
    isAwardWinner: false,
    peopleCount: 1361,
    feeLevel: "Average",
    feeRating: 2.7,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.3,
    riskDisclaimer: "74.2% of retail CFD accounts lose money"
  },
  {
    id: "tmgm",
    name: "TMGM",
    logo: "/lovable-uploads/9af607b5-aa31-46f9-b8f6-514d87ba6680.png",
    rating: 4.0,
    isAwardWinner: false,
    peopleCount: 4415,
    feeLevel: "Low",
    feeRating: 3.9,
    inactivityFee: true,
    investorProtection: false,
    mobilePlatform: true,
    mobileRating: 3.8,
    riskDisclaimer: "80.26% of retail CFD accounts lose money"
  },
  {
    id: "vt-markets",
    name: "VT Markets",
    logo: "/lovable-uploads/0211e090-45a0-45f5-bbaf-c9df5dde39e8.png",
    rating: 4.0,
    isAwardWinner: false,
    peopleCount: 2384,
    feeLevel: "Low",
    feeRating: 3.9,
    inactivityFee: false,
    investorProtection: false,
    mobilePlatform: true,
    mobileRating: 4.1,
    riskDisclaimer: "74-89% of retail CFD accounts lose money"
  },
  {
    id: "choicetrade",
    name: "ChoiceTrade",
    logo: "/lovable-uploads/d3ea8479-1f73-45ae-bab9-05386a9e1dee.png",
    rating: 3.7,
    isAwardWinner: false,
    peopleCount: 2154,
    feeLevel: "Low",
    feeRating: 3.5,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.5
  },
  {
    id: "easyequities",
    name: "EasyEquities",
    logo: "/lovable-uploads/54a5d1c7-53ff-400c-a4af-22b85b0a8713.png",
    rating: 3.7,
    isAwardWinner: false,
    peopleCount: 12152,
    feeLevel: "Low",
    feeRating: 3.6,
    inactivityFee: false,
    investorProtection: false,
    mobilePlatform: true,
    mobileRating: 4.8
  },
  {
    id: "fbs-new",
    name: "FBS",
    logo: "/lovable-uploads/b87dd588-5db4-4cce-ba4d-21d421228204.png",
    rating: 4.0,
    isAwardWinner: false,
    peopleCount: 1689,
    feeLevel: "Low",
    feeRating: 3.9,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.3,
    riskDisclaimer: "71.99% of retail CFD accounts lose money"
  },
  {
    id: "fxtm",
    name: "FXTM",
    logo: "/lovable-uploads/4c329a69-ceb5-4e9c-8abc-e1ae80b83223.png",
    rating: 4.1,
    isAwardWinner: false,
    peopleCount: 5199,
    feeLevel: "Low",
    feeRating: 4.2,
    inactivityFee: false,
    investorProtection: false,
    mobilePlatform: true,
    mobileRating: 3.8,
    riskDisclaimer: "74-89% of retail CFD accounts lose money"
  },
  {
    id: "revolut",
    name: "Revolut",
    logo: "/lovable-uploads/5787a79b-5e4f-4fa0-965d-cb5775470cd6.png",
    rating: 3.7,
    isAwardWinner: false,
    peopleCount: 4580,
    feeLevel: "Average",
    feeRating: 3.1,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.4
  },
  {
    id: "ava-futures",
    name: "AvaFutures",
    logo: "/lovable-uploads/e5c4cc23-d82a-414c-9bc0-c2777137a8f6.png",
    rating: 3.9,
    isAwardWinner: false,
    peopleCount: 462,
    feeLevel: "Low",
    feeRating: 3.7,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.9
  },
  {
    id: "exness",
    name: "Exness",
    logo: "/lovable-uploads/6f769b06-9dac-4f83-8de3-c4d6bd2604ed.png",
    rating: 4.3,
    isAwardWinner: false,
    peopleCount: 8500,
    feeLevel: "Low",
    feeRating: 4.2,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.5,
    riskDisclaimer: "Trading is risky"
  },
  {
    id: "fxtrading-com",
    name: "FXTRADING.com",
    logo: "/lovable-uploads/2875ff81-cffd-4a18-ad19-3b23fbb45f57.png",
    rating: 4.1,
    isAwardWinner: false,
    peopleCount: 5199,
    feeLevel: "Low",
    feeRating: 4.2,
    inactivityFee: false,
    investorProtection: false,
    mobilePlatform: true,
    mobileRating: 3.8,
    riskDisclaimer: "74-89% of retail CFD accounts lose money"
  },
  {
    id: "global-prime",
    name: "Global Prime",
    logo: "/lovable-uploads/561ee82c-472c-455c-8e2f-38bda4477310.png",
    rating: 4.1,
    isAwardWinner: false,
    peopleCount: 10017,
    feeLevel: "Low",
    feeRating: 4.1,
    inactivityFee: false,
    investorProtection: false,
    mobilePlatform: true,
    mobileRating: 3.8,
    riskDisclaimer: "74-89% of retail CFD accounts lose money"
  },
  {
    id: "moneta-markets",
    name: "Moneta Markets",
    logo: "/lovable-uploads/b3ef703c-f06c-45b6-8955-d3bdea2b4a27.png",
    rating: 4.2,
    isAwardWinner: false,
    peopleCount: 3200,
    feeLevel: "Low",
    feeRating: 4.0,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.1,
    riskDisclaimer: "Trading involves substantial risk"
  },
  {
    id: "zacks-trade",
    name: "ZacksTrade",
    logo: "/lovable-uploads/cc5d3621-a4c3-46f9-a93a-a485cc835679.png",
    rating: 4.0,
    isAwardWinner: false,
    peopleCount: 6117,
    feeLevel: "Low",
    feeRating: 4.0,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.5
  },
  {
    id: "amp-futures",
    name: "AMP Futures",
    logo: "/lovable-uploads/72d3003e-bc35-43bd-bd1d-d84fe37efd99.png",
    rating: 4.1,
    isAwardWinner: false,
    peopleCount: 5035,
    feeLevel: "Low",
    feeRating: 4.7,
    inactivityFee: false,
    investorProtection: false,
    mobilePlatform: false
  },
  {
    id: "fxpro",
    name: "FxPro",
    logo: "/lovable-uploads/c8319d25-9a23-4e26-87ca-3f593dd2d1ea.png",
    rating: 4.1,
    isAwardWinner: false,
    peopleCount: 3091,
    feeLevel: "Low",
    feeRating: 3.7,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.3,
    riskDisclaimer: "77% of retail CFD accounts lose money"
  },
  {
    id: "hycm",
    name: "HYCM",
    logo: "/lovable-uploads/8bf10e45-9d82-4dcd-bed8-2823422c542a.png",
    rating: 4.0,
    isAwardWinner: false,
    peopleCount: 2800,
    feeLevel: "Low",
    feeRating: 3.8,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.2,
    riskDisclaimer: "70% of retail investor accounts lose money"
  },
  {
    id: "trade-nation",
    name: "Trade Nation",
    logo: "/lovable-uploads/df43edfc-1566-49b7-8d8a-d2366492df61.png",
    rating: 4.0,
    isAwardWinner: false,
    peopleCount: 1880,
    feeLevel: "Low",
    feeRating: 3.8,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.3,
    riskDisclaimer: "86% of retail CFD accounts lose money"
  },
  {
    id: "tradezero",
    name: "TradeZero",
    logo: "/lovable-uploads/6f1f0f39-8ac8-46e1-9652-2c2c4b8ec3fc.png",
    rating: 4.0,
    isAwardWinner: false,
    peopleCount: 6117,
    feeLevel: "Low",
    feeRating: 4.0,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.5
  },
  {
    id: "activtrades",
    name: "ActivTrades",
    logo: "/lovable-uploads/91c39f00-9431-40b8-8e77-ba0a9e1cdec6.png",
    rating: 4.2,
    isAwardWinner: false,
    peopleCount: 1611,
    feeLevel: "Low",
    feeRating: 3.8,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.9,
    riskDisclaimer: "74% of retail CFD accounts lose money"
  },
  {
    id: "avatrade",
    name: "AvaTrade",
    logo: "/lovable-uploads/772feeb8-fc62-46e4-9bf5-373281326501.png",
    rating: 4.2,
    isAwardWinner: false,
    peopleCount: 4762,
    feeLevel: "Low",
    feeRating: 3.7,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.4,
    riskDisclaimer: "63% of retail CFD accounts lose money"
  },
  {
    id: "pepperstone",
    name: "Pepperstone",
    logo: "/lovable-uploads/aac12076-ca4e-439d-a1e6-2755b626d8ec.png",
    rating: 4.4,
    isAwardWinner: false,
    peopleCount: 10497,
    feeLevel: "Low",
    feeRating: 4.3,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.8,
    riskDisclaimer: "75.9% of retail CFD accounts lose money"
  },
  {
    id: "questrade",
    name: "Questrade",
    logo: "/lovable-uploads/834dabc4-fc46-49e2-86f7-67369c91b5c2.png",
    rating: 4.3,
    isAwardWinner: false,
    peopleCount: 3500,
    feeLevel: "Low",
    feeRating: 4.1,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.2
  },
  {
    id: "xm-group",
    name: "XM",
    logo: "/lovable-uploads/f7f47809-36d2-4a02-95c6-faaab34c365a.png",
    rating: 4.2,
    isAwardWinner: false,
    peopleCount: 6163,
    feeLevel: "Low",
    feeRating: 3.9,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.8,
    riskDisclaimer: "76.24% of retail CFD accounts lose money"
  },
  {
    id: "axi",
    name: "Axi",
    logo: "/lovable-uploads/08a94209-3538-484a-9f2a-f19f59e5762e.png",
    rating: 4.3,
    isAwardWinner: false,
    peopleCount: 5224,
    feeLevel: "Low",
    feeRating: 4.1,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.8,
    riskDisclaimer: "71.4% of retail CFD accounts lose money"
  },
  {
    id: "fxcm",
    name: "FXCM",
    logo: "/lovable-uploads/21d1e132-74e2-49fb-a628-2559b0b52e0d.png",
    rating: 4.3,
    isAwardWinner: false,
    peopleCount: 2408,
    feeLevel: "Low",
    feeRating: 4.0,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.5,
    riskDisclaimer: "63% of retail CFD accounts lose money"
  },
  {
    id: "multibank",
    name: "MultiBank",
    logo: "/lovable-uploads/0f03c47a-07f9-4d87-a2fd-5c6f0229b05d.png",
    rating: 4.2,
    isAwardWinner: false,
    peopleCount: 8557,
    feeLevel: "Low",
    feeRating: 3.8,
    inactivityFee: true,
    investorProtection: false,
    mobilePlatform: true,
    mobileRating: 4.3,
    riskDisclaimer: "74-89% of retail CFD accounts lose money"
  },
  {
    id: "optimus-futures",
    name: "Optimus Futures",
    logo: "/lovable-uploads/9b4d62fa-4284-4093-a1b1-f13ca83cbaa6.png",
    rating: 4.1,
    isAwardWinner: false,
    peopleCount: 8933,
    feeLevel: "Low",
    feeRating: 4.7,
    inactivityFee: false,
    investorProtection: false,
    mobilePlatform: false
  },
  {
    id: "cmc-markets",
    name: "CMC Markets",
    logo: "/lovable-uploads/4c8289ce-8805-4438-9fe1-ef2224609dcf.png",
    rating: 4.4,
    isAwardWinner: false,
    peopleCount: 9315,
    feeLevel: "Low",
    feeRating: 3.6,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 5.0,
    riskDisclaimer: "73% of retail CFD accounts lose money"
  },
  {
    id: "spreadex",
    name: "Spreadex",
    logo: "/lovable-uploads/82626670-5186-47b8-99dc-c2f689dee23b.png",
    rating: 3.9,
    isAwardWinner: false,
    peopleCount: 1200,
    feeLevel: "Average",
    feeRating: 3.2,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.8
  },
  {
    id: "admirals",
    name: "Admirals",
    logo: "/lovable-uploads/5825a85e-8648-4807-b0c5-8a6d3430e946.png",
    rating: 4.3,
    isAwardWinner: false,
    peopleCount: 4200,
    feeLevel: "Low",
    feeRating: 3.9,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.2,
    riskDisclaimer: "73% of retail CFD accounts lose money"
  },
  {
    id: "moomoo",
    name: "moomoo",
    logo: "/lovable-uploads/30305049-7ca3-4ad7-9aa9-41b538fd16ef.png",
    rating: 4.7,
    isAwardWinner: true,
    peopleCount: 8500,
    feeLevel: "Low",
    feeRating: 4.5,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.8
  },
  {
    id: "forex-com",
    name: "Forex.com",
    logo: "/lovable-uploads/d4dd3eef-541c-4d0f-aaf2-6334e4c23b7b.png",
    rating: 4.3,
    isAwardWinner: false,
    peopleCount: 9127,
    feeLevel: "Average",
    feeRating: 3.3,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.5,
    riskDisclaimer: "75%-76% of retail CFD accounts lose money"
  },
  {
    id: "fusion-markets",
    name: "Fusion Markets",
    logo: "/lovable-uploads/7abcec88-634b-4108-ab6a-048686110f78.png",
    rating: 4.3,
    isAwardWinner: true,
    peopleCount: 43206,
    feeLevel: "Low",
    feeRating: 4.5,
    inactivityFee: false,
    investorProtection: false,
    mobilePlatform: true,
    mobileRating: 3.8,
    riskDisclaimer: "74-89% of retail CFD accounts lose money"
  },
  {
    id: "capital-com",
    name: "Capital.com",
    logo: "/lovable-uploads/281e564e-1056-4aca-bad1-bde3e5c6e0ec.png",
    rating: 4.3,
    isAwardWinner: false,
    peopleCount: 9348,
    feeLevel: "Low",
    feeRating: 3.9,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.9,
    riskDisclaimer: "67% of retail CFD accounts lose money"
  },
  {
    id: "vantage-markets",
    name: "Vantage",
    logo: "/lovable-uploads/99e27fa7-6c7f-45d9-910c-14d726505db0.png",
    rating: 4.2,
    isAwardWinner: false,
    peopleCount: 5616,
    feeLevel: "Low",
    feeRating: 3.8,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.3,
    riskDisclaimer: "74-89% of retail CFD accounts lose money"
  },
  {
    id: "captrader",
    name: "CapTrader",
    logo: "/lovable-uploads/cab212ef-1862-4317-bef5-01a2d2b06acb.png",
    rating: 4.1,
    isAwardWinner: false,
    peopleCount: 2850,
    feeLevel: "Low",
    feeRating: 4.2,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.0
  },
  {
    id: "sogotrade",
    name: "SogoTrade",
    logo: "/lovable-uploads/765d782e-8285-42cf-b8ed-670657a4bade.png",
    rating: 3.8,
    isAwardWinner: false,
    peopleCount: 1420,
    feeLevel: "Low",
    feeRating: 4.3,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.5
  },
  {
    id: "tmgm",
    name: "TMGM",
    logo: "/lovable-uploads/54ca5325-c257-453d-8f3d-914b13fe7b43.png",
    rating: 4.2,
    isAwardWinner: false,
    peopleCount: 8760,
    feeLevel: "Low",
    feeRating: 4.1,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.3,
    riskDisclaimer: "75% of retail CFD accounts lose money"
  },
  {
    id: "markets-com",
    name: "Markets.com",
    logo: "/lovable-uploads/d44c8900-4b4d-4a4b-ba9a-118bdffee781.png",
    rating: 4.0,
    isAwardWinner: false,
    peopleCount: 7890,
    feeLevel: "Average",
    feeRating: 3.4,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.1,
    riskDisclaimer: "73-89% of retail CFD accounts lose money"
  },
  {
    id: "webull",
    name: "Webull",
    logo: "/lovable-uploads/16ad8949-08ad-42b9-ab77-3855280f1a1e.png",
    rating: 4.4,
    isAwardWinner: false,
    peopleCount: 12450,
    feeLevel: "Low",
    feeRating: 4.6,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.7
  },
  {
    id: "plus500",
    name: "Plus500",
    logo: "/lovable-uploads/f31b4c86-46c2-4dd3-a62f-a9e5e1c97da7.png",
    rating: 4.2,
    isAwardWinner: true,
    peopleCount: 18760,
    feeLevel: "Low",
    feeRating: 3.8,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.5,
    riskDisclaimer: "82% of retail CFD accounts lose money"
  },
  {
    id: "multibank",
    name: "MultiBank",
    logo: "/lovable-uploads/c5ec2fd7-323e-4410-81f5-10be88664232.png",
    rating: 4.1,
    isAwardWinner: true,
    peopleCount: 8900,
    feeLevel: "Low",
    feeRating: 4.0,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.2,
    riskDisclaimer: "76% of retail CFD accounts lose money"
  },
  {
    id: "optimus-futures",
    name: "Optimus Futures",
    logo: "/lovable-uploads/eeb17070-137c-48df-8612-b92cf31cf4f5.png",
    rating: 4.5,
    isAwardWinner: false,
    peopleCount: 3200,
    feeLevel: "Low",
    feeRating: 4.4,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.1
  },
  {
    id: "go-markets",
    name: "GO Markets",
    logo: "/lovable-uploads/475b023e-fe63-48d5-8546-d16fbe65ee22.png",
    rating: 4.3,
    isAwardWinner: true,
    peopleCount: 4580,
    feeLevel: "Low",
    feeRating: 4.2,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.1,
    riskDisclaimer: "75-89% of retail CFD accounts lose money"
  },
  {
    id: "tastytrade",
    name: "tastytrade",
    logo: "/lovable-uploads/a8667547-294e-46d1-a394-bc91ba2a7201.png",
    rating: 4.4,
    isAwardWinner: false,
    peopleCount: 6720,
    feeLevel: "Low",
    feeRating: 4.5,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.3
  },
  {
    id: "ninjatrader",
    name: "NinjaTrader",
    logo: "/lovable-uploads/bb792640-ccb9-4c56-aadb-f114c7a28214.png",
    rating: 4.6,
    isAwardWinner: true,
    peopleCount: 5200,
    feeLevel: "Low",
    feeRating: 4.7,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.4
  },
  {
    id: "sharekhan",
    name: "Sharekhan",
    logo: "/lovable-uploads/127d0b1c-5918-456f-958d-d7910465cf0a.png",
    rating: 4.0,
    isAwardWinner: false,
    peopleCount: 14200,
    feeLevel: "Average",
    feeRating: 3.5,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.9
  },
  {
    id: "zerodha",
    name: "Zerodha",
    logo: "/lovable-uploads/1cf1ab58-a348-4a87-9b8d-d22ef65726d9.png",
    rating: 4.5,
    isAwardWinner: true,
    peopleCount: 78889,
    feeLevel: "Low",
    feeRating: 4.8,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.6
  },
  {
    id: "firstrade",
    name: "Firstrade",
    logo: "/lovable-uploads/a12f8960-89d5-464f-8926-0bc56a5b8a53.png",
    rating: 4.2,
    isAwardWinner: false,
    peopleCount: 3850,
    feeLevel: "Low",
    feeRating: 4.4,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.0
  },
  {
    id: "jp-morgan-wealth",
    name: "J.P.Morgan Wealth Management",
    logo: "/lovable-uploads/4c812979-46e6-43dd-8996-1296c51b0078.png",
    rating: 4.1,
    isAwardWinner: false,
    peopleCount: 2400,
    feeLevel: "High",
    feeRating: 2.8,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.9
  },
  {
    id: "ally-invest",
    name: "Ally Invest",
    logo: "/lovable-uploads/8c79f068-a19a-428e-828a-9fb047575f67.png",
    rating: 4.4,
    isAwardWinner: false,
    peopleCount: 8500,
    feeLevel: "Low",
    feeRating: 4.3,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.2
  },
  {
    id: "merrill-edge",
    name: "Merrill Edge",
    logo: "/lovable-uploads/7b8e1bd9-0616-4c17-8744-7e41540ddb51.png",
    rating: 4.2,
    isAwardWinner: false,
    peopleCount: 12750,
    feeLevel: "Low",
    feeRating: 4.1,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.0
  },
  {
    id: "robinhood",
    name: "Robinhood",
    logo: "/lovable-uploads/9b7c4422-0ee9-4133-b3ed-7e384288856c.png",
    rating: 4.3,
    isAwardWinner: false,
    peopleCount: 23000,
    feeLevel: "Low",
    feeRating: 4.7,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.6
  },
  {
    id: "vanguard",
    name: "Vanguard",
    logo: "/lovable-uploads/01ce80d9-1df7-4bb8-9445-5012485f2889.png",
    rating: 3.9,
    isAwardWinner: true,
    peopleCount: 30000,
    feeLevel: "Low",
    feeRating: 4.5,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.7
  },
  {
    id: "sofi-invest",
    name: "SoFi Invest",
    logo: "/lovable-uploads/bf438a39-3329-4f8b-9a86-b7675825f11a.png",
    rating: 4.1,
    isAwardWinner: false,
    peopleCount: 4200,
    feeLevel: "Low",
    feeRating: 4.4,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.3
  },
  {
    id: "vectorvest",
    name: "VectorVest",
    logo: "/lovable-uploads/ed5e517d-34aa-41be-810c-f1d337ea7870.png",
    rating: 3.8,
    isAwardWinner: false,
    peopleCount: 1250,
    feeLevel: "High",
    feeRating: 2.5,
    inactivityFee: true,
    investorProtection: false,
    mobilePlatform: true,
    mobileRating: 3.6
  },
  {
    id: "charles-schwab",
    name: "Charles Schwab",
    logo: "/lovable-uploads/bb2f8d3b-7447-4c62-9464-f0281149d637.png",
    rating: 4.7,
    isAwardWinner: true,
    peopleCount: 32500,
    feeLevel: "Low",
    feeRating: 4.6,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.5
  },
  {
    id: "fidelity",
    name: "Fidelity",
    logo: "/lovable-uploads/77588c06-34ed-4525-b1be-92e787d2b42d.png",
    rating: 4.8,
    isAwardWinner: true,
    peopleCount: 40000,
    feeLevel: "Low",
    feeRating: 4.7,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.6
  },
  {
    id: "citic-securities",
    name: "CITIC Securities",
    logo: "/lovable-uploads/ca6bad57-08dc-466b-84c4-ef21ae08e292.png",
    rating: 4.1,
    isAwardWinner: false,
    peopleCount: 15000,
    feeLevel: "Average",
    feeRating: 3.8,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.0
  },
  {
    id: "davy-select",
    name: "Davy Select",
    logo: "/lovable-uploads/eaed1292-28fb-40df-a247-ecf5298f217a.png",
    rating: 4.0,
    isAwardWinner: false,
    peopleCount: 2800,
    feeLevel: "Average",
    feeRating: 3.6,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.1
  },
  {
    id: "cmc-markets",
    name: "CMC Markets",
    logo: "/lovable-uploads/1907ac0c-f34d-47e1-9e2f-6eb96f926e31.png",
    rating: 4.3,
    isAwardWinner: true,
    peopleCount: 8500,
    feeLevel: "Average",
    feeRating: 3.9,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.4
  },
  {
    id: "flatex",
    name: "Flatex",
    logo: "/lovable-uploads/290d0ec0-877b-4553-aa79-f4106c384ef6.png",
    rating: 3.5,
    isAwardWinner: false,
    peopleCount: 6200,
    feeLevel: "Low",
    feeRating: 4.2,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.4
  },
  {
    id: "skilling",
    name: "Skilling",
    logo: "/lovable-uploads/f9f61b4f-9e8b-4968-8c85-bc7d3cc60688.png",
    rating: 3.9,
    isAwardWinner: false,
    peopleCount: 3100,
    feeLevel: "Average",
    feeRating: 3.7,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.2
  },
  {
    id: "aj-bell",
    name: "AJ Bell YouInvest",
    logo: "/lovable-uploads/c7619aeb-9b27-4e1b-80a9-bba7aeb451bf.png",
    rating: 4.4,
    isAwardWinner: true,
    peopleCount: 7500,
    feeLevel: "Low",
    feeRating: 4.3,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.1
  },
  {
    id: "barclays-smart-investor",
    name: "Barclays Smart Investor",
    logo: "/lovable-uploads/04e39e67-4fc8-4df2-ba16-c215860693a6.png",
    rating: 3.8,
    isAwardWinner: false,
    peopleCount: 12000,
    feeLevel: "Average",
    feeRating: 3.5,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.9
  },
  {
    id: "halifax-share-dealing",
    name: "Halifax Share Dealing",
    logo: "/lovable-uploads/e1bb8825-4fd6-406d-a103-9d2f49d690f3.png",
    rating: 3.6,
    isAwardWinner: false,
    peopleCount: 8900,
    feeLevel: "Average",
    feeRating: 3.4,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.7
  },
  {
    id: "stake",
    name: "Stake",
    logo: "/lovable-uploads/dfe01780-b8ae-4308-ab34-347b3542fa7b.png",
    rating: 4.4,
    isAwardWinner: true,
    peopleCount: 5200,
    feeLevel: "Low",
    feeRating: 4.6,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.5
  },
  {
    id: "hargreaves-lansdown",
    name: "Hargreaves Lansdown",
    logo: "/lovable-uploads/58580e6e-518b-483d-8378-620b257947fd.png",
    rating: 4.2,
    isAwardWinner: true,
    peopleCount: 18500,
    feeLevel: "High",
    feeRating: 2.8,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.0
  },
  {
    id: "freetrade",
    name: "Freetrade",
    logo: "/lovable-uploads/b98c7633-41ec-4d96-a78b-f30ac0938429.png",
    rating: 4.3,
    isAwardWinner: true,
    peopleCount: 6800,
    feeLevel: "Low",
    feeRating: 4.7,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.4
  },
  {
    id: "armo-broker",
    name: "ARMO Broker",
    logo: "/lovable-uploads/a343e373-4304-497f-bb38-e829b05d1459.png",
    rating: 3.6,
    isAwardWinner: false,
    peopleCount: 1800,
    feeLevel: "Average",
    feeRating: 3.4,
    inactivityFee: true,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.5
  },
  {
    id: "brokerpoint",
    name: "BrokerPoint",
    logo: "/lovable-uploads/8337b088-665d-43c0-b466-a7ee20adf797.png",
    rating: 3.7,
    isAwardWinner: false,
    peopleCount: 2200,
    feeLevel: "Average",
    feeRating: 3.6,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.8
  },
  {
    id: "lynx-broker",
    name: "LYNX Broker",
    logo: "/lovable-uploads/b6bcab56-ae3d-4a27-9e3f-d9641ed75cf7.png",
    rating: 4.0,
    isAwardWinner: false,
    peopleCount: 4500,
    feeLevel: "Low",
    feeRating: 4.1,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 3.9
  },
  {
    id: "blackbull-markets",
    name: "BlackBull Markets",
    logo: "/lovable-uploads/dd5341d1-c785-4c64-9542-5a51eccde4cd.png",
    rating: 4.1,
    isAwardWinner: false,
    peopleCount: 3800,
    feeLevel: "Low",
    feeRating: 4.3,
    inactivityFee: false,
    investorProtection: true,
    mobilePlatform: true,
    mobileRating: 4.2
  }
];

const assetTypes = [
  "Stock, ETF", "Forex", "Fund", "Bond", "Options", "Futures", "Crypto", "CFD"
];

const BrokerReviews = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [selectedFeeLevel, setSelectedFeeLevel] = useState<string>("");
  const [minRating, setMinRating] = useState<number>(0);
  const [hasInvestorProtection, setHasInvestorProtection] = useState<boolean | null>(null);
  const [hasMobilePlatform, setHasMobilePlatform] = useState<boolean | null>(null);
  const [isAwardWinner, setIsAwardWinner] = useState<boolean | null>(null);

  const toggleAssetFilter = (asset: string) => {
    setSelectedAssets(prev => 
      prev.includes(asset) 
        ? prev.filter(a => a !== asset)
        : [...prev, asset]
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedAssets([]);
    setSelectedFeeLevel("all");
    setMinRating(0);
    setHasInvestorProtection(null);
    setHasMobilePlatform(null);
    setIsAwardWinner(null);
  };

  const filteredBrokers = brokers.filter(broker => {
    const matchesSearch = broker.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Asset filter - for this demo, we'll show all if no assets selected
    const matchesAssets = selectedAssets.length === 0 || selectedAssets.some(asset => {
      // This is a simplified asset matching - in a real app, each broker would have asset types
      // For now, we'll match based on broker characteristics
      if (asset === "Stock, ETF") return !broker.riskDisclaimer; // Traditional brokers
      if (asset === "Forex" || asset === "CFD") return broker.riskDisclaimer; // CFD/Forex brokers
      if (asset === "Crypto") return broker.name.toLowerCase().includes("robinhood") || broker.name.toLowerCase().includes("webull");
      return true; // Show all for other asset types
    });
    
    const matchesFeeLevel = !selectedFeeLevel || selectedFeeLevel === "all" || broker.feeLevel === selectedFeeLevel;
    const matchesRating = broker.rating >= minRating;
    const matchesInvestorProtection = hasInvestorProtection === null || broker.investorProtection === hasInvestorProtection;
    const matchesMobilePlatform = hasMobilePlatform === null || broker.mobilePlatform === hasMobilePlatform;
    const matchesAwardWinner = isAwardWinner === null || broker.isAwardWinner === isAwardWinner;
    
    return matchesSearch && matchesAssets && matchesFeeLevel && matchesRating && 
           matchesInvestorProtection && matchesMobilePlatform && matchesAwardWinner;
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating}/5</span>
      </div>
    );
  };

  const getFeeColor = (level: string) => {
    switch (level) {
      case "Low": return "text-green-600";
      case "Average": return "text-yellow-600";
      case "High": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 mt-20 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            Broker Reviews
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-4 max-w-3xl mx-auto leading-relaxed">
            Find the right broker and invest on your own
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>

        {/* Filters */}
        <div className="mb-16">
          {/* Filter Header with Reset */}
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Filter Brokers</h3>
                <p className="text-slate-600">Customize your search to find the perfect broker</p>
              </div>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={resetFilters}
                className="flex items-center gap-2 hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 transition-all duration-200"
              >
                <FilterX size={18} />
                Clear All Filters
              </Button>
            </div>

            {/* Filter Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {/* Search Filter */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Search by name</label>
                <Input
                  placeholder="Type broker name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-slate-200 focus:border-primary transition-colors duration-200"
                />
              </div>

              {/* Fee Level Filter */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Fee Level</label>
                <Select value={selectedFeeLevel} onValueChange={setSelectedFeeLevel}>
                  <SelectTrigger className="border-slate-200 focus:border-primary">
                    <SelectValue placeholder="Select fee level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="all">All levels</SelectItem>
                    <SelectItem value="Low">Low fees</SelectItem>
                    <SelectItem value="Average">Average fees</SelectItem>
                    <SelectItem value="High">High fees</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Minimum Rating Filter */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Minimum Rating</label>
                <Select value={minRating.toString()} onValueChange={(value) => setMinRating(Number(value))}>
                  <SelectTrigger className="border-slate-200 focus:border-primary">
                    <SelectValue placeholder="Select minimum rating" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="0">Any rating</SelectItem>
                    <SelectItem value="3">3+ stars</SelectItem>
                    <SelectItem value="4">4+ stars</SelectItem>
                    <SelectItem value="4.5">4.5+ stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Award Winner Filter */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Award Winners</label>
                <Select 
                  value={isAwardWinner === null ? "all" : isAwardWinner.toString()} 
                  onValueChange={(value) => setIsAwardWinner(value === "all" ? null : value === "true")}
                >
                  <SelectTrigger className="border-slate-200 focus:border-primary">
                    <SelectValue placeholder="Filter by awards" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="all">All brokers</SelectItem>
                    <SelectItem value="true">Award winners only</SelectItem>
                    <SelectItem value="false">Non-award winners</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Investor Protection Filter */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Investor Protection</label>
                <Select 
                  value={hasInvestorProtection === null ? "all" : hasInvestorProtection.toString()} 
                  onValueChange={(value) => setHasInvestorProtection(value === "all" ? null : value === "true")}
                >
                  <SelectTrigger className="border-slate-200 focus:border-primary">
                    <SelectValue placeholder="Protection status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="all">All brokers</SelectItem>
                    <SelectItem value="true">With protection</SelectItem>
                    <SelectItem value="false">Without protection</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mobile Platform Filter */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Mobile Platform</label>
                <Select 
                  value={hasMobilePlatform === null ? "all" : hasMobilePlatform.toString()} 
                  onValueChange={(value) => setHasMobilePlatform(value === "all" ? null : value === "true")}
                >
                  <SelectTrigger className="border-slate-200 focus:border-primary">
                    <SelectValue placeholder="Mobile app availability" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="all">All brokers</SelectItem>
                    <SelectItem value="true">With mobile app</SelectItem>
                    <SelectItem value="false">No mobile app</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Asset Type Filters */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-slate-700 block">Asset Types</label>
              <div className="flex flex-wrap gap-3">
                {assetTypes.map((asset) => (
                  <Badge
                    key={asset}
                    variant={selectedAssets.includes(asset) ? "default" : "outline"}
                    className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      selectedAssets.includes(asset) 
                        ? "bg-primary text-white hover:bg-primary/90 shadow-md" 
                        : "border-slate-300 text-slate-600 hover:border-primary hover:text-primary hover:bg-primary/5"
                    }`}
                    onClick={() => toggleAssetFilter(asset)}
                  >
                    {asset}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-200 pt-6 mt-8 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <p className="text-sm font-medium text-slate-700">
                  Showing <span className="text-primary font-bold">{filteredBrokers.length}</span> of {brokers.length} brokers
                </p>
              </div>
              <p className="text-lg font-semibold text-slate-800 text-center">
                Brokers available in France • 2025
              </p>
            </div>
          </div>
        </div>

        {/* Recommended Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full"></div>
            <h2 className="text-3xl font-bold text-slate-800">Recommended for you</h2>
          </div>
        </div>

        {/* Broker Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredBrokers.map((broker) => (
            <Card key={broker.id} className="group relative hover:shadow-2xl transition-all duration-300 border border-slate-200 bg-white shadow-sm overflow-hidden">
              {broker.recommended && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-accent to-accent/80 text-slate-800 px-5 py-2.5 rounded-full text-sm font-bold shadow-lg z-10 whitespace-nowrap">
                  ⭐ Recommended
                </div>
              )}
              
              <CardHeader className="space-y-6 p-8">
                <div className="flex items-start justify-between">
                  <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <img 
                      src={broker.logo} 
                      alt={broker.name}
                      className="w-14 h-14 object-contain filter contrast-110 brightness-110"
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                  </div>
                  {broker.isAwardWinner && (
                    <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900 px-3 py-2 rounded-full shadow-md">
                      <Trophy size={16} />
                      <span className="text-xs font-bold">2025 Winner</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors duration-200">
                    {broker.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    {renderStars(broker.rating)}
                  </div>
                </div>
                
                <div className="text-sm text-slate-600 bg-slate-50 px-4 py-2 rounded-lg">
                  <span className="font-semibold text-primary">{broker.peopleCount.toLocaleString()}</span> traders chose this broker
                </div>
              </CardHeader>

              <CardContent className="space-y-6 p-8 pt-0">
                {/* Fee Level */}
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-sm font-medium text-slate-600">Fee level:</span>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                      broker.feeLevel === 'Low' ? 'bg-green-100 text-green-700' :
                      broker.feeLevel === 'Average' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {broker.feeLevel}
                    </span>
                    <div className="flex items-center">
                      {renderStars(broker.feeRating)}
                    </div>
                  </div>
                </div>

                {/* Inactivity Fee */}
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-sm font-medium text-slate-600">Inactivity fee:</span>
                  <div className="flex items-center gap-2">
                    {broker.inactivityFee ? (
                      <>
                        <XCircle className="text-red-500" size={18} />
                        <span className="text-sm font-medium text-red-600">Yes</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="text-green-500" size={18} />
                        <span className="text-sm font-medium text-green-600">No</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Investor Protection */}
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-sm font-medium text-slate-600">Investor protection:</span>
                  <div className="flex items-center gap-2">
                    {broker.investorProtection ? (
                      <>
                        <CheckCircle className="text-green-500" size={18} />
                        <span className="text-sm font-medium text-green-600">Protected</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="text-red-500" size={18} />
                        <span className="text-sm font-medium text-red-600">Not protected</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Mobile Platform */}
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-sm font-medium text-slate-600">Mobile platform:</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {broker.mobilePlatform ? (
                        <>
                          <Smartphone className="text-green-500" size={16} />
                          <span className="text-sm font-medium text-green-600">Available</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="text-red-500" size={16} />
                          <span className="text-sm font-medium text-red-600">Not available</span>
                        </>
                      )}
                    </div>
                    {broker.mobileRating && (
                      <div className="flex items-center">
                        {renderStars(broker.mobileRating)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Risk Disclaimer */}
                {broker.riskDisclaimer && (
                  <div className="text-xs text-slate-600 bg-amber-50 border border-amber-200 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>{broker.riskDisclaimer}</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200" 
                    variant="outline"
                  >
                    Read Review
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-200">
                    Visit Broker
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {filteredBrokers.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FilterX className="text-slate-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">No brokers found</h3>
              <p className="text-slate-600 mb-6">Try adjusting your filters to see more results.</p>
              <Button onClick={resetFilters} className="bg-primary hover:bg-primary/90">
                Clear All Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BrokerReviews;