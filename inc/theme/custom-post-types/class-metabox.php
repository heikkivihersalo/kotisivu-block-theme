<?php

namespace Kotisivu\BlockTheme;

defined( 'ABSPATH' ) || die();

/**
 * Metabox class for adding custom fields to post types
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */
class Metabox {
	/**
	 * Nonce
	 *
	 * @var string
	 */
	protected $nonce = 'kotisivu_block_theme_metabox_nonce';

	/**
	 * Metabox fields
	 *
	 * @var array
	 */
	protected array $fields = array();

	/**
	 * Metabox title
	 *
	 * @var string
	 */
	protected string $title;

	/**
	 * Metabox label
	 *
	 * @var string
	 */
	protected string $label;

	/**
	 * Post types
	 *
	 * @var array
	 */
	protected array $post_types = array( 'post', 'page' );

	/**
	 * Position
	 *
	 * @var string [ normal | advanced | side ]
	 */
	protected string $position = 'normal';

	/**
	 * Priority
	 *
	 * @var string
	 */
	protected string $priority = 'high';

	/**
	 * Constructor
	 *
	 * @param array  $fields Fields to display in metabox
	 * @param string $title Title of metabox
	 * @param array  $post_types Post types to display metabox on (default: post, page)
	 * @param string $position Position of metabox (default: normal)
	 * @param string $priority Priority of metabox (default: high)
	 * @return void
	 */
	public function __construct( array $fields, string $title, array $post_types = array( 'post', 'page' ), string $position = 'normal', string $priority = 'high' ) {
		$this->fields     = $fields;
		$this->title      = $title;
		$this->post_types = $post_types;
		$this->position   = $position;
		$this->priority   = $priority;

		add_action( 'add_meta_boxes', array( $this, 'add_metabox' ) );
		add_action( 'save_post', array( $this, 'save_metabox' ) );
	}

	/**
	 * Add metabox
	 *
	 * @return void
	 */
	public function add_metabox(): void {
		add_meta_box(
			preg_replace( '/\s+/', '-', strtolower( $this->title ) ),
			$this->title,
			array( $this, 'render_html' ),
			$this->post_types,
			$this->position,
			$this->priority
		);
	}

	/**
	 * Render metabox
	 *
	 * @param \WP_Post $post Post object
	 * @return void
	 */
	public function render_html( \WP_Post $post ): void {
		wp_nonce_field( basename( __FILE__ ), $this->nonce );

		echo '<table class="form-table">';
		echo '<tbody>';

		foreach ( $this->fields as $field ) :
			switch ( $field['type'] ) {
				case 'checkbox':
					$checkbox_field = new CheckboxField( $field['id'], $field['label'], $post );
					echo $checkbox_field->get_html();
					break;

				case 'checkbox-group':
					$checkbox_group_field = new CheckboxGroupField( $field['id'], $field['label'], $post, $field['options'] );
					echo $checkbox_group_field->get_html();
					break;

				case 'date':
					$date_field = new DateField( $field['id'], $field['label'], $post );
					echo $date_field->get_html();
					break;

				case 'image':
					$image_field = new ImageField( $field['id'], $field['label'], $post );
					echo $image_field->get_html();
					break;

				case 'number':
					$number_field = new NumberField( $field['id'], $field['label'], $post );
					echo $number_field->get_html();
					break;

				case 'radio-group':
					$radio_group_field = new RadioGroupField( $field['id'], $field['label'], $post, $field['options'] );
					echo $radio_group_field->get_html();
					break;

				case 'rich-text':
					$rich_text_field = new RichTextField( $field['id'], $field['label'], $post );
					echo $rich_text_field->get_html();
					break;

				case 'select':
					$select_field = new SelectField( $field['id'], $field['label'], $post, $field['options'] );
					echo $select_field->get_html();
					break;

				case 'text':
					$text_field = new TextField( $field['id'], $field['label'], $post );
					echo $text_field->get_html();
					break;

				case 'textarea':
					$textarea_field = new TextAreaField( $field['id'], $field['label'], $post );
					echo $textarea_field->get_html();
					break;

				case 'url':
					$url_field = new UrlField( $field['id'], $field['label'], $post );
					echo $url_field->get_html();
					break;

				default:
					// code...
					break;
			}
		endforeach;

		echo '</tbody>';
		echo '</table>';
	}

	/**
	 * Save metabox
	 *
	 * @param int $post_id Post ID
	 * @return int Post ID
	 */
	public function save_metabox( int $post_id ): int {
		/**
		 * Validate save function
		 */
		$sanitized_nonce = isset( $_POST[ $this->nonce ] ) ? sanitize_text_field( $_POST[ $this->nonce ] ) : '';
		$nonce_action    = basename( __FILE__ );

		if ( ! wp_verify_nonce( $sanitized_nonce, $nonce_action ) ) {
			return $post_id;
		}

		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return $post_id;
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return $post_id;
		}

		/**
		 * Sanitize fields
		 */
		foreach ( $this->fields as $field ) :
			switch ( $field['type'] ) {
				case 'checkbox-group':
					$checkbox_group = new CheckboxGroupField( $field['id'] );
					$checkbox_group->save_group( $post_id, $field['options'] );
					break;

				case 'checkbox':
					$checkbox_field = new CheckboxField( $field['id'] );
					$checkbox_field->save( $post_id );
					break;

				case 'date':
					$date_field = new DateField( $field['id'] );
					$date_field->save( $post_id );
					break;

				case 'image':
					$image_field = new ImageField( $field['id'] );
					$image_field->save( $post_id );
					break;

				case 'number':
					$number_field = new NumberField( $field['id'] );
					$number_field->save( $post_id );
					break;

				case 'rich-text':
					$rich_text_field = new RichTextField( $field['id'] );
					$rich_text_field->save( $post_id );
					break;

				case 'radio-group':
					$radio_group_field = new RadioGroupField( $field['id'] );
					$radio_group_field->save( $post_id );
					break;

				case 'select':
					$select_field = new SelectField( $field['id'] );
					$select_field->save( $post_id );
					break;

				case 'text':
					$text_field = new TextField( $field['id'] );
					$text_field->save( $post_id );
					break;

				case 'textarea':
					$textarea_field = new TextAreaField( $field['id'] );
					$textarea_field->save( $post_id );
					break;

				case 'url':
					$url_field = new UrlField( $field['id'] );
					$url_field->save( $post_id );
					break;

				default:
					// code...
					break;
			}
		endforeach;

		return $post_id;
	}
}
