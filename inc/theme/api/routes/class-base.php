<?php

namespace Kotisivu\BlockTheme\Api;

defined( 'ABSPATH' ) || die();

/**
 *
 *
 * @package Kotisivu\BlockTheme
 */
abstract class RouteBase extends Api implements RouteInterface {
	/**
	 * Path base
	 *
	 * @var string
	 */
	protected $base;

	/**
	 * Constructor
	 *
	 * @return void
	 */
	public function __construct( $base ) {
		/**
		 * Set attributes
		 */
		$this->base = $base;
	}

	/**
	 * @inheritDoc
	 */
	public function register_crud_endpoints(): void {
		/**
		 * Get all items
		 * Takes optional query parameters: page, per_page
		 *
		 * @method GET
		 */
		register_rest_route(
			RouteInterface::NAMESPACE . RouteInterface::VERSION,
			'/' . $this->base,
			array(
				'methods'             => \WP_REST_Server::READABLE, // Alias for GET transport method.
				'callback'            => array( $this, 'get_all_items' ),
				'permission_callback' => Permission::ADMIN->get_callback(),
			)
		);

		/**
		 * Get item by id
		 *
		 * @method GET
		 */
		register_rest_route(
			RouteInterface::NAMESPACE . RouteInterface::VERSION,
			'/' . $this->base . '/' . Regex::NUMERIC_ID->get_request_regex(),
			array(
				'methods'             => \WP_REST_Server::READABLE, // Alias for GET transport method.
				'callback'            => array( $this, 'get_item_by_id' ),
				'permission_callback' => Permission::ADMIN->get_callback(),
			)
		);

		/**
		 * Create new item
		 *
		 * @method POST
		 */
		register_rest_route(
			RouteInterface::NAMESPACE . RouteInterface::VERSION,
			'/' . $this->base,
			array(
				'methods'             => \WP_REST_Server::CREATABLE, // Alias for POST transport method.
				'callback'            => array( $this, 'create_item' ),
				'permission_callback' => Permission::ADMIN->get_callback(),
			)
		);

		/**
		 * Update item by id
		 *
		 * @method PUT
		 */
		register_rest_route(
			RouteInterface::NAMESPACE . RouteInterface::VERSION,
			'/' . $this->base . '/' . Regex::NUMERIC_ID->get_request_regex(),
			array(
				'methods'             => \WP_REST_Server::EDITABLE, // Alias for POST, PUT, PATCH transport methods together.
				'callback'            => array( $this, 'update_item' ),
				'permission_callback' => Permission::ADMIN->get_callback(),
			)
		);

		/**
		 * Delete item by id
		 *
		 * @method DELETE
		 */
		register_rest_route(
			RouteInterface::NAMESPACE . RouteInterface::VERSION,
			'/' . $this->base . '/' . Regex::NUMERIC_ID->get_request_regex(),
			array(
				'methods'             => \WP_REST_Server::DELETABLE, // Alias for DELETE transport method.
				'callback'            => array( $this, 'delete_item' ),
				'permission_callback' => Permission::ADMIN->get_callback(),
			)
		);
	}

	/**
	 * @inheritDoc
	 */
	public function get_all_items( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		return new \WP_REST_Response(
			array(
				'status'  => 'error',
				'type'    => HTTP_Error_Not_Implemented::GENERIC->get_type(),
				'code'    => HTTP_Error_Not_Implemented::GENERIC->get_code(),
				'message' => HTTP_Error_Not_Implemented::GENERIC->get_message(),
				'data'    => null,
			),
			HTTP_Error_Not_Implemented::GENERIC->get_http_status()
		);
	}

	/**
	 * @inheritDoc
	 */
	public function get_item_by_id( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		return new \WP_REST_Response(
			array(
				'status'  => 'error',
				'type'    => HTTP_Error_Not_Implemented::GENERIC->get_type(),
				'code'    => HTTP_Error_Not_Implemented::GENERIC->get_code(),
				'message' => HTTP_Error_Not_Implemented::GENERIC->get_message(),
				'data'    => null,
			),
			HTTP_Error_Not_Implemented::GENERIC->get_http_status()
		);
	}

	/**
	 * @inheritDoc
	 */
	public function create_item( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		return new \WP_REST_Response(
			array(
				'status'  => 'error',
				'type'    => HTTP_Error_Not_Implemented::GENERIC->get_type(),
				'code'    => HTTP_Error_Not_Implemented::GENERIC->get_code(),
				'message' => HTTP_Error_Not_Implemented::GENERIC->get_message(),
				'data'    => null,
			),
			HTTP_Error_Not_Implemented::GENERIC->get_http_status()
		);
	}

	/**
	 * @inheritDoc
	 */
	public function update_item( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		return new \WP_REST_Response(
			array(
				'status'  => 'error',
				'type'    => HTTP_Error_Not_Implemented::GENERIC->get_type(),
				'code'    => HTTP_Error_Not_Implemented::GENERIC->get_code(),
				'message' => HTTP_Error_Not_Implemented::GENERIC->get_message(),
				'data'    => null,
			),
			HTTP_Error_Not_Implemented::GENERIC->get_http_status()
		);
	}

	/**
	 * @inheritDoc
	 */
	public function delete_item( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		return new \WP_REST_Response(
			array(
				'status'  => 'error',
				'type'    => HTTP_Error_Not_Implemented::GENERIC->get_type(),
				'code'    => HTTP_Error_Not_Implemented::GENERIC->get_code(),
				'message' => HTTP_Error_Not_Implemented::GENERIC->get_message(),
				'data'    => null,
			),
			HTTP_Error_Not_Implemented::GENERIC->get_http_status()
		);
	}
}
