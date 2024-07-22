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
final class Utils {
	/**
	 * This utility class should never be instantiated.
	 */
	private function __construct() {
	}

	/**
	 * Get transient lifespan based on user role and app state
	 *
	 * @return int
	 */
	private static function get_transient_lifespan(): int {
		return ( is_super_admin() && \WP_DEBUG ) ? 1 : \DAY_IN_SECONDS;
	}

	/**
	 * Get site options from database and store it to cache
	 *
	 * @param string $slug The slug of the options
	 *
	 * @return mixed
	 */
	public static function get_options_file( string $slug ): mixed {
		/**
		 * Check options for cache. If not found, load it from database
		 */
		$cache = wp_cache_get( 'kotisivu-block-theme_' . $slug );

		if ( false === $cache ) {
			$cache = get_option( 'kotisivu-block-theme_' . $slug );
			wp_cache_set( 'kotisivu-block-theme_' . $slug, $cache );
		}

		return $cache;
	}

	/**
	 * Adds functionality to return '__return_true' string to used in filters and hooks
	 *
	 * @return string
	 */
	public static function return_true(): string {
		return '__return_true';
	}

	/**
	 * Build custom post types from array
	 *
	 * @param array  $post_types Array of post types
	 * @param string $path Path to custom post types
	 *
	 * @return void
	 * @throws \WP_Error If the custom post type class file does not exist.
	 */
	public static function build_post_types( array $post_types, string $path ): void {
		foreach ( $post_types as $post_type ) {
			$slug = strtolower( $post_type );

			$classname = __NAMESPACE__ . '\\' . $post_type;
			$file_path = $path . '/inc/theme/custom-post-types/post-types/' . str_replace( '_', '-', strtolower( $post_type ) ) . '.php';

			if ( ! file_exists( $file_path ) ) {
				throw new \WP_Error( 'invalid-cpt', __( 'The custom post type class file does not exist.', 'kotisivu-block-theme' ), $classname );
			}

			// Get the class file, only try to require if not already imported
			if ( ! class_exists( $classname ) ) {
				require $file_path;
			}

			if ( ! class_exists( $classname ) ) {
				throw new \WP_Error( 'invalid-cpt', __( 'The custom post type you attempting to create does not have a class to instance. Possible problems: your configuration does not match the class file name; the class file name does not exist.', 'kotisivu-block-theme' ), $classname );
			}

			$post_type_class = new $classname( $slug );
			$post_type_class->register();
		}
	}

	/**
	 * Set block translation
	 * @param string $block_slug Block slug
	 * @param string $path Path to block
	 *
	 * @return void
	 */
	public static function set_block_translation( $block_slug, $path ): void {
		wp_set_script_translations(
			$block_slug,
			'kotisivu-block-theme',
			$path . '/languages'
		);

		add_filter(
			'load_script_translation_file',
			function ( string $file, string $handle, string $domain ) use ( $block_slug, $path ) {
				if ( strpos( $handle, $block_slug ) !== false && 'kotisivu-block-theme' === $domain ) {
					$file = str_replace( WP_LANG_DIR . '/themes', $path . '/languages', $file );
				}

				return $file;
			},
			10,
			3
		);
	}

	/**
	 * Get block directories
	 * Can be used to get all blocks that needs to be registered
	 * @param string $path Path to block directory
	 * @param string $type Type of block (e.g. core, custom)
	 * @return array
	 */
	public static function get_block_directories( string $path = null, string $type ): array {
		if ( null === $path ) {
			return array();
		}

		foreach ( scandir( $path ) as $block ) {
			// Remove unnecessary files (e.g. .gitignore, .DS_Store, ., .. etc.)
			if ( '.' === $block || '..' === $block || '.DS_Store' === $block || strpos( $block, '.' ) === true ) {
				continue;
			}

			// Add block to array
			$blocks[] = $type . '/' . $block;

			// Check if block is core block and has child blocks
			// E.g. core/buttons, core/list
			if ( 'core' === $type ) :
				switch ( $block ) {
					case 'buttons':
						$blocks[] = 'core/button';
						break;
					case 'list':
						$blocks[] = 'core/list-item';
						break;
					default:
						break;
				}
			endif;
		}

		return $blocks;
	}

