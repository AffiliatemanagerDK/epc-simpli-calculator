
// EPC Calculator - JavaScript Implementation
(function($) {
    'use strict';

    // DOM ready handler
    $(document).ready(function() {
        // Find all calculator containers
        $('.epc-calculator-container').each(function() {
            initializeCalculator($(this));
        });
    });

    // Initialize calculator
    function initializeCalculator(container) {
        // Get the currency from data attribute
        const currency = container.data('currency') || 'DKK';
        
        // Get translations for the selected currency
        const translations = window.epcCalculatorData?.translations?.[currency] || {};
        
        // Set the text content for all labels and descriptions
        container.find('#epc-title').text(translations.title || 'EPC Calculator');
        container.find('#epc-description').text(translations.description || '');
        container.find('#label-commission').text(translations.commissionPercentage || 'Commission Percentage');
        container.find('#tooltip-commission').text(translations.commissionTooltip || '');
        container.find('#label-aov').text(translations.aov || 'Average Order Value (AOV)');
        container.find('#tooltip-aov').text(translations.aovTooltip || '');
        container.find('#label-conversion').text(translations.conversionRate || 'Conversion Rate');
        container.find('#tooltip-conversion').text(translations.conversionTooltip || '');
        container.find('#label-epc').text(translations.epc || 'Earnings Per Click (EPC)');
        container.find('#desc-epc').text(translations.epcDescription || '');
        container.find('#label-score').text(translations.score || 'Affiliate Program Score');
        container.find('#desc-score').text(translations.scoreDescription || '');
        container.find('#tooltip-score').text(translations.scoreTooltip || '');
        container.find('#formula-text').text(translations.formula || '');
        container.find('#max-epc-text').text(translations.maxEpc || '');
        
        // Set up the sliders
        const commissionSlider = container.find('#commission-slider');
        const aovSlider = container.find('#aov-slider');
        const conversionSlider = container.find('#conversion-slider');
        
        // Set up event handlers
        commissionSlider.on('input', function() {
            container.find('#commission-value').text($(this).val() + '%');
            calculateAndUpdateResults();
        });
        
        aovSlider.on('input', function() {
            const currencySymbol = currency === 'USD' ? '$' : '';
            const suffix = currency === 'USD' ? '' : ' kr.';
            container.find('#aov-value').text(currencySymbol + $(this).val() + suffix);
            calculateAndUpdateResults();
        });
        
        conversionSlider.on('input', function() {
            container.find('#conversion-value').text($(this).val() + '%');
            calculateAndUpdateResults();
        });
        
        // Calculate and update results
        function calculateAndUpdateResults() {
            const commission = parseFloat(commissionSlider.val()) / 100;
            const aov = parseFloat(aovSlider.val());
            const conversion = parseFloat(conversionSlider.val()) / 100;
            
            const epc = commission * aov * conversion;
            const score = calculateScore(epc, currency);
            
            // Format and display EPC
            const currencySymbol = currency === 'USD' ? '$' : '';
            const suffix = currency === 'USD' ? '' : ' kr.';
            container.find('#epc-result').text(currencySymbol + epc.toFixed(2) + suffix);
            
            // Update score
            container.find('#score-result').text(score.toFixed(1));
            container.find('#score-progress').css('width', (score * 10) + '%');
        }
        
        // Initialize with default values
        commissionSlider.trigger('input');
        aovSlider.trigger('input');
        conversionSlider.trigger('input');
        
        // Additional function for score calculation
        function calculateScore(epc, currency) {
            // Different thresholds based on currency
            const maxEpc = currency === 'USD' ? 5 : 35;
            
            // Calculate score (0-10 scale)
            let score = (epc / maxEpc) * 10;
            
            // Cap at 10
            return Math.min(score, 10);
        }
    }

})(jQuery);
