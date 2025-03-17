<?php

declare(strict_types=1);

use Kotisivu\BlockTheme\Enqueue\AdminEnqueue;
use Kotisivu\BlockTheme\Enqueue\DarkModeEnqueue;
use Kotisivu\BlockTheme\Enqueue\ThemeEnqueue;

return [

	/*
	|--------------------------------------------------------------------------
	| Theme scripts and styles
	|--------------------------------------------------------------------------
	|
	| All the scripts and styles that are enqueued in the theme are defined here.
	| To allow for better control on the folder structure, the file paths are
	| set in individual files in the app folder. For example, the ThemeEnqueue
	| class is defined in app/Enqueue/ThemeEnqueue.php and has several properties
	| that define the file paths that are used to enqueue the scripts and styles.
	|
	| To define a new script or style, create a new class in the Enqueue folder
	| and extend the Enqueue class. Then define the file paths in the new class.
	| Finally, add the new class to the assets array below.
	|
	| Note that block scripts are enqueued in different way.
	|
	*/

	'assets'   => [
		AdminEnqueue::class,
		DarkModeEnqueue::class,
		ThemeEnqueue::class,
	],

	/*
	|--------------------------------------------------------------------------
	| Sanitize CSS
	|--------------------------------------------------------------------------
	|
	| Wrether to inline sanitize the CSS or not.
	|
	*/

	'sanitize' => [
		'enabled' => true,
		'css'     => [
			'id'       => 'ksd-sanitize-css',
			'src'      => 'assets/sanitize.css',
			'priority' => 0,
		],
	],

	/*
	|--------------------------------------------------------------------------
	| Custom inline CSS folder path
	|--------------------------------------------------------------------------
	|
	| Custom inline scripts and styles can be enqueued from a folder.
	|
	*/

	'inline'   => [
		'enabled' => true,
		'css'     => [
			'id'       => 'ksd-inline-css',
			'src'      => 'assets/inline.css',
			'priority' => 11,
		],
	],
];
