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
 * Menu Walker
 */
require_once SITE_PATH . '/inc/theme/class-menu-walker.php';

/**
 * Options
 */
if ( is_user_logged_in() && is_admin() ) {
	require_once SITE_PATH . '/inc/theme/options/options.php';

	/**
	 * Create primary option page
	 */
	add_action( 'admin_menu', __NAMESPACE__ . '\setup_theme_options' );

	/**
	 * Create option pages
	 */
	new \RationalOptionPages( include __DIR__ . '/theme/options/pages/analytics.php' );
	new \RationalOptionPages( include __DIR__ . '/theme/options/pages/contact.php' );
	new \RationalOptionPages( include __DIR__ . '/theme/options/pages/social-media.php' );
}

/**
 * Custom Post Types
 */
require_once SITE_PATH . '/inc/theme/custom-post-types/class-post-type.php';

/**
 * First: we register the taxonomies and post types after setup theme
 * If air-helper loads (for translations), we unregister the original taxonomies and post types
 * and reregister them with the translated ones.
 *
 * This allows the slugs translations to work before the translations are available,
 * and for the label translations to work if they are available.
 */
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
	$api = new Api();
	$api->init();
}
