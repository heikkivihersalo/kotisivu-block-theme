<?php
/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme;

defined( 'ABSPATH' ) || die();

/**
 * Register custom block categories
 * @param mixed $block_categories Block categories
 * @param mixed $editor_context Editor context
 * @return mixed
 */
function register_custom_block_categories( mixed $block_categories, mixed $editor_context ): mixed {
	if ( ! empty( $editor_context->post ) ) {
		foreach ( SITE_SETTINGS['block_categories'] as $category ) {
			array_push(
				$block_categories,
				array(
					'slug'  => $category['slug'],
					'title' => $category['title'],
					'icon'  => $category['icon'],
				)
			);
		}
	}

	return $block_categories;
}
