<?php

namespace Kotisivu\BlockTheme\Theme\Api\Enums;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\Api\Interfaces\HTTP_Response_Interface;

/**
 * HTTP Response enum for errors
 * Can be used as a base class for exceptions.
 *
 * @since 1.0.0
 * @package Kotisivu\BlockTheme\Api
 */
enum HTTP_Error_Pagination_Invalid_Parameters implements HTTP_Response_Interface {
	case GENERIC;

	public function values(): array {
		return match ( $this ) {
			self::GENERIC => array(
				'message'     => __( 'Pagination parameters are invalid.', 'kotisivu-block-theme' ),
				'type'        => 'pagination_invalid_parameters',
				'code'        => 1003,
				'http_status' => 400,
			)
		};
	}

	public function get_type(): string {
		return $this->values()['type'];
	}

	public function get_message(): string {
		return $this->values()['message'];
	}

	public function get_http_status(): int {
		return $this->values()['http_status'];
	}

	public function get_code(): int {
		return $this->values()['code'];
	}
}
