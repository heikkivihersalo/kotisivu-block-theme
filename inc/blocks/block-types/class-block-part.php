<?php
/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme;

defined( 'ABSPATH' ) || die();

/**
 *
 * @package Kotisivu\BlockTheme
 */
class BlockPart extends Block {
	/**
	 * @inheritDoc
	 */
	public function get_path(): string {
		return SITE_PATH . '/build/block-library/parts';
	}

	/**
	 * @inheritDoc
	 */
	public function get_blocks(): array {
		return $this->get_block_directories( SITE_PATH . '/src/block-library/parts', 'ksd' );
	}
}
