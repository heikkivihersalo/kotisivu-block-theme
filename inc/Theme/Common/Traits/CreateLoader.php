<?php
/**
 * Loader trait.
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Common\Traits
 */

namespace Kotisivu\BlockTheme\Theme\Common\Traits;

use Kotisivu\BlockTheme\Theme\Common\Loader;

/**
 * Loader trait.
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Common\Traits
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
trait CreateLoader {
	/**
	 * Initialize the loader to execute all hooks with WordPress.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	public function create_loader() {
		$this->loader = new Loader();
	}

	/**
	 * Run the loader to execute all of the custom hooks related to the theme.
	 *
	 * @since    2.0.0
	 * @access   public
	 * @return   void
	 */
	public function run(): void {
		$this->loader->run();
	}
}
