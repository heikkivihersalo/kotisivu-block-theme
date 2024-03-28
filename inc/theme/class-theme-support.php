<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Set default configurations
 * 
 * @package Kotisivu\BlockTheme 
 */

class ThemeSupport {
    /**
     * Theme config file
     * @var array
     */
    private $config;

    /**
     * Constructor
     * @return void 
     */
    public function __construct($config) {
        /**
         * Set attributes
         */
        $this->config = $config;
    }

    /**
     * 
     * @return void 
     */
    public function add_theme_support(): void {
        $this->add([
            'wp-block-styles',
            'align-wide',
            'custom-logo',
            'menus',
            'editor-styles'
        ]);

        $this->remove([
            'core-block-patterns'
        ]);

        $this->editor_styles([
            'theme.css',
            'admin.css',
            'core.css'
        ]);

        $this->custom_image_sizes($this->config["customImages"]["defaultSizes"]);
    }

    /**
     * Add custom image options for WordPress
     * @param array $sizes 
     * @return void 
     */
    private function custom_image_sizes(array $sizes): void {
        /* Update default core image sizes */
        foreach ($sizes as $size) :
            update_option($size['slug'] . '_w', $size['width']);
            update_option($size['slug'] . '_h', $size['height']);
        endforeach;

        /* Add new image sizes to core */
        foreach ($sizes as $size) :
            add_image_size($size['slug'], $size['width'], $size['height']);
        endforeach;
    }

    /**
     * Register navigation menus to theme
     * @return void
     */
    public function register_navigation_menus(): void {
        foreach ($this->config["menus"] as $menu) :
            register_nav_menus([
                $menu['slug'] => $menu['name']
            ]);
        endforeach;
    }

    /**
     * Add theme support
     * @param array $types 
     * @return void 
     */
    private function add(array $types): void {
        foreach ($types as $type) :
            add_theme_support($type);
        endforeach;
    }

    /**
     * Remove theme support
     * @param array $types 
     * @return void 
     */
    private function remove(array $types): void {
        foreach ($types as $type) :
            remove_theme_support($type);
        endforeach;
    }

    /**
     * Add styles to editor
     * @param array $names 
     * @return void 
     */
    private function editor_styles(array $names): void {
        foreach ($names as $name) :
            add_editor_style($name);
        endforeach;
    }

    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        /**
         * Add default theme support features
         */
        add_action('after_setup_theme', [$this, 'add_theme_support']);
        add_action('after_setup_theme', [$this, 'register_navigation_menus']);

        /**
         * Add customizer to theme
         */
        add_action('customize_register', '__return_true');
    }
}
