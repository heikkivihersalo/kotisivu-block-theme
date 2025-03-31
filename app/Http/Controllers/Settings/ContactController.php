<?php

namespace App\Http\Controllers\Settings;

use WP_REST_Request;
use WP_REST_Response;
use WP_Error;
use Exception;
use App\Models\Settings\Contact;

class ContactController {
    /**
     * The analytics settings.
     *
     * @var Contact
     */
    protected Contact $contact;

    /**
     * Constructor
     */
    public function __construct() {
        $this->contact = new Contact();
    }

    /**
     * Handle the incoming request.
     *
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public function index(WP_REST_Request $request) {
        try {
            $result = $this->contact->all();
        } catch (Exception $e) {
            return new WP_Error('error_' . $e->getCode(), $e->getMessage());
        }

        return new WP_REST_Response(
            array(
                'status'  => 'success',
                'type'    => 'fetch',
                'message' => __('Fetched succesfully', 'kotisivu-block-theme'),
                'data'    => $result,
            ),
            200
        );
    }

    /**
     * Update the settings.
     *
     * @param \WP_REST_Request $request
     * @return \WP_REST_Response
     */
    public function update(WP_REST_Request $request) {
        try {
            $result = $this->contact->save($request->get_body());
        } catch (Exception $e) {
            return new WP_Error('error_' . $e->getCode(), $e->getMessage());
        }

        return new WP_REST_Response(
            array(
                'status'  => 'success',
                'type'    => 'update',
                'message' => __('Updated succesfully', 'kotisivu-block-theme'),
                'data'    => $result,
            ),
            200
        );
    }
}
