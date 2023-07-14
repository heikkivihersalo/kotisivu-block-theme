<?php

namespace Kotisivu\BlockTheme;

use PostTypes;

defined('ABSPATH') or die();

/**
 * Create new custom post type
 * 
 * Inherits following attributes
 * * name
 * * version
 * * textdomain
 * * options
 * * config
 * * path
 * * uri
 * * parent_path
 * * parent_uri
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
     * Theme config file
     * @var array
     */
    private $config;

    /**
     * Constructor
     * @return void 
     */
    public function __construct($config) {
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
        $this->config = $config;
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
        /* Guardclauses */
        if (!$post_type_config['active']) return;

        $post_type = new PostTypes\PostType($post_type_config['names'], $post_type_config['options']);
        $post_type->icon($post_type_config['icon']);
        $post_type->register();

        /* Add Metaboxes */
        if ($post_type_config['metaboxes']['active']) :
            $this->register_metaboxes($post_type_config['metaboxes']);
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

    public function test_filter($labels) {
        return array(
            'name' => __($labels['name'], 'kotisivu-block-theme'),
            'singular_name' => __($labels['singular_name'], 'kotisivu-block-theme'),
            'menu_name' => __($labels['menu_name'], 'kotisivu-block-theme'),
            'all_items' => __($labels['all_items'], 'kotisivu-block-theme'),
            'add_new' => __($labels['add_new'], 'kotisivu-block-theme'),
            'add_new_item' => __($labels['add_new_item'], 'kotisivu-block-theme'),
            'edit_item' => __($labels['edit_item'], 'kotisivu-block-theme'),
            'new_item' => __($labels['new_item'], 'kotisivu-block-theme'),
            'view_item' => __($labels['view_item'], 'kotisivu-block-theme'),
            'search_items' => __($labels['search_items'], 'kotisivu-block-theme'),
            'not_found' => __($labels['not_found'], 'kotisivu-block-theme'),
            'not_found_in_trash' => __($labels['not_found_in_trash'], 'kotisivu-block-theme'),
            'parent_item_colon' => __($labels['parent_item_colon'], 'kotisivu-block-theme'),
        );
    }

    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        $this->post_types = $this->config["customPostTypes"] ?? [];

        foreach ($this->post_types as $post_type) :
            add_filter('createLabels', [$this, 'test_filter']);
            $this->register_post_type($post_type);
        endforeach;
    }
}
