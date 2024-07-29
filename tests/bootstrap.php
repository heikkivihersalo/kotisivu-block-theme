<?php
/**
 * PHPUnit bootstrap file.
 */

namespace Kotisivu\BlockTheme;

if ( ! file_exists( '../../../wp-content' ) ) {
	trigger_error( 'Unable to run the integration tests, as the wp-content folder does not exist.', E_USER_ERROR ); // phpcs:ignore
}

define( 'THEME_TESTS_DIR', __DIR__ );
define( 'THEME_DIR', dirname( __DIR__ ) . DIRECTORY_SEPARATOR );
define( 'WP_CONTENT_DIR', dirname( dirname( dirname( getcwd() ) ) ) . '/wp-content/' );

/**
 * Load the Composer autoloader.
 */
require_once WP_CONTENT_DIR . 'themes/kotisivu-block-theme/vendor/autoload.php';

/**
 * Load the WordPress tests library.
 */
require_once getenv( 'WP_TESTS_DIR' ) . '/includes/functions.php';

tests_add_filter(
	'setup_theme',
	function () {
		register_theme_directory( WP_CONTENT_DIR . 'themes' );
		switch_theme( basename( THEME_DIR ) );
	}
);

/**
 * Start up the WP testing environment.
 */
require getenv( 'WP_TESTS_DIR' ) . '/includes/bootstrap.php';

/**
 * Create application password for API testing.
 */
\WP_Application_Passwords::delete_all_application_passwords( 1 );

$app_pass = \WP_Application_Passwords::create_new_application_password(
	1,
	array( 'name' => 'Test Application Password' )
);

/**
 * Set theme constants
 */
define( 'ADMIN_USER', 'admin' );
define( 'ADMIN_PASS', 'password' );

define( 'TESTS_APP_USER', 'admin' );
define( 'TESTS_APP_PASS', $app_pass[0] );

define( 'TESTS_API_BASE', 'host.docker.internal:8889' );
define( 'TESTS_SITE_PATH', dirname( __DIR__ ) );

if ( ! defined( 'SITE_PATH' ) ) {
	define( 'SITE_PATH', get_template_directory() );
}

if ( ! defined( 'SITE_URI' ) ) {
	define( 'SITE_URI', get_template_directory_uri() );
}
