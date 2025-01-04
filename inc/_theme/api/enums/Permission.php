<?php
/**
 * Permission
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Api\Enums\Permission
 */

namespace Kotisivu\BlockTheme\Theme\Api\Enums;

defined( 'ABSPATH' ) || die();

/**
 * Permission
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Api\Enums\Permission
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
enum Permission {
	/**
	 * Admin permission
	 */
	case ADMIN;
	/**
	 * Uncomment this to add new permission
	 */
	// case EXAMPLE_ROLE;

	/**
	 * Public permission for everyone
	 */
	case PUBLIC;

	public function get_callback(): \Closure|bool {
		return match ( $this ) {
			self::ADMIN => function () {
				/**
				 * If user is logged in and has admin role, return true
				 */
				$user = wp_get_current_user();

				if ( 0 === $user->ID ) {
					$php_auth_user = isset( $_SERVER['PHP_AUTH_USER'] ) ? sanitize_text_field( wp_unslash( $_SERVER['PHP_AUTH_USER'] ) ) : '';
					$php_auth_pw   = isset( $_SERVER['PHP_AUTH_PW'] ) ? sanitize_text_field( wp_unslash( $_SERVER['PHP_AUTH_PW'] ) ) : '';
					$user          = wp_authenticate_application_password(
						get_user_by( 'login', $php_auth_user ),
						$php_auth_user,
						$php_auth_pw
					);

					if ( is_wp_error( $user ) ) {
						return false;
					}
				}

				if ( in_array( 'administrator', (array) $user->roles, true ) ) {
					return true;
				}
			},
			/**
			 * Uncomment this to add new permission
			 * Remember to update the values to match your needs
			 */
			// self::EXAMPLE_ROLE => function () {
			// $user = wp_get_current_user();

			// if (in_array('example', (array) $user->roles)) {
			// return true;
			// }
			// },
			self::PUBLIC => function () {
				return true;
			},
		};
	}
}
