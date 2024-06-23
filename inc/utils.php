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
	 * Get config file and store it to WordPress Transients API
	 *
	 * @param string $slug
	 * @param string $file_name
	 *
	 * @return mixed
	 */
	public static function get_config_file( string $slug, string $file_name, string $path, string $parent_path ): mixed {
		/**
		 * Check config file for cache. If config file is not found from cache, load it from file
		 */
		$cache = get_transient( 'kotisivu-block-theme' . '_' . $slug );

		if ( false === $cache ) :
			/* Get config file */
			$config_file = file_get_contents( $path . '/' . $file_name );

			/* Fallback if config.json is not found from child theme */
			if ( ! $config_file ) :
				$config_file = file_get_contents( $parent_path . '/' . $file_name );
			endif;

			/* Encode and set cache */
			$cache = json_decode( $config_file, true );
			set_transient( 'kotisivu-block-theme' . '_' . $slug, $cache, self::get_transient_lifespan() );
		endif;

		return $cache;
	}

	/**
	 * Get site options from database and store it to cache
	 *
	 * @param string $slug
	 *
	 * @return mixed
	 */
	public static function get_options_file( string $slug ): mixed {
		/**
		 * Check options for cache. If not found, load it from database
		 */
		$cache = wp_cache_get( 'kotisivu-block-theme' . '_' . $slug );

		if ( $cache === false ) {
			$cache = get_option( 'kotisivu-block-theme' . '_' . $slug );
			wp_cache_set( 'kotisivu-block-theme' . '_' . $slug, $cache );
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
	 * @param array  $post_types
	 * @param string $path
	 *
	 * @return void
	 * @throws \WP_Error
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
	 *
	 * @param string $block_slug
	 * @param string $path
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
	 *
	 * @param string $path
	 *
	 * @return array
	 */
	public static function get_block_directories( string $path = null, string $namespace ): array {
		if ( $path === null ) {
			return array();
		}

		foreach ( scandir( $path ) as $block ) {
			// Remove unnecessary files (e.g. .gitignore, .DS_Store, ., .. etc.)
			if ( $block === '.' || $block === '..' || $block === '.DS_Store' || strpos( $block, '.' ) === true ) {
				continue;
			}

			// Add block to array
			$blocks[] = $namespace . '/' . $block;

			// Check if block is core block and has child blocks
			// E.g. core/buttons, core/list
			if ( $namespace === 'core' ) :
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
	 * Write to log
	 *
	 * @param string $message
	 *
	 * @return void
	 * TODO: Make sure this is working
	 */
	public static function write_log( $log ): void {
		if ( is_array( $log ) || is_object( $log ) ) {
			error_log( print_r( $log, true ) );
		} else {
			error_log( $log );
		}
	}

	/**
	 * Check if string starts with another string
	 *
	 * @param string $string
	 * @param string $startString
	 *
	 * @return bool
	 */
	private static function startsWith( $string, $startString ) {
		$len = strlen( $startString );

		return ( substr( $string, 0, $len ) === $startString );
	}

	/**
	 * Format phone number to Finnish format
	 *
	 * @param mixed $num
	 *
	 * @return string
	 */
	public static function format_phone_num( $num ): string {
		/**
		 * If number is in correct format, return it
		 */
		if ( self::startsWith( $num, '+358' ) ) {
			return preg_replace( '/\s+/', '', $num );
		}

		/**
		 * If number is in local format (e.g. 0401234567), format it to Finnish format
		 */
		if ( self::startsWith( $num, '0' ) ) {
			switch ( $num ) :
				case ( self::startsWith( $num, '040' ) ):
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
					break;
				case ( self::startsWith( $num, '050' ) ):
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
					break;
				case ( self::startsWith( $num, '044' ) ):
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
					break;
				case ( self::startsWith( $num, '045' ) ):
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
					break;
				case ( self::startsWith( $num, '09' ) ):
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
					break;
				default:
					return $num;
					break;
			endswitch;
		}

		return $num;
	}

	/**
	 * Disable WP emojis from TinyMCE
	 *
	 * @return void
	 */
	public static function disable_emojis_tinymce( $plugins ): array {
		return is_array( $plugins ) ? array_diff( $plugins, array( 'wpemoji' ) ) : array();
	}

	/**
	 * Disable WP emojis DNS prefetch
	 *
	 * @param $urls
	 * @param $relation_type
	 *
	 * @return array
	 */
	public static function disable_emojis_remove_dns_prefetch( $urls, $relation_type ): array {
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
	 *
	 * @param mixed  $id
	 * @param string $size
	 *
	 * @return array
	 */
	public static function get_featured_image_meta( mixed $post_id, string $size = 'medium' ) {
		$id   = get_post_thumbnail_id( $post_id );
		$meta = wp_get_attachment_image_src( $id, $size );

		return array(
			'id'     => $id,
			'url'    => $meta[0],
			'width'  => $meta[1],
			'height' => $meta[2],
			'alt'    => get_post_meta( $id, '_wp_attachment_image_alt', true ),
			'title'  => get_the_title( $id ),
		);
	}
}
