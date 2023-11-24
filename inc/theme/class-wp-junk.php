<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Clean all extra junk from the theme
 * 
 * @package Kotisivu\BlockTheme
 */

class Junk {
    /**
     * Theme settings extracted from config.json file
     * @var array
     */
    protected $settings;

    /**
     * Constructor
     * @return void
     */
    public function __construct($settings) {
        /**
         * Set attributes
         */
        $this->settings = $settings;
    }

    /**
     * Removes WordPress version
     * @return string 
     */
    public function remove_wp_version(): string {
        return '';
    }

    /**
     * Disable REST API for non logged in users
     * @param mixed $result
     * @return mixed
     * @link https://developer.wordpress.org/rest-api/using-the-rest-api/frequently-asked-questions/#require-authentication-for-all-requests
     */
    public function disable_rest_api_for_non_logged_in_users($result) {
        // If a previous authentication check was applied,
        // pass that result along without modification.
        if (true === $result || is_wp_error($result)) {
            return $result;
        }

        // No authentication has been performed yet.
        // Return an error if user is not logged in.
        if (!is_user_logged_in()) {
            return new WP_Error(
                'rest_not_logged_in',
                __('You are not currently logged in.'),
                array('status' => 401)
            );
        }

        // Our custom authentication check should have no effect
        // on logged-in requests
        return $result;
    }

    /**
     * Disable REST API user endpoints
     * @param array $endpoints
     * @return array
     */
    public function disable_rest_api_user_endpoints($endpoints): array {
        if (isset($endpoints['/wp/v2/users'])) {
            unset($endpoints['/wp/v2/users']);
        }
        if (isset($endpoints['/wp/v2/users/(?P<id>[\d]+)'])) {
            unset($endpoints['/wp/v2/users/(?P<id>[\d]+)']);
        }

        return $endpoints;
    }

    /**
     * Disable author pages
     * @return void
     */
    public function disable_author_pages() {
        global $wp_query;

        if (is_author()) {
            wp_redirect(get_option('home'), 301);
            exit;
        }
    }

    /**
     * Disable emojis
     * @return void
     */
    public function disable_wp_emojis(): void {
        remove_action('admin_print_styles', 'print_emoji_styles');
        remove_action('wp_head', 'print_emoji_detection_script', 7);
        remove_action('admin_print_scripts', 'print_emoji_detection_script');
        remove_action('wp_print_styles', 'print_emoji_styles');
        remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
        remove_filter('the_content_feed', 'wp_staticize_emoji');
        remove_filter('comment_text_rss', 'wp_staticize_emoji');
        add_filter('tiny_mce_plugins',  [$this, 'disable_emojis_tinymce']);
        add_filter('wp_resource_hints', [$this, 'disable_emojis_remove_dns_prefetch'], 1, 2);
    }

    /**
     * Remove jQuery Migrate script
     * Original code from: https://dotlayer.com/what-is-migrate-js-why-and-how-to-remove-jquery-migrate-from-wordpress/
     * @return	void
     */
    public function remove_jquery_migrate($scripts): void {
        if (!is_admin() && isset($scripts->registered['jquery'])) {
            $script = $scripts->registered['jquery'];

            if ($script->deps) { // Check whether the script has any dependencies
                $script->deps = array_diff($script->deps, array(
                    'jquery-migrate'
                ));
            }
        }
    }

    /**
     * Disable WP emojis from TinyMCE
     * @return void
     */
    public function disable_emojis_tinymce($plugins): array {
        return is_array($plugins) ? array_diff($plugins, array('wpemoji')) : array();
    }

    /**
     * Disable WP emojis DNS prefetch
     * @param $urls
     * @param $relation_type
     *
     * @return array
     */
    public function disable_emojis_remove_dns_prefetch($urls, $relation_type): array {
        if ('dns-prefetch' !== $relation_type) {
            return $urls;
        }

        $svg_url = preg_grep('/images\/core\/emoji/', $urls);

        if (empty($svg_url)) {
            return $urls;
        }

        $svg_url = reset($svg_url);
        $svg_url = apply_filters('emoji_svg_url', $svg_url);
        $urls = array_diff($urls, array($svg_url));

        return $urls;
    }

    /**
     * Disable XML-RPC methods that require authentication
     * @return	void
     */
    public function disable_xmlrpc($scripts) {
        add_filter('xmlrpc_enabled', '__return_false');
    }

    /**
     * Remove JSON API links from header
     * @return void
     * 
     */
    public function remove_json_api(): void {
        remove_action('wp_head', 'rest_output_link_wp_head', 10);
        remove_action('wp_head', 'wp_oembed_add_discovery_links', 10);
        remove_action('rest_api_init', 'wp_oembed_register_route');
        add_filter('embed_oembed_discover', '__return_false');
        remove_filter('oembed_dataparse', 'wp_filter_oembed_result', 10);
        remove_action('wp_head', 'wp_oembed_add_discovery_links');
        remove_action('wp_head', 'wp_oembed_add_host_js');
        remove_action('template_redirect', 'rest_output_link_header', 11, 0);
    }

