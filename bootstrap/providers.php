<?php

declare(strict_types=1);

use App\Providers\AppServiceProvider;
use Vihersalo\Core\Analytics\AnalyticsProvider;
use Vihersalo\Core\Admin\Settings\Providers\SettingsMenuProvider;
use Vihersalo\Core\Styles\StylesProvider;
use Vihersalo\Core\Admin\CustomizerProvider;
use Vihersalo\Core\Media\MediaProvider;
use Vihersalo\Core\Junk\JunkServiceProvider;

return [

	/*
	|--------------------------------------------------------------------------
	| Core Providers
	|--------------------------------------------------------------------------
	|
	*/

	AppServiceProvider::class,

	/*
	|--------------------------------------------------------------------------
	| Additional Providers
	|--------------------------------------------------------------------------
	|
	| Theme registers a lot of providers in the background. However some
	| providers are optional and can be set (or unset) here.
	|
	*/

	AnalyticsProvider::class,
	SettingsMenuProvider::class,
	StylesProvider::class,
	CustomizerProvider::class,
	MediaProvider::class,
	JunkServiceProvider::class,

	/*
	|--------------------------------------------------------------------------
	| Custom Providers
	|--------------------------------------------------------------------------
	|
	| Add your custom providers here.
	*/

];
