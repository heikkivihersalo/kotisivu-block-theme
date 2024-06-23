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
 *
 * @package Kotisivu\BlockTheme
 */
class BlockCategories {
	/**
	 * Constructor
	 * @return void
	 */
	public function __construct() {
	}

	/**
	 * Register custom block categories
	 * @param mixed $block_categories 
	 * @param mixed $editor_context 
	 * @return mixed 
	 */
	public function register_categories( mixed $block_categories, mixed $editor_context ): mixed {
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

	/**
	 * Initialize class
	 * @return void 
	 */
	public function init(): void {
		add_filter( 'block_categories_all', array( $this, 'register_categories' ), 10, 2 );
	}
}
