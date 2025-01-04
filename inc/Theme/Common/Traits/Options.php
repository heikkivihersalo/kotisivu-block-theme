<?php
/**
 * Options for the theme
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Common
 */

namespace Kotisivu\BlockTheme\Theme\Common\Traits;

/**
 * Options for the theme
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Common
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
trait Options {
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
	public function get_options_file( string $slug ): mixed {
		/**
		 * Check options for cache. If not found, load it from database
		 */
		$cache = wp_cache_get( 'kotisivu-block-theme_' . $slug );

		if ( false === $cache ) {
			$cache = get_option( 'kotisivu-block-theme_' . $slug );
			wp_cache_set( 'kotisivu-block-theme_' . $slug, $cache );
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
				'_transient_timeout_kotisivu-block-theme%'
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
