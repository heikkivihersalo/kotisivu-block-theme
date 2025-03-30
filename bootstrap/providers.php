<?php

declare(strict_types=1);

use App\Providers\AppServiceProvider;
use App\Providers\AssetServiceProvider;
use App\Providers\SettingsServiceProvider;
use Vihersalo\Core\Admin\Providers\CustomizerServiceProvider;
use Vihersalo\Core\Analytics\AnalyticsServiceProvider;
use Vihersalo\Core\Styles\StylesServiceProvider;
use Vihersalo\Core\Media\MediaServiceProvider;

return [

    /*
    |--------------------------------------------------------------------------
    | Core Providers
    |--------------------------------------------------------------------------
    |
    */

    AppServiceProvider::class,
    AssetServiceProvider::class,

    /*
    |--------------------------------------------------------------------------
    | Additional Providers
    |--------------------------------------------------------------------------
    |
    | Theme registers a lot of providers in the background. However some
    | providers are optional and can be set (or unset) here.
    |
    */

    AnalyticsServiceProvider::class,
    CustomizerServiceProvider::class,
    MediaServiceProvider::class,
    SettingsServiceProvider::class,
    StylesServiceProvider::class,

    /*
    |--------------------------------------------------------------------------
    | Custom Providers
    |--------------------------------------------------------------------------
    |
    | Add your custom providers here.
    |
    */
];
