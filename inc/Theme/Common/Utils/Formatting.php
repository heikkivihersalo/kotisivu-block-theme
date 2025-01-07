<?php
/**
 * Utility functions for options
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Common\Utils
 */

namespace Kotisivu\BlockTheme\Theme\Common\Utils;

defined( 'ABSPATH' ) || die();

/**
 * Utility functions for options
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Common\Utils
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
final class Formatting {
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
}
