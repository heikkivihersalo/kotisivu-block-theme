<?php
/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme;

defined( 'ABSPATH' ) || die();

/**
 * Enqueue Splide slider to theme
 *
 * @return void
 */
function enqueue_splide() {
	wp_register_script( 'ksd-splide', SITE_URI . '/public/lib/splide/splide.min.js', '', filemtime( SITE_PATH . '/public/lib/splide/splide.min.js' ), true );
	wp_register_style( 'ksd-splide', SITE_URI . '/public/lib/splide/splide-core.min.css', '', filemtime( SITE_PATH . '/public/lib/splide/splide-core.min.css' ), 'all' );
	wp_enqueue_style( 'ksd-splide' );
	wp_enqueue_script( 'ksd-splide' );
}

/**
 * Enqueue theme styles and scripts
 *
 * @return void
 */
function enqueue_theme() {
	wp_register_script( 'ksd-theme', SITE_URI . '/build/assets/theme.js', '', filemtime( SITE_PATH . '/build/assets/theme.js' ), true );
	wp_register_style( 'ksd-theme', SITE_URI . '/build/assets/theme.css', '', filemtime( SITE_PATH . '/build/assets/theme.css' ), 'all' );
	wp_enqueue_script( 'ksd-theme' );
	wp_enqueue_style( 'ksd-theme' );
}

/**
 * Enqueue dark mode styles and scripts
 *
 * @return void
 */
function enqueue_dark_mode() {
	wp_register_script( 'ksd-dark-mode', SITE_URI . '/build/assets/dark-mode.js', '', filemtime( SITE_PATH . '/build/assets/dark-mode.js' ), true );
	wp_register_style( 'ksd-dark-mode', SITE_URI . '/build/assets/dark-mode.css', '', filemtime( SITE_PATH . '/build/assets/dark-mode.css' ), 'all' );
	wp_enqueue_script( 'ksd-dark-mode' );
	wp_enqueue_style( 'ksd-dark-mode' );
}

/**
 * Enqueue inline styles and scripts
 *
 * @return void
 */
function enqueue_redux_store() {
	wp_register_script( 'ksd-redux-store', SITE_URI . '/build/assets/store.js', '', filemtime( SITE_PATH . '/build/assets/store.js' ), true );
	wp_enqueue_script( 'ksd-redux-store' );
}

/**
 * Enqueue custom post type styles and scripts
 *
 * @return void
 */
function admin_enqueue_custom_post_type() {
	wp_register_script( 'ksd-cpt', SITE_URI . '/build/assets/cpt.js', '', filemtime( SITE_PATH . '/build/assets/cpt.js' ), true );
	wp_enqueue_script( 'ksd-cpt' );
}

/**
 * Enqueue admin styles and scripts
 *
 * @return void
 */
function admin_enqueue_admin() {
	wp_register_script( 'ksd-admin', SITE_URI . '/build/assets/admin.js', '', filemtime( SITE_PATH . '/build/assets/admin.js' ), true );
	wp_register_style( 'ksd-admin', SITE_URI . '/build/assets/admin.css', '', filemtime( SITE_PATH . '/build/assets/admin.css' ), 'all' );
	wp_enqueue_script( 'ksd-admin' );
	wp_enqueue_style( 'ksd-admin' );
}

/**
 * Enqueue AI styles and scripts
 *
 * @return void
 */
function admin_enqueue_ai() {
	wp_register_script( 'ksd-editor-ai', SITE_URI . '/build/assets/ai.js', '', filemtime( SITE_PATH . '/build/assets/ai.js' ), true );
	wp_register_style( 'ksd-editor-ai', SITE_URI . '/build/assets/ai.css', '', filemtime( SITE_PATH . '/build/assets/ai.css' ), 'all' );
	wp_enqueue_script( 'ksd-editor-ai' );
	wp_enqueue_style( 'ksd-editor-ai' );
}

/**
 * Enqueue inline styles and scripts
 *
 * @return void
 */
