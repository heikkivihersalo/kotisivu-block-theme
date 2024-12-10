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
use Kotisivu\BlockTheme\Theme\Common\Traits\DisableUnsecureEndpoints;

/**
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Security {
	use DisableUnsecureEndpoints;

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
	 * Register all of the hooks related to the API security enhancements
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function remove_json_api() {
		/**
		 * Remove JSON API
		 */
		$this->loader->add_filter( 'json_enabled', $this, '__return_false' );
		$this->loader->add_filter( 'json_jsonp_enabled', $this, '__return_false' );
		$this->loader->add_filter( 'rest_jsonp_enabled', $this, '__return_false' );
		$this->loader->add_filter( 'embed_oembed_discover', $this, '__return_false' );

		$this->loader->remove_action( 'wp_head', 'rest_output_link_wp_head', 10 );
		$this->loader->remove_action( 'wp_head', 'wp_oembed_add_discovery_links', 10 );
		$this->loader->remove_action( 'rest_api_init', 'wp_oembed_register_route' );
		$this->loader->remove_filter( 'oembed_dataparse', 'wp_filter_oembed_result', 10 );
		$this->loader->remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
		$this->loader->remove_action( 'wp_head', 'wp_oembed_add_host_js' );
		$this->loader->remove_action( 'template_redirect', 'rest_output_link_header', 11, 0 );
	}

	/**
	 * Register all of the hooks related to the API security enhancements
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function remove_unsecure_endpoints() {
		$this->loader->add_filter( 'rest_authentication_errors', $this, 'disable_rest_api_for_non_logged_in_users' );
		$this->loader->add_filter( 'rest_endpoints', $this, 'disable_rest_api_user_endpoints' );
	}

	/**
	 * Register all of the hooks related to the security enhancements
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_security_enhancements() {
		$this->loader->add_action( 'init', $this, 'remove_wp_version' );
		$this->loader->add_action( 'wp_default_scripts', $this, 'disable_xmlrpc', 9999 );
		$this->loader->add_action( 'template_redirect', $this, 'disable_author_pages' );
		$this->loader->add_filter( 'http_request_args', $this, 'disable_theme_update', 10, 2 );
	}

	/**
	 * Remove WordPress version from header
	 *
	 * @since 2.0.0
	 * @access private
	 * @return void
	 */
	private function remove_wp_versions() {
		$this->loader->remove_action( 'wp_head', 'wp_generator' );
		$this->loader->remove_action( 'wp_head', 'wc_generator_tag' );
	}

	/**
	 * Disable XML-RPC
	 *
	 * @since 2.0.0
	 * @access private
	 * @return void
	 */
	private function disable_xmlrpc() {
		$this->loader->add_filter( 'xmlrpc_enabled', $this, '__return_false' );
	}


	/**
	 * Registers hooks for the loader
	 *
	 * @since 2.0.0
	 * @access public
	 * @return void
	 */
	public function register_hooks() {
		$this->remove_json_api();
		$this->remove_unsecure_endpoints();
		$this->set_security_enhancements();
		$this->remove_wp_versions();
		$this->disable_xmlrpc();
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
	 * Retrieve the version number of the theme.
	 *
	 * @since     2.0.0
	 * @return    string    The version number of the theme.
	 */
	public function get_version() {
		return $this->version;
	}
}
