
import { useEffect, useState } from 'react';
import EPCCalculator from '../components/EPCCalculator';
import AffiliatePromo from '../components/AffiliatePromo';

const translations = {
  USD: {
    title: "EPC Calculator for Affiliate Campaigns",
    description: "Calculate the Earnings Per Click (EPC) for your affiliate program to help attract and retain quality affiliates for your ecommerce store."
  },
  DKK: {
    title: "EPC beregner til affiliateprogrammer",
    description: "Beregn indtjening per klik (EPC) for dit affiliateprogram for at tiltrække og fastholde kvalitetsaffiliates til din webshop."
  }
};

const Index = () => {
  const [currency, setCurrency] = useState<string>('DKK');
  
  useEffect(() => {
    // Register the web component (for WordPress embedding)
    if (typeof window !== 'undefined') {
      import('../components/EPCCalculatorWidget');
    }
  }, []);

  // Listen for currency changes from the calculator
  useEffect(() => {
    const handleCurrencyChange = (e: CustomEvent) => {
      setCurrency(e.detail.currency);
    };
    
    window.addEventListener('currencyChange', handleCurrencyChange as EventListener);
    return () => {
      window.removeEventListener('currencyChange', handleCurrencyChange as EventListener);
    };
  }, []);

  const t = translations[currency as keyof typeof translations];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-silk py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header with logo */}
        <div className="flex justify-center mb-8">
          <a href="https://affiliatemanager.dk/" rel="noopener noreferrer">
            <img 
              src="/lovable-uploads/72365295-add8-49b9-aad2-94c18e0a87a9.png" 
              alt="Affiliate Manager by Marketers" 
              className="h-16 sm:h-20 w-auto"
            />
          </a>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-slate mb-4 animate-fade-in">
            {t.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
            {t.description}
          </p>
        </div>
        
        <EPCCalculator onCurrencyChange={(newCurrency) => {
          setCurrency(newCurrency);
          // Dispatch custom event for other components
          const event = new CustomEvent('currencyChange', { detail: { currency: newCurrency } });
          window.dispatchEvent(event);
        }} />
        
        {/* Add the new AffiliatePromo component */}
        <div className="mt-16">
          <AffiliatePromo currency={currency} />
        </div>
      </div>
    </div>
  );
};

export default Index;
