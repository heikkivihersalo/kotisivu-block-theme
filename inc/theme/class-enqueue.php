<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

include_once(ABSPATH . 'wp-admin/includes/plugin.php');

/**
 * Enqueue files to theme and admin. Gets all styles theme/assets/styles folder and gets all scripts from theme/assets/scripts folder.
 * Parent theme files can be overridden by child theme if corresponding files are created to child theme
 * 
 * Inherits following attributes
 * * name
 * * version
 * * textdomain
 * * options
 * * config
 * * path
 * * uri
 * * parent_path
 * * parent_uri
 * 
 * @package Kotisivu\BlockTheme 
 */
class Enqueue extends Theme {
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

            /**
             * Load React app CSS and JS files from Child Theme
             * - Files and folders related to react: 'webpack.config.js', 'package.json', 'build', 'src'
             * - Using yarn is recommended (npm might not work on some modules)
             * - package.json contains necessary build and yarn configurations
             * - Build will fail if webpack.config.js is not found
             */
            if ($this->config['settings']['react-app']) :
                $this->enqueue_assets($this->path . '/app/build/*.{js,css}', GLOB_BRACE, $this->uri);
            endif;
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
             * Exclude list
             */
            if ($file_info['filename'] === 'sanitize') continue;
            if ($file_info['filename'] === 'dark-mode') continue;
            if ($file_info['filename'] === 'inline') continue;
            
            /**
             * If in admin panel, enqueue all files
             */
            if ($is_admin_enqueue) :
                $attributes =  $this->get_file_attributes($glob, $uri, $file_info['extension']);
                $this->enqueue_file($attributes);
                /**
                 * if outside admin, skip admin.js file
                 */
            else :
                if ($file_info['filename'] === 'admin') continue;
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
        $attributes['handle'] = basename($glob, '.css');
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
        add_action('admin_enqueue_scripts', [$this, 'add_admin_styles_and_scripts']);
        add_action('enqueue_block_editor_assets', [$this, 'add_admin_styles_and_scripts']);
    }
}
