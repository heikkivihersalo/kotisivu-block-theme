<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Gets following attributes from theme class:
 * * name
 * * version
 * * textdomain
 * * options
 * * config
 * * path
 * * uri
 * * parent_path
 * * parent_uri
 */
class Blocks extends Theme {
    /**
     * Utility class instance
     * @var Utilities 
     */
    private static $utilities = null;

    /**
     * Constructor
     * @return void 
     */
    public function __construct() {
        /**
         * Inherit attributes from theme class
         */
        parent::__construct();

        /**
         * Load class files
         */
        $this->load_classes();
    }


    /**
     * Load Classes
     * @return void
     */
    private function load_classes(): void {
        foreach (glob(dirname(__FILE__) . '/blocks/*.php') as $class)
            require_once $class;
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
     * Adds functionality to return '__return_true' string to used in filters and hooks
     * @return string 
     */
    public function return_true(): string {
        return '__return_true';
    }

    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        /**
         * Load extra block configurations
         */
        add_filter('should_load_separate_core_block_assets', [$this, 'return_true']);
        add_filter('plugins_url', [$this, 'fix_file_paths'], 10, 3);

        /**
         * Register categories
         */
        $categories = new BlockCategories('kotisivu-block-theme');
        $categories->init();

        /**
         * Register blocks
         */
        $static_blocks = new BlockStatic(
            $this->path,
            $this->parent_path,
            $this->config,
            'kotisivu-block-theme'
        );
        $static_blocks->init();

        $dynamic_blocks = new BlockDynamic(
            $this->path,
            $this->parent_path,
            $this->config,
            $this->options,
            'kotisivu-block-theme'
        );
        $dynamic_blocks->init();

        /**
         * Register ajax calls
         */
        $ajax = new BlockAjax();
        $ajax->init();
    }
}
