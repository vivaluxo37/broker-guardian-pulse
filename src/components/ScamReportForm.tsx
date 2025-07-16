import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  AlertTriangle, 
  Shield, 
  Upload, 
  FileText, 
  Mail, 
  Phone,
  DollarSign,
  CreditCard,
  ExternalLink,
  Flag,
  Eye,
  Clock,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScamReport {
  id: string;
  reporterName: string;
  reporterEmail: string;
  brokerName: string;
  brokerWebsite: string;
  scamType: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  evidence: string[];
  financialLoss: number;
  dateOccurred: string;
  status: "submitted" | "under_review" | "verified" | "dismissed";
  upvotes: number;
  warnings: string[];
}

const scamTypes = [
  "Withdrawal Issues",
  "Trading Manipulation",
  "False Advertising",
  "Unlicensed Operation",
  "Identity Theft",
  "Bonus Fraud",
  "Platform Manipulation",
  "Regulatory Violations",
  "Account Hacking",
  "Cold Calling Scam",
  "Fake Reviews",
  "Other"
];

const recentReports: ScamReport[] = [
  {
    id: "1",
    reporterName: "TraderAlert123",
    reporterEmail: "hidden",
    brokerName: "CryptoFX Pro",
    brokerWebsite: "cryptofxpro.com",
    scamType: "Withdrawal Issues",
    severity: "critical",
    description: "Broker refuses to process withdrawals for over 3 months. Claims of technical issues but no resolution. Lost $15,000.",
    evidence: ["screenshots", "email_communications"],
    financialLoss: 15000,
    dateOccurred: "2024-01-10",
    status: "verified",
    upvotes: 28,
    warnings: ["Unregulated", "Multiple complaints", "Blacklisted"]
  },
  {
    id: "2",
    reporterName: "VictimTrader",
    reporterEmail: "hidden",
    brokerName: "FastTrade Limited",
    brokerWebsite: "fasttrade-ltd.com",
    scamType: "Trading Manipulation",
    severity: "high",
    description: "Platform shows different prices during volatile movements. Spreads widen dramatically during news events.",
    evidence: ["platform_screenshots", "trade_history"],
    financialLoss: 5500,
    dateOccurred: "2024-01-08",
    status: "under_review",
    upvotes: 15,
    warnings: ["Price manipulation", "Spread widening"]
  }
];

