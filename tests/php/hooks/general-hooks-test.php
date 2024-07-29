<?php

namespace Kotisivu\BlockTheme;

use PHPUnit\Framework\TestCase;

require_once SITE_PATH . '/inc/hooks/images.php';

/**
 * @group hooks
 * @group general-hooks
 */
final class GeneralHooksTest extends TestCase {
	/**
	 * @test
	 */
	public function test_EnableSVGUploads() {
		$mime_types = get_allowed_mime_types( 1 );
		$this->assertArrayHasKey( 'svg', $mime_types );
	}
}
