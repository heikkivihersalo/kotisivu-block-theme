<?php
/**
 * Block categories
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Gutenberg\Traits
 */

namespace Kotisivu\BlockTheme\Gutenberg\Traits;

/**
 * Block categories
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Gutenberg\Traits
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
trait BlockCategories {
	/**
	 * Register custom block categories
	 *
	 * @return void
	 */
	public function register_custom_block_categories( $categories, $editor_context ) {
		if ( ! empty( $editor_context->post ) ) {
			foreach ( SITE_SETTINGS['block_categories'] as $category ) {
				array_push(
					$categories,
					array(
						'slug'  => $category['slug'],
						'title' => $category['title'],
						'icon'  => $category['icon'],
					)
				);
			}
		}

		return $categories;
	}
}
