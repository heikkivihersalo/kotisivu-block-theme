<?php
/**
 * Extended media support for WP
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Common
 */

namespace Kotisivu\BlockTheme\Theme\Common\Traits;

/**
 * Extended media support for WP
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Common
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
trait ExtendedMediaSupport {
	/**
	 * Enqueue media support
	 * @return void
	 */
	public function add_wp_media_support(): void {
		wp_enqueue_media();
	}

	/**
	 * Add image support for SVG's
	 *
	 * @param array $mimes Mime types
	 * @return array
	 */
	public function allow_svg_uploads( array $mimes ): array {
		$mimes['svg'] = 'image/svg+xml';
		return $mimes;
	}
}
