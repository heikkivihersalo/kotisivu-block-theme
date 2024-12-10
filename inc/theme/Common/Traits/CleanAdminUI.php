<?php
/**
 * Remove unnecessary items from admin UI
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Common
 */

namespace Kotisivu\BlockTheme\Theme\Common\Traits;

/**
 * Remove unnecessary items from admin UI
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Common
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
trait CleanAdminUI {
	/**
	 * Set default dashboard metaboxes
	 *
	 * @param int $user_id User ID
	 * @return void
	 */
	public function set_default_dashboard_metaboxes( $user_id = null ) {
		if ( ! $user_id ) {
			$user_id = get_current_user_id();
		}

		$meta_key = 'metaboxhidden_dashboard';

		if ( ! get_user_option( $meta_key, $user_id ) ) {
			update_user_option( $user_id, $meta_key, SITE_SETTINGS['admin']['dashboard'], true );
		}
	}

	/**
	 * Remove admin bar items
	 *
	 * @return void
	 */
	public function remove_admin_bar_items() {
		global $wp_admin_bar;

		foreach ( SITE_SETTINGS['admin']['bar'] as $key => $value ) {
			if ( $value['remove'] ) {
				$wp_admin_bar->remove_menu( $key );
			} else {
				foreach ( $value['children'] as $child => $remove ) {
					if ( $remove ) {
						$wp_admin_bar->remove_menu( $child );
					}
				}
			}
		}
	}
}
