import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";

export function TradingCalculators() {
  // Position Size Calculator State
  const [positionCalc, setPositionCalc] = useState({
    accountBalance: "",
    riskPercentage: "",
    entryPrice: "",
    stopLoss: "",
    result: null as { positionSize: number; riskAmount: number; units: number } | null
  });

  // Profit/Loss Calculator State
  const [plCalc, setPlCalc] = useState({
    entryPrice: "",
    exitPrice: "",
    positionSize: "",
    leverage: "1",
    currency: "USD",
    result: null as { profit: number; percentage: number; margin: number } | null
  });

  // Margin Calculator State
  const [marginCalc, setMarginCalc] = useState({
    tradeSize: "",
    leverage: "",
    currency: "USD",
    result: null as { requiredMargin: number; availableMargin: number } | null
  });

  const calculatePositionSize = () => {
    const balance = parseFloat(positionCalc.accountBalance);
    const risk = parseFloat(positionCalc.riskPercentage);
    const entry = parseFloat(positionCalc.entryPrice);
    const stop = parseFloat(positionCalc.stopLoss);

    if (balance && risk && entry && stop) {
      const riskAmount = (balance * risk) / 100;
      const pipValue = Math.abs(entry - stop);
      const positionSize = riskAmount / pipValue;
      const units = positionSize / entry;

      setPositionCalc(prev => ({
        ...prev,
        result: { positionSize, riskAmount, units }
      }));
    }
  };

  const calculateProfitLoss = () => {
    const entry = parseFloat(plCalc.entryPrice);
    const exit = parseFloat(plCalc.exitPrice);
    const size = parseFloat(plCalc.positionSize);
    const leverage = parseFloat(plCalc.leverage);

    if (entry && exit && size) {
      const profit = (exit - entry) * size;
      const percentage = ((exit - entry) / entry) * 100;
      const margin = (size * entry) / leverage;

      setPlCalc(prev => ({
        ...prev,
        result: { profit, percentage, margin }
      }));
    }
  };

  const calculateMargin = () => {
    const size = parseFloat(marginCalc.tradeSize);
    const leverage = parseFloat(marginCalc.leverage);

    if (size && leverage) {
      const requiredMargin = size / leverage;
      const availableMargin = size - requiredMargin;

      setMarginCalc(prev => ({
        ...prev,
        result: { requiredMargin, availableMargin }
      }));
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Trading Calculators
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="position" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="position">Position Size</TabsTrigger>
            <TabsTrigger value="profit">Profit/Loss</TabsTrigger>
            <TabsTrigger value="margin">Margin</TabsTrigger>
          </TabsList>

          <TabsContent value="position" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="account-balance">Account Balance ($)</Label>
                <Input
                  id="account-balance"
                  type="number"
                  placeholder="10000"
                  value={positionCalc.accountBalance}
                  onChange={(e) => setPositionCalc(prev => ({ ...prev, accountBalance: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="risk-percentage">Risk Percentage (%)</Label>
                <Input
                  id="risk-percentage"
                  type="number"
                  placeholder="2"
                  value={positionCalc.riskPercentage}
                  onChange={(e) => setPositionCalc(prev => ({ ...prev, riskPercentage: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="entry-price">Entry Price</Label>
                <Input
                  id="entry-price"
                  type="number"
                  step="0.00001"
                  placeholder="1.2000"
                  value={positionCalc.entryPrice}
                  onChange={(e) => setPositionCalc(prev => ({ ...prev, entryPrice: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="stop-loss">Stop Loss</Label>
                <Input
                  id="stop-loss"
                  type="number"
                  step="0.00001"
                  placeholder="1.1950"
                  value={positionCalc.stopLoss}
                  onChange={(e) => setPositionCalc(prev => ({ ...prev, stopLoss: e.target.value }))}
                />
              </div>
            </div>

            <Button onClick={calculatePositionSize} className="w-full">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Position Size
            </Button>

            {positionCalc.result && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Position Size:</span>
                  <span className="font-bold">${positionCalc.result.positionSize.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Risk Amount:</span>
                  <span className="font-bold text-destructive">${positionCalc.result.riskAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Units:</span>
                  <span className="font-bold">{positionCalc.result.units.toFixed(0)}</span>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="profit" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pl-entry">Entry Price</Label>
                <Input
                  id="pl-entry"
                  type="number"
                  step="0.00001"
                  placeholder="1.2000"
                  value={plCalc.entryPrice}
                  onChange={(e) => setPlCalc(prev => ({ ...prev, entryPrice: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="pl-exit">Exit Price</Label>
                <Input
                  id="pl-exit"
                  type="number"
                  step="0.00001"
                  placeholder="1.2050"
                  value={plCalc.exitPrice}
                  onChange={(e) => setPlCalc(prev => ({ ...prev, exitPrice: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="pl-position">Position Size ($)</Label>
                <Input
                  id="pl-position"
                  type="number"
                  placeholder="10000"
                  value={plCalc.positionSize}
                  onChange={(e) => setPlCalc(prev => ({ ...prev, positionSize: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="pl-leverage">Leverage</Label>
                <Select value={plCalc.leverage} onValueChange={(value) => setPlCalc(prev => ({ ...prev, leverage: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1:1</SelectItem>
                    <SelectItem value="10">1:10</SelectItem>
                    <SelectItem value="50">1:50</SelectItem>
                    <SelectItem value="100">1:100</SelectItem>
                    <SelectItem value="500">1:500</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={calculateProfitLoss} className="w-full">
              <TrendingUp className="h-4 w-4 mr-2" />
              Calculate Profit/Loss
            </Button>

            {plCalc.result && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Profit/Loss:</span>
                  <span className={`font-bold ${plCalc.result.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ${plCalc.result.profit.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Percentage:</span>
                  <span className={`font-bold ${plCalc.result.percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {plCalc.result.percentage.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Margin Used:</span>
                  <span className="font-bold">${plCalc.result.margin.toFixed(2)}</span>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="margin" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="trade-size">Trade Size ($)</Label>
                <Input
                  id="trade-size"
                  type="number"
                  placeholder="100000"
                  value={marginCalc.tradeSize}
                  onChange={(e) => setMarginCalc(prev => ({ ...prev, tradeSize: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="margin-leverage">Leverage</Label>
                <Input
                  id="margin-leverage"
                  type="number"
                  placeholder="100"
                  value={marginCalc.leverage}
                  onChange={(e) => setMarginCalc(prev => ({ ...prev, leverage: e.target.value }))}
                />
              </div>
            </div>

            <Button onClick={calculateMargin} className="w-full">
              <DollarSign className="h-4 w-4 mr-2" />
              Calculate Margin
            </Button>

            {marginCalc.result && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Required Margin:</span>
                  <span className="font-bold">${marginCalc.result.requiredMargin.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Available Margin:</span>
                  <span className="font-bold text-green-500">${marginCalc.result.availableMargin.toFixed(2)}</span>
                </div>
              </div>
            )}

            <div className="flex items-start gap-2 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
              <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
              <div className="text-sm text-destructive">
                <strong>Risk Warning:</strong> Trading with leverage increases both potential profits and losses. Never risk more than you can afford to lose.
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}