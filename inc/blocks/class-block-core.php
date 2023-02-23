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
    protected $uri;

    /**
     * 
     */
    protected $config;

    /**
     * Constructor
     * @return void 
     */
    public function __construct($path, $uri, $blocks) {
        parent::__construct($path, $uri, $blocks);
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

    public function modify_post_content_block(string $block_content, array $block): string {
        if (
            $block['blockName'] === 'core/post-content' &&
            !is_admin() &&
            !wp_is_json_request()
        ) {

            /**
             * Get post object
             */
            global $post;

            /**
             * Return post content
             */
            return get_the_content($post->ID);
        }

        return $block_content;
    }

    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        add_filter('render_block', [$this, 'modify_post_content_block'], null, 2);

        if ($this->config['blocks']['core']) {
            add_action('enqueue_block_editor_assets', [$this, 'modify_core_blocks']);
        }
    }
}
