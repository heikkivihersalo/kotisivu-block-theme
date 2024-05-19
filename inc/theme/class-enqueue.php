<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

include_once(ABSPATH . 'wp-admin/includes/plugin.php');

/**
 * Enqueue files to theme and admin.
 * Parent theme files can be overridden by child theme if corresponding files are created to child theme
 * 
 * @package Kotisivu\BlockTheme 
 */

class Enqueue {
    /**
     * Child theme path
     * @var string
     */
    protected $path;

    /**
     * Child theme uri
     * @var string
     */
    protected $uri;

    /**
     * Files that are excluded from enqueueing
     * @var array
     */
    protected $inline_files;

    /**
     * Files that are only enqueued in admin panel
     * @var array
     */
    protected $admin_only_files;

    /**
     * Constructor
     * @return void 
     */
    public function __construct($path, $uri) {
        /**
         * Set attributes
         */
        $this->path = $path;
        $this->uri = $uri;
        $this->inline_files = ['sanitize', 'dark-mode', 'inline'];
        $this->admin_only_files = ['admin', 'cpt', 'inline'];
    }

    /**
     * Add scripts and styles to theme
     * @return void 
     */
    public function add_theme_styles_and_scripts(): void {
        /**
         * Enqueue theme styles and scripts
         */
        $this->enqueue_assets($this->path . '/build/assets/*.{js,css}', GLOB_BRACE,  $this->uri);

        /**
         * Enqueue Splide slider styles and scripts
         */
        wp_register_script('splide', $this->uri . '/public/lib/splide/splide.min.js', '', filemtime($this->path . '/public/lib/splide/splide.min.js'), true);
        wp_register_style('splide', $this->uri . '/public/lib/splide/splide-core.min.css', '', filemtime($this->path . '/public/lib/splide/splide-core.min.css'), 'all');
        wp_enqueue_style('splide');
        wp_enqueue_script('splide');
    }

    /**
     * Add scripts and styles to admin
     */
    public function add_admin_styles_and_scripts(): void {
        $this->enqueue_assets($this->path . '/build/assets/*.{js,css}', GLOB_BRACE,  $this->uri, true);
    }

    /**
     * Smart enqueue function
     * https://neliosoftware.com/blog/devtips-smart-enqueuing-block-styles-in-fse/
     */
    // TODO: Implement smart enqueue to theme

    /**
     * Enqueue theme file from selected path. 
     * If file is already enqueued, deenqueue it first and then enqueue it again.
     * Can be used to override parent theme styles and scripts.
     * 
     * @param string $pattern glob pattern for searching files
     * @param string $uri 
     * @return void 
     */
    private function enqueue_assets(string $pattern, int $flags, string $uri, bool $IS_ADMIN_ENQUEUE = false): void {
        foreach (glob($pattern, $flags) as $glob) :
            /**
             * Get file info
             */
            $FILE_INFO = pathinfo($glob);
            $IS_ADMIN_ONLY = in_array($FILE_INFO['filename'], $this->admin_only_files);
            $IS_INLINE_ONLY = in_array($FILE_INFO['filename'], $this->inline_files);

            /**
             * Check dark mode setting
             */
            if ($FILE_INFO['filename'] === 'dark-mode' && !$this->config['darkMode']) continue;

            /**
             * If in admin panel, enqueue all files
             */
            if ($IS_ADMIN_ENQUEUE) :
                /**
                 * Guard clauses
                 */
                if (!empty($GLOBALS['pagenow']) && 'theme-install.php' === $GLOBALS['pagenow']) continue;
                if ($IS_INLINE_ONLY && !$IS_ADMIN_ONLY) continue;

                /**
                 * Enqueue admin files
                 */
                $IS_NEW_POST = !empty($GLOBALS['pagenow']) && 'post-new.php' === $GLOBALS['pagenow'];
                $IS_EDIT_POST = !empty($GLOBALS['pagenow']) && 'post.php' === $GLOBALS['pagenow'];

                if ($FILE_INFO['filename'] === 'cpt') :
                    if ($IS_NEW_POST || $IS_EDIT_POST) :
                        $attributes =  $this->get_file_attributes($glob, $uri, $FILE_INFO['extension']);
                        $this->enqueue_file($attributes);
                    endif;
                    continue;
                endif;

                $attributes =  $this->get_file_attributes($glob, $uri, $FILE_INFO['extension']);
                $this->enqueue_file($attributes);
            else :
                /**
                 * If not in admin panel, enqueue all files except admin only files
                 */
                if ($IS_ADMIN_ONLY) continue;

                $attributes =  $this->get_file_attributes($glob, $uri, $FILE_INFO['extension']);
                $this->enqueue_file($attributes);
            endif;
        endforeach;
    }

    /**
     * 
     * @param string $glob 
     * @param string $uri 
     * @param array $deps 
     * @return array 
     */
    private function get_file_attributes(string $glob, string $uri, string $extension): array {
        /**
         * Common attributes
         */
        $attributes = [];
        $attributes['handle'] = explode(".", basename($glob, '.css'))[0]; // Get rid of .css or .js extension
        $attributes['ver'] = filemtime($glob);

        /**
         * Set other attributes based on file extension
         */
        switch ($extension) {
            case 'css':
                $attributes['type'] = 'text/css';
                $attributes['src'] = $uri . '/build/assets/' . basename($glob);
                $attributes['deps'] = [];
                $attributes['media'] = 'all';
                break;

            case 'js':
                $attributes['type'] = 'text/javascript';
                $attributes['src'] = $uri . '/build/assets/' . basename($glob);
                $attributes['in_footer'] = true;

                $assets_file = dirname($glob) . '/' . basename($glob, '.js') . '.asset.php';

                if (file_exists($assets_file)) :
                    $asset = require($assets_file);
                    $attributes['deps'] = $asset['dependencies'];
                else :
                    $attributes['deps'] = [];
                endif;
                break;

            default:
                break;
        }

        return $attributes;
    }


    /**
     * Enqueue a styles ands scripts
     * Deregister style if already enqueued. Can be used to override styles from parent theme.
     * @param array $attributes
     * @return void 
     */
    private function enqueue_file(array $attributes): void {
        /**
         * Set handle
         */
        $handle = 'ksd-' . $attributes['handle'];

        /**
         * Enqueue file based on type
         */
        switch ($attributes['type']) {
            case 'text/css':
                /* Check if file is already enqueued */
                if (wp_style_is($handle, 'enqueued')) :
                    wp_deregister_style($handle);
                    wp_dequeue_style($handle);
                endif;

                wp_register_style($handle, $attributes['src'], $attributes['deps'], $attributes['ver'], $attributes['media']);
                wp_enqueue_style($handle);
                break;

            case 'text/javascript':
                /* Check if file is already enqueued */
                if (wp_script_is($handle, 'enqueued')) :
                    wp_deregister_script($handle);
                    wp_dequeue_script($handle);
                endif;

                wp_register_script($handle, $attributes['src'], $attributes['deps'], $attributes['ver'], $attributes['in_footer']);
                wp_enqueue_script($handle);

                /** 
                 * Set translations 
                 * @url https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
                 */
                wp_set_script_translations($handle, 'kotisivu-block-theme');
                break;

            default:
                break;
        }
    }


    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        add_action('wp_enqueue_scripts', [$this, 'add_theme_styles_and_scripts']);
        add_action('enqueue_block_editor_assets', [$this, 'add_admin_styles_and_scripts']);

        if (is_user_logged_in()) {
            add_action('admin_enqueue_scripts', [$this, 'add_admin_styles_and_scripts']);
        }
    }
}
