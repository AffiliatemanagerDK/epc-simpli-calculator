
import React, { useState, useEffect } from 'react';
import EPCSlider from './EPCSlider';
import ResultCard from './ResultCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

const EPCCalculator = () => {
  const [commissionPercentage, setCommissionPercentage] = useState<number[]>([20]);
  const [aov, setAov] = useState<number[]>([100]);
  const [conversionRate, setConversionRate] = useState<number[]>([3]);
  const [epc, setEpc] = useState<number>(0);
  const [monthlyClicks, setMonthlyClicks] = useState<number[]>([1000]);
  const [monthlyEarnings, setMonthlyEarnings] = useState<number>(0);

  useEffect(() => {
    // Calculate EPC: Commission Percentage x AOV x Conversion Rate
    const calculatedEpc = (commissionPercentage[0] / 100) * aov[0] * (conversionRate[0] / 100);
    setEpc(calculatedEpc);
    
    // Calculate Monthly Earnings: EPC x Monthly Clicks
    setMonthlyEarnings(calculatedEpc * monthlyClicks[0]);
  }, [commissionPercentage, aov, conversionRate, monthlyClicks]);

  return (
    <Card className="calculator-container animate-fade-in">
      <CardHeader className="calculator-header">
        <CardTitle className="text-3xl text-center">Earnings Per Click Calculator</CardTitle>
        <CardDescription className="text-white/90 text-center mt-2">
          Optimize your affiliate strategy by calculating your potential earnings per click.
        </CardDescription>
      </CardHeader>
      <CardContent className="calculator-body">
        <div className="space-y-4">
          <EPCSlider
            label="Commission Percentage"
            value={commissionPercentage}
            onChange={setCommissionPercentage}
            min={1}
            max={100}
            step={0.5}
            displayValue={formatPercentage(commissionPercentage[0])}
            displaySuffix=""
          />
          
          <EPCSlider
            label="Average Order Value (AOV)"
            value={aov}
            onChange={setAov}
            min={10}
            max={1000}
            step={5}
            displayValue={formatCurrency(aov[0])}
          />
          
          <EPCSlider
            label="Conversion Rate"
            value={conversionRate}
            onChange={setConversionRate}
            min={0.1}
            max={10}
            step={0.1}
            displayValue={formatPercentage(conversionRate[0])}
            displaySuffix=""
          />
          
          <EPCSlider
            label="Monthly Clicks"
            value={monthlyClicks}
            onChange={setMonthlyClicks}
            min={100}
            max={10000}
            step={100}
            displayValue={monthlyClicks[0].toLocaleString()}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <ResultCard
              label="Earnings Per Click (EPC)"
              value={formatCurrency(epc)}
              description="Average earnings for each click on your affiliate link"
              delay={100}
            />
            
            <ResultCard
              label="Monthly Earnings"
              value={formatCurrency(monthlyEarnings)}
              description="Estimated earnings based on your monthly click volume"
              delay={200}
            />
          </div>
          
          <div className="mt-8 text-sm text-muted-foreground text-center">
            <p>EPC = Commission Percentage × Average Order Value × Conversion Rate</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EPCCalculator;
