<?php

namespace Kotisivu\BlockTheme;

use PostTypes;

defined('ABSPATH') or die();

/**
 * Create new custom post type
 * 
 * @package Kotisivu\BlockTheme 
 */

class CustomPostType {
    /**
     * Custom post types
     * @var array
     */
    private $post_types;

    /**
     * Constructor
     * @return void 
     */
    public function __construct($post_types) {
        /**
         * Require dependencies
         */
        foreach (glob(dirname(__DIR__) . '/lib/post-types/src/*.php') as $class)
            require_once $class;

        /**
         * Load class files
         */
        $this->load_classes();

        /**
         * Set attributes
         */
        $this->post_types = $post_types ?? [];
    }

    /**
     * Load classes from custom-post-type-folder
     * @return void 
     */
    private function load_classes(): void {
        foreach (glob(dirname(__FILE__) . '/post-types/*.php') as $class)
            require_once $class;
    }

    /**
     * Register post type
     * @param array $post_type_config 
     * @return void 
     */
    private function register_post_type(array $post_type_config): void {
        $post_type = new PostTypes\PostType(
            array(
                'name' => $post_type_config['names']['name'],
                'singular' => __($post_type_config['names']['singular'], 'kotisivu-block-theme'),
                'plural' => __($post_type_config['names']['plural'], 'kotisivu-block-theme'),
                'slug' => $post_type_config['names']['slug']
            ),
            $post_type_config['options']
        );

        /* Translate labels */
        $post_type->labels(array(
            'name' => __($post_type_config['labels']['name'], 'kotisivu-block-theme'),
            'singular_name' => __($post_type_config['labels']['singular_name'], 'kotisivu-block-theme'),
            'menu_name' => __($post_type_config['labels']['menu_name'], 'kotisivu-block-theme'),
            'all_items' => __($post_type_config['labels']['all_items'], 'kotisivu-block-theme'),
            'add_new' => __($post_type_config['labels']['add_new'], 'kotisivu-block-theme'),
            'add_new_item' => __($post_type_config['labels']['add_new_item'], 'kotisivu-block-theme'),
            'edit_item' => __($post_type_config['labels']['edit_item'], 'kotisivu-block-theme'),
            'new_item' => __($post_type_config['labels']['new_item'], 'kotisivu-block-theme'),
            'view_item' => __($post_type_config['labels']['view_item'], 'kotisivu-block-theme'),
            'search_items' => __($post_type_config['labels']['search_items'], 'kotisivu-block-theme'),
            'not_found' => __($post_type_config['labels']['not_found'], 'kotisivu-block-theme'),
            'not_found_in_trash' => __($post_type_config['labels']['not_found_in_trash'], 'kotisivu-block-theme'),
            'parent_item_colon' => __($post_type_config['labels']['parent_item_colon'], 'kotisivu-block-theme'),
        ));

        $post_type->icon($post_type_config['icon']);
        $post_type->register();

        /* Add Metaboxes */
        if ($post_type_config['metaboxes']['active']) :
            $this->register_metaboxes($post_type_config['metaboxes']);
        endif;

        if (isset($post_type_config['slug_translations'])) :
            /**
             * Add rewrite rules for slug translations
             * If any problems occur, flush rewrite rules from settings
             */
            foreach ($post_type_config['slug_translations'] as $lang => $slug) :
                $regex = '^' . $slug . '/([^/]*)/?';
                $url = 'index.php?post_type=' . $post_type_config['names']['slug'] . '&name=$matches[1]';
                add_rewrite_rule($regex, $url, 'top');
            endforeach;
        endif;
    }

    /**
     * Register metaboxes for a post type
     * @param array $metaboxes 
     * @return void 
     */
    private function register_metaboxes(array $metaboxes): void {
        $metabox = new PostTypes\Metabox($metaboxes['options'], $metaboxes['markup']);
        $metabox->register();
    }

    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        foreach ($this->post_types as $post_type) :
            $this->register_post_type($post_type);

            /**
             * If Polylang is enabled, add filter to change post type link
             * to match the current language slug
             */
            if (function_exists('pll_get_post_language')) :
                add_filter('post_type_link', function ($post_link, $post) use ($post_type) {
                    $urls = $post_type['slug_translations'];
                    $post_type = $post_type['names']['slug'];

                    if (get_post_type($post) == $post_type) {
                        $post_link = str_replace($post_type, urlencode($urls[pll_get_post_language($post->ID)]), $post_link);
                    }

                    return $post_link;
                }, 10, 2);
            endif;
        endforeach;
    }
}
