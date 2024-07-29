<?php
/**
 * PHPUnit bootstrap file.
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme;

/**
 * Check we are in the right directory
 */
if ( ! file_exists( '../../../wp-content' ) ) {
	trigger_error( 'Error: wp-content folder does not exist.', E_USER_ERROR ); // phpcs:ignore
}

/**
 * Set up the initial folder structure
 */
define( 'THEME_TESTS_DIR', __DIR__ );
define( 'THEME_DIR', dirname( __DIR__ ) . DIRECTORY_SEPARATOR );
define( 'WP_CONTENT_DIR', dirname( getcwd(), 3 ) . '/wp-content/' );

/**
 * Load the Composer autoloader.
 */
require_once WP_CONTENT_DIR . 'themes/kotisivu-block-theme/vendor/autoload.php';

/**
 * Load the WordPress tests library.
 * - This is needed to access the WP testing functions
 */
require_once getenv( 'WP_TESTS_DIR' ) . '/includes/functions.php';


/**
 * Set and start up the WP testing environment.
 */
tests_add_filter(
	'setup_theme',
	function () {
		register_theme_directory( WP_CONTENT_DIR . 'themes' );
		switch_theme( basename( THEME_DIR ) );
	}
);

require getenv( 'WP_TESTS_DIR' ) . '/includes/bootstrap.php';

/**
 * Load theme functions file
 * - This sets up the theme constants and loads all necessary files
 */
require_once WP_CONTENT_DIR . 'themes/kotisivu-block-theme/functions.php';

/**
 * Set application password and paths for API testing.
 * !NOTE - API testing currently only works in local environments
 * - Run `yarn wp-env:phpunit --group api-routes` to test API routes
 */
\WP_Application_Passwords::delete_all_application_passwords( 1 );

$app_pass = \WP_Application_Passwords::create_new_application_password(
	1,
	array( 'name' => 'Test Application Password' )
);

define( 'TESTS_APP_USER', 'admin' );
define( 'TESTS_APP_PASS', $app_pass[0] );
define( 'TESTS_API_BASE', 'host.docker.internal:8889' );
