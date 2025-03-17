
// This script is for the standalone web component version of the EPC Calculator
// It is separate from the WordPress plugin version

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

    // Add custom styles for the calculator
    const customStyles = document.createElement('style');
    customStyles.textContent = `
      .epc-calculator-container {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        max-width: 100%;
        margin: 0 auto;
      }
    `;
    document.head.appendChild(customStyles);
  }

  // Initialize the calculator
  document.addEventListener('DOMContentLoaded', function() {
    // Only run for web component version, not WordPress plugin version
    if (!document.querySelector('.wp-site-blocks')) {
      // Inject styles
      injectStyles();
      
      // Setup currency from container attribute
      const containers = document.querySelectorAll('.epc-calculator-container');
      containers.forEach(container => {
        const currency = container.dataset.currency || 'DKK';
        const calculatorElement = container.querySelector('epc-calculator');
        if (calculatorElement) {
          calculatorElement.setAttribute('currency', currency);
        }
      });
      
      console.log('EPC Calculator initialized with currency settings');
    }
  });
})();
