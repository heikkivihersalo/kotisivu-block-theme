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
		array_unshift(
			$block_categories,
			array(
				'slug'  => 'blocks',
				'title' => __( 'Blocks', 'kotisivu-block-theme' ),
				'icon'  => null,
			)
		);

		array_push(
			$block_categories,
			array(
				'slug'  => 'blog',
				'title' => __( 'Blog', 'kotisivu-block-theme' ),
				'icon'  => null,
			)
		);

		array_push(
			$block_categories,
			array(
				'slug'  => 'child',
				'title' => __( 'Child', 'kotisivu-block-theme' ),
				'icon'  => null,
			)
		);

		array_push(
			$block_categories,
			array(
				'slug'  => 'sections',
				'title' => __( 'Sections', 'kotisivu-block-theme' ),
				'icon'  => null,
			)
		);

		array_push(
			$block_categories,
			array(
				'slug'  => 'containers',
				'title' => __( 'Containers & Wrappers', 'kotisivu-block-theme' ),
				'icon'  => null,
			)
		);

		array_push(
			$block_categories,
			array(
				'slug'  => 'templates',
				'title' => __( 'Templates', 'kotisivu-block-theme' ),
				'icon'  => null,
			)
		);

		array_push(
			$block_categories,
			array(
				'slug'  => 'dynamic-data',
				'title' => __( 'Dynamic Data', 'kotisivu-block-theme' ),
				'icon'  => null,
			)
		);
	}
	return $block_categories;
}
