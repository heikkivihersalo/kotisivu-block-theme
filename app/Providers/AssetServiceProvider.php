<?php

declare(strict_types=1);

namespace App\Providers;

use Vihersalo\Core\Enqueue\AssetLoader;
use Vihersalo\Core\Support\Facades\Asset;
use Vihersalo\Core\Support\ServiceProvider;

class AssetServiceProvider extends ServiceProvider {
    /**
     * Register the application assets
     * @return void
     */
    public function register(): void {
        /**
         * First we register the asset loader
         * This is used as an central container for all assets
         */
        $this->app->singleton('assets', function ($app) {
            return new AssetLoader($app);
        });

        /**
         * Then we register the assets
         * We use the Asset facade to register the assets
         * The facade is a helper class that allows us to access the asset loader
         * from anywhere in the application
         */
        Asset::inline('kotisivu-sanitize-css', 'build/assets/sanitize.css', 0);
        Asset::inline('kotisivu-inline-css', 'build/assets/inline.css', 11);
        Asset::script('kotisivu-theme', 'build/assets/theme.js', 'build/assets/theme.asset.php');
        Asset::style('kotisivu-theme', 'build/assets/theme.css', 'build/assets/theme.asset.php');
        Asset::script('kotisivu-admin', 'build/assets/admin.js', 'build/assets/admin.asset.php', 10, true);
        Asset::style('kotisivu-admin', 'build/assets/admin.css', 'build/assets/admin.asset.php', 10, true);

        Asset::script('kotisivu-core', 'build/block-library/core/core.js', 'build/block-library/core/core.asset.php');
        Asset::style('kotisivu-core', 'build/block-library/core/core.css', 'build/block-library/core/core.asset.php');

        Asset::script('kotisivu-store', 'build/assets/store.js', 'build/assets/store.asset.php');

        /**
         * Finally we register the assets so they get enqueued to the theme
         * This is done by calling the register method on the asset loader
         * The register method will loop through all the assets and enqueue them
         */
        $this->app->make('assets')->register();
    }

    /**
     * Bootstrap any application services.
     * @return void
     */
    public function boot(): void {
    }
}
