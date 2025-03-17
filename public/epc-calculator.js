
// EPC Calculator WordPress Plugin
// This script handles the embedding of the EPC Calculator in WordPress

(function() {
  // Create and inject the required CSS
  function injectStyles() {
    const tailwindCDN = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
    
    // Check if Tailwind is already loaded
    if (!document.querySelector(`link[href="${tailwindCDN}"]`)) {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = tailwindCDN;
      document.head.appendChild(style);
    }
  }

  // Create a container if none exists
  function createContainer() {
    // Look for container with class epc-calculator-container
    let container = document.querySelector('.epc-calculator-container');
    
    // If no container exists, create one and add it to the body
    if (!container) {
      container = document.createElement('div');
      container.className = 'epc-calculator-container';
      document.body.appendChild(container);
    }
    
    return container;
  }

  // Load the custom element if it's not already defined
  if (!customElements.get('epc-calculator')) {
    // Get the script path to determine the base URL
    const scripts = document.getElementsByTagName('script');
    const currentScript = scripts[scripts.length - 1];
    const scriptPath = currentScript.src;
    const baseUrl = scriptPath.substring(0, scriptPath.lastIndexOf('/') + 1);
    
    // Load the web component
    const script = document.createElement('script');
    script.src = `${baseUrl}epc-calculator-widget.js`; // Use dynamic path based on current script
    script.async = true;
    script.onload = function() {
      console.log('EPC Calculator widget loaded successfully!');
      
      // Create and render the calculator after the script has loaded
      const container = createContainer();
      
      // Check if currency is specified in data-currency attribute
      const preferredCurrency = container.getAttribute('data-currency') || 'DKK';
      
      // Create the calculator element with the preferred currency
      const calculator = document.createElement('epc-calculator');
      calculator.setAttribute('data-currency', preferredCurrency);
      
      // Clear container and append calculator
      container.innerHTML = '';
      container.appendChild(calculator);
    };
    script.onerror = function() {
      console.error('Failed to load EPC Calculator widget.');
    };
    
    // Inject the script and styles
    injectStyles();
    document.head.appendChild(script);
  }
})();
