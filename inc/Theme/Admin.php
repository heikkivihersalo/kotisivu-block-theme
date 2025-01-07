<?php
/**
 * The admin-specific functionality of the theme.
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Admin
 */

namespace Kotisivu\BlockTheme\Theme;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\Admin\Enqueue;
use Kotisivu\BlockTheme\Theme\Admin\Pages;
use Kotisivu\BlockTheme\Theme\Admin\Cleanup;
use Kotisivu\BlockTheme\Theme\Admin\Duplicate;
use Kotisivu\BlockTheme\Theme\Common\Interfaces\RegisterHooksInterface;
use Kotisivu\BlockTheme\Theme\Common\Loader;
use Kotisivu\BlockTheme\Theme\Common\Utils\Helpers as HelperUtils;
use Kotisivu\BlockTheme\Theme\Common\Utils\Media as MediaUtils;
use Kotisivu\BlockTheme\Theme\Common\Traits\ThemeDefaults;

/**
 * The admin-specific functionality of the theme.
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Admin
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Admin implements RegisterHooksInterface {
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
	 * Register all of the hooks related to the admin pages functionality
	 * of the theme.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function add_admin_pages() {
		$admin = new Pages( $this->theme_name, $this->version );

		$this->loader->add_action( 'admin_menu', $admin, 'setup_theme_options' );
		$this->loader->add_action( 'admin_enqueue_scripts', $admin, 'enqueue_theme_options' );
	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the theme.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_admin_scripts_and_styles() {
		$admin = new Enqueue( $this->theme_name, $this->version );
		$this->loader->add_action( 'admin_enqueue_scripts', $admin, 'enqueue_scripts_and_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', MediaUtils::class, 'add_wp_media_support' );
		$this->loader->add_action( 'admin_init', $admin, 'set_editor_styles' );
	}

	/**
	 * Remove WP admin bar items
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_cleanup() {
		$this->loader->add_action( 'admin_bar_menu', Cleanup::class, 'remove_admin_bar_items' );
		$this->loader->add_action( 'admin_menu', Cleanup::class, 'set_default_dashboard_metaboxes' );
	}

	/**
	 * Setup for post duplication feature
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_duplicate() {
		$this->loader->add_action( 'admin_action_create_duplicate_post_as_draft', Duplicate::class, 'create_duplicate_post_as_draft' );
		$this->loader->add_filter( 'post_row_actions', Duplicate::class, 'add_duplicate_post_link_to_admin', 10, 2 );
		$this->loader->add_filter( 'page_row_actions', Duplicate::class, 'add_duplicate_post_link_to_admin', 10, 2 );
		$this->loader->add_action( 'admin_notices', Duplicate::class, 'show_duplicate_admin_notice' );
	}

	/**
	 * Enable customizer
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function enable_customizer() {
		$this->loader->add_action( 'customize_register', HelperUtils::class, 'return_true' );
	}

	/**
	 * @inheritDoc
	 */
	public function register_hooks() {
		$this->set_cleanup();
		$this->enable_customizer();
		$this->set_duplicate();
		$this->add_admin_pages();
		$this->set_admin_scripts_and_styles();
	}
}
