import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ScamBrokerShield from "./pages/ScamBrokerShield";
import BrokerReviews from "./pages/BrokerReviews";
import InteractiveTools from "./pages/InteractiveTools";
import BrokerComparison from "./pages/BrokerComparison";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/scam-broker-shield" element={<ScamBrokerShield />} />
          <Route path="/broker-reviews" element={<BrokerReviews />} />
          <Route path="/interactive-tools" element={<InteractiveTools />} />
          <Route path="/broker-comparison" element={<BrokerComparison />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
