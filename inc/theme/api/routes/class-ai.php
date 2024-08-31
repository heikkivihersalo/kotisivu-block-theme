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
		 * Text generation through Open AI
		 *
		 * @method GET
		 */
		register_rest_route(
			RouteInterface::NAMESPACE . RouteInterface::VERSION,
			'/' . $this->base . '/text/generate',
			array(
				'methods'             => \WP_REST_Server::EDITABLE, // Alias for GET transport method.
				'callback'            => array( $this, 'generate_ai_text_content' ),
				'permission_callback' => Permission::ADMIN->get_callback(),
			)
		);

		/**
		 * Image generation through Open AI
		 */
		register_rest_route(
			RouteInterface::NAMESPACE . RouteInterface::VERSION,
			'/' . $this->base . '/image/generate',
			array(
				'methods'             => \WP_REST_Server::EDITABLE, // Alias for GET transport method.
				'callback'            => array( $this, 'generate_ai_image_content' ),
				'permission_callback' => Permission::ADMIN->get_callback(),
			)
		);

		/**
		 * Save image to media library
		 */
		register_rest_route(
			RouteInterface::NAMESPACE . RouteInterface::VERSION,
			'/' . $this->base . '/image/save',
			array(
				'methods'             => \WP_REST_Server::EDITABLE, // Alias for GET transport method.
				'callback'            => array( $this, 'save_image_to_media_library' ),
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
	public function generate_ai_text_content( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		try {
			$result = UtilsAI::get_open_ai_text_content( $request );
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

	/**
	 * Generate content through Open AI
	 * @param \WP_REST_Request $request Request object
	 * @return \WP_REST_Response|\WP_Error Response object
	 * @throws \Exception If user does not have sufficient permissions.
	 */
	public function generate_ai_image_content( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		try {
			$result = UtilsAI::get_open_ai_image_content( $request );
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

	/**
	 * Save image to media library
	 * @param \WP_REST_Request $request Request object
	 * @return \WP_REST_Response|\WP_Error Response object
	 * @throws \Exception If user does not have sufficient permissions.
	 */
	public function save_image_to_media_library( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		try {
			$result = UtilsAI::save_image_to_media_library( $request );
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
