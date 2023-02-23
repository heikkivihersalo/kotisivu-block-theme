<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/*
|--------------------------------------------------------------------------
| Initialize Theme
|--------------------------------------------------------------------------
|
| Initialize the parent theme
|
*/

require_once(dirname(__FILE__) . '/inc/theme.php');
$theme = new Theme();
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
$blocks = new Blocks();
$blocks->init();