    /**
     * Disable JSON API
     * @return void
     */
    public function disable_json_api(): void {
        add_filter('json_enabled', '__return_false');
        add_filter('json_jsonp_enabled', '__return_false');
        add_filter('rest_enabled', '__return_false');
        add_filter('rest_jsonp_enabled', '__return_false');
    }

    public function remove_header_junk(): void {
        /**
         * Remove canonical link
         */
        if ($this->settings['removeHeaderJunk']['canonical']) {
            remove_action('embed_head', 'rel_canonical');
            remove_action('wp_head', 'rel_canonical');
            add_filter('wpseo_canonical', '__return_false');
        }
        /**
         * Remove duotone
         */
        if ($this->settings['removeHeaderJunk']['duotone']) {
            remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');
        }

        /**
         * Disable WordPress emojis
         */
        if ($this->settings['removeHeaderJunk']['emojis']) {
            add_action('init', [$this, 'disable_wp_emojis']);
        }

        /**
         * Remove feed links
         */
        if ($this->settings['removeHeaderJunk']['feed-links']) {
            remove_action('wp_head', 'feed_links', 2);
            remove_action('wp_head', 'feed_links_extra', 3);
        }

        /**
         * Disable gravatar
         */
        if ($this->settings['removeHeaderJunk']['gravatar']) {
            add_filter('get_avatar', '__return_false');
            add_filter('option_show_avatars', '__return_false');
        }

        /**
         * Remove jQuery migrate from loading
         */
        if ($this->settings['removeHeaderJunk']['jquery-migrate']) {
            add_action('wp_default_scripts', [$this, 'remove_jquery_migrate']);
        }

        /**
         * Disable JSON API and remove link from header
         */
        if ($this->settings['removeHeaderJunk']['json-api']) {
            add_action('after_setup_theme', [$this, 'remove_json_api']);
            add_action('after_setup_theme', [$this, 'disable_json_api']);
        }

        /**
         * Remove the next and previous post links
         */
        if ($this->settings['removeHeaderJunk']['next-prev-links']) {
            remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0);
            remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
        }

        /**
         * Remove really simple discovery link
         */
        if ($this->settings['removeHeaderJunk']['rsd']) {
            remove_action('wp_head', 'rsd_link');
        }

        /**
         * Remove shortlink url from header
         */
        if ($this->settings['removeHeaderJunk']['shortlink']) {
            remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);
            remove_action('template_redirect', 'wp_shortlink_header', 11, 0);
        }

        /**
         * Remove WooCommerce version number
         */
        if ($this->settings['removeHeaderJunk']['woocommerce-version']) {
            remove_action('wp_head', 'wc_generator_tag');
        }

        /**
         * Remove WordPress version number
         */
        if ($this->settings['removeHeaderJunk']['wp-version']) {
            add_filter('the_generator', [$this, 'remove_wp_version']);
        }

        /**
         * Remove XLM-RPC
         */
        if ($this->settings['removeHeaderJunk']['xlmrpc']) {
            add_action('wp_default_scripts', array($this, 'disable_xmlrpc'), 9999);
        }
    }

    /**
     * Remove block library CSS
     */
    public function remove_block_library_styles() {
        wp_dequeue_style('wp-block-library');
        wp_dequeue_style('wp-block-library-theme');
        wp_dequeue_style('wc-blocks-style');
    }

    /**
     * Remove Global Styles (theme.json)
     * @return void
     */
    public function remove_global_styles(): void {
        wp_dequeue_style('wp-global-styles');
    }

    /**
     * Remove Fluent Forms CSS
     * @return void
     */
    public function remove_fluent_forms_styles(): void {
        if (is_plugin_active('fluentform/fluentform.php')) :
            wp_deregister_style('fluentform-public-default');
            wp_dequeue_style('fluentform-public-default');
            wp_deregister_style('fluent-form-styles');
            wp_dequeue_style('fluent-form-styles');
        endif;
    }

    /**
     * Remove style junk from loading
     * @return void
     */
    public function remove_style_junk(): void {
        if ($this->settings['removeStyleJunk']['block-library']) {
            add_action('wp_enqueue_scripts', [$this, 'remove_block_library_styles'], 100);
        }

        if ($this->settings['removeStyleJunk']['fluent-forms']) {
            add_action('wp_enqueue_scripts', [$this, 'remove_fluent_forms_styles'], 100);
        }

        if ($this->settings['removeStyleJunk']['global-styles']) {
            add_action('wp_enqueue_scripts', [$this, 'remove_global_styles'], 100);
        }
    }

    /**
     * Remove other junk from Wordpress
     * @return void
     */
    public function remove_other_junk(): void {
        if ($this->settings['otherJunk']['unauthorized-rest-api']) {
            add_filter('rest_authentication_errors', [$this, 'disable_rest_api_for_non_logged_in_users']);
        }
        if ($this->settings['otherJunk']['author-pages']) {
            add_action('template_redirect', [$this, 'disable_author_pages']);
        }

        if ($this->settings['otherJunk']['rest-api-user-endpoints']) {
            add_filter('rest_endpoints', [$this, 'disable_rest_api_user_endpoints']);
        }
    }

    /**
     * Initialize class
     * @return void
     */
    public function init(): void {
        $this->remove_header_junk();
        $this->remove_style_junk();
        $this->remove_other_junk();
    }
}
