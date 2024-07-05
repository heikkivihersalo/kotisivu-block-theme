<?php

namespace Kotisivu\BlockTheme\Api;

defined( 'ABSPATH' ) || die();

require_once dirname( __DIR__ ) . '/interfaces/interface-http-response.php';

/**
 * HTTP Response enum
 *
 * @since 1.0.0
 * @package Kotisivu\BlockTheme\Api
 */
enum HTTP_Success implements HTTP_Response_Interface {
	case FETCHED_SUCCESSFULLY;
	case CREATED_SUCCESSFULLY;
	case UPDATED_SUCCESSFULLY;
	case DELETED_SUCCESSFULLY;
	case CLEARED_SUCCESSFULLY;

	public function values(): array {
		return match ( $this ) {
			self::FETCHED_SUCCESSFULLY => array(
				'message'     => __( 'Resource fetched successfully.', 'kotisivu-block-theme' ),
				'type'        => 'fetch_success',
				'http_status' => 200,
			),
			self::CREATED_SUCCESSFULLY => array(
				'message'     => __( 'Resource created successfully.', 'kotisivu-block-theme' ),
				'type'        => 'create_success',
				'http_status' => 201,
			),
			self::UPDATED_SUCCESSFULLY => array(
				'message'     => __( 'Resource updated successfully.', 'kotisivu-block-theme' ),
				'type'        => 'update_success',
				'http_status' => 200,
			),
			self::DELETED_SUCCESSFULLY => array(
				'message'     => __( 'Resource deleted successfully.', 'kotisivu-block-theme' ),
				'type'        => 'delete_success',
				'http_status' => 200,
			),
			self::CLEARED_SUCCESSFULLY => array(
				'message'     => __( 'Resource cleared successfully.', 'kotisivu-block-theme' ),
				'type'        => 'clear_success',
				'http_status' => 200,
			),
		};
	}

	public function get_type(): string {
		return match ( $this ) {
			self::FETCHED_SUCCESSFULLY,
			self::CREATED_SUCCESSFULLY,
			self::UPDATED_SUCCESSFULLY,
			self::DELETED_SUCCESSFULLY,
			self::CLEARED_SUCCESSFULLY => $this->values()['type'],
		};
	}

	public function get_message(): string {
		return match ( $this ) {
			self::FETCHED_SUCCESSFULLY,
			self::CREATED_SUCCESSFULLY,
			self::UPDATED_SUCCESSFULLY,
			self::DELETED_SUCCESSFULLY,
			self::CLEARED_SUCCESSFULLY => $this->values()['message'],
		};
	}

	public function get_http_status(): int {
		return match ( $this ) {
			self::FETCHED_SUCCESSFULLY,
			self::CREATED_SUCCESSFULLY,
			self::UPDATED_SUCCESSFULLY,
			self::DELETED_SUCCESSFULLY,
			self::CLEARED_SUCCESSFULLY => $this->values()['http_status'],
		};
	}

	public function get_response_body( string $message = null, array $data = null, array $pagination = null ): array {
		return match ( $this ) {
			self::FETCHED_SUCCESSFULLY => array(
				'status'     => 'success',
				'type'       => $this->values()['type'],
				'message'    => $message
					? $message
					: $this->values()['message'],
				'data'       => $data,
				'pagination' => $pagination ? $pagination : null,
			),
			self::CREATED_SUCCESSFULLY,
			self::UPDATED_SUCCESSFULLY,
			self::DELETED_SUCCESSFULLY,
			self::CLEARED_SUCCESSFULLY => array(
				'status'  => 'success',
				'type'    => $this->values()['type'],
				'message' => $message
					? $message
					: $this->values()['message'],
				'data'    => $data,
			)
		};
	}
}
