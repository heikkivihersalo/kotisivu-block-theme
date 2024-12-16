<?php
/**
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\i18n
 */

namespace Kotisivu\BlockTheme\Theme;

use Kotisivu\BlockTheme\Theme\Common\Loader;

/**
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\i18n
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Translations {
	/**
	 * Constructor
	 *
	 * @since    2.0.0
	 * @access   public
	 */
	public function load_textdomain() {
		load_theme_textdomain( 'kotisivu-block-theme', SITE_PATH . '/languages' );
	}
}
