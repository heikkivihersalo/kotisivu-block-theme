<?php
/**
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme
 */

namespace Kotisivu\BlockTheme\Theme;

use Kotisivu\BlockTheme\Theme\Common\Loader;
/**
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Dequeue {
	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the theme.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      Loader    $loader    Maintains and registers all hooks for the theme.
	 */
	protected $loader;

	/**
	 * The unique identifier of this theme.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      string    $theme_name    The string used to uniquely identify this theme.
	 */
	protected $theme_name;

	/**
	 * The current version of the theme.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the theme.
	 */
	protected $version;

	/**
	 * Define the core functionality of the theme.
	 *
	 * Set the theme name and the theme version that can be used throughout the theme.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    2.0.0
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
