<?php
/**
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme
 */

namespace Kotisivu\BlockTheme\Theme;

use Kotisivu\BlockTheme\Theme\Api\Routes;
use Kotisivu\BlockTheme\Theme\Api\Ajax;
use Kotisivu\BlockTheme\Theme\Api\RestFields;
use Kotisivu\BlockTheme\Theme\Common\Loader;

/**
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Api {
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
	public function __construct( Loader $loader, string $theme_name, string $version, string $api_version ) {
		$this->loader     = $loader;
		$this->theme_name = $theme_name;
		$this->version    = $version;
        $this->api_version = $api_version;
	}

	/**
	 * Register the API routes for the theme.
	 *
	 * @since    2.0.0
	 * @access   public
	 * @return   void
	 */
	private function set_api_routes() {
		$api = new Routes( $this->theme_name, $this->version, $this->api_version );
		$this->loader->add_action( 'rest_api_init', $api, 'register' );
	}

	/**
	 * Register the AJAX hooks for the theme.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_ajax_hooks() {
		$ajax = new Ajax();
		$this->loader->add_action( 'init', $ajax, 'register' );
	}

	/**
	 * Register the custom REST fields for the theme.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_api_rest_fields() {
		$fields = new RestFields( $this->theme_name, $this->version );
		$this->loader->add_action( 'rest_api_init', $fields, 'register' );
	}

	/**
	 * Registers hooks for the loader
	 *
	 * @since 2.0.0
	 * @access public
	 * @return void
	 */
	public function register_hooks() {
		$this->set_api_routes();
		$this->set_ajax_hooks();
		$this->set_api_rest_fields();
	}
}
