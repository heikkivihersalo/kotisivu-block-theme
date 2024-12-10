<?php
/**
 * Set extended security measures for the theme
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Common
 */

namespace Kotisivu\BlockTheme\Theme\Common\Traits;

/**
 * Set extended security measures for the theme
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Common
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
trait DisableUnsecureEndpoints {
	/**
	 * Disable REST API user endpoints
	 *
	 * @param array $endpoints The current REST api endpoints
	 * @return array
	 */
	public function disable_rest_api_user_endpoints( $endpoints ): array {
		if ( isset( $endpoints['/wp/v2/users'] ) ) {
			unset( $endpoints['/wp/v2/users'] );
		}
		if ( isset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] ) ) {
			unset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] );
		}

		return $endpoints;
	}

	/**
	 * Disable REST API for non logged in users
	 *
	 * @param mixed $result The result of the authentication check.
	 * @return mixed
	 * @link https://developer.wordpress.org/rest-api/using-the-rest-api/frequently-asked-questions/#require-authentication-for-all-requests
	 */
	public function disable_rest_api_for_non_logged_in_users( $result ): mixed {
		// If a previous authentication check was applied,
		// pass that result along without modification.
		if ( true === $result || is_wp_error( $result ) ) {
			return $result;
		}

		// No authentication has been performed yet.
		// Return an error if user is not logged in.
		if ( ! is_user_logged_in() ) {
			return new WP_Error(
				'rest_not_logged_in',
				'You are not currently logged in.',
				array( 'status' => 401 )
			);
		}

		// Our custom authentication check should have no effect
		// on logged-in requests
		return $result;
	}

	/**
	 * Disable author pages
	 *
	 * @return void
	 */
	public function disable_author_pages(): void {
		global $wp_query;

		if ( is_author() ) {
			wp_safe_redirect( get_option( 'home' ), 301 );
			exit();
		}
	}
}
