<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 *
 * @package Kotisivu\BlockTheme
 */
class BlockCustom {
    /**
     * Blocks
     * @var array
     */
    protected $blocks;

    /**
     * Path
     */
    protected $path;

    /**
     * URI
     */
    protected $uri;

    /**
     * Type
     * @var string
     */
    protected $type;

    /**
     * Namespace
     * @var string
     */
    protected $namespace;

    /**
     * Constructor
     * @return void 
     */
    public function __construct($blocks, $path, $uri, $type = 'custom') {
        /**
         * Get classes
         */
        foreach (glob(dirname(__DIR__) . '/utils/*.php') as $utility_class)
            require_once $utility_class;

        /**
         * Set attributes
         */
        $this->blocks = $blocks;
        $this->path = $this->get_path($type, $path);
        $this->uri = $uri;
        $this->type = $type;
        $this->namespace = "ksd";
    }

    /**
     * Get path based on type of block (custom, templates, parts)
     * @param string $type
     * @param string $path
     * @return string
     */
    private function get_path($type, $path): string {
        switch ($type) {
            case 'custom':
                $path = $path . '/build/block-library/custom';
                break;
            case 'templates':
                $path = $path . '/build/page-templates';
                break;
            case 'parts':
                $path = $path . '/build/block-library/parts';
                break;
            default:
                $path = $path . '/build/block-library/custom';
                break;
        }

        return $path;
    }

    /**
     * Register static blocks
     * @return void 
     */
    public function register_custom_blocks(): void {
        foreach ($this->blocks as $block) :
            // Register block
            register_block_type($this->path . '/' . explode('/', $block)[1]);

            // Set block translation
            Utils::set_block_translation(
                $this->namespace . '-' . explode('/', $block)[1],
                $this->path
            );

        endforeach;
    }

    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        if (!function_exists('register_block_type')) return;
        if (!$this->blocks) return;

        /* Register blocks */
        add_action('init', [$this, 'register_custom_blocks']);
    }
}
