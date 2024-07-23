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
 * Restricts block editor patterns in the editor by removing support for all patterns from:
 *   - Dotcom and plugins like Jetpack
 *   - Dotorg pattern directory except for theme patterns
 * @param mixed $dispatch_result The result of the dispatch process. Default null.
 * @param mixed $request The request data. Default null.
 * @param mixed $route The route matched by the request. Default null.
 * @return mixed
 */
function restrict_block_editor_patterns( $dispatch_result, $request, $route ) {
		$is_patterns_request = preg_match( '/^\/wp\/v2\/block\-patterns\/patterns$/', $route );

	if ( $is_patterns_request ) {
		// For the request route /wp/v2/block-patterns/patterns
		$patterns = WP_Block_Patterns_Registry::get_instance()->get_all_registered();

		if ( ! empty( $patterns ) ) {
			// Remove theme support for all patterns from Dotcom, and plugins. See https://developer.wordpress.org/themes/features/block-patterns/#unregistering-block-patterns
			foreach ( $patterns as $pattern ) {
				unregister_block_pattern( $pattern['name'] );
			}
			// Remove theme support for core patterns from the Dotorg pattern directory. See https://developer.wordpress.org/themes/features/block-patterns/#removing-core-patterns
			remove_theme_support( 'core-block-patterns' );
		}
	}

		return $dispatch_result;
}

/**
 * Get Pattern Content.
 *
 * @param string $name Pattern name.
 * @return string
 */
function get_pattern_content( string $name ): string {
	$path = SITE_PATH . '/inc/blocks/patterns/' . $name . '.php';
	if ( file_exists( $path ) ) {
		ob_start();
		require $path;
		return ob_get_clean();
	} else {
		add_action(
			'admin_notices',
			function () use ( $name ) {
				?>
				<div class="notice notice-error">
					<p><?php _e( 'Following block pattern content files is missing: ', 'kotisivu-block-theme' ); ?><?php echo $name; ?></p>
				</div>
				<?php
			}
		);
		return '';
	}
}

/**
 * Register block patterns
 * @return void
 */
function register_block_pattern_categories(): void {
	foreach ( SITE_SETTINGS['block_pattern_categories'] as $category ) {
		register_block_pattern_category(
			$category['slug'],
			array( 'label' => $category['label'] )
		);
	}
}

/**
 * Register block patterns
 * @return void
 */
function register_block_patterns(): void {
	foreach ( SITE_SETTINGS['block_patterns'] as $pattern ) {
		/**
		 * If slug is not set, continue
		 */
		if ( ! isset( $pattern['slug'] ) ) {
			continue;
		}

		/**
		 * Get all required args
		 */
		$args = array(
			// If title is not set, use the slug as title and capitalize each word.
			'title'       => isset( $pattern['title'] ) ? $pattern['title'] : ucwords( str_replace( '-', ' ', $pattern['slug'] ) ),
			// If description is not set, use an empty string.
			'description' => isset( $pattern['description'] ) ? $pattern['description'] : '',
			// If categories is not set or not an array, use an empty array.
			'categories'  => isset( $pattern['categories'] ) && null !== $pattern['categories'] && is_array( $pattern['categories'] ) ? $pattern['categories'] : array(),
			// If keywords is not set or not an array, use an empty array.
			'keywords'    => isset( $pattern['keywords'] ) && null !== $pattern['keywords'] && is_array( $pattern['keywords'] ) ? $pattern['keywords'] : array(),
			'content'     => get_pattern_content( $pattern['slug'] ),
		);

		/**
		 * If page_template is set to true, use it as a page level template
		 */
		if ( isset( $pattern['page_template'] ) && true === $pattern['page_template'] ) :
			$args['blockTypes'] = array( 'core/post-content' );
		endif;

		/**
		 * Register block pattern
		 */
		register_block_pattern(
			'kotisivu-block-theme/' . $pattern['slug'],
			$args
		);
	}
}
