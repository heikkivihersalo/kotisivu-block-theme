<?php
/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme\Theme\CustomPostTypes\CustomFields;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\CustomPostTypes\Interfaces\CustomFieldInterface;

/**
 *
 *
 * @package Kotisivu\BlockTheme
 */
abstract class CustomField implements CustomFieldInterface {
	/**
	 * Field id
	 *
	 * @var string
	 */
	protected string $id;

	/**
	 * Field label
	 *
	 * @var string
	 */
	protected string $label;

	/**
	 * Post
	 *
	 * @var \WP_Post
	 */
	protected $post;

	/**
	 * Field options
	 *
	 * @var array
	 */
	protected $options;

	/**
	 * @inheritDoc
	 */
	public function __construct( string $id, string $label = '', \WP_Post $post = null, array $options = array() ) {
		$this->id      = $id;
		$this->label   = $label;
		$this->post    = $post;
		$this->options = $options;
	}

	/**
	 * @inheritDoc
	 */
	public function get_id(): string {
		return $this->id;
	}

	/**
	 * @inheritDoc
	 */
	public function get_label(): string {
		if ( empty( $this->label ) ) {
			return $this->id;
		}

		return $this->label;
	}

	/**
	 * @inheritDoc
	 */
	public function get_post(): \WP_Post {
		return $this->post;
	}

	/**
	 * @inheritDoc
	 */
	public function get_options(): array {
		return $this->options;
	}

	/**
	 * @inheritDoc
	 */
	public function get_value(): string {
		return esc_attr( get_post_meta( $this->post->ID, $this->id, true ) );
	}

	/**
	 * @inheritDoc
	 */
	abstract public function get_html(): string;

	/**
	 * @inheritDoc
	 */
	public function sanitize( string $value ): string {
		return sanitize_text_field( $value );
	}

	/**
	 * @inheritDoc
	 */
	public function save( int $post_id, array $options = array() ): void {
		// Nonce verification is done in the parent class so we can safely ignore it here.
		if ( array_key_exists( $this->id, $_POST ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
			$val = $this->sanitize( $_POST[ $this->id ] ); // phpcs:ignore
			update_post_meta( $post_id, $this->id, $val );
		}
	}

	/**
	 * @inheritDoc
	 */
	public function save_group( int $post_id, array $options ): void {
		foreach ( $options as $option ) {
			// Nonce verification is done in the parent class so we can safely ignore it here.
			if ( isset( $_POST[ $this->id . '_' . $option['value'] ] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
				update_post_meta( $post_id, $this->id . '_' . $option['value'], '1' );
			} else {
				delete_post_meta( $post_id, $this->id . '_' . $option['value'] );
			}
		}
	}

	/**
	 * @inheritDoc
	 */
	public function register_rest_field(): void {
		register_rest_field(
			$this->post_types,
			$this->id,
			array(
				'get_callback' => function ( $post ) {
					return get_post_meta( $post['id'], $this->id, true );
				},
				'schema'       => array(
					'description' => $this->label,
					'type'        => 'string',
				),
			)
		);
	}
}
