<?php

namespace Kotisivu\BlockTheme;

require_once TESTS_SITE_PATH . '/inc/blocks/class-block.php';
require_once TESTS_SITE_PATH . '/inc/blocks/block-types/class-block-page-template.php';

use PHPUnit\Framework\TestCase;

/**
 * @group custom-blocks
 * @group custom-block-page-template
 */
final class BlockPageTemplateTest extends TestCase {
	/**
	 * @test
	 */
	public function test_GetPath(): void {
		$block = new BlockPageTemplate();
		$this->assertEquals( TESTS_SITE_PATH . '/build/page-templates', $block->get_path() );
	}

	/**
	 * @test
	 */
	public function test_GetBlocks(): void {
		$block = new BlockPageTemplate();
		$this->assertIsArray( $block->get_blocks() );
	}
}
