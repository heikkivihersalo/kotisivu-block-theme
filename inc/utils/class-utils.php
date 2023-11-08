<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 *
 * @package Kotisivu\BlockTheme
 */
final class Utils {
    /**
     * This utility class should never be instantiated.
     */
    private function __construct() {
    }

    /**
     * Get transient lifespan based on user role and app state
     * @return int
     */
    private static function get_transient_lifespan(): int {
        return (is_super_admin() && \WP_DEBUG) ? 1 : \DAY_IN_SECONDS;
    }

    /**
     * Get config file and store it to WordPress Transients API
     * @param string $slug 
     * @param string $file_name 
     * @return mixed 
     */
    public static function get_config_file(string $slug, string $file_name, string $path, string $parent_path): mixed {
        /**
         * Check config file for cache. If config file is not found from cache, load it from file
         */
        $cache = get_transient('kotisivu-block-theme' . '_' . $slug);

        if ($cache === false) :
            /* Get config file */
            $config_file = file_get_contents($path . '/' . $file_name);

            /* Fallback if config.json is not found from child theme */
            if (!$config_file) :
                $config_file = file_get_contents($parent_path . '/' . $file_name);
            endif;

            /* Encode and set cache */
            $cache = json_decode($config_file, true);
            set_transient('kotisivu-block-theme' . '_' . $slug, $cache, Utils::get_transient_lifespan());
        endif;

        return $cache;
    }

    /**
     * Get site options from database and store it to cache
     * @param string $slug 
     * @return mixed
     */
    public static function get_options_file(string $slug): mixed {
        /**
         * Check options for cache. If not found, load it from database
         */
        $cache = wp_cache_get('kotisivu-block-theme' . '_' . $slug);

        if ($cache === false) {
            get_option('kotisivu-block-theme' . '_' . $slug);
            $cache = get_option('kotisivu-block-theme' . '_' . $slug);
            wp_cache_set('kotisivu-block-theme' . '_' . $slug, $cache);
        }

        return $cache;
    }

    /**
     * Adds functionality to return '__return_true' string to used in filters and hooks
     * @return string 
     */
    public static function return_true(): string {
        return '__return_true';
    }

    /**
     * Write to log
     * @param string $message 
     * @return void 
     * TODO: Make sure this is working
     */
    public static function write_log($log): void {
        if (is_array($log) || is_object($log)) {
            error_log(print_r($log, true));
        } else {
            error_log($log);
        }
    }
}
