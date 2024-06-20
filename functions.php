<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Load bootstrap file
 */
require_once(dirname(__FILE__) . '/bootstrap.php');

/**
 * Set theme name, textdomain, version, path and uri
 */
$theme = wp_get_theme();

define('SITE_NAME', $theme->get('Name'));
define('SITE_TEXTDOMAIN', $theme->get('TextDomain'));
define('SITE_VERSION', $theme->get('Version'));
define('SITE_PATH', get_template_directory());
define('SITE_URI', get_template_directory_uri());

/**
 * Theme settings
 */
// add_action('after_setup_theme', function () {
define('SITE_SETTINGS', [
    /**
     * Enable dark mode for the site
     */
    'dark_mode' => true,

    /**
     * Set what FontAwesome icons to be loaded
     */
    'icons' => [
        'all' => true,
        'brands' => false,
        'solid' => false,
        'regular' => false
    ],

    /**
     * Set the theme color
     * - Will add a meta tag to the header with the color
     */
    'theme_color' => 'hsl(0, 0%, 20%)',

    /**
     * Set behaviour for default loading of header and api junk
     * - There is a lot of "junk" that can be removed from the header
     * - HINT! This also acts as a security measure. Less information about your site is better
     */
    'security' => [
        'author-pages' => true,
        'version' => true,
        'rest-api-user-endpoints' => false,
        'unauthorized-rest-api' => false,
        'json-api' => true,
        'xmlrpc' => true
    ],
    'performance' => [
        'duotone' => true,
        'emojis' => true,
        'jquery' => 'footer', // Can be set to 'normal', 'footer' or 'disable'
        'jquery-migrate' => true,
    ],
    'junk' => [
        'canonical' => true,
        'feed-links' => true,
        'gravatar' => false,
        'next-prev-links' => true,
        'rsd' => true,
        'shortlink' => true
    ],

    /**
     * Set behaviour for default style enqueues
     * - This is a list of default styles that are loaded by WordPress
     * - I prefer Fluent Forms for forms, so it is disabled by default also
     */
    'disabled_styles' => [
        'block-library' => true,
        'fluent-forms' => true,
        'global-styles' => false
    ],

    /**
     * Set items that you want to remove from the admin menu
     * - There are a lot unnecessary options for most users
     * - If you need something that is removed, you can always add it back
     */
    'admin' => [
        'bar' => [
            'wp-logo' => [
                'remove' => true,
                'children' => [
                    'about' => true,
                    'wporg' => true,
                    'documentation' => true,
                    'support-forum' => true,
                    'feedback' => true
                ]
            ],
            'site-name' => [
                'remove' => false,
                'children' => [
                    'dashboard' => false,
                    'themes' => true,
                    'menus' => true,
                ]
            ],
            'site-editor' => [
                'remove' => true,
                'children' => []
            ],
            'customize' => [
                'remove' => false,
                'children' => []
            ],
            'comments' => [
                'remove' => true,
                'children' => []
            ],
            'new-content' => [
                'remove' => true,
                'children' => []
            ],
            'new-post' => [
                'remove' => true,
                'children' => []
            ],
            'new-media' => [
                'remove' => true,
                'children' => []
            ],
            'new-page' => [
                'remove' => true,
                'children' => []
            ],
            'new-user' => [
                'remove' => true,
                'children' => []
            ],
            'edit' => [
                'remove' => false,
                'children' => []
            ],
            'user-actions' => [ // to the right - next to your avatar image
                'remove' => false,
                'children' => [
                    'user-info' => false,
                    'edit-profile' => false,
                    'logout' => false
                ]
            ],
            'search' => [
                'remove' => true,
                'children' => []
            ],
            'llar-root' => [ // Limit Login Attempts Reloaded Plugin
                'remove' => true,
                'children' => []
            ],
        ],
        'dashboard' => [
            'dashboard_site_health',
            'dashboard_right_now',
            'dashboard_activity',
            'dashboard_quick_press',
            'dashboard_primary',
            'llar_stats_widget', // Limit Login Attempts Reloaded plugin
            'fluentform_stat_widget' // Fluent Forms plugin
        ],
    ],

    /**
     * Set site menu locations and names
     */
    'menu_locations' => [
        [
            'slug' => 'header-nav',
            'name' => __("Header Navigation", "kotisivu-block-theme")
        ],
        [
            'slug' => 'legal-nav',
            'name' => __("Legal Navigation", "kotisivu-block-theme")
        ],
        [
            'slug' => 'footer-nav',
            'name' => __("Footer Navigation", "kotisivu-block-theme")
        ]
    ],

    /**
     * Set custom image sizes
     * - This is a list of custom image sizes that are used in the theme
     * - You can add as many as you want but remember that each size will be generated for each image
     * - For most sites the default sizes set here are enough
     */
    'image_sizes' => [
        'default' => [
            [
                'slug' => 'large_size',
                'width' => 1600,
                'height' => 1200
            ],
            [
                'slug' => 'medium_size',
                'width' => 1024,
                'height' => 768
            ]
        ],
        'custom' => [
            [
                'slug' => 'retina',
                'name' => 'Retina',
                'width' => 2880,
                'height' => 1800
            ],
            [
                'slug' => 'huge',
                'name' => 'Huge',
                'width' => 1920,
                'height' => 1440
            ],
            [
                'slug' => 'medium_large',
                'name' => 'Medium Large',
                'width' => 1366,
                'height' => 1025
            ],
            [
                'slug' => 'small',
                'name' => 'Small',
                'width' => 768,
                'height' => 576
            ],
            [
                'slug' => 'extra_small',
                'name' => 'Extra Small',
                'width' => 640,
                'height' => 480
            ]
        ]
    ],
    /**
     * Set custom post types
     * - Remember to add the post type file to the inc/post-types folder!
     */
    'post_types' => [
        'Example'
    ],

    /**
     * Set custom database tables (EXPERIMENTAL)
     */
    'database_tables' => [
        'enabled' => false,
        'tables' => [
            [
                'name' => 'example',
                'schema' => [
                    [
                        'name' => 'id',
                        'type' => 'int',
                        'length' => 20,
                        'unsigned' => true,
                        'not_null' => true,
                        'auto_increment' => true,
                        'primary_key' => true
                    ],
                    [
                        'name' => 'other_table_id',
                        'type' => 'int',
                        'length' => 20,
                        'unsigned' => true,
                        'foreign_key' => [
                            'table' => 'other_table',
                            'column' => 'id',
                            'on_delete' => 'restrict',
                            'on_update' => 'cascade'
                        ]
                    ],
                    [
                        'name' => 'longtext_example',
                        'type' => 'longtext',
                        'default' => "''"
                    ],
                    [
                        'name' => 'boolean_example',
                        'type' => 'boolean'
                    ],
                    [
                        'name' => 'varchar_example',
                        'type' => 'varchar',
                        'length' => 255,
                        'default' => "''"
                    ],
                    [
                        'name' => 'time_example',
                        'type' => 'datetime',
                        'default' => "'0000-00-00 00:00:00'",
                        'not_null' => true
                    ]
                ]
            ]
        ]
    ],

    /**
     * Enable custom API
     */
    'api' => false
]);

/**
 * Require theme files
 */
require_once(dirname(__FILE__) . '/inc/utils.php');
require_once(dirname(__FILE__) . '/inc/hooks.php');
require_once(dirname(__FILE__) . '/inc/theme.php');

/**
 * Require block files
 */
require_once(dirname(__FILE__) . '/inc/blocks.php');
$blocks = new Blocks();
$blocks->init();
