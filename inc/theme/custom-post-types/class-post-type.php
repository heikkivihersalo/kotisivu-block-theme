<?php
/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme;

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
	 *
	 * @param array  $names   Array of names for post type
	 * @param array  $options Array of options for post type
	 * @param array  $labels Array of labels for post type
	 * @param string $icon   Icon for post type
	 * @param array  $metaboxes Array of metaboxes for post type
	 * @param array  $additional Array of additional settings for post type
	 * @return void
	 */
	public function register_post_type( array $names, array $options, array $labels, string $icon = '', array $metaboxes = array(), array $additional = array() ): void {
		if ( ! class_exists( '\PostTypes\PostType' ) ) {
			add_action(
				'admin_notices',
				function () {
					?>
				<div class="notice notice-error">
					<p><?php esc_html_e( 'PostTypes dependencies are missing. Run `composer install` to generate them.', 'kotisivu-block-theme' ); ?></p>
				</div>
					<?php
				}
			);

			return;
		}

		$post_type = new \PostTypes\PostType( $names['slug'] );
		$post_type->options( $options );
		$post_type->labels( $labels );

		$post_type->icon( $icon );
		$post_type->register();

		/* Add Metaboxes */
		if ( $metaboxes['active'] ) :
			new Metabox(
				$metaboxes['markup'],
				$metaboxes['options']['title'],
				$metaboxes['options']['screen'],
			);
		endif;

		// TODO: Add support for slug translations
		// if (isset($additional['slug_translations'])) :
		// $this->translate_slugs($names['slug'], $additional['slug_translations']);
		// endif;

		if ( isset( $additional['taxonomies'] ) ) :
			foreach ( $additional['taxonomies'] as $tax ) :
				$taxonomy = new \PostTypes\Taxonomy( $tax['names']['slug'], $tax['options'], $tax['labels'] );
				$taxonomy->register();
			endforeach;
		endif;

		/**
		 * Add permalink settings
		 */
		$this->add_permalink_setting( $names['plural'] );
	}

	/**
	 * Translate slugs
	 *
	 * @param string $slug Slug
	 * @param array  $translations Array of translations
	 * @return void
	 */
	public function translate_slugs( string $slug, array $translations ): void {
		if ( ! function_exists( 'pll_get_post_language' ) ) {
			return;
		}

		add_filter(
			'post_type_link',
			function ( $post_link, $post ) use ( $slug, $translations ) {
				if ( get_post_type( $post ) === $slug && isset( $translations[ pll_get_post_language( $post->ID ) ] ) ) {
					$post_link = str_replace( $slug, urlencode( $translations[ pll_get_post_language( $post->ID ) ] ), $post_link );
				}

				return $post_link;
			},
			10,
			2
		);

		/**
		 * Add rewrite rules for slug translations
		 * If any problems occur, flush rewrite rules from settings
		 */
		foreach ( $translations as $lang => $slug ) :
			$regex = '^' . $slug . '/([^/]*)/?';
			$url   = 'index.php?post_type=' . $slug . '&name=$matches[1]';
			add_rewrite_rule( $regex, $url, 'top' );
		endforeach;
	}

	/**
	 * Add permalink setting
	 *
	 * @param string $name Name of the post type
	 * @return void
	 */
	public function add_permalink_setting( $name ) {
		add_action(
			'admin_init',
			function () use ( $name ) {
				add_settings_field(
					'kotisivu_block_theme_' . $this->slug,
					sprintf(
						__( '%s Base', 'kotisivu-block-theme' ),
						$name
					),
					array( $this, 'generate_setting_output' ),
					'permalink',
					'optional'
				);
			}
		);

		add_action(
			'admin_init',
			function () {
				if ( isset( $_POST['permalink_structure'] ) ) {
					update_option( 'kotisivu_block_theme_' . $this->slug, trim( $_POST[ 'kotisivu_block_theme_' . $this->slug ] ) );
				}
			}
		);
	}

	/**
	 * Generate setting output for permalink settings
	 *
	 * @return void
	 */
	public function generate_setting_output() {
		printf(
			'<input name="%s" type="text" class="regular-text code" value="%s" placeholder="%s" />',
			'kotisivu_block_theme_' . $this->slug,
			esc_attr( get_option( 'kotisivu_block_theme_' . $this->slug ) ),
			$this->slug
		);
	}
}
