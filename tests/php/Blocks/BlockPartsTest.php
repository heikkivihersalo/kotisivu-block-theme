<?php

namespace Kotisivu\BlockTheme;

require_once \get_theme_file_path() . '/inc/blocks/class-block.php';
require_once \get_theme_file_path() . '/inc/blocks/block-types/class-block-part.php';

use PHPUnit\Framework\TestCase;

final class BlockPartsTest extends TestCase {
    #[Test]
    #[Group('blocks')]
    public function test_GetPath(): void {
        $block = new BlockPart();
        $this->assertEquals(\get_theme_file_path() . '/build/block-library/parts', $block->get_path());
    }

    #[Test]
    #[Group('blocks')]
    public function test_GetBlocks(): void {
        $block = new BlockPart();
        $this->assertIsArray($block->get_blocks());
    }
}