<?php
/**
 * The enqueue scripts class.
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Common\Enqueue
 */

namespace Kotisivu\BlockTheme\Theme\Common;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\Common\Interfaces\EnqueueInterface;

/**
 * The enqueued scripts functionality of the plugin.
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Common\Enqueue
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
abstract class Enqueue implements EnqueueInterface {
	/**
	 * The ID of this plugin.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Constructor
	 *
	 * @since    2.0.0
	 * @access   public
	 */
	public function __construct( $plugin_name, $version ) {
		$this->plugin_name = $plugin_name;
		$this->version     = $version;
	}

	/**
	 * @inheritDoc
	 */
	public function asset_exists( string $path, string $type = '' ): bool {
		if ( ! file_exists( $path ) ) :
			$message = sprintf(
				/* translators: %1$s is the type of the asset, %2$s is the path to the asset */
				__( 'Plugin%1$s assets in a path "%2$s" are missing. Run `yarn` and/or `yarn build` to generate them.', 'kotisivu-block-theme' ),
				$type ? ' ' . $type : '',
				$path
			);

			$notice = new Notice( $message );
			$notice->display();

			return false;
		endif;

		return true;
	}

	/**
	 * @inheritDoc
	 */
	public function enqueue_style( string $asset_path, string $style_url, string $handle = '' ): void {
		if ( ! $this->asset_exists( $asset_path ) ) {
			return;
		}

		$assets = include $asset_path;
		wp_enqueue_style( $handle, $style_url, array(), $assets['version'], 'all' );
	}

	/**
	 * @inheritDoc
	 */
	public function enqueue_script( string $asset_path, string $script_url, string $handle = '' ): void {
		if ( ! $this->asset_exists( $asset_path ) ) {
			return;
		}

		$assets = include $asset_path;
		wp_enqueue_script( $handle, $script_url, $assets['dependencies'], $assets['version'], true );
	}

	/**
	 * @inheritDoc
	 */
	abstract public function enqueue_scripts_and_styles( string $hook = '' ): void;
}
