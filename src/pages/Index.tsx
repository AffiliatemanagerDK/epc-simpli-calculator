
import { useEffect } from 'react';
import EPCCalculator from '../components/EPCCalculator';

const Index = () => {
  useEffect(() => {
    // Register the web component (for WordPress embedding)
    if (typeof window !== 'undefined') {
      import('../components/EPCCalculatorWidget');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-silk py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-slate mb-4 animate-fade-in">
            EPC Calculator for Affiliate Programs
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
            Calculate your Earnings Per Click (EPC) to optimize your affiliate marketing strategy and maximize your revenue.
          </p>
        </div>
        
        <EPCCalculator />
      </div>
    </div>
  );
};

export default Index;
