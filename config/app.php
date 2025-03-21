<?php

declare(strict_types=1);

use Vihersalo\BlockThemeCore\Admin\Pages\AdminPagesProvider;
use Vihersalo\BlockThemeCore\Media\MediaProvider;
use Vihersalo\BlockThemeCore\Admin\CustomizerProvider;
use Vihersalo\BlockThemeCore\Navigation\Menu;
use Vihersalo\BlockThemeCore\Support\Assets\Script;
use Vihersalo\BlockThemeCore\Support\Assets\Style;
use Vihersalo\BlockThemeCore\Support\Assets\Inline;
use Vihersalo\BlockThemeCore\Support\Media\ImageSize;
use Vihersalo\BlockThemeCore\Support\Pages\Page;

return [

	/*
	|--------------------------------------------------------------------------
	| Theme information
	|--------------------------------------------------------------------------
	|
	*/

	'name'           => 'kotisivu-block-theme',
	'textdomain'     => 'kotisivu-block-theme',
	'version'        => '2.0.0',

	/*
	|--------------------------------------------------------------------------
	| Theme color scheme
	|--------------------------------------------------------------------------
	|
	*/

	'color'          => 'hsl(0, 0%, 20%)',
	'dark_mode'      => false,

	/*
	|--------------------------------------------------------------------------
	| Paths and URLs
	|--------------------------------------------------------------------------
	|
	| The path and URL to the theme directory. These can be accessed with
	| the SITE_PATH and SITE_URI constants.
	|
	*/

	'path'           => get_template_directory(),
	'uri'            => get_template_directory_uri(),

	/*
	|--------------------------------------------------------------------------
	| Navigation
	|--------------------------------------------------------------------------
	|
	*/

	'navigation'     => [
		Menu::create( 'header', __( 'Header', 'kotisivu-block-theme' ) ),
		Menu::create( 'legal', __( 'Legal', 'kotisivu-block-theme' ) ),
		Menu::create( 'footer', __( 'Footer', 'kotisivu-block-theme' ) ),
	],

	/*
	|--------------------------------------------------------------------------
	| Theme supports
	|--------------------------------------------------------------------------
	|
	| Values set here are registered with add_theme_support() in the theme setup hook.
	| See https://developer.wordpress.org/reference/functions/add_theme_support/
	| for more information.
	|
	*/

	'theme_supports' => [
		'wp-block-styles',
		'align-wide',
		'custom-logo',
		'menus',
		'editor-styles',
	],

	/*
	|--------------------------------------------------------------------------
	| Theme scripts and styles
	|--------------------------------------------------------------------------
	|
	| All the scripts and styles that are enqueued in the theme are defined here.
	|
	| Note that block scripts are enqueued in different way.
	|
	*/

	'assets'         => [
		Inline::create( 'ksd-sanitize', 'build/assets/sanitize.css', 0 ),
		Inline::create( 'ksd-inline', 'build/assets/inline.css', 11 ),
		Script::create( 'ksd-theme', 'build/assets/theme.js', 'build/assets/theme.asset.php' ),
		Style::create( 'ksd-theme', 'build/assets/theme.css', 'build/assets/theme.asset.php' ),
		Script::create( 'ksd-admin', 'build/assets/admin.js', 'build/assets/admin.asset.php', 10, true ),
		Style::create( 'ksd-admin', 'build/assets/admin.css', 'build/assets/admin.asset.php', 10, true ),
	],

	/*
	|--------------------------------------------------------------------------
	| Media settings
	|--------------------------------------------------------------------------
	|
	| All the media settings like images, excerpts etc are defined here.
	|
	*/

	'media'          => [
		'sizes'   => [
			'default' => [
				ImageSize::create( 'large', 'Large', 1600, 1200 ),
				ImageSize::create( 'medium_large', 'Medium Large', 1366, 1025 ),
				ImageSize::create( 'medium', 'Medium', 1024, 768 ),
				ImageSize::create( 'thumbnail', 'Thumbnail', 300, 300 ),
			],
			'custom'  => [
				ImageSize::create( 'retina', 'Retina', 2880, 1800 ),
				ImageSize::create( 'huge', 'Huge', 1920, 1440 ),
				ImageSize::create( 'small', 'Small', 768, 576 ),
				ImageSize::create( 'extra_small', 'Extra Small', 640, 480 ),
			],
		],
		'excerpt' => [
			'length' => 20,
			'more'   => '&hellip;',
		],
	],

	/*
	|--------------------------------------------------------------------------
	| Providers
	|--------------------------------------------------------------------------
	|
	| Theme registers a lot of providers in the background. However some
	| providers are optional and can be registered here. You can also add
	| your own custom providers here if you want to extend the framework.
	|
	*/

	'providers'      => [
		AdminPagesProvider::class,
		CustomizerProvider::class,
		MediaProvider::class,
	],
];
