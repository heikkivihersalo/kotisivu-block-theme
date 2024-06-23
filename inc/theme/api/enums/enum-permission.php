<?php

namespace Kotisivu\BlockTheme\Api;

defined( 'ABSPATH' ) or die();

/**
 * Enum Permission
 *
 * @package Kotisivu\BlockTheme\Api
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
				$user = wp_get_current_user();

				if ( in_array( 'administrator', (array) $user->roles ) ) {
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
