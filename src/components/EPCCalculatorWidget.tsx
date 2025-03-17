
import React from 'react';
import ReactDOM from 'react-dom';
import EPCCalculator from './EPCCalculator';

class EPCCalculatorWidget extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    // Add styles
    const styleElement = document.createElement('link');
    styleElement.setAttribute('rel', 'stylesheet');
    styleElement.setAttribute('href', 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
    this.shadowRoot?.appendChild(styleElement);

    // Mount React component
    ReactDOM.render(<EPCCalculator />, mountPoint);
  }
}

customElements.define('epc-calculator', EPCCalculatorWidget);

export default EPCCalculatorWidget;
