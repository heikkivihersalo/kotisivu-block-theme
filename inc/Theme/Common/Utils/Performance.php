<?php
/**
 * Utility functions for performance related tasks
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Common\Utils
 */

namespace Kotisivu\BlockTheme\Theme\Common\Utils;

defined( 'ABSPATH' ) || die();

/**
 * Utility functions for performance related tasks
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Common\Utils
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
final class Performance {
	/**
	 * This utility class should never be instantiated.
	 */
	private function __construct() {
	}

	/**
	 * Remove jQuery Migrate script
	 * Original code from: https://dotlayer.com/what-is-migrate-js-why-and-how-to-remove-jquery-migrate-from-wordpress/
	 *
	 * @return  void
	 */
	public static function remove_jquery_migrate( $scripts ): void {
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
	public static function move_jquery_to_footer(): void {
		if ( is_user_logged_in() ) {
			return;
		}

		wp_scripts()->add_data( 'jquery', 'group', 1 );
		wp_scripts()->add_data( 'jquery-core', 'group', 1 );
		wp_scripts()->add_data( 'jquery-migrate', 'group', 1 );
	}

	/**
	 * Disable WP emojis from TinyMCE
	 * @return array
	 */
	public static function disable_emojis_tinymce( $plugins ): array {
		return is_array( $plugins ) ? array_diff( $plugins, array( 'wpemoji' ) ) : array();
	}

	/**
	 * Disable WP emojis DNS prefetch
	 * @param array  $urls Emojis URLs
	 * @param string $relation_type string
	 * @return array
	 */
	public static function disable_emojis_remove_dns_prefetch( array $urls, string $relation_type ): array {
		if ( 'dns-prefetch' !== $relation_type ) {
			return $urls;
		}

		$svg_url = preg_grep( '/images\/core\/emoji/', $urls );

		if ( empty( $svg_url ) ) {
			return $urls;
		}

		$svg_url = reset( $svg_url );
		$svg_url = apply_filters( 'emoji_svg_url', $svg_url );
		$urls    = array_diff( $urls, array( $svg_url ) );

		return $urls;
	}
}
