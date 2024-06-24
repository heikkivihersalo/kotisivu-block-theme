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
 * Remove WordPress version from header
 *
 * @return void
 */
function remove_wp_version(): void {
	if ( SITE_SETTINGS['security']['version'] ) {
		remove_action( 'wp_head', 'wp_generator' );
		remove_action( 'wp_head', 'wc_generator_tag' );
	}
}

/**
 * Disable XML-RPC methods that require authentication
 *
 * @return  void
 */
function disable_xmlrpc(): void {
	if ( SITE_SETTINGS['security']['xmlrpc'] ) {
		add_filter( 'xmlrpc_enabled', '__return_false' );
	}
}

/**
 * Disable author pages
 *
 * @return void
 */
function disable_author_pages(): void {
	if ( SITE_SETTINGS['security']['author-pages'] ) {
		global $wp_query;

		if ( is_author() ) {
			wp_safe_redirect( get_option( 'home' ), 301 );
			exit();
		}
	}
}

/**
 * Disable REST API user endpoints
 *
 * @param array $endpoints The current REST api endpoints
 * @return array
 */
function disable_rest_api_user_endpoints( $endpoints ): array {
	if ( SITE_SETTINGS['security']['rest-api-user-endpoints'] ) {
		if ( isset( $endpoints['/wp/v2/users'] ) ) {
			unset( $endpoints['/wp/v2/users'] );
		}
		if ( isset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] ) ) {
			unset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] );
		}
	}

	return $endpoints;
}

/**
 * Disable REST API for non logged in users
 *
 * @param mixed $result The result of the authentication check.
 * @return mixed
 * @link https://developer.wordpress.org/rest-api/using-the-rest-api/frequently-asked-questions/#require-authentication-for-all-requests
 */
function disable_rest_api_for_non_logged_in_users( $result ): mixed {
	if ( ! SITE_SETTINGS['security']['unauthorized-rest-api'] ) {
		return $result;
	}

	// If a previous authentication check was applied,
	// pass that result along without modification.
	if ( true === $result || is_wp_error( $result ) ) {
		return $result;
	}

	// No authentication has been performed yet.
	// Return an error if user is not logged in.
	if ( ! is_user_logged_in() ) {
		return new WP_Error(
			'rest_not_logged_in',
			'You are not currently logged in.',
			array( 'status' => 401 )
		);
	}

	// Our custom authentication check should have no effect
	// on logged-in requests
	return $result;
}

/**
 * Remove JSON API
 *
 * @return void
 */
function remove_json_api(): void {
	if ( SITE_SETTINGS['security']['json-api'] ) {
		add_filter( 'json_enabled', '__return_false' );
		add_filter( 'json_jsonp_enabled', '__return_false' );
		add_filter( 'rest_enabled', '__return_false' );
		add_filter( 'rest_jsonp_enabled', '__return_false' );
		remove_action( 'wp_head', 'rest_output_link_wp_head', 10 );
		remove_action( 'wp_head', 'wp_oembed_add_discovery_links', 10 );
		remove_action( 'rest_api_init', 'wp_oembed_register_route' );
		add_filter( 'embed_oembed_discover', '__return_false' );
		remove_filter( 'oembed_dataparse', 'wp_filter_oembed_result', 10 );
		remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
		remove_action( 'wp_head', 'wp_oembed_add_host_js' );
		remove_action( 'template_redirect', 'rest_output_link_header', 11, 0 );
	}
}
