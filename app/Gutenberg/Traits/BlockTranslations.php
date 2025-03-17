<?php
/**
 * Block translations
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Gutenberg\Traits
 */

namespace Kotisivu\BlockTheme\Gutenberg\Traits;

/**
 * Block translations
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Gutenberg\Traits
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
trait BlockTranslations {
	/**
	 * Set block translation
	 * @param string $block_slug Block slug
	 * @param string $path Path to block
	 * @return void
	 */
	public function set_block_translation( $block_slug, $path ): void {
		wp_set_script_translations(
			$block_slug,
			SITE_TEXTDOMAIN,
			$path . '/languages'
		);

		add_filter(
			'load_script_translation_file',
			function ( string $file, string $handle, string $domain ) use ( $block_slug, $path ) {
				if ( strpos( $handle, $block_slug ) !== false && SITE_TEXTDOMAIN === $domain ) {
					$file = str_replace( WP_LANG_DIR . '/plugins', $path . '/languages', $file );
				}

				return $file;
			},
			10,
			3
		);
	}
}
