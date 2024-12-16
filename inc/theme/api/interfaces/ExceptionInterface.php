<?php

namespace Kotisivu\BlockTheme\Theme\Api\Interfaces;

defined( 'ABSPATH' ) || die();

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
