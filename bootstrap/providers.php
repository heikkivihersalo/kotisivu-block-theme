<?php

declare(strict_types=1);

use App\Providers\AppServiceProvider;
use Vihersalo\Core\Analytics\AnalyticsServiceProvider;
use Vihersalo\Core\Admin\Settings\Providers\SettingsMenuServiceProvider;
use Vihersalo\Core\Styles\StylesServiceProvider;
use Vihersalo\Core\Admin\CustomizerServiceProvider;
use Vihersalo\Core\Media\MediaServiceProvider;
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

    AnalyticsServiceProvider::class,
    SettingsMenuServiceProvider::class,
    StylesServiceProvider::class,
    CustomizerServiceProvider::class,
    MediaServiceProvider::class,
    JunkServiceProvider::class,

    /*
    |--------------------------------------------------------------------------
    | Custom Providers
    |--------------------------------------------------------------------------
    |
    | Add your custom providers here.
    |
    */

];
