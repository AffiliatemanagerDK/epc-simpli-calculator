
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
        
        <div className="mt-16 bg-white rounded-lg shadow-md p-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <h2 className="text-2xl font-bold text-dark-slate mb-4">How to Add This Calculator to Your WordPress Site</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-jade mb-2">Option 1: Embed Using HTML</h3>
              <p className="mb-2">Add this code to any HTML element in Elementor:</p>
              <pre className="bg-silk p-4 rounded text-sm overflow-x-auto">
                &lt;script src="https://yourwebsite.com/epc-calculator.js"&gt;&lt;/script&gt;<br/>
                &lt;epc-calculator&gt;&lt;/epc-calculator&gt;
              </pre>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-jade mb-2">Option 2: Using Elementor HTML Widget</h3>
              <p className="mb-2">Add an HTML widget and paste the code above.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-jade mb-2">Option 3: Contact Us for Installation Help</h3>
              <p>Need help integrating this calculator? Reach out and we'll assist you.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
