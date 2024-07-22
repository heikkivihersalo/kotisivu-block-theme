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
class BlockCore extends Block {
	/**
	 * @inheritDoc
	 */
	public function get_path(): string {
		return SITE_PATH . '/build/block-library/core';
	}

	/**
	 * @inheritDoc
	 */
	public function get_blocks(): array {
		return $this->get_block_directories( SITE_PATH . '/src/block-library/core', 'core' );
	}

	/**
	 * Enqueue core block modifcations
	 * @return void
	 */
	public function register_blocks(): void {
		// Get assets file
		$assets_file = require SITE_PATH . '/build/block-library/core/core.asset.php';

		wp_enqueue_script(
			'block-core',
			SITE_URI . '/build/block-library/core/core.js',
			$assets_file['dependencies'],
			$assets_file['version'],
			true
		);

		wp_enqueue_style(
			'block-core',
			SITE_URI . '/build/block-library/core/core.css',
			array(),
			$assets_file['version'],
			'all'
		);
	}

	/**
	 * Initialize class
	 * @return void
	 */
	public function init(): void {
		add_action( 'init', array( $this, 'register_blocks' ) );
		add_action( 'admin_init', array( $this, 'register_blocks' ) );
	}
}
