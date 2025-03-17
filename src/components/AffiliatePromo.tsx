
import React from 'react';
import { Button } from "@/components/ui/button";

interface AffiliatePromoProps {
  currency: string;
}

const translations = {
  USD: {
    title: "Transform Your Affiliate Program into a",
    highlightedText: "Revenue Generating Powerhouse",
    subtitle: "Maximize Your Market Reach with Expert Affiliate Management",
    buttonText: "GET YOUR FREE AFFILIATE AUDIT",
    startedText: "Get started with a single click!",
    emailSubject: "Yes, give me a free affiliate audit"
  },
  DKK: {
    title: "Omdan dit affiliateprogram til et",
    highlightedText: "indtægtsskabende kraftcenter",
    subtitle: "Maksimér dit afkast og din markedsandel med professionel affiliate management",
    buttonText: "FÅ DIN GRATIS AFFILIATE AUDIT",
    startedText: "Kom i gang med et enkelt klik!",
    emailSubject: "Ja tak, jeg vil gerne have en gratis affiliate performance gennemgang"
  }
};

const AffiliatePromo: React.FC<AffiliatePromoProps> = ({ currency }) => {
  const t = translations[currency as keyof typeof translations];
  
  const handleButtonClick = (e: React.MouseEvent) => {
    window.location.href = `mailto:kontakt@affiliatemanager.dk?subject=${encodeURIComponent(t.emailSubject)}`;
  };
  
  return (
    <div className="w-full py-12 px-4 bg-gradient-to-b from-silk to-white rounded-lg animate-fade-in" style={{ animationDelay: '300ms' }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight">
          {t.title} <span className="text-jade">{t.highlightedText}</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-dark-slate/80 mb-10 mt-4">
          {t.subtitle}
        </p>
        
        <div className="flex justify-center mb-6">
          <Button 
            size="lg" 
            className="bg-jade hover:bg-dark-jade text-white font-bold py-6 px-8 text-lg uppercase tracking-wide transition-all transform hover:scale-105"
            onClick={handleButtonClick}
          >
            {t.buttonText}
          </Button>
        </div>
        
        <p className="text-gray-500 mt-4">
          {t.startedText}
        </p>
      </div>
    </div>
  );
};

export default AffiliatePromo;
