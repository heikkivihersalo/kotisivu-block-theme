<?php

namespace Kotisivu\BlockTheme\Api;

use Kotisivu\BlockTheme\Utils;

defined( 'ABSPATH' ) || die();

/**
 * RouteOptions class
 *
 * @package Kotisivu\BlockTheme
 */
class RouteOptions extends RouteBase implements RouteInterface {
	/**
	 * Register custom domain related rest routes
	 * @return void
	 */
	public function register_custom_endpoints(): void {
		/**
		 * Route for fetching contact information
		 * @method GET
		 */
		register_rest_route(
			RouteInterface::NAMESPACE . RouteInterface::VERSION,
			'/' . $this->base . '/contact',
			array(
				'methods'             => \WP_REST_Server::READABLE, // Alias for GET transport method.
				'callback'            => array( $this, 'get_contact_settings' ),
				'permission_callback' => Permission::PUBLIC->get_callback(),
			)
		);

		/**
		 * Route for updating contact information
		 * @method POST
		 */
		register_rest_route(
			RouteInterface::NAMESPACE . RouteInterface::VERSION,
			'/' . $this->base . '/contact',
			array(
				'methods'             => \WP_REST_Server::EDITABLE, // Alias for POST transport method.
				'callback'            => array( $this, 'update_contact_settings' ),
				'permission_callback' => Permission::ADMIN->get_callback(),
			)
		);

		/**
		 * Route for fetching social accounts
		 * @method GET
		 */
		register_rest_route(
			RouteInterface::NAMESPACE . RouteInterface::VERSION,
			'/' . $this->base . '/social',
			array(
				'methods'             => \WP_REST_Server::READABLE, // Alias for GET transport method.
				'callback'            => array( $this, 'get_social_settings' ),
				'permission_callback' => Permission::PUBLIC->get_callback(),
			)
		);

		/**
		 * Route for fetching social accounts
		 * @method GET
		 */
		register_rest_route(
			RouteInterface::NAMESPACE . RouteInterface::VERSION,
			'/' . $this->base . '/social',
			array(
				'methods'             => \WP_REST_Server::EDITABLE, // Alias for POST transport method.
				'callback'            => array( $this, 'update_social_settings' ),
				'permission_callback' => Permission::ADMIN->get_callback(),
			)
		);

		/**
		 * Route for fetching analytics settings
		 * @method GET
		 */
		register_rest_route(
			RouteInterface::NAMESPACE . RouteInterface::VERSION,
			'/' . $this->base . '/analytics',
			array(
				'methods'             => \WP_REST_Server::READABLE, // Alias for GET transport method.
				'callback'            => array( $this, 'get_analytics_settings' ),
				'permission_callback' => Permission::PUBLIC->get_callback(),
			)
		);

		/**
		 * Route for updating analytics settings
		 * @method POST
		 */
		register_rest_route(
			RouteInterface::NAMESPACE . RouteInterface::VERSION,
			'/' . $this->base . '/analytics',
			array(
				'methods'             => \WP_REST_Server::EDITABLE, // Alias for POST transport method.
				'callback'            => array( $this, 'update_analytics_settings' ),
				'permission_callback' => Permission::ADMIN->get_callback(),
			)
		);

		/**
		 * Route for getting ChatGPT settings
		 * @method GET
		 */
		register_rest_route(
			RouteInterface::NAMESPACE . RouteInterface::VERSION,
			'/' . $this->base . '/chatgpt',
			array(
				'methods'             => \WP_REST_Server::READABLE, // Alias for GET transport method.
				'callback'            => array( $this, 'get_chatgpt_settings' ),
				'permission_callback' => Permission::PUBLIC->get_callback(),
			)
		);

		/**
		 * Route for updating ChatGPT settings
		 * @method POST
		 */
		register_rest_route(
			RouteInterface::NAMESPACE . RouteInterface::VERSION,
			'/' . $this->base . '/chatgpt',
			array(
				'methods'             => \WP_REST_Server::EDITABLE, // Alias for POST transport method.
				'callback'            => array( $this, 'update_chatgpt_settings' ),
				'permission_callback' => Permission::ADMIN->get_callback(),
			)
		);

		/**
		 * Route for purging transient cache
		 * @method POST
		 */
		register_rest_route(
			RouteInterface::NAMESPACE . RouteInterface::VERSION,
			'/' . $this->base . '/purge-cache',
			array(
				'methods'             => \WP_REST_Server::CREATABLE, // Alias for POST transport method.
				'callback'            => array( $this, 'purge_transient_cache' ),
				'permission_callback' => Permission::ADMIN->get_callback(),
			)
		);
	}