	/**
	 * Purge transient cache
	 *
	 * @return void
	 */
	public static function purge_transient_cache(): void {
		global $wpdb;

		/**
		 * Get all transients that are related to Kotisivu Block Theme
		 */
		// phpcs:ignore -- We need to use direct query here
		$transients = $wpdb->get_col(
			$wpdb->prepare(
				'SELECT option_name FROM %i WHERE option_name LIKE %s',
				$wpdb->options, // Name of the options table
				'_transient_timeout_kotisivu-block-theme%'
			)
		);

		/**
		 * Delete all transients
		 */
		foreach ( $transients as $transient ) {
			$key = str_replace( '_transient_timeout_', '', $transient );
			delete_transient( $key );
		}

		wp_cache_flush();
	}

	/**
	 * Check if string starts with another string
	 * @param string $str String that is checked against
	 * @param string $str_to_check String to check
	 * @return bool
	 */
	private static function starts_with( $str, $str_to_check ) {
		$len = strlen( $str_to_check );

		return ( substr( $str, 0, $len ) === $str_to_check );
	}

	/**
	 * Format phone number to Finnish format
	 * @param mixed $num Phone number
	 * @return string
	 */
	public static function format_phone_num( $num ): string {
		/**
		 * If number is in correct format, return it
		 */
		if ( self::starts_with( $num, '+358' ) ) {
			return preg_replace( '/\s+/', '', $num );
		}

		/**
		 * If number is in local format (e.g. 0401234567), format it to Finnish format
		 */
		if ( self::starts_with( $num, '0' ) ) {
			switch ( $num ) :
				case ( self::starts_with( $num, '040' ) ):
					return preg_replace(
						'/\s+/',
						'',
						sprintf(
							'%s %s %s',
							'+358' . substr( $num, 1, 2 ),
							substr( $num, 3, 3 ),
							substr( $num, 6 )
						)
					);
				case ( self::starts_with( $num, '050' ) ):
					return preg_replace(
						'/\s+/',
						'',
						sprintf(
							'%s %s %s',
							'+358' . substr( $num, 1, 2 ),
							substr( $num, 3, 3 ),
							substr( $num, 6 )
						)
					);
				case ( self::starts_with( $num, '044' ) ):
					return preg_replace(
						'/\s+/',
						'',
						sprintf(
							'%s %s %s',
							'+358' . substr( $num, 1, 2 ),
							substr( $num, 3, 3 ),
							substr( $num, 6 )
						)
					);
				case ( self::starts_with( $num, '045' ) ):
					return preg_replace(
						'/\s+/',
						'',
						sprintf(
							'%s %s %s',
							'+358' . substr( $num, 1, 2 ),
							substr( $num, 3, 3 ),
							substr( $num, 6 )
						)
					);
				case ( self::starts_with( $num, '09' ) ):
					return preg_replace(
						'/\s+/',
						'',
						sprintf(
							'%s %s %s',
							'+358' . substr( $num, 1, 2 ),
							substr( $num, 3, 3 ),
							substr( $num, 6 )
						)
					);
				default:
					return $num;
			endswitch;
		}
	}

	/**
	 * Disable WP emojis from TinyMCE
	 * @return array
	 */
	public static function disable_emojis_tinymce( $plugins ): array {
		return is_array( $plugins ) ? array_diff( $plugins, array( 'wpemoji' ) ) : array();
	}

	/**
	 * Disable WP emojis DNS prefetch
	 * @param array  $urls Emojis URLs
	 * @param string $relation_type string
	 * @return array
	 */
	public static function disable_emojis_remove_dns_prefetch( array $urls, string $relation_type ): array {
		if ( 'dns-prefetch' !== $relation_type ) {
			return $urls;
		}

		$svg_url = preg_grep( '/images\/core\/emoji/', $urls );

		if ( empty( $svg_url ) ) {
			return $urls;
		}

		$svg_url = reset( $svg_url );
		$svg_url = apply_filters( 'emoji_svg_url', $svg_url );
		$urls    = array_diff( $urls, array( $svg_url ) );

		return $urls;
	}

	/**
	 * Get featured image metadata
	 * @param mixed  $post_id Post ID
	 * @param string $size Default: medium
	 * @return array
	 */
	public static function get_featured_image_meta( mixed $post_id, string $size = 'medium' ) {
		$id   = get_post_thumbnail_id( $post_id );
		$meta = wp_get_attachment_image_src( $id, $size );

		return array(
			'id'     => $id,
			'url'    => isset( $meta[0] ) ? $meta[0] : '',
			'width'  => isset( $meta[1] ) ? $meta[1] : '',
			'height' => isset( $meta[2] ) ? $meta[2] : '',
			'alt'    => get_post_meta( $id, '_wp_attachment_image_alt', true ),
			'title'  => get_the_title( $id ),
		);
	}
}
