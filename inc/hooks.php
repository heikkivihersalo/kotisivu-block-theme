<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * General hooks
 * 
 */
require_once SITE_PATH . '/inc/hooks/general.php';
add_filter('upload_mimes', __NAMESPACE__ . '\allow_svg_uploads');
add_filter('excerpt_length', __NAMESPACE__ . '\limit_excerpt_length', 999);
add_filter('http_request_args', __NAMESPACE__ . '\disable_theme_update', 10, 2);
// add_filter('styles_inline_size_limit', __NAMESPACE__ . '\set_inline_size_limit');

if (is_admin()) {
    add_action("admin_bar_menu", __NAMESPACE__ . '\remove_admin_bar_items', 999);
    add_action('admin_init', __NAMESPACE__ . '\set_default_dashboard_metaboxes');
}

/**
 * Enqueue files to theme and admin
 * 
 */
require_once SITE_PATH . '/inc/hooks/scripts-styles.php';
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_splide');
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_theme');
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_dark_mode');
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_redux_store');
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\remove_scripts_and_styles');

/* Inline color meta */
add_action('wp_head', __NAMESPACE__ . '\inline_theme_color', 0);

/* Add inline CSS */
add_action('wp_head', __NAMESPACE__ . '\inline_sanitize_css', 0);
add_action('wp_head', __NAMESPACE__ . '\inline_custom_css', 11);

/* Enable dark mode */
add_action('wp_head', __NAMESPACE__ . '\inline_dark_mode', 0);

/* Enable Tag Manager */
add_action('wp_head', __NAMESPACE__ . '\inline_tag_manager', 0);

/* Enable Font Awesome */
add_action('wp_head', __NAMESPACE__ . '\inline_fontawesome', 11);

/* Admin only scripts and styles */
if (is_admin()) {
    add_action('admin_enqueue_scripts', __NAMESPACE__ . '\admin_enqueue_custom_post_type');
    add_action('admin_enqueue_scripts', __NAMESPACE__ . '\admin_enqueue_admin');
    add_action('admin_enqueue_scripts', __NAMESPACE__ . '\admin_enqueue_fontawesome');
}

/**
 * Handle image sizes
 * 
 */
require_once SITE_PATH . '/inc/hooks/images.php';
add_filter('image_size_names_choose', __NAMESPACE__ . '\add_custom_image_sizes');
add_action('after_setup_theme', __NAMESPACE__ . '\modify_default_image_sizes');

/**
 * Add and remove theme support
 * 
 */
require_once SITE_PATH . '/inc/hooks/theme-support.php';
add_action('after_setup_theme', __NAMESPACE__ . '\modify_theme_support');
add_action('after_setup_theme', __NAMESPACE__ . '\add_editor_styles');
add_action('after_setup_theme', __NAMESPACE__ . '\register_navigation_menus');
add_action('customize_register', '__return_true'); // Enable customizer

/**
 * Handle security improvements
 * 
 */
require_once SITE_PATH . '/inc/hooks/security.php';
add_action('init', __NAMESPACE__ . '\remove_wp_version');
add_action('wp_default_scripts', __NAMESPACE__ . '\disable_xmlrpc', 9999);
add_action('after_setup_theme', __NAMESPACE__ . '\remove_json_api');
add_filter('rest_authentication_errors', __NAMESPACE__ . '\disable_rest_api_for_non_logged_in_users');
add_action('template_redirect', __NAMESPACE__ . '\disable_author_pages');
add_filter('rest_endpoints', __NAMESPACE__ . '\disable_rest_api_user_endpoints');

/**
 * Handle performance improvements
 * 
 */
require_once SITE_PATH . '/inc/hooks/performance.php';
add_action('init', __NAMESPACE__ . '\remove_wp_emojis');
add_filter('wp_enqueue_scripts', __NAMESPACE__ . '\move_jquery');
add_action('wp_default_scripts', __NAMESPACE__ . '\remove_jquery_migrate');
add_action('init', __NAMESPACE__ . '\remove_duotone_filters');

/**
 * Handle WP junk
 * 
 */
require_once SITE_PATH . '/inc/hooks/junk.php';
add_action('init', __NAMESPACE__ . '\remove_canonical_links');
add_action('init', __NAMESPACE__ . '\remove_feed_links');
add_action('init', __NAMESPACE__ . '\remove_gravatar');
add_action('init', __NAMESPACE__ . '\remove_next_prev_links');
add_action('init', __NAMESPACE__ . '\remove_rsd_link');
add_action('init', __NAMESPACE__ . '\remove_shortlink');

/**
 * Handle localization
 * 
 */
require_once SITE_PATH . '/inc/hooks/localization.php';
add_action('after_setup_theme', __NAMESPACE__ . '\load_translations');

/**
 * Handle REST API
 * 
 */
require_once SITE_PATH . '/inc/hooks/rest-api.php';
add_action('rest_api_init', __NAMESPACE__ . '\register_rest_images_for_posts');
add_action('rest_api_init', __NAMESPACE__ . '\register_rest_images_for_media');

/**
 * Handle custom AJAX requests
 * 
 */
require_once SITE_PATH . '/inc/hooks/ajax.php';
add_action('wp_ajax_nopriv_get_next_page', __NAMESPACE__ . '\get_next_page');
add_action('wp_ajax_get_next_page', __NAMESPACE__ . '\get_next_page');
