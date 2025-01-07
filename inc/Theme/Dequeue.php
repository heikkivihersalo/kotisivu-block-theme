<?php
/**
 * Dequeue styles and scripts
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Dequeue
 */

namespace Kotisivu\BlockTheme\Theme;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\Common\Loader;
use Kotisivu\BlockTheme\Theme\Common\Traits\ThemeDefaults;

/**
 * Functions for dequeueing styles and scripts
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Dequeue
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Dequeue {
	use ThemeDefaults;

	/**
	 * Constructor
	 *
	 * @since    2.0.0
	 * @access   public
	 */
	public function __construct( Loader $loader, string $theme_name, string $version ) {
		$this->loader     = $loader;
		$this->theme_name = $theme_name;
		$this->version    = $version;
	}

	/**
	 * Dequeue block library styles
	 *
	 * @return void
	 */
	public function dequeue_block_library_styles() {
		wp_dequeue_style( 'wp-block-library' );
		wp_dequeue_style( 'wp-block-library-theme' );
		wp_dequeue_style( 'wc-blocks-style' );
	}

	/**
	 * Dequeue Fluent Form styles
	 *
	 * @return void
	 */
	public function dequeue_fluent_form_styles() {
		if ( in_array( 'fluentform/fluentform.php', (array) get_option( 'active_plugins', array() ), true ) ) :
			wp_deregister_style( 'fluentform-public-default' );
			wp_dequeue_style( 'fluentform-public-default' );
			wp_deregister_style( 'fluent-form-styles' );
			wp_dequeue_style( 'fluent-form-styles' );
		endif;
	}

	/**
	 * Dequeue global styles
	 *
	 * @return void
	 */
	public function dequeue_global_styles() {
		wp_dequeue_style( 'wp-global-styles' );
	}

	/**
	 * Registers hooks for the loader
	 *
	 * @since 2.0.0
	 * @access public
	 * @return void
	 */
	public function register_hooks() {
		$this->loader->add_action( 'wp_enqueue_scripts', $this, 'dequeue_block_library_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $this, 'dequeue_fluent_form_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $this, 'dequeue_global_styles' );
	}
}
