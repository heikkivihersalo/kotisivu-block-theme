<?php

namespace Kotisivu\BlockTheme\Api;

defined( 'ABSPATH' ) or die();

class REST_Response extends \WP_HTTP_Response {
	protected $type;

	public function __construct( $data, $status = 200, $headers = array() ) {
		parent::__construct( $data, $status, $headers );
		$this->type = $this->get_type();
	}

	public function get_type() {
	}
}
