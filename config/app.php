<?php

declare(strict_types=1);

use Vihersalo\Core\Admin\Settings\Providers\SettingsMenuProvider;
use Vihersalo\Core\Media\MediaProvider;
use Vihersalo\Core\Admin\CustomizerProvider;
use Vihersalo\Core\Analytics\AnalyticsProvider;
use Vihersalo\Core\Styles\StylesProvider;
use Vihersalo\Core\Navigation\Menu;
use Vihersalo\Core\Support\Assets\Script;
use Vihersalo\Core\Support\Assets\Style;
use Vihersalo\Core\Support\Assets\Inline;
use Vihersalo\Core\Support\Media\ImageSize;
use Vihersalo\Core\Support\Facades\Facade;

return [

	/*
    |--------------------------------------------------------------------------
    | Theme information
    |--------------------------------------------------------------------------
    |
    */

	'name'       => 'kotisivu-block-theme',
	'textdomain' => 'kotisivu-block-theme',
	'version'    => '2.0.0',

	/*
    |--------------------------------------------------------------------------
    | Paths and URLs
    |--------------------------------------------------------------------------
    |
    | The path and URL to the theme directory. These are used to load assets
	| and other files in the theme directory. Defaults to current theme directory.
    |
    */

	'path'       => get_template_directory(),
	'uri'        => get_template_directory_uri(),

	/*
    |--------------------------------------------------------------------------
    | Theme color scheme
    |--------------------------------------------------------------------------
    |
    */

	'theme'      => [
		'meta'      => 'hsl(0, 0%, 20%)', // This sets the color of the meta tags in the header.
		'default'   => 'light',
		'available' => [
			'light',
			'dark',
		],
	],

	/*
    |--------------------------------------------------------------------------
    | Navigation
    |--------------------------------------------------------------------------
    |
    */

	'navigation' => [
		Menu::create('header', __('Header', 'kotisivu-block-theme')),
		Menu::create('legal', __('Legal', 'kotisivu-block-theme')),
		Menu::create('footer', __('Footer', 'kotisivu-block-theme')),
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

	'supports'   => [
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

	'assets'     => [
		Inline::create('ksd-sanitize', 'build/assets/sanitize.css', 0),
		Inline::create('ksd-inline', 'build/assets/inline.css', 11),
		Script::create('ksd-theme', 'build/assets/theme.js', 'build/assets/theme.asset.php'),
		Style::create('ksd-theme', 'build/assets/theme.css', 'build/assets/theme.asset.php'),
		Script::create('ksd-admin', 'build/assets/admin.js', 'build/assets/admin.asset.php', 10, true),
		Style::create('ksd-admin', 'build/assets/admin.css', 'build/assets/admin.asset.php', 10, true),
	],
	'dequeue'    => [
		'fluentform-public-default',
		'fluent-form-styles',
		'wc-blocks-style',
		'wp-global-styles',
		'wp-block-library',
		'wp-block-library-theme',
	],

	/*
    |--------------------------------------------------------------------------
    | Media settings
    |--------------------------------------------------------------------------
    |
    | All the media settings like images, excerpts etc are defined here.
    |
    */

	'media'      => [
		'sizes'   => [
			'default' => [
				ImageSize::create('large', 'Large', 1600, 1200),
				ImageSize::create('medium_large', 'Medium Large', 1366, 1025),
				ImageSize::create('medium', 'Medium', 1024, 768),
				ImageSize::create('thumbnail', 'Thumbnail', 300, 300),
			],
			'custom'  => [
				ImageSize::create('retina', 'Retina', 2880, 1800),
				ImageSize::create('huge', 'Huge', 1920, 1440),
				ImageSize::create('small', 'Small', 768, 576),
				ImageSize::create('extra_small', 'Extra Small', 640, 480),
			],
		],
		'excerpt' => [
			'length' => 20,
			'more'   => '&hellip;',
		],
	],

	/*
    |--------------------------------------------------------------------------
    | Class Aliases
    |--------------------------------------------------------------------------
    |
    | This array of class aliases will be registered when this application
    | is started.
    |
    */

	'aliases' => Facade::defaultAliases(),
];
