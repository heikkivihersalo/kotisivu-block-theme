<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Clean all extra junk from the theme
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
class Cleanup extends Theme {
    /**
     * Remove embeds
     * @return void 
     */
    private function remove_embeds(): void {
        /* Turn-off oEmbed auto discovery */
        add_filter('embed_oembed_discover', '__return_false');

        /* Don't filter oEmbed results */
        remove_filter('oembed_dataparse', 'wp_filter_oembed_result', 10);

        /* Remove oEmbed discovery links */
        remove_action('wp_head', 'wp_oembed_add_discovery_links');

        /* Remove oEmbed-specific JavaScript from the front-end and back-end */
        remove_action('wp_head', 'wp_oembed_add_host_js');

        /* Remove all embeds rewrite rules */
        if (function_exists('disable_embeds_rewrites')) add_filter('rewrite_rules_array', 'disable_embeds_rewrites');
    }
    /**
     * Remove WP emojies
     * @return void 
     */
    private function remove_emojis(): void {
        remove_action('wp_head', 'print_emoji_detection_script', 7);
        remove_action('wp_print_styles', 'print_emoji_styles');
        remove_action('admin_print_scripts', 'print_emoji_detection_script');
        remove_action('admin_print_styles', 'print_emoji_styles');
    }

    /**
     * Remove feed links
     * @return void 
     */
    private function remove_feed_links(): void {
        /* Remove RSS feed links (NOTE: If using RSS service, you must add these links by yourself */
        remove_action('wp_head', 'feed_links', 2);

        /* Remove all extra RSS feed links */
        remove_action('wp_head', 'feed_links_extra', 3);
    }

    /**
     * Remove link to index page
     * @return void 
     */
    private function remove_index_link(): void {
        /* Display relational link for the site index */
        remove_action('wp_head', 'index_rel_link');
    }

    private function remove_json_api(): void {
        /* WP-API version 1.x */
        add_filter('json_enabled', '__return_false');
        add_filter('json_jsonp_enabled', '__return_false');

        /* WP-API version 2.x */
        add_filter('rest_enabled', '__return_false');
        add_filter('rest_jsonp_enabled', '__return_false');
    }

    /**
     * Remove posts links 
     * @return void 
     */
    private function remove_post_links(): void {
        /* Remove random post link */
        remove_action('wp_head', 'start_post_rel_link', 10, 0);

        /* Remove parent post link */
        remove_action('wp_head', 'parent_post_rel_link', 10, 0);

        /* Remove 'next post' and 'previous post' links */
        remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0);

