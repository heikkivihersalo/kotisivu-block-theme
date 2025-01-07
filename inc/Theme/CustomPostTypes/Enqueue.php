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

use Kotisivu\BlockTheme\Theme\Common\Utils\Helpers as HelpersUtils;
use Kotisivu\BlockTheme\Theme\Common\Enqueue as CommonEnqueue;
use Kotisivu\BlockTheme\Theme\Common\Interfaces\EnqueueInterface;

/**
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\CustomPostTypes\Enqueue
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Enqueue extends CommonEnqueue implements EnqueueInterface {
	/**
	 * Run the editor scripts and styles
	 *
	 * @since    0.2.0
	 * @param string $hook The current admin page
	 * @return void
	 */
	public function enqueue_scripts_and_styles( string $hook = '' ): void {
		if ( ! HelpersUtils::is_editor_page( $hook ) ) {
			return;
		}

		$asset_path = SITE_PATH . '/build/assets/cpt.asset.php';
		$script_url = SITE_URI . '/build/assets/cpt.js';

		$this->enqueue_script( $asset_path, $script_url, 'ksd-cpt' );
	}
}
