<?php
/**
 * The security-specific functionality of the theme.
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Security
 */

namespace Kotisivu\BlockTheme\Theme;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\Common\Loader;
use Kotisivu\BlockTheme\Theme\Common\Traits\ThemeDefaults;
use Kotisivu\BlockTheme\Theme\Common\Utils\Security as SecurityUtils;
use Kotisivu\BlockTheme\Theme\Common\Interfaces\RegisterHooksInterface;

/**
 * The security-specific functionality of the theme.
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Security
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Security implements RegisterHooksInterface {
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
		$this->loader->add_filter( 'json_enabled', null, '__return_false' );
		$this->loader->add_filter( 'json_jsonp_enabled', null, '__return_false' );
		$this->loader->add_filter( 'rest_jsonp_enabled', null, '__return_false' );
		$this->loader->add_filter( 'embed_oembed_discover', null, '__return_false' );

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
		$this->loader->add_filter( 'rest_endpoints', SecurityUtils::class, 'disable_rest_api_user_endpoints' );
	}

	/**
	 * Register all of the hooks related to the security enhancements
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_security_enhancements() {
		$this->loader->add_action( 'wp_default_scripts', $this, 'disable_xmlrpc', 9999 );
		$this->loader->add_action( 'template_redirect', SecurityUtils::class, 'disable_author_pages' );
		$this->loader->add_filter( 'http_request_args', SecurityUtils::class, 'disable_theme_update', 10, 2 );
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
	public function disable_xmlrpc() {
		$this->loader->add_filter( 'xmlrpc_enabled', null, '__return_false' );
	}

	/**
	 * @inheritDoc
	 */
	public function register_hooks() {
		$this->remove_json_api();
		$this->remove_unsecure_endpoints();
		$this->set_security_enhancements();
		$this->remove_wp_versions();
		$this->disable_xmlrpc();
	}
}
