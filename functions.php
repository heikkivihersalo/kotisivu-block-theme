<?php

declare(strict_types=1);

/**
 * Load all theme related files and classes
 *
 * !Do not remove these lines!
 */

require_once __DIR__ . '/bootstrap/vendor.php';
require_once __DIR__ . '/bootstrap/theme.php';

/**
 * Add your custom code here if needed or use the app folder (app/) for more organized code.
 */


/**
 * Force refresh of block assets in development
 */
function refresh_block_assets_in_development() {
    if (!defined('WP_DEBUG') || !WP_DEBUG) {
        return;
    }

    // Clear any WordPress object cache
    if (function_exists('wp_cache_flush')) {
        wp_cache_flush();
    }

    // Force WordPress to re-scan for block.json files
    if (function_exists('wp_clean_themes_cache')) {
        wp_clean_themes_cache();
    }
}

add_action('wp_loaded', 'refresh_block_assets_in_development');
