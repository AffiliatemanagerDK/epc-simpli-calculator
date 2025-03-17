
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
        plugin_dir_url(__FILE__) . 'assets/css/epc-calculator.css',
        array('tailwindcss'),
        EPC_CALCULATOR_VERSION
    );
    
    // Enqueue our JavaScript
    wp_enqueue_script(
        'epc-calculator-script',
        plugin_dir_url(__FILE__) . 'assets/js/epc-calculator.js',
        array('jquery'),
        EPC_CALCULATOR_VERSION,
        true
    );

    // Localize script with currency translations
    wp_localize_script(
        'epc-calculator-script',
        'epcCalculatorData',
        array(
            'translations' => array(
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
            )
        )
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
            <!-- Calculator will be rendered here by JavaScript -->
        </div>
    </div>
    <?php
    return ob_get_clean(); // Return the buffered content
}
add_shortcode('epc_calculator', 'epc_calculator_shortcode');

// Add Elementor widget if Elementor is active
function epc_calculator_check_for_elementor() {
    if (did_action('elementor/loaded')) {
        require_once EPC_CALCULATOR_PLUGIN_DIR . 'elementor/widget.php';
    }
}
add_action('plugins_loaded', 'epc_calculator_check_for_elementor');

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
    $css_dir = EPC_CALCULATOR_PLUGIN_DIR . 'assets/css';
    $js_dir = EPC_CALCULATOR_PLUGIN_DIR . 'assets/js';
    
    if (!file_exists(EPC_CALCULATOR_PLUGIN_DIR . 'assets')) {
        mkdir(EPC_CALCULATOR_PLUGIN_DIR . 'assets', 0755, true);
    }
    
    if (!file_exists($css_dir)) {
        mkdir($css_dir, 0755, true);
    }
    
    if (!file_exists($js_dir)) {
        mkdir($js_dir, 0755, true);
    }
}
register_activation_hook(__FILE__, 'epc_calculator_activate');
