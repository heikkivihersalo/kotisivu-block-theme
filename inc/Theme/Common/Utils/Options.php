<?php
/**
 * Utility functions for options
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Common\Utils
 */

namespace Kotisivu\BlockTheme\Theme\Common\Utils;

defined( 'ABSPATH' ) || die();

/**
 * Utility functions for options
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Common\Utils
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
final class Options {
	/**
	 * This utility class should never be instantiated.
	 */
	private function __construct() {
	}

	/**
	 * Get transient lifespan based on user role and app state
	 *
	 * @return int
	 */
	private static function get_transient_lifespan(): int {
		return ( is_super_admin() && \WP_DEBUG ) ? 1 : \DAY_IN_SECONDS;
	}

	/**
	 * Get site options from database and store it to cache
	 *
	 * @param string $slug The slug of the options
	 *
	 * @return mixed
	 */
	public static function get_options_file( string $slug ): mixed {
		/**
		 * Check options for cache. If not found, load it from database
		 */
		$cache = wp_cache_get( 'valintarengas-block-theme_' . $slug );

		if ( false === $cache ) {
			$cache = get_option( 'valintarengas-block-theme_' . $slug );
			wp_cache_set( 'valintarengas-block-theme_' . $slug, $cache );
		}

		return $cache;
	}

	/**
	 * Purge transient cache
	 *
	 * @return void
	 */
	public static function purge_transient_cache(): void {
		global $wpdb;

		/**
		 * Get all transients that are related to Kotisivu Block Theme
		 */
		// phpcs:ignore -- We need to use direct query here
		$transients = $wpdb->get_col(
			$wpdb->prepare(
				'SELECT option_name FROM %i WHERE option_name LIKE %s',
				$wpdb->options, // Name of the options table
				'_transient_timeout_valintarengas-block-theme%'
			)
		);

		/**
		 * Delete all transients
		 */
		foreach ( $transients as $transient ) {
			$key = str_replace( '_transient_timeout_', '', $transient );
			delete_transient( $key );
		}

		wp_cache_flush();
	}
}
