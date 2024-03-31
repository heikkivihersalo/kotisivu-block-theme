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
     * Set block translation
     * @param string $block_slug
     * @param string $path
     * @return void
     */
    public static function set_block_translation($block_slug, $path): void {
        wp_set_script_translations(
            $block_slug,
            'kotisivu-block-theme',
            $path . '/languages'
        );

        add_filter('load_script_translation_file', function (string $file, string $handle, string $domain) use ($block_slug, $path) {
            if (strpos($handle, $block_slug) !== false && 'kotisivu-block-theme' === $domain) {
                $file = str_replace(WP_LANG_DIR . '/themes', $path . '/languages', $file);
            }

            return $file;
        }, 10, 3);
    }

    /**
     * Get block directories
     * Can be used to get all blocks that needs to be registered
     * @param string $path 
     * @return array 
     */
    public static function get_block_directories(string $path = null, string $namespace): array {
        if ($path === null) {
            return [];
        }

        foreach (scandir($path) as $block) {
            // Remove unnecessary files (e.g. .gitignore, .DS_Store, ., .. etc.)
            if ($block === '.' || $block === '..' || $block === '.DS_Store' || strpos($block, '.') === true) continue;

            // Add block to array
            $blocks[] = $namespace . '/' . $block;

            // Check if block is core block and has child blocks
            // E.g. core/buttons, core/list
            if ($namespace === 'core') :
                switch ($block) {
                    case 'buttons':
                        $blocks[] = 'core/button';
                        break;
                    case 'list':
                        $blocks[] = 'core/list-item';
                        break;
                    default:
                        break;
                }
            endif;
        }

        return $blocks;
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

    /**
     * Check if string starts with another string
     * @param string $string 
     * @param string $startString 
     * @return bool 
     */
    private static function startsWith($string, $startString) {
        $len = strlen($startString);
        return (substr($string, 0, $len) === $startString);
    }

    /**
     * Format phone number to Finnish format
     * @param mixed $num 
     * @return string 
     */
    public static function format_phone_num($num): string {
        /**
         * If number is in correct format, return it
         */
        if (self::startsWith($num, '+358')) {
            return preg_replace('/\s+/', '', $num);
        }

        /**
         * If number is in local format (e.g. 0401234567), format it to Finnish format
         */
        if (self::startsWith($num, '0')) {
            switch ($num):
                case (self::startsWith($num, '040')):
                    return preg_replace('/\s+/', '', sprintf(
                        "%s %s %s",
                        '+358' . substr($num, 1, 2),
                        substr($num, 3, 3),
                        substr($num, 6)
                    ));
                    break;
                case (self::startsWith($num, '050')):
                    return preg_replace('/\s+/', '', sprintf(
                        "%s %s %s",
                        '+358' . substr($num, 1, 2),
                        substr($num, 3, 3),
                        substr($num, 6)
                    ));
                    break;
                case (self::startsWith($num, '044')):
                    return preg_replace('/\s+/', '', sprintf(
                        "%s %s %s",
                        '+358' . substr($num, 1, 2),
                        substr($num, 3, 3),
                        substr($num, 6)
                    ));
                    break;
                case (self::startsWith($num, '045')):
                    return preg_replace('/\s+/', '', sprintf(
                        "%s %s %s",
                        '+358' . substr($num, 1, 2),
                        substr($num, 3, 3),
                        substr($num, 6)
                    ));
                    break;
                case (self::startsWith($num, '09')):
                    return preg_replace('/\s+/', '', sprintf(
                        "%s %s %s",
                        '+358' . substr($num, 1, 2),
                        substr($num, 3, 3),
                        substr($num, 6)
                    ));
                    break;
                default:
                    return $num;
                    break;
            endswitch;
        }

        return $num;
    }
}
