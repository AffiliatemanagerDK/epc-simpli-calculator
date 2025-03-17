
import React, { useState, useEffect } from 'react';
import EPCSlider from './EPCSlider';
import ResultCard from './ResultCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DollarSign, CurrencyIcon } from "lucide-react";

const formatCurrency = (value: number, currency: string): string => {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  } else {
    return new Intl.NumberFormat('da-DK', {
      style: 'currency',
      currency: 'DKK',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }
};

const formatPercentage = (value: number, currency: string): string => {
  if (currency === 'USD') {
    return `${value.toFixed(2)}%`;
  } else {
    return `${value.toFixed(2).replace('.', ',')}%`;
  }
};

const formatNumber = (value: number, currency: string): string => {
  if (currency === 'USD') {
    return value.toLocaleString('en-US');
  } else {
    return value.toLocaleString('da-DK');
  }
};

const translations = {
  USD: {
    title: "Earnings Per Click Calculator",
    description: "Optimize your affiliate strategy by calculating your potential earnings per click.",
    commissionPercentage: "Commission Percentage",
    aov: "Average Order Value (AOV)",
    conversionRate: "Conversion Rate",
    monthlyClicks: "Monthly Clicks",
    epc: "Earnings Per Click (EPC)",
    epcDescription: "Average earnings for each click on your affiliate link",
    monthlyEarnings: "Monthly Earnings",
    monthlyEarningsDescription: "Estimated earnings based on your monthly click volume",
    formula: "EPC = Commission Percentage × Average Order Value × Conversion Rate"
  },
  DKK: {
    title: "Indtjening Per Klik Beregner",
    description: "Optimer din affiliate-strategi ved at beregne din potentielle indtjening per klik.",
    commissionPercentage: "Kommissionsprocent",
    aov: "Gennemsnitlig Ordreværdi",
    conversionRate: "Konverteringsrate",
    monthlyClicks: "Månedlige Klik",
    epc: "Indtjening Per Klik",
    epcDescription: "Gennemsnitlig indtjening for hvert klik på dit affiliate-link",
    monthlyEarnings: "Månedlig Indtjening",
    monthlyEarningsDescription: "Estimeret indtjening baseret på dit månedlige klikvolumen",
    formula: "Indtjening Per Klik = Kommissionsprocent × Gennemsnitlig Ordreværdi × Konverteringsrate"
  }
};

const EPCCalculator = () => {
  const [commissionPercentage, setCommissionPercentage] = useState<number[]>([20]);
  const [aov, setAov] = useState<number[]>([100]);
  const [conversionRate, setConversionRate] = useState<number[]>([3]);
  const [epc, setEpc] = useState<number>(0);
  const [monthlyClicks, setMonthlyClicks] = useState<number[]>([1000]);
  const [monthlyEarnings, setMonthlyEarnings] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('DKK');

  useEffect(() => {
    // Calculate EPC: Commission Percentage x AOV x Conversion Rate
    const calculatedEpc = (commissionPercentage[0] / 100) * aov[0] * (conversionRate[0] / 100);
    setEpc(calculatedEpc);
    
    // Calculate Monthly Earnings: EPC x Monthly Clicks
    setMonthlyEarnings(calculatedEpc * monthlyClicks[0]);
  }, [commissionPercentage, aov, conversionRate, monthlyClicks]);

  const t = translations[currency as keyof typeof translations];

  return (
    <Card className="calculator-container animate-fade-in">
      <CardHeader className="calculator-header">
        <CardTitle className="text-3xl text-center">{t.title}</CardTitle>
        <CardDescription className="text-white/90 text-center mt-2">
          {t.description}
        </CardDescription>
        <div className="flex justify-center mt-4">
          <ToggleGroup type="single" value={currency} onValueChange={(value) => value && setCurrency(value)}>
            <ToggleGroupItem value="DKK" aria-label="DKK Currency">
              DKK
            </ToggleGroupItem>
            <ToggleGroupItem value="USD" aria-label="USD Currency">
              USD
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent className="calculator-body">
        <div className="space-y-4">
          <EPCSlider
            label={t.commissionPercentage}
            value={commissionPercentage}
            onChange={setCommissionPercentage}
            min={1}
            max={100}
            step={0.5}
            displayValue={formatPercentage(commissionPercentage[0], currency)}
            displaySuffix=""
          />
          
          <EPCSlider
            label={t.aov}
            value={aov}
            onChange={setAov}
            min={10}
            max={1000}
            step={5}
            displayValue={formatCurrency(aov[0], currency)}
          />
          
          <EPCSlider
            label={t.conversionRate}
            value={conversionRate}
            onChange={setConversionRate}
            min={0.1}
            max={10}
            step={0.1}
            displayValue={formatPercentage(conversionRate[0], currency)}
            displaySuffix=""
          />
          
          <EPCSlider
            label={t.monthlyClicks}
            value={monthlyClicks}
            onChange={setMonthlyClicks}
            min={100}
            max={10000}
            step={100}
            displayValue={formatNumber(monthlyClicks[0], currency)}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <ResultCard
              label={t.epc}
              value={formatCurrency(epc, currency)}
              description={t.epcDescription}
              delay={100}
            />
            
            <ResultCard
              label={t.monthlyEarnings}
              value={formatCurrency(monthlyEarnings, currency)}
              description={t.monthlyEarningsDescription}
              delay={200}
            />
          </div>
          
          <div className="mt-8 text-sm text-muted-foreground text-center">
            <p>{t.formula}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EPCCalculator;
