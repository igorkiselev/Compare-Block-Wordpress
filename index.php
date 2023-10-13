<?php
/**
 * Plugin Name: Compare block
 * Plugin URI: http://www.justbenice.ru/wordpress/compare/
 * Description: Fixed block that is placed on top of all other content on the page.
 * Text Domain: jbn
 * Author: Just Be Nice
 * Author URI: http://www.justbenice.ru/
 * Version: 1.0
 */


if (!class_exists('justbenice_block_compare')) {
	class justbenice_block_compare
	{
		private function version()
		{
			return WP_DEBUG ? rand(0, 100000) : false;
		}
		private function assets($filename  = null)
		{
			return trailingslashit(plugin_dir_url(__FILE__)).'assets/'. ($filename ? $filename : '') ;
		}
		public function __construct()
		{
			add_action('plugins_loaded', array($this, 'initialize'));
		}
		public function initialize()
		{
			add_action('wp_enqueue_scripts', array($this , 'enqueue'));
			add_filter('block_categories_all', array($this , 'category'), 10, 2 );
			add_action('init', array($this , 'blocks'));
		
		}
		public function blocks(){
			if (! function_exists('register_block_type')) {
				return;
			}
			$basic = array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-block-editor' );
			wp_register_script('jbn-compare', $this->assets('blocks/compare.min.js'), $basic, $this->version(), true);
			register_block_type('jbn/compare', array('editor_script' => 'jbn-compare'));
			
		}
		public function enqueue(){
			wp_enqueue_script('jquery');
			
			wp_register_style('jquery-compare-block-style', $this->assets('enqueue/compare-styles.css'));
			wp_register_script('jquery-compare-eventmove', $this->assets('enqueue/jquery.event.move.min.js'), array('jquery'), $this->version(), true);
			wp_register_script('jquery-compare-script', $this->assets('enqueue/jquery.comparison.min.js'), array('jquery'), $this->version(), true);
			
			wp_enqueue_style('jquery-compare-block-style');
			wp_enqueue_script('jquery-compare-eventmove');
			wp_enqueue_script('jquery-compare-script');
			
		}
		
		public function category( $_categories, $_context ){
			
			if ( ! empty( $_context->post ) ) {
			
				$return = array_map( fn($value): string => $value['slug'], $_categories);
			
				!in_array('jbn', $return) ? array_push(
					$_categories,
					array(
						'slug'  => 'jbn',
						'title' => __( 'Just Be Nice blocks'),
						'icon'  => null,
					)
				) : null;
			}
			return $_categories;
		}
	}
	new justbenice_block_compare();
}
