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
class BlockCustom {
	/**
	 * Blocks
	 * @var array
	 */
	protected $blocks;

	/**
	 * Type
	 * @var string
	 */
	protected $type;

	/**
	 * Constructor
	 */
	public function __construct( array $blocks, string $type = 'custom' ) {
		/**
		 * Get classes
		 */
		foreach ( glob( dirname( __DIR__ ) . '/utils/*.php' ) as $utility_class ) {
			require_once $utility_class;
		}

		/**
		 * Set attributes
		 */
		$this->blocks = $blocks;
		$this->type   = $type;
	}

	/**
	 * Get path based on type of block (custom, templates, parts)
	 * @param string $type Type of block (custom, templates, parts)
	 * @param string $path Site global path
	 * @return string
	 */
	private function get_path( $type, $path ): string {
		switch ( $type ) {
			case 'custom':
				$path = $path . '/build/block-library/custom';
				break;
			case 'templates':
				$path = $path . '/build/page-templates';
				break;
			case 'parts':
				$path = $path . '/build/block-library/parts';
				break;
			default:
				$path = $path . '/build/block-library/custom';
				break;
		}

		return $path;
	}

	/**
	 * Register static blocks
	 * @return void
	 */
	public function register_custom_blocks(): void {
		$path = $this->get_path( $this->type, SITE_PATH );

		foreach ( $this->blocks as $block ) :
			// Register block
			register_block_type( $path . '/' . explode( '/', $block )[1] );

			// Set block translation
			Utils::set_block_translation(
				'ksd-' . explode( '/', $block )[1],
				$path
			);

		endforeach;
	}

	/**
	 * Initialize class
	 * @return void
	 */
	public function init(): void {
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}
		if ( ! $this->blocks ) {
			return;
		}

		/* Register blocks */
		add_action( 'init', array( $this, 'register_custom_blocks' ) );
	}
}
