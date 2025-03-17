
(function($) {
    'use strict';
    
    // Format currency
    function formatCurrency(value, currency) {
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
    }
    
    // Format percentage
    function formatPercentage(value, currency) {
        if (currency === 'USD') {
            return `${value.toFixed(2)}%`;
        } else {
            return `${value.toFixed(2).replace('.', ',')}%`;
        }
    }
    
    // Calculate EPC
    function calculateEPC(commissionPercentage, aov, conversionRate) {
        return (commissionPercentage / 100) * aov * (conversionRate / 100);
    }
    
    // Calculate score
    function calculateScore(epc, currency) {
        // Convert USD to DKK for scoring if needed
        const epcInDKK = currency === 'USD' ? epc * 7.0 : epc;
        
        // Score calculation
        if (epcInDKK <= 0) return 0;
        if (epcInDKK <= 3) {
            // Linear scale from 0-3 DKK maps to 0-4 score
            return Math.round((epcInDKK / 3 * 4) * 10) / 10;
        } else if (epcInDKK <= 10) {
            // Linear scale from 3-10 DKK maps to 4-8 score
            return Math.round((4 + (epcInDKK - 3) / 7 * 4) * 10) / 10;
        } else {
            // Linear scale from 10+ DKK maps to 8-10 score, capping at 10
            return Math.min(10, Math.round((8 + (epcInDKK - 10) / 25 * 2) * 10) / 10);
        }
    }
    
    // Get color based on score
    function getScoreColor(score) {
        if (score < 3) return 'bg-red-500'; // Poor score
        if (score < 5) return 'bg-yellow-500'; // Average score
        if (score < 7) return 'bg-green-400'; // Good score
        return 'bg-green-600'; // Excellent score
    }
    
    // Get text color based on score
    function getScoreTextColor(score) {
        if (score < 3) return 'text-red-500'; // Poor score
        if (score < 5) return 'text-yellow-500'; // Average score
        if (score < 7) return 'text-green-400'; // Good score
        return 'text-green-600'; // Excellent score
    }
    
    // Update results
    function updateResults(container) {
        const currency = container.getAttribute('data-currency') || 'DKK';
        const t = epcCalculatorData.translations[currency];
        
        const commissionPercentage = parseFloat(container.querySelector('#epc-commission').value);
        const aov = parseFloat(container.querySelector('#epc-aov').value);
        const conversionRate = parseFloat(container.querySelector('#epc-conversion').value);
        
        const epc = calculateEPC(commissionPercentage, aov, conversionRate);
        const score = calculateScore(epc, currency);
        
        // Update EPC value
        container.querySelector('#epc-result-value').textContent = formatCurrency(epc, currency);
        
        // Update score
        const scoreElement = container.querySelector('#epc-score-value');
        scoreElement.textContent = score.toFixed(1);
        scoreElement.className = getScoreTextColor(score);
        
        // Update progress bar
        const progressBar = container.querySelector('#epc-score-progress');
        progressBar.style.width = `${score * 10}%`;
        progressBar.className = `${getScoreColor(score)} h-full rounded-full transition-all duration-300`;
        
        // Update slider displays
        container.querySelector('#epc-commission-display').textContent = formatPercentage(commissionPercentage, currency);
        container.querySelector('#epc-aov-display').textContent = formatCurrency(aov, currency);
        container.querySelector('#epc-conversion-display').textContent = formatPercentage(conversionRate, currency);
    }
    
    // Render calculator
    function renderCalculator(container) {
        const currency = container.getAttribute('data-currency') || 'DKK';
        const t = epcCalculatorData.translations[currency];
        
        // Initial values
        const commissionPercentage = 20;
        const aov = currency === 'USD' ? 100 : 700;
        const conversionRate = 3;
        
        // Create calculator HTML
        const calculatorHtml = `
            <div class="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg max-w-3xl mx-auto">
                <div class="p-6 bg-gradient-to-r from-teal-500 to-teal-700 text-white">
                    <h2 class="text-3xl text-center font-bold">${t.title}</h2>
                    <p class="text-white/90 text-center mt-2">${t.description}</p>
                    <div class="flex justify-center mt-4">
                        <div class="inline-flex rounded-md shadow-sm" role="group">
                            <button type="button" class="currency-toggle px-4 py-2 text-sm font-medium ${currency === 'DKK' ? 'bg-teal-800 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white/80'} rounded-l-md" data-currency="DKK">DKK</button>
                            <button type="button" class="currency-toggle px-4 py-2 text-sm font-medium ${currency === 'USD' ? 'bg-teal-800 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white/80'} rounded-r-md" data-currency="USD">USD</button>
                        </div>
                    </div>
                </div>
                
                <div class="p-6">
                    <div class="space-y-4">
                        <!-- Commission Percentage Slider -->
                        <div class="mb-4">
                            <div class="flex justify-between items-center mb-2">
                                <div class="flex items-center gap-2">
                                    <label class="font-medium text-gray-700">${t.commissionPercentage}</label>
                                    <div class="relative inline-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div class="tooltip opacity-0 invisible absolute z-10 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg transition-opacity duration-300 -mt-2 -ml-24">
                                            ${t.commissionTooltip}
                                        </div>
                                    </div>
                                </div>
                                <span id="epc-commission-display" class="text-teal-600 font-medium">${formatPercentage(commissionPercentage, currency)}</span>
                            </div>
                            <input type="range" id="epc-commission" min="1" max="100" step="0.5" value="${commissionPercentage}" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                        </div>
                        
                        <!-- Average Order Value Slider -->
                        <div class="mb-4">
                            <div class="flex justify-between items-center mb-2">
                                <div class="flex items-center gap-2">
                                    <label class="font-medium text-gray-700">${t.aov}</label>
                                    <div class="relative inline-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div class="tooltip opacity-0 invisible absolute z-10 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg transition-opacity duration-300 -mt-2 -ml-24">
                                            ${t.aovTooltip}
                                        </div>
                                    </div>
                                </div>
                                <span id="epc-aov-display" class="text-teal-600 font-medium">${formatCurrency(aov, currency)}</span>
                            </div>
                            <input type="range" id="epc-aov" min="10" max="${currency === 'USD' ? 1429 : 10000}" step="5" value="${aov}" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                        </div>
                        
                        <!-- Conversion Rate Slider -->
                        <div class="mb-4">
                            <div class="flex justify-between items-center mb-2">
                                <div class="flex items-center gap-2">
                                    <label class="font-medium text-gray-700">${t.conversionRate}</label>
                                    <div class="relative inline-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div class="tooltip opacity-0 invisible absolute z-10 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg transition-opacity duration-300 -mt-2 -ml-24">
                                            ${t.conversionTooltip}
                                        </div>
                                    </div>
                                </div>
                                <span id="epc-conversion-display" class="text-teal-600 font-medium">${formatPercentage(conversionRate, currency)}</span>
                            </div>
                            <input type="range" id="epc-conversion" min="0.1" max="25" step="0.1" value="${conversionRate}" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                        </div>
                        
                        <!-- Results Cards -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <!-- EPC Result Card -->
                            <div class="bg-gray-50 p-4 rounded-lg border border-teal-100 transition-all duration-300">
                                <div class="flex flex-col items-center text-center">
                                    <p id="epc-result-value" class="text-3xl font-bold text-teal-600">${formatCurrency(calculateEPC(commissionPercentage, aov, conversionRate), currency)}</p>
                                    <p class="text-sm text-gray-600 mt-1">${t.epc}</p>
                                    <p class="text-xs text-gray-500 mt-2">${t.epcDescription}</p>
                                </div>
                            </div>
                            
                            <!-- Score Card -->
                            <div class="bg-gray-50 p-4 rounded-lg border border-teal-100 transition-all duration-300">
                                <div class="flex flex-col items-center text-center">
                                    <div class="w-full mb-2">
                                        <div class="flex justify-between items-center mb-1">
                                            <span class="text-sm text-gray-500">0</span>
                                            <span id="epc-score-value" class="text-3xl font-bold ${getScoreTextColor(calculateScore(calculateEPC(commissionPercentage, aov, conversionRate), currency))}">${calculateScore(calculateEPC(commissionPercentage, aov, conversionRate), currency).toFixed(1)}</span>
                                            <span class="text-sm text-gray-500">10</span>
                                        </div>
                                        <div class="h-2.5 bg-gray-200 rounded-full w-full">
                                            <div id="epc-score-progress" class="${getScoreColor(calculateScore(calculateEPC(commissionPercentage, aov, conversionRate), currency))} h-full rounded-full transition-all duration-300" style="width: ${calculateScore(calculateEPC(commissionPercentage, aov, conversionRate), currency) * 10}%"></div>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-1 mt-2">
                                        <p class="text-sm text-gray-600">${t.score}</p>
                                        <div class="relative inline-block">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div class="tooltip opacity-0 invisible absolute z-10 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg transition-opacity duration-300 -mt-2 -ml-24">
                                                ${t.scoreTooltip}
                                            </div>
                                        </div>
                                    </div>
                                    <p class="text-xs text-gray-500 mt-2">${t.scoreDescription}</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Formula and Notes -->
                        <div class="mt-8 text-sm text-gray-500 text-center space-y-1">
                            <p>${t.formula}</p>
                            <p>${t.maxEpc}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Set container HTML
        container.querySelector('.epc-calculator-wrapper').innerHTML = calculatorHtml;
        
        // Set up event listeners for sliders
        container.querySelector('#epc-commission').addEventListener('input', function() {
            updateResults(container);
        });
        
        container.querySelector('#epc-aov').addEventListener('input', function() {
            updateResults(container);
        });
        
        container.querySelector('#epc-conversion').addEventListener('input', function() {
            updateResults(container);
        });
        
        // Set up currency toggle buttons
        const currencyButtons = container.querySelectorAll('.currency-toggle');
        currencyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const newCurrency = this.getAttribute('data-currency');
                container.setAttribute('data-currency', newCurrency);
                
                // Adjust AOV value when changing currency
                const aovSlider = container.querySelector('#epc-aov');
                const currentAOV = parseFloat(aovSlider.value);
                
                if (newCurrency === 'USD' && container.getAttribute('data-currency') !== 'USD') {
                    // Convert DKK to USD (divide by 7)
                    aovSlider.value = Math.round(currentAOV / 7);
                    aovSlider.max = 1429; // set max value for USD
                } else if (newCurrency === 'DKK' && container.getAttribute('data-currency') !== 'DKK') {
                    // Convert USD to DKK (multiply by 7)
                    aovSlider.value = Math.round(currentAOV * 7);
                    aovSlider.max = 10000; // set max value for DKK
                }
                
                // Re-render calculator with new currency
                renderCalculator(container);
            });
        });
        
        // Set up tooltips
        const tooltipTriggers = container.querySelectorAll('.relative.inline-block');
        tooltipTriggers.forEach(trigger => {
            const tooltip = trigger.querySelector('.tooltip');
            
            trigger.addEventListener('mouseenter', function() {
                tooltip.classList.remove('opacity-0', 'invisible');
                tooltip.classList.add('opacity-100', 'visible');
            });
            
            trigger.addEventListener('mouseleave', function() {
                tooltip.classList.add('opacity-0', 'invisible');
                tooltip.classList.remove('opacity-100', 'visible');
            });
        });
    }
    
    // Initialize on document ready
    $(document).ready(function() {
        $('.epc-calculator-container').each(function() {
            renderCalculator(this);
        });
    });
    
})(jQuery);
