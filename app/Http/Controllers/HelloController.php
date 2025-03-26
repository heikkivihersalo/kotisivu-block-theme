<?php

namespace App\Http\Controllers;

use WP_REST_Request;
use WP_REST_Response;

class HelloController {
    public function index(WP_REST_Request $request) {
        return new WP_REST_Response(
            [
                'message' => 'Hello World',
            ]
        );
    }
}
