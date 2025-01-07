<?php
/**
 * HTTP Error Update Failed
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Api\Enums\HTTP_Error_Update_Failed
 */

namespace Kotisivu\BlockTheme\Theme\Api\Enums;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\Api\Interfaces\HTTP_Response_Interface;

/**
 * HTTP Error Update Failed
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Api\Enums\HTTP_Error_Update_Failed
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
enum HTTP_Error_Update_Failed implements HTTP_Response_Interface {
	case GENERIC;

	public function values(): array {
		return match ( $this ) {
			self::GENERIC => array(
				'message'     => __( 'Failed to update resource.', 'kotisivu-block-theme' ),
				'type'        => 'update_failed',
				'code'        => 4000,
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
