<?php
/**
 * Fix file paths to get blocks working in theme context
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Gutenberg\Traits
 */

namespace Kotisivu\BlockTheme\Gutenberg\Traits;

/**
 * Fix file paths to get blocks working in theme context
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Gutenberg\Traits
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
trait FilePathFix {
	/**
	 * Fix file paths to get blocks working in theme context
	 * @return string $url The fixed file path
	 */
	public function fix_block_file_path( string $url ): string {
		if ( strpos( $url, SITE_PATH ) !== false ) {
			$url = str_replace( 'wp-content/plugins' . ABSPATH, '', $url );
		}

		return $url;
	}
}
