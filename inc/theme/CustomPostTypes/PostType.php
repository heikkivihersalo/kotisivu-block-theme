<?php
/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme\Theme\CustomPostTypes;

defined( 'ABSPATH' ) || die();

/**
 * Create new custom post type
 *
 * @package Kotisivu\BlockTheme
 */
abstract class PostType {
	/**
	 * Post type slug or name.
	 *
	 * @var string
	 */
	public $slug;

	public $supports;

	/**
	 * Constructor
	 *
	 * @return void
	 */
	public function __construct( string $slug ) {
		$this->slug = $slug;

		/**
		 * Load class files
		 */
		require_once __DIR__ . '/metabox/interface-metabox-field.php';
		require_once __DIR__ . '/class-metabox.php';
		require_once __DIR__ . '/metabox/class-metabox-field.php';
		require_once __DIR__ . '/metabox/class-metabox-field-checkbox-group.php';
		require_once __DIR__ . '/metabox/class-metabox-field-checkbox.php';
		require_once __DIR__ . '/metabox/class-metabox-field-date.php';
		require_once __DIR__ . '/metabox/class-metabox-field-image.php';
		require_once __DIR__ . '/metabox/class-metabox-field-number.php';
		require_once __DIR__ . '/metabox/class-metabox-field-radio-group.php';
		require_once __DIR__ . '/metabox/class-metabox-field-rich-text.php';
		require_once __DIR__ . '/metabox/class-metabox-field-select.php';
		require_once __DIR__ . '/metabox/class-metabox-field-text.php';
		require_once __DIR__ . '/metabox/class-metabox-field-textarea.php';
		require_once __DIR__ . '/metabox/class-metabox-field-url.php';
	}

	/**
	 * Register post type
	 *
	 * @return void
	 */
	abstract protected function register();

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
				'labels'      => $this->labels(),
				'public'      => true,
				'has_archive' => true,
				'rewrite'     => array(
					'slug' => ( ! empty( get_option( 'kotisivu_block_theme_' . $this->slug ) ) ) ? get_option( 'kotisivu_block_theme_' . $this->slug ) : $this->slug,
				),
				'supports'    => $this->supports,
			)
		);

		/**
		 * Add permalink settings
		 */
		$this->add_permalink_setting( $this->slug );
	}

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

	public function supports() {
		return array(
			'title',
			'editor',
			'thumbnail',
		);
	}

	/**
	 * Add permalink setting
	 *
	 * @param string $name Name of the post type
	 * @return void
	 */
	public function add_permalink_setting( $name ) {
	}

	/**
	 * Generate setting output for permalink settings
	 *
	 * @return void
	 */
	public function generate_setting_output() {
	}
}
