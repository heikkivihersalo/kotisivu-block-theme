<?php

declare(strict_types=1);

use App\Handlers\RenderBlockHandler;
use Vihersalo\Core\Foundation\Application;
use Vihersalo\Core\Support\Collections\HandlerCollection;

return Application::configure()
    ->withApi(
        routePath: __DIR__ . '/../routes/api.php',
        routeNamespace: 'api/v1', // This will make the routes available under `/wp-json/api/v1`
    )
    ->withHandlers(function (HandlerCollection $handlers) {
        $handlers->add(RenderBlockHandler::class);
    })
    ->boot();
