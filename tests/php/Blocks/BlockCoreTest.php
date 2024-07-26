<?php

namespace Kotisivu\BlockTheme;

require_once get_theme_file_path() . '/inc/blocks/class-block.php';
require_once get_theme_file_path() . '/inc/blocks/block-types/class-block-core.php';

use PHPUnit\Framework\TestCase;

final class BlockCoreTest extends TestCase {
    #[Test]
    #[Group('blocks')]
    public function test_GetPath(): void {
        $block = new BlockCore();
        $this->assertEquals(get_theme_file_path() . '/build/block-library/core', $block->get_path());
    }

    #[Test]
    #[Group('blocks')]
    public function test_GetBlocks(): void {
        $block = new BlockCore();
        $this->assertIsArray($block->get_blocks());
    }
}