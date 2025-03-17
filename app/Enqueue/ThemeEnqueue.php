<?php
/**
 *
 *
 * @package Kotisivu\BlockTheme\Enqueue
 * @since 2.0.0
 */

namespace Kotisivu\BlockTheme\Enqueue;

use HeikkiVihersalo\BlockThemeCore\Theme\Common\Enqueue;

/**
 *
 * @package Kotisivu\BlockTheme\Enqueue
 */
class ThemeEnqueue extends Enqueue {
	/**
	 * Identifier for the asset (handle)
	 * @var string
	 */
	protected static $handle = 'ksd-theme';

	/**
	 * Script URI
	 * @var string
	 */
	protected static $script_uri = 'build/assets/theme.js';

	/**
	 * Stylesheet URI
	 * @var string
	 */
	protected static $style_uri = 'build/assets/theme.css';

	/**
	 * Asset Path
	 * @var string
	 */
	protected static $asset_path = 'build/assets/theme.asset.php';
}
