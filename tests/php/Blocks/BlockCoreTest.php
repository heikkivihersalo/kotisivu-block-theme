<?php

namespace Kotisivu\BlockTheme;

require_once SITE_PATH . '/inc/blocks/class-block.php';
require_once SITE_PATH . '/inc/blocks/block-types/class-block-core.php';

use PHPUnit\Framework\TestCase;

final class BlockCoreTest extends TestCase {
    #[Test]
    #[Group('blocks')]
    public function test_GetPath(): void {
        $block = new BlockCore();
        $this->assertEquals(SITE_PATH . '/build/block-library/core', $block->get_path());
    }

    #[Test]
    #[Group('blocks')]
    public function test_GetBlocks(): void {
        $block = new BlockCore();
        $this->assertIsArray($block->get_blocks());
    }
}