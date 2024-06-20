<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

interface MetaboxFieldInterface {
    /**
     * Constructor
     * @param string $id
     * @param string $label
     * @param \WP_Post $post
     * @return void
     */
    public function __construct(string $id, string $label = '', \WP_Post $post = null);

    /**
     * Get id
     * @return string
     */
    public function get_id(): string;

    /**
     * Get label
     * @return string
     */
    public function get_label(): string;

    /**
     * Get post
     * @return \WP_Post
     */
    public function get_post(): \WP_Post;

    /**
     * Get options
     * @return array
     */
    public function get_options(): array;

    /**
     * Get current value of field
     * @return string
     */
    public function get_value(): string;

    /**
     * Get field html
     * @param array $field
     * @param string $value
     * @return void
     */
    public function get_html();

    /**
     * Sanitize field
     * @param string value
     * @return string
     */
    public function sanitize(string $value): string;

    /**
     * Save field
     * @param int $post_id
     * @return int
     */
    public function save(int $post_id, array $options = []): void;

    /**
     * Register rest field
     * @return void
     */
    public function register_rest_field(): void;
}
