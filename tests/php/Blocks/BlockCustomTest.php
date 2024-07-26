<?php

namespace Kotisivu\BlockTheme;

require_once SITE_PATH . '/inc/blocks/class-block.php';
require_once SITE_PATH . '/inc/blocks/block-types/class-block-custom.php';

use PHPUnit\Framework\TestCase;

final class BlockCustomTest extends TestCase {
    #[Test]
    #[Group('blocks')]
    public function test_GetPath(): void {
        $block = new BlockCustom();
        $this->assertEquals(SITE_PATH . '/build/block-library/custom', $block->get_path());
    }

    #[Test]
    #[Group('blocks')]
    public function test_GetBlocks(): void {
        $block = new BlockCustom();
        $this->assertIsArray($block->get_blocks());
    }
}