<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 *
 * @package Kotisivu\BlockTheme
 */
class Blocks {
    /**
     * Path to stylesheet directory of the current theme. Searches in the stylesheet directory before the template directory so themes which inherit from a parent theme can just override one file.
     * @var string
     */
    protected $path;

    /**
     * Stylesheet directory URI of the current theme. Searches in the stylesheet directory before the template directory so themes which inherit from a parent theme can just override one file.
     * @var string
     */
    protected $uri;

    /**
     * Custom blocks
     * @var array
     */
    protected $custom_blocks;

    /**
     * Part blocks
     * @var array
     */
    protected $part_blocks;

    /**
     * Template blocks
     * @var array
     */
    protected $template_blocks;

    /**
     * Core blocks
     * @var array
     */
    protected $core_blocks;

    /**
     * Constructor
     * @return void 
     */
    public function __construct($path, $uri) {
        /**
         * Get classes
         */
        foreach (glob(dirname(__FILE__) . '/blocks/*.php') as $block_class)
            require_once $block_class;

        foreach (glob(dirname(__FILE__) . '/utils/*.php') as $utility_class)
            require_once $utility_class;

        /**
         * Set attributes
         */
        $this->path = $path;
        $this->uri = $uri;

        /**
         * Get block directories
         */
        $this->custom_blocks = Utils::get_block_directories($path . '/src/block-library/custom', 'ksd');
        $this->part_blocks = Utils::get_block_directories($path . '/src/block-library/parts', 'ksd');
        $this->template_blocks = Utils::get_block_directories($path . '/src/templates', 'ksd');
        $this->core_blocks = Utils::get_block_directories($path . '/src/block-library/core', 'core');
    }

    /**
     * Fix theme paths when used inside theme
     * @param string $url 
     * @param string $path 
     * @param string $plugin 
     * @return string 
     */
    public function fix_file_paths(string $url, string $path, string $plugin): string {
        if (strpos($url, $this->path) !== false) {
            $url = str_replace('wp-content/plugins' . ABSPATH, '', $url);
        }

        return $url;
    }

    /**
     * Define allowed block types for Gutenberg
     * @param mixed $block_editor_context 
     * @param mixed $editor_context 
     * @return array 
     */
    public function allowed_block_types($block_editor_context, $editor_context): array {
        if (!empty($editor_context->post) || $editor_context->name === 'core/edit-site') :

            /* Return merged block array */
            return array_merge(
                /**
                 * Define must use blocks that are always available
                 */
                array(
                    "core/html",
                    "core/shortcode",
                    "core/block" // This is a must for reusable blocks
                ),
                /**
                 * Theme specific custom blocks
                 */
                $this->custom_blocks,
                /** 
                 * For core blocks that has child blocks like core/buttons, core/list etc.
                 * They checked on the fly in the function `Utils::get_block_directories()`
                 * !NOTE If you add new core block that has child blocks, you need to add it here
                 */
                $this->core_blocks,
                /** 
                 * Theme specific part blocks
                 */
                $this->part_blocks,
                /**
                 * Theme templates. These are not allowed to be used in the editor
                 * This is basically Kotisivu Block Theme way to handle templates. Templates for pages, posts etc.
                 */
                $this->template_blocks
            );
        endif;

        /**
         * If 'block_editor_context' is an array, return content
         */
        if (is_array($block_editor_context)) {
            return $block_editor_context;
        }

        /* Else return an empty array */
        return array();
    }

    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        /**
         * Load extra block configurations
         */
        add_filter('should_load_separate_core_block_assets', 'Kotisivu\BlockTheme\Utils::return_true');
        add_filter('plugins_url', [$this, 'fix_file_paths'], 10, 3);
        add_filter('allowed_block_types_all', [$this, 'allowed_block_types'], 10, 2);

        /**
         * Register categories
         */
        $categories = new BlockCategories();
        $categories->init();

        /**
         * Register blocks
         */
        $custom_blocks = new BlockCustom(
            $this->custom_blocks,
            $this->path,
            $this->uri,
            'custom'
        );

        $custom_blocks->init();

        $part_blocks = new BlockCustom(
            $this->part_blocks,
            $this->path,
            $this->uri,
            'parts'
        );

        $part_blocks->init();

        $template_blocks = new BlockCustom(
            $this->template_blocks,
            $this->path,
            $this->uri,
            'templates'
        );

        $template_blocks->init();

        $core_blocks = new BlockCore(
            $this->core_blocks,
            $this->path,
            $this->uri,
            'core'
        );

        $core_blocks->init();

        /**
         * Register ajax calls
         */
        $ajax = new BlockAjax();
        $ajax->init();
    }
}
