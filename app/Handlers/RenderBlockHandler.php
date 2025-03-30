<?php

declare(strict_types=1);

namespace App\Handlers;

use Vihersalo\Core\Foundation\HooksStore;
use Vihersalo\Core\Foundation\Application;
use Vihersalo\Core\Support\Handler;

class RenderBlockHandler extends Handler {
    /**
     * Replace image block markup with custom image markup
     * @param string $block_content Block content
     * @param array  $block Block data
     * @return string
     */
    public function replaceImageMarkup(string $block_content, array $block): string {
        if ('core/image' !== $block['blockName']) {
            return $block_content;
        }

        $classes   = $block['attrs']['className'] ?? '';
        $size_slug = $block['attrs']['sizeSlug'] ?? 'full';

        return wp_get_attachment_image(
            $block['attrs']['id'],
            $size_slug,
            false,
            array(
                'class' => 'wp-block-image size-' . $size_slug . ' ' . $classes,
            )
        );
    }

    /**
     * Handle
     * @return void
     */
    public function handle(): void {
        $this->store->addFilter('render_block', $this, 'replaceImageMarkup', 10, 2);
    }
}
