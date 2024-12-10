<?php
/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme\Gutenberg\Types;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Gutenberg\Block;

/**
 *
 * @package Kotisivu\BlockTheme
 */
class BlockPageTemplate extends Block {
	/**
	 * @inheritDoc
	 */
	public function get_path(): string {
		return SITE_PATH . '/build/page-templates';
	}

	/**
	 * @inheritDoc
	 */
	public function get_blocks(): array {
		return $this->get_block_directories( SITE_PATH . '/src/page-templates', 'ksd' );
	}
}
