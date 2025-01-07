<?php
/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme;

use Kotisivu\BlockTheme\Theme\Common\Activator;
use Kotisivu\BlockTheme\Theme\Common\Deactivator;

/**
 * If this file is called directly, abort.
 */
defined( 'ABSPATH' ) || die();

/**
 * Load bootstrap file
 */
require_once __DIR__ . '/bootstrap.php';

/**
 * Get required WordPress dependencies
 */
require_once ABSPATH . 'wp-admin/includes/class-wp-filesystem-base.php';
require_once ABSPATH . 'wp-admin/includes/class-wp-filesystem-direct.php';

/**
 * Set theme name, textdomain, version, path and uri
 */
define( 'SITE_NAME', 'kotisivu-block-theme' );
define( 'SITE_TEXTDOMAIN', 'kotisivu-block-theme' );
define( 'SITE_VERSION', '2.0.0' );
define( 'SITE_COLOR', 'hsl(0, 0%, 20%)' );
define( 'SITE_PATH', get_template_directory() );
define( 'SITE_URI', get_template_directory_uri() );

require SITE_PATH . '/inc/Theme.php';

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-gutenberg-native-ai-activator.php
 */
function activate_gutenberg_native_ai() {
	Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-gutenberg-native-ai-deactivator.php
 */
function deactivate_gutenberg_native_ai() {
	Deactivator::deactivate();
}

register_activation_hook( __FILE__, __NAMESPACE__ . '\activate_gutenberg_native_ai' );
register_deactivation_hook( __FILE__, __NAMESPACE__ . '\deactivate_gutenberg_native_ai' );

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    2.0.0
 */
function run_theme() {
	$theme = new Theme();
	$theme->run();
}

run_theme();

function run_gutenberg() {
	$gutenberg = new Gutenberg();
	$gutenberg->run();
}

run_gutenberg();
