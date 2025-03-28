import React, { useState, useEffect } from 'react';
import EPCSlider from './EPCSlider';
import ResultCard from './ResultCard';
import ScoreCard from './ScoreCard';
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
    description: "Optimize your affiliate program by calculating the potential earnings per click for your affiliates.",
    commissionPercentage: "Commission Percentage",
    commissionTooltip: "The percentage of sales you pay to your affiliates as commission",
    aov: "Average Order Value (AOV)",
    aovTooltip: "The average amount customers spend per order on your website",
    conversionRate: "Conversion Rate",
    conversionTooltip: "The percentage of visitors who complete a purchase after clicking an affiliate link to your store",
    epc: "Earnings Per Click (EPC)",
    epcDescription: "Average earnings for affiliates for each click on their affiliate link to your store",
    score: "Affiliate Program Score",
    scoreDescription: "Rating of your affiliate program's attractiveness based on EPC value",
    scoreTooltip: "Score from 0-10: Below 3 is poor, 3-5 is average, 5-7 is good, 7-10 is excellent",
    formula: "EPC = Commission Percentage × Average Order Value × Conversion Rate",
    maxEpc: "$5.00 or higher is excellent"
  },
  DKK: {
    title: "Indtjening per klik beregner",
    description: "Optimer dit affiliateprogram ved at beregne den potentielle indtjening per klik for dine affiliates.",
    commissionPercentage: "Kommissionsprocent",
    commissionTooltip: "Den procentdel af salget, du betaler til dine affiliates som provision",
    aov: "Gennemsnitlig ordreværdi",
    aovTooltip: "Det gennemsnitlige beløb, som kunder bruger pr. ordre på din hjemmeside",
    conversionRate: "Konverteringsrate",
    conversionTooltip: "Procentdelen af besøgende, der gennemfører et køb efter at have klikket på et affiliate-link til din butik",
    epc: "Indtjening per klik",
    epcDescription: "Gennemsnitlig indtjening for affiliates for hvert klik på deres affiliate-link til din butik",
    score: "Affiliateprogram Score",
    scoreDescription: "Vurdering af dit affiliateprograms attraktivitet baseret på EPC-værdi",
    scoreTooltip: "Score fra 0-10: Under 3 er lav, 3-5 er gennemsnitlig, 5-7 er god, 7-10 er fremragende",
    formula: "Indtjening per klik = Kommissionsprocent × Gennemsnitlig ordreværdi × Konverteringsrate",
    maxEpc: "35,00 kr. eller højere er fremragende"
  }
};

const getMaxEpcThreshold = (currency: string): number => {
  return currency === 'USD' ? 5.0 : 35.0; // 5.0 USD = 35.0 DKK at exchange rate 7.0
};

const calculateScore = (epc: number, currency: string): number => {
  const epcInDKK = currency === 'USD' ? epc * 7.0 : epc;
  
  if (epcInDKK <= 0) return 0;
  if (epcInDKK <= 3) {
    return Math.round((epcInDKK / 3 * 4) * 10) / 10;
  } else if (epcInDKK <= 10) {
    return Math.round((4 + (epcInDKK - 3) / 7 * 4) * 10) / 10;
  } else {
    return Math.min(10, Math.round((8 + (epcInDKK - 10) / 25 * 2) * 10) / 10);
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
  const [score, setScore] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('DKK');

  useEffect(() => {
    const calculatedEpc = (commissionPercentage[0] / 100) * aov[0] * (conversionRate[0] / 100);
    setEpc(calculatedEpc);
    
    setScore(calculateScore(calculatedEpc, currency));
  }, [commissionPercentage, aov, conversionRate, currency]);

  const handleCurrencyChange = (value: string) => {
    if (value) {
      setCurrency(value);
      
      if (value === 'USD') {
        setAov([Math.round(aov[0] / 7)]);
      } else {
        setAov([Math.round(aov[0] * 7)]);
      }
      
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
              </div>
              <EPCSlider
                value={aov}
                onChange={setAov}
                min={10}
                max={currency === 'USD' ? 1429 : 10000}
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
              </div>
              <EPCSlider
                value={conversionRate}
                onChange={setConversionRate}
                min={0.1}
                max={25}
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
              
              <ScoreCard
                score={score}
                label={t.score}
                description={t.scoreDescription}
                tooltip={t.scoreTooltip}
                delay={200}
              />
            </div>
            
            <div className="mt-8 text-sm text-muted-foreground text-center space-y-1">
              <p>{t.formula}</p>
              <p>{t.maxEpc}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default EPCCalculator;
