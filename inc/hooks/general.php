<?php
/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme;

defined( 'ABSPATH' ) || die();

/**
 * Ensure that a theme is never updated. This works by removing the
 * theme from the list of available updates.
 *
 * @author: Micah Wood
 * @url: https://wpscholar.com/blog/exclude-plugin-theme-from-wordpress-updates/
 * Original snippets posted by Mark Jaquith
 * https://markjaquith.wordpress.com/2009/12/14/excluding-your-plugin-or-theme-from-update-checks/
 *
 * @param array  $response Response
 * @param string $url 	URL
 * @return array response
 */
function disable_theme_update( array $response, string $url ): array {
	if ( 0 === strpos( $url, 'https://api.wordpress.org/themes/update-check' ) ) {
		$themes = json_decode( $response['body']['themes'] );
		unset( $themes->themes->{'kotisivu-block-theme'} );
		unset( $themes->themes->{'style'} );
		$response['body']['themes'] = wp_json_encode( $themes );
	}

	return $response;
}

/**
 * Add image support for SVG's
 *
 * @param array $mimes Mime types
 * @return array
 */
function allow_svg_uploads( array $mimes ): array {
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}

/**
 * Override default excerpt length
 *
 * @param int $length Excerpt length
 * @return int
 */
function limit_excerpt_length( int $length ): int {
	return 20;
}

/**
 * Set inline size limit
 *
 * @return int
 */
function set_inline_size_limit() {
	return 50000; // Size in bytes.
}

/**
 * Set default dashboard metaboxes
 *
 * @param int $user_id User ID
 * @return void
 */
function set_default_dashboard_metaboxes( $user_id = null ) {
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
function remove_admin_bar_items() {
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
