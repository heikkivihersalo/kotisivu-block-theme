<?php
/**
 * Image class for handling image customizations
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Image
 */

namespace Kotisivu\BlockTheme\Theme;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\Common\Loader;

/**
 * Class for handling image customizations
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Image
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Image {
	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the theme.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      Loader    $loader    Maintains and registers all hooks for the theme.
	 */
	protected $loader;

	/**
	 * The unique identifier of this theme.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      string    $theme_name    The string used to uniquely identify this theme.
	 */
	protected $theme_name;

	/**
	 * The current version of the theme.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the theme.
	 */
	protected $version;

	/**
	 * Default image sizes
	 *
	 * @since 2.0.0
	 * @access private
	 * @var array $custom_image_sizes Array of custom image sizes
	 */
	private array $default_image_sizes = array(
		array(
			'slug'   => 'large',
			'width'  => 1600,
			'height' => 1200,
		),
		array(
			'slug'   => 'medium_large',
			'name'   => 'Medium Large',
			'width'  => 1366,
			'height' => 1025,
		),
		array(
			'slug'   => 'medium',
			'width'  => 1024,
			'height' => 768,
		),
		array(
			'slug'   => 'thumbnail',
			'width'  => 300,
			'height' => 300,
		),
	);

	/**
	 * Custom image sizes
	 *
	 * @since 2.0.0
	 * @access private
	 * @var array $custom_image_sizes Array of custom image sizes
	 */
	private array $custom_image_sizes = array(
		array(
			'slug'   => 'retina',
			'name'   => 'Retina',
			'width'  => 2880,
			'height' => 1800,
		),
		array(
			'slug'   => 'huge',
			'name'   => 'Huge',
			'width'  => 1920,
			'height' => 1440,
		),
		array(
			'slug'   => 'small',
			'name'   => 'Small',
			'width'  => 768,
			'height' => 576,
		),
		array(
			'slug'   => 'extra_small',
			'name'   => 'Extra Small',
			'width'  => 640,
			'height' => 480,
		),
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
	 * Add custom image options for WordPress
	 *
	 * @param mixed $sizes Image sizes
	 * @return void
	 */
	public function register_image_sizes(): void {
		/* Update default core image sizes */
		foreach ( $this->default_image_sizes as $size ) :
			update_option( $size['slug'] . '_size_w', $size['width'] );
			update_option( $size['slug'] . '_size_h', $size['height'] );
		endforeach;

		/* Add new image sizes to core */
		foreach ( $this->custom_image_sizes as $size ) :
			add_image_size( $size['slug'], $size['width'], $size['height'], false );
		endforeach;
	}

	/**
	 * Remove default image sizes from WordPress
	 *
	 * @param mixed $sizes Image sizes
	 * @return mixed
	 */
	public function remove_default_image_sizes( mixed $sizes ): mixed {
		unset( $sizes['1536x1536'] ); // remove 1536x1536 image size
		unset( $sizes['2048x2048'] ); // remove 2048x2048 image size

		return $sizes;
	}

	/**
	 * Add custom image options to admin interface
	 *
	 * @param mixed $sizes Image sizes
	 * @return array
	 */
	public function add_custom_image_sizes_to_admin( mixed $sizes ): array {
		$custom_images = array();

		foreach ( $this->custom_image_sizes as $image ) :
			$custom_images[ $image['slug'] ] = $image['name'];
		endforeach;

		return array_merge( $sizes, $custom_images );
	}

	/**
	 * Registers hooks for the loader
	 *
	 * @since 2.0.0
	 * @access public
	 * @return void
	 */
	public function register_hooks() {
		$this->loader->add_action( 'after_setup_theme', $this, 'register_image_sizes' );
		$this->loader->add_filter( 'intermediate_image_sizes', $this, 'remove_default_image_sizes' );
		$this->loader->add_filter( 'image_size_names_choose', $this, 'add_custom_image_sizes_to_admin' );
	}
}
