<?php
/**
 * The enqueue scripts class.
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Gutenberg_Native_Ai
 */

namespace Kotisivu\BlockTheme\Theme\Admin\Scripts;

use Kotisivu\BlockTheme\Theme\Admin\Traits\AdminPage;
use Kotisivu\BlockTheme\Theme\Common\Enqueue;
use Kotisivu\BlockTheme\Theme\Common\Interfaces\EnqueueInterface;

/**
 * The enqueued scripts functionality of the plugin.
 *
 * @package    Gutenberg_Native_Ai
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class CustomPostTypes extends Enqueue implements EnqueueInterface {
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

		$asset_path = SITE_PATH . '/build/assets/cpt.asset.php';
		$script_url = SITE_URI . '/build/assets/cpt.js';

		$this->enqueue_script( $asset_path, $script_url );
	}
}