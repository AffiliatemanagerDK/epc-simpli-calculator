
<?php
/**
 * Plugin Name: EPC Calculator
 * Plugin URI: https://yourwebsite.com
 * Description: En kraftfuld EPC (Earnings Per Click) beregner til affiliate marketers.
 * Version: 1.0.0
 * Author: Dit Navn
 * Author URI: https://yourwebsite.com
 * Text Domain: epc-calculator
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('EPC_CALCULATOR_VERSION', '1.0.0');
define('EPC_CALCULATOR_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('EPC_CALCULATOR_PLUGIN_URL', plugin_dir_url(__FILE__));

// Register scripts and styles
function epc_calculator_enqueue_scripts() {
    // Enqueue Tailwind CSS from CDN
    wp_enqueue_style(
        'tailwindcss',
        'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
        array(),
        '2.2.19'
    );
    
    // Enqueue our custom CSS
    wp_enqueue_style(
        'epc-calculator-styles',
        EPC_CALCULATOR_PLUGIN_URL . 'assets/css/epc-calculator.css',
        array('tailwindcss'),
        EPC_CALCULATOR_VERSION
    );
    
    // Enqueue our JavaScript
    wp_enqueue_script(
        'epc-calculator-script',
        EPC_CALCULATOR_PLUGIN_URL . 'assets/js/epc-calculator.js',
        array('jquery'),
        EPC_CALCULATOR_VERSION,
        true
    );

    // Create JS translations for localization
    $translations = array(
        'USD' => array(
            'title' => "Earnings Per Click Calculator",
            'description' => "Optimize your affiliate program by calculating the potential earnings per click for your affiliates.",
            'commissionPercentage' => "Commission Percentage",
            'commissionTooltip' => "The percentage of sales you pay to your affiliates as commission",
            'aov' => "Average Order Value (AOV)",
            'aovTooltip' => "The average amount customers spend per order on your website",
            'conversionRate' => "Conversion Rate",
            'conversionTooltip' => "The percentage of visitors who complete a purchase after clicking an affiliate link to your store",
            'epc' => "Earnings Per Click (EPC)",
            'epcDescription' => "Average earnings for affiliates for each click on their affiliate link to your store",
            'score' => "Affiliate Program Score",
            'scoreDescription' => "Rating of your affiliate program's attractiveness based on EPC value",
            'scoreTooltip' => "Score from 0-10: Below 3 is poor, 3-5 is average, 5-7 is good, 7-10 is excellent",
            'formula' => "EPC = Commission Percentage × Average Order Value × Conversion Rate",
            'maxEpc' => "$5.00 or higher is excellent"
        ),
        'DKK' => array(
            'title' => "Indtjening per klik beregner",
            'description' => "Optimer dit affiliateprogram ved at beregne den potentielle indtjening per klik for dine affiliates.",
            'commissionPercentage' => "Kommissionsprocent",
            'commissionTooltip' => "Den procentdel af salget, du betaler til dine affiliates som provision",
            'aov' => "Gennemsnitlig ordreværdi",
            'aovTooltip' => "Det gennemsnitlige beløb, som kunder bruger pr. ordre på din hjemmeside",
            'conversionRate' => "Konverteringsrate",
            'conversionTooltip' => "Procentdelen af besøgende, der gennemfører et køb efter at have klikket på et affiliate-link til din butik",
            'epc' => "Indtjening per klik",
            'epcDescription' => "Gennemsnitlig indtjening for affiliates for hvert klik på deres affiliate-link til din butik",
            'score' => "Affiliateprogram Score",
            'scoreDescription' => "Vurdering af dit affiliateprograms attraktivitet baseret på EPC-værdi",
            'scoreTooltip' => "Score fra 0-10: Under 3 er lav, 3-5 er gennemsnitlig, 5-7 er god, 7-10 er fremragende",
            'formula' => "Indtjening per klik = Kommissionsprocent × Gennemsnitlig ordreværdi × Konverteringsrate",
            'maxEpc' => "35,00 kr. eller højere er fremragende"
        )
    );

    // Localize script with translations
    wp_localize_script(
        'epc-calculator-script',
        'epcCalculatorData',
        array('translations' => $translations)
    );
}
add_action('wp_enqueue_scripts', 'epc_calculator_enqueue_scripts');

// Register shortcode
function epc_calculator_shortcode($atts) {
    $atts = shortcode_atts(array(
        'currency' => 'DKK',
    ), $atts, 'epc_calculator');
    
    // Validate currency
    $currency = in_array($atts['currency'], array('DKK', 'USD')) ? $atts['currency'] : 'DKK';
    
    ob_start(); // Start output buffering
    ?>
    <div class="epc-calculator-container" data-currency="<?php echo esc_attr($currency); ?>">
        <div class="epc-calculator-wrapper">
            <div class="epc-calculator bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
                <div class="epc-calculator-header mb-6">
                    <h2 class="text-2xl font-bold text-gray-800 mb-2" id="epc-title"></h2>
                    <p class="text-gray-600" id="epc-description"></p>
                </div>
                
                <div class="epc-calculator-inputs">
                    <div class="mb-6">
                        <div class="flex justify-between items-center mb-2">
                            <label id="label-commission" class="block text-sm font-medium text-gray-700"></label>
                            <div class="inline-flex items-center">
                                <span id="commission-value" class="text-sm font-medium text-gray-900">10%</span>
                                <div class="relative ml-2 group">
                                    <button type="button" class="text-gray-400 hover:text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                    <div id="tooltip-commission" class="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 w-52">
                                        <!-- Tooltip content will be added by JS -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input type="range" id="commission-slider" min="1" max="50" value="10" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                    </div>
                    
                    <div class="mb-6">
                        <div class="flex justify-between items-center mb-2">
                            <label id="label-aov" class="block text-sm font-medium text-gray-700"></label>
                            <div class="inline-flex items-center">
                                <span id="aov-value" class="text-sm font-medium text-gray-900">500</span>
                                <div class="relative ml-2 group">
                                    <button type="button" class="text-gray-400 hover:text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                    <div id="tooltip-aov" class="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 w-52">
                                        <!-- Tooltip content will be added by JS -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input type="range" id="aov-slider" min="100" max="2000" value="500" step="10" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                    </div>
                    
                    <div class="mb-6">
                        <div class="flex justify-between items-center mb-2">
                            <label id="label-conversion" class="block text-sm font-medium text-gray-700"></label>
                            <div class="inline-flex items-center">
                                <span id="conversion-value" class="text-sm font-medium text-gray-900">2%</span>
                                <div class="relative ml-2 group">
                                    <button type="button" class="text-gray-400 hover:text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                    <div id="tooltip-conversion" class="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 w-52">
                                        <!-- Tooltip content will be added by JS -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input type="range" id="conversion-slider" min="0.1" max="10" value="2" step="0.1" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                    </div>
                </div>
                
                <div class="epc-calculator-results mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-gradient-to-r from-teal-500 to-green-500 rounded-lg p-5 shadow-md">
                        <h3 id="label-epc" class="text-white font-semibold mb-1 text-lg"></h3>
                        <p id="desc-epc" class="text-white text-xs mb-3 opacity-80"></p>
                        <div class="flex items-baseline">
                            <span id="epc-result" class="text-white text-3xl font-bold">0</span>
                        </div>
                        <p id="formula-text" class="text-white text-xs mt-4 opacity-80"></p>
                    </div>
                    
                    <div class="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg p-5 shadow-md">
                        <h3 id="label-score" class="text-white font-semibold mb-1 text-lg"></h3>
                        <p id="desc-score" class="text-white text-xs mb-3 opacity-80"></p>
                        <div class="flex items-center">
                            <div id="score-result" class="text-white text-3xl font-bold">0</div>
                            <div class="ml-2 text-white text-2xl">/10</div>
                        </div>
                        <div class="w-full bg-white bg-opacity-30 rounded-full h-2.5 mt-2">
                            <div id="score-progress" class="bg-white h-2.5 rounded-full" style="width: 0%"></div>
                        </div>
                        <div class="relative mt-1 group">
                            <button type="button" class="text-white opacity-80 hover:opacity-100 text-xs flex items-center">
                                <span>Se detaljer</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                            <div id="tooltip-score" class="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 w-52">
                                <!-- Tooltip content will be added by JS -->
                            </div>
                        </div>
                        <p id="max-epc-text" class="text-white text-xs mt-3 opacity-80"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean(); // Return the buffered content
}
add_shortcode('epc_calculator', 'epc_calculator_shortcode');

// Add settings page
function epc_calculator_add_admin_menu() {
    add_options_page(
        'EPC Calculator Settings',
        'EPC Calculator',
        'manage_options',
        'epc-calculator',
        'epc_calculator_settings_page'
    );
}
add_action('admin_menu', 'epc_calculator_add_admin_menu');

// Settings page content
function epc_calculator_settings_page() {
    ?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        <p>Brug nedenstående shortcode for at vise EPC beregneren på din side:</p>
        <code>[epc_calculator]</code>
        
        <p>Du kan også vælge valuta:</p>
        <code>[epc_calculator currency="USD"]</code>
        
        <p>Hvis du bruger Elementor, kan du også tilføje beregneren med vores Elementor widget.</p>
    </div>
    <?php
}

// Create necessary directories on plugin activation
function epc_calculator_activate() {
    // Create the assets directory if it doesn't exist
    if (!file_exists(EPC_CALCULATOR_PLUGIN_DIR . 'assets')) {
        wp_mkdir_p(EPC_CALCULATOR_PLUGIN_DIR . 'assets');
    }
    
    // Create the css subdirectory
    if (!file_exists(EPC_CALCULATOR_PLUGIN_DIR . 'assets/css')) {
        wp_mkdir_p(EPC_CALCULATOR_PLUGIN_DIR . 'assets/css');
    }
    
    // Create the js subdirectory
    if (!file_exists(EPC_CALCULATOR_PLUGIN_DIR . 'assets/js')) {
        wp_mkdir_p(EPC_CALCULATOR_PLUGIN_DIR . 'assets/js');
    }
}
register_activation_hook(__FILE__, 'epc_calculator_activate');

// Check if Elementor is active and load widget
function epc_calculator_check_for_elementor() {
    if (did_action('elementor/loaded')) {
        require_once EPC_CALCULATOR_PLUGIN_DIR . 'elementor/widget.php';
    }
}
add_action('plugins_loaded', 'epc_calculator_check_for_elementor');
