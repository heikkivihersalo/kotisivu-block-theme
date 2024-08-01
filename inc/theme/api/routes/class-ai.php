<?php

namespace Kotisivu\BlockTheme\Api;

defined( 'ABSPATH' ) || die();

/**
 *
 *
 * @package Kotisivu\BlockTheme
 */
class RouteAI extends RouteBase implements RouteInterface {
	/**
	 * Register custom domain related rest routes
	 *
	 * @return void
	 */
	public function register_custom_endpoints(): void {
		/**
		 * Example custom route
		 *
		 * @method GET
		 */
		register_rest_route(
			RouteInterface::NAMESPACE . RouteInterface::VERSION,
			'/' . $this->base . '/generate',
			array(
				'methods'             => \WP_REST_Server::EDITABLE, // Alias for GET transport method.
				'callback'            => array( $this, 'generate_open_ai_content' ),
				'permission_callback' => Permission::ADMIN->get_callback(),
			)
		);
	}

	/**
	 * Generate content through Open AI
	 * @param \WP_REST_Request $request Request object
	 * @return \WP_REST_Response|\WP_Error Response object
	 * @throws \Exception If user does not have sufficient permissions.
	 */
	public function generate_open_ai_content( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		try {
			$result = UtilsAI::get_open_ai_content( $request );
		} catch ( \Exception $e ) {
			return new \WP_Error( 'error_' . $e->getCode(), $e->getMessage() );
		}

		/**
		 * Return WP REST Response
		 */
		return new \WP_REST_Response(
			$result,
			HTTP_Success::UPDATED_SUCCESSFULLY->get_http_status()
		);
	}
}
