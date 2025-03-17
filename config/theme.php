<?php

declare(strict_types=1);

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
	| Theme color scheme
	|--------------------------------------------------------------------------
	|
	*/

	'color'      => 'hsl(0, 0%, 20%)',
	'dark_mode'  => false,

	/*
	|--------------------------------------------------------------------------
	| Paths and URLs
	|--------------------------------------------------------------------------
	|
	| The path and URL to the theme directory. These can be accessed with
	| the SITE_PATH and SITE_URI constants.
	|
	*/

	'path'       => get_template_directory(),
	'uri'        => get_template_directory_uri(),
];
