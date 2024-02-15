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
     * Parent theme path
     * @var string
     */
    protected $parent_path;

    /**
     * Parent theme uri
     * @var string
     */
    protected $parent_uri;

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
    protected $excluded_files;

    /**
     * Files that are only enqueued in admin panel
     * @var array
     */
    protected $admin_only_files;

    /**
     * Constructor
     * @return void 
     */
    public function __construct($parent_path, $parent_uri, $path, $uri) {
        /**
         * Set attributes
         */
        $this->parent_path = $parent_path;
        $this->parent_uri = $parent_uri;
        $this->path = $path;
        $this->uri = $uri;
        $this->excluded_files = ['sanitize', 'dark-mode', 'inline'];
        $this->admin_only_files = ['admin', 'cpt'];
    }

    /**
     * Add scripts and styles to theme
     * @return void 
     */
    public function add_theme_styles_and_scripts(): void {
        /**
         * Enqueue parent theme files
         */
        $this->enqueue_assets($this->parent_path . '/build/theme/*.{js,css}', GLOB_BRACE, $this->parent_uri);

        /**
         * Enqueue child theme files
         */
        if (is_child_theme()) :
            $this->enqueue_assets($this->path . '/build/theme/*.{js,css}', GLOB_BRACE,  $this->uri);
        endif;
    }

    /**
     * Add scripts and styles to admin
     */
    public function add_admin_styles_and_scripts(): void {
        $this->enqueue_assets($this->parent_path . '/build/theme/*.{js,css}', GLOB_BRACE, $this->parent_uri, true);

        if (is_child_theme()) :
            $this->enqueue_assets($this->path . '/build/theme/*.{js,css}', GLOB_BRACE,  $this->uri, true);
        endif;
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
    private function enqueue_assets(string $pattern, int $flags, string $uri, bool $is_admin_enqueue = false): void {
        foreach (glob($pattern, $flags) as $glob) :
            /* Get file information */
            $file_info = pathinfo($glob);

            /**
             * Exlude inline styles and scripts
             */
            foreach ($this->excluded_files as $exluded_file) :
                if ($file_info['filename'] === $exluded_file) continue 2;
            endforeach;

            /**
             * If in admin panel, enqueue all files
             * TODO: Rewrite this to be cleaner
             */
            if ($is_admin_enqueue) :
                $IS_NEW_POST = !empty($GLOBALS['pagenow']) && 'post-new.php' === $GLOBALS['pagenow'];
                $IS_EDIT_POST = !empty($GLOBALS['pagenow']) && 'post.php' === $GLOBALS['pagenow'];


                if (!empty($GLOBALS['pagenow']) && 'theme-install.php' === $GLOBALS['pagenow']) continue;

                if ($file_info['filename'] === 'cpt') :
                    if ($IS_NEW_POST || $IS_EDIT_POST) :
                        $attributes =  $this->get_file_attributes($glob, $uri, $file_info['extension']);
                        $this->enqueue_file($attributes);
                    endif;
                    continue;
                endif;

                $attributes =  $this->get_file_attributes($glob, $uri, $file_info['extension']);
                $this->enqueue_file($attributes);

            else :
                /**
                 * If not in admin panel, enqueue all files except admin only files
                 */
                foreach ($this->admin_only_files as $admin_only_file) :
                    if ($file_info['filename'] === $admin_only_file) continue 2;
                endforeach;

                $attributes =  $this->get_file_attributes($glob, $uri, $file_info['extension']);
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
         * CSS attributes
         */
        if ($extension === 'css') :
            $attributes['type'] = 'text/css';
            $attributes['src'] = $uri . '/build/theme/' . basename($glob);
            $attributes['deps'] = [];
            $attributes['media'] = 'all';
        endif;

        /**
         * JS attributes
         */
        if ($extension === 'js') :
            $attributes['type'] = 'text/javascript';
            $attributes['src'] = $uri . '/build/theme/' . basename($glob);
            $attributes['in_footer'] = true;

            $assets_file = dirname($glob) . '/' . basename($glob, '.js') . '.asset.php';

            if (file_exists($assets_file)) :
                $asset = require($assets_file);
                $attributes['deps'] = $asset['dependencies'];
            else :
                $attributes['deps'] = [];
            endif;
        endif;


        return $attributes;
    }


    /**
     * Enqueue a styles ands scripts
     * Deregister style if already enqueued. Can be used to override styles from parent theme.
     * @param array $attributes
     * @return void 
     */
    private function enqueue_file(array $attributes): void {
        if ($attributes['type'] === 'text/css') :
            /* Check if file is already enqueued */
            if (wp_style_is($attributes['handle'], 'enqueued')) :
                wp_deregister_style($attributes['handle']);
                wp_dequeue_style($attributes['handle']);
            endif;

            wp_register_style($attributes['handle'], $attributes['src'], $attributes['deps'], $attributes['ver'], $attributes['media']);
            wp_enqueue_style($attributes['handle']);
        endif;

        if ($attributes['type'] === 'text/javascript') :
            /* Check if file is already enqueued */
            if (wp_script_is($attributes['handle'], 'enqueued')) :
                wp_deregister_script($attributes['handle']);
                wp_dequeue_script($attributes['handle']);
            endif;

            wp_register_script($attributes['handle'], $attributes['src'], $attributes['deps'], $attributes['ver'], $attributes['in_footer']);
            wp_enqueue_script($attributes['handle']);

            /** 
             * Set translations 
             * @url https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
             */
            wp_set_script_translations($attributes['handle'], 'kotisivu-block-theme');
        endif;
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
