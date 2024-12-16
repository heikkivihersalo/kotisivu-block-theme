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
use Kotisivu\BlockTheme\Theme\Common\Traits\Options;

/**
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Meta {
	use Options;

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
	 * Inline theme color
	 *
	 * @since 2.0.0
	 * @access public
	 * @return void
	 */
	public function inline_theme_color(): void {
		?>
		<meta name="theme-color" content="<?php echo SITE_COLOR; ?>">
		<meta name="msapplication-navbutton-color" content="<?php echo SITE_COLOR; ?>">
		<meta name="apple-mobile-web-app-status-bar-style" content="<?php echo SITE_COLOR; ?>">
		<?php
	}

	/**
	 * Inline Google Tag Manager
	 *
	 * @since 2.0.0
	 * @access public
	 * @return void
	 */
	public function inline_tag_manager(): void {
		$config = $this->get_options_file( 'site-analytics' );

		if ( ! $config || ! $config['tagmanager-active'] ) {
			return;
		}
		?>
		<script>
			var initGTMOnEvent = function(t) {
					initGTM(), t.currentTarget.removeEventListener(t.type, initGTMOnEvent)
				},
				initGTM = function() {
					if (window.gtmDidInit) return !1;
					window.gtmDidInit = !0;
					var t = document.createElement("script");
					t.type = "text/javascript", t.async = !0, t.onload = function() {
						dataLayer.push({
							event: "gtm.js",
							"gtm.start": (new Date).getTime(),
							"gtm.uniqueEventId": 0
						})
					}, t.src = "<?php echo $config['tagmanager-url']; ?>/gtm.js?id=<?php echo $config['tagmanager-id']; ?>", document.head.appendChild(t)
				};
			document.addEventListener("DOMContentLoaded", function() {
				setTimeout(initGTM, <?php echo $config['tagmanager-timeout']; ?>)
			}), document.addEventListener("scroll", initGTMOnEvent), document.addEventListener("mousemove", initGTMOnEvent), document.addEventListener("touchstart", initGTMOnEvent)
		</script>
		<?php
	}

	/**
	 * Inline dark mode
	 *
	 * @since 2.0.0
	 * @access public
	 * @return void
	 */
	public function inline_dark_mode() {
		$filesystem = new \WP_Filesystem_Direct( true );
		?>
		<meta name="color-scheme" content="dark light">
		<script data-no-optimize="1">
			<?php echo $filesystem->get_contents( SITE_PATH . '/build/assets/dark-mode.js' ); ?>
		</script>
		<style id="ksd-dark-mode-inline-css">
			<?php echo $filesystem->get_contents( SITE_PATH . '/build/assets/dark-mode.css' ); ?>
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
		$this->loader->add_action( 'wp_head', $this, 'inline_theme_color', 0 );
		$this->loader->add_action( 'wp_head', $this, 'inline_dark_mode', 0 );
		$this->loader->add_action( 'wp_head', $this, 'inline_tag_manager', 0 );
		$this->loader->add_action( 'wp_head', $this, 'inline_custom_css', 11 );
	}
}
