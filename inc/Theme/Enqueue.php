<?php
/**
 * Functions for enqueuing scripts and styles
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme
 */

namespace Kotisivu\BlockTheme\Theme;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\Common\Loader;
use Kotisivu\BlockTheme\Theme\Common\Enqueue as CommonEnqueue;
use Kotisivu\BlockTheme\Theme\Common\Interfaces\EnqueueInterface;
use Kotisivu\BlockTheme\Theme\Common\Interfaces\RegisterHooksInterface;
use Kotisivu\BlockTheme\Theme\Common\Traits\ThemeDefaults;

/**
 * Functions for enqueuing scripts and styles
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Enqueue
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Enqueue extends CommonEnqueue implements EnqueueInterface, RegisterHooksInterface {
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
	 * Run the editor scripts and styles
	 *
	 * @since    2.0.0
	 * @access public
	 * @param string $hook The current admin page
	 * @return void
	 */
	public function enqueue_scripts_and_styles( string $hook = '' ): void {
		$asset_path = SITE_PATH . '/build/assets/theme.asset.php';
		$script_url = SITE_URI . '/build/assets/theme.js';
		$style_url  = SITE_URI . '/build/assets/theme.css';

		$this->enqueue_style( $asset_path, $style_url, 'ksd-theme' );
		$this->enqueue_script( $asset_path, $script_url, 'ksd-theme' );
	}

	/**
	 * Move global styles to top of print styles
	 * - This is to ensure that global styles are loaded first
	 * - This is important so we can override the global styles with local styles if needed
	 * @since 2.0.0
	 * @access public
	 * @param array $styles Print styles array
	 * @return array Modified print styles array
	 */
	public function move_global_styles_to_top( $styles ): array {
		if ( ! is_array( $styles ) ) {
			return $styles;
		}

		$total = count( $styles );

		for ( $i = 0; $i < $total; $i++ ) {
			if ( isset( $styles[ $i ] ) && 'global-styles' === $styles[ $i ] ) {
				unset( $styles[ $i ] );
				array_unshift( $styles, 'global-styles' );
				break;
			}
		}

		return $styles;
	}

	/**
	 * @inheritDoc
	 */
	public function register_hooks() {
		$this->loader->add_action( 'wp_enqueue_scripts', $this, 'enqueue_scripts_and_styles' );
		$this->loader->add_filter( 'print_styles_array', $this, 'move_global_styles_to_top', 10, 1 );
	}
}
