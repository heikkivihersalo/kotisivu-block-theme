<?php

namespace Kotisivu\BlockTheme;

require_once SITE_PATH . '/inc/blocks/class-block.php';
require_once SITE_PATH . '/inc/blocks/block-types/class-block-custom.php';

use PHPUnit\Framework\TestCase;

/** 
 * @group custom-blocks
 * @group custom-block-custom
 */
final class BlockCustomTest extends TestCase {
    /**
     * @test
     */
    public function test_GetPath(): void {
        $block = new BlockCustom();
        $this->assertEquals(SITE_PATH . '/build/block-library/custom', $block->get_path());
    }

    /**
     * @test
     */
    public function test_GetBlocks(): void {
        $block = new BlockCustom();
        $this->assertIsArray($block->get_blocks());
    }
}