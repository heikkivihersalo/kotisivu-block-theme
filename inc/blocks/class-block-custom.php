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
     * Type
     * @var string
     */
    protected $type;

    /**
     * Constructor
     * @return void 
     */
    public function __construct($blocks, $parent_path, $parent_uri, $path, $uri, $type = 'custom') {
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
        $this->type = $type;
    }

    /**
     * Register static blocks
     * @return void 
     */
    public function register_custom_blocks(): void {
        foreach ($this->blocks as $block) :
            // Get block path
            $block_path = Utils::get_block_path($block, $this->type, $this->path, $this->parent_path);

            // Trigger error if deprecated function is used
            add_filter('doing_it_wrong_trigger_error', function ($trigger, $function, $message, $version) use ($block, $block_path) {
                throw new \Exception("Trying to register block {$block} but failed for some reason.\n\nThis can be caused of non-existing block in block.json. Make sure that preceding and next blocks in block.json list exists.\n\n Message: {$message}\n");
            }, 10, 4);

            // Register block
            register_block_type($block_path);
            Utils::set_block_translation(
                'ksd-' . explode('/', $block)[1],
                $this->parent_path
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
