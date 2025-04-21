<?php

declare(strict_types=1);

namespace App\Providers;

use Vihersalo\Core\Support\Facades\Asset;
use Vihersalo\Core\Support\ServiceProvider;

class AssetServiceProvider extends ServiceProvider {
    /**
     * Register the application scripts, styles and inline assets.
     * You can add your own here or modify the paths as needed.
     * Actual loader is registered in the core under the key 'assets' and booted automatically.
     *
     * @return void
     */
    public function register(): void {
        // Inline assets like sanitize and custom CSS variables
        Asset::inline('kotisivu-sanitize-css', 'build/app/sanitize.css', 0);
        Asset::inline('kotisivu-inline-css', 'build/app/inline.css', 11);
        Asset::inline('kotisivu-tailwind-utility-css', 'build/app/tailwind-utilities.css', 11);

        // Frontend assets
        Asset::script('kotisivu-theme', 'build/app/theme.js', 'build/app/theme.asset.php');
        Asset::style('kotisivu-theme', 'build/app/theme.css', 'build/app/theme.asset.php', 10, false, true);

        // Core block assets
        Asset::script('kotisivu-core', 'build/widgets/block-library/core/core.js', 'build/widgets/block-library/core/core.asset.php');
        Asset::style('kotisivu-core', 'build/widgets/block-library/core/core.css', 'build/widgets/block-library/core/core.asset.php', 10, false, true);

        // Redux store assets
        Asset::script('kotisivu-store', 'build/app/store.js', 'build/app/store.asset.php');

        // Backend and editor assets
        Asset::script('kotisivu-admin', 'build/app/admin.js', 'build/app/admin.asset.php', 10, true);
        Asset::style('kotisivu-admin', 'build/app/admin.css', 'build/app/admin.asset.php', 10, true, true);

        // Some assets needs to also be loaded in the block editor, so we add them here
        Asset::style('kotisivu-inline-css', 'build/app/inline.css', 'build/app/admin.asset.php', 11, true, true);
        Asset::style('kotisivu-tailwind-utility-css', 'build/app/tailwind-utilities.css', 'build/app/admin.asset.php', 11, true, true);
        Asset::script('kotisivu-core-admin', 'build/widgets/block-library/core/core.js', 'build/widgets/block-library/core/core.asset.php', 10, true);
    }

    /**
     * Bootstrap any application services.
     * @return void
     */
    public function boot(): void {
    }
}
