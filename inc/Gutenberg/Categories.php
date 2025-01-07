<?php
/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme\Gutenberg;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\Common\Loader;
use Kotisivu\BlockTheme\Theme\Common\Traits\ThemeDefaults;

/**
 *
 * @package Kotisivu\BlockTheme
 */
class Categories {
	use ThemeDefaults;

	/**
	 * Categories
	 *
	 * @since    2.0.0
	 * @access   private
	 * @var      array     $categories Array of categories
	 */
	private array $categories;

	/**
	 * Define the core functionality of the theme.
	 *
	 * Set the theme name and the theme version that can be used throughout the theme.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    2.0.0
	 */
	public function __construct( Loader $loader, string $theme_name, string $version ) {
		$this->loader     = $loader;
		$this->theme_name = $theme_name;
		$this->version    = $version;

		$this->categories = array(
			array(
				'slug'  => 'blocks',
				'title' => __( 'Blocks', 'kotisivu-block-theme' ),
				'icon'  => null,
			),
			array(
				'slug'  => 'child',
				'title' => __( 'Child', 'kotisivu-block-theme' ),
				'icon'  => null,
			),
			array(
				'slug'  => 'containers',
				'title' => __( 'Containers & Wrappers', 'kotisivu-block-theme' ),
				'icon'  => null,
			),
			array(
				'slug'  => 'sections',
				'title' => __( 'Sections', 'kotisivu-block-theme' ),
				'icon'  => null,
			),
			array(
				'slug'  => 'templates',
				'title' => __( 'Templates', 'kotisivu-block-theme' ),
				'icon'  => null,
			),
			array(
				'slug'  => 'dynamic-data',
				'title' => __( 'Dynamic Data', 'kotisivu-block-theme' ),
				'icon'  => null,
			),
		);
	}

	/**
	 * Register custom block categories
	 *
	 * @since 2.0.0
	 * @access public
	 * @param array $editor_context The editor context
	 * @return array
	 */
	public function register_custom_block_categories( $editor_context ) {
		$categories = array();

		if ( ! empty( $editor_context->post ) ) {
			foreach ( $this->categories as $category ) {
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

	/**
	 * Register hooks
	 *
	 * @since 2.0.0
	 * @access public
	 * @return void
	 */
	public function register_hooks() {
		$this->loader->add_action( 'init', $this, 'register_custom_block_categories' );
	}
}
