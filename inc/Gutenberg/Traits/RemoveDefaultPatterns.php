<?php
/**
 * Remove default block patterns
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Common
 */

namespace Kotisivu\BlockTheme\Gutenberg\Traits;

/**
 * Remove default block patterns
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Gutenberg\Traits
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
trait RemoveDefaultPatterns {
	/**
	 * Remove and unregister patterns from core, Dotcom, remote and plugins.
	 *
	 * @param mixed           $dispatch_result Dispatch result to return or pass to the next handler.
	 * @param WP_REST_Request $request Request used to generate the response.
	 * @param string          $route Route matched for the request.
	 * @return mixed
	 *
	 * @see https://github.com/Automattic/jetpack/blob/d032fbb807e9cd69891e4fcbc0904a05508a1c67/projects/packages/jetpack-mu-wpcom/src/features/block-patterns/block-patterns.php#L107
	 * @see https://developer.wordpress.org/themes/features/block-patterns/#disabling-remote-patterns
	 */
	public function remove_default_block_patterns( $dispatch_result, $request, $route ) {
		$is_patterns_request = preg_match( '/^\/wp\/v2\/block\-patterns\/patterns$/', $route );

		if ( $is_patterns_request ) {
			// For the request route /wp/v2/block-patterns/patterns
			$patterns = \WP_Block_Patterns_Registry::get_instance()->get_all_registered();

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
}
