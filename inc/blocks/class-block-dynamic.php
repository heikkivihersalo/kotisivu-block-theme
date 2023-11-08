<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 *
 * @package Kotisivu\BlockTheme
 */
class BlockDynamic {
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
        $this->blocks = $blocks;
        $this->parent_path = $parent_path;
        $this->parent_uri = $parent_uri;
        $this->path = $path;
        $this->uri = $uri;
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

        if (isset($this->options)) :
            $attributes = array_merge($attributes, [
                'options' => [
                    'type' => 'object',
                    'default' => $this->options
                ]
            ]);
        endif;

        /**
         * Register block
         */
        try {
            register_block_type(
                $block_path,
                array(
                    'render_callback' => $render_callback,
                    'attributes' => $attributes,
                )
            );
            $this->set_translation(explode('/', $slug)[1]);
        } catch (\Exception $e) {
            $this->write_log($e->getMessage());
        }
    }

    /**
     * Get path to block folder. Checks child theme first, if not found, uses parent theme blocks folder.
     * @param string $block name of the block with namespace 
     * @param string $type type of block (static or dynamic)
     * @return string path to block folder 
     */
    private function get_block_path(string $block, string $type): string {
        $_name = explode('/', $block)[1];
        $_path = $this->path . '/src/blocks';
        $_parent_path = $this->parent_path . '/src/blocks';

        return file_exists("{$_path}/{$type}/{$_name}")
            ? "{$_path}/{$type}/{$_name}"
            : "{$_parent_path}/{$type}/{$_name}";
    }

    /**
     * Write to log
     * @param string $message 
     * @return void 
     * TODO: Make sure this is working
     */
    private function write_log($log): void {
        if (is_array($log) || is_object($log)) {
            error_log(print_r($log, true));
        } else {
            error_log($log);
        }
    }

    /**
     * Set translation
     * @param string $slug
     * @return void
     */
    public function set_translation(string $slug): void {
        $block_slug = 'ksd-' . $slug . '-view-script';

        wp_set_script_translations(
            $block_slug,
            'kotisivu-block-theme',
            $this->parent_path . '/languages'
        );

        add_filter('load_script_translation_file', function (string $file, string $handle, string $domain) use ($block_slug) {
            if (strpos($handle, $block_slug) !== false && 'kotisivu-block-theme' === $domain) {
                $file = str_replace(WP_LANG_DIR . '/themes', $this->parent_path . '/languages', $file);
            }

            return $file;
        }, 10, 3);
    }

    /**
     * Loop through block array and register dynamic blocks
     * @return void 
     */
    public function register_dynamic_blocks(): void {
        foreach ($this->blocks as $block) :
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
        if (!$this->blocks) return;

        /* Register blocks */
        add_action('init', [$this, 'register_dynamic_blocks']);
    }
}
