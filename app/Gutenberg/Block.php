<?php
/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme\Gutenberg;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Gutenberg\Traits\BlockTranslations;

/**
 *
 * @package Kotisivu\BlockTheme
 */
abstract class Block {
	use BlockTranslations;

	/**
	 * Blocks
	 * @var array
	 */
	protected $blocks;

	/**
	 * Path
	 * @var string
	 */
	protected $path;

	/**
	 * Constructor
	 */
	public function __construct() {
		$this->blocks = $this->get_blocks();
		$this->path   = $this->get_path();
	}

	/**
	 * Get path based on type of block (custom, templates, parts)
	 * @return string
	 */
	abstract public function get_path(): string;

	/**
	 * Get blocks
	 * @return array
	 */
	abstract public function get_blocks(): array;

	/**
	 * Get block directories
	 * Can be used to get all blocks that needs to be registered
	 * @param string $path Path to block directory
	 * @param string $type Type of block (e.g. core, custom)
	 * @return array
	 */
	public function get_block_directories( string $path = null, string $type ): array {
		if ( null === $path ) {
			return array();
		}

		foreach ( scandir( $path ) as $block ) {
			// Remove unnecessary files (e.g. .gitignore, .DS_Store, ., .. etc.)
			if ( '.' === $block || '..' === $block || '.DS_Store' === $block || strpos( $block, '.' ) === true ) {
				continue;
			}

			// Add block to array
			$blocks[] = $type . '/' . $block;

			// Check if block is core block and has child blocks
			// E.g. core/buttons, core/list
			if ( 'core' === $type ) :
				switch ( $block ) {
					case 'buttons':
						$blocks[] = 'core/button';
						break;
					case 'list':
						$blocks[] = 'core/list-item';
						break;
					default:
						break;
				}
			endif;
		}

		return $blocks;
	}

	/**
	 * Register Blocks
	 * @return void
	 */
	public function register_blocks(): void {
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		if ( ! $this->blocks ) {
			return;
		}

		foreach ( $this->blocks as $block ) :
			register_block_type( $this->path . '/' . explode( '/', $block )[1] );

			$this->set_block_translation(
				'ksd-' . explode( '/', $block )[1],
				SITE_PATH
			);
		endforeach;
	}
}
