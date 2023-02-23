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
class CustomPostType extends Theme {
    public function __construct() {
        parent::__construct();
    }

    /**
     * Load classes from custom-post-type-folder
     * @return void 
     */
    private function load_classes(): void {
        foreach (glob(dirname(__FILE__) . '/custom-post-type/*.php') as $class)
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

    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        /** 
         * Require all block classes from classes folder 
         */
        $this->load_classes();

        foreach ($this->config["customPostTypes"] as $post_type) :
            $this->register_post_type($post_type);
        endforeach;
    }
}
