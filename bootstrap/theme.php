<?php

declare(strict_types=1);

use App\Handlers\RenderBlockHandler;
use Vihersalo\Core\Support\Collection;

return \Vihersalo\Core\Foundation\Application::configure()
    ->withApi(
        routePath: __DIR__ . '/../routes/api.php',
        routeNamespace: 'api/v1', // This will make the routes available under `/wp-json/api/v1`
    )
    ->withHandlers(function (Collection $handlers) {
        $handlers->add(RenderBlockHandler::class);
    })
    ->boot();
