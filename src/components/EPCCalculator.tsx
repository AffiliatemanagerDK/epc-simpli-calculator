
import React, { useState, useEffect } from 'react';
import EPCSlider from './EPCSlider';
import ResultCard from './ResultCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

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
    commissionTooltip: "The percentage of sales you earn as commission from the merchant",
    aov: "Average Order Value (AOV)",
    aovTooltip: "The average amount customers spend per order on the merchant's website",
    conversionRate: "Conversion Rate",
    conversionTooltip: "The percentage of visitors who complete a purchase after clicking your affiliate link",
    epc: "Earnings Per Click (EPC)",
    epcDescription: "Average earnings for each click on your affiliate link",
    monthlyEarnings: "Monthly Earnings",
    monthlyEarningsDescription: "Estimated earnings based on your monthly click volume",
    formula: "EPC = Commission Percentage × Average Order Value × Conversion Rate"
  },
  DKK: {
    title: "Indtjening per klik beregner",
    description: "Optimer din affiliate-strategi ved at beregne din potentielle indtjening per klik.",
    commissionPercentage: "Kommissionsprocent",
    commissionTooltip: "Den procentdel af salget, du tjener som provision fra forhandleren",
    aov: "Gennemsnitlig ordreværdi",
    aovTooltip: "Det gennemsnitlige beløb, som kunder bruger pr. ordre på forhandlerens hjemmeside",
    conversionRate: "Konverteringsrate",
    conversionTooltip: "Procentdelen af besøgende, der gennemfører et køb efter at have klikket på dit affiliate-link",
    epc: "Indtjening per klik",
    epcDescription: "Gennemsnitlig indtjening for hvert klik på dit affiliate-link",
    monthlyEarnings: "Månedlig indtjening",
    monthlyEarningsDescription: "Estimeret indtjening baseret på dit månedlige klikvolumen",
    formula: "Indtjening per klik = Kommissionsprocent × Gennemsnitlig ordreværdi × Konverteringsrate"
  }
};

interface EPCCalculatorProps {
  onCurrencyChange?: (currency: string) => void;
}

const EPCCalculator = ({ onCurrencyChange }: EPCCalculatorProps) => {
  const [commissionPercentage, setCommissionPercentage] = useState<number[]>([20]);
  const [aov, setAov] = useState<number[]>([100]);
  const [conversionRate, setConversionRate] = useState<number[]>([3]);
  const [epc, setEpc] = useState<number>(0);
  const [monthlyEarnings, setMonthlyEarnings] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('DKK');
  const [monthlyClicks] = useState<number>(1000); // Default value, no longer adjustable

  useEffect(() => {
    const calculatedEpc = (commissionPercentage[0] / 100) * aov[0] * (conversionRate[0] / 100);
    setEpc(calculatedEpc);
    
    setMonthlyEarnings(calculatedEpc * monthlyClicks);
  }, [commissionPercentage, aov, conversionRate, monthlyClicks]);

  const handleCurrencyChange = (value: string) => {
    if (value) {
      setCurrency(value);
      if (onCurrencyChange) {
        onCurrencyChange(value);
      }
    }
  };

  const t = translations[currency as keyof typeof translations];

  return (
    <TooltipProvider>
      <Card className="calculator-container animate-fade-in">
        <CardHeader className="calculator-header">
          <CardTitle className="text-3xl text-center">{t.title}</CardTitle>
          <CardDescription className="text-white/90 text-center mt-2">
            {t.description}
          </CardDescription>
          <div className="flex justify-center mt-4">
            <ToggleGroup type="single" value={currency} onValueChange={handleCurrencyChange}>
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
            <div className="slider-container">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <label className="input-label">{t.commissionPercentage}</label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{t.commissionTooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-jade font-medium">{formatPercentage(commissionPercentage[0], currency)}</span>
              </div>
              <EPCSlider
                value={commissionPercentage}
                onChange={setCommissionPercentage}
                min={1}
                max={100}
                step={0.5}
                displayValue={formatPercentage(commissionPercentage[0], currency)}
                displaySuffix=""
              />
            </div>
            
            <div className="slider-container">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <label className="input-label">{t.aov}</label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{t.aovTooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-jade font-medium">{formatCurrency(aov[0], currency)}</span>
              </div>
              <EPCSlider
                value={aov}
                onChange={setAov}
                min={10}
                max={1000}
                step={5}
                displayValue={formatCurrency(aov[0], currency)}
              />
            </div>
            
            <div className="slider-container">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <label className="input-label">{t.conversionRate}</label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{t.conversionTooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-jade font-medium">{formatPercentage(conversionRate[0], currency)}</span>
              </div>
              <EPCSlider
                value={conversionRate}
                onChange={setConversionRate}
                min={0.1}
                max={10}
                step={0.1}
                displayValue={formatPercentage(conversionRate[0], currency)}
                displaySuffix=""
              />
            </div>
            
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
    </TooltipProvider>
  );
};

export default EPCCalculator;
