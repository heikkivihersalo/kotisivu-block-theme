<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 *
 * @package Kotisivu\BlockTheme
 */
class BlockStatic {
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
    public function register_static_blocks(): void {
        foreach ($this->blocks as $block) :
            try {
                register_block_type($this->get_block_path($block, 'static'));
                $this->set_translation(explode('/', $block)[1]);
            } catch (\Exception $e) {
                Utils::write_log($e->getMessage());
            }

        endforeach;
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
     * Set translation
     * @param string $slug
     * @return void
     */
    public function set_translation(string $slug): void {
        $block_slug = 'ksd-' . $slug;

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
     * Initialize class
     * @return void 
     */
    public function init(): void {
        if (!function_exists('register_block_type')) return;
        if (!$this->blocks) return;

        /* Register blocks */
        add_action('init', [$this, 'register_static_blocks']);
    }
}
