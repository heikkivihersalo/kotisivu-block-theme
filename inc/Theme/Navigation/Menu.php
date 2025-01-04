<?php
/**
 * Navigation functionality of the theme.
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Navigation\Menu
 */

namespace Kotisivu\BlockTheme\Theme\Navigation;

defined( 'ABSPATH' ) || die();

/**
 * Navigation functionality of the theme.
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Navigation\Menu
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Menu {
	/**
	 * Register navigation menus to theme
	 *
	 * @since 2.0.0
	 * @access public
	 * @return void
	 */
	public function register_navigation_menus(): void {
		foreach ( SITE_SETTINGS['menu_locations'] as $menu ) :
			register_nav_menus(
				array(
					$menu['slug'] => $menu['name'],
				)
			);
		endforeach;
	}
}