        /* Displays relational links for the posts adjacent to the current post for single post pages */
        remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
    }

    /**
     * Removes recource hints
     * @return void 
     */
    private function remove_recource_hints(): void {
        /* Prints resource hints to browsers for pre-fetching, pre-rendering and pre-connecting to web sites. */
        remove_action('wp_head', 'wp_resource_hints', 2);
    }

    /**
     * Removes rel=canonical
     * @return void 
     */
    private function remove_rel_canonical(): void {
        /* Outputs rel=canonical for singular queries */
        remove_action('wp_head', 'rel_canonical');
    }

    /**
     * Removes REST-API
     * @return void 
     */
    private function remove_rest_api(): void {
        /* Remove the REST API lines from the HTML Header */
        remove_action('wp_head', 'rest_output_link_wp_head', 10);
        remove_action('wp_head', 'wp_oembed_add_discovery_links', 10);

        /* Remove the REST API endpoint */
        remove_action('rest_api_init', 'wp_oembed_register_route');
    }

    /**
     * Removes Really Simple Discovery link
     * @return void 
     */
    private function remove_rsd(): void {
        /* Remove Really Simple Discovery link */
        remove_action('wp_head', 'rsd_link');
    }

    /**
     * Removes WordPress short link
     * @return void 
     */
    private function remove_shortlink(): void {
        /* Remove WordPress shortlink */
        remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);
    }

    /**
     * Removes WordPress version
     * @return void 
     */
    private function remove_version(): void {
        /* Remove WordPress version number from head */
        remove_action('wp_head', 'wp_generator');
    }

    /**
     * Removes WLW Manifest
     * @return void 
     */
    private function remove_wlwmanifest(): void {
        /* Remove wlwmanifest.xml (needed to support Windows Live Writer) */
        remove_action('wp_head', 'wlwmanifest_link');
    }

    /**
     * Remove wp embedded scripts from footer
     * @return void 
     */
    private function remove_wpembed(): void {
        wp_deregister_script('wp-embed');
    }

    /**
     * Remove WordPress duotone injection from header
     * TODO: Might be obsolete in the future. Only removes svg's. Variables are still intact.
     */
    private function remove_duotone(): void {
        remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');
    }

    /**
     * Remove block library styles
     * @param object $styles 
     * @return void 
     */
    public function remove_block_library_styles($styles): void {
        $handles = [];

        if ($this->config["settings"]["disable"]["block-library-theme"]) {
            $handles[] = 'wp-block-library-theme';
        }

        if ($this->config["settings"]["disable"]["block-library"]) {
            $handles[] = 'wp-block-library';
        }

        if ($handles) {
            foreach ($handles as $handle) {
                $style = $styles->query($handle, 'registered');
                if (!$style) {
                    continue;
                }

                $styles->remove($handle);
                $styles->add($handle, false, []);
            }
        }
    }

    /**
     * Remove actions and functions from site head
     * @return void 
     */
    public function remove_from_wp_head(): void {
        if ($this->config["settings"]["disable"]["emojis"]) $this->remove_emojis();
        if ($this->config["settings"]["disable"]["feed_links"]) $this->remove_feed_links();
        if ($this->config["settings"]["disable"]["index_link"]) $this->remove_index_link();
        if ($this->config["settings"]["disable"]["post_links"]) $this->remove_post_links();
        if ($this->config["settings"]["disable"]["recource_hints"]) $this->remove_recource_hints();
        if ($this->config["settings"]["disable"]["rel_canonical"]) $this->remove_rel_canonical();
        if ($this->config["settings"]["disable"]["rsd"]) $this->remove_rsd();
        if ($this->config["settings"]["disable"]["shortlink"]) $this->remove_shortlink();
        if ($this->config["settings"]["disable"]["version"]) $this->remove_version();
        if ($this->config["settings"]["disable"]["wlwmanifest"]) $this->remove_wlwmanifest();
        if ($this->config["settings"]["disable"]["duotone"]) $this->remove_duotone();
    }

    /**
     * Remove actions and functions from site footer
     * @return void 
     */
    public function remove_from_wp_footer(): void {
        if ($this->config["settings"]["disable"]["embeds"]) $this->remove_wpembed();
    }

    /**
     * Remove actions and functions after theme setup
     * @return void 
     */
    public function remove_after_theme_setup(): void {
        if ($this->config["settings"]["disable"]["embeds"]) $this->remove_embeds();
        if ($this->config["settings"]["disable"]["json_api"]) $this->remove_json_api();
        if ($this->config["settings"]["disable"]["rest_api"]) $this->remove_rest_api();
    }

    /**
     * Deregister Fluent Form CSS
     * @return void 
     */
    public function remove_fluentforms_styles(): void {
        if (is_plugin_active('fluentform/fluentform.php')) :
            wp_deregister_style('fluentform-public-default');
            wp_dequeue_style('fluentform-public-default');
            wp_deregister_style('fluent-form-styles');
            wp_dequeue_style('fluent-form-styles');
        endif;
    }

    /**
     * Dequeue Block Theme Inline Styles
     */
    public function remove_block_theme_inline_styles(): void {
        // if ($this->config["settings"]["disable"]["block-library"]) wp_dequeue_style('wp-block-library');
        // if ($this->config["settings"]["disable"]["block-library-theme"]) wp_dequeue_style('wp-block-library-theme');
        if ($this->config["settings"]["disable"]["global-styles"]) wp_dequeue_style('global-styles');
        if ($this->config["settings"]["disable"]["woocommerce-block-style"]) wp_dequeue_style('wc-block-style');

        if ($this->config["settings"]["disable"]["block-library"]) :
            remove_filter('render_block', 'wp_render_layout_support_flag', 10, 2);
            remove_filter('render_block', 'wp_render_elements_support', 10, 2);
            remove_filter('render_block', 'gutenberg_render_elements_support', 10, 2);
        endif;
    }

    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        add_action('init', [$this, 'remove_fluentforms_styles']);
        add_action('init', [$this, 'remove_from_wp_head']);
        add_action('wp_default_styles', [$this, 'remove_block_library_styles'], PHP_INT_MAX);
        add_action('after_setup_theme', [$this, 'remove_after_theme_setup'], 10, 0);
        add_action('wp_footer', [$this, 'remove_from_wp_footer']);
        add_action('wp_enqueue_scripts', [$this, 'remove_block_theme_inline_styles'], 100);
    }
}
