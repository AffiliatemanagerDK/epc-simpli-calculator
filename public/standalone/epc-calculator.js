
(function() {
  // Indsæt TailwindCSS
  const injectTailwind = () => {
    if (!document.getElementById('tailwind-epc-calculator')) {
      const link = document.createElement('link');
      link.id = 'tailwind-epc-calculator';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
      document.head.appendChild(link);
    }
  };

  // Indsæt CSS for vores beregner
  const injectCustomStyles = () => {
    if (!document.getElementById('epc-calculator-styles')) {
      const style = document.createElement('style');
      style.id = 'epc-calculator-styles';
      style.textContent = `
        .epc-calculator-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          max-width: 800px;
          margin: 0 auto;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .epc-calculator-header {
          padding: 1.5rem;
          background: linear-gradient(to right, #059669, #10b981);
          color: white;
        }
        .epc-calculator-body {
          padding: 1.5rem;
          background: white;
        }
        .epc-slider-container {
          margin-bottom: 1rem;
        }
        .epc-input-label {
          color: #374151;
          font-weight: 500;
          margin-bottom: 0.5rem;
          display: inline-block;
        }
        .epc-value-display {
          color: #059669;
          font-weight: 500;
        }
        .epc-slider {
          width: 100%;
          height: 5px;
          background: #d1d5db;
          border-radius: 9999px;
          outline: none;
          -webkit-appearance: none;
        }
        .epc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          background: #059669;
          border-radius: 50%;
          cursor: pointer;
        }
        .epc-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #059669;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
        .epc-tooltip {
          position: relative;
          display: inline-block;
          cursor: help;
          margin-left: 0.25rem;
        }
        .epc-tooltip-icon {
          width: 1rem;
          height: 1rem;
          color: #9ca3af;
        }
        .epc-tooltip-text {
          visibility: hidden;
          width: 200px;
          background-color: #1f2937;
          color: white;
          text-align: center;
          border-radius: 0.25rem;
          padding: 0.5rem;
          position: absolute;
          z-index: 1;
          bottom: 125%;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          transition: opacity 0.3s;
          font-size: 0.75rem;
        }
        .epc-tooltip:hover .epc-tooltip-text {
          visibility: visible;
          opacity: 1;
        }
        .epc-result-card {
          background-color: #f3f4f6;
          border-radius: 0.5rem;
          padding: 1rem;
          margin-bottom: 1rem;
        }
        .epc-result-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #059669;
        }
        .epc-result-label {
          font-weight: 600;
          color: #1f2937;
        }
        .epc-result-description {
          color: #6b7280;
          font-size: 0.875rem;
        }
        .epc-score-container {
          position: relative;
          height: 30px;
          background-color: #e5e7eb;
          border-radius: 9999px;
          overflow: hidden;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .epc-score-bar {
          height: 100%;
          border-radius: 9999px;
          transition: width 0.5s ease-out;
        }
        .epc-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 768px) {
          .epc-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .epc-currency-toggle {
          display: inline-flex;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 0.25rem;
          overflow: hidden;
          margin-top: 1rem;
        }
        .epc-currency-button {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          border: none;
          background: transparent;
          color: white;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .epc-currency-button.active {
          background-color: rgba(255, 255, 255, 0.2);
        }
        .epc-footer {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.75rem;
          color: #6b7280;
        }
      `;
      document.head.appendChild(style);
    }
  };

  // Formattering af tal baseret på valuta
  const formatCurrency = (value, currency) => {
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

  const formatPercentage = (value, currency) => {
    if (currency === 'USD') {
      return `${value.toFixed(2)}%`;
    } else {
      return `${value.toFixed(2).replace('.', ',')}%`;
    }
  };

  // Oversættelser
  const translations = {
    USD: {
      title: "EPC Calculator for Affiliate Programs",
      description: "Calculate the Earnings Per Click (EPC) for your affiliate program.",
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
      formula: "EPC = Commission Percentage × Average Order Value × Conversion Rate",
      maxEpc: "$5.00 or higher is excellent"
    },
    DKK: {
      title: "EPC beregner til affiliateprogrammer",
      description: "Beregn indtjening per klik (EPC) for dit affiliateprogram.",
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
      formula: "Indtjening per klik = Kommissionsprocent × Gennemsnitlig ordreværdi × Konverteringsrate",
      maxEpc: "35,00 kr. eller højere er fremragende"
    }
  };

  // Beregn score (3 DKK = 4, 10 DKK = 8)
  const calculateScore = (epc, currency) => {
    // Konverter USD til DKK for scoring hvis nødvendigt
    const epcInDKK = currency === 'USD' ? epc * 7.0 : epc;
    
    if (epcInDKK <= 0) return 0;
    if (epcInDKK <= 3) {
      // Lineær skala fra 0-3 DKK giver 0-4 score
      return Math.round((epcInDKK / 3 * 4) * 10) / 10;
    } else if (epcInDKK <= 10) {
      // Lineær skala fra 3-10 DKK giver 4-8 score
      return Math.round((4 + (epcInDKK - 3) / 7 * 4) * 10) / 10;
    } else {
      // Lineær skala fra 10+ DKK giver 8-10 score, med max 10
      return Math.min(10, Math.round((8 + (epcInDKK - 10) / 25 * 2) * 10) / 10);
    }
  };

  // Få farve baseret på score
  const getScoreColor = (score) => {
    if (score < 3) return '#ef4444';
    if (score < 5) return '#f59e0b';
    if (score < 7) return '#10b981';
    return '#059669';
  };

  // Opret beregneren
  const createCalculator = (container, initialCurrency = 'DKK') => {
    let state = {
      commissionPercentage: 20,
      aov: initialCurrency === 'USD' ? 100 : 700,
      conversionRate: 3,
      currency: initialCurrency,
      epc: 0,
      score: 0
    };

    // Beregn EPC og score
    const calculate = () => {
      state.epc = (state.commissionPercentage / 100) * state.aov * (state.conversionRate / 100);
      state.score = calculateScore(state.epc, state.currency);
      updateUI();
    };

    // Opdater UI baseret på state
    const updateUI = () => {
      const t = translations[state.currency];
      
      // Opdater overskrift og beskrivelse
      document.getElementById('epc-calculator-title').textContent = t.title;
      document.getElementById('epc-calculator-description').textContent = t.description;
      
      // Opdater labels
      document.getElementById('commission-label').textContent = t.commissionPercentage;
      document.getElementById('commission-tooltip').textContent = t.commissionTooltip;
      document.getElementById('aov-label').textContent = t.aov;
      document.getElementById('aov-tooltip').textContent = t.aovTooltip;
      document.getElementById('conversion-label').textContent = t.conversionRate;
      document.getElementById('conversion-tooltip').textContent = t.conversionTooltip;
      
      // Opdater sliders og værdier
      document.getElementById('commission-slider').value = state.commissionPercentage;
      document.getElementById('commission-value').textContent = formatPercentage(state.commissionPercentage, state.currency);
      
      document.getElementById('aov-slider').value = state.aov;
      document.getElementById('aov-value').textContent = formatCurrency(state.aov, state.currency);
      
      document.getElementById('conversion-slider').value = state.conversionRate;
      document.getElementById('conversion-value').textContent = formatPercentage(state.conversionRate, state.currency);
      
      // Opdater resultater
      document.getElementById('epc-result').textContent = formatCurrency(state.epc, state.currency);
      document.getElementById('epc-result-label').textContent = t.epc;
      document.getElementById('epc-result-description').textContent = t.epcDescription;
      
      document.getElementById('score-result').textContent = state.score.toFixed(1);
      document.getElementById('score-result-label').textContent = t.score;
      document.getElementById('score-result-description').textContent = t.scoreDescription;
      
      // Opdater score bar
      const scoreBar = document.getElementById('score-bar');
      scoreBar.style.width = `${state.score * 10}%`;
      scoreBar.style.backgroundColor = getScoreColor(state.score);
      
      // Opdater footer
      document.getElementById('formula-text').textContent = t.formula;
      document.getElementById('max-epc-text').textContent = t.maxEpc;
      
      // Opdater currency toggle knapper
      document.querySelectorAll('.epc-currency-button').forEach(button => {
        if (button.dataset.currency === state.currency) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    };

    // Opbyg HTML struktur
    container.innerHTML = `
      <div class="epc-calculator-container">
        <div class="epc-calculator-header">
          <h2 id="epc-calculator-title" class="text-2xl font-bold mb-2"></h2>
          <p id="epc-calculator-description" class="text-sm opacity-90"></p>
          <div class="epc-currency-toggle">
            <button class="epc-currency-button" data-currency="DKK">DKK</button>
            <button class="epc-currency-button" data-currency="USD">USD</button>
          </div>
        </div>
        
        <div class="epc-calculator-body">
          <div class="epc-slider-container">
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <label id="commission-label" class="epc-input-label"></label>
                <div class="epc-tooltip">
                  <svg class="epc-tooltip-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke-width="2"></circle>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <path stroke-width="3" d="M12 17h.01"></path>
                  </svg>
                  <span id="commission-tooltip" class="epc-tooltip-text"></span>
                </div>
              </div>
              <span id="commission-value" class="epc-value-display"></span>
            </div>
            <input id="commission-slider" type="range" min="1" max="100" step="0.5" class="epc-slider">
          </div>
          
          <div class="epc-slider-container">
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <label id="aov-label" class="epc-input-label"></label>
                <div class="epc-tooltip">
                  <svg class="epc-tooltip-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke-width="2"></circle>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <path stroke-width="3" d="M12 17h.01"></path>
                  </svg>
                  <span id="aov-tooltip" class="epc-tooltip-text"></span>
                </div>
              </div>
              <span id="aov-value" class="epc-value-display"></span>
            </div>
            <input id="aov-slider" type="range" min="10" max="10000" step="5" class="epc-slider">
          </div>
          
          <div class="epc-slider-container">
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <label id="conversion-label" class="epc-input-label"></label>
                <div class="epc-tooltip">
                  <svg class="epc-tooltip-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke-width="2"></circle>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <path stroke-width="3" d="M12 17h.01"></path>
                  </svg>
                  <span id="conversion-tooltip" class="epc-tooltip-text"></span>
                </div>
              </div>
              <span id="conversion-value" class="epc-value-display"></span>
            </div>
            <input id="conversion-slider" type="range" min="0.1" max="25" step="0.1" class="epc-slider">
          </div>
          
          <div class="epc-grid">
            <div class="epc-result-card">
              <div class="epc-result-label" id="epc-result-label"></div>
              <div class="epc-result-value" id="epc-result"></div>
              <div class="epc-result-description" id="epc-result-description"></div>
            </div>
            
            <div class="epc-result-card">
              <div class="epc-result-label" id="score-result-label"></div>
              <div class="epc-result-value" id="score-result"></div>
              <div class="epc-score-container">
                <div id="score-bar" class="epc-score-bar"></div>
              </div>
              <div class="epc-result-description" id="score-result-description"></div>
            </div>
          </div>
          
          <div class="epc-footer">
            <p id="formula-text"></p>
            <p id="max-epc-text"></p>
          </div>
        </div>
      </div>
    `;

    // Tilføj event listeners
    const commissionSlider = document.getElementById('commission-slider');
    commissionSlider.addEventListener('input', (e) => {
      state.commissionPercentage = parseFloat(e.target.value);
      calculate();
    });

    const aovSlider = document.getElementById('aov-slider');
    aovSlider.addEventListener('input', (e) => {
      state.aov = parseFloat(e.target.value);
      calculate();
    });

    const conversionSlider = document.getElementById('conversion-slider');
    conversionSlider.addEventListener('input', (e) => {
      state.conversionRate = parseFloat(e.target.value);
      calculate();
    });

    // Currency toggle
    document.querySelectorAll('.epc-currency-button').forEach(button => {
      button.addEventListener('click', () => {
        const newCurrency = button.dataset.currency;
        if (newCurrency !== state.currency) {
          const oldCurrency = state.currency;
          state.currency = newCurrency;
          
          // Konverter AOV værdi hvis valuta ændres
          if (oldCurrency === 'DKK' && newCurrency === 'USD') {
            state.aov = Math.round(state.aov / 7);
          } else if (oldCurrency === 'USD' && newCurrency === 'DKK') {
            state.aov = Math.round(state.aov * 7);
          }
          
          // Opdater max værdi på AOV slideren baseret på valuta
          if (newCurrency === 'USD') {
            aovSlider.max = "1429"; // ca. 10000 DKK
          } else {
            aovSlider.max = "10000";
          }
          
          calculate();
        }
      });
    });

    // Initial beregning og UI opdatering
    calculate();
  };

  // Initialiser beregneren når DOM er loaded
  document.addEventListener('DOMContentLoaded', () => {
    injectTailwind();
    injectCustomStyles();
    
    const containers = document.querySelectorAll('.epc-calculator-container');
    containers.forEach(container => {
      const currency = container.dataset.currency || 'DKK';
      createCalculator(container, currency);
    });
  });
})();
