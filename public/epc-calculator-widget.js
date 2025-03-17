
// This loads the actual calculator widget from your main app
(function() {
  if (typeof window !== 'undefined' && !customElements.get('epc-calculator')) {
    class EPCCalculatorWidget extends HTMLElement {
      connectedCallback() {
        // Create shadow DOM
        const shadow = this.attachShadow({ mode: 'open' });
        
        // Add Tailwind CSS
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
        shadow.appendChild(linkElem);
        
        // Create container
        const container = document.createElement('div');
        container.className = 'epc-calculator-container';
        shadow.appendChild(container);
        
        // Get preferred currency
        const currency = this.getAttribute('data-currency') || 'DKK';
        
        // Load the calculator app
        const appScript = document.createElement('script');
        appScript.src = `https://epc.affiliatemanager.dk/assets/index.js`;
        appScript.type = 'module';
        appScript.onload = () => {
          console.log('Calculator application loaded');
        };
        shadow.appendChild(appScript);
        
        // Create calculator iframe as fallback
        const iframe = document.createElement('iframe');
        iframe.src = `https://epc.affiliatemanager.dk?currency=${currency}`;
        iframe.style.width = '100%';
        iframe.style.height = '800px';
        iframe.style.border = 'none';
        iframe.style.overflow = 'hidden';
        container.appendChild(iframe);
      }
    }
    
    // Register custom element
    customElements.define('epc-calculator', EPCCalculatorWidget);
  }
})();
