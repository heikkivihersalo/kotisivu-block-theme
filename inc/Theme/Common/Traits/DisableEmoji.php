<?php
/**
 * Disable emojis
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Common
 */

namespace Kotisivu\BlockTheme\Theme\Common\Traits;

/**
 * Disable emojis
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Common
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
trait DisableEmoji {
	/**
	 * Disable WP emojis from TinyMCE
	 * @return array
	 */
	public function disable_emojis_tinymce( $plugins ): array {
		return is_array( $plugins ) ? array_diff( $plugins, array( 'wpemoji' ) ) : array();
	}

	/**
	 * Disable WP emojis DNS prefetch
	 * @param array  $urls Emojis URLs
	 * @param string $relation_type string
	 * @return array
	 */
	public function disable_emojis_remove_dns_prefetch( array $urls, string $relation_type ): array {
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
