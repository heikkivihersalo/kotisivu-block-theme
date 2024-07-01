<?php
/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme;

defined( 'ABSPATH' ) || die();

/**
 * Load bootstrap file
 */
require_once __DIR__ . '/bootstrap.php';

/**
 * Get required WordPress dependencies
 */
require_once ABSPATH . 'wp-admin/includes/class-wp-filesystem-base.php';
require_once ABSPATH . 'wp-admin/includes/class-wp-filesystem-direct.php';

/**
 * Set theme name, textdomain, version, path and uri
 */
$theme = wp_get_theme();

define( 'SITE_NAME', $theme->get( 'Name' ) );
define( 'SITE_TEXTDOMAIN', $theme->get( 'TextDomain' ) );
define( 'SITE_VERSION', $theme->get( 'Version' ) );
define( 'SITE_PATH', get_template_directory() );
define( 'SITE_URI', get_template_directory_uri() );

/**
 * Theme settings
 */
// add_action('after_setup_theme', function () {
define(
	'SITE_SETTINGS',
	array(
		/**
		 * Enable dark mode for the site
		 */
		'dark_mode'       => true,

		/**
		 * Set what FontAwesome icons to be loaded
		 */
		'icons'           => array(
			'all'     => true,
			'brands'  => false,
			'solid'   => false,
			'regular' => false,
		),

		/**
		 * Set the theme color
		 * - Will add a meta tag to the header with the color
		 */
		'theme_color'     => 'hsl(0, 0%, 20%)',

		/**
		 * Set behaviour for default loading of header and api junk
		 * - There is a lot of "junk" that can be removed from the header
		 * - HINT! This also acts as a security measure. Less information about your site is better
		 */
		'security'        => array(
			'author-pages'            => true,
			'version'                 => true,
			'rest-api-user-endpoints' => false,
			'unauthorized-rest-api'   => false,
			'json-api'                => true,
			'xmlrpc'                  => true,
		),
		'performance'     => array(
			'duotone'        => true,
			'emojis'         => true,
			'jquery'         => 'footer', // Can be set to 'normal', 'footer' or 'disable'
			'jquery-migrate' => true,
		),
		'junk'            => array(
			'canonical'       => true,
			'feed-links'      => true,
			'gravatar'        => false,
			'next-prev-links' => true,
			'rsd'             => true,
			'shortlink'       => true,
		),

		/**
		 * Set behaviour for default style enqueues
		 * - This is a list of default styles that are loaded by WordPress
		 * - I prefer Fluent Forms for forms, so it is disabled by default also
		 */
		'disabled_styles' => array(
			'block-library' => true,
			'fluent-forms'  => true,
			'global-styles' => false,
		),

		/**
		 * Set items that you want to remove from the admin menu
		 * - There are a lot unnecessary options for most users
		 * - If you need something that is removed, you can always add it back
		 */
		'admin'           => array(
			'bar'       => array(
				'wp-logo'      => array(
					'remove'   => true,
					'children' => array(
						'about'         => true,
						'wporg'         => true,
						'documentation' => true,
						'support-forum' => true,
						'feedback'      => true,
					),
				),
				'site-name'    => array(
					'remove'   => false,
					'children' => array(
						'dashboard' => false,
						'themes'    => true,
						'menus'     => true,
					),
				),
				'site-editor'  => array(
					'remove'   => true,
					'children' => array(),
				),
				'customize'    => array(
					'remove'   => false,
					'children' => array(),
				),
				'comments'     => array(
					'remove'   => true,
					'children' => array(),
				),
				'new-content'  => array(
					'remove'   => true,
					'children' => array(),
				),
				'new-post'     => array(
					'remove'   => true,
					'children' => array(),
				),
				'new-media'    => array(
					'remove'   => true,
					'children' => array(),
				),
				'new-page'     => array(
					'remove'   => true,
					'children' => array(),
				),
				'new-user'     => array(
					'remove'   => true,
					'children' => array(),
				),
				'edit'         => array(
					'remove'   => false,
					'children' => array(),
				),
				'user-actions' => array( // to the right - next to your avatar image
					'remove'   => false,
					'children' => array(
						'user-info'    => false,
						'edit-profile' => false,
						'logout'       => false,
					),
				),
				'search'       => array(
					'remove'   => true,
					'children' => array(),
				),
				'llar-root'    => array( // Limit Login Attempts Reloaded Plugin
					'remove'   => true,
					'children' => array(),
				),
			),
			'dashboard' => array(
				'dashboard_site_health',
				'dashboard_right_now',
				'dashboard_activity',
				'dashboard_quick_press',
				'dashboard_primary',
				'llar_stats_widget', // Limit Login Attempts Reloaded plugin
				'fluentform_stat_widget', // Fluent Forms plugin
			),
		),

		/**
		 * Set site menu locations and names
		 */
		'menu_locations'  => array(
			array(
				'slug' => 'header-nav',
				'name' => __( 'Header Navigation', 'kotisivu-block-theme' ),
			),
			array(
				'slug' => 'legal-nav',
				'name' => __( 'Legal Navigation', 'kotisivu-block-theme' ),
			),
			array(
				'slug' => 'footer-nav',
				'name' => __( 'Footer Navigation', 'kotisivu-block-theme' ),
			),
		),

		/**
		 * Set custom image sizes
		 * - This is a list of custom image sizes that are used in the theme
		 * - You can add as many as you want but remember that each size will be generated for each image
		 * - For most sites the default sizes set here are enough
		 */
		'image_sizes'     => array(
			'default' => array(
				array(
					'slug'   => 'large_size',
					'width'  => 1600,
					'height' => 1200,
				),
				array(
					'slug'   => 'medium_size',
					'width'  => 1024,
					'height' => 768,
				),
			),
			'custom'  => array(
				array(
					'slug'   => 'retina',
					'name'   => 'Retina',
					'width'  => 2880,
					'height' => 1800,
				),
				array(
					'slug'   => 'huge',
					'name'   => 'Huge',
					'width'  => 1920,
					'height' => 1440,
				),
				array(
					'slug'   => 'medium_large',
					'name'   => 'Medium Large',
					'width'  => 1366,
					'height' => 1025,
				),
				array(
					'slug'   => 'small',
					'name'   => 'Small',
					'width'  => 768,
					'height' => 576,
				),
				array(
					'slug'   => 'extra_small',
					'name'   => 'Extra Small',
					'width'  => 640,
					'height' => 480,
				),
			),
		),
		/**
		 * Set custom post types
		 * - Remember to add the post type file to the inc/post-types folder!
		 */
		'post_types'      => array(
			'Example',
		),

		/**
		 * Set custom database tables (EXPERIMENTAL)
		 */
		'database_tables' => array(
			'enabled' => true,
			'tables'  => array(
				array(
					'name'   => 'example',
					'schema' => array(
						array(
							'name'           => 'id',
							'type'           => 'int',
							'length'         => 20,
							'unsigned'       => true,
							'not_null'       => true,
							'auto_increment' => true,
							'primary_key'    => true,
						),
						array(
							'name'    => 'longtext_example',
							'type'    => 'longtext',
							'default' => "''",
						),
						array(
							'name' => 'boolean_example',
							'type' => 'boolean',
						),
						array(
							'name'    => 'varchar_example',
							'type'    => 'varchar',
							'length'  => 255,
							'default' => "''",
						),
						array(
							'name'     => 'time_example',
							'type'     => 'datetime',
							'default'  => "'0000-00-00 00:00:00'",
							'not_null' => true,
						),
					),
				),
			),
		),

		/**
		 * Enable custom API
		 */
		'api'             => false,
	)
);

/**
 * Require theme files
 */
require_once __DIR__ . '/inc/utils.php';
require_once __DIR__ . '/inc/hooks.php';
require_once __DIR__ . '/inc/theme.php';
require_once __DIR__ . '/inc/blocks.php';
