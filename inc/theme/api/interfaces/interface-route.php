<?php

namespace Kotisivu\BlockTheme\Api;

defined('ABSPATH') or die();

interface RouteInterface {
    const VERSION = '1';
    const NAMESPACE = 'kotisivu-block-theme/v';

    /**
     * Register default CRUD endpoints
     * @return void
     */
    public function register_crud_endpoints(): void;

    /**
     * Get all items from database
     * @param WP_REST_Request $request
     * @return WP_REST_Response|WP_Error 
     */
    public function get_all_items(\WP_REST_Request $request): \WP_REST_Response|\WP_Error;

    /**
     * Get item by id
     * @param WP_REST_Request $request
     * @return WP_REST_Response|WP_Error
     */
    public function get_item_by_id(\WP_REST_Request $request): \WP_REST_Response|\WP_Error;

    /**
     * Create item
     * @param WP_REST_Request $request
     * @return WP_REST_Response|WP_Error
     */
    public function create_item(\WP_REST_Request $request): \WP_REST_Response|\WP_Error;

    /**
     * Update item
     * @param WP_REST_Request $request
     * @return WP_REST_Response|WP_Error
     */
    public function update_item(\WP_REST_Request $request): \WP_REST_Response|\WP_Error;

    /**
     * Delete item
     * @param WP_REST_Request $request
     * @return WP_REST_Response|WP_Error
     */
    public function delete_item(\WP_REST_Request $request): \WP_REST_Response|\WP_Error;
}
