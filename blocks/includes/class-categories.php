<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

class Categories extends Blocks {
    public function __construct() {
        parent::__construct();
    }

    /**
     * Register custom block categories
     * @param mixed $block_categories 
     * @param mixed $editor_context 
     * @return mixed 
     */
    public function register_categories(mixed $block_categories, mixed $editor_context): mixed {
        if (!empty($editor_context->post)) {
            array_unshift(
                $block_categories,
                array(
                    'slug'  => 'blocks',
                    'title' => __('Blocks', $this->textdomain),
                    'icon'  => null,
                )
            );

            array_push(
                $block_categories,
                array(
                    'slug'  => 'blog',
                    'title' => __('Blog', $this->textdomain),
                    'icon'  => null,
                )
            );

            array_push(
                $block_categories,
                array(
                    'slug'  => 'navigation',
                    'title' => __('Navigation', $this->textdomain),
                    'icon'  => null,
                )
            );

            array_push(
                $block_categories,
                array(
                    'slug'  => 'child',
                    'title' => __('Child', $this->textdomain),
                    'icon'  => null,
                )
            );
        }
        return $block_categories;
    }

    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        add_filter('block_categories_all', [$this, 'register_categories'], 10, 2);
    }
}
