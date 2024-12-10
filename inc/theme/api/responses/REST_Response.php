<?php

namespace Kotisivu\BlockTheme\Theme\Api\Responses;

defined( 'ABSPATH' ) || die();
/**
 * REST response
 * @package Kotisivu\BlockTheme
 */
class REST_Response extends WP_HTTP_Response {
	/**
	 * Response type
	 * @var string
	 */
	protected $type;

	public function __construct( $data, $status = 200, $headers = array() ) {
		parent::__construct( $data, $status, $headers );
		$this->type = $this->get_type();
	}

	public function get_type() {

	}
}
