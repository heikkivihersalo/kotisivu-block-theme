<?php
/**
 * PHPUnit bootstrap file.
 */
define('TEST_DIRECTORY', getenv( 'WP_TESTS_DIR' ));
define('POLYFILL_DIRECTORY', getenv( 'WP_TESTS_PHPUNIT_POLYFILLS_PATH' ));

if ( !defined( 'WP_DEFAULT_THEME' ) ) {
	define( 'WP_DEFAULT_THEME', 'kotisivu-block-theme' );
}

/**
 * Get polyfills from the WP PHPUnit Polyfills repository.
 */
if ( false !== POLYFILL_DIRECTORY ) {
	define( 'WP_TESTS_PHPUNIT_POLYFILLS_PATH', POLYFILL_DIRECTORY );
}

require 'vendor/yoast/phpunit-polyfills/phpunitpolyfills-autoload.php';

/**
 * Load the WordPress tests library.
 */
require_once TEST_DIRECTORY . "/includes/functions.php";

/**
 * Start up the WP testing environment.
 */
require TEST_DIRECTORY . "/includes/bootstrap.php";

/**
 * Create application password for API testing.
 */
\WP_Application_Passwords::delete_all_application_passwords( 1 );

$app_pass = \WP_Application_Passwords::create_new_application_password( 
	1, array( 'name' => 'Test Application Password' ) 
);

/**
 * Set application password and user for API testing.
 */
define( 'APP_USER', 'admin' );
define( 'APP_PASS', $app_pass[0] );
define( 'ADMIN_USER', 'admin' );
define( 'ADMIN_PASS', 'password' );

if (!defined('SITE_PATH')) {
	define('SITE_PATH', dirname(__DIR__, 2));
}