
<?php
/**
 * Plugin Name: EPC Calculator
 * Plugin URI: https://epc.affiliatemanager.dk
 * Description: A powerful EPC (Earnings Per Click) calculator for affiliate marketers.
 * Version: 1.0.0
 * Author: AffiliateManager.dk
 * Author URI: https://affiliatemanager.dk
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
    // Instead of local files, load directly from the subdomain
    wp_enqueue_script(
        'epc-calculator-script',
        'https://epc.affiliatemanager.dk/epc-calculator.js',
        array(),
        EPC_CALCULATOR_VERSION,
        true
    );
}
add_action('wp_enqueue_scripts', 'epc_calculator_enqueue_scripts');

// Register shortcode
function epc_calculator_shortcode($atts) {
    $attributes = shortcode_atts(array(
        'currency' => 'DKK',
    ), $atts);
    
    return '<div class="epc-calculator-container" data-currency="' . esc_attr($attributes['currency']) . '"></div>';
}
add_shortcode('epc_calculator', 'epc_calculator_shortcode');

// Add Elementor widget if Elementor is active
function epc_calculator_check_for_elementor() {
    if (did_action('elementor/loaded')) {
        require_once EPC_CALCULATOR_PLUGIN_DIR . 'elementor/widget.php';
    }
}
add_action('plugins_loaded', 'epc_calculator_check_for_elementor');
