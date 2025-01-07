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
use Kotisivu\BlockTheme\Theme\Admin\Traits\DuplicatePosts;
use Kotisivu\BlockTheme\Theme\Admin\Traits\CleanAdminUI;
use Kotisivu\BlockTheme\Theme\Common\Loader;
use Kotisivu\BlockTheme\Theme\Common\Utils;
use Kotisivu\BlockTheme\Theme\Common\Traits\ExtendedMediaSupport;
use Kotisivu\BlockTheme\Theme\Common\Traits\ThemeDefaults;

/**
 * The admin-specific functionality of the theme.
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Admin
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Admin {
	use DuplicatePosts;
	use ExtendedMediaSupport;
	use CleanAdminUI;
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
	 * Add the duplicate posts feature.
	 *
	 * @since 2.0.0
	 * @access private
	 * @return void
	 */
	private function add_duplicate_posts_feature() {
		$this->loader->add_action( 'admin_action_create_duplicate_post_as_draft', $this, 'create_duplicate_post_as_draft' );
		$this->loader->add_filter( 'post_row_actions', $this, 'add_duplicate_post_link_to_admin', 10, 2 );
		$this->loader->add_filter( 'page_row_actions', $this, 'add_duplicate_post_link_to_admin', 10, 2 );
		$this->loader->add_action( 'admin_notices', $this, 'show_duplicate_admin_notice' );
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

		$this->loader->add_action( 'wp_enqueue_scripts', $this, 'add_wp_media_support' );
	}

	/**
	 * Remove WP admin bar items
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function clean_wp_admin_ui() {
		$this->loader->add_action( 'admin_bar_menu', $this, 'remove_admin_bar_items' );
		$this->loader->add_action( 'admin_menu', $this, 'set_default_dashboard_metaboxes' );
	}

	/**
	 * Add editor styles
	 *
	 * @return void
	 */
	public function set_editor_styles(): void {
		add_editor_style( SITE_URI . '/build/assets/theme.css' );
		add_editor_style( SITE_URI . '/build/assets/admin.css' );
		add_editor_style( SITE_URI . '/build/assets/core.css' );
		add_editor_style( SITE_URI . '/build/assets/inline.css' );
	}

	/**
	 * Enable customizer
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function enable_customizer() {
		$this->loader->add_action( 'customize_register', Utils::class, 'return_true' );
	}

	/**
	 * Registers hooks for the loader
	 *
	 * @since 2.0.0
	 * @access public
	 * @return void
	 */
	public function register_hooks() {
		$this->add_duplicate_posts_feature();
		$this->add_admin_pages();
		$this->set_admin_scripts_and_styles();
		$this->enable_customizer();
		$this->clean_wp_admin_ui();
		$this->loader->add_action( 'admin_init', $this, 'set_editor_styles' );
	}
}
