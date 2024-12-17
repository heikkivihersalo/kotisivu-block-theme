<?php
/**
 * Remove unnecessary items from admin UI
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Common
 */

namespace Kotisivu\BlockTheme\Theme\Admin\Traits;

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
			update_user_option(
				$user_id,
				$meta_key,
				array(
					'dashboard_site_health',
					'dashboard_right_now',
					'dashboard_activity',
					'dashboard_quick_press',
					'dashboard_primary',
					'llar_stats_widget', // Limit Login Attempts Reloaded plugin
					'fluentform_stat_widget', // Fluent Forms plugin
				),
				true
			);
		}
	}

	/**
	 * Remove admin bar items
	 *
	 * @return void
	 */
	public function remove_admin_bar_items() {
		global $wp_admin_bar;

		$options = array(
			'wp-logo'      => array(
				'remove'   => true,
				'children' => array(
					'about'         => true,
					'wporg'         => true,
					'documentation' => true,
					'support-forum' => true,
					'feedback'      => true,
				),
			),
			'site-name'    => array(
				'remove'   => false,
				'children' => array(
					'dashboard' => false,
					'themes'    => true,
					'menus'     => true,
				),
			),
			'updates'      => array(
				'remove'   => true,
				'children' => array(),
			),
			'site-editor'  => array(
				'remove'   => true,
				'children' => array(),
			),
			'customize'    => array(
				'remove'   => false,
				'children' => array(),
			),
			'comments'     => array(
				'remove'   => true,
				'children' => array(),
			),
			'new-content'  => array(
				'remove'   => true,
				'children' => array(),
			),
			'new-post'     => array(
				'remove'   => true,
				'children' => array(),
			),
			'new-media'    => array(
				'remove'   => true,
				'children' => array(),
			),
			'new-page'     => array(
				'remove'   => true,
				'children' => array(),
			),
			'new-user'     => array(
				'remove'   => true,
				'children' => array(),
			),
			'edit'         => array(
				'remove'   => false,
				'children' => array(),
			),
			'user-actions' => array( // to the right - next to your avatar image
				'remove'   => false,
				'children' => array(
					'user-info'    => false,
					'edit-profile' => false,
					'logout'       => false,
				),
			),
			'search'       => array(
				'remove'   => true,
				'children' => array(),
			),
			'llar-root'    => array( // Limit Login Attempts Reloaded Plugin
				'remove'   => true,
				'children' => array(),
			),
		);

		foreach ( $options as $key => $value ) {
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
