<?php
/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme;

defined( 'ABSPATH' ) || die();

interface MetaboxFieldInterface {
	/**
	 * Constructor
	 *
	 * @param string   $id    ID for field
	 * @param string   $label Label for field
	 * @param \WP_Post $post   WP_Post object
	 * @param array    $options Array of options for field
	 * @return void
	 */
	public function __construct( string $id, string $label = '', \WP_Post $post = null, array $options = array() );

	/**
	 * Get id
	 *
	 * @return string
	 */
	public function get_id(): string;

	/**
	 * Get label
	 *
	 * @return string
	 */
	public function get_label(): string;

	/**
	 * Get post
	 *
	 * @return \WP_Post
	 */
	public function get_post(): \WP_Post;

	/**
	 * Get options
	 *
	 * @return array
	 */
	public function get_options(): array;

	/**
	 * Get current value of field
	 *
	 * @return string
	 */
	public function get_value(): string;

	/**
	 * Get field html
	 *
	 * @param array  $field Data for field
	 * @param string $value Field value
	 * @return void
	 */
	public function get_html();

	/**
	 * Sanitize field
	 *
	 * @param string $value Field value
	 * @return string
	 */
	public function sanitize( string $value ): string;

	/**
	 * Save field
	 *
	 * @param int $post_id Post ID
	 * @return int
	 */
	public function save( int $post_id, array $options = array() ): void;

	/**
	 * Register rest field
	 *
	 * @return void
	 */
	public function register_rest_field(): void;
}
