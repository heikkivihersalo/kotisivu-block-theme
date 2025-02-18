<?php
/**
 * Class for handling customizations for file uploads
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Uploads
 */

namespace Kotisivu\BlockTheme\Theme;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\Common\Loader;
use Kotisivu\BlockTheme\Theme\Common\Traits\ThemeDefaults;
use Kotisivu\BlockTheme\Theme\Common\Utils\Media as MediaUtils;
use Kotisivu\BlockTheme\Theme\Common\Interfaces\RegisterHooksInterface;

/**
 * Class for handling customizations for file uploads
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Uploads
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Uploads implements RegisterHooksInterface {
	use ThemeDefaults;

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
	 * Set file uploads
	 *
	 * @since    2.0.0
	 * @access   public
	 * @return   void
	 */
	private function set_file_uploads() {
		$this->loader->add_filter( 'upload_mimes', MediaUtils::class, 'allow_svg_uploads' );
	}

	/**
	 * @inheritDoc
	 */
	public function register_hooks() {
		$this->set_file_uploads();
	}
}
