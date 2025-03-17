
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

// Create assets directories if they don't exist
function epc_calculator_create_directories() {
    if (!file_exists(EPC_CALCULATOR_PLUGIN_DIR . 'assets')) {
        mkdir(EPC_CALCULATOR_PLUGIN_DIR . 'assets');
    }
    if (!file_exists(EPC_CALCULATOR_PLUGIN_DIR . 'assets/css')) {
        mkdir(EPC_CALCULATOR_PLUGIN_DIR . 'assets/css');
    }
    if (!file_exists(EPC_CALCULATOR_PLUGIN_DIR . 'assets/js')) {
        mkdir(EPC_CALCULATOR_PLUGIN_DIR . 'assets/js');
    }
}
register_activation_hook(__FILE__, 'epc_calculator_create_directories');

// Register scripts and styles
function epc_calculator_enqueue_scripts() {
    wp_enqueue_style(
        'epc-calculator-styles',
        EPC_CALCULATOR_PLUGIN_URL . 'assets/css/epc-calculator.css',
        array(),
        EPC_CALCULATOR_VERSION
    );
    
    wp_enqueue_script(
        'epc-calculator-widget',
        EPC_CALCULATOR_PLUGIN_URL . 'assets/js/epc-calculator-widget.js',
        array(),
        EPC_CALCULATOR_VERSION,
        true
    );
}
add_action('wp_enqueue_scripts', 'epc_calculator_enqueue_scripts');

// Register shortcode
function epc_calculator_shortcode($atts) {
    $atts = shortcode_atts(array(
        'currency' => 'DKK',
    ), $atts, 'epc_calculator');
    
    return '<div class="epc-calculator-container" data-currency="' . esc_attr($atts['currency']) . '"><epc-calculator></epc-calculator></div>';
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

