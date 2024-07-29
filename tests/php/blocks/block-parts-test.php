<?php

namespace Kotisivu\BlockTheme;

require_once TESTS_SITE_PATH . '/inc/blocks/class-block.php';
require_once TESTS_SITE_PATH . '/inc/blocks/block-types/class-block-part.php';

use PHPUnit\Framework\TestCase;

/**
 * @group custom-blocks
 * @group custom-block-part
 */
final class BlockPartsTest extends TestCase {
	/**
	 * @test
	 */
	public function test_GetPath(): void {
		$block = new BlockPart();
		$this->assertEquals( TESTS_SITE_PATH . '/build/block-library/parts', $block->get_path() );
	}

	/**
	 * @test
	 */
	public function test_GetBlocks(): void {
		$block = new BlockPart();
		$this->assertIsArray( $block->get_blocks() );
	}
}
