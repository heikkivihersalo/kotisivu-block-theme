<?php

namespace Kotisivu\BlockTheme;

require_once \get_theme_file_path() . '/inc/blocks/class-block.php';
require_once \get_theme_file_path() . '/inc/blocks/block-types/class-block-page-template.php';

use PHPUnit\Framework\TestCase;

final class BlockPageTemplateTest extends TestCase {
    #[Test]
    #[Group('blocks')]
    public function test_GetPath(): void {
        $block = new BlockPageTemplate();
        $this->assertEquals(\get_theme_file_path() . '/build/page-templates', $block->get_path());
    }

    #[Test]
    #[Group('blocks')]
    public function test_GetBlocks(): void {
        $block = new BlockPageTemplate();
        $this->assertIsArray($block->get_blocks());
    }
}