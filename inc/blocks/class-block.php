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
abstract class Block {
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
	 * Set block translation
	 * @param string $block_slug Block slug
	 * @param string $path Path to block
	 * @return void
	 */
	public function set_block_translation( $block_slug, $path ): void {
		wp_set_script_translations(
			$block_slug,
			SITE_TEXTDOMAIN,
			$path . '/languages'
		);

		add_filter(
			'load_script_translation_file',
			function ( string $file, string $handle, string $domain ) use ( $block_slug, $path ) {
				if ( strpos( $handle, $block_slug ) !== false && SITE_TEXTDOMAIN === $domain ) {
					$file = str_replace( WP_LANG_DIR . '/plugins', $path . '/languages', $file );
				}

				return $file;
			},
			10,
			3
		);
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

	/**
	 * Initialize class
	 * @return void
	 */
	public function init(): void {
		add_action( 'init', array( $this, 'register_blocks' ) );
	}
}
