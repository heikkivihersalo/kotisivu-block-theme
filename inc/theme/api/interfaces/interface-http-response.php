<?php

namespace Kotisivu\BlockTheme\Api;

defined( 'ABSPATH' ) || die();

interface HTTP_Response_Interface {
	public function values();
	public function get_type();
	public function get_message();
	public function get_http_status();
}
