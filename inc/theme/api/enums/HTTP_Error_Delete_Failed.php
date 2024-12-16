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

use Kotisivu\BlockTheme\Theme\Api\Interfaces\HTTP_Response_Interface;

/**
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Api\Enums\
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
enum HTTP_Error_Delete_Failed implements HTTP_Response_Interface {
	case GENERIC;

	public function values(): array {
		return match ( $this ) {
			self::GENERIC => array(
				'message'     => __( 'Failed to delete resource.', 'kotisivu-block-theme' ),
				'type'        => 'delete_failed',
				'code'        => 5000,
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