function admin_enqueue_fontawesome() {
	wp_register_style( 'ksd-fontawesome-brands', SITE_URI . '/public/icons/fontawesome/css/brands.min.css', '', filemtime( SITE_PATH . '/public/icons/fontawesome/css/brands.min.css' ), 'all' );
	wp_register_style( 'ksd-fontawesome-regular', SITE_URI . '/public/icons/fontawesome/css/regular.min.css', '', filemtime( SITE_PATH . '/public/icons/fontawesome/css/regular.min.css' ), 'all' );
	wp_register_style( 'ksd-fontawesome-solid', SITE_URI . '/public/icons/fontawesome/css/solid.min.css', '', filemtime( SITE_PATH . '/public/icons/fontawesome/css/solid.min.css' ), 'all' );
	wp_enqueue_style( 'ksd-fontawesome-brands' );
	wp_enqueue_style( 'ksd-fontawesome-regular' );
	wp_enqueue_style( 'ksd-fontawesome-solid' );
}

/**
 * Enqueue media support
 * @return void
 */
function add_wp_media_support(): void {
	wp_enqueue_media();
}

/**
 * Inline Font Awesome
 *
 * @return void
 */
function inline_fontawesome(): void {
	if ( null === SITE_SETTINGS['icons'] ) {
		return;
	}
	if ( SITE_SETTINGS['icons']['all'] || SITE_SETTINGS['icons']['brands'] || SITE_SETTINGS['icons']['solid'] || SITE_SETTINGS['icons']['regular'] ) {
		$folder = SITE_URI . '/public/icons/fontawesome/css/';

		foreach ( SITE_SETTINGS['icons'] as $slug => $is_enabled ) :
			if ( ! $is_enabled ) {
				continue;
			}

			$path = $folder . $slug . '.min.css';
			$rel  = 'stylesheet';
			?>
			<link rel="preload" href="<?php echo $path; ?>" as="style" onload='this.onload=null,this.rel="<?php echo $rel; ?>"'>
			<?php
		endforeach;
	}
}

/**
 * Inline theme color
 *
 * @return void
 */
function inline_theme_color(): void {
	?>
	<meta name="theme-color" content="<?php echo SITE_SETTINGS['theme_color']; ?>">
	<meta name="msapplication-navbutton-color" content="<?php echo SITE_SETTINGS['theme_color']; ?>">
	<meta name="apple-mobile-web-app-status-bar-style" content="<?php echo SITE_SETTINGS['theme_color']; ?>">
	<?php
}

/**
 * Inline sanitize CSS styles
 *
 * @return void
 */
function inline_sanitize_css(): void {
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
 * @return void
 */
function inline_custom_css(): void {
	$filesystem = new \WP_Filesystem_Direct( true );
	?>
	<style id="ksd-custom-inline-css">
		<?php echo $filesystem->get_contents( SITE_PATH . '/build/assets/inline.css' ); ?>
	</style>
	<?php
}

/**
 * Inline dark mode scripts
 *
 * @return void
 */
function inline_dark_mode(): void {
	if ( ! SITE_SETTINGS['dark_mode'] ) {
		return;
	}

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
 * Inline Google Tag Manager
 *
 * @return void
 */
function inline_tag_manager(): void {
	$config = Utils::get_options_file( 'site-analytics' );

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
 * Remove scripts and styles from theme
 *
 * @return void
 */
function remove_scripts_and_styles() {
	if ( SITE_SETTINGS['disabled_styles']['block-library'] ) {
		wp_dequeue_style( 'wp-block-library' );
		wp_dequeue_style( 'wp-block-library-theme' );
		wp_dequeue_style( 'wc-blocks-style' );
	}

	if ( SITE_SETTINGS['disabled_styles']['fluent-forms'] ) {
		if ( in_array( 'fluentform/fluentform.php', (array) get_option( 'active_plugins', array() ), true ) ) :
			wp_deregister_style( 'fluentform-public-default' );
			wp_dequeue_style( 'fluentform-public-default' );
			wp_deregister_style( 'fluent-form-styles' );
			wp_dequeue_style( 'fluent-form-styles' );
		endif;
	}

	if ( SITE_SETTINGS['disabled_styles']['global-styles'] ) {
		wp_dequeue_style( 'wp-global-styles' );
	}
}

/**
 * Move global styles to top of print styles
 * - This is to ensure that global styles are loaded first
 * - This is important so we can override the global styles with local styles if needed
 * @param array $styles Print styles array
 * @return array Modified print styles array
 */
function move_global_styles_to_top( $styles ): array {
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
