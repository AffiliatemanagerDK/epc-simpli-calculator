
import { useEffect, useState } from 'react';
import EPCCalculator from '../components/EPCCalculator';

const translations = {
  USD: {
    title: "EPC Calculator for Affiliate Programs",
    description: "Calculate your Earnings Per Click (EPC) to optimize your affiliate marketing strategy and maximize your revenue."
  },
  DKK: {
    title: "Indtjening per klik beregner til affiliate-programmer",
    description: "Beregn din indtjening per klik (EPC) for at optimere din affiliate marketing-strategi og maksimere din omsætning."
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
      </div>
    </div>
  );
};

export default Index;
