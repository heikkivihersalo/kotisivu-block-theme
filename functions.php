<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();
/*
|--------------------------------------------------------------------------
| Get options
|--------------------------------------------------------------------------
|
| 
|
*/
/**
 * Get classes
 */
foreach (glob(dirname(__FILE__) . '/inc/utils/*.php') as $utility_class) :
    require_once $utility_class;
endforeach;

/**
 * Get theme attributes
 */
$theme = wp_get_theme();
$theme_name = $theme->get('Name');
$theme_version = $theme->get('Version');
$theme_textdomain = $theme->get('TextDomain');
$theme_path = get_template_directory();
$theme_uri = get_template_directory_uri();
$theme_analytics = Utils::get_options_file('site-analytics');
$theme_config = include(dirname(__FILE__) . '/theme.config.php');

/*
|--------------------------------------------------------------------------
| Initialize Theme
|--------------------------------------------------------------------------
|
| Initialize the parent theme
|
*/

require_once(dirname(__FILE__) . '/inc/theme.php');
$theme = new Theme(
    $theme_name,
    $theme_version,
    $theme_textdomain,
    $theme_path,
    $theme_uri,
    $theme_options,
    $theme_analytics,
    $theme_config
);
$theme->init();

/*
|--------------------------------------------------------------------------
| Initialize Custom Blocks
|--------------------------------------------------------------------------
|
| Initialize custom blocks
|
*/

require_once(dirname(__FILE__) . '/inc/blocks.php');
$blocks = new Blocks(
    $theme_path,
    $theme_uri
);
$blocks->init();
