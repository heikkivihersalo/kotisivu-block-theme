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
$theme_parent_path = get_parent_theme_file_path();
$theme_parent_uri = get_parent_theme_file_uri();
$theme_path = get_theme_file_path();
$theme_uri = get_theme_file_uri();
$theme_options = Utils::get_options_file('site-options');
$theme_analytics = Utils::get_options_file('site-analytics');
$theme_config = Utils::get_config_file('theme_config', 'config.json', $theme_path, $theme_parent_path);

/**
 * Get block attributes
 */
$blocks = Utils::get_config_file('theme_blocks', 'blocks.json', $theme_path, $theme_parent_path);

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
    $theme_parent_path,
    $theme_parent_uri,
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
    $blocks,
    $theme_parent_path,
    $theme_parent_uri,
    $theme_path,
    $theme_uri,
    $theme_options
);
$blocks->init();
