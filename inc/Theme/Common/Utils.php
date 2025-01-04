<?php
/**
 * Utility functions
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Common\Utils
 */

namespace Kotisivu\BlockTheme\Theme\Common;

defined( 'ABSPATH' ) || die();

/**
 * Utility functions
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Common\Utils
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
final class Utils {
	/**
	 * This utility class should never be instantiated.
	 */
	private function __construct() {
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
