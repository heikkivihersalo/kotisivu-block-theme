<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

class BlockCore extends Blocks {
    /**
     * 
     */
    protected $path;

    /**
     * 
     */
    protected $parent_path;

    /**
     * 
     */
    protected $config;

    /**
     * 
     */
    protected $textdomain;

    /**
     * Constructor
     * @return void 
     */
    public function __construct($path, $parent_path, $config, $textdomain) {
        parent::__construct($path, $parent_path, $config, $textdomain);
    }

    /**
     * Register Core blocks
     * @return void 
     */
    public function modify_core_blocks(): void {
        $asset = require($this->path . '/blocks/build/core.asset.php');

        wp_enqueue_script(
            'ksd-core-blocks',
            $this->uri . '/blocks/build/core.js',
            $asset['dependencies'],
            $asset['version'],
        );
    }

    public function modify_core_block_styles(): void {
        foreach ($this->config['blocks']['core'] as $block) :
            if ($block['modified_styles']) :
                $args = array(
                    'handle' => 'ksd' . $block['slug'],
                    'src' => $this->path . '/src/blocks/core/styles/' . explode('/', $block['slug'])[1] . '.css',
                    'path' => $this->path . '/src/blocks/core/styles/' . explode('/', $block['slug'])[1] . '.css',
                );
                wp_enqueue_block_style($block['slug'], $args);
            endif;
        endforeach;
    }

    // public function modify_post_content_block(string $block_content, array $block): string {
    //     if (
    //         $block['blockName'] === 'core/post-content' &&
    //         !is_admin() &&
    //         !wp_is_json_request()
    //     ) {

    //         /**
    //          * Get post object
    //          */
    //         global $post;

    //         /**
    //          * Return post content
    //          */
    //         return get_the_content($post->ID);
    //     }

    //     return $block_content;
    // }

    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        // add_filter('render_block', [$this, 'modify_post_content_block'], null, 2);
        // add_action('enqueue_block_editor_assets', [$this, 'modify_core_blocks']);
        add_action('after_setup_theme', [$this, 'modify_core_block_styles']);
    }
}
