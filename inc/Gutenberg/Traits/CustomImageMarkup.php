<?php
/**
 * Modify image markup for default image block
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Common
 */

namespace Kotisivu\BlockTheme\Gutenberg\Traits;

/**
 * Modify image markup for default image block
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Gutenberg\Traits
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
trait CustomImageMarkup {
	/**
	 * Replace image block markup with custom image markup
	 *
	 * @param string $block_content Block content
	 * @param array  $block Block data
	 * @return string
	 */
	public function replace_image_markup( string $block_content, array $block ): string {
		if ( 'core/image' !== $block['blockName'] ) {
			return $block_content;
		}

		$classes   = $block['attrs']['className'] ?? '';
		$size_slug = $block['attrs']['sizeSlug'] ?? 'full';

		return wp_get_attachment_image(
			$block['attrs']['id'],
			$size_slug,
			false,
			array(
				'class' => 'wp-block-image size-' . $size_slug . ' ' . $classes,
			)
		);
	}
}
