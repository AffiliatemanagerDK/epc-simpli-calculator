
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

  // Load the custom element if it's not already defined
  if (!customElements.get('epc-calculator')) {
    // Load the web component
    const script = document.createElement('script');
    script.src = 'PATH_TO_BUNDLE/epc-calculator-widget.js'; // This path will be updated during build
    script.async = true;
    script.onload = function() {
      console.log('EPC Calculator widget loaded successfully!');
    };
    script.onerror = function() {
      console.error('Failed to load EPC Calculator widget.');
    };
    
    // Inject the script and styles
    injectStyles();
    document.head.appendChild(script);
  }
  
  // Initialize the calculator
  document.addEventListener('DOMContentLoaded', function() {
    console.log('EPC Calculator initialized');
  });
})();
