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
class AllowedBlocks {
	use ThemeDefaults;

	/**
	 * The list of block types that should not be loaded.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @var array
	 */
	protected $blacklist = array(
		/**
		* WordPress Core Blocks
		*/
		'core/archives',
		'core/audio',
		'core/avatar',
		// 'core/block',
		// 'core/button',
		// 'core/buttons',
		'core/calendar',
		'core/categories',
		'core/code',
		'core/column',
		'core/columns',
		'core/comment-author-name',
		'core/comment-content',
		'core/comment-date',
		'core/comment-edit-link',
		'core/comment-reply-link',
		'core/comment-template',
		'core/comments-pagination-next',
		'core/comments-pagination-numbers',
		'core/comments-pagination-previous',
		'core/comments-pagination',
		'core/comments-title',
		'core/comments',
		'core/cover',
		'core/details',
		'core/embed',
		'core/file',
		'core/footnotes',
		'core/freeform',
		'core/gallery',
		'core/group',
		// 'core/heading',
		'core/home-link',
		// 'core/html',
		// 'core/image',
		'core/latest-comments',
		'core/latest-posts',
		'core/legacy-widget',
		// 'core/list-item',
		// 'core/list',
		'core/loginout',
		'core/media-text',
		'core/missing',
		'core/more',
		'core/navigation-link',
		'core/navigation-submenu',
		'core/navigation',
		'core/nextpage',
		'core/page-list-item',
		'core/page-list',
		// 'core/paragraph',
		'core/pattern',
		'core/post-author-biography',
		'core/post-author-name',
		'core/post-author',
		'core/post-comments-form',
		'core/post-content',
		'core/post-date',
		'core/post-excerpt',
		'core/post-featured-image',
		'core/post-navigation-link',
		'core/post-template',
		'core/post-terms',
		'core/post-title',
		'core/preformatted',
		'core/pullquote',
		'core/query-no-results',
		'core/query-pagination-next',
		'core/query-pagination-numbers',
		'core/query-pagination-previous',
		'core/query-pagination',
		'core/query-title',
		'core/query',
		'core/quote',
		'core/read-more',
		'core/rss',
		'core/search',
		// 'core/separator',
		// 'core/shortcode',
		'core/site-logo',
		'core/site-tagline',
		'core/site-title',
		'core/social-link',
		'core/social-links',
		'core/spacer',
		// 'core/table',
		'core/tag-cloud',
		'core/template-part',
		'core/term-description',
		'core/text-columns',
		'core/verse',
		'core/video',
		'core/widget-group',

		/**
		* Custom Blocks
		*/
		'ksd/part-header',
		'ksd/part-footer',

		/**
		* Page Templates
		*/
		'ksd/template-404',
		'ksd/template-archive',
		'ksd/template-home',
		'ksd/template-index',
		'ksd/template-legal',
		'ksd/template-main',
		'ksd/template-page',
		'ksd/template-search',
		'ksd/template-single',
	);

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
	}

	/**
	 * Filters the list of allowed block types.
	 *
	 * @since 2.0.0
	 * @access public
	 * @param array $allowed_block_types The list of allowed block types.
	 * @return array The filtered list of allowed block types.
	 */
	public function set_allowed_blocks( $allowed_block_types ) {
		// Get all registered blocks if $allowed_block_types is not already set.
		if ( ! is_array( $allowed_block_types ) || empty( $allowed_block_types ) ) {
			$registered_blocks   = \WP_Block_Type_Registry::get_instance()->get_all_registered();
			$allowed_block_types = array_keys( $registered_blocks );
		}

		// Create a new array for the allowed blocks.
		$filtered_blocks = array();

			// Loop through each block in the allowed blocks list.
		foreach ( $allowed_block_types as $block ) {

			// Check if the block is not in the disallowed blocks list.
			if ( ! in_array( $block, $this->blacklist, true ) ) {

				// If it's not disallowed, add it to the filtered list.
				$filtered_blocks[] = $block;
			}
		}

		// Return the filtered list of allowed blocks
		return $filtered_blocks;
	}

	/**
	 * Register hooks
	 *
	 * @since 2.0.0
	 * @access public
	 * @return void
	 */
	public function register_hooks() {
		$this->loader->add_filter( 'allowed_block_types_all', $this, 'filter_allowed_blocks', 10, 2 );
	}
}
