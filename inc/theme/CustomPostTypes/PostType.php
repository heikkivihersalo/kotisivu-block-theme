<?php
/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme\Theme\CustomPostTypes;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\CustomPostTypes\CustomFields;
use Kotisivu\BlockTheme\Theme\CustomPostTypes\Traits\CustomPermalink;

/**
 * Create new custom post type
 *
 * @package Kotisivu\BlockTheme
 */
abstract class PostType {
	use CustomPermalink;

	/**
	 * Post type slug.
	 *
	 * @var string
	 */
	public $slug;

	/**
	 * Post type name.
	 *
	 * @var string
	 */
	public $name;

	/**
	 * Constructor
	 *
	 * @return void
	 */
	public function __construct( string $slug, string $name ) {
		$this->slug = $slug;
		$this->name = $name;
	}

	/**
	 * Register post type
	 * @return void
	 */
	public function register_custom_post_type(): void {
		/**
		 * Register post type
		 */
		register_post_type(
			$this->slug,
			array(
				'labels'       => $this->labels(),
				'public'       => true,
				'has_archive'  => true,
				'rewrite'      => array(
					'slug' => ( ! empty( get_option( 'kotisivu_block_theme_' . $this->slug ) ) ) ? get_option( 'kotisivu_block_theme_' . $this->slug ) : $this->slug,
				),
				'supports'     => $this->supports(),
				'show_in_rest' => true,
				'menu_icon'    => $this->icon(),
			)
		);

		/**
		 * Add metaboxes
		 */
		if ( count( $this->metaboxes() ) > 0 ) {
			new CustomFields(
				$this->metaboxes(),
				__( 'Custom Fields', 'kotisivu-block-theme' ),
				array( $this->slug ),
			);
		}

		/**
		 * Add permalink settings
		 */
		$this->add_permalink_setting( $this->slug, $this->name );
	}

	/**
	 * Custom Post Type Labels for post type
	 *
	 * @since 2.0.0
	 * @access public
	 * @return array
	 */
	public function labels() {
		return array(
			'name'               => _x( $this->slug, 'post type general name', 'kotisivu-block-theme' ),
			'singular_name'      => _x( $this->slug, 'post type singular name', 'kotisivu-block-theme' ),
			'menu_name'          => _x( $this->slug, 'admin menu', 'kotisivu-block-theme' ),
			'name_admin_bar'     => _x( $this->slug, 'add new on admin bar', 'kotisivu-block-theme' ),
			'add_new'            => _x( 'Add New', $this->slug, 'kotisivu-block-theme' ),
			'add_new_item'       => __( 'Add New ' . $this->slug, 'kotisivu-block-theme' ),
			'new_item'           => __( 'New ' . $this->slug, 'kotisivu-block-theme' ),
			'edit_item'          => __( 'Edit ' . $this->slug, 'kotisivu-block-theme' ),
			'view_item'          => __( 'View ' . $this->slug, 'kotisivu-block-theme' ),
			'all_items'          => __( 'All ' . $this->slug, 'kotisivu-block-theme' ),
			'search_items'       => __( 'Search ' . $this->slug, 'kotisivu-block-theme' ),
			'parent_item_colon'  => __( 'Parent ' . $this->slug . ':', 'kotisivu-block-theme' ),
			'not_found'          => __( 'No ' . $this->slug . ' found.', 'kotisivu-block-theme' ),
			'not_found_in_trash' => __( 'No ' . $this->slug . ' found in Trash.', 'kotisivu-block-theme' ),
		);
	}

	/**
	 * Add support for post type
	 *
	 * @return array
	 */
	public function supports() {
		return array(
			'title',
			'editor',
			'thumbnail',
		);
	}

	/**
	 * Add metaboxes
	 *
	 * @return void
	 */
	public function metaboxes() {
		return array(
			array(
				'id'    => 'text_input_1',
				'label' => __( 'Text Input 1', 'kotisivu-block-theme' ),
				'type'  => 'text',
			),
			array(
				'id'    => 'textarea_input_1',
				'label' => __( 'TextArea Input', 'kotisivu-block-theme' ),
				'type'  => 'textarea',
			),
			array(
				'id'    => 'url_input',
				'label' => __( 'URL Input', 'kotisivu-block-theme' ),
				'type'  => 'url',
			),
			array(
				'id'    => 'number_input',
				'label' => __( 'Number Input', 'kotisivu-block-theme' ),
				'type'  => 'number',
			),
			array(
				'id'    => 'checkbox_input',
				'label' => __( 'Checkbox Input', 'kotisivu-block-theme' ),
				'type'  => 'checkbox',
			),
			array(
				'id'      => 'checkbox_group_input',
				'label'   => __( 'Checkbox Group Input', 'kotisivu-block-theme' ),
				'type'    => 'checkbox-group',
				'options' => array(
					array(
						'value' => 'option1',
						'label' => 'Option 1',
					),
					array(
						'value' => 'option2',
						'label' => 'Option 2',
					),
					array(
						'value' => 'option3',
						'label' => 'Option 3',
					),
				),
			),
			array(
				'id'    => 'date_input',
				'label' => __( 'Date Input', 'kotisivu-block-theme' ),
				'type'  => 'date',
			),
			array(
				'id'    => 'image_input',
				'label' => __( 'Image Input', 'kotisivu-block-theme' ),
				'type'  => 'image',
			),
			array(
				'id'      => 'select_input',
				'label'   => __( 'Select Input', 'kotisivu-block-theme' ),
				'type'    => 'select',
				'options' => array(
					array(
						'value' => 'option1',
						'label' => 'Option 1',
					),
					array(
						'value' => 'option2',
						'label' => 'Option 2',
					),
					array(
						'value' => 'option3',
						'label' => 'Option 3',
					),
				),
			),
			array(
				'id'    => 'rich_text_input',
				'label' => __( 'Rich Text Input', 'kotisivu-block-theme' ),
				'type'  => 'rich-text',
			),
			array(
				'id'      => 'radio_group_input',
				'label'   => __( 'Radio Group Input', 'kotisivu-block-theme' ),
				'type'    => 'radio-group',
				'options' => array(
					array(
						'value' => 'option1',
						'label' => 'Option 1',
					),
					array(
						'value' => 'option2',
						'label' => 'Option 2',
					),
					array(
						'value' => 'option3',
						'label' => 'Option 3',
					),
				),
			),
		);
	}

	public function icon() {
		return 'dashicons-pressthis';
	}

	/**
	 * Register post type
	 *
	 * @return void
	 */
	abstract protected function register();
}
