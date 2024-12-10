<?php
/**
 * The enqueue scripts class.
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Gutenberg_Native_Ai
 */

namespace Kotisivu\BlockTheme\Admin\Scripts;

use Kotisivu\BlockTheme\Admin\Traits\AdminPage;
use Kotisivu\BlockTheme\Common\Enqueue;
use Kotisivu\BlockTheme\Common\Interfaces\EnqueueInterface;

/**
 * The enqueued scripts functionality of the plugin.
 *
 * @package    Gutenberg_Native_Ai
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class FontAwesome extends Enqueue implements EnqueueInterface {
	use AdminPage;

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
	 * Initialize the class and set its properties.
	 *
	 * @since 2.0.0
	 * @access public
	 * @param string $plugin_name The name of this plugin.
	 * @param string $version The version of this plugin.
	 * @return void
	 */
	public function __construct( $plugin_name, $version ) {
		$this->plugin_name = $plugin_name;
		$this->version     = $version;
	}

	/**
	 * Run the editor scripts and styles
	 *
	 * @since    0.2.0
	 * @param string $hook The current admin page
	 * @return void
	 */
	public function enqueue_scripts_and_styles( string $hook = '' ): void {
		if ( ! $this->is_editor_page( $hook ) ) {
			return;
		}

		wp_register_style( 'ksd-fontawesome-brands', SITE_URI . '/public/icons/fontawesome/css/brands.min.css', '', filemtime( SITE_PATH . '/public/icons/fontawesome/css/brands.min.css' ), 'all' );
		wp_register_style( 'ksd-fontawesome-regular', SITE_URI . '/public/icons/fontawesome/css/regular.min.css', '', filemtime( SITE_PATH . '/public/icons/fontawesome/css/regular.min.css' ), 'all' );
		wp_register_style( 'ksd-fontawesome-solid', SITE_URI . '/public/icons/fontawesome/css/solid.min.css', '', filemtime( SITE_PATH . '/public/icons/fontawesome/css/solid.min.css' ), 'all' );

		wp_enqueue_style( 'ksd-fontawesome-brands' );
		wp_enqueue_style( 'ksd-fontawesome-regular' );
		wp_enqueue_style( 'ksd-fontawesome-solid' );
	}
}
