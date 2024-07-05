<?php
/**
 * Load theme feature related files from `inc/theme` -folder
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme;

defined( 'ABSPATH' ) || die();

/**
 * Menu Walker
 */
require_once SITE_PATH . '/inc/theme/class-menu-walker.php';

/**
 * Options
 */
if ( is_user_logged_in() && is_admin() ) {
	require_once SITE_PATH . '/inc/theme/options.php';

	/**
	 * Create primary option page
	 */
	add_action( 'admin_menu', __NAMESPACE__ . '\setup_theme_options' );
	add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\enqueue_theme_options' );
}

/**
 * Custom Post Types
 */
require_once SITE_PATH . '/inc/theme/custom-post-types/class-post-type.php';

add_action(
	'after_setup_theme',
	function () {
		Utils::build_post_types( SITE_SETTINGS['post_types'], SITE_PATH );
	}
);

/**
 * Custom Database Tables
 *
 * !WARNING EXPERIMENTAL FEATURE!
 */
if ( SITE_SETTINGS['database_tables']['enabled'] ) {
	require_once SITE_PATH . '/inc/theme/databases/class-database.php';
	$tables = new Database(
		SITE_SETTINGS['database_tables']['tables']
	);
	$tables->init();
}

/**
 * Custom API
 */
if ( SITE_SETTINGS['api'] ) {
	require_once SITE_PATH . '/inc/theme/api/class-api.php';
	$api = new \Kotisivu\BlockTheme\Api\Api();
	$api->init();
}
