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
class BlockDynamic {
	/**
	 * Blocks
	 * @var array
	 */
	protected $blocks;

	/**
	 * Parent path
	 */
	protected $parent_path;

	/**
	 * Parent URI
	 */
	protected $parent_uri;

	/**
	 * Path
	 */
	protected $path;

	/**
	 * URI
	 */
	protected $uri;

	/**
	 * Options
	 */
	protected $options;

	/**
	 * Constructor
	 * @return void 
	 */
	public function __construct( $blocks, $parent_path, $parent_uri, $path, $uri, $options ) {
		/**
		 * Get classes
		 */
		foreach ( glob( dirname( __DIR__ ) . '/utils/*.php' ) as $utility_class ) {
			require_once $utility_class;
		}

		/**
		 * Set attributes
		 */
		$this->blocks      = $blocks;
		$this->parent_path = $parent_path;
		$this->parent_uri  = $parent_uri;
		SITE_PATH          = $path;
		SITE_URI           = $uri;
		$this->options     = $options;
	}

	/**
	 * Register dynamic block
	 * @param string $slug 
	 * @param string $render_callback 
	 * @param array $attributes 
	 * @return void 
	 */
	public function register_block( string $slug, string $render_callback, array $attributes ): void {
		/**
		 * Get paths to block
		 */
		$block_path = Utils::get_block_path( $slug, 'dynamic', SITE_PATH, $this->parent_path );

		/** 
		 * Guard Clauses 
		 */
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}
		if ( ! file_exists( $block_path . '/render.php' ) ) {
			return;
		}

		/**
		 * Get render.php file
		 */
		include_once $block_path . '/render.php';

		if ( isset( $this->options ) ) :
			$attributes = array_merge(
				$attributes,
				array(
					'options' => array(
						'type'    => 'object',
						'default' => $this->options,
					),
				)
			);
		endif;

		/**
		 * Register block
		 */
		try {
			register_block_type(
				$block_path,
				array(
					'render_callback' => $render_callback,
					'attributes'      => $attributes,
				)
			);
			Utils::set_block_translation(
				'ksd-' . explode( '/', $slug )[1] . '-view-script',
				$this->parent_path
			);
		} catch ( \Exception $e ) {
			Utils::write_log( $e->getMessage() );
		}
	}

	/**
	 * Loop through block array and register dynamic blocks
	 * @return void 
	 */
	public function register_dynamic_blocks(): void {
		foreach ( $this->blocks as $block ) :
			$this->register_block( $block['slug'], $block['render_callback'], $block['attributes'] );
		endforeach;
	}

	/**
	 * Initialize class
	 * @return void 
	 */
	public function init(): void {
		/* Guard Clauses */
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}
		if ( ! $this->blocks ) {
			return;
		}

		/* Register blocks */
		add_action( 'init', array( $this, 'register_dynamic_blocks' ) );
	}
}
