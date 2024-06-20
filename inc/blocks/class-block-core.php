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
     * Constructor
     * @return void 
     */
    public function __construct($blocks) {
        /**
         * Get classes
         */
        foreach (glob(dirname(__DIR__) . '/utils/*.php') as $utility_class)
            require_once $utility_class;

        /**
         * Set attributes
         */
        $this->blocks = $blocks;
    }

    /**
     * Enqueue core block modifcations
     * @return void
     */
    public function enqueue_core_blocks(): void {
        // Get assets file
        $assets_file = require SITE_PATH . '/build/block-library/core/core.asset.php';

        wp_enqueue_script(
            'block-core',
            SITE_URI . '/build/block-library/core/core.js',
            $assets_file['dependencies'],
            $assets_file['version'],
            true
        );

        wp_enqueue_style(
            'block-core',
            SITE_URI . '/build/block-library/core/core.css',
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
