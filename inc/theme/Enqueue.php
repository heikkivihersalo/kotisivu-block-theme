<?php
/**
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme
 */

namespace Kotisivu\BlockTheme\Theme;

use Kotisivu\BlockTheme\Theme\Common\Loader;
use Kotisivu\BlockTheme\Theme\Common\Enqueue as CommonEnqueue;
use Kotisivu\BlockTheme\Theme\Common\Interfaces\EnqueueInterface;

/**
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Enqueue extends CommonEnqueue implements EnqueueInterface {
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
	 * Define the core functionality of the theme.
	 *
	 * Set the theme name and the theme version that can be used throughout the theme.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    2.0.0
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

		$this->enqueue_style( $asset_path, $style_url );
		$this->enqueue_script( $asset_path, $script_url );
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
	 * Inline sanitize CSS styles
	 *
	 * @since 2.0.0
	 * @access public
	 * @return void
	 */
	public function inline_sanitize_css(): void {
		$filesystem = new \WP_Filesystem_Direct( true );
		?>
		<style id="ksd-sanitize-inline-css">
			<?php echo $filesystem->get_contents( SITE_PATH . '/build/assets/sanitize.css' ); ?>
		</style>
		<?php
	}

	/**
	 * Inline CSS styles
	 *
	 * @since 2.0.0
	 * @access public
	 * @return void
	 */
	public function inline_custom_css(): void {
		$filesystem = new \WP_Filesystem_Direct( true );
		?>
		<style id="ksd-custom-inline-css">
			<?php echo $filesystem->get_contents( SITE_PATH . '/build/assets/inline.css' ); ?>
		</style>
		<?php
	}

	/**
	 * Registers hooks for the loader
	 *
	 * @since 2.0.0
	 * @access public
	 * @return void
	 */
	public function register_hooks() {
		$this->loader->add_action( 'wp_head', $this, 'inline_sanitize_css', 0 );
		$this->loader->add_action( 'wp_head', $this, 'inline_custom_css', 11 );
		$this->loader->add_action( 'wp_enqueue_scripts', $this, 'enqueue_scripts_and_styles' );
		$this->loader->add_filter( 'print_styles_array', $this, 'move_global_styles_to_top', 10, 1 );
	}
}
