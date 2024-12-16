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

use WP_Error;

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
