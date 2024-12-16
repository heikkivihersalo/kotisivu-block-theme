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
trait DisableThemeUpdate {
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
	function disable_theme_update( array $response, string $url ): array {
		if ( 0 === strpos( $url, 'https://api.wordpress.org/themes/update-check' ) ) {
			$themes = json_decode( $response['body']['themes'] );
			unset( $themes->themes->{'kotisivu-block-theme'} );
			unset( $themes->themes->{'style'} );
			$response['body']['themes'] = wp_json_encode( $themes );
		}

		return $response;
	}
}
