<?php

declare(strict_types=1);

namespace App\Http\Controllers\Settings;

use Exception;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;

class CacheController {
    /**
     * Handle the incoming request.
     *
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public function purge(WP_REST_Request $request) {
        try {
            global $wpdb;

            // phpcs:ignore -- We need to use direct query here
            $transients = $wpdb->get_col(
                $wpdb->prepare(
                    'SELECT option_name FROM %i WHERE option_name LIKE %s',
                    $wpdb->options, // Name of the options table
                    '_transient_timeout_app-settings-%'
                )
            );

            foreach ($transients as $transient) {
                $key = str_replace('_transient_timeout_', '', $transient);
                delete_transient($key);
            }

            wp_cache_flush();
        } catch (Exception $e) {
            return new WP_Error('error_' . $e->getCode(), $e->getMessage());
        }

        return new WP_REST_Response(
            [
                'status'  => 'success',
                'type'    => 'fetch',
                'message' => __('Cache purged succesfully', 'kotisivu-block-theme'),
            ],
            200
        );
    }
}
