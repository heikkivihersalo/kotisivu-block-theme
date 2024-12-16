<?php
/**
 * 
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Api\Interfaces\
 */

namespace Kotisivu\BlockTheme\Theme\Api\Interfaces;

defined( 'ABSPATH' ) || die();

/**
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Api\Interfaces\
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
interface ExceptionInterface {
	/**
	 * Get exception type
	 *
	 * @return string
	 */
	public function get_type(): string;

	/**
	 * Get HTTP status code
	 *
	 * @return int
	 */
	public function get_http_status(): int;
}
