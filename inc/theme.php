<?php
/**
 * The core theme class.
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme
 */

namespace Kotisivu\BlockTheme;

use Kotisivu\BlockTheme\Theme\Common\Loader;

use Kotisivu\BlockTheme\Theme\Admin;
use Kotisivu\BlockTheme\Theme\Api;
use Kotisivu\BlockTheme\Theme\Cleanup;
use Kotisivu\BlockTheme\Theme\Dequeue;
use Kotisivu\BlockTheme\Theme\Enqueue;
use Kotisivu\BlockTheme\Theme\Excerpt;
use Kotisivu\BlockTheme\Theme\i18n;
use Kotisivu\BlockTheme\Theme\Image;
use Kotisivu\BlockTheme\Theme\Meta;
use Kotisivu\BlockTheme\Theme\Security;
use Kotisivu\BlockTheme\Theme\Uploads;

/**
 * The core theme class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this theme as well as the current
 * version of the theme.
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Theme {
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
	 * The current version of the API.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      string    $api_version    The current version of the API.
	 */
	protected $api_version;

	/**
	 * Define the core functionality of the theme.
	 *
	 * Set the theme name and the theme version that can be used throughout the theme.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    2.0.0
	 */
	public function __construct() {
		$this->version     = defined( 'KOTISIVU_BLOCK_THEME_VERSION' ) ? KOTISIVU_BLOCK_THEME_VERSION : '2.0.0';
		$this->api_version = defined( 'KOTISIVU_BLOCK_THEME_API_VERSION' ) ? KOTISIVU_BLOCK_THEME_API_VERSION : '2';
		$this->theme_name  = 'kotisivu-block-theme';

		$this->create_loader();

		$this->set_admin();
		$this->set_api();
		$this->set_cleanup();
		$this->set_dequeue();
		$this->set_enqueue();
		$this->set_custom_excerpt();
		$this->set_i18n();
		$this->set_custom_image();
		$this->set_meta();
		$this->set_security();
		$this->set_uploads();
	}

	/**
	 * Initialize the loader to execute all hooks with WordPress.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function create_loader() {
		$this->loader = new Loader();
	}

	/**
	 * Register all of the hooks related to the admin area
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_admin() {
		$admin = new Admin( $this->loader, $this->theme_name, $this->version );
		$admin->register_hooks();
	}

	/**
	 * Register all of the hooks related to the API for the theme
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_api() {
		$api = new Api( $this->loader, $this->theme_name, $this->version, $this->api_version );
		$api->register_hooks();
	}

	/**
	 * Register all of the hooks related to junk cleanup for the theme
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_cleanup() {
		$cleanup = new Cleanup( $this->loader, $this->theme_name, $this->version );
		$cleanup->register_hooks();
	}

	/**
	 * Register all of the hooks related to dequeeing scripts and styles for the theme
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_dequeue() {
		$dequeue = new Dequeue( $this->loader, $this->theme_name, $this->version );
		$dequeue->register_hooks();
	}

	/**
	 * Register all of the hooks related to the scripts and styles.
	 *
	 * @since    2.0.0
	 * @access   private
	 */
	private function set_enqueue() {
		$enqueue = new Enqueue( $this->loader, $this->theme_name, $this->version );
		$enqueue->register_hooks();
	}

	/**
	 * Register all of the hooks related to the custom excerpt
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_custom_excerpt() {
		$excerpt = new Excerpt( $this->loader, $this->theme_name, $this->version );
		$excerpt->register_hooks();
	}

	/**
	 * Define the locale for this theme for internationalization.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_i18n() {
		$i18n = new i18n();
		$this->loader->add_action( 'themes_loaded', $i18n, 'load_textdomain' );
	}

	/**
	 * Register all of the hooks related to the custom image sizes for the theme
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_custom_image() {
		$image = new Image( $this->loader, $this->theme_name, $this->version );
		$image->register_hooks();
	}

	/**
	 * Register all of the hooks related to the meta for the theme
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_meta() {
		$meta = new Meta( $this->loader, $this->theme_name, $this->version );
		$meta->register_hooks();
	}

	/**
	 * Register all of the hooks related to security enhancements for the theme
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_security() {
		$security = new Security( $this->loader, $this->theme_name, $this->version );
		$security->register_hooks();
	}

	/**
	 * Register all of the hooks related to uploads for the theme
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_uploads() {
		$uploads = new Uploads( $this->loader, $this->theme_name, $this->version );
		$uploads->register_hooks();
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    2.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the theme used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     2.0.0
	 * @return    string    The name of the theme.
	 */
	public function get_theme_name() {
		return $this->theme_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the theme.
	 *
	 * @since     2.0.0
	 * @return    Loader    Orchestrates the hooks of the theme.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the theme.
	 *
	 * @since     2.0.0
	 * @return    string    The version number of the theme.
	 */
	public function get_version() {
		return $this->version;
	}

	/**
	 * Retrieve the version number of the API.
	 *
	 * @since     2.0.0
	 * @return    string    The version number of the API.
	 */
	public function get_api_version() {
		return $this->api_version;
	}
}
