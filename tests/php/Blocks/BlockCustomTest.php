<?php

namespace Kotisivu\BlockTheme;

require_once \get_theme_file_path() . '/inc/blocks/class-block.php';
require_once \get_theme_file_path() . '/inc/blocks/block-types/class-block-custom.php';

use PHPUnit\Framework\TestCase;

final class BlockCustomTest extends TestCase {
    #[Test]
    #[Group('blocks')]
    public function test_GetPath(): void {
        $block = new BlockCustom();
        $this->assertEquals(\get_theme_file_path() . '/build/block-library/custom', $block->get_path());
    }

    #[Test]
    #[Group('blocks')]
    public function test_GetBlocks(): void {
        $block = new BlockCustom();
        $this->assertIsArray($block->get_blocks());
    }
}