<?php

namespace Kotisivu\BlockTheme;

require_once SITE_PATH . '/inc/blocks/class-block.php';
require_once SITE_PATH . '/inc/blocks/block-types/class-block-page-template.php';

use PHPUnit\Framework\TestCase;

final class BlockPageTemplateTest extends TestCase {
    #[Test]
    #[Group('blocks')]
    public function test_GetPath(): void {
        $block = new BlockPageTemplate();
        $this->assertEquals(SITE_PATH . '/build/page-templates', $block->get_path());
    }

    #[Test]
    #[Group('blocks')]
    public function test_GetBlocks(): void {
        $block = new BlockPageTemplate();
        $this->assertIsArray($block->get_blocks());
    }
}