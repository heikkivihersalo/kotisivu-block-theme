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
		]
	],
	"menus" => [
		[
			"slug" => "primary-navigation",
			"name" => __("Header Navigation", "kotisivu-block-theme")
		],
		[
			"slug" => "secondary-navigation",
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
		"enabled" => false,
		"postTypes" => [
			[
				"names" => [
					"name" => "Example Post Type",
					"singular" => "Example",
					"plural" => "Examples",
					"slug" => "example"
				],
				"options" => [
					"hierarchical" => false,
					"has_archive" => false,
					"show_in_rest" => true,
					"supports" => ["title", "editor", "thumbnail"]
				],
				"labels" => [
					"name" => __("Example Post Type", "kotisivu-block-theme"),
					"singular_name" => __("Example", "kotisivu-block-theme"),
					"menu_name" => __("Examples", "kotisivu-block-theme"),
					"all_items" => __("Examples", "kotisivu-block-theme"),
					"add_new" => __("Add new", "kotisivu-block-theme"),
					"add_new_item" => __("Add new example", "kotisivu-block-theme"),
					"edit_item" => __("Edit example", "kotisivu-block-theme"),
					"new_item" => __("New example", "kotisivu-block-theme"),
					"view_item" => __("View example", "kotisivu-block-theme"),
					"search_items" => __("Search examples", "kotisivu-block-theme"),
					"not_found" => __("No examples found", "kotisivu-block-theme"),
					"not_found_in_trash" => __("No examples found in trash", "kotisivu-block-theme"),
					"parent_item_colon" => __("Parent example", "kotisivu-block-theme")
				],
				"icon" => "dashicons-star-filled",
				"metaboxes" => [
					"active" => false,
					"options" => [
						"id" => "option",
						"title" => "title",
						"screen" => ["example"]
					],
					"markup" => [
						[
							"id" => "text_input",
							"label" => __("Text Input", "kotisivu-block-theme"),
							"type" => "text"
						],
						[
							"id" => "url_input",
							"label" => __("URL Input", "kotisivu-block-theme"),
							"type" => "url"
						],
						[
							"id" => "number_input",
							"label" => __("Number Input", "kotisivu-block-theme"),
							"type" => "number"
						],
						[
							"id" => "checkbox_input",
							"label" => __("Checkbox Input", "kotisivu-block-theme"),
							"type" => "checkbox"
						],
						[
							"id" => "checkbox-group_input",
							"label" => __("Checkbox Group Input", "kotisivu-block-theme"),
							"type" => "checkbox-group",
							"options" => ["option1", "option2", "option3"]
						],
						[
							"id" => "select_input",
							"label" => __("Select Input", "kotisivu-block-theme"),
							"type" => "select",
							"options" => [
								["value" => "option1", "label" => "Option 1"],
								["value" => "option2", "label" => "Option 2"],
								["value" => "option3", "label" => "Option 3"]
							]
						]
					]
				]
			]
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
