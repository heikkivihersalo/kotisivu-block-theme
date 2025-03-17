<?php

declare(strict_types=1);

namespace Kotisivu\BlockTheme;

use HeikkiVihersalo\BlockThemeCore;
use HeikkiVihersalo\BlockThemeCore\Theme;
use HeikkiVihersalo\BlockThemeCore\Theme\Common\Utils\Helpers as ThemeHelpers;

require_once ABSPATH . 'wp-admin/includes/class-wp-filesystem-base.php';
require_once ABSPATH . 'wp-admin/includes/class-wp-filesystem-direct.php';

/**
 * Include theme.php to get theme defaults.
 */
$theme = ThemeHelpers::load_config( dirname( __DIR__ ) . '/config/theme.php' );

foreach ( $theme as $key => $value ) {
	define( 'SITE_' . strtoupper( $key ), $value );
}

/**
 * Run the theme.
 */
$theme = new Theme(
	ThemeHelpers::load_config( dirname( __DIR__ ) . '/config/enqueue.php' ),
	ThemeHelpers::load_config( dirname( __DIR__ ) . '/config/excerpt.php' ),
	ThemeHelpers::load_config( dirname( __DIR__ ) . '/config/images.php' ),
	ThemeHelpers::load_config( dirname( __DIR__ ) . '/config/navigation.php' )
);

$theme->run();
