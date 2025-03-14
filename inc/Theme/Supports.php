<?php
/**
 * Class for handling customizations for the theme supports
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Uploads
 */

namespace Kotisivu\BlockTheme\Theme;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\Common\Loader;
use Kotisivu\BlockTheme\Theme\Common\Traits\ThemeDefaults;

/**
 * Class for handling customizations for the theme supports
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Uploads
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Supports {
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
	 * Set theme supports
	 *
	 * @since    2.0.0
	 * @access   public
	 * @return   void
	 */
	public function add_theme_supports() {
		add_theme_support( 'wp-block-styles' );
		add_theme_support( 'align-wide' );
		add_theme_support( 'custom-logo' );
		add_theme_support( 'menus' );
		add_theme_support( 'editor-styles' );
	}

	/**
	 * Remove theme supports
	 *
	 * @since    2.0.0
	 * @access   public
	 * @return   void
	 */
	public function remove_theme_supports() {
		remove_theme_support( 'core-block-patterns' );
	}

	/**
	 * Registers hooks for the loader
	 *
	 * @since 2.0.0
	 * @access public
	 * @return void
	 */
	public function register_hooks() {
		$this->loader->add_action( 'after_setup_theme', $this, 'add_theme_supports' );
		$this->loader->add_action( 'after_setup_theme', $this, 'remove_theme_supports' );
	}
}
