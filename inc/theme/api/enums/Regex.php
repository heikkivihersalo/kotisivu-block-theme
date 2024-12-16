<?php
/**
 * 
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Api\Enums\
 */

namespace Kotisivu\BlockTheme\Theme\Api\Enums;

defined( 'ABSPATH' ) || die();

/**
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Api\Enums\
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
enum Regex {
	/**
	 * Regex for validating email
	 */
	case EMAIL;

	/**
	 * Regex for validating phone number
	 */
	case PHONE;

	/**
	 * Regex for numeric id (e.g. WordPress user id)
	 */
	case NUMERIC_ID;

	/**
	 * Regex for search term
	 */
	case SEARCH_TERM;

	/**
	 * Get regex
	 */
	public function get_regex(): string {
		return match ( $this ) {
			self::EMAIL => '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
			self::PHONE => '/^(\+358|0)([0-9]){9}$/',
			self::NUMERIC_ID => '/^[0-9]+$/',
			self::SEARCH_TERM => '/^[a-zA-Z0-9\s]+$/',
		};
	}

	/**
	 * Get ID group name
	 */
	public function get_group(): string {
		return match ( $this ) {
			self::EMAIL => 'email',
			self::PHONE => 'phone',
			self::NUMERIC_ID => 'id',
			self::SEARCH_TERM => 'search'
		};
	}

	/**
	 * Format regex for request (remove start and end of regex)
	 *
	 * @param string $regex Regex
	 * @return string
	 */
	private static function format_regex_for_request( string $regex ): string {
		return substr( $regex, 2, -2 ); // Remove start /^ and end $/ of regex
	}

	/**
	 * Get regex with ID group name
	 */
	public function get_request_regex(): string {
		return match ( $this ) {
			self::EMAIL => sprintf( '(?P<%s>%s)', $this->get_group(), self::format_regex_for_request( $this->get_regex() ) ),
			self::PHONE => sprintf( '(?P<%s>%s)', $this->get_group(), self::format_regex_for_request( $this->get_regex() ) ),
			self::NUMERIC_ID => sprintf( '(?P<%s>%s)', $this->get_group(), self::format_regex_for_request( $this->get_regex() ) ),
			self::SEARCH_TERM => sprintf( '(?P<%s>%s)', $this->get_group(), self::format_regex_for_request( $this->get_regex() ) )
		};
	}
}
