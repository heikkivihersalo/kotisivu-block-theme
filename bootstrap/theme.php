<?php

declare(strict_types=1);

use App\Handlers\RenderBlockHandler;
use App\Services\Vite\DevServer;
use App\Services\Vite\ManifestResolver;
use Vihersalo\Core\Foundation\Application;
use Vihersalo\Core\Support\Collection;

$app = Application::configure()
    ->withApi(
        routePath: __DIR__ . '/../routes/api.php',
        routeNamespace: 'api/v1', // This will make the routes available under `/wp-json/api/v1`
    )
    ->withHandlers(function (Collection $handlers) {
        $handlers->add(RenderBlockHandler::class);
    })
    ->boot();

// Register Vite DevServer for HMR support in development
if (defined('WP_DEBUG') && WP_DEBUG) {
    $manifest = new ManifestResolver();
    $manifest->setManifest(__DIR__ . '/../build/block-manifest.php');
    $devServer = new DevServer($_ENV['VITE_DEV_SERVER_HOST'] ?? get_site_url(), $manifest);
    $devServer
        ->setPort((int) ($_ENV['VITE_DEV_SERVER_PORT'] ?? 5173))
        ->register();
}

return $app;
