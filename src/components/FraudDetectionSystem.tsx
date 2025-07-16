import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  Shield, 
  XCircle, 
  AlertCircle,
  CheckCircle,
  TrendingDown,
  Users,
  MessageSquare,
  ExternalLink
} from "lucide-react";

interface FraudMetrics {
  riskScore: number; // 0-100
  trustScore: number; // 0-100
  complaintCount: number;
  reviewSentiment: "positive" | "negative" | "mixed" | "insufficient";
  regulatoryStatus: "active" | "warning" | "revoked" | "suspended" | "unregulated";
  warnings: string[];
  redFlags: string[];
  lastVerified: string;
}

interface BrokerWarnings {
  [brokerId: string]: FraudMetrics;
}

// Mock fraud detection data
export const brokerFraudData: BrokerWarnings = {
  "ic-markets": {
    riskScore: 15,
    trustScore: 92,
    complaintCount: 3,
    reviewSentiment: "positive",
    regulatoryStatus: "active",
    warnings: [],
    redFlags: [],
    lastVerified: "2024-01-15"
  },
  "xtb": {
    riskScore: 12,
    trustScore: 95,
    complaintCount: 2,
    reviewSentiment: "positive",
    regulatoryStatus: "active",
    warnings: [],
    redFlags: [],
    lastVerified: "2024-01-14"
  },
  "plus500": {
    riskScore: 28,
    trustScore: 78,
    complaintCount: 12,
    reviewSentiment: "mixed",
    regulatoryStatus: "warning",
    warnings: ["High spread complaints", "Customer service issues"],
    redFlags: ["Multiple withdrawal complaints"],
    lastVerified: "2024-01-10"
  },
  "cryptofx-pro": {
    riskScore: 95,
    trustScore: 8,
    complaintCount: 47,
    reviewSentiment: "negative",
    regulatoryStatus: "unregulated",
    warnings: ["FCA Warning", "Multiple scam reports", "Withdrawal issues"],
    redFlags: ["No regulatory license", "Fake testimonials", "Aggressive sales tactics", "Unusual withdrawal terms"],
    lastVerified: "2024-01-15"
  },
  "fasttrade-limited": {
    riskScore: 87,
    trustScore: 15,
    complaintCount: 32,
    reviewSentiment: "negative",
    regulatoryStatus: "revoked",
    warnings: ["License revoked", "ESMA warning", "Trading manipulation reports"],
    redFlags: ["Revoked license", "Price manipulation", "Hidden fees"],
    lastVerified: "2024-01-12"
  }
};

interface FraudDetectionDisplayProps {
  brokerId: string;
  brokerName: string;
  compact?: boolean;
}

