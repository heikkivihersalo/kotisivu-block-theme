<?php

namespace Kotisivu\BlockTheme\Api;

use Kotisivu\BlockTheme\Utils;

defined( 'ABSPATH' ) or die();

/**
 *
 *
 * @package Kotisivu\BlockTheme
 */
class RouteOptions extends RouteBase implements RouteInterface {
	/**
	 * Register custom domain related rest routes
	 *
	 * @return void
	 */
	public function register_custom_endpoints(): void {
		/**
		 * Route for fetching contact information
		 *
		 * @method GET
		 */
		register_rest_route(
			RouteInterface::NAMESPACE . RouteInterface::VERSION,
			'/' . $this->base . '/contact',
			array(
				'methods'             => \WP_REST_Server::READABLE, // Alias for GET transport method.
				'callback'            => array( $this, 'get_contact_information' ),
				'permission_callback' => Permission::ADMIN->get_callback(),
			)
		);

		/**
		 * Route for fetching social accounts
		 *
		 * @method GET
		 */
		register_rest_route(
			RouteInterface::NAMESPACE . RouteInterface::VERSION,
			'/' . $this->base . '/social',
			array(
				'methods'             => \WP_REST_Server::READABLE, // Alias for GET transport method.
				'callback'            => array( $this, 'get_social_accounts' ),
				'permission_callback' => Permission::ADMIN->get_callback(),
			)
		);
	}

	/**
	 * Get contact information
	 *
	 * @param \WP_REST_Request $request
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function get_contact_information( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		try {
			$result = Utils::get_options_file( 'site-contact' );
		} catch ( \Exception $e ) {
			return new \WP_Error( 'error_' . $e->getCode(), $e->getMessage() );
		}

		/**
		 * Return WP REST Response
		 */
		return new \WP_REST_Response(
			array(
				'status'  => 'success',
				'type'    => HTTP_Success::FETCHED_SUCCESSFULLY->get_type(),
				'message' => __( 'Fetched succesfully', 'kotisivu-block-theme' ),
				'data'    => $result,
			),
			HTTP_Success::FETCHED_SUCCESSFULLY->get_http_status()
		);
	}

	/**
	 * Get social accounts
	 *
	 * @param \WP_REST_Request $request
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function get_social_accounts( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		try {
			$result = Utils::get_options_file( 'site-social' );
		} catch ( \Exception $e ) {
			return new \WP_Error( 'error_' . $e->getCode(), $e->getMessage() );
		}

		/**
		 * Return WP REST Response
		 */
		return new \WP_REST_Response(
			array(
				'status'  => 'success',
				'type'    => HTTP_Success::FETCHED_SUCCESSFULLY->get_type(),
				'message' => __( 'Fetched succesfully', 'kotisivu-block-theme' ),
				'data'    => $result,
			),
			HTTP_Success::FETCHED_SUCCESSFULLY->get_http_status()
		);
	}
}
