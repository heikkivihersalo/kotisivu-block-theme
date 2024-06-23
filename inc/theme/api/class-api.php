<?php

namespace Kotisivu\BlockTheme\Api;

defined( 'ABSPATH' ) || die();

/**
 *
 *
 * @package Kotisivu\BlockTheme
 */
class Api {
	/**
	 * Constructor
	 *
	 * @return void
	 */
	public function __construct() {
		foreach ( glob( __DIR__ . '/enums/*.php' ) as $enum ) {
			require_once $enum;
		}

		foreach ( glob( __DIR__ . '/interfaces/*.php' ) as $interface ) {
			require_once $interface;
		}

		foreach ( glob( __DIR__ . '/responses/*.php' ) as $response ) {
			require_once $response;
		}

		foreach ( glob( __DIR__ . '/routes/*.php' ) as $route ) {
			require_once $route;
		}

		// foreach (glob(dirname(__FILE__) . '/utils/*.php') as $utils)
		// require_once $utils;
	}

	/**
	 * Initialize class
	 *
	 * @return void
	 */
	public function init() {
		add_action(
			'rest_api_init',
			function () {
				$options = new RouteOptions( 'options' );
				$options->register_crud_endpoints();
				$options->register_custom_endpoints();
			}
		);
	}
}