export const FraudDetectionDisplay = ({ brokerId, brokerName, compact = false }: FraudDetectionDisplayProps) => {
  const fraudData = brokerFraudData[brokerId];
  
  if (!fraudData) return null;

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-600 bg-red-100 border-red-200";
    if (score >= 60) return "text-orange-600 bg-orange-100 border-orange-200";
    if (score >= 30) return "text-yellow-600 bg-yellow-100 border-yellow-200";
    return "text-green-600 bg-green-100 border-green-200";
  };

  const getTrustColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100 border-green-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-100 border-yellow-200";
    if (score >= 30) return "text-orange-600 bg-orange-100 border-orange-200";
    return "text-red-600 bg-red-100 border-red-200";
  };

  const getRegulationIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning": return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "revoked": return <XCircle className="h-4 w-4 text-red-600" />;
      case "suspended": return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default: return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "mixed": return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "negative": return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <MessageSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  if (compact) {
    return (
      <div className="space-y-2">
        {/* Risk Score Badge */}
        <Badge className={`${getRiskColor(fraudData.riskScore)} border`}>
          Risk: {fraudData.riskScore}/100
        </Badge>

        {/* Critical Warnings */}
        {fraudData.riskScore >= 70 && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 font-medium">
              ⚠️ HIGH RISK BROKER - Exercise extreme caution
            </AlertDescription>
          </Alert>
        )}

        {/* Red Flags */}
        {fraudData.redFlags.length > 0 && (
          <div className="space-y-1">
            <h5 className="text-sm font-medium text-red-700">🚩 Red Flags:</h5>
            {fraudData.redFlags.slice(0, 2).map((flag, index) => (
              <div key={index} className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                {flag}
              </div>
            ))}
            {fraudData.redFlags.length > 2 && (
              <div className="text-xs text-muted-foreground">
                +{fraudData.redFlags.length - 2} more warnings
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Risk Assessment Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Fraud Risk Assessment
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className={`text-2xl font-bold p-3 rounded-lg border ${getRiskColor(fraudData.riskScore)}`}>
              {fraudData.riskScore}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Risk Score</div>
            <Progress value={fraudData.riskScore} className="mt-2 h-2" />
          </div>
          
          <div className="text-center">
            <div className={`text-2xl font-bold p-3 rounded-lg border ${getTrustColor(fraudData.trustScore)}`}>
              {fraudData.trustScore}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Trust Score</div>
            <Progress value={fraudData.trustScore} className="mt-2 h-2" />
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground p-3 rounded-lg border border-slate-200 bg-slate-50">
              {fraudData.complaintCount}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Complaints</div>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {fraudData.riskScore >= 70 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <span className="font-bold">⚠️ HIGH RISK BROKER WARNING</span>
            <br />
            This broker has been flagged for multiple red flags and complaints. Exercise extreme caution and avoid depositing funds.
          </AlertDescription>
        </Alert>
      )}

      {fraudData.regulatoryStatus === "revoked" && (
        <Alert className="border-red-200 bg-red-50">
          <XCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <span className="font-bold">🚫 LICENSE REVOKED</span>
            <br />
            This broker's regulatory license has been revoked. Do not deposit any funds.
          </AlertDescription>
        </Alert>
      )}

      {/* Status Indicators */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            {getRegulationIcon(fraudData.regulatoryStatus)}
            Regulatory Status
          </h4>
          <div className="space-y-2">
            <Badge className={`${
              fraudData.regulatoryStatus === "active" ? "bg-green-100 text-green-800 border-green-200" :
              fraudData.regulatoryStatus === "warning" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
              "bg-red-100 text-red-800 border-red-200"
            } border`}>
              {fraudData.regulatoryStatus.toUpperCase()}
            </Badge>
            <div className="text-xs text-muted-foreground">
              Last verified: {fraudData.lastVerified}
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            {getSentimentIcon(fraudData.reviewSentiment)}
            Review Sentiment
          </h4>
          <div className="space-y-2">
            <Badge className={`${
              fraudData.reviewSentiment === "positive" ? "bg-green-100 text-green-800 border-green-200" :
              fraudData.reviewSentiment === "mixed" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
              fraudData.reviewSentiment === "negative" ? "bg-red-100 text-red-800 border-red-200" :
              "bg-gray-100 text-gray-800 border-gray-200"
            } border`}>
              {fraudData.reviewSentiment.toUpperCase()}
            </Badge>
            <div className="text-xs text-muted-foreground">
              Based on {fraudData.complaintCount + 20} reviews
            </div>
          </div>
        </div>
      </div>

      {/* Warnings */}
      {fraudData.warnings.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="font-medium text-orange-800 mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Active Warnings
          </h4>
          <div className="space-y-2">
            {fraudData.warnings.map((warning, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-orange-700">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <span>{warning}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Red Flags */}
      {fraudData.redFlags.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-medium text-red-800 mb-3 flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            Red Flags Detected
          </h4>
          <div className="space-y-2">
            {fraudData.redFlags.map((flag, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-red-700">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                <span>{flag}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Community Action */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
          <Users className="h-4 w-4" />
          Community Protection
        </h4>
        <div className="space-y-3">
          <p className="text-sm text-blue-700">
            Help protect other traders by reporting suspicious activities or sharing your experience.
          </p>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1 text-sm text-blue-700 hover:text-blue-800 font-medium">
              <ExternalLink className="h-3 w-3" />
              Report Issues
            </button>
            <button className="inline-flex items-center gap-1 text-sm text-blue-700 hover:text-blue-800 font-medium">
              <MessageSquare className="h-3 w-3" />
              Share Experience
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};