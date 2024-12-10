<?php
/**
 * Set nav menus
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Common
 */

namespace Kotisivu\BlockTheme\Theme\Navigation;

/**
 * Set nav menus
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Common
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Menu {
	/**
	 * Register navigation menus to theme
	 *
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
