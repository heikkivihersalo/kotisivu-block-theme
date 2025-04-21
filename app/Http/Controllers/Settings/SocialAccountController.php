<?php

declare(strict_types=1);

namespace App\Http\Controllers\Settings;

use App\Models\Settings\SocialAccount;
use Exception;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;

class SocialAccountController {
    /**
     * The analytics settings.
     *
     * @var Contact
     */
    protected SocialAccount $socials;

    /**
     * Constructor
     */
    public function __construct() {
        $this->socials = new SocialAccount();
    }

    /**
     * Handle the incoming request.
     *
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public function index(WP_REST_Request $request) {
        try {
            $result = $this->socials->all();
        } catch (Exception $e) {
            return new WP_Error('error_' . $e->getCode(), $e->getMessage());
        }

        return new WP_REST_Response(
            [
                'status'  => 'success',
                'type'    => 'fetch',
                'message' => __('Fetched succesfully', 'kotisivu-block-theme'),
                'data'    => $result,
            ],
            200
        );
    }

    /**
     * Update the settings.
     *
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public function update(WP_REST_Request $request) {
        try {
            $values = json_decode($request->get_body(), true) ?: [];
            $result = $this->socials->save($values);
        } catch (Exception $e) {
            return new WP_Error('error_' . $e->getCode(), $e->getMessage());
        }

        return new WP_REST_Response(
            [
                'status'  => 'success',
                'type'    => 'update',
                'message' => __('Updated succesfully', 'kotisivu-block-theme'),
                'data'    => $result,
            ],
            200
        );
    }
}
