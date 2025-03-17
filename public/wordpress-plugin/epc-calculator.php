
<?php
/**
 * Plugin Name: EPC Calculator
 * Plugin URI: https://yourwebsite.com
 * Description: A powerful EPC (Earnings Per Click) calculator for affiliate marketers.
 * Version: 1.0.0
 * Author: Your Name
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
    wp_enqueue_style(
        'epc-calculator-styles',
        EPC_CALCULATOR_PLUGIN_URL . 'assets/css/epc-calculator.css',
        array(),
        EPC_CALCULATOR_VERSION
    );
    
    wp_enqueue_script(
        'epc-calculator-script',
        EPC_CALCULATOR_PLUGIN_URL . 'assets/js/epc-calculator-widget.js',
        array(),
        EPC_CALCULATOR_VERSION,
        true
    );
}
add_action('wp_enqueue_scripts', 'epc_calculator_enqueue_scripts');

// Register shortcode
function epc_calculator_shortcode() {
    return '<div class="epc-calculator-container"><epc-calculator></epc-calculator></div>';
}
add_shortcode('epc_calculator', 'epc_calculator_shortcode');

// Add Elementor widget if Elementor is active
function epc_calculator_check_for_elementor() {
    if (did_action('elementor/loaded')) {
        require_once EPC_CALCULATOR_PLUGIN_DIR . 'elementor/widget.php';
    }
}
add_action('plugins_loaded', 'epc_calculator_check_for_elementor');
