
<?php
/**
 * EPC Calculator Elementor Widget
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Register the EPC Calculator widget category
function epc_calculator_elementor_category($elements_manager) {
    $elements_manager->add_category(
        'epc-calculator',
        [
            'title' => esc_html__('EPC Calculator', 'epc-calculator'),
            'icon' => 'fa fa-calculator',
        ]
    );
}
add_action('elementor/elements/categories_registered', 'epc_calculator_elementor_category');

// Register the EPC Calculator widget
function epc_calculator_register_elementor_widget() {
    class Elementor_EPC_Calculator_Widget extends \Elementor\Widget_Base {
        public function get_name() {
            return 'epc_calculator';
        }

        public function get_title() {
            return esc_html__('EPC Calculator', 'epc-calculator');
        }

        public function get_icon() {
            return 'fa fa-calculator';
        }

        public function get_categories() {
            return ['epc-calculator'];
        }

        protected function register_controls() {
            $this->start_controls_section(
                'section_title',
                [
                    'label' => esc_html__('Calculator Settings', 'epc-calculator'),
                    'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
                ]
            );

            $this->add_control(
                'title',
                [
                    'label' => esc_html__('Title', 'epc-calculator'),
                    'type' => \Elementor\Controls_Manager::TEXT,
                    'default' => esc_html__('EPC Calculator for Affiliate Programs', 'epc-calculator'),
                ]
            );

            $this->end_controls_section();
        }

        protected function render() {
            $settings = $this->get_settings_for_display();
            ?>
            <div class="epc-calculator-elementor-widget">
                <?php if (!empty($settings['title'])) : ?>
                    <h2 class="epc-calculator-title"><?php echo esc_html($settings['title']); ?></h2>
                <?php endif; ?>
                <epc-calculator></epc-calculator>
            </div>
            <?php
        }
    }

    \Elementor\Plugin::instance()->widgets_manager->register(new Elementor_EPC_Calculator_Widget());
}
add_action('elementor/widgets/register', 'epc_calculator_register_elementor_widget');
