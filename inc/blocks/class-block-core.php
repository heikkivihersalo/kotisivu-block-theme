<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 *
 * @package Kotisivu\BlockTheme
 */
class BlockCore {
    /**
     * Blocks
     * @var array
     */
    protected $blocks;

    /**
     * Parent path
     */
    protected $parent_path;

    /**
     * Parent URI
     */
    protected $parent_uri;

    /**
     * Path
     */
    protected $path;

    /**
     * URI
     */
    protected $uri;

    /**
     * Constructor
     * @return void 
     */
    public function __construct($blocks, $parent_path, $parent_uri, $path, $uri) {
        /**
         * Get classes
         */
        foreach (glob(dirname(__DIR__) . '/utils/*.php') as $utility_class)
            require_once $utility_class;

        /**
         * Set attributes
         */
        $this->blocks = $blocks;
        $this->parent_path = $parent_path;
        $this->parent_uri = $parent_uri;
        $this->path = $path;
        $this->uri = $uri;
    }

    /**
     * Enqueue core block modifcations
     * @return void
     */
    public function enqueue_core_blocks(): void {
        // Get assets file
        $assets_file = require $this->parent_path . '/build/blocks/core/core.asset.php';

        wp_enqueue_script(
            'block-core',
            $this->parent_uri . '/build/blocks/core/core.js',
            $assets_file['dependencies'],
            $assets_file['version'],
            true
        );

        wp_enqueue_style(
            'block-core',
            $this->parent_uri . '/build/blocks/core/core.css',
            [],
            $assets_file['version'],
            'all'
        );
    }

    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        if (!function_exists('register_block_type')) return;
        if (!$this->blocks) return;

        /* Register blocks */
        add_action('init', [$this, 'enqueue_core_blocks']);
    }
}