	/**
	 * Get contact information
	 * @param \WP_REST_Request $request Request object
	 * @return \WP_REST_Response|\WP_Error Response object
	 */
	public function get_contact_settings( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		try {
			$result = UtilsOptions::get_contact_information();
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
	 * Update contact information
	 * @param \WP_REST_Request $request Request object
	 * @return \WP_REST_Response|\WP_Error Response object
	 * @throws \Exception If user does not have sufficient permissions.
	 */
	public function update_contact_settings( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		try {
			$result = UtilsOptions::update_contact_information( $request );
		} catch ( \Exception $e ) {
			return new \WP_Error( 'error_' . $e->getCode(), $e->getMessage() );
		}

		/**
		 * Return WP REST Response
		 */
		return new \WP_REST_Response(
			array(
				'status'  => 'success',
				'type'    => HTTP_Success::UPDATED_SUCCESSFULLY->get_type(),
				'message' => __( 'Updated succesfully', 'kotisivu-block-theme' ),
				'data'    => $result,
			),
			HTTP_Success::UPDATED_SUCCESSFULLY->get_http_status()
		);
	}

	/**
	 * Get social media settings
	 * @return \WP_REST_Response|\WP_Error Response object
	 */
	public function get_social_settings(): \WP_REST_Response|\WP_Error {
		try {
			$result = UtilsOptions::get_social_media_links();
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
	 * Update social media settings
	 * @param \WP_REST_Request $request Request object
	 * @return \WP_REST_Response|\WP_Error Response object
	 * @throws \Exception If user does not have sufficient permissions.
	 */
	public function update_social_settings( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		try {
			$result = UtilsOptions::update_social_media_links( $request );
		} catch ( \Exception $e ) {
			return new \WP_Error( 'error_' . $e->getCode(), $e->getMessage() );
		}

		/**
		 * Return WP REST Response
		 */
		return new \WP_REST_Response(
			array(
				'status'  => 'success',
				'type'    => HTTP_Success::UPDATED_SUCCESSFULLY->get_type(),
				'message' => __( 'Updated succesfully', 'kotisivu-block-theme' ),
				'data'    => $result,
			),
			HTTP_Success::UPDATED_SUCCESSFULLY->get_http_status()
		);
	}

	/**
	 * Get analytics settings
	 * @return \WP_REST_Response|\WP_Error Response object
	 */
	public function get_analytics_settings(): \WP_REST_Response|\WP_Error {
		try {
			$result = UtilsOptions::get_analytics_settings();
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
	 * Update analytics settings
	 * @param \WP_REST_Request $request Request object
	 * @return \WP_REST_Response|\WP_Error Response object
	 * @throws \Exception If user does not have sufficient permissions.
	 */
	public function update_analytics_settings( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		try {
			$result = UtilsOptions::update_analytics_settings( $request );
		} catch ( \Exception $e ) {
			return new \WP_Error( 'error_' . $e->getCode(), $e->getMessage() );
		}

		/**
		 * Return WP REST Response
		 */
		return new \WP_REST_Response(
			array(
				'status'  => 'success',
				'type'    => HTTP_Success::UPDATED_SUCCESSFULLY->get_type(),
				'message' => __( 'Updated succesfully', 'kotisivu-block-theme' ),
				'data'    => $result,
			),
			HTTP_Success::UPDATED_SUCCESSFULLY->get_http_status()
		);
	}

	/**
	 * Get ChatGPT settings
	 * @return \WP_REST_Response|\WP_Error Response object
	 */
	public function get_chatgpt_settings(): \WP_REST_Response|\WP_Error {
		try {
			$result = UtilsOptions::get_chatgpt_settings();
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
	 * Update ChatGPT settings
	 * @param \WP_REST_Request $request Request object
	 * @return \WP_REST_Response|\WP_Error Response object
	 * @throws \Exception If user does not have sufficient permissions.
	 */
	public function update_chatgpt_settings( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		try {
			$result = UtilsOptions::update_chatgpt_settings( $request );
		} catch ( \Exception $e ) {
			return new \WP_Error( 'error_' . $e->getCode(), $e->getMessage() );
		}

		/**
		 * Return WP REST Response
		 */
		return new \WP_REST_Response(
			array(
				'status'  => 'success',
				'type'    => HTTP_Success::UPDATED_SUCCESSFULLY->get_type(),
				'message' => __( 'Updated succesfully', 'kotisivu-block-theme' ),
				'data'    => $result,
			),
			HTTP_Success::UPDATED_SUCCESSFULLY->get_http_status()
		);
	}

	/**
	 * Purge transient cache
	 * @param \WP_REST_Request $request Request object
	 * @return \WP_REST_Response|\WP_Error Response object
	 * @throws \Exception If user does not have sufficient permissions.
	 */
	public function purge_transient_cache( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		try {
			Utils::purge_transient_cache();
		} catch ( \Exception $e ) {
			return new \WP_Error( 'error_' . $e->getCode(), $e->getMessage() );
		}

		/**
		 * Return WP REST Response
		 */
		return new \WP_REST_Response(
			array(
				'status'  => 'success',
				'type'    => HTTP_Success::CLEARED_SUCCESSFULLY->get_type(),
				'message' => __( 'Cache purged succesfully', 'kotisivu-block-theme' ),
			),
			HTTP_Success::CLEARED_SUCCESSFULLY->get_http_status()
		);
	}
}
