<?php
/**
 * Translations
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Translations
 */

namespace Kotisivu\BlockTheme\Theme;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\Common\Loader;

/**
 * Class for handling translations
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Translations
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
