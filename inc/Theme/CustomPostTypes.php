<?php
/**
 * Custom Post Types
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\CustomPostTypes
 */

namespace Kotisivu\BlockTheme\Theme;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\Common\Loader;
use Kotisivu\BlockTheme\Theme\CustomPostTypes\Enqueue;
use Kotisivu\BlockTheme\Theme\Common\Traits\ThemeDefaults;
use Kotisivu\BlockTheme\Theme\Common\Interfaces\RegisterHooksInterface;

/**
 * Functionality for registering and handling custom post types for the theme.
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\CustomPostTypes
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class CustomPostTypes implements RegisterHooksInterface {
	use ThemeDefaults;

	/**
	 * Custom Post Types to register
	 *
	 * @since 2.0.0
	 * @access private
	 * @var array $post_types Array of custom post types
	 */
	private array $post_types = array(
		'Example',
	);

	/**
	 * Constructor
	 *
	 * @since    2.0.0
	 * @access   public
	 */
	public function __construct( Loader $loader, string $theme_name, string $version ) {
		$this->loader     = $loader;
		$this->theme_name = $theme_name;
		$this->version    = $version;
	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the theme.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_cpt_scripts_and_styles() {
		$cpt = new Enqueue( $this->theme_name, $this->version );
		$this->loader->add_action( 'admin_enqueue_scripts', $cpt, 'enqueue_scripts_and_styles' );
	}

	/**
	 * Build custom post types from array
	 *
	 * @since 2.0.0
	 * @access public
	 * @return void
	 * @throws \WP_Error If the custom post type class file does not exist.
	 */
	public function build_post_types(): void {
		foreach ( $this->post_types as $post_type ) {
			$slug = strtolower( $post_type );

			$classname = 'Kotisivu\BlockTheme\Theme\CustomPostTypes\PostTypes\\' . $post_type;
			$file_path = SITE_PATH . '/inc/Theme/CustomPostTypes/PostTypes/' . $post_type . '.php';

			if ( ! file_exists( $file_path ) ) {
				throw new \WP_Error( 'invalid-cpt', __( 'The custom post type class file does not exist.', 'kotisivu-block-theme' ), $classname );
			}

			// Get the class file, only try to require if not already imported
			if ( ! class_exists( $classname ) ) {
				require $file_path;
			}

			if ( ! class_exists( $classname ) ) {
				throw new \WP_Error( 'invalid-cpt', __( 'The custom post type you attempting to create does not have a class to instance. Possible problems: your configuration does not match the class file name; the class file name does not exist.', 'kotisivu-block-theme' ), $classname );
			}

			$post_type_class = new $classname( $slug, $post_type );
			$post_type_class->register();
		}
	}

	/**
	 * @inheritDoc
	 */
	public function register_hooks() {
		$this->loader->add_action( 'after_setup_theme', $this, 'build_post_types' );
		$this->set_cpt_scripts_and_styles();
	}
}
