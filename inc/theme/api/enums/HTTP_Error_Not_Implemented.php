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
enum HTTP_Error_Not_Implemented implements HTTP_Response_Interface {
	case GENERIC; // 9000

	public function values(): array {
		return match ( $this ) {
			self::GENERIC => array(
				'message'     => __( 'Not implemented.', 'kotisivu-block-theme' ),
				'type'        => 'not_implemented',
				'code'        => 9000,
				'http_status' => 501,
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