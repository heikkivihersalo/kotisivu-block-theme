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
 * Load translations
 *
 * @return void
 */
function load_translations(): void {
	load_theme_textdomain( 'kotisivu-block-theme', SITE_PATH . '/languages' );
}
