<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Remove jQuery Migrate script
 * Original code from: https://dotlayer.com/what-is-migrate-js-why-and-how-to-remove-jquery-migrate-from-wordpress/
 * @return	void
 */
function remove_jquery_migrate($scripts): void {
    if (!SITE_SETTINGS['performance']['jquery-migrate']) return;

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
 * Disable jQuery
 * @return void 
 */
function move_jquery(): void {
    if (is_user_logged_in()) {
        return;
    }

    switch (SITE_SETTINGS['performance']['jquery']) {
        case 'footer':
            wp_scripts()->add_data('jquery', 'group', 1);
            wp_scripts()->add_data('jquery-core', 'group', 1);
            wp_scripts()->add_data('jquery-migrate', 'group', 1);
            break;
        case 'disable':
            wp_dequeue_script('jquery');
            wp_deregister_script('jquery');
            break;
        default:
            break;
    }
}

/**
 * Remove WP emojis
 * @return void
 */
function remove_wp_emojis() {
    if (!SITE_SETTINGS['performance']['emojis']) return;

    /**
     * Disable WP emojis
     */
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('comment_text_rss', 'wp_staticize_emoji');

    /**
     * Disable WP emojis from TinyMCE
     */
    add_filter('tiny_mce_plugins', 'Kotisivu\BlockTheme\Utils::disable_emojis_tinymce');

    /**
     * Disable WP emojis DNS prefetch
     */
    add_filter('emoji_svg_url', '__return_false');
    add_filter('wp_resource_hints', 'Kotisivu\BlockTheme\Utils::disable_emojis_remove_dns_prefetch', 1, 2);
}

/**
 * Remove duotone filters
 * @return void
 */
function remove_duotone_filters() {
    if (SITE_SETTINGS['performance']['duotone']) {
        remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');
    }
}
