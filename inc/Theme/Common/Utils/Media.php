<?php
/**
 * Utility functions for media handling
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Common\Utils
 */

namespace Kotisivu\BlockTheme\Theme\Common\Utils;

defined( 'ABSPATH' ) || die();

/**
 * Utility functions for media handling
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Common\Utils
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
final class Media {
	/**
	 * This utility class should never be instantiated.
	 */
	private function __construct() {
	}

	/**
	 * Enqueue media support
	 * @return void
	 */
	public static function add_wp_media_support(): void {
		wp_enqueue_media();
	}

	/**
	 * Add image support for SVG's
	 *
	 * @param array $mimes Mime types
	 * @return array
	 */
	public static function allow_svg_uploads( array $mimes ): array {
		$mimes['svg'] = 'image/svg+xml';
		return $mimes;
	}
}
