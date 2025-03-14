<?php
/**
 * Utility functions for security related tasks
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Common\Utils
 */

namespace Kotisivu\BlockTheme\Theme\Common\Utils;

defined( 'ABSPATH' ) || die();

/**
 * Utility functions for security related tasks
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Common\Utils
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
final class Security {
	/**
	 * This utility class should never be instantiated.
	 */
	private function __construct() {
	}

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
	 * @param string $url   URL
	 * @return array response
	 */
	public static function disable_theme_update( array $response, string $url ): array {
		if ( 0 === strpos( $url, 'https://api.wordpress.org/themes/update-check' ) ) {
			$themes = json_decode( $response['body']['themes'] );
			unset( $themes->themes->{'kotisivu-block-theme'} );
			unset( $themes->themes->{'style'} );
			$response['body']['themes'] = wp_json_encode( $themes );
		}

		return $response;
	}

	/**
	 * Disable REST API user endpoints
	 *
	 * @param array $endpoints The current REST api endpoints
	 * @return array
	 */
	public static function disable_rest_api_user_endpoints( $endpoints ): array {
		if ( isset( $endpoints['/wp/v2/users'] ) ) {
			unset( $endpoints['/wp/v2/users'] );
		}
		if ( isset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] ) ) {
			unset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] );
		}

		return $endpoints;
	}

	/**
	 * Disable author pages
	 *
	 * @return void
	 */
	public static function disable_author_pages(): void {
		global $wp_query;

		if ( is_author() ) {
			wp_safe_redirect( get_option( 'home' ), 301 );
			exit();
		}
	}
}
