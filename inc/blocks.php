<?php
/**
 * Load theme related blocks and block categories
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme;

defined( 'ABSPATH' ) || die();

/**
 * Laod block base class
 */
require_once SITE_PATH . '/inc/blocks/class-block.php';

/**
 * Check if dependencies and build files exist
 */
if ( ! file_exists( SITE_PATH . '/build/block-library/core/core.asset.php' ) ) {
	add_action(
		'admin_notices',
		function () {
			?>
				<div class="notice notice-error">
					<p><?php _e( 'Block library assets are missing. Run `yarn` and/or `yarn build` to generate them.', 'kotisivu-block-theme' ); ?></p>
				</div>
					<?php
		}
	);
	return;
}

/**
 * Fix file paths to get blocks working in theme context
 */
add_filter(
	'plugins_url',
	function ( string $url ) {
		if ( strpos( $url, SITE_PATH ) !== false ) {
			$url = str_replace( 'wp-content/plugins' . ABSPATH, '', $url );
		}

		return $url;
	},
	10,
	3
);

/**
 * Set block assets to be loaded separately
 */
add_filter( 'should_load_separate_core_block_assets', 'Kotisivu\BlockTheme\Utils::return_true' );

/**
 * Register custom blocks
 */
require_once SITE_PATH . '/inc/blocks/block-types/class-block-custom.php';
$custom_blocks = new BlockCustom();
$custom_blocks->init();

require_once SITE_PATH . '/inc/blocks/block-types/class-block-page-template.php';
$template_blocks = new BlockPageTemplate();
$template_blocks->init();

require_once SITE_PATH . '/inc/blocks/block-types/class-block-part.php';
$part_blocks = new BlockPart();
$part_blocks->init();

/**
 * Register custom block categories
 */
require_once SITE_PATH . '/inc/blocks/block-categories.php';
add_filter( 'block_categories_all', __NAMESPACE__ . '\register_custom_block_categories', 10, 2 );

/**
 * Register block patterns
 */
require_once SITE_PATH . '/inc/blocks/block-patterns.php';

/**
 * Remove and unregister patterns from core, Dotcom, remote and plugins.
 * @see https://github.com/Automattic/jetpack/blob/d032fbb807e9cd69891e4fcbc0904a05508a1c67/projects/packages/jetpack-mu-wpcom/src/features/block-patterns/block-patterns.php#L107
 * @see https://developer.wordpress.org/themes/features/block-patterns/#disabling-remote-patterns
 */
add_filter( 'rest_dispatch_request', __NAMESPACE__ . '\restrict_block_editor_patterns', 12, 3 );
add_filter( 'should_load_remote_block_patterns', '__return_false' );

/**
 * Disable the core pattern categories
 */
add_filter( 'block_pattern_categories_all', '__return_empty_array' );

/**
 * Register custom block pattern categories
 */
add_action( 'init', __NAMESPACE__ . '\register_block_pattern_categories' );
add_action( 'init', __NAMESPACE__ . '\register_block_patterns' );

/**
 * Disallow blocks
 */
require_once SITE_PATH . '/inc/blocks/allowed-blocks.php';
add_filter( 'allowed_block_types_all', __NAMESPACE__ . '\disallow_block_types', 10, 2 );
