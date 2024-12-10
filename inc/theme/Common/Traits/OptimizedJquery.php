<?php
/**
 * Optimized jQuery for the theme
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Common
 */

namespace Kotisivu\BlockTheme\Theme\Common\Traits;

/**
 * Optimized jQuery for the theme
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Common
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
trait OptimizedJquery {
	/**
	 * Remove jQuery Migrate script
	 * Original code from: https://dotlayer.com/what-is-migrate-js-why-and-how-to-remove-jquery-migrate-from-wordpress/
	 *
	 * @return  void
	 */
	public function remove_jquery_migrate( $scripts ): void {
		if ( ! is_admin() && isset( $scripts->registered['jquery'] ) ) {
			$script = $scripts->registered['jquery'];

			if ( $script->deps ) { // Check whether the script has any dependencies
				$script->deps = array_diff(
					$script->deps,
					array(
						'jquery-migrate',
					)
				);
			}
		}
	}

	/**
	 * Disable jQuery
	 *
	 * @return void
	 */
	public function move_jquery_to_footer(): void {
		if ( is_user_logged_in() ) {
			return;
		}

		wp_scripts()->add_data( 'jquery', 'group', 1 );
		wp_scripts()->add_data( 'jquery-core', 'group', 1 );
		wp_scripts()->add_data( 'jquery-migrate', 'group', 1 );
	}
}
