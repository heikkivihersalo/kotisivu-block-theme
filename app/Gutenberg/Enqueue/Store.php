<?php
/**
 * The enqueue scripts class.
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Gutenberg_Native_Ai
 */

namespace Kotisivu\BlockTheme\Gutenberg\Enqueue;

use Kotisivu\BlockTheme\Theme\Common\Enqueue as CommonEnqueue;
use Kotisivu\BlockTheme\Theme\Common\Interfaces\EnqueueInterface;

/**
 * The enqueued scripts functionality of the plugin.
 *
 * @package    Gutenberg_Native_Ai
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Store extends CommonEnqueue implements EnqueueInterface {
	/**
	 * Run the editor scripts and styles
	 *
	 * @since    0.2.0
	 * @param string $hook The current admin page
	 * @return void
	 */
	public function enqueue_scripts_and_styles( string $hook = '' ): void {
		$asset_path = SITE_PATH . '/build/assets/store.asset.php';
		$script_url = SITE_URI . '/build/assets/store.js';

		$this->enqueue_script( $asset_path, $script_url, 'ksd-store' );
	}
}