export const ScamReportForm = () => {
  const [activeTab, setActiveTab] = useState("report");
  const [formData, setFormData] = useState({
    reporterName: "",
    reporterEmail: "",
    brokerName: "",
    brokerWebsite: "",
    scamType: "",
    description: "",
    financialLoss: "",
    dateOccurred: "",
    evidence: [] as string[],
    anonymous: false
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Scam Report Submitted",
      description: "Your report has been submitted for review. Our team will investigate within 24-48 hours.",
    });
    // Reset form
    setFormData({
      reporterName: "",
      reporterEmail: "",
      brokerName: "",
      brokerWebsite: "",
      scamType: "",
      description: "",
      financialLoss: "",
      dateOccurred: "",
      evidence: [],
      anonymous: false
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      case "high": return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-red-100 text-red-800 border-red-200";
      case "under_review": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "submitted": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            Important Notice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700 text-sm">
            This form is for reporting suspected fraud or scam activities. All reports are reviewed by our team and may be shared with regulatory authorities. 
            False reports may result in account suspension.
          </p>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border border-slate-200">
          <TabsTrigger value="report" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Report Scam
          </TabsTrigger>
          <TabsTrigger value="warnings" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Active Warnings
          </TabsTrigger>
          <TabsTrigger value="recent" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Recent Reports
          </TabsTrigger>
        </TabsList>

        {/* Report Scam Tab */}
        <TabsContent value="report">
          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Flag className="h-5 w-5 text-red-600" />
                Report Suspected Fraud or Scam
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Help protect the trading community by reporting suspicious broker activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Your Name {!formData.anonymous && <span className="text-red-500">*</span>}
                    </label>
                    <Input
                      value={formData.reporterName}
                      onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                      placeholder="Enter your name"
                      disabled={formData.anonymous}
                      className="bg-white border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address {!formData.anonymous && <span className="text-red-500">*</span>}
                    </label>
                    <Input
                      type="email"
                      value={formData.reporterEmail}
                      onChange={(e) => setFormData({ ...formData, reporterEmail: e.target.value })}
                      placeholder="your.email@example.com"
                      disabled={formData.anonymous}
                      className="bg-white border-slate-200"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={formData.anonymous}
                    onCheckedChange={(checked) => setFormData({ ...formData, anonymous: !!checked })}
                  />
                  <label htmlFor="anonymous" className="text-sm text-muted-foreground">
                    Submit anonymously (we won't be able to contact you for follow-up)
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Broker Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={formData.brokerName}
                      onChange={(e) => setFormData({ ...formData, brokerName: e.target.value })}
                      placeholder="Name of the broker/company"
                      required
                      className="bg-white border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Broker Website
                    </label>
                    <Input
                      value={formData.brokerWebsite}
                      onChange={(e) => setFormData({ ...formData, brokerWebsite: e.target.value })}
                      placeholder="https://broker-website.com"
                      className="bg-white border-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Type of Scam/Fraud <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.scamType}
                    onValueChange={(value) => setFormData({ ...formData, scamType: value })}
                    required
                  >
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue placeholder="Select scam type" />
                    </SelectTrigger>
                    <SelectContent>
                      {scamTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Detailed Description <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide detailed information about the scam, including dates, amounts, communications, and any other relevant details..."
                    required
                    rows={6}
                    className="bg-white border-slate-200"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Financial Loss (USD)
                    </label>
                    <Input
                      type="number"
                      value={formData.financialLoss}
                      onChange={(e) => setFormData({ ...formData, financialLoss: e.target.value })}
                      placeholder="0"
                      className="bg-white border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Date of Incident
                    </label>
                    <Input
                      type="date"
                      value={formData.dateOccurred}
                      onChange={(e) => setFormData({ ...formData, dateOccurred: e.target.value })}
                      className="bg-white border-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Evidence (Optional)
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload screenshots, documents, or other evidence
                    </p>
                    <Button variant="outline" size="sm">
                      Choose Files
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Supported: PNG, JPG, PDF (Max 10MB each)
                    </p>
                  </div>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    By submitting this report, you confirm that the information provided is accurate to the best of your knowledge. 
                    False reports may result in legal action and account termination.
                  </AlertDescription>
                </Alert>

                <Button type="submit" className="w-full bg-red-600 text-white hover:bg-red-700">
                  Submit Scam Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Warnings Tab */}
        <TabsContent value="warnings">
          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Active Broker Warnings
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Current regulatory warnings and community alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    broker: "CryptoFX Pro",
                    warnings: ["FCA Warning", "Unregulated", "Withdrawal Issues"],
                    severity: "critical",
                    lastUpdated: "2024-01-15"
                  },
                  {
                    broker: "FastTrade Limited", 
                    warnings: ["ESMA Alert", "License Revoked"],
                    severity: "high",
                    lastUpdated: "2024-01-12"
                  },
                  {
                    broker: "QuickProfit FX",
                    warnings: ["Community Reports", "Suspicious Activity"],
                    severity: "medium",
                    lastUpdated: "2024-01-10"
                  }
                ].map((warning, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{warning.broker}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getSeverityColor(warning.severity)}>
                            {warning.severity.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-muted-foreground">Updated: {warning.lastUpdated}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {warning.warnings.map((warn, i) => (
                        <Badge key={i} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          {warn}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Reports Tab */}
        <TabsContent value="recent">
          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Clock className="h-5 w-5 text-blue-500" />
                Recent Community Reports
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Latest scam reports from the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentReports.map((report) => (
                  <div key={report.id} className="border border-border rounded-lg p-6 bg-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-foreground text-lg">{report.brokerName}</h4>
                          <Badge className={getSeverityColor(report.severity)}>
                            {report.severity.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>Reported by {report.reporterName}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{report.dateOccurred}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span>Loss: ${report.financialLoss.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Eye className="h-4 w-4" />
                          <span>{report.upvotes} upvotes</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Badge variant="outline" className="mb-2 bg-blue-50 text-blue-700 border-blue-200">
                        {report.scamType}
                      </Badge>
                      <p className="text-muted-foreground">{report.description}</p>
                    </div>

                    {report.warnings.length > 0 && (
                      <div className="mb-4">
                        <h5 className="font-medium text-foreground mb-2">Warning Signs:</h5>
                        <div className="flex flex-wrap gap-2">
                          {report.warnings.map((warning, index) => (
                            <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              {warning}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <Flag className="h-4 w-4" />
                          <span>Helpful ({report.upvotes})</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          <span>View Details</span>
                        </Button>
                      </div>
                      {report.brokerWebsite && (
                        <Button variant="outline" size="sm">
                          Visit Website
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};