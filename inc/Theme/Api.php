<?php
/**
 * The API functionality of the theme.
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Api
 */

namespace Kotisivu\BlockTheme\Theme;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\Api\Routes;
use Kotisivu\BlockTheme\Theme\Api\Ajax;
use Kotisivu\BlockTheme\Theme\Api\RestFields;
use Kotisivu\BlockTheme\Theme\Common\Loader;
use Kotisivu\BlockTheme\Theme\Common\Traits\ThemeDefaults;
use Kotisivu\BlockTheme\Theme\Common\Interfaces\RegisterHooksInterface;

/**
 * The API functionality of the theme.
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Api
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Api implements RegisterHooksInterface {
	use ThemeDefaults;

	/**
	 * Constructor
	 *
	 * @since    2.0.0
	 * @access   public
	 */
	public function __construct( Loader $loader, string $theme_name, string $version, string $api_version ) {
		$this->loader      = $loader;
		$this->theme_name  = $theme_name;
		$this->version     = $version;
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
	 * @inheritDoc
	 */
	public function register_hooks() {
		$this->set_api_routes();
		$this->set_ajax_hooks();
		$this->set_api_rest_fields();
	}
}
