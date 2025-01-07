<?php
/**
 *
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\CustomPostTypes\Enqueue
 */

namespace Kotisivu\BlockTheme\Theme\CustomPostTypes;

use Kotisivu\BlockTheme\Theme\Admin\Traits\AdminPage;
use Kotisivu\BlockTheme\Theme\Common\Enqueue as CommonEnqueue;
use Kotisivu\BlockTheme\Theme\Common\Interfaces\EnqueueInterface;

/**
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\CustomPostTypes\Enqueue
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Enqueue extends CommonEnqueue implements EnqueueInterface {
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
	 * Constructor
	 *
	 * @since    2.0.0
	 * @access   public
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

		$this->enqueue_script( $asset_path, $script_url, 'ksd-cpt' );
	}
}
