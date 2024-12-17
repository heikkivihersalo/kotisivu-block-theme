<?php
/**
 * Exception Interface
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Api\Interfaces\ExceptionInterface
 */

namespace Kotisivu\BlockTheme\Theme\Api\Interfaces;

defined( 'ABSPATH' ) || die();

/**
 * Exception Interface
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Api\Interfaces\ExceptionInterface
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
