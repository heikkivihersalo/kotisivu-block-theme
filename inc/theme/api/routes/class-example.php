<?php

namespace Kotisivu\BlockTheme\Api;

defined( 'ABSPATH' ) or die();

/**
 *
 *
 * @package Kotisivu\BlockTheme
 */
class RouteExample extends RouteBase implements RouteInterface {
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
		// register_rest_route(
		// RouteInterface::NAMESPACE . RouteInterface::VERSION,
		// '/' . $this->base . '/example-route',
		// array(
		// 'methods' => \WP_REST_Server::READABLE, // Alias for GET transport method.
		// 'callback' => [$this, 'callback_function'],
		// 'permission_callback' =>  Permission::PUBLIC->get_callback()
		// )
		// );
	}

	/**
	 * @inheritDoc
	 */
	public function get_all_items( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		try {
			$result = ''; // Get items from database.
		} catch ( PaginationInvalidParametersException | PaginationOutOfRangeException $e ) {
			return new \WP_REST_Response(
				array(
					'status'  => 'error',
					'type'    => $e->getType(),
					'code'    => $e->getCode(),
					'message' => $e->getMessage(),
				),
				$e->getHttpStatus()
			);
		} catch ( \Exception $e ) {
			return new \WP_Error( 'error_' . $e->getCode(), $e->getMessage() );
		}

		$data       = $result['data']; // Data to return
		$pagination = $result['pagination']; // Pagination data

		/**
		 * Return WP REST Response
		 */
		return new \WP_REST_Response(
			array(
				'status'     => 'success',
				'type'       => HTTP_Success::FETCHED_SUCCESSFULLY->get_type(),
				'message'    => __( 'Fetched succesfully', 'kotisivu-block-theme' ),
				'data'       => $data,
				'pagination' => $pagination,
			),
			HTTP_Success::FETCHED_SUCCESSFULLY->get_http_status()
		);
	}

	/**
	 * @inheritDoc
	 */
	public function get_item_by_id( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		try {
			$result = ''; // Get item from database.
		} catch ( \Exception $e ) {
			return new \WP_Error( 'error_' . $e->getCode(), $e->getMessage() );
		}

		if ( $result ) :
			return new \WP_REST_Response(
				array(
					'status'  => 'success',
					'type'    => HTTP_Success::FETCHED_SUCCESSFULLY->get_type(),
					'message' => sprintf( __( 'Item with id "%s" fetched successfully.', 'kotisivu-block-theme' ), $request['id'] ),
					'data'    => $result,
				),
				HTTP_Success::FETCHED_SUCCESSFULLY->get_http_status()
			);
		else :
			return new \WP_REST_Response(
				array(
					'status'  => 'error',
					'type'    => HTTP_Error_Not_Found::GENERIC->get_type(),
					'code'    => HTTP_Error_Not_Found::GENERIC->get_code(),
					'message' => sprintf( __( 'Item with id "%s" not found.', 'kotisivu-block-theme' ), $request['id'] ),
					'data'    => null,
				),
				HTTP_Error_Not_Found::GENERIC->get_http_status()
			);
		endif;
	}
}
