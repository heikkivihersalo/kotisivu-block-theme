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
	 * @since 2.0.0
	 * @access public
	 * @var string
	 */
	public $slug;

	/**
	 * Post type name.
	 *
	 * @since 2.0.0
	 * @access public
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
	 *
	 * @since 2.0.0
	 * @access public
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
			'name'               => $this->name,
			'singular_name'      => $this->name,
			'menu_name'          => $this->name,
			'name_admin_bar'     => $this->name,
			'add_new'            => 'Add New' . $this->name,
			'add_new_item'       => 'Add New' . $this->name,
			'new_item'           => 'New ' . $this->slug,
			'edit_item'          => 'Edit ' . $this->slug,
			'view_item'          => 'View ' . $this->slug,
			'all_items'          => 'All ' . $this->slug,
			'search_items'       => 'Search ' . $this->slug,
			'parent_item_colon'  => 'Parent ' . $this->slug . ':',
			'not_found'          => 'No ' . $this->slug . ' found.',
			'not_found_in_trash' => 'No ' . $this->slug . ' found in Trash.',
		);
	}

	/**
	 * Add support for post type
	 *
	 * @since 2.0.0
	 * @access public
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
	 * @since 2.0.0
	 * @access public
	 * @return array
	 */
	public function metaboxes(): array {
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

	/**
	 * Icon for post type
	 *
	 * @since 2.0.0
	 * @access public
	 * @return string
	 */
	public function icon() {
		return 'dashicons-pressthis';
	}

	/**
	 * Register post type
	 *
	 * @since 2.0.0
	 * @access protected
	 * @return void
	 */
	abstract protected function register();
}
