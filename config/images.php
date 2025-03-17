<?php

declare(strict_types=1);

use HeikkiVihersalo\BlockThemeCore\Theme\Image\ImageSize;

return [
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
];
