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
     * Path to parent theme directory
     * @var string
     */
    protected $parent_path;

    /**
     * URI of the parent theme directory
     * @var string
     */
    protected $parent_uri;

    /**
     * Blocks
     * @var array
     */
    protected $blocks;

    /**
     * Options
     * @var array
     */
    protected $options;

    /**
     * Constructor
     * @return void 
     */
    public function __construct($blocks, $parent_path, $parent_uri, $path, $uri, $options) {
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
        $this->blocks = $blocks;
        $this->parent_path = $parent_path;
        $this->parent_uri = $parent_uri;
        $this->path = $path;
        $this->uri = $uri;
        $this->options = $options;
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
                $this->blocks["custom"],
                $this->blocks["core"]
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
            $this->blocks['custom'],
            $this->parent_path,
            $this->parent_uri,
            $this->path,
            $this->uri
        );
        $custom_blocks->init();

        $core_blocks = new BlockCore(
            $this->blocks['core'],
            $this->parent_path,
            $this->parent_uri,
            $this->path,
            $this->uri
        );
        $core_blocks->init();
        
        /**
         * Register ajax calls
         */
        $ajax = new BlockAjax();
        $ajax->init();
    }
}
