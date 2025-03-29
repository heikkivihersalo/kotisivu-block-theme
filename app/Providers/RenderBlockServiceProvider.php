<?php

declare(strict_types=1);

namespace App\Providers;

use Vihersalo\Core\Support\ServiceProvider;
use Vihersalo\Core\Foundation\HooksStore;

class RenderBlockServiceProvider extends ServiceProvider {
    /**
     * Register any application services.
     */
    public function register(): void {
        $this->app->make(HooksStore::class)->addFilter('render_block', $this, 'replaceImageMarkup', 10, 2);
    }

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
     * Bootstrap any application services.
     */
    public function boot(): void {
    }
}
