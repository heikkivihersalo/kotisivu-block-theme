<?php
/**
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme
 */

namespace Kotisivu\BlockTheme\Theme\Api;

use Kotisivu\BlockTheme\Theme\Api\Routes\OptionsRoute;

/**
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Routes {
	/**
	 * The ID of this plugin.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * API version number
	 *
	 * @since 2.0.0
	 * @access private
	 * @var string $api_version The version of the API
	 */
	private $api_version;

	/**
	 * Constructor
	 *
	 * @since    2.0.0
	 * @access   public
	 */
	public function __construct( $plugin_name, $version, $api_version ) {
		$this->plugin_name = $plugin_name;
		$this->version     = $version;
		$this->api_version = $api_version;
	}

	/**
	 * Initialize class
	 *
	 * @return void
	 */
	public function register() {
		$options = new OptionsRoute( 'options' );
		$options->register_crud_endpoints();
		$options->register_custom_endpoints();
	}
}
