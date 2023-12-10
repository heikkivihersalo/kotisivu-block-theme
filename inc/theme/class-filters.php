<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Add filters to modify the theme behavior
 * 
 * @package Kotisivu\BlockTheme 
 */

class Filters {
    /**
     * @var array $config
     */
    private $config;

    /**
     * @var string $path
     */
    private $parent_path;

    /**
     * Constructor
     * @return void 
     */
    public function __construct($config, $parent_path) {
        /**
         * Set attributes
         */
        $this->config = $config;
        $this->parent_path = $parent_path;
    }

    /**
     * Add custom image options to admin interface
     * @param array $sizes 
     * @return array 
     */
    public function add_custom_sizes_to_admin(array $sizes): array {
        $custom_images = [];

        foreach ($this->config["customImages"]["customSizes"] as $image) :
            $custom_images[$image['slug']] = [__($image['name'],  'kotisivu-block-theme')];
        endforeach;

        return array_merge($sizes, $custom_images);
    }

    /**
     * Disable WordPress default update api calls
     * @param array $response 
     * @param string $url 
     * @return array response
     */
    public function disable_theme_update(array $response, string $url): array {
        /**
         * Ensure that a theme is never updated. This works by removing the
         * theme from the list of available updates.
         * @author: Micah Wood
         * @url: https://wpscholar.com/blog/exclude-plugin-theme-from-wordpress-updates/
         * 
         * Original snippets posted by Mark Jaquith 
         * https://markjaquith.wordpress.com/2009/12/14/excluding-your-plugin-or-theme-from-update-checks/
         * 
         */
        if (0 === strpos($url, 'https://api.wordpress.org/themes/update-check')) {
            $themes = json_decode($response['body']['themes']);
            unset($themes->themes->{'kotisivu-block-theme'});
            unset($themes->themes->{'style'});
            $response['body']['themes'] = json_encode($themes);
        }

        return $response;
    }

    /**
     * Add image support for SVG's
     * @param array $mimes 
     * @return array 
     */
    public function allow_svg_uploads(array $mimes): array {
        $mimes['svg'] = 'image/svg+xml';
        return $mimes;
    }

    /**
     * Override default excerpt length
     * @param int $length 
     * @return int 
     */
    public function limit_excerpt_length(int $length): int {
        return 20;
    }


    /**
     * Disable jQuery
     * @return void 
     */
    public function remove_jquery(): void {
        $jquery = $this->config["settings"]["jquery"];

        /* If user is logged in or jquery is loaded normally, return nothing */
        if ($jquery == 'normal' || is_user_logged_in()) return;

        /** 
         * Load jQuery on footer
         */
        if ($jquery == 'footer') {
            wp_scripts()->add_data('jquery', 'group', 1);
            wp_scripts()->add_data('jquery-core', 'group', 1);
            wp_scripts()->add_data('jquery-migrate', 'group', 1);
        }

        /** 
         * Disable jQuery from loading
         */
        if ($jquery == 'disable') {
            wp_dequeue_script('jquery');
            wp_deregister_script('jquery');
        }
    }

    /**
     * Load translations
     */
    public function load_translations(): void {
        load_theme_textdomain('kotisivu-block-theme', $this->parent_path . '/languages');
    }


    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        add_action('after_setup_theme', [$this, 'load_translations']);
        add_filter('image_size_names_choose', [$this, 'add_custom_sizes_to_admin']);
        add_filter('upload_mimes', [$this, 'allow_svg_uploads']);
        add_filter('excerpt_length', [$this, 'limit_excerpt_length'], 999);
        add_filter('http_request_args', [$this, 'disable_theme_update'], 10, 2);
        add_filter('wp_enqueue_scripts', [$this, 'remove_jquery']);
        // TODO: Add filter to limit inline styles size
        // add_filter('styles_inline_size_limit', function () {
        //     return 50000; // Size in bytes.
        // });
    }
}
