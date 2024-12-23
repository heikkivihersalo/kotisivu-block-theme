<?php
/**
 * Class for handling excerpt customizations
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Excerpt
 */

namespace Kotisivu\BlockTheme\Theme;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\Common\Loader;

/**
 * Class for handling excerpt customizations
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Excerpt
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Excerpt {
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
	 * Override default excerpt length
	 *
	 * @return int
	 */
	public function custom_excerpt_length(): int {
		return 20;
	}

	/**
	 * Override default excerpt more
	 *
	 * @return string
	 */
	public function custom_excerpt_more(): string {
		return '&hellip;';
	}

	/**
	 * Registers hooks for the loader
	 *
	 * @since 2.0.0
	 * @access public
	 * @return void
	 */
	public function register_hooks() {
		$this->loader->add_filter( 'excerpt_length', $this, 'custom_excerpt_length', 999 );
		$this->loader->add_filter( 'excerpt_more', $this, 'custom_excerpt_more' );
	}
}
