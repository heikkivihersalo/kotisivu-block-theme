<?php
/**
 * Checks if the current page is the plugin's editor page
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Admin\Traits
 */

namespace Kotisivu\BlockTheme\Admin\Traits;

/**
 * Checks if the current page is the plugin's editor page
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Admin\Traits
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
trait AdminPage {
	/**
	 * Check if the current page is the plugin's editor page
	 *
	 * @since    0.2.0
	 * @param string $hook The current admin page
	 * @return bool
	 */
	private function is_editor_page( string $hook ): bool {
		return str_contains( $hook, 'post-new.php' ) || str_contains( $hook, 'post.php' );
	}
}
