<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Set theme configuration
 */
return array(
	"settings" => [
		"jquery" => "footer",
		"darkMode" => true,
		"fontawesome" => [
			"all" => true,
			"brands" => false,
			"solid" => false,
			"regular" => false
		],
		"themeColor" => [
			"active" => true,
			"color" => "hsl(343, 100%, 48%)"
		],
		"removeHeaderJunk" => [
			"canonical" => true,
			"duotone" => true,
			"emojis" => true,
			"feed-links" => true,
			"gravatar" => false,
			"jquery-migrate" => true,
			"json-api" => true,
			"next-prev-links" => true,
			"rsd" => true,
			"shortlink" => true,
			"woocommerce-version" => true,
			"wp-version" => true,
			"xlmrpc" => true
		],
		"removeStyleJunk" => [
			"block-library" => true,
			"fluent-forms" => true,
			"global-styles" => false
		],
		"otherJunk" => [
			"rest-api-user-endpoints" => false,
			"unauthorized-rest-api" => false,
			"author-pages" => true
		],
		"removeAdminBarJunk" => [
			"wp-logo" => [
				"remove" => true,
				"children" => [
					"about" => true,
					"wporg" => true,
					"documentation" => true,
					"support-forum" => true,
					"feedback" => true
				]
			],
			"site-name" => [
				"remove" => false,
				"children" => [
					"dashboard" => false,
					"themes" => true,
					"menus" => true,
				]
			],
			"site-editor" => [
				"remove" => true,
				"children" => []
			],
			"customize" => [
				"remove" => false,
				"children" => []
			],
			"comments" => [
				"remove" => true,
				"children" => []
			],
			"new-content" => [
				"remove" => true,
				"children" => []
			],
			"new-post" => [
				"remove" => true,
				"children" => []
			],
			"new-media" => [
				"remove" => true,
				"children" => []
			],
			"new-page" => [
				"remove" => true,
				"children" => []
			],
			"new-user" => [
				"remove" => true,
				"children" => []
			],
			"edit" => [
				"remove" => false,
				"children" => []
			],
			"user-actions" => [ // to the right - next to your avatar image
				"remove" => false,
				"children" => [
					"user-info" => false,
					"edit-profile" => false,
					"logout" => false
				]
			],
			"search" => [
				"remove" => true,
				"children" => []
			],
			"llar-root" => [ // Limit Login Attempts Reloaded Plugin
				"remove" => true,
				"children" => []
			],
		],
		"removeDashboardJunk" => [
			'dashboard_site_health',
			'dashboard_right_now',
			'dashboard_activity',
			'dashboard_quick_press',
			'dashboard_primary',
			'llar_stats_widget', // Limit Login Attempts Reloaded plugin
			'fluentform_stat_widget' // Fluent Forms plugin
		]
	],
	"menus" => [
		[
			"slug" => "header-nav",
			"name" => __("Header Navigation", "kotisivu-block-theme")
		],
		[
			"slug" => "legal-nav",
			"name" => __("Legal Navigation", "kotisivu-block-theme")
		],
		[
			"slug" => "footer-nav",
			"name" => __("Footer Navigation", "kotisivu-block-theme")
		]
	],
	"customImages" => [
		"defaultSizes" => [
			[
				"slug" => "large_size",
				"width" => 1600,
				"height" => 1200
			],
			[
				"slug" => "medium_size",
				"width" => 1024,
				"height" => 768
			]
		],
		"customSizes" => [
			[
				"slug" => "retina",
				"name" => "Retina",
				"width" => 2880,
				"height" => 1800
			],
			[
				"slug" => "huge",
				"name" => "Huge",
				"width" => 1920,
				"height" => 1440
			],
			[
				"slug" => "medium_large",
				"name" => "Medium Large",
				"width" => 1366,
				"height" => 1025
			],
			[
				"slug" => "small",
				"name" => "Small",
				"width" => 768,
				"height" => 576
			],
			[
				"slug" => "extra_small",
				"name" => "Extra Small",
				"width" => 640,
				"height" => 480
			]
		]
	],
	"customPostTypes" => [
		"enabled" => true,
		"postTypes" => [
			'Example'
		]
	],
	"customDatabaseTables" => [
		"enabled" => false,
		"tables" => [
			[
				"name" => "example",
				"schema" => [
					[
						"name" => "id",
						"type" => "int",
						"length" => 20,
						"unsigned" => true,
						"not_null" => true,
						"auto_increment" => true,
						"primary_key" => true
					],
					[
						"name" => "other_table_id",
						"type" => "int",
						"length" => 20,
						"unsigned" => true,
						"foreign_key" => [
							"table" => "other_table",
							"column" => "id",
							"on_delete" => "restrict",
							"on_update" => "cascade"
						]
					],
					[
						"name" => "longtext_example",
						"type" => "longtext",
						"default" => "''"
					],
					[
						"name" => "boolean_example",
						"type" => "boolean"
					],
					[
						"name" => "varchar_example",
						"type" => "varchar",
						"length" => 255,
						"default" => "''"
					],
					[
						"name" => "time_example",
						"type" => "datetime",
						"default" => "'0000-00-00 00:00:00'",
						"not_null" => true
					]
				]
			]
		]
	]
);
