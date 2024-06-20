<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Create new custom post type
 * 
 * @package Kotisivu\BlockTheme 
 */
class Example extends PostType {
    /**
     * Register post type
     * @return void
     */
    public function register() {
        /**
         * Post type names
         * Following are accepted keys:
         * - name (string) is the post type name. Must be singular, lowercase and in underscores
         * - singular (string) is the singular label for the post type. e.g 'Book', 'Person'
         * - plural (string) is the plural label for the post type. e.g 'Books', 'People'
         * - slug (string) is the post type slug used in the permalinks. This is generated from file name.
         */
        $names = [
            'name' => 'example',
            'singular' => __('Example', 'kotisivu-block-theme'),
            'plural' => __('Examples', 'kotisivu-block-theme'),
            'slug' => $this->slug
        ];

        /**
         * Post type options
         * The options match the arguments passed to the register_post_type() WordPress function. 
         * All available options are on the WordPress Codex.
         * @see https://developer.wordpress.org/reference/functions/register_post_type/#parameters
         */
        $options = [
            'public' => true,
            'show_in_rest' => true,
            'has_archive' => true,
            'supports' => ['title', 'editor', 'thumbnail'],
            'taxonomies' => [],
            'rewrite' => [
                'slug' => (!empty(get_option('kotisivu_block_theme_' . $this->slug))) ? get_option('kotisivu_block_theme_' . $this->slug) : $this->slug,
                'with_front' => true,
            ],
        ];

        /**
         * Post type labels
         * The labels match the arguments passed to the register_post_type() WordPress function.
         * All available labels are on the WordPress Codex.
         * @see https://developer.wordpress.org/reference/functions/register_post_type/#labels
         */
        $labels = array(
            'name'               => _x('Example', 'post type general name', 'kotisivu-block-theme'),
            'singular_name'      => _x('Example', 'post type singular name', 'kotisivu-block-theme'),
            'menu_name'          => _x('Example', 'admin menu', 'kotisivu-block-theme'),
            'name_admin_bar'     => _x('Example', 'add new on admin bar', 'kotisivu-block-theme'),
            'add_new'            => _x('Add New', 'example', 'kotisivu-block-theme'),
            'add_new_item'       => __('Add New Example', 'kotisivu-block-theme'),
            'new_item'           => __('New Example', 'kotisivu-block-theme'),
            'edit_item'          => __('Edit Example', 'kotisivu-block-theme'),
            'view_item'          => __('View Example', 'kotisivu-block-theme'),
            'all_items'          => __('All Examples', 'kotisivu-block-theme'),
            'search_items'       => __('Search Examples', 'kotisivu-block-theme'),
            'parent_item_colon'  => __('Parent Examples:', 'kotisivu-block-theme'),
            'not_found'          => __('No examples found.', 'kotisivu-block-theme'),
            'not_found_in_trash' => __('No examples found in Trash.', 'kotisivu-block-theme')
        );

        /**
         * Post type icon
         * The icon is a dashicon class name.
         * @see https://developer.wordpress.org/resource/dashicons/
         */
        $icon = 'dashicons-pressthis';

        /**
         * Post type metaboxes
         * This is a custom wrapper for the WordPress add_meta_box() function.
         * Available input types are:
         * - text
         * - textarea
         * - url
         * - number
         * - checkbox
         * - checkbox-group
         * - date
         * - image
         * - select
         * - rich-text
         * - radio-group
         */
        $metaboxes = array(
            "active" => true,
            "options" => [
                "id" => "option",
                "title" => "Example Metabox",
                "screen" => [$this->slug]
            ],
            "markup" => [
                [
                    "id" => "text_input_1",
                    "label" => __("Text Input 1", "kotisivu-block-theme"),
                    "type" => "text"
                ],
                [
                    "id" => "textarea_input_1",
                    "label" => __("TextArea Input", "kotisivu-block-theme"),
                    "type" => "textarea"
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
                    "id" => "checkbox_group_input",
                    "label" => __("Checkbox Group Input", "kotisivu-block-theme"),
                    "type" => "checkbox-group",
                    "options" => [
                        ["value" => "option1", "label" => "Option 1"],
                        ["value" => "option2", "label" => "Option 2"],
                        ["value" => "option3", "label" => "Option 3"]
                    ]
                ],
                [
                    "id" => "date_input",
                    "label" => __("Date Input", "kotisivu-block-theme"),
                    "type" => "date"
                ],
                [
                    "id" => "image_input",
                    "label" => __("Image Input", "kotisivu-block-theme"),
                    "type" => "image"
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
                ],
                [
                    "id" => "rich_text_input",
                    "label" => __("Rich Text Input", "kotisivu-block-theme"),
                    "type" => "rich-text"
                ],
                [
                    "id" => "radio_group_input",
                    "label" => __("Radio Group Input", "kotisivu-block-theme"),
                    "type" => "radio-group",
                    "options" => [
                        ["value" => "option1", "label" => "Option 1"],
                        ["value" => "option2", "label" => "Option 2"],
                        ["value" => "option3", "label" => "Option 3"]
                    ]
                ]
            ]
        );

        /**
         * Additional post type options e.g. taxonomies
         */
        $additional = [
            'taxonomies' => []
        ];

        /**
         * Register post type
         */
        $this->register_post_type($names, $options, $labels, $icon, $metaboxes, $additional);
    }
}
