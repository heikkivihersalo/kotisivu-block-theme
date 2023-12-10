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
     * Register static blocks
     * @return void 
     */
    public function register_custom_blocks(): void {
        foreach ($this->blocks as $block) :
            try {
                $block_path = Utils::get_block_path($block, 'custom', $this->path, $this->parent_path);
                register_block_type($block_path);

                Utils::set_block_translation(
                    'ksd-' . explode('/', $block)[1],
                    $this->parent_path
                );
            } catch (\Exception $e) {
                Utils::write_log($e->getMessage());
            }

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
