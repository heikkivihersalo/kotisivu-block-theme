<?php

namespace Kotisivu\BlockTheme;

require_once SITE_PATH . '/inc/blocks/class-block.php';
require_once SITE_PATH . '/inc/blocks/block-types/class-block-part.php';

use PHPUnit\Framework\TestCase;

final class BlockPartsTest extends TestCase {
    #[Test]
    #[Group('blocks')]
    public function test_GetPath(): void {
        $block = new BlockPart();
        $this->assertEquals(SITE_PATH . '/build/block-library/parts', $block->get_path());
    }

    #[Test]
    #[Group('blocks')]
    public function test_GetBlocks(): void {
        $block = new BlockPart();
        $this->assertIsArray($block->get_blocks());
    }
}