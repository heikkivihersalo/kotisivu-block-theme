<?php
/**
 * Register custom image sizes
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Common
 */

namespace Kotisivu\BlockTheme\Theme\Api\Traits;

/**
 * Register custom image sizes
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Common
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
trait FormatImageMeta {
	/**
	 * Get featured image metadata
	 * @param mixed  $post_id Post ID
	 * @param string $size Default: medium
	 * @return array
	 */
	public function get_featured_image_meta( mixed $post_id, string $size = 'medium' ) {
		$id   = get_post_thumbnail_id( $post_id );
		$meta = wp_get_attachment_image_src( $id, $size );

		return array(
			'id'     => $id,
			'url'    => isset( $meta[0] ) ? $meta[0] : '',
			'width'  => isset( $meta[1] ) ? $meta[1] : '',
			'height' => isset( $meta[2] ) ? $meta[2] : '',
			'alt'    => get_post_meta( $id, '_wp_attachment_image_alt', true ),
			'title'  => get_the_title( $id ),
		);
	}
}
