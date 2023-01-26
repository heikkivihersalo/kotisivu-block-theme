<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

class DynamicBlocks extends Blocks {
    /**
     * Constructor
     * @return void 
     */
    public function __construct() {
        parent::__construct();
    }

    /**
     * Register dynamic block
     * @param string $slug 
     * @param string $render_callback 
     * @param array $attributes 
     * @return void 
     */
    public function register_block(string $slug, string $render_callback, array $attributes): void {
        /**
         * Get paths to block
         */
        $block_path = $this->get_block_path($slug, 'dynamic');

        /** 
         * Guard Clauses 
         */
        if (!function_exists('register_block_type')) return;
        if (!file_exists($block_path . '/render.php')) return;

        /**
         * Get render.php file
         */
        include_once($block_path . '/render.php');

        /**
         * Register block
         */
        try {
            register_block_type(
                $block_path,
                array(
                    'render_callback' => $render_callback,
                    'attributes' => $attributes
                )
            );
        } catch (\Exception $e) {
            $this->write_log($e->getMessage());
        }

        /**
         * Include translations if set
         */
        if ($this->config["blocks"]["translations"]) :
            if (class_exists('Translation')) new Translation($block_name, $this->textdomain);
        endif;
    }

    /**
     * Get path to block folder. Checks child theme first, if not found, uses parent theme blocks folder.
     * @param string $block name of the block with namespace 
     * @param string $type type of block (static or dynamic)
     * @return string path to block folder 
     */
    private function get_block_path(string $block, string $type): string {
        $_name = explode('/', $block)[1];
        $_path = $this->path . '/blocks/src/blocks';
        $_parent_path = $this->parent_path . '/blocks/src/blocks';

        return file_exists("{$_path}/{$type}/{$_name}")
            ? "{$_path}/{$type}/{$_name}"
            : "{$_parent_path}/{$type}/{$_name}";
    }

    /**
     * Write to log
     * @param string $message 
     * @return void 
     */
    private function write_log($log): void {
        if (is_array($log) || is_object($log)) {
            error_log(print_r($log, true));
        } else {
            error_log($log);
        }
    }

    /**
     * Loop through block array and register dynamic blocks
     * @return void 
     */
    public function register_dynamic_blocks(): void {
        foreach ($this->config['blocks']['dynamic'] as $block) :
            $this->register_block($block['slug'], $block['render_callback'], $block['attributes']);
        endforeach;
    }

    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        /* Guard Clauses */
        if (!function_exists('register_block_type')) return;
        if (!$this->config['blocks']['dynamic']) return;

        /* Check if block translations are set */
        if ($this->config["blocks"]["translations"]) require_once dirname(__FILE__) . '/class-translation.php';

        /* Register blocks */
        add_action('init', [$this, 'register_dynamic_blocks']);
    }
}
