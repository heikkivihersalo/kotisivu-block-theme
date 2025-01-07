<?php
/**
 * Navigation functionality of the theme.
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Navigation
 */

namespace Kotisivu\BlockTheme\Theme;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\Common\Loader;
use Kotisivu\BlockTheme\Theme\Common\Traits\ThemeDefaults;
use Kotisivu\BlockTheme\Theme\Common\Interfaces\RegisterHooksInterface;

/**
 * Navigation functionality of the theme.
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Navigation
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Navigation implements RegisterHooksInterface {
	use ThemeDefaults;

	/**
	 * Default image sizes
	 *
	 * @since 2.0.0
	 * @access private
	 * @var array $custom_image_sizes Array of custom image sizes
	 */
	private array $menu_locations;

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

		$this->menu_locations = array(
			array(
				'slug' => 'header-nav',
				'name' => __( 'Header Navigation', 'kotisivu-block-theme' ),
			),
			array(
				'slug' => 'legal-nav',
				'name' => __( 'Legal Navigation', 'kotisivu-block-theme' ),
			),
			array(
				'slug' => 'footer-nav',
				'name' => __( 'Footer Navigation', 'kotisivu-block-theme' ),
			),
		);
	}

	/**
	 * Register navigation menus to theme
	 *
	 * @return void
	 */
	public function register_navigation_menus(): void {
		foreach ( $this->menu_locations as $menu ) :
			register_nav_menus(
				array(
					$menu['slug'] => $menu['name'],
				)
			);
		endforeach;
	}

	/**
	 * @inheritDoc
	 */
	public function register_hooks() {
		$this->loader->add_action( 'init', $this, 'register_navigation_menus' );
	}
}
