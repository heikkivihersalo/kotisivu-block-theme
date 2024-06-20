<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Remove canonical links
 * @return void
 */
function remove_canonical_links(): void {
    if (SITE_SETTINGS['junk']['canonical']) {
        remove_action('embed_head', 'rel_canonical');
        remove_action('wp_head', 'rel_canonical');
        add_filter('wpseo_canonical', '__return_false');
    }
}

/**
 * Remove feed links
 * @return void
 */
function remove_feed_links(): void {
    if (SITE_SETTINGS['junk']['feed-links']) {
        remove_action('wp_head', 'feed_links', 2);
        remove_action('wp_head', 'feed_links_extra', 3);
    }
}

/**
 * Remove Gravatar
 * @return void
 */
function remove_gravatar(): void {
    if (SITE_SETTINGS['junk']['gravatar']) {
        add_filter('get_avatar', '__return_false');
        add_filter('option_show_avatars', '__return_false');
    }
}

/**
 * Remove next and previous links
 * @return void
 */
function remove_next_prev_links(): void {
    if (SITE_SETTINGS['junk']['next-prev-links']) {
        remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0);
        remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
    }
}

/**
 * Remove RSD link
 * @return void
 */
function remove_rsd_link(): void {
    if (SITE_SETTINGS['junk']['rsd']) {
        remove_action('wp_head', 'rsd_link');
    }
}

/**
 * Remove shortlink
 * @return void
 */
function remove_shortlink(): void {
    if (SITE_SETTINGS['junk']['shortlink']) {
        remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);
        remove_action('template_redirect', 'wp_shortlink_header', 11, 0);
    }
}
